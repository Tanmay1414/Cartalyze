import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductDetailPage } from '@/components/product-detail-page';

export const metadata = {
  title: 'Product Details - Cartalyze',
  description: 'View detailed product comparison and seller information',
};

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <ProductDetailPage productId={params.id} />
      </main>
      <Footer />
    </div>
  );
}
