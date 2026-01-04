// Apparel type definitions for BGT merchandise
export type ApparelCategory = 'hoodie' | 'tshirt' | 'jacket' | 'accessory' | 'hat';
export type ApparelStatus = 'available' | 'coming-soon' | 'sold-out';

export interface ApparelItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: ApparelCategory;
  sizes: string[];
  status: ApparelStatus;
  featured: boolean;
  dropDate?: string; // ISO date string for upcoming drops
}

export interface UpcomingDrop {
  name: string;
  description: string;
  dropDate: string; // ISO date string
  items: string[]; // Array of ApparelItem IDs
}
