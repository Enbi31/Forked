import { useState } from 'react';
import HeroSection from '@/components/landing/herosection';
import FilterBar from '@/components/fork/filter-bar';
import ComparisonGrid from '@/components/fork/comparison-grid';
import SelectionModal from '@/components/fork/selection-modal';
import type { Product } from '@/lib/fork-data';

export default function ForkApp() {
  const [searched, setSearched] = useState(false);
  const [filters, setFilters] = useState<Record<string, string[]>>({ price: [], utility: [], feature: [] });
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-950 via-zinc-950 to-zinc-950">
      <HeroSection onSearch={() => setSearched(true)} />

      {searched && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <FilterBar
            filters={filters}
            onFilterChange={(group, values) => setFilters((p) => ({ ...p, [group]: values }))}
          />
          <ComparisonGrid filters={filters} onSelect={setSelected} />
        </section>
      )}

      <SelectionModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
