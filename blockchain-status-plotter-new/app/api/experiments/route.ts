import { NextResponse } from 'next/server';
import { fetchUnifiedExperiments, fetchDashboardStats } from '@/lib/experiment-service';

export async function GET() {
  try {
    const [experiments, stats] = await Promise.all([
      fetchUnifiedExperiments(),
      fetchDashboardStats(),
    ]);

    return NextResponse.json({
      experiments,
      stats,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch experiments' },
      { status: 500 }
    );
  }
}

// Enable caching for 10 seconds to reduce load
export const revalidate = 10;
