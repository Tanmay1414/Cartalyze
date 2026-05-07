'use client';

import Link from 'next/link';
import { Menu, Moon, Search, Sun, User, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation'; // <-- Added for routing

export function Navbar() {
  const { isSignedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // <-- Added search state and router
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Check initial theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains('dark')) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  // <-- Added search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/compare?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false); // Close mobile menu after searching
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
            <img src="/cartalyze-logo.jpg" alt="Cartalyze" className="w-8 h-8 rounded-lg object-cover" />
            <span className="text-foreground hidden sm:block">Cartalyze</span>
          </Link>

          {/* Desktop Search Bar (New) */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="Search products to compare..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
          </form>

          {/* Desktop Navigation & Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden lg:block">
              How it Works
            </Link>
            <Link href="/watchlist" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Watchlist
            </Link>

            <div className="flex items-center gap-4 border-l border-border pl-4 ml-2">
              {mounted && (
                <button 
                  onClick={toggleTheme}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="w-5 h-5 text-muted-foreground" /> : <Moon className="w-5 h-5 text-muted-foreground" />}
                </button>
              )}
              
              {/* CLERK v7 AUTHENTICATION UI */}
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              )}

            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            {mounted && (
                <button onClick={toggleTheme} className="p-2 hover:bg-secondary rounded-lg">
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            )}
            <button
              className="p-2 hover:bg-secondary rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-border">
            <div className="flex flex-col gap-4 pt-4">
              {/* Mobile Search Form */}
              <form onSubmit={handleSearch} className="relative px-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="w-4 h-4 text-muted-foreground absolute left-5 top-1/2 -translate-y-1/2" />
              </form>

              <Link href="/how-it-works" className="px-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
                How it Works
              </Link>
              <Link href="/watchlist" className="px-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
                Watchlist
              </Link>
              <Link href="/signin" className="px-2 text-sm text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}