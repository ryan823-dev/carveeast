import { NextRequest, NextResponse } from 'next/server';
import {
  getSalesMetrics,
  getTrafficMetrics,
  getDashboardSummary,
  trackPageView,
} from '@/lib/analytics';

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'summary';

    switch (type) {
      case 'summary': {
        const summary = await getDashboardSummary();
        return NextResponse.json(summary);
      }

      case 'sales': {
        const startDate = searchParams.get('startDate') || undefined;
        const endDate = searchParams.get('endDate') || undefined;
        const metrics = await getSalesMetrics(startDate, endDate);
        return NextResponse.json(metrics);
      }

      case 'traffic': {
        const days = parseInt(searchParams.get('days') || '30');
        const metrics = await getTrafficMetrics(days);
        return NextResponse.json(metrics);
      }

      default:
        return NextResponse.json(
          { error: 'Invalid analytics type' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in GET /api/analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// POST /api/analytics - Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Get IP from request headers
    const ip = request.headers.get('x-forwarded-for') ||
               request.headers.get('x-real-ip') ||
               'unknown';

    await trackPageView({
      path: body.path,
      referrer: body.referrer,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: ip as string,
      userId: body.userId,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in POST /api/analytics:', error);
    return NextResponse.json(
      { error: 'Failed to track page view' },
      { status: 500 }
    );
  }
}
