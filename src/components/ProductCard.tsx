'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPrice, PRODUCT_CATEGORIES, PRODUCT_STATUS, type ProductCategory, type ProductStatus, type ArtworkImage } from '@/lib/categories';

interface ProductCardProps {
  product: {
    slug: string;
    title: string;
    titleCn?: string;
    artistName: string;
    artistSlug?: string;
    category: ProductCategory;
    status: ProductStatus;
    price?: number;
    currency?: string;
    images: ArtworkImage[];
    // Category-specific fields
    medium?: string; // Stone type, clay type, etc.
    dimensions?: string;
    year?: number;
    // Seal specific
    stoneColor?: string;
    carvingStyle?: string;
    // Yixing specific
    clayType?: string;
    capacity?: string;
    // Porcelain specific
    porcelainType?: string;
  };
  variant?: 'default' | 'compact' | 'featured';
  showArtist?: boolean;
  showPrice?: boolean;
  showCategory?: boolean;
  onFavorite?: () => void;
  isFavorite?: boolean;
}

export function ProductCard({
  product,
  variant = 'default',
  showArtist = true,
  showPrice = true,
  showCategory = false,
  onFavorite,
  isFavorite = false,
}: ProductCardProps) {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const categoryInfo = PRODUCT_CATEGORIES[product.category];
  const statusInfo = PRODUCT_STATUS[product.status];
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  return (
    <div className={cn(
      'group relative bg-white rounded-xl overflow-hidden transition-all duration-300',
      'hover:shadow-lg hover:-translate-y-1',
      isCompact ? '' : 'shadow-sm'
    )}>
      {/* Image */}
      <Link href={`/works/${product.slug}`} className="block">
        <div className={cn(
          'relative bg-stone-100 overflow-hidden',
          isCompact ? 'aspect-square' : isFeatured ? 'aspect-[4/5]' : 'aspect-square'
        )}>
          {primaryImage ? (
            <Image
              src={primaryImage.url}
              alt={product.titleCn || product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl text-stone-300">
              {categoryInfo?.icon || '艺'}
            </div>
          )}

          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              'px-2 py-1 rounded-full text-xs font-medium',
              statusInfo.color === 'green' && 'bg-green-100 text-green-800',
              statusInfo.color === 'red' && 'bg-red-100 text-red-800',
              statusInfo.color === 'yellow' && 'bg-yellow-100 text-yellow-800',
              statusInfo.color === 'blue' && 'bg-blue-100 text-blue-800',
              statusInfo.color === 'purple' && 'bg-purple-100 text-purple-800',
              statusInfo.color === 'gray' && 'bg-stone-100 text-stone-600',
            )}>
              {statusInfo.labelCn}
            </span>
          </div>

          {/* Favorite Button */}
          {onFavorite && (
            <button
              onClick={(e) => {
                e.preventDefault();
                onFavorite();
              }}
              className={cn(
                'absolute top-3 right-3 p-2 rounded-full transition-all',
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-stone-600 hover:bg-white hover:text-red-500'
              )}
            >
              <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
            </button>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className={cn('p-4', isCompact ? '' : 'space-y-2')}>
        {/* Category Tag */}
        {showCategory && categoryInfo && (
          <p className="text-xs text-amber-600 uppercase tracking-wider">
            {categoryInfo.labelCn}
          </p>
        )}

        {/* Title */}
        <Link href={`/works/${product.slug}`}>
          <h3 className={cn(
            'font-medium text-stone-900 group-hover:text-amber-700 line-clamp-1',
            isCompact ? 'text-sm' : 'text-base'
          )}>
            {product.titleCn || product.title}
          </h3>
        </Link>

        {/* Artist */}
        {showArtist && (
          <p className={cn('text-stone-500', isCompact ? 'text-xs' : 'text-sm')}>
            {product.artistName}
          </p>
        )}

        {/* Category-specific info */}
        {!isCompact && (
          <div className="flex flex-wrap gap-1 text-xs text-stone-400">
            {product.medium && <span>{product.medium}</span>}
            {product.stoneColor && <span>· {product.stoneColor}</span>}
            {product.clayType && <span>· {product.clayType}</span>}
            {product.dimensions && <span>· {product.dimensions}</span>}
          </div>
        )}

        {/* Price */}
        {showPrice && product.price && (
          <div className="pt-2 border-t border-stone-100">
            <p className={cn(
              'font-semibold text-stone-900',
              isCompact ? 'text-sm' : 'text-lg'
            )}>
              {formatPrice(product.price, product.currency)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Compact horizontal version for lists
export function ProductCardHorizontal({ product }: { product: ProductCardProps['product'] }) {
  const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];

  return (
    <Link href={`/works/${product.slug}`} className="group flex gap-4 p-3 bg-white rounded-lg hover:bg-stone-50 transition-colors">
      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
        {primaryImage ? (
          <Image src={primaryImage.url} alt={product.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl text-stone-300">
            艺
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-stone-900 group-hover:text-amber-700 line-clamp-1">
          {product.titleCn || product.title}
        </h4>
        <p className="text-sm text-stone-500">{product.artistName}</p>
        {product.price && (
          <p className="text-sm font-semibold text-stone-900 mt-1">
            {formatPrice(product.price, product.currency)}
          </p>
        )}
      </div>
    </Link>
  );
}
