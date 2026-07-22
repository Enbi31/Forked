import { useState } from 'react';
import HeroSection from '@/components/landing/herosection';
import FilterBar from '@/components/fork/filter-bar';
import ComparisonGrid from '@/components/fork/comparison-grid';
import SelectionModal from '@/components/fork/selection-modal';
import type { Product } from '@/lib/fork-data';

export default function ForkApp() {
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({
    price: [],
    utility: [],
    feature: [],
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearch = () => {
    setSearched(true);
  };

  const handleFilterChange = (group: string, values: string[]) => {
    setFilters((prev) => ({ ...prev, [group]: values }));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-zinc-950 to-zinc-950">
      <HeroSection onSearch={handleSearch} />

      {searched && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <FilterBar filters={filters} onFilterChange={handleFilterChange} />
          <ComparisonGrid filters={filters} onSelect={setSelectedProduct} />
        </section>
      )}

      <SelectionModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
