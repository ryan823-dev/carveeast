'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Bell, Settings, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeader } from '@/components/SectionHeader';
import { ArtistCard } from '@/components/ArtistCard';
import { getFollowedArtists, unfollowArtist, updateNotificationPreferences, FollowedArtist } from '@/lib/follow';
import { getArtistById } from '@/lib/data';
import { Artist } from '@/lib/types';

interface FollowedArtistWithData extends FollowedArtist {
  artist: Artist | undefined;
}

export default function FollowingPage() {
  const [followedArtists, setFollowedArtists] = useState<FollowedArtistWithData[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    loadFollowedArtists();
  }, []);

  const loadFollowedArtists = () => {
    const follows = getFollowedArtists();
    const withData = follows.map((follow) => ({
      ...follow,
      artist: getArtistById(follow.artistId),
    }));
    setFollowedArtists(withData);
  };

  const handleUnfollow = (artistId: string) => {
    unfollowArtist(artistId);
    loadFollowedArtists();
  };

  const handleToggleNotifications = (artistId: string, type: 'newWorks' | 'auctions') => {
    const follow = followedArtists.find((f) => f.artistId === artistId);
    if (follow) {
      updateNotificationPreferences(artistId, {
        notifyNewWorks: type === 'newWorks' ? !follow.notifyNewWorks : follow.notifyNewWorks,
        notifyAuctions: type === 'auctions' ? !follow.notifyAuctions : follow.notifyAuctions,
      });
      loadFollowedArtists();
    }
  };

  if (!mounted) {
    return (
      <main className="min-h-screen bg-[#FAFAF8]">
        <section className="pt-32 pb-16 px-6 lg:px-12">
          <div className="max-w-[1440px] mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-[#E5E4E2] rounded w-48 mb-4"></div>
              <div className="h-4 bg-[#E5E4E2] rounded w-96"></div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <Breadcrumbs
            items={[{ label: 'Following', href: '/following' }]}
            className="mb-8"
          />
          <SectionHeader
            title="Artists You Follow"
            subtitle="Stay Connected"
            description="Get notified when your favorite artists release new works or when their pieces come up for auction."
          />
        </div>
      </section>

      {/* Following List */}
      <section className="py-12 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          {followedArtists.length === 0 ? (
            <div className="text-center py-24">
              <Heart className="w-16 h-16 text-[#E5E4E2] mx-auto mb-6" />
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
                No artists followed yet
              </h3>
              <p className="text-[#7A7A78] mb-8 max-w-md mx-auto">
                Follow artists to stay updated on their latest works, exhibitions, and auction appearances.
              </p>
              <Link
                href="/artists"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
              >
                Discover Artists
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {followedArtists.map(({ artist, ...follow }) => {
                if (!artist) return null;

                return (
                  <div
                    key={follow.artistId}
                    className="bg-white border border-[#E5E4E2] p-6"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Artist Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link
                              href={`/artists/${artist.slug}`}
                              className="font-serif text-xl font-semibold text-[#1A1A1A] hover:text-[#B83A2F] transition-colors"
                            >
                              {artist.name.en}
                            </Link>
                            <p className="text-[#7A7A78] mt-1">
                              {artist.name.cn}
                            </p>
                          </div>
                          <button
                            onClick={() => handleUnfollow(artist.id)}
                            className="text-sm text-[#7A7A78] hover:text-[#B83A2F] transition-colors"
                          >
                            Unfollow
                          </button>
                        </div>

                        <p className="text-[#4A4A48] mt-4 line-clamp-2">
                          {artist.shortBio}
                        </p>

                        {/* Stats */}
                        <div className="flex gap-6 mt-4 text-sm text-[#7A7A78]">
                          <span>Following since {new Date(follow.followedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Notification Settings */}
                      <div className="md:w-64 pt-4 md:pt-0 md:border-l md:border-[#E5E4E2] md:pl-6">
                        <h4 className="text-sm font-medium text-[#1A1A1A] mb-4 flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          Notifications
                        </h4>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={follow.notifyNewWorks}
                              onChange={() => handleToggleNotifications(follow.artistId, 'newWorks')}
                              className="w-4 h-4 accent-[#B83A2F]"
                            />
                            <span className="text-sm text-[#4A4A48]">New works</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={follow.notifyAuctions}
                              onChange={() => handleToggleNotifications(follow.artistId, 'auctions')}
                              className="w-4 h-4 accent-[#B83A2F]"
                            />
                            <span className="text-sm text-[#4A4A48]">Auction updates</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-4 mt-6 pt-6 border-t border-[#E5E4E2]">
                      <Link
                        href={`/artists/${artist.slug}`}
                        className="text-sm text-[#B83A2F] hover:underline"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={`/artists/${artist.slug}#works`}
                        className="text-sm text-[#4A4A48] hover:text-[#1A1A1A]"
                      >
                        View Works
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Recommended Artists */}
      {followedArtists.length > 0 && (
        <section className="py-20 px-6 lg:px-12 bg-white">
          <div className="max-w-[1440px] mx-auto">
            <SectionHeader
              title="You Might Also Like"
              subtitle="Discover"
              description="Based on the artists you follow, here are some recommendations."
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* This would be populated based on similar artists logic */}
              <div className="text-center py-12 text-[#7A7A78]">
                <p>More recommendations coming soon</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
