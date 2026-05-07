import { Navbar } from '@/components/navbar';
import { Search, Server, LineChart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    {
      title: "1. Smart Searching",
      description: "When you search for a product, our engine standardizes your query and prepares to fetch live data across the Indian e-commerce landscape.",
      icon: <Search className="w-8 h-8 text-blue-500" />
    },
    {
      title: "2. Concurrent Aggregation",
      description: "Our backend simultaneously connects to Amazon, Flipkart, Croma, and other trusted stores using advanced APIs to retrieve live prices and offers without waiting.",
      icon: <Server className="w-8 h-8 text-purple-500" />
    },
    {
      title: "3. Data Normalization",
      description: "The raw, messy data from different platforms is cleaned, sorted by price, and analyzed to generate a 30-day price trend history and Buy/Hold recommendations.",
      icon: <LineChart className="w-8 h-8 text-green-500" />
    },
    {
      title: "4. Direct Checkout",
      description: "We provide direct, verified links to the original product pages so you can complete your purchase securely on the merchant's platform.",
      icon: <ShoppingBag className="w-8 h-8 text-orange-500" />
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex-1 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            How <span className="text-primary">Cartalyze</span> Works
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The technical architecture behind our lightning-fast price aggregation engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="bg-card border rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="bg-secondary/50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10">
          <h2 className="text-2xl font-bold mb-4">Ready to test the engine?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Experience the power of concurrent data aggregation live. Search for any tech product, appliance, or accessory.
          </p>
          <Link href="/compare" className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2">
            Try it now <Search className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
