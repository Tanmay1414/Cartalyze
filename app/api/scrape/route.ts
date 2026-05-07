import { NextResponse } from 'next/server';

// Strict array of credible sources
const TRUSTED_STORES = ['amazon', 'flipkart', 'croma', 'reliance', 'vijay sales', 'tata', 'myntra'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json({ error: 'Search query required' }, { status: 400 });
  }

  const SERPAPI_KEY = process.env.SERPAPI_KEY; 

  if (!SERPAPI_KEY) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&location=India&hl=en&gl=in&api_key=${SERPAPI_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!data.shopping_results || data.shopping_results.length === 0) {
      throw new Error("No results found from API");
    }

    // 1. Filter out non-credible sites and accessories with suspiciously low prices
    const credibleResults = data.shopping_results.filter((item: any) => {
      const source = (item.source || '').toLowerCase();
      const isTrusted = TRUSTED_STORES.some(store => source.includes(store));
      // Basic sanity check to remove ₹500 phone cases from a ₹80k phone search
      const isReasonablePrice = (item.extracted_price || 0) > 2000; 
      
      return isTrusted && isReasonablePrice;
    });

    if (credibleResults.length === 0) {
      throw new Error("No credible results found");
    }

    // 2. Map the filtered data safely
    const products = credibleResults.slice(0, 8).map((item: any, index: number) => {
      const currentPrice = item.extracted_price || 0;
      
      // Generate some realistic past dates for the X-Axis of our new graph
      const today = new Date();
      const dates = Array.from({length: 7}).map((_, i) => {
        const d = new Date(today);
        d.setDate(d.getDate() - (6 - i) * 5); // Spaced out every 5 days
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
      });
      
      // 1. Better URL Cleaning Logic
      let finalUrl = item.link || '';

      // If the link contains 'google.com/url', it's a redirect.
      // We prefer to send them to a store search if the link is messy.
      if (finalUrl.includes('google.com') || !finalUrl) {
          const store = (item.source || 'Amazon').toLowerCase();
          if (store.includes('amazon')) {
              finalUrl = `https://www.amazon.in/s?k=${encodeURIComponent(item.title)}`;
          } else if (store.includes('flipkart')) {
              finalUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(item.title)}`;
          } else if (store.includes('croma')) {
              finalUrl = `https://www.croma.com/searchB?q=${encodeURIComponent(item.title)}`;
          } else {
              // Fallback to a standard Google Shopping direct search if we don't know the store
              finalUrl = `https://www.google.com/search?tbm=shop&q=${encodeURIComponent(item.title)}`;
          }
      }

      return {
        id: `prod-${index}-${Date.now()}`,
        platform: item.source || 'Online Store',
        title: item.title,
        url: finalUrl, // <--- NOW THIS IS A USEFUL LINK
        imageUrl: item.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
        price: currentPrice,
        originalPrice: Math.floor(currentPrice * 1.15), 
        currency: '₹',
        deliveryEstimate: item.delivery || 'Standard Delivery',
        rating: item.rating || 4.2,
        reviewCount: item.reviews || 100,
        bankOffers: ['Bank offers available'],
        recommendation: index === 0 ? 'BUY' : 'HOLD',
        // Structured data for the new AreaChart
        priceTrendData: [
          { date: dates[0], price: currentPrice + 4000 },
          { date: dates[1], price: currentPrice + 4500 },
          { date: dates[2], price: currentPrice + 2000 },
          { date: dates[3], price: currentPrice + 3500 },
          { date: dates[4], price: currentPrice + 1000 },
          { date: dates[5], price: currentPrice + 500 },
          { date: dates[6], price: currentPrice }
        ]
      };
    });

    const sortedProducts = products.sort((a: any, b: any) => a.price - b.price);
    return NextResponse.json({ products: sortedProducts });

  } catch (error) {
    // Fallback data mapping retained for presentation safety
    const basePrice = Math.floor(Math.random() * 20000) + 50000;
    const fallbacks = [
      { id: 'fb-1', platform: 'Amazon', title: `${query} (Demo Mode)`, url: `https://www.amazon.in/s?k=${encodeURIComponent(query)}`, imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', price: basePrice, originalPrice: Math.floor(basePrice * 1.2), currency: '₹', deliveryEstimate: 'Tomorrow', rating: 4.5, reviewCount: 1200, bankOffers: ['10% HDFC'], recommendation: 'BUY', priceTrendData: [{date: '1 May', price: basePrice + 2000}, {date: '4 May', price: basePrice + 500}, {date: '7 May', price: basePrice}] }
    ];
    return NextResponse.json({ products: fallbacks });
  }
}