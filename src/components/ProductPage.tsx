import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ product, onBack }) => {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants[0]?.name || `${product.pieces} PCS`
  );
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.name === selectedVariant) || product.variants[0];

  const currentPrice = activeVariant ? activeVariant.price : product.price;
  const currentWeight = activeVariant ? activeVariant.weight : product.weight;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(currentPrice * quantity);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1000);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#000000] text-[#FFFFFF] py-8 sm:py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Simple back navigation */}
        <button
          id="back-to-shop-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-punch text-sm sm:text-base uppercase tracking-wider text-[#FFFFFF] hover:opacity-70 mb-8 sm:mb-12 cursor-pointer border-b border-[#FFFFFF] pb-1"
        >
          <span>←</span>
          <span>BACK TO ALL BOXES</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Large Product Image */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative border-4 border-[#FFFFFF] bg-[#111111] overflow-hidden shadow-[12px_12px_0px_0px_#222222]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[4/4] sm:aspect-[4/3] object-cover"
              />

              {product.tag && (
                <div className="absolute top-4 left-4 bg-[#FFFFFF] text-[#000000] font-punch text-xs sm:text-sm tracking-wider px-3 py-1">
                  {product.tag}
                </div>
              )}
            </motion.div>
          </div>

          {/* Product Details & Purchase Form */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Huge Stacked Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-black text-6xl sm:text-7xl md:text-8xl leading-[0.98] sm:leading-[0.95] tracking-tight uppercase m-0"
            >
              {product.headline.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>

            {/* Price */}
            <div className="font-punch text-3xl sm:text-4xl text-[#FFFFFF] mt-6 sm:mt-8 tracking-tight">
              {formattedPrice}
            </div>

            {/* Small variant buttons: 6 PCS, 12 PCS */}
            {product.variants && product.variants.length > 0 && (
              <div className="mt-8">
                <div className="text-xs font-punch tracking-widest text-[#AAAAAA] uppercase mb-3">
                  SIZE:
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => {
                    const isSelected = selectedVariant === variant.name;
                    return (
                      <button
                        key={variant.name}
                        id={`variant-btn-${variant.name.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setSelectedVariant(variant.name)}
                        className={`px-5 py-2.5 font-punch text-sm sm:text-base uppercase tracking-wider border-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFFFFF] text-[#000000] border-[#FFFFFF]'
                            : 'bg-[#000000] text-[#FFFFFF] border-[#555555] hover:border-[#FFFFFF]'
                        }`}
                      >
                        {variant.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity: − 1 + */}
            <div className="mt-8 flex items-center gap-6">
              <div className="text-xs font-punch tracking-widest text-[#AAAAAA] uppercase">
                QUANTITY:
              </div>
              <div className="inline-flex items-center border-2 border-[#FFFFFF]">
                <button
                  id="qty-decrement-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-12 h-12 flex items-center justify-center font-punch text-xl hover:bg-[#222222] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-12 text-center font-punch text-lg select-none">
                  {quantity}
                </span>
                <button
                  id="qty-increment-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center font-punch text-xl hover:bg-[#222222] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Big Button: ADD TO CART */}
            <div className="mt-8 sm:mt-10">
              <motion.button
                id="product-add-to-cart-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full py-5 px-8 bg-[#FFFFFF] text-[#000000] font-punch text-xl sm:text-2xl uppercase tracking-wider font-black hover:bg-[#E5E5E5] transition-all cursor-pointer shadow-[6px_6px_0px_0px_#444444]"
              >
                {addedAnimation ? 'ADDED TO BAG! ✓' : 'ADD TO CART'}
              </motion.button>
            </div>

            {/* Very small information */}
            <div className="mt-6 pt-6 border-t border-[#333333] text-xs font-medium text-[#888888] uppercase tracking-wider">
              Chocolate • {currentWeight}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
