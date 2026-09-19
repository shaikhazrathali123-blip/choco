import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenProduct }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
      onClick={() => onOpenProduct(product)}
      className="group relative bg-[#000000] border-4 border-[#000000] flex flex-col justify-between cursor-pointer text-[#FFFFFF] shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#000000] transition-all duration-200"
    >
      {/* Product Image Area */}
      <div 
        className="relative w-full aspect-square bg-[#111111] overflow-hidden border-b-4 border-[#000000]"
        onMouseEnter={() => images.length > 1 && setCurrentImgIndex(1)}
        onMouseLeave={() => setCurrentImgIndex(0)}
      >
        <img
          src={images[currentImgIndex]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ease-out"
          loading="lazy"
        />

        {/* Multiple image indicator pills if more than 1 image */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentImgIndex
                    ? 'bg-[#FFFFFF] w-5'
                    : 'bg-[#FFFFFF]/50 hover:bg-[#FFFFFF]/80'
                }`}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Small subtle badge if present */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-[#FFFFFF] text-[#000000] text-[11px] font-punch tracking-wider px-2.5 py-1 z-10">
            {product.tag}
          </span>
        )}
      </div>

      {/* Product Info & Action */}
      <div className="p-5 sm:p-6 bg-[#FFFFFF] text-[#000000] flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-punch text-xl sm:text-2xl tracking-tight uppercase m-0 leading-tight">
            {product.name}
          </h3>
          <div className="font-punch text-lg sm:text-xl text-[#000000] mt-1.5">
            {formattedPrice}
          </div>
        </div>

        {/* Action Button: + ADD */}
        <div className="mt-5 pt-4 border-t-2 border-[#000000] flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#666666]">
            {product.pieces} PCS
          </span>

          <motion.button
            id={`add-btn-${product.slug}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleQuickAdd}
            className={`px-5 py-2.5 font-punch text-sm sm:text-base uppercase tracking-wider transition-colors duration-150 cursor-pointer border-2 border-[#000000] ${
              isAdded
                ? 'bg-[#000000] text-[#FFFFFF]'
                : 'bg-[#000000] text-[#FFFFFF] hover:bg-[#FFFFFF] hover:text-[#000000]'
            }`}
          >
            {isAdded ? 'ADDED ✓' : '+ ADD'}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};
