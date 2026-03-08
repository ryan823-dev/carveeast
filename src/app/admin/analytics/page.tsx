'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';

interface DashboardSummary {
  todayOrders: number;
  todayRevenue: number;
  todayPageViews: number;
  weekOrders: number;
  weekRevenue: number;
  monthOrders: number;
  monthRevenue: number;
}

interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
}

interface TrafficMetrics {
  totalPageViews: number;
  uniqueVisitors: number;
  topPages: Array<{ path: string; views: number }>;
  referrers: Array<{ source: string; count: number }>;
  dailyTraffic: Array<{
    date: string;
    pageViews: number;
    uniqueVisitors: number;
  }>;
}

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [sales, setSales] = useState<SalesMetrics | null>(null);
  const [traffic, setTraffic] = useState<TrafficMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    fetchAnalytics();
  }, [dateRange]);

  async function fetchAnalytics() {
    setLoading(true);
    try {
      // Fetch summary
      const summaryRes = await fetch('/api/analytics?type=summary');
      if (summaryRes.ok) {
        setSummary(await summaryRes.json());
      }

      // Fetch sales metrics
      const salesRes = await fetch('/api/analytics?type=sales');
      if (salesRes.ok) {
        setSales(await salesRes.json());
      }

      // Fetch traffic metrics
      const trafficRes = await fetch(`/api/analytics?type=traffic&days=${dateRange}`);
      if (trafficRes.ok) {
        setTraffic(await trafficRes.json());
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
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
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Analytics Dashboard"
          subtitle="Track your business performance"
          centered={false}
        />
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-[#E5E4E2] rounded-lg focus:outline-none focus:border-[#B83A2F]"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(summary?.monthRevenue || 0)}
          change={+12.5}
          icon={DollarSign}
          color="bg-green-50 text-green-600"
        />
        <MetricCard
          title="Total Orders"
          value={summary?.monthOrders || 0}
          change={+8.2}
          icon={ShoppingBag}
          color="bg-blue-50 text-blue-600"
        />
        <MetricCard
          title="Page Views"
          value={traffic?.totalPageViews || 0}
          change={+24.1}
          icon={Eye}
          color="bg-purple-50 text-purple-600"
        />
        <MetricCard
          title="Unique Visitors"
          value={traffic?.uniqueVisitors || 0}
          change={-3.4}
          icon={Users}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#1A1A1A] mb-6">
            Revenue Overview
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-[#F5F4F2] rounded-lg">
              <div>
                <p className="text-sm text-[#7A7A78]">Today</p>
                <p className="text-xl font-medium text-[#1A1A1A]">
                  {formatCurrency(summary?.todayRevenue || 0)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#7A7A78]">Orders</p>
                <p className="text-lg font-medium text-[#1A1A1A]">
                  {summary?.todayOrders || 0}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#F5F4F2] rounded-lg">
              <div>
                <p className="text-sm text-[#7A7A78]">This Week</p>
                <p className="text-xl font-medium text-[#1A1A1A]">
                  {formatCurrency(summary?.weekRevenue || 0)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#7A7A78]">Orders</p>
                <p className="text-lg font-medium text-[#1A1A1A]">
                  {summary?.weekOrders || 0}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 bg-[#F5F4F2] rounded-lg">
              <div>
                <p className="text-sm text-[#7A7A78]">This Month</p>
                <p className="text-xl font-medium text-[#1A1A1A]">
                  {formatCurrency(summary?.monthRevenue || 0)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#7A7A78]">Orders</p>
                <p className="text-lg font-medium text-[#1A1A1A]">
                  {summary?.monthOrders || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Traffic Chart */}
        <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#1A1A1A] mb-6">
            Traffic Overview
          </h3>
          {traffic?.dailyTraffic && traffic.dailyTraffic.length > 0 ? (
            <div className="space-y-2">
              {traffic.dailyTraffic.slice(-7).map((day) => (
                <div key={day.date} className="flex items-center gap-4">
                  <div className="w-24 text-sm text-[#7A7A78]">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="flex-1 h-8 bg-[#F5F4F2] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#B83A2F] rounded-full"
                      style={{
                        width: `${Math.min(
                          (day.pageViews / (traffic?.totalPageViews || 1)) * 100 * 7,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="w-16 text-right text-sm text-[#4A4A48]">
                    {day.pageViews}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#7A7A78]">
              No traffic data available
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#1A1A1A] mb-6">
            Top Pages
          </h3>
          {traffic?.topPages && traffic.topPages.length > 0 ? (
            <div className="space-y-3">
              {traffic.topPages.slice(0, 5).map((page, index) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between p-3 bg-[#F5F4F2] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#E5E4E2] flex items-center justify-center text-xs text-[#7A7A78]">
                      {index + 1}
                    </span>
                    <span className="text-[#4A4A48] truncate max-w-[200px]">
                      {page.path}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {page.views} views
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#7A7A78]">
              No page data available
            </div>
          )}
        </div>

        {/* Top Referrers */}
        <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#1A1A1A] mb-6">
            Top Referrers
          </h3>
          {traffic?.referrers && traffic.referrers.length > 0 ? (
            <div className="space-y-3">
              {traffic.referrers.slice(0, 5).map((ref, index) => (
                <div
                  key={ref.source}
                  className="flex items-center justify-between p-3 bg-[#F5F4F2] rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#E5E4E2] flex items-center justify-center text-xs text-[#7A7A78]">
                      {index + 1}
                    </span>
                    <span className="text-[#4A4A48]">{ref.source}</span>
                  </div>
                  <span className="text-sm font-medium text-[#1A1A1A]">
                    {ref.count} visits
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[#7A7A78]">
              No referrer data available
            </div>
          )}
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
        <h3 className="text-lg font-medium text-[#1A1A1A] mb-6">
          Sales Performance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-[#F5F4F2] rounded-lg">
            <p className="text-sm text-[#7A7A78]">Average Order Value</p>
            <p className="text-3xl font-medium text-[#1A1A1A] mt-2">
              {formatCurrency(sales?.averageOrderValue || 0)}
            </p>
          </div>
          <div className="text-center p-6 bg-[#F5F4F2] rounded-lg">
            <p className="text-sm text-[#7A7A78]">Conversion Rate</p>
            <p className="text-3xl font-medium text-[#1A1A1A] mt-2">
              {(sales?.conversionRate || 0).toFixed(2)}%
            </p>
          </div>
          <div className="text-center p-6 bg-[#F5F4F2] rounded-lg">
            <p className="text-sm text-[#7A7A78]">Total Paid Orders</p>
            <p className="text-3xl font-medium text-[#1A1A1A] mt-2">
              {sales?.totalOrders || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  color: string;
}) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white border border-[#E5E4E2] rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[#7A7A78]">{title}</p>
          <p className="text-2xl font-medium text-[#1A1A1A] mt-1">{value}</p>
          <div className="flex items-center gap-1 mt-2">
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 text-green-600" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {isPositive ? '+' : ''}
              {change}%
            </span>
            <span className="text-sm text-[#7A7A78]">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
