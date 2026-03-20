'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, AVAILABILITY_LABELS, type ArtworkImage } from '@/lib/artwork-data';

interface SealWorkCardProps {
  work: {
    slug: string;
    title: string;
    titleCn?: string;
    artistName: string;
    artistSlug?: string;
    year?: number;
    medium?: string;
    price?: number;
    currency?: string;
    availability?: string;
    images?: ArtworkImage[];
    stoneColor?: string;
    carvingStyle?: string;
  };
  variant?: 'default' | 'compact' | 'featured';
  showAvailability?: boolean;
  className?: string;
}

export function SealWorkCard({
  work,
  variant = 'default',
  showAvailability = true,
  className,
}: SealWorkCardProps) {
  const availability = work.availability || 'available';
  const availabilityInfo = AVAILABILITY_LABELS[availability as keyof typeof AVAILABILITY_LABELS] || AVAILABILITY_LABELS.available;
  const primaryImage = work.images?.[0];
  const price = work.price;
  const currency = work.currency || 'USD';

  if (variant === 'compact') {
    return (
      <Link
        href={`/works/${work.slug}`}
        className={cn('flex gap-4 group', className)}
      >
        <div className="w-24 h-24 overflow-hidden bg-stone-200 shrink-0 rounded-lg">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={work.titleCn || work.title}
              width={96}
              height={96}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-stone-400">
              印章
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <h4 className="font-serif text-base font-medium text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-1">
            {work.titleCn || work.title}
          </h4>
          <p className="text-sm text-stone-500">{work.artistName}</p>
          {price && (
            <p className="text-sm font-medium text-stone-900 mt-1">
              {formatPrice(price, currency)}
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
        <div className="aspect-[4/5] overflow-hidden bg-stone-200 mb-4 relative rounded-xl">
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={work.titleCn || work.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl text-stone-400">
              印
            </div>
          )}
          {showAvailability && (
            <span className={cn(
              'absolute top-4 left-4 px-3 py-1 text-xs font-medium rounded-full',
              availability === 'available' ? 'bg-green-100 text-green-800' :
              availability === 'sold' ? 'bg-stone-100 text-stone-600' :
              'bg-amber-100 text-amber-800'
            )}>
              {availabilityInfo.label}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-xs text-amber-700 font-medium">
            {work.medium || '篆刻'}
          </p>
          <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-amber-700 transition-colors">
            {work.titleCn || work.title}
          </h3>
          <p className="text-stone-600">{work.artistName}</p>
          {price && (
            <p className="text-lg font-semibold text-stone-900">
              {formatPrice(price, currency)}
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
      <div className="aspect-square overflow-hidden bg-stone-200 mb-4 relative rounded-xl">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={work.titleCn || work.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl text-stone-400">
            印
          </div>
        )}
        {showAvailability && availability !== 'available' && (
          <span className={cn(
            'absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full',
            availability === 'sold' ? 'bg-stone-100/90 text-stone-600' :
            'bg-amber-100/90 text-amber-800'
          )}>
            {availabilityInfo.label}
          </span>
        )}
        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            // Toggle favorite
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className="w-4 h-4 text-stone-600" />
        </button>
      </div>
      <div className="space-y-1">
        {work.stoneColor && (
          <p className="text-xs text-amber-700 font-medium">
            {work.stoneColor}
          </p>
        )}
        <h3 className="font-serif text-lg font-medium text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2">
          {work.titleCn || work.title}
        </h3>
        <p className="text-sm text-stone-500">{work.artistName}</p>
        {price && (
          <p className="text-sm font-semibold text-stone-900">
            {formatPrice(price, currency)}
          </p>
        )}
      </div>
    </Link>
  );
}
