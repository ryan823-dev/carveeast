// Stripe Checkout API Route
import { NextRequest, NextResponse } from 'next/server';
import { createCourseCheckoutSession, COURSE_PRODUCTS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseSlug, email } = body;

    // Validate course slug
    if (!courseSlug || !COURSE_PRODUCTS[courseSlug as keyof typeof COURSE_PRODUCTS]) {
      return NextResponse.json(
        { error: 'Invalid course slug' },
        { status: 400 }
      );
    }

    const course = COURSE_PRODUCTS[courseSlug as keyof typeof COURSE_PRODUCTS];

    // Create checkout session
    const session = await createCourseCheckoutSession({
      courseSlug,
      courseName: course.name,
      amount: course.amount,
      customerEmail: email,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${courseSlug}?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/products/${courseSlug}?canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
