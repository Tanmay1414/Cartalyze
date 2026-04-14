import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { LandingPage } from '@/components/landing-page';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
    </div>
  );
}
