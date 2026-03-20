import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/inquiries - Create new inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workSlug, workTitle, artistName, name, email, message, type, priceOffer } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    let workId: string | undefined = undefined;
    if (workSlug) {
      const work = await prisma.work.findUnique({ where: { slug: workSlug } });
      workId = work?.id;
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        workId,
        type: type || 'general',
        subject: workTitle ? `Inquiry: ${workTitle}` : 'General Inquiry',
        message,
        priceOffer: priceOffer ? parseFloat(priceOffer) : null,
      },
    });

    return NextResponse.json({ success: true, inquiryId: inquiry.id, message: 'Inquiry submitted successfully' });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 });
  }
}

// GET /api/inquiries - List inquiries
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');

    const where: any = {};
    if (status) where.status = status;

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({ inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch inquiries' }, { status: 500 });
  }
}
