import React from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';

interface NavbarProps {
  currentView: 'home' | 'shop' | 'product';
  onNavigate: (view: 'home' | 'shop', targetSectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { totalItems, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#000000] border-b border-[#222222] text-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* BRAND NAME */}
        <button
          id="nav-brand-logo"
          onClick={() => onNavigate('home')}
          className="text-2xl sm:text-3xl font-punch tracking-tighter hover:opacity-80 transition-opacity flex items-center gap-1 text-left cursor-pointer"
        >
          <span>CHOC.</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-8">
          <button
            id="nav-link-shop"
            onClick={() => onNavigate('shop', 'products-section')}
            className="text-sm font-bold tracking-wider uppercase hover:opacity-70 transition-opacity cursor-pointer py-2"
          >
            SHOP
          </button>
          <button
            id="nav-link-gifts"
            onClick={() => onNavigate('home', 'audience-section')}
            className="text-sm font-bold tracking-wider uppercase hover:opacity-70 transition-opacity cursor-pointer py-2"
          >
            GIFTS
          </button>
          <motion.button
            id="nav-cart-btn-desktop"
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
            className="text-sm font-black tracking-wider uppercase hover:opacity-70 transition-opacity cursor-pointer border border-[#FFFFFF] px-4 py-2 flex items-center gap-2"
          >
            <span>CART ({totalItems})</span>
            {totalItems > 0 && (
              <span className="inline-block w-2 h-2 rounded-full bg-[#FFFFFF] animate-pulse" />
            )}
          </motion.button>
        </nav>

        {/* Mobile Navigation: BRAND & CART */}
        <div className="sm:hidden flex items-center">
          <motion.button
            id="nav-cart-btn-mobile"
            whileTap={{ scale: 0.95 }}
            onClick={openCart}
            className="text-xs font-black tracking-wider uppercase border border-[#FFFFFF] px-3.5 py-2 flex items-center gap-1.5 cursor-pointer"
          >
            <span>CART</span>
            <span>({totalItems})</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
};
