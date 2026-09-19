import React from 'react';
import { motion } from 'motion/react';
import { BRAND_DISPLAY_NUMBER } from '../lib/whatsapp';

interface FooterProps {
  onShopGifts: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onShopGifts }) => {
  return (
    <footer className="w-full bg-[#000000] text-[#FFFFFF] border-t-4 border-[#FFFFFF]">
      {/* Homepage Ending Call-to-Action */}
      <section className="py-24 sm:py-32 px-4 sm:px-8 text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto w-full"
        >
          {/* Huge Text: SEND SOME LOVE. ❤️ */}
          <h2 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.98] sm:leading-[0.95] tracking-tight uppercase text-[#FFFFFF] m-0 select-none">
            <span className="block">SEND</span>
            <span className="block">SOME</span>
            <span className="block">LOVE. ❤️</span>
          </h2>

          {/* Button: SHOP GIFTS → */}
          <div className="mt-10 sm:mt-14">
            <motion.button
              id="footer-shop-gifts-btn"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={onShopGifts}
              className="inline-flex items-center gap-4 bg-[#FFFFFF] text-[#000000] font-punch text-xl sm:text-2xl uppercase px-10 py-5 font-black tracking-wider cursor-pointer shadow-[8px_8px_0px_0px_#333333] hover:shadow-[4px_4px_0px_0px_#333333] transition-all"
            >
              <span>SHOP GIFTS</span>
              <span>→</span>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Tiny Footer */}
      <div className="border-t border-[#222222] py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-punch tracking-widest uppercase text-[#888888]">
          <div>
            © 2026 CHOC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6 text-[#CCCCCC]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] transition-colors"
            >
              Instagram
            </a>
            <span>•</span>
            <a
              href={`https://wa.me/919876543210`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#FFFFFF] transition-colors"
            >
              WhatsApp ({BRAND_DISPLAY_NUMBER})
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
