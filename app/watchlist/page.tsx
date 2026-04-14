import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { WatchlistPage } from '@/components/watchlist-page';

export const metadata = {
  title: 'Watchlist - Cartalyze',
  description: 'Track price changes for products you love',
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <WatchlistPage />
      </main>
      <Footer />
    </div>
  );
}
