import { motion } from 'framer-motion';
import type { Product } from '@/lib/fork-data';

interface ProductCardProps { product: Product; index: number; onSelect: (product: Product) => void }

export default function ProductCard({ product, index, onSelect }: ProductCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
      className="flex flex-col bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
      <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold text-white ${product.badgeColor}`}>{product.badgeLabel}</span>

      <h3 className="mt-4 text-xl font-semibold text-white">{product.title}</h3>
      <p className="mt-1 text-lg text-purple-400 font-medium">{product.price}</p>
      <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{product.forWho}</p>

      <div className="mt-4 space-y-2">
        {product.specs.map((spec, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-zinc-300">
            <svg className="w-4 h-4 mt-0.5 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{spec}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-zinc-800/50 rounded-lg">
        <div className="flex items-start gap-2 text-sm text-zinc-400">
          <svg className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span><span className="text-zinc-300 font-medium">The Trade-off: </span>{product.tradeoff}</span>
        </div>
      </div>

      <button onClick={() => onSelect(product)} className="mt-6 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors cursor-pointer">
        Select This Option
      </button>
    </motion.div>
  );
}
