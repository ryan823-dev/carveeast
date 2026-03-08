import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/stories - List all stories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');

    const where: any = {
      isPublished: true,
    };

    if (category) {
      where.category = category;
    }

    const [stories, total] = await Promise.all([
      prisma.story.findMany({
        where,
        orderBy: {
          publishedAt: 'desc',
        },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.story.count({ where }),
    ]);

    return NextResponse.json({
      stories,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching stories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    );
  }
}
