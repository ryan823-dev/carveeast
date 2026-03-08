'use client';

import { cn } from '@/lib/utils';

interface PlaceholderImageProps {
  className?: string;
  text?: string;
  aspectRatio?: 'square' | 'portrait' | 'landscape' | 'video' | 'auto';
  bgColor?: string;
  textColor?: string;
}

export function PlaceholderImage({
  className,
  text,
  aspectRatio = 'auto',
  bgColor = 'bg-[#E5E4E2]',
  textColor = 'text-[#9A9A98]',
}: PlaceholderImageProps) {
  const aspectRatioClasses = {
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[16/9]',
    video: 'aspect-video',
    auto: '',
  };

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden',
        bgColor,
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {text ? (
        <span className={cn('font-serif text-4xl md:text-6xl', textColor)}>
          {text}
        </span>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className={cn('w-12 h-12 border-2 border-dashed rounded-full', textColor.replace('text-', 'border-'))} />
          <span className={cn('text-sm', textColor)}>Image</span>
        </div>
      )}
    </div>
  );
}
