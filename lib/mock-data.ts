import { Product } from '@/types/product';

export function getMockProducts(query: string): Product[] {
  // Simulating a backend delay
  const decodedQuery = decodeURIComponent(query);
  
  return [
    {
      id: 'amz-1',
      platform: 'Amazon',
      title: `Apple ${decodedQuery} - Midnight`,
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      price: 65999,
      originalPrice: 79900,
      currency: '₹',
      deliveryEstimate: 'Tomorrow by 10 PM',
      rating: 4.6,
      reviewCount: 12453,
      bankOffers: ['10% off on HDFC Credit Cards', '5% Cashback on Amazon Pay ICICI'],
      recommendation: 'BUY',
      priceTrendData: [79900, 75000, 72000, 68000, 65999],
    },
    {
      id: 'flp-1',
      platform: 'Flipkart',
      title: `Apple ${decodedQuery} - Starlight`,
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      price: 66499,
      originalPrice: 79900,
      currency: '₹',
      deliveryEstimate: 'In 2 Days',
      rating: 4.5,
      reviewCount: 8932,
      bankOffers: ['₹2000 off on SBI Credit Cards'],
      recommendation: 'HOLD', // More expensive than Amazon
      priceTrendData: [79900, 76000, 74000, 69000, 66499],
    },
    {
      id: 'crm-1',
      platform: 'Croma',
      title: `Apple ${decodedQuery} - Space Grey`,
      url: '#',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      price: 68000,
      originalPrice: 79900,
      currency: '₹',
      deliveryEstimate: 'Next Week',
      rating: 4.8,
      reviewCount: 102,
      bankOffers: ['No Cost EMI up to 6 months'],
      recommendation: 'HOLD',
      priceTrendData: [79900, 79900, 75000, 70000, 68000],
    }
  ];
}
