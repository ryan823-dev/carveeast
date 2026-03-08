// Shopping Cart System for CarveEast
// Uses localStorage for persistence

import { Work, WorkAvailability } from './types';

export interface CartItem {
  workId: string;
  quantity: number;
  addedAt: string;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  updatedAt: string;
}

const STORAGE_KEY = 'carve-east-cart';

// Get cart from localStorage
export function getCart(): Cart {
  if (typeof window === 'undefined') {
    return { items: [], updatedAt: new Date().toISOString() };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading cart:', error);
  }

  return { items: [], updatedAt: new Date().toISOString() };
}

// Save cart to localStorage
function saveCart(cart: Cart): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
}

// Add item to cart
export function addToCart(workId: string, notes?: string): Cart {
  const cart = getCart();

  const existingItem = cart.items.find((item) => item.workId === workId);

  if (existingItem) {
    // Artworks are unique, so we just update notes if provided
    if (notes !== undefined) {
      existingItem.notes = notes;
    }
  } else {
    cart.items.push({
      workId,
      quantity: 1,
      addedAt: new Date().toISOString(),
      notes,
    });
  }

  cart.updatedAt = new Date().toISOString();
  saveCart(cart);

  return cart;
}

// Remove item from cart
export function removeFromCart(workId: string): Cart {
  const cart = getCart();

  cart.items = cart.items.filter((item) => item.workId !== workId);
  cart.updatedAt = new Date().toISOString();

  saveCart(cart);
  return cart;
}

// Update item notes
export function updateCartItemNotes(workId: string, notes: string): Cart {
  const cart = getCart();

  const item = cart.items.find((item) => item.workId === workId);
  if (item) {
    item.notes = notes;
    cart.updatedAt = new Date().toISOString();
    saveCart(cart);
  }

  return cart;
}

// Clear cart
export function clearCart(): Cart {
  const emptyCart: Cart = {
    items: [],
    updatedAt: new Date().toISOString(),
  };

  saveCart(emptyCart);
  return emptyCart;
}

// Get cart item count
export function getCartItemCount(): number {
  const cart = getCart();
  return cart.items.length;
}

// Get cart total (requires work data)
export function calculateCartTotal(
  cart: Cart,
  getWorkById: (id: string) => Work | undefined
): {
  subtotal: number;
  itemCount: number;
  items: Array<{
    work: Work;
    notes?: string;
  }>;
} {
  let subtotal = 0;
  const validItems: Array<{
    work: Work;
    notes?: string;
  }> = [];

  for (const item of cart.items) {
    const work = getWorkById(item.workId);
    if (work && work.price?.amount) {
      subtotal += work.price.amount;
      validItems.push({
        work,
        notes: item.notes,
      });
    }
  }

  return {
    subtotal,
    itemCount: validItems.length,
    items: validItems,
  };
}

// Check if work is in cart
export function isInCart(workId: string): boolean {
  const cart = getCart();
  return cart.items.some((item) => item.workId === workId);
}

// Move cart item to favorites
export function moveToFavorites(workId: string): void {
  // Remove from cart
  removeFromCart(workId);

  // Add to favorites (favorites.ts function)
  const { addToFavorites } = require('./favorites');
  addToFavorites(workId);
}

// Validate cart (remove unavailable items)
export function validateCart(
  getWorkById: (id: string) => Work | undefined
): Cart {
  const cart = getCart();

  const validItems = cart.items.filter((item) => {
    const work = getWorkById(item.workId);
    return work && work.availability === WorkAvailability.AVAILABLE;
  });

  if (validItems.length !== cart.items.length) {
    const updatedCart: Cart = {
      items: validItems,
      updatedAt: new Date().toISOString(),
    };
    saveCart(updatedCart);
    return updatedCart;
  }

  return cart;
}
