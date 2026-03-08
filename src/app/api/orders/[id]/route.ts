import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrderStatus, updatePaymentStatus } from '@/lib/orders';

// GET /api/orders/[id] - Get order details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await getOrderById(id);

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Error in GET /api/orders/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] - Update order
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    // Check if order exists
    const existingOrder = await getOrderById(id);
    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update status if provided
    if (body.status) {
      const updates: any = {};

      if (body.shippingAddress) {
        updates.shipping_address = body.shippingAddress;
      }

      if (body.notes !== undefined) {
        updates.notes = body.notes;
      }

      const updated = await updateOrderStatus(id, body.status, updates);

      if (!updated) {
        return NextResponse.json(
          { error: 'Failed to update order status' },
          { status: 500 }
        );
      }

      return NextResponse.json(updated);
    }

    // Update payment status if provided
    if (body.paymentStatus) {
      const updated = await updatePaymentStatus(
        id,
        body.paymentStatus,
        body.paymentIntentId
      );

      if (!updated) {
        return NextResponse.json(
          { error: 'Failed to update payment status' },
          { status: 500 }
        );
      }

      return NextResponse.json(updated);
    }

    return NextResponse.json(
      { error: 'No valid update fields provided' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in PATCH /api/orders/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}
