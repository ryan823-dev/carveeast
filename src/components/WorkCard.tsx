'use client';

import Link from 'next/link';
import { Work, WorkAvailability } from '@/lib/types';
import { getArtistById, formatPrice, getDisciplineLabel, getWorkDisplayAuthors } from '@/lib/data';
import { PlaceholderImage } from './PlaceholderImage';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  work: Work;
  variant?: 'default' | 'compact' | 'featured';
  showAvailability?: boolean;
  className?: string;
}

export function WorkCard({
  work,
  variant = 'default',
  showAvailability = true,
  className,
}: WorkCardProps) {
  const primaryAuthor = work.authors.find((a) => a.isPrimary);
  const primaryArtist = primaryAuthor ? getArtistById(primaryAuthor.artistId) : null;

  const availabilityBadge = {
    [WorkAvailability.AVAILABLE]: { text: 'Available', className: 'bg-green-100 text-green-800' },
    [WorkAvailability.SOLD]: { text: 'Sold', className: 'bg-gray-200 text-gray-600' },
    [WorkAvailability.AUCTION]: { text: 'In Auction', className: 'bg-[#B83A2F]/10 text-[#B83A2F]' },
    [WorkAvailability.RESERVED]: { text: 'Reserved', className: 'bg-amber-100 text-amber-800' },
  };

  if (variant === 'compact') {
    return (
      <Link
        href={`/works/${work.slug}`}
        className={cn('flex gap-4 group', className)}
      >
        <div className="w-24 h-24 overflow-hidden bg-[#E5E4E2] shrink-0">
          <PlaceholderImage className="w-full h-full" />
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="font-serif text-base font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors line-clamp-1">
            {work.title.en}
          </h4>
          <p className="text-sm text-[#7A7A78]">
            {getWorkDisplayAuthors(work)}
          </p>
          {work.price && (
            <p className="text-sm font-medium text-[#1A1A1A] mt-1">
              {formatPrice(work.price.amount, work.price.currency)}
            </p>
          )}
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/works/${work.slug}`}
        className={cn('group block', className)}
      >
        <div className="aspect-[4/5] overflow-hidden bg-[#E5E4E2] mb-4 relative">
          <PlaceholderImage
            aspectRatio="auto"
            className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
          {showAvailability && (
            <span className={cn(
              'absolute top-4 left-4 px-3 py-1 text-xs font-medium',
              availabilityBadge[work.availability].className
            )}>
              {availabilityBadge[work.availability].text}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.15em] text-[#B83A2F]">
            {getDisciplineLabel(work.discipline)}
          </p>
          <h3 className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
            {work.title.en}
          </h3>
          <p className="text-[#4A4A48]">
            {getWorkDisplayAuthors(work)}
          </p>
          {work.price && (
            <p className="text-lg font-medium text-[#1A1A1A]">
              {formatPrice(work.price.amount, work.price.currency)}
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/works/${work.slug}`}
      className={cn('group block', className)}
    >
      <div className="aspect-square overflow-hidden bg-[#E5E4E2] mb-4 relative">
        <PlaceholderImage
          aspectRatio="auto"
          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
        />
        {showAvailability && work.availability !== WorkAvailability.AVAILABLE && (
          <span className={cn(
            'absolute top-3 left-3 px-2 py-1 text-xs font-medium',
            availabilityBadge[work.availability].className
          )}>
            {availabilityBadge[work.availability].text}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.1em] text-[#B83A2F]">
          {getDisciplineLabel(work.discipline)}
        </p>
        <h3 className="font-serif text-lg font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
          {work.title.en}
        </h3>
        <p className="text-sm text-[#7A7A78]">
          {getWorkDisplayAuthors(work)}
        </p>
        {work.price && (
          <p className="text-sm font-medium text-[#1A1A1A]">
            {formatPrice(work.price.amount, work.price.currency)}
          </p>
        )}
      </div>
    </Link>
  );
}
