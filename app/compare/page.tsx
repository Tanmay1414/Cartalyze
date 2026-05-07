import { Navbar } from "@/components/navbar";
import { ComparePage } from "@/components/compare-page";

export default async function CompareRoute({
  searchParams,
}: {
  // Update the type to expect a Promise (Next.js 16 standard)
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // AWAIT the search parameters before trying to read the 'q' value!
  const params = await searchParams;
  const query = typeof params.q === 'string' ? params.q : "";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Pass the extracted query down to your UI component */}
        <ComparePage initialQuery={query} />
      </main>
    </div>
  );
}
