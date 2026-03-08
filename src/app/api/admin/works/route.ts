import { NextRequest, NextResponse } from 'next/server';
import { listWorks, createWork } from '@/lib/content';

// GET /api/admin/works - List all works
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      status: searchParams.get('status') || undefined,
      artistId: searchParams.get('artistId') || undefined,
      isPublished: searchParams.has('isPublished')
        ? searchParams.get('isPublished') === 'true'
        : undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
    };

    const { works, total } = await listWorks(options);

    return NextResponse.json({ works, total });
  } catch (error) {
    console.error('Error in GET /api/admin/works:', error);
    return NextResponse.json(
      { error: 'Failed to fetch works' },
      { status: 500 }
    );
  }
}

// POST /api/admin/works - Create new work
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.artistId || !body.year || !body.medium) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const work = await createWork({
      slug: body.slug,
      title: body.title,
      titleCn: body.titleCn,
      artistId: body.artistId,
      artistName: body.artistName,
      year: body.year,
      medium: body.medium,
      dimensions: body.dimensions,
      price: body.price,
      currency: body.currency || 'USD',
      availability: body.availability || 'available',
      description: body.description,
      images: body.images || [],
      isPublished: body.isPublished || false,
    });

    if (!work) {
      return NextResponse.json(
        { error: 'Failed to create work' },
        { status: 500 }
      );
    }

    return NextResponse.json(work, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/admin/works:', error);
    return NextResponse.json(
      { error: 'Failed to create work' },
      { status: 500 }
    );
  }
}
