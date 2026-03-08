'use client';

import Link from 'next/link';
import { Auction, AuctionStatus } from '@/lib/types';
import { PlaceholderImage } from './PlaceholderImage';
import { cn } from '@/lib/utils';

interface AuctionCardProps {
  auction: Auction;
  variant?: 'default' | 'compact' | 'hero';
  className?: string;
}

function getStatusBadge(status: AuctionStatus) {
  const badges = {
    [AuctionStatus.UPCOMING]: { text: 'Upcoming', className: 'bg-blue-100 text-blue-800' },
    [AuctionStatus.LIVE]: { text: 'Live Now', className: 'bg-green-100 text-green-800' },
    [AuctionStatus.CLOSING]: { text: 'Closing Soon', className: 'bg-amber-100 text-amber-800' },
    [AuctionStatus.ENDED]: { text: 'Ended', className: 'bg-gray-200 text-gray-600' },
  };
  return badges[status];
}

function formatDateRange(startDate: string, endDate: string, status: AuctionStatus): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();

  if (status === AuctionStatus.LIVE || status === AuctionStatus.CLOSING) {
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`;
  }

  if (status === AuctionStatus.UPCOMING) {
    const daysUntil = Math.ceil((start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return `Starts in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`;
  }

  return `Ended ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
}

export function AuctionCard({ auction, variant = 'default', className }: AuctionCardProps) {
  const statusBadge = getStatusBadge(auction.status);
  const dateText = formatDateRange(auction.startDate, auction.endDate, auction.status);

  if (variant === 'hero') {
    return (
      <Link
        href={`/auctions/${auction.slug}`}
        className={cn('group block relative', className)}
      >
        <div className="aspect-[21/9] overflow-hidden bg-[#E5E4E2]">
          <PlaceholderImage
            aspectRatio="auto"
            className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="flex items-center gap-4 mb-4">
            <span className={cn('px-3 py-1 text-xs font-medium', statusBadge.className)}>
              {statusBadge.text}
            </span>
            <span className="text-sm text-white/80">
              {dateText}
            </span>
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-2">
            {auction.title}
          </h3>
          {auction.subtitle && (
            <p className="text-lg text-white/80">
              {auction.subtitle}
            </p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link
        href={`/auctions/${auction.slug}`}
        className={cn('flex gap-4 group', className)}
      >
        <div className="w-24 h-24 overflow-hidden bg-[#E5E4E2] shrink-0">
          <PlaceholderImage className="w-full h-full" />
        </div>
        <div className="flex flex-col justify-center">
          <span className={cn('inline-block px-2 py-0.5 text-xs font-medium w-fit mb-2', statusBadge.className)}>
            {statusBadge.text}
          </span>
          <h4 className="font-serif text-base font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
            {auction.title}
          </h4>
          <p className="text-sm text-[#7A7A78]">
            {dateText}
          </p>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/auctions/${auction.slug}`}
      className={cn('group block', className)}
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#E5E4E2] mb-4 relative">
        <PlaceholderImage
          aspectRatio="auto"
          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4">
          <span className={cn('px-3 py-1 text-xs font-medium', statusBadge.className)}>
            {statusBadge.text}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-xs text-[#7A7A78]">
          {dateText}
        </p>
        <h3 className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
          {auction.title}
        </h3>
        {auction.subtitle && (
          <p className="text-[#4A4A48]">
            {auction.subtitle}
          </p>
        )}
      </div>
    </Link>
  );
}
