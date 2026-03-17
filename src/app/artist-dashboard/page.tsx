'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCurrentUser } from '@/lib/auth';
import { User, ArtistProfile } from '@/lib/auth';
import { Package, Image as ImageIcon, FileText, Settings, Plus, TrendingUp, DollarSign, Users } from 'lucide-react';

export default function ArtistDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalWorks: 0,
    availableWorks: 0,
    soldWorks: 0,
    totalRevenue: 0,
    thisMonth: 0,
    views: 0,
    favorites: 0,
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      router.push('/login?callbackUrl=/artist-dashboard');
      return;
    }
    
    if (currentUser.role !== 'artist') {
      router.push('/profile');
      return;
    }
    
    setUser(currentUser);
    
    // Fetch stats from database
    fetchStats(currentUser);
    
    setIsLoading(false);
  }, [router]);

  const fetchStats = async (user: User) => {
    try {
      // For now, we'll use mock data since we don't have real user-artist linking yet
      // In production, you would fetch from the database based on user's artist profile
      const mockStats = {
        totalWorks: 23,
        availableWorks: 18,
        soldWorks: 5,
        totalRevenue: 45800,
        thisMonth: 8200,
        views: 12450,
        favorites: 328,
      };
      setStats(mockStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1A1A1A] mx-auto mb-4" />
            <p className="text-[#7A7A78]">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user || !user.artistProfile) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAF8]">
        {/* Dashboard Header */}
        <div className="bg-[#1A1A1A] text-white py-12">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="flex items-center gap-6">
              {user.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-white/20"
                />
              )}
              <div>
                <h1 className="text-3xl font-serif font-semibold mb-2">
                  {user.name}
                </h1>
                <p className="text-white/70">
                  {user.artistProfile.shortBio}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-white/60">
                  <span>{user.artistProfile.location?.city}, {user.artistProfile.location?.country}</span>
                  <span>•</span>
                  <span>Artist since {user.artistProfile.yearStarted}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 -mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              icon={<Package className="w-6 h-6" />}
              label="Total Works"
              value={stats.totalWorks.toString()}
              subtext={`${stats.availableWorks} available, ${stats.soldWorks} sold`}
              color="bg-[#B83A2F]"
            />
            <StatCard
              icon={<DollarSign className="w-6 h-6" />}
              label="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              subtext={`$${stats.thisMonth.toLocaleString()} this month`}
              color="bg-green-600"
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6" />}
              label="Profile Views"
              value={stats.views.toLocaleString()}
              subtext="Last 30 days"
              color="bg-blue-600"
            />
            <StatCard
              icon={<Users className="w-6 h-6" />}
              label="Favorites"
              value={stats.favorites.toString()}
              subtext="Collectors following you"
              color="bg-purple-600"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
          <h2 className="text-2xl font-serif font-semibold text-[#1A1A1A] mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ActionButton
              icon={<Plus className="w-6 h-6" />}
              title="Add New Work"
              description="List a new artwork for sale"
              href="/artist-dashboard/works/new"
            />
            <ActionButton
              icon={<ImageIcon className="w-6 h-6" />}
              title="Manage Works"
              description="Edit or remove existing works"
              href="/artist-dashboard/works"
            />
            <ActionButton
              icon={<FileText className="w-6 h-6" />}
              title="Edit Profile"
              description="Update your bio and information"
              href="/artist-dashboard/profile"
            />
            <ActionButton
              icon={<Settings className="w-6 h-6" />}
              title="Settings"
              description="Account settings and preferences"
              href="/artist-dashboard/settings"
            />
          </div>
        </div>

        {/* Recent Works */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-serif font-semibold text-[#1A1A1A]">
              Recent Works
            </h2>
            <a
              href="/artist-dashboard/works"
              className="text-sm text-[#B83A2F] hover:underline"
            >
              View All
            </a>
          </div>
          <div className="bg-white rounded-lg border border-[#E5E4E2] p-6 text-center">
            <p className="text-[#7A7A78] mb-4">
              Works management coming soon...
            </p>
            <a
              href="/artist-dashboard/works/new"
              className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white px-6 py-3 text-sm hover:bg-[#333] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Work
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  subtext,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#E5E4E2] p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`${color} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-[#1A1A1A] mb-1">{value}</p>
      <p className="text-sm font-medium text-[#4A4A48] mb-1">{label}</p>
      <p className="text-xs text-[#7A7A78]">{subtext}</p>
    </div>
  );
}

function ActionButton({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group bg-white rounded-lg border border-[#E5E4E2] p-6 hover:border-[#B83A2F] hover:shadow-md transition-all"
    >
      <div className="text-[#B83A2F] mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-medium text-[#1A1A1A] mb-2">{title}</h3>
      <p className="text-sm text-[#7A7A78]">{description}</p>
    </a>
  );
}
