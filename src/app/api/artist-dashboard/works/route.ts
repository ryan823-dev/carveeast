import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/artist-dashboard/works - Get all works for an artist
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const artistId = searchParams.get('artistId');

    if (!artistId) {
      return NextResponse.json(
        { error: 'Artist ID is required' },
        { status: 400 }
      );
    }

    const works = await prisma.work.findMany({
      where: {
        artistId: artistId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ works });
  } catch (error) {
    console.error('Error fetching works:', error);
    return NextResponse.json(
      { error: 'Failed to fetch works' },
      { status: 500 }
    );
  }
}

// POST /api/artist-dashboard/works - Create a new work
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      titleCn,
      artistId,
      artistName,
      year,
      medium,
      dimensions,
      price,
      description,
      images = [],
      availability = 'available',
    } = body;

    // Validate required fields
    if (!title || !artistName || !year || !medium) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Create the work
    const work = await prisma.work.create({
      data: {
        slug,
        title,
        titleCn,
        artistId,
        artistName,
        year: parseInt(year),
        medium,
        dimensions,
        price: price ? parseFloat(price) : null,
        description,
        images: JSON.stringify(images),
        availability,
        isPublished: false,
      },
    });

    return NextResponse.json({ work }, { status: 201 });
  } catch (error) {
    console.error('Error creating work:', error);
    return NextResponse.json(
      { error: 'Failed to create work' },
      { status: 500 }
    );
  }
}
