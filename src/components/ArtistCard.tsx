import Link from 'next/link';
import Image from 'next/image';
import { Artist } from '@/lib/types';

interface ArtistCardProps {
  artist: Artist;
  variant?: 'default' | 'featured' | 'compact';
}

export function ArtistCard({ artist, variant = 'default' }: ArtistCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';
  const artistName = artist.name.cn || artist.name.en;

  return (
    <Link
      href={`/artists/${artist.slug}`}
      className={`group block ${isCompact ? 'flex items-center gap-3' : ''}`}
    >
      <div
        className={`relative overflow-hidden rounded-lg ${
          isFeatured
            ? 'aspect-[3/4]'
            : isCompact
            ? 'w-16 h-16 rounded-full'
            : 'aspect-square'
        } bg-stone-100 ${isCompact ? '' : 'mb-3'}`}
      >
        {artist.portraitImage ? (
          <Image
            src={artist.portraitImage}
            alt={artist.name.en}
            fill
            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
              isCompact ? 'rounded-full' : ''
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-stone-300">
            {artistName.charAt(0)}
          </div>
        )}
        {isFeatured && artist.isFeatured && (
          <div className="absolute top-3 left-3 bg-amber-600 text-white text-xs px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>
      <div className={isCompact ? 'flex-1 min-w-0' : ''}>
        <h3 className="font-medium text-stone-900 group-hover:text-amber-700">
          {artistName}
        </h3>
        {artist.name.pinyin && (
          <p className={`text-sm text-stone-500 ${isCompact ? '' : ''}`}>
            {artist.name.pinyin}
          </p>
        )}
        {isFeatured && (
          <p className="text-sm text-stone-600 mt-1 line-clamp-2">
            {artist.shortBio}
          </p>
        )}
      </div>
    </Link>
  );
}
