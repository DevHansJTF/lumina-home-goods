"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./data";

export interface CartItem extends Product {
  quantity: number;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface StoreContextType {
  cart: CartItem[];
  favorites: string[];
  toasts: ToastMessage[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  addToast: (message: string, type?: "success" | "error" | "info") => void;
  removeToast: (id: string) => void;
  cartTotal: number;
  cartCount: number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedCart = localStorage.getItem("lumina_cart");
        const savedFavorites = localStorage.getItem("lumina_favorites");
        if (savedCart) setCart(JSON.parse(savedCart));
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error("Failed to load from local storage", e);
      }
      setIsInitialized(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("lumina_cart", JSON.stringify(cart));
      localStorage.setItem("lumina_favorites", JSON.stringify(favorites));
    }
  }, [cart, favorites, isInitialized]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = React.useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      const id = Math.random().toString(36).substring(2, 9) + Date.now().toString();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 3000);
    },
    [removeToast],
  );

  const addToCart = React.useCallback(
    (product: Product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      addToast(`Added ${product.name} to cart`, "success");
    },
    [addToast],
  );

  const removeFromCart = React.useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = React.useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)));
    },
    [removeFromCart],
  );

  const clearCart = React.useCallback(() => setCart([]), []);

  const toggleFavorite = React.useCallback(
    (productId: string) => {
      const isFavorite = favorites.includes(productId);

      if (isFavorite) {
        addToast("Removed from favorites", "info");
        setFavorites((prev) => prev.filter((id) => id !== productId));
      } else {
        addToast("Added to favorites", "success");
        setFavorites((prev) => [...prev, productId]);
      }
    },
    [favorites, addToast],
  );

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        favorites,
        toasts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleFavorite,
        addToast,
        removeToast,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
