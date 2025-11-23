import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { fetchUnifiedExperiments, fetchDashboardStats } from '@/lib/experiment-service';
import { checkRateLimit } from '@/lib/validation';

// Rate limiting: 60 requests per minute per IP
const RATE_LIMIT = 60;
const RATE_WINDOW_MS = 60000;

export async function GET(request: Request) {
  // Security headers
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  try {
    // Get client IP for rate limiting
    const headersList = await headers();
    const forwarded = headersList.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    // Check rate limit
    if (!checkRateLimit(`api:experiments:${clientIp}`, RATE_LIMIT, RATE_WINDOW_MS)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please try again later.',
          retryAfter: 60 // seconds
        },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': '60',
          }
        }
      );
    }

    // Fetch data with timeout
    const fetchWithTimeout = Promise.race([
      Promise.all([
        fetchUnifiedExperiments(),
        fetchDashboardStats(),
      ]),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      )
    ]) as Promise<[any, any]>;

    const [experiments, stats] = await fetchWithTimeout;

    return NextResponse.json(
      {
        experiments,
        stats,
        timestamp: Date.now(),
      },
      { headers: securityHeaders }
    );
    
  } catch (error: any) {
    console.error('[API] Experiments fetch error:', error.message);
    
    // Don't leak internal errors to client
    const userMessage = error.message === 'Request timeout'
      ? 'Request timeout. Please try again.'
      : 'Failed to fetch experiments. Please try again later.';
    
    return NextResponse.json(
      { 
        error: userMessage,
        timestamp: Date.now()
      },
      { 
        status: error.message === 'Request timeout' ? 504 : 500,
        headers: securityHeaders
      }
    );
  }
}

// Enable caching for 10 seconds to reduce load
export const revalidate = 10;
