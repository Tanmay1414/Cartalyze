'use client';

import Link from 'next/link';
import { TrendingUp, BarChart3, Shield, ChevronRight, Search, Package, ShoppingBag, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';

const platforms = [
  { name: 'Amazon', icon: Package, logo: '/logos/amazon.jpg' },
  { name: 'Flipkart', icon: ShoppingBag, logo: '/logos/flipkart.jpg' },
  { name: 'Myntra', icon: ShoppingBag, logo: '/logos/myntra.jpg' },
  { name: 'Ajio', icon: ShoppingBag, logo: '/logos/ajio.jpg' },
  { name: 'Blinkit', icon: Zap, logo: null },
  { name: 'Zepto', icon: Zap, logo: null },
  { name: 'Nykaa', icon: Sparkles, logo: null },
  { name: 'Tata Cliq', icon: ShoppingBag, logo: null },
];

const suggestions = [
  'iPhone 15 Pro',
  'Laptop Dell XPS',
  'Running Shoes Nike',
];

export function LandingPage() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Intelligent buying decisions.
            <span className="block text-primary">Backed by real analysis.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Compare products across multiple e-commerce platforms, get AI-powered recommendations based on price trends, seller trust scores, and delivery analysis.
          </p>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setSelectedSuggestion(suggestion)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSuggestion === suggestion
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground border border-border hover:border-primary'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
          >
            Start Comparing
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-20 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            Unified price intelligence
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Compare across all major e-commerce platforms in India
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {platforms.map((platform: any) => (
              <div
                key={platform.name}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-card border border-border hover:border-primary transition-all hover:shadow-md"
              >
                <div className="w-12 h-12 mb-3 flex items-center justify-center">
                  {platform.logo ? (
                    <img 
                      src={platform.logo} 
                      alt={platform.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                  ) : (
                    <platform.icon className="w-8 h-8 text-primary" />
                  )}
                </div>
                <h3 className="font-semibold text-foreground">{platform.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
            How it works
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Three powerful features to help you make smarter buying decisions
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Product Matching
              </h3>
              <p className="text-muted-foreground">
                AI-powered matching to find the same product across different platforms with 99.9% accuracy.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Price & Trend Analysis
              </h3>
              <p className="text-muted-foreground">
                Track price movements over time and get notified when prices drop for products you love.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Trust Scoring
              </h3>
              <p className="text-muted-foreground">
                Seller ratings, delivery reliability, and return policies analyzed to ensure safe purchases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Stop comparing manually
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">
            Let our AI do the heavy lifting. Get the best deals in seconds.
          </p>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground text-primary rounded-full font-semibold hover:bg-primary-foreground/90 transition-colors"
          >
            Start Comparing Now
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
