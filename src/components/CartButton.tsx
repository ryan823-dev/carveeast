'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, X, Trash2, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCart, removeFromCart, getCartItemCount, calculateCartTotal, Cart } from '@/lib/cart';
import { getWorkById } from '@/lib/data';
import { PlaceholderImage } from './PlaceholderImage';

interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCart] = useState<Cart>({ items: [], updatedAt: '' });
  const [itemCount, setItemCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
    setItemCount(getCartItemCount());
  }, []);

  // Update cart when opened
  useEffect(() => {
    if (isOpen) {
      setCart(getCart());
      setItemCount(getCartItemCount());
    }
  }, [isOpen]);

  const handleRemove = (workId: string) => {
    const updatedCart = removeFromCart(workId);
    setCart(updatedCart);
    setItemCount(updatedCart.items.length);
  };

  const cartDetails = calculateCartTotal(cart, getWorkById);

  if (!mounted) {
    return (
      <button className={cn('p-2 text-[#4A4A48]', className)}>
        <ShoppingBag className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#4A4A48] hover:text-[#1A1A1A] transition-colors relative"
        aria-label="Shopping cart"
      >
        <ShoppingBag className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#B83A2F] text-white text-[10px] flex items-center justify-center rounded-full">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-[#E5E4E2] shadow-lg z-50">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#E5E4E2]">
              <h3 className="font-medium text-[#1A1A1A]">
                Shopping Cart ({itemCount})
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#7A7A78] hover:text-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="max-h-96 overflow-y-auto">
              {cartDetails.items.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-[#C5C5C3]" />
                  <p className="text-[#7A7A78] mb-4">Your cart is empty</p>
                  <Link
                    href="/works"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-[#B83A2F] hover:underline"
                  >
                    Browse works
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-[#E5E4E2]">
                  {cartDetails.items.map(({ work, notes }) => (
                    <div key={work.id} className="p-4 flex gap-4">
                      {/* Image */}
                      <Link
                        href={`/works/${work.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="w-20 h-20 shrink-0"
                      >
                        {work.images?.[0]?.url ? (
                          <img
                            src={work.images[0].url}
                            alt={work.title.en}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <PlaceholderImage aspectRatio="square" />
                        )}
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/works/${work.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="block"
                        >
                          <h4 className="font-medium text-[#1A1A1A] truncate">
                            {work.title.en}
                          </h4>
                          <p className="text-sm text-[#7A7A78]">
                            {work.year} · {work.medium}
                          </p>
                        </Link>
                        <p className="mt-1 font-medium text-[#1A1A1A]">
                          ${work.price?.amount?.toLocaleString()}
                        </p>
                        {notes && (
                          <p className="text-xs text-[#7A7A78] mt-1">
                            Note: {notes}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleRemove(work.id)}
                          className="p-1 text-[#7A7A78] hover:text-[#B83A2F]"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartDetails.items.length > 0 && (
              <div className="p-4 border-t border-[#E5E4E2] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#7A7A78]">Subtotal</span>
                  <span className="text-xl font-medium text-[#1A1A1A]">
                    ${cartDetails.subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-[#7A7A78]">
                  Shipping and taxes calculated at checkout
                </p>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors"
                >
                  <span>View Cart</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
