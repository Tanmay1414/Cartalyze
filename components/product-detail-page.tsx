'use client';

import { Heart, ShoppingCart, TrendingUp, Star, Zap, Truck, Shield, CreditCard, Smartphone } from 'lucide-react';
import { useState } from 'react';

interface ProductDetailPageProps {
  productId: string;
}

const mockProductDetails = {
  id: '1',
  name: 'Apple iPhone 15 Pro',
  image: '📱',
  bestSeller: {
    platform: 'Amazon',
    price: 129999,
  },
  recommendation: 'RECOMMENDED',
  priceHistory: [
    { date: 'Jan 1', price: 135000 },
    { date: 'Jan 8', price: 133000 },
    { date: 'Jan 15', price: 131000 },
    { date: 'Jan 22', price: 129999 },
    { date: 'Jan 29', price: 130500 },
  ],
  sellers: [
    {
      platform: 'Amazon',
      logo: '/logos/amazon.jpg',
      price: 129999,
      delivery: '1-2 days',
      rating: 4.8,
      aiScore: 95,
      reviews: 12450,
    },
    {
      platform: 'Flipkart',
      logo: '/logos/flipkart.jpg',
      price: 128500,
      delivery: '2-3 days',
      rating: 4.6,
      aiScore: 92,
      reviews: 8920,
    },
    {
      platform: 'Myntra',
      logo: '/logos/myntra.jpg',
      price: 130500,
      delivery: '3-5 days',
      rating: 4.4,
      aiScore: 88,
      reviews: 3450,
    },
  ],
  breakdown: {
    priceScore: 85,
    deliveryScore: 92,
    ratingScore: 90,
    trustScore: 88,
  },
  bankOffers: [
    {
      bank: 'HDFC Bank',
      offer: '5% cashback',
      maxDiscount: '₹6,500',
      validity: 'Till Mar 31',
      category: 'bank',
    },
    {
      bank: 'ICICI Bank',
      offer: '₹2,000 off on EMI',
      maxDiscount: '₹2,000',
      validity: 'Till Apr 15',
      category: 'bank',
    },
    {
      bank: 'Axis Bank',
      offer: 'No Cost EMI',
      maxDiscount: 'Full amount',
      validity: 'Till Apr 30',
      category: 'bank',
    },
  ],
  upiOffers: [
    {
      platform: 'Google Pay',
      offer: '₹1,000 cashback',
      maxDiscount: '₹1,000',
      validity: 'Till Mar 31',
      category: 'upi',
    },
    {
      platform: 'PhonePe',
      offer: '2% cashback',
      maxDiscount: '₹2,600',
      validity: 'Till Apr 10',
      category: 'upi',
    },
    {
      platform: 'PayTM',
      offer: '₹500 off',
      maxDiscount: '₹500',
      validity: 'Till Apr 20',
      category: 'upi',
    },
  ],
  lastTracked: 'Updated 2 hours ago',
};

export function ProductDetailPage({ productId }: ProductDetailPageProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-7xl">{mockProductDetails.image}</div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {mockProductDetails.name}
                </h1>
              </div>
            </div>

            {/* Best Seller Box */}
            <div className="bg-primary/10 border-l-4 border-primary rounded-lg p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Best Deal Available</p>
              <h2 className="text-3xl font-bold text-primary mb-2">
                ₹{mockProductDetails.bestSeller.price.toLocaleString()}
              </h2>
              <p className="text-sm text-muted-foreground">
                on {mockProductDetails.bestSeller.platform}
              </p>
            </div>

            {/* Recommendation Badge */}
            <div className="inline-block mb-8">
              <span className="px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                ✓ {mockProductDetails.recommendation}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Buy Now
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'bg-primary/20 text-primary'
                    : 'bg-secondary border border-border hover:border-primary'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                Watchlist
              </button>
            </div>
          </div>

          {/* Right Section - Price Trend Chart */}
          <div>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Price Trend (Last 30 Days)</h3>
              </div>

              {/* Simple Chart Representation */}
              <div className="space-y-4">
                <div className="flex items-end gap-2 h-40">
                  {mockProductDetails.priceHistory.map((point, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-primary rounded-t-lg transition-all hover:bg-primary/80"
                        style={{
                          height: `${(point.price / 135000) * 100}%`,
                          minHeight: '4px',
                        }}
                        title={`${point.date}: ₹${point.price}`}
                      />
                      <p className="text-xs text-muted-foreground mt-2">{point.date}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Current price is 3.7% lower than 30 days ago
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bank & UPI Offers Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Available Offers</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bank Offers */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">Bank Offers</h3>
              </div>
              <div className="space-y-3">
                {mockProductDetails.bankOffers.map((offer, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{offer.bank}</p>
                        <p className="text-sm text-primary font-medium">{offer.offer}</p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {offer.validity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Max discount: {offer.maxDiscount}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* UPI Offers */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">UPI & Digital Wallet</h3>
              </div>
              <div className="space-y-3">
                {mockProductDetails.upiOffers.map((offer, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-foreground">{offer.platform}</p>
                        <p className="text-sm text-primary font-medium">{offer.offer}</p>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {offer.validity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Max discount: {offer.maxDiscount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Seller Comparison Table */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Seller Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Platform</th>
                  <th className="text-right py-4 px-4 font-semibold text-foreground">Price</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Delivery</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Rating</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">AI Score</th>
                </tr>
              </thead>
              <tbody>
                {mockProductDetails.sellers.map((seller: any, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-secondary transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {seller.logo && (
                          <img 
                            src={seller.logo} 
                            alt={seller.platform}
                            className="w-6 h-6 rounded object-cover"
                          />
                        )}
                        <span className="font-semibold text-foreground">{seller.platform}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4">
                      <span className="text-lg font-bold text-primary">
                        ₹{seller.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4 text-sm text-foreground">
                      {seller.delivery}
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-sm font-semibold text-foreground">
                        ⭐ {seller.rating}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4">
                      <span className="text-sm font-bold text-primary">{seller.aiScore}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Explanation Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">Why We Recommend This</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Price Score</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {mockProductDetails.breakdown.priceScore}%
              </div>
              <p className="text-sm text-muted-foreground">Better than 85% of listings</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Delivery Score</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {mockProductDetails.breakdown.deliveryScore}%
              </div>
              <p className="text-sm text-muted-foreground">Fast & reliable shipping</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Rating Score</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {mockProductDetails.breakdown.ratingScore}%
              </div>
              <p className="text-sm text-muted-foreground">Highly rated seller</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">Trust Score</h3>
              </div>
              <div className="text-3xl font-bold text-primary mb-2">
                {mockProductDetails.breakdown.trustScore}%
              </div>
              <p className="text-sm text-muted-foreground">Verified & secure</p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center py-6 border-t border-border">
          <p className="text-sm text-muted-foreground">{mockProductDetails.lastTracked}</p>
        </div>
      </div>
    </div>
  );
}
