import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getWhatsAppOrderUrl, generateWhatsAppMessage, WHATSAPP_NUMBER } from '../lib/whatsapp';
import { motion, AnimatePresence } from 'motion/react';

interface WhatsAppCheckoutProps {
  onSuccess?: () => void;
}

export const WhatsAppCheckout: React.FC<WhatsAppCheckoutProps> = ({ onSuccess }) => {
  const { items, subtotal } = useCart();
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = generateWhatsAppMessage(items, subtotal);
  const whatsappUrl = getWhatsAppOrderUrl(items, subtotal);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOrderClick = () => {
    // Open WhatsApp link in new window/tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (onSuccess) onSuccess();
  };

  return (
    <div className="w-full">
      {/* Primary Big Black Button */}
      <motion.button
        id="cart-whatsapp-order-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleOrderClick}
        disabled={items.length === 0}
        className="w-full py-5 px-6 bg-[#000000] text-[#FFFFFF] font-punch text-lg sm:text-xl uppercase tracking-wider font-black hover:bg-[#222222] transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed shadow-[6px_6px_0px_0px_#999999]"
      >
        <span>ORDER ON WHATSAPP</span>
        <span className="text-xl">💬</span>
      </motion.button>

      {/* Quick View Text / Direct Copy option for iframe compatibility */}
      {items.length > 0 && (
        <div className="mt-3 flex items-center justify-between text-xs text-[#555555]">
          <button
            onClick={() => setShowPreviewModal(true)}
            className="underline hover:text-[#000000] font-medium cursor-pointer"
          >
            Preview order text
          </button>
          <button
            onClick={handleCopyMessage}
            className="hover:text-[#000000] font-punch cursor-pointer uppercase"
          >
            {copied ? 'Copied to clipboard! ✓' : 'Copy Message'}
          </button>
        </div>
      )}

      {/* WhatsApp Message Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-[#FFFFFF] text-[#000000] border-4 border-[#000000] p-6 shadow-[10px_10px_0px_0px_#000000]"
            >
              <div className="flex items-center justify-between pb-3 border-b-2 border-[#000000]">
                <h4 className="font-punch text-lg uppercase">WhatsApp Message</h4>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="font-punch text-lg hover:opacity-70 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="my-4 p-4 bg-[#F5F5F3] border-2 border-[#000000] font-mono text-sm whitespace-pre-line leading-relaxed text-[#111111]">
                {message}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopyMessage}
                  className="flex-1 py-3 border-2 border-[#000000] font-punch text-sm uppercase hover:bg-[#F0F0F0] cursor-pointer"
                >
                  {copied ? 'COPIED! ✓' : 'COPY TEXT'}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-[#000000] text-[#FFFFFF] text-center font-punch text-sm uppercase hover:bg-[#222222]"
                >
                  SEND NOW →
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
