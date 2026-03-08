import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/auctions - List all auctions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '100');
    const page = parseInt(searchParams.get('page') || '1');

    const where: any = {
      isPublished: true,
    };

    if (status) {
      where.status = status;
    }

    const [auctions, total] = await Promise.all([
      prisma.auction.findMany({
        where,
        include: {
          lots: true,
          _count: {
            select: {
              lots: true,
            },
          },
        },
        orderBy: {
          startDate: 'desc',
        },
        take: limit,
        skip: (page - 1) * limit,
      }),
      prisma.auction.count({ where }),
    ]);

    return NextResponse.json({
      auctions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch auctions' },
      { status: 500 }
    );
  }
}
