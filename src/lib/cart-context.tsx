'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { formatPrice } from '@/lib/categories';

export interface CartItem {
  id: string;
  slug: string;
  title: string;
  titleCn?: string;
  artistName: string;
  artistSlug?: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  // For digital products (courses)
  type: 'artwork' | 'course';
  // Course specific
  courseSlug?: string;
  courseVideoUrl?: string;
}

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  currency: string;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
  items: [],
  itemCount: 0,
  subtotal: 0,
  currency: 'USD',
};

function calculateTotals(items: CartItem[]): Pick<CartState, 'items' | 'itemCount' | 'subtotal' | 'currency'> {
  const currency = items.length > 0 ? items[0].currency : 'USD';
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  return {
    items,
    itemCount: items.length,
    subtotal,
    currency,
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      // Check if item already exists
      const exists = state.items.some(item => item.id === action.payload.id);
      if (exists) {
        return state;
      }
      const newItems = [...state.items, action.payload];
      return { ...state, ...calculateTotals(newItems) };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return { ...state, ...calculateTotals(newItems) };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'LOAD_CART':
      return { ...state, ...calculateTotals(action.payload) };

    default:
      return state;
  }
}

// Storage key
const CART_STORAGE_KEY = 'carveeast_cart';

// Create context
interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  formatItemPrice: (price: number) => string;
  formatTotal: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const items = JSON.parse(saved);
        dispatch({ type: 'LOAD_CART', payload: items });
      }
    } catch (e) {
      console.error('Failed to load cart:', e);
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [state.items]);

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (id: string) => {
    return state.items.some(item => item.id === id);
  };

  const formatItemPrice = (price: number) => {
    return formatPrice(price, state.currency);
  };

  const formatTotal = () => {
    return formatPrice(state.subtotal, state.currency);
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        formatItemPrice,
        formatTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// Add to cart helper (for use outside React components)
export function createAddToCartPayload(item: Omit<CartItem, 'type'> & { type?: 'artwork' | 'course' }): CartItem {
  return {
    ...item,
    type: item.type || 'artwork',
  };
}
