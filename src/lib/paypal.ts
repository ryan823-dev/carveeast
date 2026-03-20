/**
 * PayPal SDK Integration for CarveEast
 * Documentation: https://developer.paypal.com/sdk/js/
 */

// PayPal configuration
export const paypalConfig = {
  clientId: process.env.PAYPAL_CLIENT_ID || '',
  clientSecret: process.env.PAYPAL_CLIENT_SECRET || '',
  mode: (process.env.PAYPAL_MODE || 'sandbox') as 'sandbox' | 'live',
};

// Check if PayPal is configured
export function isPayPalConfigured(): boolean {
  return !!(paypalConfig.clientId && paypalConfig.clientSecret);
}

// Get PayPal environment
export function getPayPalEnvironment(): 'sandbox' | 'live' {
  return paypalConfig.mode;
}

// Course payment amounts (in USD cents for consistency)
export const PAYPAL_COURSE_AMOUNTS = {
  'beginner-essentials': { name: 'Seal Carving Beginner Essentials', nameCn: '篆刻入门必修课', amount: 129.00 },
  'side-inscription-mastery': { name: 'Side Inscription Mastery', nameCn: '边款技法精讲', amount: 149.00 },
  'knife-techniques-advanced': { name: 'Advanced Knife Techniques', nameCn: '篆刻刀法进阶', amount: 179.00 },
  'live-highlights': { name: 'Live Q&A Highlights Collection', nameCn: '直播答疑精华合集', amount: 149.00 },
} as const;

// Get access token from PayPal (server-side only)
export async function getPayPalAccessToken(): Promise<string> {
  if (!isPayPalConfigured()) {
    throw new Error('PayPal is not configured');
  }

  const auth = Buffer.from(`${paypalConfig.clientId}:${paypalConfig.clientSecret}`).toString('base64');
  const baseUrl = paypalConfig.mode === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token');
  }

  const data = await response.json();
  return data.access_token;
}

// Create PayPal Order (server-side)
export async function createPayPalOrder({
  amount,
  currency = 'USD',
  description,
  courseSlug,
  customerEmail,
}: {
  amount: number;
  currency?: string;
  description: string;
  courseSlug: string;
  customerEmail?: string;
}): Promise<{ orderId: string }> {
  const accessToken = await getPayPalAccessToken();
  const baseUrl = paypalConfig.mode === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const response = await fetch(`${baseUrl}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: description,
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          custom_id: courseSlug,
        },
      ],
      ...(customerEmail && {
        payer: {
          email_address: customerEmail,
        },
      }),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create PayPal order: ${error}`);
  }

  const order = await response.json();
  return { orderId: order.id };
}

// Capture PayPal Order (server-side)
export async function capturePayPalOrder(orderId: string): Promise<{
  status: string;
  payerId?: string;
  email?: string;
}> {
  const accessToken = await getPayPalAccessToken();
  const baseUrl = paypalConfig.mode === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const response = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to capture PayPal order: ${error}`);
  }

  const capture = await response.json();
  return {
    status: capture.status,
    payerId: capture.payer?.payer_id,
    email: capture.payer?.email_address,
  };
}

// Get PayPal Order Details
export async function getPayPalOrderDetails(orderId: string): Promise<Record<string, unknown>> {
  const accessToken = await getPayPalAccessToken();
  const baseUrl = paypalConfig.mode === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com';

  const response = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal order details');
  }

  return response.json();
}
