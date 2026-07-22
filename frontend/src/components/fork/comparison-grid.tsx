import { motion } from 'framer-motion';
import ProductCard from './product-card';
import { tierFilterMap, type Product } from '@/lib/fork-data';

export default function ComparisonGrid({ products, filters, onSelect }: {
  products: Product[];
  filters: Record<string, string[]>;
  onSelect: (product: Product) => void;
}) {
  const active = [...(filters.price || []), ...(filters.utility || []), ...(filters.feature || [])];

  const score = (p: Product) => {
    if (!active.length) return 3;
    const m = tierFilterMap[p.tier];
    if (!m) return 0;
    return [m.price, m.utility, m.feature].filter((v) => active.includes(v)).length;
  };

  const sorted = [...products].sort((a, b) => score(b) - score(a));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {sorted.map((p, i) => {
        const matchScore = score(p);
        const best = matchScore === Math.max(...sorted.map(score));
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`relative ${!best && active.length ? 'opacity-60' : ''}`}
          >
            {best && active.length > 0 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] rounded-full text-xs font-semibold text-white shadow-lg">
                Best Match
              </div>
            )}
            <ProductCard product={p} index={i} onSelect={onSelect} />
          </motion.div>
        );
      })}
    </div>
  );
}
