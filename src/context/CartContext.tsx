'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types';

interface CartContextType {
  cartItems: CartItem[];
  wishlist: Product[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  addToWishlist: (item: Product) => void;
  removeFromWishlist: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      Promise.resolve().then(() => {
        setCartItems((prev) => prev.length === 0 ? parsedCart : prev);
      });
    }
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      const parsedWishlist = JSON.parse(storedWishlist);
      Promise.resolve().then(() => {
        setWishlist((prev) => prev.length === 0 ? parsedWishlist : prev);
      });
    }
  }, []);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existItem = prev.find((x) => x._id === item._id);
      let newCart;
      if (existItem) {
        newCart = prev.map((x) => (x._id === existItem._id ? item : x));
      } else {
        newCart = [...prev, item];
      }
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => {
      const newCart = prev.filter((x) => x._id !== id);
      localStorage.setItem('cartItems', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const addToWishlist = (item: Product) => {
    setWishlist((prev) => {
      if (prev.find((x) => x._id === item._id)) return prev;
      const newWishlist = [...prev, item];
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((x) => x._id !== id);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      return newWishlist;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        addToCart,
        removeFromCart,
        clearCart,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
