// Order Management System
// Handles order creation, updates, and queries

import { supabaseClient, supabaseServer } from './supabase';
import { Database } from './supabase-types';

export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type OrderStatus = Order['status'];
export type PaymentStatus = Order['payment_status'];

export interface CreateOrderInput {
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  items: Array<{
    workId: string;
    workTitle: string;
    workSlug: string;
    artistName: string;
    price: number;
    imageUrl?: string;
  }>;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  billingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  subtotal: number;
  shippingCost?: number;
  taxAmount?: number;
  currency?: string;
  notes?: string;
  userId?: string;
}

// Generate unique order number
function generateOrderNumber(): string {
  const prefix = 'CE';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

// Create new order
export async function createOrder(input: CreateOrderInput): Promise<Order | null> {
  const orderNumber = generateOrderNumber();
  const total = input.subtotal + (input.shippingCost || 0) + (input.taxAmount || 0);

  // Create order
  const { data: order, error: orderError } = await supabaseServer
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: input.userId || null,
      customer_email: input.customerEmail,
      customer_name: input.customerName,
      customer_phone: input.customerPhone || null,
      status: 'pending',
      payment_status: 'pending',
      subtotal: input.subtotal,
      shipping_cost: input.shippingCost || 0,
      tax_amount: input.taxAmount || 0,
      total,
      currency: input.currency || 'USD',
      shipping_address: input.shippingAddress as any,
      billing_address: input.billingAddress as any,
      notes: input.notes || null,
    } as any)
    .select()
    .single();

  if (orderError || !order) {
    console.error('Error creating order:', orderError);
    return null;
  }

  const orderData = order as Order;

  // Create order items
  const orderItems = input.items.map((item) => ({
    order_id: orderData.id,
    work_id: item.workId,
    work_title: item.workTitle,
    work_slug: item.workSlug,
    artist_name: item.artistName,
    price: item.price,
    currency: input.currency || 'USD',
    quantity: 1,
    image_url: item.imageUrl || null,
  }));

  const { error: itemsError } = await supabaseServer
    .from('order_items')
    .insert(orderItems as any);

  if (itemsError) {
    console.error('Error creating order items:', itemsError);
    // Rollback order
    await supabaseServer.from('orders').delete().eq('id', orderData.id);
    return null;
  }

  return orderData;
}

// Get order by ID
export async function getOrderById(orderId: string): Promise<(Order & { items: OrderItem[] }) | null> {
  const { data: order, error } = await supabaseClient
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (error || !order) {
    console.error('Error fetching order:', error);
    return null;
  }

  const { data: items } = await supabaseClient
    .from('order_items')
    .select('*')
    .eq('order_id', orderId);

  return { ...(order as Order), items: items || [] };
}

// Get order by order number
export async function getOrderByNumber(orderNumber: string): Promise<(Order & { items: OrderItem[] }) | null> {
  const { data: order, error } = await supabaseClient
    .from('orders')
    .select('*')
    .eq('order_number', orderNumber)
    .single();

  if (error || !order) {
    console.error('Error fetching order:', error);
    return null;
  }

  const orderData = order as Order;

  const { data: items } = await supabaseClient
    .from('order_items')
    .select('*')
    .eq('order_id', orderData.id);

  return { ...orderData, items: items || [] };
}

