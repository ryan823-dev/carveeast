'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addToCart, isInCart } from '@/lib/cart';

interface AddToCartButtonProps {
  workId: string;
  variant?: 'default' | 'compact' | 'icon';
  className?: string;
  onAdd?: () => void;
}

export function AddToCartButton({
  workId,
  variant = 'default',
  className,
  onAdd,
}: AddToCartButtonProps) {
  const [inCart, setInCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setInCart(isInCart(workId));
  }, [workId]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inCart) {
      // Already in cart, maybe show cart or navigate
      return;
    }

    addToCart(workId);
    setInCart(true);
    setShowSuccess(true);
    onAdd?.();

    // Hide success message after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  if (!mounted) {
    return (
      <div className={cn(
        variant === 'icon' ? 'w-10 h-10' : 'h-12',
        className
      )} />
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'w-10 h-10 flex items-center justify-center transition-all',
          inCart
            ? 'bg-green-100 text-green-700'
            : 'bg-white/90 text-[#7A7A78] hover:text-[#1A1A1A]',
          className
        )}
        aria-label={inCart ? 'Added to cart' : 'Add to cart'}
      >
        {showSuccess ? (
          <Check className="w-5 h-5" />
        ) : (
          <ShoppingBag className="w-5 h-5" />
        )}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center gap-2 text-sm transition-colors',
          inCart ? 'text-green-600' : 'text-[#7A7A78] hover:text-[#1A1A1A]',
          className
        )}
      >
        {showSuccess ? (
          <>
            <Check className="w-4 h-4" />
            <span>Added</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-4 h-4" />
            <span>{inCart ? 'In Cart' : 'Add to Cart'}</span>
          </>
        )}
      </button>
    );
  }

  // Default variant
  return (
    <button
      onClick={handleClick}
      disabled={inCart}
      className={cn(
        'flex items-center justify-center gap-2 px-6 py-3 border transition-all',
        inCart
          ? 'border-green-200 bg-green-50 text-green-700'
          : 'border-[#1A1A1A] bg-[#1A1A1A] text-white hover:bg-[#B83A2F] hover:border-[#B83A2F]',
        className
      )}
    >
      {showSuccess ? (
        <>
          <Check className="w-4 h-4" />
          <span>Added to Cart</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-4 h-4" />
          <span>{inCart ? 'Already in Cart' : 'Add to Cart'}</span>
        </>
      )}
    </button>
  );
}
