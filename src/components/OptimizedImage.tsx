'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  objectFit = 'cover',
  placeholder = 'empty',
  blurDataURL,
  sizes = '100vw',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Generate srcset for responsive images
  const generateSrcSet = (url: string) => {
    if (url.startsWith('http') || url.startsWith('data:')) {
      return undefined;
    }
    // For local images, generate responsive sizes
    const widths = [640, 750, 828, 1080, 1200, 1920];
    return widths
      .map((w) => `${url}?w=${w} ${w}w`)
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  if (error) {
    return (
      <div
        className={cn(
          'bg-[#EFEDEA] flex items-center justify-center',
          className
        )}
        style={{ width, height }}
      >
        <span className="text-[#9A9A98] text-sm">{alt[0] || '?'}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{ width, height }}
    >
      {/* Placeholder / Blur */}
      {placeholder === 'blur' && !isLoaded && (
        <div
          className="absolute inset-0 bg-[#EFEDEA] animate-pulse"
          style={{
            backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
            backgroundSize: 'cover',
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Actual Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-500',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100'
        )}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

// Image with aspect ratio container
interface AspectImageProps extends Omit<OptimizedImageProps, 'width' | 'height'> {
  aspectRatio: number;
  maxWidth?: number;
}

export function AspectImage({
  aspectRatio,
  maxWidth,
  className,
  ...props
}: AspectImageProps) {
  return (
    <div
      className={cn('relative', className)}
      style={{
        aspectRatio,
        maxWidth,
      }}
    >
      <OptimizedImage {...props} className="absolute inset-0" />
    </div>
  );
}

// Artwork image with specific handling
interface ArtworkImageProps {
  src?: string;
  alt: string;
  title?: string;
  artist?: string;
  year?: string;
  className?: string;
  priority?: boolean;
}

export function ArtworkImage({
  src,
  alt,
  title,
  artist,
  year,
  className,
  priority = false,
}: ArtworkImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) {
    // Placeholder for missing images
    return (
      <div
        className={cn(
          'bg-[#EFEDEA] flex flex-col items-center justify-center p-8',
          className
        )}
      >
        <span className="font-serif text-6xl text-[#9A9A98] mb-4">
          {title?.[0] || alt[0] || '?'}
        </span>
        {title && (
          <p className="text-center text-[#4A4A48] font-medium">{title}</p>
        )}
        {artist && (
          <p className="text-center text-[#7A7A78] text-sm">{artist}</p>
        )}
        {year && (
          <p className="text-center text-[#9A9A98] text-sm">{year}</p>
        )}
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-[#EFEDEA]', className)}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#E5E4E2] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-700',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}

// Lazy load wrapper
interface LazyImageProps extends OptimizedImageProps {
  rootMargin?: string;
  threshold?: number;
}

export function LazyImage({
  rootMargin = '50px',
  threshold = 0.1,
  ...props
}: LazyImageProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(ref);

    return () => observer.disconnect();
  }, [ref, shouldLoad, rootMargin, threshold]);

  return (
    <div ref={setRef} className={props.className}>
      {shouldLoad ? (
        <OptimizedImage {...props} />
      ) : (
        <div
          className="bg-[#EFEDEA] animate-pulse"
          style={{ width: props.width, height: props.height }}
        />
      )}
    </div>
  );
}
