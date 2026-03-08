'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toggleFavorite, isFavorite } from '@/lib/favorites';

interface FavoriteButtonProps {
  workId: string;
  variant?: 'default' | 'compact' | 'icon';
  className?: string;
  onToggle?: (isFavorite: boolean) => void;
}

export function FavoriteButton({
  workId,
  variant = 'default',
  className,
  onToggle,
}: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsFav(isFavorite(workId));
  }, [workId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const newState = toggleFavorite(workId);
    setIsFav(newState);
    onToggle?.(newState);
  };

  if (!mounted) {
    return (
      <div className={cn(
        variant === 'icon' ? 'w-8 h-8' : 'h-10',
        className
      )} />
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'w-8 h-8 flex items-center justify-center rounded-full transition-all',
          isFav
            ? 'bg-[#B83A2F] text-white'
            : 'bg-white/90 text-[#7A7A78] hover:text-[#B83A2F]',
          className
        )}
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={cn('w-4 h-4', isFav && 'fill-current')} />
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleToggle}
        className={cn(
          'flex items-center gap-1.5 text-sm transition-colors',
          isFav ? 'text-[#B83A2F]' : 'text-[#7A7A78] hover:text-[#B83A2F]',
          className
        )}
      >
        <Heart className={cn('w-4 h-4', isFav && 'fill-current')} />
        <span>{isFav ? 'Saved' : 'Save'}</span>
      </button>
    );
  }

  // Default variant
  return (
    <button
      onClick={handleToggle}
      className={cn(
        'flex items-center gap-2 px-4 py-2 border transition-all',
        isFav
          ? 'border-[#B83A2F] bg-[#B83A2F]/5 text-[#B83A2F]'
          : 'border-[#E5E4E2] text-[#4A4A48] hover:border-[#B83A2F]',
        className
      )}
    >
      <Heart className={cn('w-4 h-4', isFav && 'fill-current')} />
      <span>{isFav ? 'Saved to Collection' : 'Save to Collection'}</span>
    </button>
  );
}
