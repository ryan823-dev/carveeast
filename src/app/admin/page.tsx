'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Clock,
  CheckCircle,
  Truck,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  paidOrders: number;
  shippedOrders: number;
  cancelledOrders: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  customer_name: string;
  total: number;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      // Fetch stats
      const statsRes = await fetch('/api/orders?stats=true');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch recent orders
      const ordersRes = await fetch('/api/orders?limit=5&sortBy=created_at&sortOrder=desc');
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setRecentOrders(ordersData.orders);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      label: 'Total Orders',
      value: stats?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Total Revenue',
      value: stats ? `$${stats.totalRevenue.toLocaleString()}` : '$0',
      icon: DollarSign,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Pending Orders',
      value: stats?.pendingOrders || 0,
      icon: Clock,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Shipped Orders',
      value: stats?.shippedOrders || 0,
      icon: Truck,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      paid: 'bg-blue-100 text-blue-700',
      processing: 'bg-purple-100 text-purple-700',
      shipped: 'bg-indigo-100 text-indigo-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      refunded: 'bg-gray-100 text-gray-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83A2F]" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-white border border-[#E5E4E2] p-6 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#7A7A78]">{card.label}</p>
                <p className="text-2xl font-medium text-[#1A1A1A] mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-[#E5E4E2] rounded-lg">
        <div className="p-6 border-b border-[#E5E4E2]">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-[#1A1A1A]">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="flex items-center gap-1 text-sm text-[#B83A2F] hover:underline"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="divide-y divide-[#E5E4E2]">
          {recentOrders.length === 0 ? (
            <div className="p-8 text-center text-[#7A7A78]">
              No orders yet
            </div>
          ) : (
            recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 flex items-center justify-between hover:bg-[#F5F4F2] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#F5F4F2] flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-[#7A7A78]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">
                      {order.order_number}
                    </p>
                    <p className="text-sm text-[#7A7A78]">
                      {order.customer_name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium text-[#1A1A1A]">
                    ${order.total.toLocaleString()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/orders"
          className="bg-white border border-[#E5E4E2] p-6 rounded-lg hover:border-[#B83A2F] transition-colors"
        >
          <ShoppingBag className="w-8 h-8 text-[#B83A2F] mb-4" />
          <h3 className="font-medium text-[#1A1A1A]">Manage Orders</h3>
          <p className="text-sm text-[#7A7A78] mt-1">
            View and process customer orders
          </p>
        </Link>

        <Link
          href="/admin/works"
          className="bg-white border border-[#E5E4E2] p-6 rounded-lg hover:border-[#B83A2F] transition-colors"
        >
          <Package className="w-8 h-8 text-[#B83A2F] mb-4" />
          <h3 className="font-medium text-[#1A1A1A]">Manage Works</h3>
          <p className="text-sm text-[#7A7A78] mt-1">
            Add and edit artwork listings
          </p>
        </Link>

        <Link
          href="/admin/analytics"
          className="bg-white border border-[#E5E4E2] p-6 rounded-lg hover:border-[#B83A2F] transition-colors"
        >
          <TrendingUp className="w-8 h-8 text-[#B83A2F] mb-4" />
          <h3 className="font-medium text-[#1A1A1A]">View Analytics</h3>
          <p className="text-sm text-[#7A7A78] mt-1">
            Track sales and performance
          </p>
        </Link>
      </div>
    </div>
  );
}
