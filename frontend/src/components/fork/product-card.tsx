import { motion } from 'framer-motion';
import type { Product } from '@/lib/fork-data';

const CheckIcon = () => (
  <svg className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const WarnIcon = () => (
  <svg className="w-4 h-4 mt-0.5 text-amber-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

export default function ProductCard({ product: p, index: _i, onSelect }: {
  product: Product; index: number; onSelect: (product: Product) => void;
}) {
  return (
    <div className="flex flex-col h-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 hover:border-[#A855F7]/30 hover:bg-white/[0.05] transition-all duration-300">
      <span className={`self-start px-3 py-1 rounded-full text-xs font-semibold text-white ${p.badgeColor}`}>
        {p.badgeLabel}
      </span>

      <h3 className="mt-4 text-xl font-semibold text-white">{p.title}</h3>
      <p className="mt-1 text-lg text-[#A855F7] font-medium">{p.price}</p>
      <p className="mt-4 text-sm text-white/50 leading-relaxed">{p.forWho}</p>

      <div className="mt-4 space-y-2 flex-1">
        {p.specs.map((spec, i) => (
          <div key={i} className="flex items-start gap-2 text-sm text-white/70">
            <CheckIcon />
            <span>{spec}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-white/[0.03] rounded-xl border border-white/[0.05]">
        <div className="flex items-start gap-2 text-sm text-white/40">
          <WarnIcon />
          <span><span className="text-white/60 font-medium">Trade-off: </span>{p.tradeoff}</span>
        </div>
      </div>

      <motion.button
        onClick={() => onSelect(p)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full py-3.5 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B4AF7] hover:to-[#B565F7] text-white font-semibold rounded-xl transition-all duration-300 cursor-pointer glow-button"
      >
        Select This Option
      </motion.button>
    </div>
  );
}
