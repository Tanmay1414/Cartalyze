import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ComparePage } from '@/components/compare-page';

export const metadata = {
  title: 'Compare Products - Cartalyze',
  description: 'Compare prices across multiple e-commerce platforms with AI-driven insights',
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <ComparePage />
      </main>
      <Footer />
    </div>
  );
}
