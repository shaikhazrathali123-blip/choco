import React from 'react';
import { motion } from 'motion/react';
import { HERO_PRODUCT_IMAGE } from '../data/products';

interface HeroProps {
  onShopClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick }) => {
  return (
    <section className="relative w-full min-h-[90vh] sm:min-h-screen bg-[#000000] text-[#FFFFFF] flex items-center overflow-hidden pt-8 pb-16 sm:py-20 px-4 sm:px-8">
      {/* Background subtle noise/grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#222222_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left / Typography column */}
        <div className="lg:col-span-8 flex flex-col justify-center select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Huge Stacked Typography */}
            <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-[0.98] sm:leading-[0.95] tracking-tight uppercase text-[#FFFFFF] m-0">
              <span className="block">MADE</span>
              <span className="block">TO</span>
              <span className="block">SHARE.</span>
            </h1>

            {/* Small text */}
            <p className="font-body text-lg sm:text-2xl md:text-3xl font-medium tracking-tight text-[#CCCCCC] mt-6 sm:mt-8">
              Chocolate for your people.
            </p>

            {/* Button */}
            <div className="mt-8 sm:mt-10">
              <motion.button
                id="hero-shop-now-btn"
                whileHover={{ scale: 1.03, x: 4 }}
                whileTap={{ scale: 0.97 }}
                onClick={onShopClick}
                className="group inline-flex items-center gap-4 bg-[#FFFFFF] text-[#000000] font-punch text-base sm:text-xl uppercase px-8 sm:px-10 py-4 sm:py-5 font-black tracking-wider transition-all duration-150 cursor-pointer shadow-[6px_6px_0px_0px_#333333] hover:shadow-[2px_2px_0px_0px_#333333]"
              >
                <span>SHOP NOW</span>
                <span className="text-xl sm:text-2xl transition-transform duration-150 group-hover:translate-x-1.5">
                  →
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Right / Overlapping Chocolate Product image */}
        <div className="lg:col-span-4 relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none"
          >
            {/* Streetwear framed image with high contrast monochrome border */}
            <div className="relative border-4 border-[#FFFFFF] bg-[#111111] overflow-hidden shadow-[12px_12px_0px_0px_#222222] group">
              <img
                src={HERO_PRODUCT_IMAGE}
                alt="CHOC Box - Streetwear Edition"
                className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="eager"
              />

              {/* Streetwear overlay tag */}
              <div className="absolute top-3 left-3 bg-[#000000] text-[#FFFFFF] text-xs font-punch tracking-widest px-3 py-1.5 border border-[#FFFFFF]">
                GEN-Z GIFTING
              </div>

              <div className="absolute bottom-3 right-3 bg-[#FFFFFF] text-[#000000] text-xs font-punch tracking-wider px-3 py-1.5">
                NO CORN SYRUP. REAL CACAO.
              </div>
            </div>

            {/* Overlapping sticker pill */}
            <motion.div
              whileHover={{ rotate: 0, scale: 1.05 }}
              className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#000000] text-[#FFFFFF] border-2 border-[#FFFFFF] px-5 py-3 font-punch text-sm sm:text-base tracking-wider uppercase rotate-[-6deg] shadow-[4px_4px_0px_0px_#FFFFFF]"
            >
              BEST GIVEN IN PERSON 🍫
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
