export type AudienceCategory = 'all' | 'person' | 'bestie' | 'people';

export interface ProductVariant {
  name: string;
  pieces: number;
  price: number;
  weight: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  headline: string[];
  price: number;
  pieces: number;
  category: AudienceCategory;
  audienceLabel: string;
  weight: string;
  image: string;
  images: string[];
  secondaryImage?: string;
  variants: ProductVariant[];
  tag?: string;
}

export interface CartItem {
  id: string; // product id + variant name
  productId: string;
  slug: string;
  name: string;
  variant: string;
  pieces: number;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}
