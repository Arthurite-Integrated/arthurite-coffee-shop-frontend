"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCartSimple, List, X } from "@phosphor-icons/react";
// import { ShoppingBag } from "@phosphor-icons/react";
import { useCartContext } from "./CartProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart } = useCartContext();

  const numOfCartItem = cart.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#19381f]">
            GreenEats
          </Link>

          {/* Hamburger menu for mobile */}
          <div className="lg:hidden flex gap-2 items-center">
            <Link href="/cart" className="relative">
              <ShoppingCartSimple size={32} />
              <div className="absolute -top-2 -right-2 bg-[#19381f] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {numOfCartItem}
              </div>
            </Link>
            <button onClick={toggleMenu} className="text-[#19381f]">
              {isMenuOpen ? <X size={32} /> : <List size={32} />}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex gap-5 items-center">
            <Link
              href="/vendor/login"
              className="text-[#19381f] hover:text-[#19381f]/80"
            >
              Vendor Login
            </Link>
            <Link
              href="/menu"
              className="bg-[#19381f] text-white px-4 py-2 rounded hover:bg-[#19381f]/80"
            >
              Order Now
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCartSimple size={32} />
              <div className="absolute -top-2 -right-2 bg-[#19381f] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {numOfCartItem}
              </div>
            </Link>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 flex flex-col gap-4">
            <Link
              href="/vendor/login"
              className="bg-white text-[#19381f] border border-[#19381f] px-4 py-2 rounded hover:bg-[#19381f]/80 text-center"
              onClick={toggleMenu}
            >
              Vendor Login
            </Link>
            <Link
              href="/menu"
              className="bg-[#19381f] text-white px-4 py-2 rounded hover:bg-[#19381f]/80 text-center"
              onClick={toggleMenu}
            >
              Order Now
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
