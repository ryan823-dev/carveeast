import { NextRequest, NextResponse } from 'next/server';
import { createPayPalOrder, PAYPAL_COURSE_AMOUNTS } from '@/lib/paypal';

// POST /api/paypal/create-order
// Creates a PayPal checkout order for a course
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseSlug, customerEmail } = body;

    if (!courseSlug) {
      return NextResponse.json(
        { error: 'Course slug is required' },
        { status: 400 }
      );
    }

    // Get course details
    const course = PAYPAL_COURSE_AMOUNTS[courseSlug as keyof typeof PAYPAL_COURSE_AMOUNTS];
    if (!course) {
      return NextResponse.json(
        { error: 'Invalid course slug' },
        { status: 400 }
      );
    }

    // Create PayPal order
    const result = await createPayPalOrder({
      amount: course.amount,
      currency: 'USD',
      description: course.name,
      courseSlug,
      customerEmail,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
