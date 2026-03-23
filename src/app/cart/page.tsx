'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight, CreditCard, Shield, Truck } from 'lucide-react';
import { useCart, CartItem } from '@/lib/cart-context';
import { PRODUCT_CATEGORIES, type ProductCategory, formatPrice } from '@/lib/categories';

function CartItemCard({ item }: { item: CartItem }) {
  const { removeItem } = useCart();
  const categoryInfo = item.category ? PRODUCT_CATEGORIES[item.category as ProductCategory] : null;

  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
        {item.image ? (
          <Image src={item.image} alt={item.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl text-stone-300">
            {categoryInfo?.icon || '艺'}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-2">
          <div className="min-w-0">
            <h3 className="font-medium text-stone-900 line-clamp-1">
              {item.titleCn || item.title}
            </h3>
            <p className="text-sm text-stone-500">{item.artistName}</p>
            {categoryInfo && (
              <span className="inline-block mt-1 text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded">
                {categoryInfo.labelCn}
              </span>
            )}
          </div>
          <p className="font-semibold text-stone-900 flex-shrink-0">
            {formatPrice(item.price, item.currency)}
          </p>
        </div>

        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => removeItem(item.id)}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </button>
          <Link
            href={item.type === 'course' ? `/products/${item.courseSlug}` : `/works/${item.slug}`}
            className="text-sm text-amber-600 hover:text-amber-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, itemCount, subtotal, currency, clearCart, formatTotal } = useCart();

  const shipping = itemCount > 0 ? 0 : 0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif text-stone-900">Shopping Cart</h1>
          <p className="text-stone-600 mt-2">
            {itemCount === 0
              ? 'Your cart is empty'
              : `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in your cart`
            }
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-stone-900 mb-2">Your cart is empty</h2>
            <p className="text-stone-500 mb-6">Discover our collection of fine Chinese art and crafts.</p>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              Browse Works
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Subtotal ({itemCount} items)</span>
                    <span className="text-stone-900">
                      {formatPrice(subtotal, currency)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Shipping</span>
                    <span className="text-stone-900">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-stone-200 pt-3 flex justify-between">
                    <span className="font-medium text-stone-900">Total</span>
                    <span className="font-bold text-xl text-stone-900">
                      {formatPrice(total, currency)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Link
                    href="/checkout"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                  >
                    <CreditCard className="w-4 h-4" />
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-sm text-stone-500 hover:text-red-600"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t border-stone-100">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <Shield className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <p className="text-xs text-stone-500">Authenticity Guaranteed</p>
                    </div>
                    <div>
                      <Truck className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <p className="text-xs text-stone-500">Worldwide Shipping</p>
                    </div>
                    <div>
                      <CreditCard className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                      <p className="text-xs text-stone-500">Secure Payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
