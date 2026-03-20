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

// Course product IDs (for Stripe Price IDs)
export const COURSE_PRODUCTS = {
  'beginner-essentials': {
    name: 'Seal Carving Beginner Essentials',
    nameCn: '篆刻入门必修课',
    priceId: process.env.STRIPE_PRICE_BEGINNER,
    amount: 12900, // $129.00
  },
  'side-inscription-mastery': {
    name: 'Side Inscription Mastery',
    nameCn: '边款技法精讲',
    priceId: process.env.STRIPE_PRICE_SIDE_INSIGN,
    amount: 14900, // $149.00
  },
  'knife-techniques-advanced': {
    name: 'Advanced Knife Techniques',
    nameCn: '篆刻刀法进阶',
    priceId: process.env.STRIPE_PRICE_KNIFE,
    amount: 17900, // $179.00
  },
  'live-highlights': {
    name: 'Live Q&A Highlights Collection',
    nameCn: '直播答疑精华合集',
    priceId: process.env.STRIPE_PRICE_LIVE,
    amount: 14900, // $149.00
  },
} as const;

// Create checkout session for course purchase
export async function createCourseCheckoutSession({
  courseSlug,
  courseName,
  amount,
  currency = 'usd',
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  courseSlug: string;
  courseName: string;
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
            name: courseName,
            description: `Online course: ${courseName} by Master Jiang Haoxu`,
            images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/courses/${courseSlug}.jpg`],
            metadata: {
              courseSlug,
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
      type: 'course',
      courseSlug,
      courseName,
      customerEmail: customerEmail || '',
    },
  });

  return session;
}

// Get or create Stripe customer
export async function getOrCreateCustomer({
  email,
  name,
}: {
  email: string;
  name?: string;
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  // Try to find existing customer
  const existingCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    return existingCustomers.data[0];
  }

  // Create new customer
  return stripe.customers.create({
    email,
    name,
  });
}

// Create Stripe product and price (for one-time purchases)
export async function createProductAndPrice({
  name,
  amount,
  currency = 'usd',
}: {
  name: string;
  amount: number;
  currency?: string;
}) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }

  // Create product
  const product = await stripe.products.create({
    name,
    type: 'good',
  });

  // Create price
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: formatAmountForStripe(amount, currency),
    currency: currency.toLowerCase(),
  });

  return { product, price };
}

// Verify webhook signature
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error('Stripe webhook secret is not configured');
  }

  return constructWebhookEvent(payload, signature, webhookSecret);
}
