'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Trash2, Share2, Download, ArrowRight } from 'lucide-react';
import { getFavorites, removeFromFavorites, FavoriteItem, exportFavorites, clearFavorites } from '@/lib/favorites';
import { getWorkById } from '@/lib/data';
import { WorkCard } from '@/components/WorkCard';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFavorites(getFavorites());
  }, []);

  const handleRemove = (workId: string) => {
    removeFromFavorites(workId);
    setFavorites(getFavorites());
  };

  const handleClear = () => {
    clearFavorites();
    setFavorites([]);
    setShowConfirmClear(false);
  };

  const handleExport = () => {
    const data = exportFavorites();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'carve-east-favorites.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const workIds = favorites.map((f) => f.workId).join(',');
    const shareUrl = `${window.location.origin}/favorites/shared?works=${workIds}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My CarveEast Collection',
          text: `Check out my curated collection of ${favorites.length} works on CarveEast`,
          url: shareUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      alert('Collection link copied to clipboard!');
    }
  };

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

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <SectionHeader
            title="My Collection"
            subtitle="Save works you love and build your personal collection"
            centered={false}
          />

          <div className="mt-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F5F4F2] flex items-center justify-center">
              <Heart className="w-10 h-10 text-[#C5C5C3]" />
            </div>
            <h2 className="text-2xl font-light text-[#1A1A1A] mb-4">
              Your collection is empty
            </h2>
            <p className="text-[#7A7A78] max-w-md mx-auto mb-8">
              Start exploring and save works that resonate with you. Your collection helps us understand your taste and recommend similar pieces.
            </p>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors"
            >
              <span>Explore Works</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader
            title="My Collection"
            subtitle={`${favorites.length} work${favorites.length === 1 ? '' : 's'} saved`}
            centered={false}
          />

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={() => setShowConfirmClear(true)}
              className="flex items-center gap-2 px-4 py-2 border border-[#E5E4E2] text-[#B83A2F] hover:border-[#B83A2F] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((favorite) => {
            const work = getWorkById(favorite.workId);
            if (!work) return null;

            return (
              <div key={favorite.workId} className="group relative">
                <WorkCard work={work} />

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(favorite.workId)}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#B83A2F] hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Added date */}
                <div className="absolute bottom-3 left-3 text-xs text-[#7A7A78] bg-white/90 px-2 py-1">
                  Added {new Date(favorite.addedAt).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>

        {/* Recommendations */}
        <div className="mt-20">
          <SectionHeader
            title="You Might Also Like"
            subtitle="Based on your collection preferences"
          />

          <div className="mt-8 text-center">
            <p className="text-[#7A7A78] mb-6">
              Save more works to get personalized recommendations
            </p>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-[#B83A2F] hover:underline"
            >
              <span>Continue Exploring</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Confirm Clear Modal */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6">
            <h3 className="text-xl font-medium text-[#1A1A1A] mb-4">
              Clear Collection?
            </h3>
            <p className="text-[#7A7A78] mb-6">
              This will remove all {favorites.length} works from your collection. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmClear(false)}
                className="flex-1 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-2 bg-[#B83A2F] text-white hover:bg-[#9A2F24] transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
