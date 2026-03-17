import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/artist-dashboard/works/[slug] - Get a specific work
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const work = await prisma.work.findUnique({
      where: {
        slug: params.slug,
      },
    });

    if (!work) {
      return NextResponse.json(
        { error: 'Work not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ work });
  } catch (error) {
    console.error('Error fetching work:', error);
    return NextResponse.json(
      { error: 'Failed to fetch work' },
      { status: 500 }
    );
  }
}

// PUT /api/artist-dashboard/works/[slug] - Update a work
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const {
      title,
      titleCn,
      year,
      medium,
      dimensions,
      price,
      description,
      images,
      availability,
      isPublished,
    } = body;

    const work = await prisma.work.update({
      where: {
        slug: params.slug,
      },
      data: {
        ...(title && { title }),
        ...(titleCn && { titleCn }),
        ...(year && { year: parseInt(year) }),
        ...(medium && { medium }),
        ...(dimensions !== undefined && { dimensions }),
        ...(price !== undefined && { price: parseFloat(price) }),
        ...(description !== undefined && { description }),
        ...(images && { images: JSON.stringify(images) }),
        ...(availability && { availability }),
        ...(isPublished !== undefined && { isPublished }),
      },
    });

    return NextResponse.json({ work });
  } catch (error) {
    console.error('Error updating work:', error);
    return NextResponse.json(
      { error: 'Failed to update work' },
      { status: 500 }
    );
  }
}

// DELETE /api/artist-dashboard/works/[slug] - Delete a work
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await prisma.work.delete({
      where: {
        slug: params.slug,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting work:', error);
    return NextResponse.json(
      { error: 'Failed to delete work' },
      { status: 500 }
    );
  }
}
