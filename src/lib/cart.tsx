import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "./store";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
  totalAfn: number;
  count: number;
  isOpen: boolean;
  setOpen: (b: boolean) => void;
}

const CartContext = createContext<CartCtx | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("karimi-cart") || "[]");
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("karimi-cart", JSON.stringify(items));
  }, [items]);

  const add = (p: Product) => {
    setItems(prev => {
      const exists = prev.find(i => i.product.id === p.id);
      if (exists) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product: p, qty: 1 }];
    });
  };

  const remove = (id: string) => setItems(prev => prev.filter(i => i.product.id !== id));
  const setQty = (id: string, qty: number) => {
    if (qty <= 0) return remove(id);
    setItems(prev => prev.map(i => i.product.id === id ? { ...i, qty } : i));
  };
  const clear = () => setItems([]);

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const totalAfn = items.reduce((s, i) => s + (i.product.price_afn || i.product.price * 70) * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, total, totalAfn, count, isOpen, setOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
};
