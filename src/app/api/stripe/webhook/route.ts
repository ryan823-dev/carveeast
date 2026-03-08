import { NextRequest, NextResponse } from 'next/server';
import { stripe, constructWebhookEvent, relevantEvents, isStripeConfigured } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Stripe webhook handler
export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Stripe is not configured' },
      { status: 503 }
    );
  }

  const payload = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event;

  try {
    event = constructWebhookEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  // Handle relevant events
  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'payment_intent.succeeded':
          await handlePaymentIntentSucceeded(event.data.object);
          break;

        case 'payment_intent.payment_failed':
          await handlePaymentIntentFailed(event.data.object);
          break;

        case 'checkout.session.completed':
          await handleCheckoutSessionCompleted(event.data.object);
          break;

        case 'charge.refunded':
          await handleChargeRefunded(event.data.object);
          break;

        case 'charge.dispute.created':
          await handleDisputeCreated(event.data.object);
          break;

        default:
          console.log(`Unhandled event type: ${event.type}`);
      }
    } catch (error) {
      console.error(`Error handling webhook event ${event.type}:`, error);
      return NextResponse.json(
        { error: 'Webhook handler failed' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

// Handle successful payment
async function handlePaymentIntentSucceeded(paymentIntent: any) {
  console.log('Payment succeeded:', paymentIntent.id);

  // Update order status in database
  // Create order record
  // Send confirmation email
  // Update inventory
}

// Handle failed payment
async function handlePaymentIntentFailed(paymentIntent: any) {
  console.log('Payment failed:', paymentIntent.id);

  // Log failure reason
  // Notify customer
  // Update order status
}

// Handle checkout session completion
async function handleCheckoutSessionCompleted(session: any) {
  console.log('Checkout completed:', session.id);

  const { workId, workTitle } = session.metadata || {};

  if (workId) {
    // Create order record
    await prisma.$transaction(async (tx) => {
      // Update work availability
      await tx.work.update({
        where: { id: workId },
        data: {
          availability: 'SOLD',
        },
      });

      // Create order record (you'll need to create an Order model)
      // await tx.order.create({
      //   data: {
      //     workId,
      //     customerEmail: session.customer_email,
      //     amount: session.amount_total / 100,
      //     currency: session.currency,
      //     stripeSessionId: session.id,
      //     status: 'PAID',
      //   },
      // });
    });

    // Send confirmation email
    // Notify artist
    // Update analytics
  }
}

// Handle refund
async function handleChargeRefunded(charge: any) {
  console.log('Charge refunded:', charge.id);

  // Update order status
  // Notify customer
  // Update inventory
}

// Handle dispute
async function handleDisputeCreated(dispute: any) {
  console.log('Dispute created:', dispute.id);

  // Log dispute
  // Notify admin
  // Gather evidence
  // Update order status
}
