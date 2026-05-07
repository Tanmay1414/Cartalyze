export type Platform = 'Amazon' | 'Flipkart' | 'Myntra' | 'Croma';

export interface Product {
  id: string;
  platform: Platform;
  title: string;
  url: string; // The affiliate or direct link
  imageUrl: string;
  price: number;
  originalPrice: number;
  currency: string;
  deliveryEstimate: string;
  rating: number;
  reviewCount: number;
  bankOffers: string[];
  recommendation: 'BUY' | 'HOLD';
  priceTrendData: number[]; // For the future graph feature
}
