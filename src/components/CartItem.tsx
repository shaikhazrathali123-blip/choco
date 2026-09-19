import React from 'react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const formattedItemTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(item.price * item.quantity);

  return (
    <div className="py-5 border-b-2 border-[#E5E5E5] flex gap-4 items-start">
      {/* Small square preview */}
      <div className="w-20 h-20 bg-[#000000] border-2 border-[#000000] overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-punch text-base uppercase tracking-tight text-[#000000] m-0">
              {item.name}
            </h4>
            <p className="text-xs font-punch text-[#666666] tracking-wider uppercase mt-0.5">
              {item.variant}
            </p>
          </div>

          <button
            onClick={() => removeItem(item.id)}
            className="text-xs font-bold text-[#888888] hover:text-[#000000] p-1 cursor-pointer"
            aria-label="Remove item"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* −  2  + */}
          <div className="inline-flex items-center border-2 border-[#000000]">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="w-7 h-7 flex items-center justify-center font-punch text-sm hover:bg-[#F0F0F0] cursor-pointer"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-8 text-center font-punch text-sm select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="w-7 h-7 flex items-center justify-center font-punch text-sm hover:bg-[#F0F0F0] cursor-pointer"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="font-punch text-base text-[#000000]">
            {formattedItemTotal}
          </div>
        </div>
      </div>
    </div>
  );
};
