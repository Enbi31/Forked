import ProductCard from './product-card';
import { dummyProducts, tierFilterMap, type Product } from '@/lib/fork-data';

export default function ComparisonGrid({ filters, onSelect }: {
  filters: Record<string, string[]>;
  onSelect: (product: Product) => void;
}) {
  const active = [...(filters.price || []), ...(filters.utility || []), ...(filters.feature || [])];

  const opacity = (p: Product) => {
    if (!active.length) return 'opacity-100';
    const m = tierFilterMap[p.tier];
    return active.some((f) => f === m.price || f === m.utility || f === m.feature)
      ? 'opacity-100' : 'opacity-40';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {dummyProducts.map((p, i) => (
        <div key={p.id} className={opacity(p)}>
          <ProductCard product={p} index={i} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
