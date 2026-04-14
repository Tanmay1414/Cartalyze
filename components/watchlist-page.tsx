'use client';

import { Heart, Trash2, TrendingDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface WatchlistItem {
  id: string;
  name: string;
  image: string;
  currentPrice: number;
  lastTrackedPrice: number;
  priceChange: number;
  recommendation: 'GOOD DEAL' | 'WAIT' | 'FAIR PRICE';
  lastUpdated: string;
  platform: string;
}

const mockWatchlist: WatchlistItem[] = [
  {
    id: '1',
    name: 'Apple iPhone 15 Pro',
    image: '📱',
    currentPrice: 129999,
    lastTrackedPrice: 131000,
    priceChange: -1001,
    recommendation: 'GOOD DEAL',
    lastUpdated: '2 hours ago',
    platform: 'Amazon',
  },
  {
    id: '2',
    name: 'Dell XPS 13 Laptop',
    image: '💻',
    currentPrice: 87500,
    lastTrackedPrice: 89999,
    priceChange: -2499,
    recommendation: 'GOOD DEAL',
    lastUpdated: '5 hours ago',
    platform: 'Flipkart',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Headphones',
    image: '🎧',
    currentPrice: 24990,
    lastTrackedPrice: 24990,
    priceChange: 0,
    recommendation: 'FAIR PRICE',
    lastUpdated: '1 day ago',
    platform: 'Amazon',
  },
];

export function WatchlistPage() {
  const [watchlist, setWatchlist] = useState(mockWatchlist);

  const removeItem = (id: string) => {
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  const isPriceDown = (item: WatchlistItem) => item.priceChange < 0;
  const getPriceChangeColor = (item: WatchlistItem) => {
    if (item.priceChange < 0) return 'text-green-600';
    if (item.priceChange > 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getRecommendationBg = (recommendation: string) => {
    switch (recommendation) {
      case 'GOOD DEAL':
        return 'bg-green-100 text-green-700';
      case 'WAIT':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-8 h-8 fill-primary text-primary" />
            Your Watchlist
          </h1>
          <p className="text-muted-foreground">
            Track price changes for products you love
          </p>
        </div>

        {/* Watchlist Items */}
        {watchlist.length > 0 ? (
          <div className="space-y-4">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Product Image & Name */}
                  <div className="md:col-span-4 flex items-start gap-4">
                    <div className="text-5xl">{item.image}</div>
                    <div>
                      <Link
                        href={`/product/${item.id}`}
                        className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {item.platform} • {item.lastUpdated}
                      </p>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="md:col-span-3">
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                        <p className="text-2xl font-bold text-primary">
                          ₹{item.currentPrice.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Last Tracked</p>
                        <p className="text-sm text-muted-foreground">
                          ₹{item.lastTrackedPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Change */}
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-2">
                      {isPriceDown(item) && (
                        <TrendingDown className="w-5 h-5 text-green-600" />
                      )}
                      <div>
                        <p className="text-xs text-muted-foreground">Price Change</p>
                        <p className={`text-lg font-semibold ${getPriceChangeColor(item)}`}>
                          {item.priceChange < 0 ? '-' : '+'}₹
                          {Math.abs(item.priceChange).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendation & Actions */}
                  <div className="md:col-span-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-center ${getRecommendationBg(
                        item.recommendation
                      )}`}
                    >
                      {item.recommendation}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      title="Remove from watchlist"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No products in your watchlist yet
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start comparing products and add them to your watchlist to track price changes
            </p>
            <Link
              href="/compare"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Exploring
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
