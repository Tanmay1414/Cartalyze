'use client';

import { Search, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface Seller {
  id: string;
  platform: string;
  logo?: string;
  price: number;
  delivery: string;
  rating: number;
  aiScore: number;
  tag: 'Recommended' | 'Best Price' | 'Fastest Delivery' | null;
}

interface Product {
  id: string;
  name: string;
  sellers: Seller[];
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Apple iPhone 15 Pro',
    sellers: [
      {
        id: '1-1',
        platform: 'Amazon',
        logo: '/logos/amazon.jpg',
        price: 129999,
        delivery: '1-2 days',
        rating: 4.8,
        aiScore: 95,
        tag: 'Recommended',
      },
      {
        id: '1-2',
        platform: 'Flipkart',
        logo: '/logos/flipkart.jpg',
        price: 128500,
        delivery: '2-3 days',
        rating: 4.6,
        aiScore: 92,
        tag: 'Best Price',
      },
      {
        id: '1-3',
        platform: 'Myntra',
        logo: '/logos/myntra.jpg',
        price: 130500,
        delivery: '3-5 days',
        rating: 4.4,
        aiScore: 88,
        tag: null,
      },
    ],
  },
  {
    id: '2',
    name: 'Dell XPS 13 Laptop',
    sellers: [
      {
        id: '2-1',
        platform: 'Amazon',
        logo: '/logos/amazon.jpg',
        price: 89999,
        delivery: '2-3 days',
        rating: 4.7,
        aiScore: 94,
        tag: 'Recommended',
      },
      {
        id: '2-2',
        platform: 'Flipkart',
        logo: '/logos/flipkart.jpg',
        price: 87500,
        delivery: '1-2 days',
        rating: 4.8,
        aiScore: 96,
        tag: 'Best Price',
      },
      {
        id: '2-3',
        platform: 'Ajio',
        logo: '/logos/ajio.jpg',
        price: 91200,
        delivery: '4-7 days',
        rating: 4.2,
        aiScore: 85,
        tag: null,
      },
    ],
  },
];

export function ComparePage() {
  const [searchValue, setSearchValue] = useState('');
  const [sortBy, setSortBy] = useState<'price' | 'score'>('score');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Compare Products
          </h1>
          <p className="text-muted-foreground">
            Search any product to compare prices across all platforms
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        {/* Sort Toggle */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('price')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'price'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground border border-border hover:border-primary'
              }`}
            >
              <ArrowUpDown className="w-4 h-4 inline mr-2" />
              Price
            </button>
            <button
              onClick={() => setSortBy('score')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                sortBy === 'score'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-foreground border border-border hover:border-primary'
              }`}
            >
              <ArrowUpDown className="w-4 h-4 inline mr-2" />
              AI Score
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="space-y-8">
          {mockProducts.map((product) => (
            <div key={product.id} className="border border-border rounded-lg overflow-hidden bg-card hover:shadow-md transition-shadow">
              {/* Product Title */}
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">{product.name}</h2>
              </div>

              {/* Sellers Grid */}
              <div className="overflow-x-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                  {product.sellers.map((seller) => (
                    <div
                      key={seller.id}
                      className="border border-border rounded-lg p-4 hover:border-primary transition-colors"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          {seller.logo && (
                            <img 
                              src={seller.logo} 
                              alt={seller.platform}
                              className="w-8 h-8 rounded object-cover"
                            />
                          )}
                          <h3 className="font-semibold text-foreground">{seller.platform}</h3>
                        </div>
                        {seller.tag && (
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              seller.tag === 'Recommended'
                                ? 'bg-primary/10 text-primary'
                                : seller.tag === 'Best Price'
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {seller.tag}
                          </span>
                        )}
                      </div>

                      <div className="space-y-3 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Price</p>
                          <p className="text-2xl font-bold text-primary">
                            ₹{seller.price.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Delivery</p>
                          <p className="text-sm font-medium text-foreground">{seller.delivery}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Rating</p>
                            <p className="text-sm font-semibold text-foreground">
                              ⭐ {seller.rating}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">AI Score</p>
                            <p className="text-sm font-semibold text-primary">{seller.aiScore}%</p>
                          </div>
                        </div>
                      </div>

                      <Link
                        href={`/product/${product.id}`}
                        className="w-full px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-border transition-colors text-sm font-medium text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
