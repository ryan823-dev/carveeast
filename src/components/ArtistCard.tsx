'use client';

import Link from 'next/link';
import { Artist } from '@/lib/types';
import { getDisciplineLabel } from '@/lib/data';
import { PlaceholderImage } from './PlaceholderImage';
import { cn } from '@/lib/utils';

interface ArtistCardProps {
  artist: Artist;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function ArtistCard({ artist, variant = 'default', className }: ArtistCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/artists/${artist.slug}`}
        className={cn(
          'flex items-center gap-4 group',
          className
        )}
      >
        <div className="w-16 h-16 rounded-full overflow-hidden bg-[#E5E4E2] shrink-0">
          {artist.portraitImage ? (
            <img
              src={artist.portraitImage}
              alt={artist.name.en}
              className="w-full h-full object-cover"
            />
          ) : (
            <PlaceholderImage text={artist.name.cn?.[0] || artist.name.en[0]} className="w-full h-full" />
          )}
        </div>
        <div>
          <h4 className="font-serif text-lg font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
            {artist.name.en}
          </h4>
          <p className="text-sm text-[#7A7A78]">
            {getDisciplineLabel(artist.primaryDiscipline)}
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/artists/${artist.slug}`}
        className={cn(
          'group block',
          className
        )}
      >
        <div className="aspect-[3/4] overflow-hidden bg-[#E5E4E2] mb-6">
          {artist.portraitImage ? (
            <img
              src={artist.portraitImage}
              alt={artist.name.en}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <PlaceholderImage
              text={artist.name.cn?.[0] || artist.name.en[0]}
              aspectRatio="auto"
              className="w-full h-full group-hover:scale-105 transition-transform duration-700"
            />
          )}
        </div>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.15em] text-[#B83A2F]">
            {getDisciplineLabel(artist.primaryDiscipline)}
          </p>
          <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
            {artist.name.en}
          </h3>
          <p className="text-[#4A4A48] leading-relaxed line-clamp-2">
            {artist.shortBio}
          </p>
          <p className="text-sm text-[#7A7A78]">
            {artist.location.city}, {artist.location.country}
          </p>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/artists/${artist.slug}`}
      className={cn(
        'group block',
        className
      )}
    >
      <div className="aspect-square overflow-hidden bg-[#E5E4E2] mb-4">
        {artist.portraitImage ? (
          <img
            src={artist.portraitImage}
            alt={artist.name.en}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <PlaceholderImage
            text={artist.name.cn?.[0] || artist.name.en[0]}
            aspectRatio="auto"
            className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs uppercase tracking-[0.15em] text-[#B83A2F]">
          {getDisciplineLabel(artist.primaryDiscipline)}
        </p>
        <h3 className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
          {artist.name.en}
        </h3>
        <p className="text-sm text-[#7A7A78]">
          {artist.location.city}
        </p>
      </div>
    </Link>
  );
}
