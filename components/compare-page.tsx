"use client";

import { useEffect, useState, useMemo } from "react";
import { Product } from "@/types/product";
import { CheckCircle2, TrendingDown, Star, BookmarkCheck, BookmarkPlus, ExternalLink, Filter } from "lucide-react";
import { PriceChart } from "@/components/ui/price-chart";
import { useAuth } from "@clerk/nextjs";

export function ComparePage({ initialQuery }: { initialQuery: string }) {
  const { isSignedIn } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [watchlist, setWatchlist] = useState<Product[]>([]);
  
  // BRAND FILTER STATE
  const [selectedBrand, setSelectedBrand] = useState<string>("All");

  useEffect(() => {
    const loadWatchlist = () => {
      const saved = localStorage.getItem('cartalyze_watchlist');
      if (saved) setWatchlist(JSON.parse(saved));
    };
    loadWatchlist();
    window.addEventListener('storage', loadWatchlist);
    return () => window.removeEventListener('storage', loadWatchlist);
  }, []);

  // Generate unique brands from the results
  const availableBrands = useMemo(() => {
    const brands = new Set<string>(["All"]);
    products.forEach(p => {
      // Logic: Extract the first word of the title as a rough brand name
      const brand = p.title.split(' ')[0];
      if (brand && brand.length > 2) brands.add(brand);
    });
    return Array.from(brands);
  }, [products]);

  // Filter products based on selected brand
  const filteredProducts = useMemo(() => {
    if (selectedBrand === "All") return products;
    return products.filter(p => p.title.toLowerCase().includes(selectedBrand.toLowerCase()));
  }, [products, selectedBrand]);

  useEffect(() => {
    async function fetchProducts() {
      if (!initialQuery) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/scrape?q=${encodeURIComponent(initialQuery)}`);
        const data = await response.json();
        if (data.products) setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch");
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [initialQuery]);

  const toggleWatchlist = (product: Product) => {
    setWatchlist(prev => {
      const isSaved = prev.some(p => p.id === product.id);
      const newWatchlist = isSaved ? prev.filter(p => p.id !== product.id) : [...prev, product];
      localStorage.setItem('cartalyze_watchlist', JSON.stringify(newWatchlist));
      window.dispatchEvent(new Event('storage'));
      return newWatchlist;
    });
  };

  if (!initialQuery) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Comparing: <span className="text-primary">&quot;{initialQuery}&quot;</span></h1>
          <p className="text-muted-foreground mt-1">Found {filteredProducts.length} results from credible stores.</p>
        </div>

        {/* BRAND FILTER UI */}
        {!loading && availableBrands.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
            {availableBrands.slice(0, 6).map(brand => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedBrand === brand 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : 'bg-background border-border text-muted-foreground hover:border-primary'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => <div key={i} className="h-[600px] bg-secondary/20 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => {
            const isWatchlisted = watchlist.some(p => p.id === product.id);
            
            return (
              <div key={product.id} className={`flex flex-col bg-card border rounded-2xl overflow-hidden transition-all hover:shadow-xl ${index === 0 ? 'ring-2 ring-primary border-transparent' : 'border-border'}`}>
                <div className="relative h-48 bg-white p-6 flex items-center justify-center border-b">
                  <div className="absolute top-4 left-4 px-2 py-1 bg-black text-white text-[10px] font-black rounded uppercase tracking-wider">{product.platform}</div>
                  {index === 0 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-green-500 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg animate-bounce">
                      <TrendingDown className="w-3 h-3" /> BEST PRICE
                    </div>
                  )}
                  <img src={product.imageUrl} alt={product.title} className="max-h-full object-contain" />
                </div>

                <div className="p-6 flex flex-col flex-1 gap-4">
                  <h3 className="font-bold text-base line-clamp-2 leading-snug">{product.title}</h3>
                  
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-foreground">₹{product.price.toLocaleString('en-IN')}</span>
                    <span className="text-sm text-muted-foreground line-through opacity-50">₹{product.originalPrice.toLocaleString('en-IN')}</span>
                  </div>

                  <PriceChart data={product.priceTrendData} />

                  <div className="mt-auto pt-6 flex items-center gap-3">
                    <button 
                      onClick={() => toggleWatchlist(product)}
                      className={`p-3 rounded-xl border transition-all ${
                        isWatchlisted ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary border-border text-muted-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {isWatchlisted ? <BookmarkCheck className="w-6 h-6" /> : <BookmarkPlus className="w-6 h-6" />}
                    </button>
                    
                    <a 
                      href={product.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white dark:bg-white dark:text-black rounded-xl text-sm font-black hover:opacity-90 transition-opacity"
                    >
                      BUY NOW <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
