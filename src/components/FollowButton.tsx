'use client';

import { useState, useEffect } from 'react';
import { Heart, Bell, BellOff, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  isFollowing,
  toggleFollow,
  updateNotificationPreferences,
  getArtistNotificationSettings,
} from '@/lib/follow';

interface FollowButtonProps {
  artistId: string;
  artistName: string;
  variant?: 'default' | 'compact' | 'icon';
  className?: string;
  onFollowChange?: (isFollowing: boolean) => void;
}

export function FollowButton({
  artistId,
  artistName,
  variant = 'default',
  className,
  onFollowChange,
}: FollowButtonProps) {
  const [following, setFollowing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifyNewWorks, setNotifyNewWorks] = useState(true);
  const [notifyAuctions, setNotifyAuctions] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isFollowed = isFollowing(artistId);
    setFollowing(isFollowed);
    
    if (isFollowed) {
      const settings = getArtistNotificationSettings(artistId);
      if (settings) {
        setNotifyNewWorks(settings.notifyNewWorks);
        setNotifyAuctions(settings.notifyAuctions);
      }
    }
  }, [artistId]);

  const handleToggle = () => {
    const newState = toggleFollow(artistId, {
      notifyNewWorks,
      notifyAuctions,
    });
    setFollowing(newState);
    onFollowChange?.(newState);
  };

  const handleUpdateSettings = () => {
    updateNotificationPreferences(artistId, {
      notifyNewWorks,
      notifyAuctions,
    });
    setShowSettings(false);
  };

  if (!mounted) {
    return (
      <button
        className={cn(
          'opacity-50 cursor-not-allowed',
          variant === 'icon' && 'p-2',
          className
        )}
        disabled
      >
        <Heart className="w-5 h-5" />
      </button>
    );
  }

  // Icon only variant
  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'p-2 transition-colors',
          following
            ? 'text-[#B83A2F]'
            : 'text-[#7A7A78] hover:text-[#B83A2F]',
          className
        )}
        title={following ? `Unfollow ${artistName}` : `Follow ${artistName}`}
      >
        <Heart
          className={cn('w-5 h-5', following && 'fill-current')}
        />
      </button>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'flex items-center gap-1.5 px-3 py-1.5 text-sm transition-colors',
          following
            ? 'text-[#B83A2F]'
            : 'text-[#7A7A78] hover:text-[#B83A2F]',
          className
        )}
      >
        <Heart
          className={cn('w-4 h-4', following && 'fill-current')}
        />
        <span>{following ? 'Following' : 'Follow'}</span>
      </button>
    );
  }

  // Default variant with settings
  return (
    <div className={cn('relative', className)}>
      <button
        onClick={handleToggle}
        className={cn(
          'flex items-center gap-2 px-4 py-2 border transition-colors',
          following
            ? 'border-[#B83A2F] text-[#B83A2F]'
            : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
        )}
      >
        <Heart
          className={cn('w-4 h-4', following && 'fill-current')}
        />
        <span>{following ? 'Following' : 'Follow Artist'}</span>
      </button>

      {following && (
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="ml-2 p-2 text-[#7A7A78] hover:text-[#1A1A1A] transition-colors"
          title="Notification settings"
        >
          {notifyNewWorks || notifyAuctions ? (
            <Bell className="w-4 h-4" />
          ) : (
            <BellOff className="w-4 h-4" />
          )}
        </button>
      )}

      {/* Settings Dropdown */}
      {showSettings && following && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-[#E5E4E2] shadow-lg z-50 p-4">
          <h4 className="font-medium text-[#1A1A1A] mb-3">
            Notifications for {artistName}
          </h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyNewWorks}
                onChange={(e) => setNotifyNewWorks(e.target.checked)}
                className="w-4 h-4 accent-[#B83A2F]"
              />
              <span className="text-sm text-[#4A4A48]">New works</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifyAuctions}
                onChange={(e) => setNotifyAuctions(e.target.checked)}
                className="w-4 h-4 accent-[#B83A2F]"
              />
              <span className="text-sm text-[#4A4A48]">Auction updates</span>
            </label>
          </div>
          <button
            onClick={handleUpdateSettings}
            className="mt-4 w-full px-4 py-2 bg-[#1A1A1A] text-white text-sm hover:bg-[#333] transition-colors"
          >
            Save Settings
          </button>
        </div>
      )}
    </div>
  );
}
