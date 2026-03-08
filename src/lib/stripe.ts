import Stripe from 'stripe';

// Initialize Stripe with secret key
const stripeKey = process.env.STRIPE_SECRET_KEY;

export const stripe = stripeKey
  ? new Stripe(stripeKey, {
      apiVersion: '2026-02-25.clover',
      typescript: true,
    })
  : null;

// Helper to check if Stripe is configured
export function isStripeConfigured(): boolean {
  return !!stripe;
}

// Price formatting for Stripe (cents)
export function formatAmountForStripe(amount: number, currency: string): number {
  const currenciesWithoutDecimals = ['JPY', 'KRW'];
  if (currenciesWithoutDecimals.includes(currency.toUpperCase())) {
    return Math.round(amount);
  }
  return Math.round(amount * 100);
}

// Price formatting from Stripe (cents to decimal)
export function formatAmountFromStripe(amount: number, currency: string): number {
  const currenciesWithoutDecimals = ['JPY', 'KRW'];
  if (currenciesWithoutDecimals.includes(currency.toUpperCase())) {
    return amount;
  }
  return amount / 100;
}

// Create payment intent
export async function createPaymentIntent({
  amount,
  currency = 'usd',
  metadata = {},
  customerId,
}: {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
  customerId?: string;
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const params: Stripe.PaymentIntentCreateParams = {
    amount: formatAmountForStripe(amount, currency),
    currency: currency.toLowerCase(),
    automatic_payment_methods: { enabled: true },
    metadata,
  };

  if (customerId) {
    params.customer = customerId;
  }

  return stripe.paymentIntents.create(params);
}

// Create customer
export async function createCustomer({
  email,
  name,
  metadata = {},
}: {
  email: string;
  name?: string;
  metadata?: Record<string, string>;
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  return stripe.customers.create({
    email,
    name,
    metadata,
  });
}

// Create checkout session for artwork purchase
export async function createCheckoutSession({
  workId,
  workTitle,
  amount,
  currency = 'usd',
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  workId: string;
  workTitle: string;
  amount: number;
  currency?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  const session = await stripe.checkout.sessions.create({
    customer_email: customerEmail,
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: workTitle,
            metadata: {
              workId,
            },
          },
          unit_amount: formatAmountForStripe(amount, currency),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      workId,
      workTitle,
    },
  });

  return session;
}

// Retrieve payment intent
export async function retrievePaymentIntent(paymentIntentId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  return stripe.paymentIntents.retrieve(paymentIntentId);
}

// Construct webhook event
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

// Webhook event types we handle
export const relevantEvents = new Set([
  'payment_intent.succeeded',
  'payment_intent.payment_failed',
  'checkout.session.completed',
  'checkout.session.expired',
  'charge.refunded',
  'charge.dispute.created',
]);
