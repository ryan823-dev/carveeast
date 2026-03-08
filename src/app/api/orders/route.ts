import { NextRequest, NextResponse } from 'next/server';
import { listOrders, createOrder, getOrderStats, getDailyOrderStats } from '@/lib/orders';
import { CreateOrderInput } from '@/lib/orders';

// GET /api/orders - List orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const options = {
      status: searchParams.get('status') as any,
      paymentStatus: searchParams.get('paymentStatus') as any,
      customerEmail: searchParams.get('customerEmail') || undefined,
      limit: parseInt(searchParams.get('limit') || '20'),
      offset: parseInt(searchParams.get('offset') || '0'),
      sortBy: (searchParams.get('sortBy') as any) || 'created_at',
      sortOrder: (searchParams.get('sortOrder') as any) || 'desc',
    };

    // Check if requesting stats
    if (searchParams.get('stats') === 'true') {
      const stats = await getOrderStats();
      return NextResponse.json(stats);
    }

    // Check if requesting daily stats
    if (searchParams.get('daily') === 'true') {
      const days = parseInt(searchParams.get('days') || '30');
      const stats = await getDailyOrderStats(days);
      return NextResponse.json(stats);
    }

    const { orders, total } = await listOrders(options);

    return NextResponse.json({
      orders,
      total,
      limit: options.limit,
      offset: options.offset,
    });
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderInput = await request.json();

    // Validate required fields
    if (!body.customerEmail || !body.customerName || !body.items?.length) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const order = await createOrder(body);

    if (!order) {
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/orders:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
