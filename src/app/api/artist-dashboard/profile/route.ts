import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

// GET /api/artist-dashboard/profile - Get artist profile by email
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // First, get the user to find their artist profile
    // For now, we'll query artists directly by name
    const artist = await prisma.artist.findFirst({
      where: {
        name: email, // Temporary: using email as lookup until we have proper user-artist linking
      },
    });

    if (!artist) {
      return NextResponse.json(
        { error: 'Artist profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ artist });
  } catch (error) {
    console.error('Error fetching artist profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch artist profile' },
      { status: 500 }
    );
  }
}

// POST /api/artist-dashboard/profile - Create or update artist profile
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      slug,
      name,
      nameCn,
      discipline,
      location,
      yearStarted,
      bio,
      statement,
      avatar,
      coverImage,
    } = body;

    // Validate required fields
    if (!slug || !name) {
      return NextResponse.json(
        { error: 'Slug and name are required' },
        { status: 400 }
      );
    }

    // Check if artist exists
    const existingArtist = await prisma.artist.findUnique({
      where: { slug },
    });

    let artist;

    if (existingArtist) {
      // Update existing artist
      artist = await prisma.artist.update({
        where: { slug },
        data: {
          ...(name && { name }),
          ...(nameCn && { nameCn }),
          ...(discipline && { discipline }),
          ...(location && { location }),
          ...(yearStarted && { yearStarted: parseInt(yearStarted) }),
          ...(bio !== undefined && { bio }),
          ...(statement !== undefined && { statement }),
          ...(avatar !== undefined && { avatar }),
          ...(coverImage !== undefined && { coverImage }),
        },
      });
    } else {
      // Create new artist
      artist = await prisma.artist.create({
        data: {
          slug,
          name,
          nameCn,
          discipline: discipline || 'Seal Engraving',
          location: location || 'China',
          yearStarted: yearStarted ? parseInt(yearStarted) : null,
          bio,
          statement,
          avatar,
          coverImage,
        },
      });
    }

    return NextResponse.json({ artist }, { status: 201 });
  } catch (error) {
    console.error('Error saving artist profile:', error);
    return NextResponse.json(
      { error: 'Failed to save artist profile' },
      { status: 500 }
    );
  }
}
