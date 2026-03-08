'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  MapPin,
  User,
  Mail,
  Phone,
  CreditCard,
  Edit,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

interface OrderItem {
  id: string;
  work_title: string;
  work_slug: string;
  artist_name: string;
  price: number;
  image_url: string | null;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  status: string;
  payment_status: string;
  subtotal: number;
  shipping_cost: number;
  tax_amount: number;
  total: number;
  currency: string;
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  billing_address: {
    line1: string;
    line2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  notes: string | null;
  created_at: string;
  paid_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  items: OrderItem[];
}

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'paid', label: 'Paid', color: 'bg-blue-100 text-blue-700' },
  { value: 'processing', label: 'Processing', color: 'bg-purple-100 text-purple-700' },
  { value: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-700' },
  { value: 'delivered', label: 'Delivered', color: 'bg-green-100 text-green-700' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-700' },
  { value: 'refunded', label: 'Refunded', color: 'bg-gray-100 text-gray-700' },
];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [params.id]);

  async function fetchOrder() {
    try {
      const res = await fetch(`/api/orders/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
      } else {
        router.push('/admin/orders');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus() {
    if (!newStatus || !order) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${order.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updated = await res.json();
        setOrder(updated);
        setShowStatusModal(false);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83A2F]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-[#7A7A78]">Order not found</p>
        <Link
          href="/admin/orders"
          className="text-[#B83A2F] hover:underline mt-2 inline-block"
        >
          Back to orders
        </Link>
      </div>
    );
  }

  const currentStatus = statusOptions.find((s) => s.value === order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/orders"
            className="p-2 text-[#7A7A78] hover:text-[#1A1A1A] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-medium text-[#1A1A1A]">
              {order.order_number}
            </h1>
            <p className="text-sm text-[#7A7A78]">
              Placed on {new Date(order.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setNewStatus(order.status);
            setShowStatusModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors"
        >
          <Edit className="w-4 h-4" />
          <span>Update Status</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white border border-[#E5E4E2] rounded-lg">
            <div className="p-6 border-b border-[#E5E4E2]">
              <h2 className="text-lg font-medium text-[#1A1A1A]">
                Order Items ({order.items.length})
              </h2>
            </div>
            <div className="divide-y divide-[#E5E4E2]">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 flex gap-4">
                  <div className="w-20 h-20 bg-[#F5F4F2] rounded-lg overflow-hidden">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.work_title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-8 h-8 text-[#C5C5C3]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/works/${item.work_slug}`}
                      className="font-medium text-[#1A1A1A] hover:text-[#B83A2F]"
                    >
                      {item.work_title}
                    </Link>
                    <p className="text-sm text-[#7A7A78]">by {item.artist_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#1A1A1A]">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
            <h2 className="text-lg font-medium text-[#1A1A1A] mb-6">
              Order Timeline
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A1A]">Order Placed</p>
                  <p className="text-sm text-[#7A7A78]">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              {order.paid_at && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Payment Confirmed</p>
                    <p className="text-sm text-[#7A7A78]">
                      {new Date(order.paid_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {order.shipped_at && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Order Shipped</p>
                    <p className="text-sm text-[#7A7A78]">
                      {new Date(order.shipped_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {order.delivered_at && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Order Delivered</p>
                    <p className="text-sm text-[#7A7A78]">
                      {new Date(order.delivered_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Card */}
          <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
            <h3 className="text-sm font-medium text-[#7A7A78] uppercase tracking-wider mb-4">
              Order Status
            </h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                currentStatus?.color || 'bg-gray-100 text-gray-700'
              }`}
            >
              {currentStatus?.label || order.status}
            </span>

            <div className="mt-4 pt-4 border-t border-[#E5E4E2]">
              <h3 className="text-sm font-medium text-[#7A7A78] uppercase tracking-wider mb-2">
                Payment Status
              </h3>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  order.payment_status === 'paid'
                    ? 'bg-green-100 text-green-700'
                    : order.payment_status === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {order.payment_status}
              </span>
            </div>
          </div>

          {/* Customer Info */}
          <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
            <h3 className="text-sm font-medium text-[#7A7A78] uppercase tracking-wider mb-4">
              Customer
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#7A7A78]" />
                <span className="text-[#1A1A1A]">{order.customer_name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#7A7A78]" />
                <a
                  href={`mailto:${order.customer_email}`}
                  className="text-[#B83A2F] hover:underline"
                >
                  {order.customer_email}
                </a>
              </div>
              {order.customer_phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#7A7A78]" />
                  <a
                    href={`tel:${order.customer_phone}`}
                    className="text-[#B83A2F] hover:underline"
                  >
                    {order.customer_phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
            <h3 className="text-sm font-medium text-[#7A7A78] uppercase tracking-wider mb-4">
              Shipping Address
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#7A7A78] mt-1" />
              <div className="text-[#4A4A48]">
                <p>{order.shipping_address.line1}</p>
                {order.shipping_address.line2 && (
                  <p>{order.shipping_address.line2}</p>
                )}
                <p>
                  {order.shipping_address.city},{' '}
                  {order.shipping_address.state}{' '}
                  {order.shipping_address.postalCode}
                </p>
                <p>{order.shipping_address.country}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
            <h3 className="text-sm font-medium text-[#7A7A78] uppercase tracking-wider mb-4">
              Order Summary
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-[#4A4A48]">
                <span>Subtotal</span>
                <span>${order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4A4A48]">
                <span>Shipping</span>
                <span>${order.shipping_cost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#4A4A48]">
                <span>Tax</span>
                <span>${order.tax_amount.toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-[#E5E4E2] flex justify-between font-medium text-lg text-[#1A1A1A]">
                <span>Total</span>
                <span>${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {order.notes && (
            <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
              <h3 className="text-sm font-medium text-[#7A7A78] uppercase tracking-wider mb-2">
                Notes
              </h3>
              <p className="text-[#4A4A48]">{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-lg">
            <h3 className="text-xl font-medium text-[#1A1A1A] mb-4">
              Update Order Status
            </h3>
            <div className="space-y-2 mb-6">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => setNewStatus(status.value)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    newStatus === status.value
                      ? 'border-[#B83A2F] bg-[#FEF2F0]'
                      : 'border-[#E5E4E2] hover:border-[#1A1A1A]'
                  }`}
                >
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mr-2 ${status.color}`}>
                    {status.label}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowStatusModal(false)}
                className="flex-1 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={updateStatus}
                disabled={updating || newStatus === order.status}
                className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
