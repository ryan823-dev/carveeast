import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

// POST /api/checkout - Create checkout session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      workId,
      workTitle,
      amount,
      currency = 'usd',
      customerEmail,
    } = body;

    if (!workId || !workTitle || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await createCheckoutSession({
      workId,
      workTitle,
      amount,
      currency,
      customerEmail,
      successUrl: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${origin}/checkout/cancel`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
