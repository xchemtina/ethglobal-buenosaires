import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { queryLLM, isLLMConfigured, type Message } from '@/lib/llm-service';
import { fetchUnifiedExperiments, fetchDashboardStats } from '@/lib/experiment-service';
import { checkRateLimit } from '@/lib/validation';

// Rate limiting: 20 chat requests per minute (LLM calls are expensive)
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60000;

export async function POST(request: Request) {
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  };

  try {
    // Check if LLM is configured
    if (!isLLMConfigured()) {
      return NextResponse.json(
        { 
          error: 'LLM not configured',
          message: 'OpenAI API key is missing. Add OPENAI_API_KEY to .env.local'
        },
        { status: 503, headers: securityHeaders }
      );
    }

    // Get client IP for rate limiting
    const headersList = headers();
    const forwarded = headersList.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : 'unknown';

    // Check rate limit (stricter for LLM calls)
    if (!checkRateLimit(`api:chat:${clientIp}`, RATE_LIMIT, RATE_WINDOW_MS)) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: 'Too many chat requests. Please wait before sending more.',
          retryAfter: 60
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

    // Parse request body
    const body = await request.json();
    const { messages, includeGraphContext = true } = body;

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request', message: 'messages array is required' },
        { status: 400, headers: securityHeaders }
      );
    }

    // Fetch Graph context if requested
    let graphContext: any = null;
    if (includeGraphContext) {
      try {
        const [experiments, stats] = await Promise.all([
          fetchUnifiedExperiments(),
          fetchDashboardStats(),
        ]);
        
        graphContext = {
          experiments: experiments.slice(0, 10), // Last 10 experiments
          stats,
        };
      } catch (error) {
        console.warn('[Chat API] Failed to fetch Graph context:', error);
        // Continue without context rather than failing
      }
    }

    // Query LLM (non-streaming for now - can add streaming later)
    const startTime = Date.now();
    
    const response = await queryLLM(messages as Message[], graphContext, {
      stream: false,
      maxTokens: 500,
      temperature: 0.7,
    });

    const duration = Date.now() - startTime;

    return NextResponse.json(
      {
        response: response as string,
        duration,
        graphContext: graphContext ? {
          experimentCount: graphContext.experiments?.length || 0,
          totalExperiments: graphContext.stats?.totalExperiments || 0,
        } : null,
        timestamp: Date.now(),
      },
      { headers: securityHeaders }
    );

  } catch (error: any) {
    console.error('[Chat API] Error:', error.message);
    
    // User-friendly error messages (don't leak internals)
    let userMessage = 'Chat service temporarily unavailable. Please try again.';
    let status = 500;
    
    if (error.message.includes('API key')) {
      userMessage = 'Chat service is not configured. Please contact support.';
      status = 503;
    } else if (error.message.includes('rate limit')) {
      userMessage = 'OpenAI rate limit reached. Please try again in a moment.';
      status = 429;
    } else if (error.message.includes('timeout')) {
      userMessage = 'Request timeout. Please try a shorter query.';
      status = 504;
    }
    
    return NextResponse.json(
      { 
        error: 'Chat error',
        message: userMessage,
        timestamp: Date.now()
      },
      { status, headers: securityHeaders }
    );
  }
}

// Enable edge runtime for faster responses (optional)
// export const runtime = 'edge';

// Disable caching for chat (always fresh)
export const revalidate = 0;
export const dynamic = 'force-dynamic';
