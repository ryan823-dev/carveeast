// Stripe Checkout Session Creation API
import { NextRequest, NextResponse } from 'next/server';
import { createCourseCheckoutSession, COURSE_PRODUCTS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseSlug, email } = body;

    // Validate course slug
    if (!courseSlug) {
      return NextResponse.json(
        { error: 'Course slug is required' },
        { status: 400 }
      );
    }

    // Check if course exists
    const course = COURSE_PRODUCTS[courseSlug as keyof typeof COURSE_PRODUCTS];
    if (!course) {
      return NextResponse.json(
        { error: 'Invalid course slug' },
        { status: 400 }
      );
    }

    // Create Stripe checkout session
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const session = await createCourseCheckoutSession({
      courseSlug,
      courseName: course.name,
      amount: course.amount,
      customerEmail: email,
      successUrl: `${baseUrl}/products/${courseSlug}/success`,
      cancelUrl: `${baseUrl}/products/${courseSlug}?canceled=true`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
