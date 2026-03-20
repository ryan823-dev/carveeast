import { NextRequest, NextResponse } from 'next/server';
import { capturePayPalOrder, getPayPalOrderDetails } from '@/lib/paypal';

// POST /api/paypal/capture-order
// Captures a PayPal order after approval
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Capture the order
    const result = await capturePayPalOrder(orderId);

    // Get full order details
    const orderDetails = await getPayPalOrderDetails(orderId);

    return NextResponse.json({
      success: true,
      status: result.status,
      payerId: result.payerId,
      email: result.email,
      orderDetails,
    });
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    return NextResponse.json(
      { error: 'Failed to capture order' },
      { status: 500 }
    );
  }
}

// GET /api/paypal/capture-order?orderId=xxx
// Retrieves order status
export async function GET(request: NextRequest) {
  try {
    const orderId = request.nextUrl.searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    const orderDetails = await getPayPalOrderDetails(orderId);

    return NextResponse.json(orderDetails);
  } catch (error) {
    console.error('Error getting PayPal order:', error);
    return NextResponse.json(
      { error: 'Failed to get order' },
      { status: 500 }
    );
  }
}
