import { Product } from '../types';

import heroImg from '../assets/images/hero_choc_box_1789784311993.jpg';
import dateBoxImg from '../assets/images/the_date_box_1789784326464.jpg';
import bestieBoxImg from '../assets/images/the_bestie_box_1789784346764.jpg';
import crushBoxImg from '../assets/images/the_crush_box_1789784367924.jpg';
import birthdayBoxImg from '../assets/images/birthday_box_1789784379691.jpg';

export const HERO_PRODUCT_IMAGE = heroImg;

export const PRODUCTS: Product[] = [
  {
    id: "date-box",
    slug: "the-date-box",
    name: "THE DATE BOX",
    headline: ["THE", "DATE", "BOX."],
    price: 499,
    pieces: 12,
    category: "person",
    audienceLabel: "❤️ YOUR PERSON",
    weight: "Net Wt. 120g",
    tag: "MOST GIFTED",
    image: dateBoxImg,
    variants: [
      { name: "6 PCS", pieces: 6, price: 299, weight: "Net Wt. 60g" },
      { name: "12 PCS", pieces: 12, price: 499, weight: "Net Wt. 120g" },
    ],
  },
  {
    id: "bestie-box",
    slug: "the-bestie-box",
    name: "THE BESTIE BOX",
    headline: ["THE", "BESTIE", "BOX."],
    price: 449,
    pieces: 12,
    category: "bestie",
    audienceLabel: "👯 YOUR BESTIE",
    weight: "Net Wt. 110g",
    tag: "BESTSELLER",
    image: bestieBoxImg,
    variants: [
      { name: "6 PCS", pieces: 6, price: 269, weight: "Net Wt. 55g" },
      { name: "12 PCS", pieces: 12, price: 449, weight: "Net Wt. 110g" },
    ],
  },
  {
    id: "crush-box",
    slug: "the-crush-box",
    name: "THE CRUSH BOX",
    headline: ["THE", "CRUSH", "BOX."],
    price: 499,
    pieces: 8,
    category: "person",
    audienceLabel: "❤️ YOUR PERSON",
    weight: "Net Wt. 100g",
    tag: "NO LABELS",
    image: crushBoxImg,
    variants: [
      { name: "8 PCS", pieces: 8, price: 499, weight: "Net Wt. 100g" },
      { name: "16 PCS", pieces: 16, price: 799, weight: "Net Wt. 200g" },
    ],
  },
  {
    id: "birthday-box",
    slug: "the-birthday-box",
    name: "THE BIRTHDAY BOX",
    headline: ["THE", "BIRTHDAY", "BOX."],
    price: 599,
    pieces: 16,
    category: "people",
    audienceLabel: "🎂 YOUR PEOPLE",
    weight: "Net Wt. 180g",
    tag: "PARTY PACK",
    image: birthdayBoxImg,
    variants: [
      { name: "8 PCS", pieces: 8, price: 349, weight: "Net Wt. 90g" },
      { name: "16 PCS", pieces: 16, price: 599, weight: "Net Wt. 180g" },
    ],
  },
];

