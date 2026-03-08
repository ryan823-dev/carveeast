import { NextRequest, NextResponse } from 'next/server';
import { getUserStats } from '@/lib/users';

// GET /api/admin/users/stats - Get user statistics
export async function GET(request: NextRequest) {
  try {
    const stats = await getUserStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error in GET /api/admin/users/stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user stats' },
      { status: 500 }
    );
  }
}