// List orders with filters
export async function listOrders(options: {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  customerEmail?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'created_at' | 'total' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
} = {}): Promise<{ orders: Order[]; total: number }> {
  const {
    status,
    paymentStatus,
    customerEmail,
    limit = 20,
    offset = 0,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = options;

  let query = supabaseClient.from('orders').select('*', { count: 'exact' });

  if (status) {
    query = query.eq('status', status);
  }

  if (paymentStatus) {
    query = query.eq('payment_status', paymentStatus);
  }

  if (customerEmail) {
    query = query.eq('customer_email', customerEmail);
  }

  const { data, error, count } = await query
    .order(sortBy, { ascending: sortOrder === 'asc' })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error listing orders:', error);
    return { orders: [], total: 0 };
  }

  return { orders: data || [], total: count || 0 };
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  updates?: Partial<Order>
): Promise<Order | null> {
  const updateData: Partial<Order> = {
    status,
    updated_at: new Date().toISOString(),
    ...updates,
  };

  // Set timestamps based on status
  if (status === 'paid') {
    updateData.paid_at = new Date().toISOString();
  } else if (status === 'shipped') {
    updateData.shipped_at = new Date().toISOString();
  } else if (status === 'delivered') {
    updateData.delivered_at = new Date().toISOString();
  }

  const { data, error } = await supabaseServer
    .from('orders')
    .update(updateData as any)
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating order status:', error);
    return null;
  }

  return data;
}

// Update payment status
export async function updatePaymentStatus(
  orderId: string,
  paymentStatus: PaymentStatus,
  paymentIntentId?: string
): Promise<Order | null> {
  const updates: Partial<Order> = {
    payment_status: paymentStatus,
    updated_at: new Date().toISOString(),
  };

  if (paymentIntentId) {
    updates.payment_intent_id = paymentIntentId;
  }

  if (paymentStatus === 'paid') {
    updates.status = 'paid';
    updates.paid_at = new Date().toISOString();
  }

  const { data, error } = await supabaseServer
    .from('orders')
    .update(updates)
    .eq('id', orderId)
    .select()
    .single();

  if (error) {
    console.error('Error updating payment status:', error);
    return null;
  }

  return data;
}

// Add shipping tracking
export async function addShippingTracking(
  orderId: string,
  tracking: {
    carrier: string;
    trackingNumber: string;
    trackingUrl?: string;
    shippedAt: string;
    estimatedDelivery?: string;
  }
): Promise<boolean> {
  const { error } = await supabaseServer.from('shipping_tracking').insert({
    order_id: orderId,
    carrier: tracking.carrier,
    tracking_number: tracking.trackingNumber,
    tracking_url: tracking.trackingUrl || null,
    status: 'pre_transit',
    shipped_at: tracking.shippedAt,
    estimated_delivery: tracking.estimatedDelivery || null,
  });

  if (error) {
    console.error('Error adding shipping tracking:', error);
    return false;
  }

  // Update order status to shipped
  await updateOrderStatus(orderId, 'shipped');

  return true;
}

// Get order statistics
export async function getOrderStats(): Promise<{
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  paidOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
}> {
  const { data, error } = await supabaseClient
    .from('order_summary')
    .select('*');

  if (error || !data) {
    console.error('Error fetching order stats:', error);
    return {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      paidOrders: 0,
      shippedOrders: 0,
      cancelledOrders: 0,
    };
  }

  const stats = {
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    paidOrders: 0,
    shippedOrders: 0,
    cancelledOrders: 0,
  };

  data.forEach((row: any) => {
    stats.totalOrders += row.count;
    stats.totalRevenue += row.total_revenue;

    switch (row.status) {
      case 'pending':
        stats.pendingOrders = row.count;
        break;
      case 'paid':
      case 'processing':
        stats.paidOrders += row.count;
        break;
      case 'shipped':
        stats.shippedOrders = row.count;
        break;
      case 'cancelled':
      case 'refunded':
        stats.cancelledOrders += row.count;
        break;
    }
  });

  return stats;
}

// Get daily order stats
export async function getDailyOrderStats(days: number = 30): Promise<
  Array<{
    date: string;
    orderCount: number;
    revenue: number;
  }>
> {
  const { data, error } = await supabaseClient
    .from('daily_orders')
    .select('*')
    .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
    .order('date', { ascending: true });

  if (error || !data) {
    console.error('Error fetching daily stats:', error);
    return [];
  }

  return data.map((row: any) => ({
    date: row.date,
    orderCount: row.order_count,
    revenue: row.revenue,
  }));
}
