import { CartItem } from '../types';

// Keep WhatsApp configuration in one centralized location
export const WHATSAPP_NUMBER = "919876543210";
export const BRAND_DISPLAY_NUMBER = "+91 98765 43210";

/**
 * Formats cart items into the exact requested WhatsApp order message format:
 *
 * Hey! 👋
 *
 * I want to order:
 *
 * The Date Box (12 PCS) × 2
 * Bestie Box × 1
 *
 * Total: ₹1,497
 *
 * Please share the next steps.
 */
export function generateWhatsAppMessage(items: CartItem[], total: number): string {
  const itemLines = items
    .map(
      (item) =>
        `${item.name}${item.variant ? ` (${item.variant})` : ''} × ${item.quantity}`
    )
    .join('\n');

  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(total);

  return `Hey! 👋\n\nI want to order:\n\n${itemLines}\n\nTotal: ${formattedTotal}\n\nPlease share the next steps.`;
}

/**
 * Creates the direct WhatsApp web/app link with prefilled order text
 */
export function getWhatsAppOrderUrl(items: CartItem[], total: number, customNumber?: string): string {
  const message = generateWhatsAppMessage(items, total);
  const number = customNumber || WHATSAPP_NUMBER;
  const cleanNumber = number.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
