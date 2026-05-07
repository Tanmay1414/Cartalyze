'use client';

import { Heart, Trash2, TrendingDown, TrendingUp, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
// Import your Product type
import { Product } from '@/types/product'; 

export function WatchlistPage() {
  // 1. Change state to accept our real Product type
  const [watchlist, setWatchlist] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  // 2. Load the dynamic data from local storage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('cartalyze_watchlist');
    if (saved) {
      setWatchlist(JSON.parse(saved));
    }
  }, []);

  // 3. Dynamic remove function
  const removeItem = (id: string) => {
    const updated = watchlist.filter((item) => item.id !== id);
    setWatchlist(updated);
    localStorage.setItem('cartalyze_watchlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage')); // Keeps other tabs in sync
  };

  // Helper functions for dynamic math
  const getPriceChange = (item: Product) => item.price - item.originalPrice;
  const isPriceDown = (item: Product) => getPriceChange(item) < 0;

  const getPriceChangeColor = (item: Product) => {
    const change = getPriceChange(item);
    if (change < 0) return 'text-green-600';
    if (change > 0) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getRecommendationBg = (recommendation: string) => {
    if (recommendation === 'BUY') return 'bg-green-100 text-green-700';
    if (recommendation === 'HOLD') return 'bg-orange-100 text-orange-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  // Prevent hydration mismatch errors
  if (!mounted) return null;

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
            {watchlist.map((item) => {
              const priceChange = getPriceChange(item);
              
              return (
                <div
                  key={item.id}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Product Image & Name */}
                    <div className="md:col-span-4 flex items-start gap-4">
                      <div className="w-16 h-16 shrink-0 bg-white p-1 rounded-md border flex items-center justify-center">
                         <img src={item.imageUrl} alt={item.title} className="max-h-full object-contain" />
                      </div>
                      <div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.title}
                        </a>
                        <p className="text-xs text-muted-foreground mt-1 font-medium px-2 py-0.5 bg-secondary inline-block rounded">
                          {item.platform}
                        </p>
                      </div>
                    </div>

                    {/* Price Info */}
                    <div className="md:col-span-3">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Current Price</p>
                          <p className="text-xl md:text-2xl font-bold text-primary">
                            {item.currency || '₹'}{(item.price || 0).toLocaleString('en-IN')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Original Tracked</p>
                          <p className="text-sm text-muted-foreground line-through">
                            {item.currency || '₹'}{(item.originalPrice || 0).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Price Change */}
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-2">
                        {isPriceDown(item) ? (
                          <TrendingDown className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-red-600" />
                        )}
                        <div>
                          <p className="text-xs text-muted-foreground">Price Change</p>
                          <p className={`text-lg font-semibold ${getPriceChangeColor(item)}`}>
                            {priceChange < 0 ? '-' : '+'}₹
                            {Math.abs(priceChange).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Recommendation & Actions */}
                    <div className="md:col-span-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold text-center ${getRecommendationBg(
                          item.recommendation
                        )}`}
                      >
                        {item.recommendation === 'BUY' ? 'GOOD DEAL' : 'WAIT'}
                      </span>
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-80 rounded-lg transition-opacity flex items-center justify-center"
                        title="Buy Now"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors flex items-center justify-center border border-transparent hover:border-destructive/20"
                        title="Remove from watchlist"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-card border rounded-2xl">
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
