import ProductCard from './product-card';
import { dummyProducts, tierFilterMap, type Product } from '@/lib/fork-data';

interface ComparisonGridProps {
  filters: Record<string, string[]>;
  onSelect: (product: Product) => void;
}

export default function ComparisonGrid({ filters, onSelect }: ComparisonGridProps) {
  const activeFilters = [
    ...(filters.price || []),
    ...(filters.utility || []),
    ...(filters.feature || []),
  ];

  const getOpacity = (product: Product) => {
    if (activeFilters.length === 0) return 'opacity-100';
    const map = tierFilterMap[product.tier];
    const matches = activeFilters.some(
      (f) => f === map.price || f === map.utility || f === map.feature,
    );
    return matches ? 'opacity-100' : 'opacity-40';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {dummyProducts.map((product, i) => (
        <div key={product.id} className={getOpacity(product)}>
          <ProductCard product={product} index={i} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
