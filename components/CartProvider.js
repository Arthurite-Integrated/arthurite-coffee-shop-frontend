"use client";

import { createContext, useContext } from "react";
import { useCart } from '../Hooks/UseCart'

const CartContext = createContext();

export function CartProvider({ children }) {
  const cart = useCart();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  return useContext(CartContext);
}
