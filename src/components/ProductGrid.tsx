import React from 'react';
import { Product, AudienceCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: AudienceCategory;
  onSelectProduct: (product: Product) => void;
  onClearFilter: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectProduct,
  onClearFilter,
}) => {
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section id="products-section" className="w-full bg-[#F5F5F3] py-20 sm:py-28 px-4 sm:px-8 border-b-4 border-[#000000]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl leading-[0.98] sm:leading-[0.95] tracking-tight uppercase text-[#000000] m-0">
              <span className="block">PICK</span>
              <span className="block">YOURS.</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-punch text-sm sm:text-base uppercase tracking-wider text-[#000000] border-b-2 border-[#000000] pb-0.5">
              ALL CHOCOLATES SHIP WITHIN 24H ⚡️
            </span>
          </div>
        </div>

        {/* Product Grid: 4 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenProduct={onSelectProduct}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 border-4 border-[#000000] bg-[#FFFFFF] p-8">
            <p className="font-punch text-2xl uppercase mb-4">No boxes found for this filter</p>
            <button
              onClick={onClearFilter}
              className="bg-[#000000] text-[#FFFFFF] font-punch text-base uppercase px-6 py-3"
            >
              SHOW ALL BOXES
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
