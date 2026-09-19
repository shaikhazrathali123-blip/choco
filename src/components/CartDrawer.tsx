import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { CartItem } from './CartItem';
import { WhatsAppCheckout } from './WhatsAppCheckout';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, subtotal, totalItems } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeCart]);

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#000000]/70 transition-opacity backdrop-blur-xs cursor-pointer"
          />

          {/* Right-side Drawer */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#FFFFFF] text-[#000000] border-l-4 border-[#000000] flex flex-col justify-between shadow-2xl"
            >
              {/* Drawer Header: YOUR BAG */}
              <div className="p-6 sm:p-8 border-b-4 border-[#000000] flex items-center justify-between bg-[#FFFFFF]">
                <div>
                  <h2 className="font-display font-black text-4xl sm:text-5xl uppercase tracking-tighter m-0">
                    YOUR BAG
                  </h2>
                  <p className="text-xs font-punch tracking-widest text-[#666666] uppercase mt-1">
                    {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
                  </p>
                </div>

                <button
                  id="cart-drawer-close-btn"
                  onClick={closeCart}
                  className="w-10 h-10 border-2 border-[#000000] flex items-center justify-center font-punch text-xl hover:bg-[#000000] hover:text-[#FFFFFF] transition-colors cursor-pointer"
                  aria-label="Close bag"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 divide-y divide-transparent">
                {items.length === 0 ? (
                  <div className="py-20 text-center">
                    <p className="font-display text-3xl uppercase tracking-tight text-[#000000]">
                      BAG IS EMPTY.
                    </p>
                    <p className="text-sm font-medium text-[#666666] mt-2 mb-8">
                      You haven't added any chocolate boxes yet.
                    </p>
                    <button
                      onClick={closeCart}
                      className="inline-block py-3 px-6 bg-[#000000] text-[#FFFFFF] font-punch text-sm uppercase tracking-wider hover:bg-[#222222] cursor-pointer"
                    >
                      EXPLORE BOXES →
                    </button>
                  </div>
                ) : (
                  <div>
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {items.length > 0 && (
                <div className="p-6 sm:p-8 bg-[#F5F5F3] border-t-4 border-[#000000]">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-punch text-xl uppercase tracking-wider text-[#000000]">
                      TOTAL
                    </span>
                    <span className="font-display font-black text-3xl sm:text-4xl text-[#000000] tracking-tight">
                      {formattedTotal}
                    </span>
                  </div>

                  <WhatsAppCheckout onSuccess={closeCart} />

                  <p className="text-[11px] font-bold text-center text-[#777777] uppercase tracking-wider mt-4">
                    No payment gateway hassle • Connect directly on WhatsApp
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
