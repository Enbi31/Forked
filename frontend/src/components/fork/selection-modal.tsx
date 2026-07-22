import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '@/lib/fork-data';

interface SelectionModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function SelectionModal({ product, onClose }: SelectionModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${product.badgeColor}`}
            >
              {product.badgeLabel}
            </span>

            <h2 className="mt-4 text-2xl font-semibold text-white">{product.title}</h2>
            <p className="mt-1 text-lg text-purple-400 font-medium">{product.price}</p>

            <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{product.forWho}</p>

            <a
              href={product.buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-2 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Search on Amazon
            </a>

            <p className="mt-3 text-xs text-zinc-600 text-center">
              Opens in a new tab
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
