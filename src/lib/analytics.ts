// Analytics System for CarveEast
// Tracks page views, user behavior, and sales metrics

import { supabaseClient, supabaseServer } from './supabase';

export interface PageView {
  id?: string;
  path: string;
  referrer?: string;
  userAgent?: string;
  ip?: string;
  userId?: string;
}

export interface SalesMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  topWorks: Array<{
    workId: string;
    title: string;
    sales: number;
    revenue: number;
  }>;
  topArtists: Array<{
    artistId: string;
    name: string;
    sales: number;
    revenue: number;
  }>;
}

export interface TrafficMetrics {
  totalPageViews: number;
  uniqueVisitors: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
  referrers: Array<{
    source: string;
    count: number;
  }>;
  dailyTraffic: Array<{
    date: string;
    pageViews: number;
    uniqueVisitors: number;
  }>;
}

// Track page view
export async function trackPageView(view: PageView): Promise<void> {
  try {
    await supabaseServer.from('page_views').insert({
      path: view.path,
      referrer: view.referrer || null,
      user_agent: view.userAgent || null,
      ip: view.ip || null,
      user_id: view.userId || null,
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}

// Get sales metrics
export async function getSalesMetrics(
  startDate?: string,
  endDate?: string
): Promise<SalesMetrics> {
  try {
    let query = supabaseClient.from('orders').select('*');

    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data: orders, error } = await query;

    if (error || !orders) {
      throw error;
    }

    const paidOrders = orders.filter((o: any) => o.payment_status === 'paid');
    const totalRevenue = paidOrders.reduce((sum: number, o: any) => sum + o.total, 0);

    return {
      totalRevenue,
      totalOrders: paidOrders.length,
      averageOrderValue: paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0,
      conversionRate: 0, // Requires page view data
      topWorks: [], // Would need order_items aggregation
      topArtists: [],
    };
  } catch (error) {
    console.error('Error getting sales metrics:', error);
    return {
      totalRevenue: 0,
      totalOrders: 0,
      averageOrderValue: 0,
      conversionRate: 0,
      topWorks: [],
      topArtists: [],
    };
  }
}

// Get traffic metrics
export async function getTrafficMetrics(
  days: number = 30
): Promise<TrafficMetrics> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: pageViews, error } = await supabaseClient
      .from('page_views')
      .select('*')
      .gte('created_at', startDate.toISOString());

    if (error || !pageViews) {
      throw error;
    }

    // Calculate top pages
    const pageCounts: Record<string, number> = {};
    pageViews.forEach((pv: any) => {
      pageCounts[pv.path] = (pageCounts[pv.path] || 0) + 1;
    });

    const topPages = Object.entries(pageCounts)
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Calculate referrers
    const referrerCounts: Record<string, number> = {};
    pageViews.forEach((pv: any) => {
      if (pv.referrer) {
        try {
          const source = new URL(pv.referrer).hostname;
          referrerCounts[source] = (referrerCounts[source] || 0) + 1;
        } catch {
          // Invalid URL, skip
        }
      }
    });

    const referrers = Object.entries(referrerCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate daily traffic
    const dailyData: Record<string, { pageViews: number; uniqueIps: Set<string> }> = {};
    pageViews.forEach((pv: any) => {
      const date = pv.created_at.split('T')[0];
      if (!dailyData[date]) {
        dailyData[date] = { pageViews: 0, uniqueIps: new Set() };
      }
      dailyData[date].pageViews++;
      if (pv.ip) {
        dailyData[date].uniqueIps.add(pv.ip);
      }
    });

    const dailyTraffic = Object.entries(dailyData)
      .map(([date, data]) => ({
        date,
        pageViews: data.pageViews,
        uniqueVisitors: data.uniqueIps.size,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Estimate unique visitors (by IP)
    const uniqueIps = new Set(pageViews.map((pv: any) => pv.ip).filter(Boolean));

    return {
      totalPageViews: pageViews.length,
      uniqueVisitors: uniqueIps.size,
      topPages,
      referrers,
      dailyTraffic,
    };
  } catch (error) {
    console.error('Error getting traffic metrics:', error);
    return {
      totalPageViews: 0,
      uniqueVisitors: 0,
      topPages: [],
      referrers: [],
      dailyTraffic: [],
    };
  }
}

// Get dashboard summary
export async function getDashboardSummary(): Promise<{
  todayOrders: number;
  todayRevenue: number;
  todayPageViews: number;
  weekOrders: number;
  weekRevenue: number;
  monthOrders: number;
  monthRevenue: number;
}> {
  try {
    const today = new Date().toISOString().split('T')[0];
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    // Today's orders
    const { data: todayOrders } = await supabaseClient
      .from('orders')
      .select('total, payment_status')
      .gte('created_at', today);

    // Week orders
    const { data: weekOrders } = await supabaseClient
      .from('orders')
      .select('total, payment_status')
      .gte('created_at', weekAgo);

    // Month orders
    const { data: monthOrders } = await supabaseClient
      .from('orders')
      .select('total, payment_status')
      .gte('created_at', monthAgo);

    // Today's page views
    const { data: todayViews } = await supabaseClient
      .from('page_views')
      .select('id', { count: 'exact' })
      .gte('created_at', today);

    const calcRevenue = (orders: any[]) =>
      orders
        ?.filter((o: any) => o.payment_status === 'paid')
        .reduce((sum: number, o: any) => sum + o.total, 0) || 0;

    return {
      todayOrders: todayOrders?.filter((o: any) => o.payment_status === 'paid').length || 0,
      todayRevenue: calcRevenue(todayOrders || []),
      todayPageViews: todayViews?.length || 0,
      weekOrders: weekOrders?.filter((o: any) => o.payment_status === 'paid').length || 0,
      weekRevenue: calcRevenue(weekOrders || []),
      monthOrders: monthOrders?.filter((o: any) => o.payment_status === 'paid').length || 0,
      monthRevenue: calcRevenue(monthOrders || []),
    };
  } catch (error) {
    console.error('Error getting dashboard summary:', error);
    return {
      todayOrders: 0,
      todayRevenue: 0,
      todayPageViews: 0,
      weekOrders: 0,
      weekRevenue: 0,
      monthOrders: 0,
      monthRevenue: 0,
    };
  }
}
