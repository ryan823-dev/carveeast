'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Heart, ArrowRight, ShoppingBag, AlertCircle } from 'lucide-react';
import { getCart, removeFromCart, clearCart, calculateCartTotal, Cart } from '@/lib/cart';
import { getWorkById } from '@/lib/data';
import { PlaceholderImage } from '@/components/PlaceholderImage';
import { SectionHeader } from '@/components/SectionHeader';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [], updatedAt: '' });
  const [mounted, setMounted] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCart(getCart());
  }, []);

  const handleRemove = (workId: string) => {
    const updatedCart = removeFromCart(workId);
    setCart(updatedCart);
  };

  const handleClear = () => {
    const emptyCart = clearCart();
    setCart(emptyCart);
    setShowClearConfirm(false);
  };

  const cartDetails = calculateCartTotal(cart, getWorkById);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <div className="h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B83A2F]" />
          </div>
        </div>
      </div>
    );
  }

  if (cartDetails.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAF8]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
          <SectionHeader
            title="Shopping Cart"
            subtitle="Review your selected works"
            centered={false}
          />

          <div className="mt-16 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F5F4F2] flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-[#C5C5C3]" />
            </div>
            <h2 className="text-2xl font-light text-[#1A1A1A] mb-4">
              Your cart is empty
            </h2>
            <p className="text-[#7A7A78] max-w-md mx-auto mb-8">
              Discover exceptional Chinese artworks and add them to your collection.
            </p>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors"
            >
              <span>Browse Works</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <SectionHeader
            title="Shopping Cart"
            subtitle={`${cartDetails.itemCount} work${cartDetails.itemCount === 1 ? '' : 's'} in your cart`}
            centered={false}
          />

          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 border border-[#E5E4E2] text-[#B83A2F] hover:border-[#B83A2F] transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartDetails.items.map(({ work, notes }) => (
              <div
                key={work.id}
                className="bg-white border border-[#E5E4E2] p-6 flex gap-6"
              >
                {/* Image */}
                <Link href={`/works/${work.slug}`} className="w-32 h-32 shrink-0">
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
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link href={`/works/${work.slug}`}>
                        <h3 className="font-medium text-lg text-[#1A1A1A] hover:text-[#B83A2F]">
                          {work.title.en}
                        </h3>
                      </Link>
                      <p className="text-sm text-[#7A7A78] mt-1">
                        {work.year} · {work.medium}
                      </p>
                      {work.authors?.[0] && (
                        <p className="text-sm text-[#7A7A78] mt-1">
                          by {getWorkById(work.id)?.authors?.[0]?.artistId}
                        </p>
                      )}
                    </div>
                    <p className="text-xl font-medium text-[#1A1A1A]">
                      ${work.price?.amount?.toLocaleString()}
                    </p>
                  </div>

                  {notes && (
                    <div className="mt-4 p-3 bg-[#F5F4F2] text-sm text-[#4A4A48]">
                      <span className="text-[#7A7A78]">Note:</span> {notes}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => handleRemove(work.id)}
                      className="flex items-center gap-2 text-sm text-[#7A7A78] hover:text-[#B83A2F] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                    <Link
                      href={`/works/${work.slug}`}
                      className="flex items-center gap-2 text-sm text-[#7A7A78] hover:text-[#1A1A1A] transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                      <span>Save for Later</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E4E2] p-6 sticky top-24">
              <h3 className="font-medium text-lg text-[#1A1A1A] mb-6">
                Order Summary
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-[#4A4A48]">
                  <span>Subtotal</span>
                  <span>${cartDetails.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-[#4A4A48]">
                  <span>Shipping</span>
                  <span className="text-[#7A7A78]">Calculated at checkout</span>
                </div>
                <div className="flex items-center justify-between text-[#4A4A48]">
                  <span>Taxes</span>
                  <span className="text-[#7A7A78]">Calculated at checkout</span>
                </div>

                <div className="pt-4 border-t border-[#E5E4E2]">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#1A1A1A]">Estimated Total</span>
                    <span className="text-2xl font-medium text-[#1A1A1A]">
                      ${cartDetails.subtotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#1A1A1A] text-white hover:bg-[#B83A2F] transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/works"
                  className="flex items-center justify-center w-full px-6 py-3 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 p-4 bg-[#F5F4F2] text-sm">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-[#7A7A78] shrink-0 mt-0.5" />
                  <p className="text-[#7A7A78]">
                    Artworks are unique items. Please review your selection carefully before checkout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-20">
          <SectionHeader
            title="You May Also Like"
            subtitle="Complete your collection with these works"
          />
          <div className="mt-8 text-center">
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-[#B83A2F] hover:underline"
            >
              <span>Browse All Works</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full p-6">
            <h3 className="text-xl font-medium text-[#1A1A1A] mb-4">
              Clear Cart?
            </h3>
            <p className="text-[#7A7A78] mb-6">
              This will remove all {cartDetails.itemCount} works from your cart. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 border border-[#E5E4E2] text-[#4A4A48] hover:border-[#1A1A1A] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="flex-1 px-4 py-2 bg-[#B83A2F] text-white hover:bg-[#9A2F24] transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
