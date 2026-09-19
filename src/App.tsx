import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AudienceSelector } from './components/AudienceSelector';
import { ProductGrid } from './components/ProductGrid';
import { ProductPage } from './components/ProductPage';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, AudienceCategory } from './types';

export function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'shop' | 'product'>('home');
  const [selectedCategory, setSelectedCategory] = useState<AudienceCategory>('all');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // Hash-based routing to support sharing/direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash.startsWith('product/')) {
        const slug = hash.replace('product/', '');
        const found = PRODUCTS.find((p) => p.slug === slug);
        if (found) {
          setActiveProduct(found);
          setCurrentView('product');
          window.scrollTo({ top: 0, behavior: 'instant' });
          return;
        }
      } else if (hash === 'shop') {
        setCurrentView('shop');
        setTimeout(() => {
          document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return;
      }
      setCurrentView('home');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenProduct = (product: Product) => {
    setActiveProduct(product);
    setCurrentView('product');
    window.location.hash = `product/${product.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBoxes = () => {
    setActiveProduct(null);
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAudience = (category: AudienceCategory) => {
    setSelectedCategory(category);
    // Scroll to products section smoothly
    const productsEl = document.getElementById('products-section');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigate = (view: 'home' | 'shop', targetSectionId?: string) => {
    if (currentView === 'product') {
      setCurrentView('home');
      window.location.hash = '';
    }

    if (targetSectionId) {
      setTimeout(() => {
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShopClick = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('home');
      setTimeout(() => {
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#FFFFFF] font-body selection:bg-[#FFFFFF] selection:text-[#000000]">
      {/* Top Banner: Streetwear ticker marquee */}
      <div className="bg-[#FFFFFF] text-[#000000] py-2 px-4 overflow-hidden whitespace-nowrap border-b-2 border-[#000000]">
        <div className="inline-block animate-marquee font-punch text-xs sm:text-sm tracking-widest uppercase">
          ⚡️ GEN-Z CHOCOLATE GIFTING • SHIPS IN 24H • REAL CACAO NO JUNK • FOR YOUR FAVORITE PERSON • WHATSAPP ORDERING ⚡️ GEN-Z CHOCOLATE GIFTING • SHIPS IN 24H • REAL CACAO NO JUNK • FOR YOUR FAVORITE PERSON
        </div>
      </div>

      {/* Navigation Bar */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      <main>
        {currentView === 'product' && activeProduct ? (
          <ProductPage product={activeProduct} onBack={handleBackToBoxes} />
        ) : (
          <>
            {/* 1. Hero Section (Black full-screen) */}
            <Hero onShopClick={handleShopClick} />

            {/* 2. Audience Selector Section (White background) */}
            <AudienceSelector
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectAudience}
            />

            {/* 3. Products Section ("PICK YOURS.") */}
            <ProductGrid
              products={PRODUCTS}
              selectedCategory={selectedCategory}
              onSelectProduct={handleOpenProduct}
              onClearFilter={() => setSelectedCategory('all')}
            />
          </>
        )}
      </main>

      {/* 4. Homepage Ending / Footer ("SEND SOME LOVE. ❤️") */}
      <Footer onShopGifts={handleShopClick} />

      {/* Right-side Cart Drawer */}
      <CartDrawer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
