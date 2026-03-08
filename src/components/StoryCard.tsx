'use client';

import Link from 'next/link';
import { Story } from '@/lib/types';
import { PlaceholderImage } from './PlaceholderImage';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

export function StoryCard({ story, variant = 'default', className }: StoryCardProps) {
  if (variant === 'compact') {
    return (
      <Link
        href={`/stories/${story.slug}`}
        className={cn('flex gap-4 group', className)}
      >
        <div className="w-24 h-24 overflow-hidden bg-[#E5E4E2] shrink-0">
          <PlaceholderImage className="w-full h-full" />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.1em] text-[#B83A2F] mb-1">
            {story.category.replace(/-/g, ' ')}
          </p>
          <h4 className="font-serif text-base font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors line-clamp-2">
            {story.title}
          </h4>
          <p className="text-xs text-[#7A7A78] mt-1">
            {story.readTime} min read
          </p>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/stories/${story.slug}`}
        className={cn('group block', className)}
      >
        <div className="aspect-[16/10] overflow-hidden bg-[#E5E4E2] mb-6">
          <PlaceholderImage
            aspectRatio="auto"
            className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.15em] text-[#B83A2F]">
              {story.category.replace(/-/g, ' ')}
            </p>
            <span className="text-[#D5D4D2]">|</span>
            <p className="text-xs text-[#7A7A78]">
              {story.readTime} min read
            </p>
          </div>
          <h3 className="font-serif text-2xl font-semibold text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
            {story.title}
          </h3>
          {story.subtitle && (
            <p className="text-lg text-[#4A4A48]">
              {story.subtitle}
            </p>
          )}
          <p className="text-[#4A4A48] leading-relaxed line-clamp-2">
            {story.excerpt}
          </p>
          <p className="text-sm text-[#7A7A78]">
            By {story.author.name}
          </p>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      href={`/stories/${story.slug}`}
      className={cn('group block', className)}
    >
      <div className="aspect-[16/10] overflow-hidden bg-[#E5E4E2] mb-4">
        <PlaceholderImage
          aspectRatio="auto"
          className="w-full h-full group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="text-xs uppercase tracking-[0.1em] text-[#B83A2F]">
            {story.category.replace(/-/g, ' ')}
          </p>
          <span className="text-[#D5D4D2]">|</span>
          <p className="text-xs text-[#7A7A78]">
            {story.readTime} min read
          </p>
        </div>
        <h3 className="font-serif text-xl font-medium text-[#1A1A1A] group-hover:text-[#B83A2F] transition-colors">
          {story.title}
        </h3>
        <p className="text-sm text-[#4A4A48] line-clamp-2">
          {story.excerpt}
        </p>
      </div>
    </Link>
  );
}
