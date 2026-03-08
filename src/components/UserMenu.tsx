'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, Settings, LogOut, Heart, Bell, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentUser, logout, User as UserType } from '@/lib/auth';
import { getFavoritesCount } from '@/lib/favorites';
import { getFollowedArtists } from '@/lib/follow';

interface UserMenuProps {
  className?: string;
}

export function UserMenu({ className }: UserMenuProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    setUser(getCurrentUser());
    setFavoritesCount(getFavoritesCount());
    setFollowingCount(getFollowedArtists().length);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsOpen(false);
    window.location.href = '/';
  };

  if (!mounted) {
    return (
      <div className={cn('w-8 h-8 rounded-full bg-[#E5E4E2]', className)} />
    );
  }

  if (!user) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <Link
          href="/login"
          className="text-sm text-[#4A4A48] hover:text-[#1A1A1A] transition-colors"
        >
          Sign In
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-[#1A1A1A] text-white text-sm hover:bg-[#B83A2F] transition-colors"
        >
          Join
        </Link>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 hover:bg-[#F5F4F2] transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-[#B83A2F] text-white flex items-center justify-center text-sm font-medium">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block text-sm text-[#4A4A48]">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-[#E5E4E2] shadow-lg z-50 py-2">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-[#E5E4E2]">
              <p className="font-medium text-[#1A1A1A]">{user.name}</p>
              <p className="text-sm text-[#7A7A78]">{user.email}</p>
            </div>

            {/* Menu Items */}
            <nav className="py-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-[#4A4A48] hover:bg-[#F5F4F2] transition-colors"
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>

              <Link
                href="/favorites"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-[#4A4A48] hover:bg-[#F5F4F2] transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span>My Collection</span>
                {favoritesCount > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-[#B83A2F] text-white text-xs rounded-full">
                    {favoritesCount}
                  </span>
                )}
              </Link>

              <Link
                href="/following"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-[#4A4A48] hover:bg-[#F5F4F2] transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>Following</span>
                {followingCount > 0 && (
                  <span className="ml-auto px-2 py-0.5 bg-[#B83A2F] text-white text-xs rounded-full">
                    {followingCount}
                  </span>
                )}
              </Link>

              <Link
                href="/inquiries"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-[#4A4A48] hover:bg-[#F5F4F2] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquiries</span>
              </Link>

              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-[#4A4A48] hover:bg-[#F5F4F2] transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </nav>

            {/* Logout */}
            <div className="border-t border-[#E5E4E2] pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 text-[#B83A2F] hover:bg-[#F5F4F2] transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
