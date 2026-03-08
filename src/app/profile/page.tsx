'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Mail, Calendar, Heart, Bell, MessageSquare, ArrowRight } from 'lucide-react';
import { getCurrentUser, getUserActivity, User as UserType } from '@/lib/auth';
import { getFavoritesCount } from '@/lib/favorites';
import { getFollowedArtists } from '@/lib/follow';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [mounted, setMounted] = useState(false);
  const [activity, setActivity] = useState({
    inquiries: 0,
    bids: 0,
    favorites: 0,
    following: 0,
    views: 0,
  });

  useEffect(() => {
    setMounted(true);
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setActivity(getUserActivity());
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83A2F]" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="text-center py-20">
            <h1 className="text-2xl font-light text-[#1A1A1A] mb-4">
              Please Sign In
            </h1>
            <p className="text-[#7A7A78] mb-8">
              You need to be signed in to view your profile
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Saved Works', value: activity.favorites, icon: Heart, href: '/favorites' },
    { label: 'Artists Following', value: activity.following, icon: Bell, href: '/following' },
    { label: 'Inquiries', value: activity.inquiries, icon: MessageSquare, href: '/inquiries' },
    { label: 'Active Bids', value: activity.bids, icon: User, href: '/auctions' },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <SectionHeader
          title="My Profile"
          subtitle="Manage your account and view your activity"
          centered={false}
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E4E2] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-[#B83A2F] text-white flex items-center justify-center text-2xl font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-medium text-[#1A1A1A]">
                    {user.name}
                  </h2>
                  <p className="text-[#7A7A78]">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-[#F5F4F2] text-xs text-[#7A7A78] capitalize">
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-[#4A4A48]">
                  <Calendar className="w-4 h-4 text-[#7A7A78]" />
                  <span>
                    Member since{' '}
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#E5E4E2]">
                <Link
                  href="/settings"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors"
                >
                  <span>Edit Profile</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats & Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Link
                  key={stat.label}
                  href={stat.href}
                  className="bg-white border border-[#E5E4E2] p-4 hover:border-[#B83A2F] transition-colors"
                >
                  <stat.icon className="w-5 h-5 text-[#B83A2F] mb-3" />
                  <p className="text-2xl font-light text-[#1A1A1A]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#7A7A78]">{stat.label}</p>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-[#E5E4E2] p-6">
              <h3 className="font-medium text-[#1A1A1A] mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/works"
                  className="flex items-center gap-3 p-4 border border-[#E5E4E2] hover:border-[#B83A2F] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#F5F4F2] flex items-center justify-center">
                    <Heart className="w-5 h-5 text-[#B83A2F]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Browse Works</p>
                    <p className="text-sm text-[#7A7A78]">Discover new pieces</p>
                  </div>
                </Link>

                <Link
                  href="/artists"
                  className="flex items-center gap-3 p-4 border border-[#E5E4E2] hover:border-[#B83A2F] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#F5F4F2] flex items-center justify-center">
                    <User className="w-5 h-5 text-[#B83A2F]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Explore Artists</p>
                    <p className="text-sm text-[#7A7A78]">Find artists to follow</p>
                  </div>
                </Link>

                <Link
                  href="/auctions"
                  className="flex items-center gap-3 p-4 border border-[#E5E4E2] hover:border-[#B83A2F] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#F5F4F2] flex items-center justify-center">
                    <Bell className="w-5 h-5 text-[#B83A2F]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">View Auctions</p>
                    <p className="text-sm text-[#7A7A78]">Bid on live auctions</p>
                  </div>
                </Link>

                <Link
                  href="/contact"
                  className="flex items-center gap-3 p-4 border border-[#E5E4E2] hover:border-[#B83A2F] transition-colors"
                >
                  <div className="w-10 h-10 bg-[#F5F4F2] flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#B83A2F]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#1A1A1A]">Contact Us</p>
                    <p className="text-sm text-[#7A7A78]">Get in touch</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
