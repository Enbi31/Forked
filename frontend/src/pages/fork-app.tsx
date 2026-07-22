import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepWizard from '@/components/fork/step-wizard';
import ComparisonGrid from '@/components/fork/comparison-grid';
import SelectionModal from '@/components/fork/selection-modal';
import type { Product } from '@/lib/fork-data';
import logo from '@/assets/New_Project-Photoroom.png';

type Phase = 'search' | 'steps' | 'results';

export default function ForkApp() {
  const [phase, setPhase] = useState<Phase>('search');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({ price: [], utility: [], feature: [] });
  const [selected, setSelected] = useState<Product | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setPhase('steps');
  };

  const handleWizardComplete = (selections: Record<string, string>) => {
    setFilters({
      price: selections.price ? [selections.price] : [],
      utility: selections.utility ? [selections.utility] : [],
      feature: selections.feature ? [selections.feature] : [],
    });
    setPhase('results');
  };

  const restart = () => {
    setPhase('search');
    setQuery('');
    setFilters({ price: [], utility: [], feature: [] });
  };

  return (
    <main className="relative min-h-screen bg-[#07070B] overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,#7C3AED_0%,transparent_65%)] opacity-[0.07]" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,#A855F7_0%,transparent_65%)] opacity-[0.05]" />
        <div className="absolute top-1/2 left-0 -translate-x-1/3 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,#6D28D9_0%,transparent_65%)] opacity-[0.04]" />
      </div>

      <div className="noise" />

      {/* Top bar */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-10 py-5">
        <button onClick={restart} className="cursor-pointer">
          <img src={logo} alt="Forked" className="h-24" />
        </button>
        {phase !== 'search' && (
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onClick={restart}
            className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer"
          >
            Start over
          </motion.button>
        )}
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <AnimatePresence mode="wait">
          {/* Phase 1: Search */}
          {phase === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-4">
                What are you<br />looking for?
              </h1>
              <p className="text-base sm:text-lg text-white/40 mb-12 max-w-md mx-auto">
                Tell us in plain words. We'll find 3 perfect options for you.
              </p>

              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. Laptop for JEE prep and light gaming"
                    className="w-full pl-14 pr-5 py-5 bg-white/[0.04] border border-white/[0.08] rounded-2xl text-white placeholder-white/25 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/40 focus:border-[#7C3AED]/40 transition-all"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 px-10 py-4 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B4AF7] hover:to-[#B565F7] text-white font-semibold rounded-xl glow-button transition-all duration-300 cursor-pointer"
                >
                  Find my 3 options →
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Phase 2: Step-by-step wizard */}
          {phase === 'steps' && (
            <motion.div
              key="steps"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <StepWizard onComplete={handleWizardComplete} />
            </motion.div>
          )}

          {/* Phase 3: Results */}
          {phase === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-6xl mx-auto pb-16"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  Your <span className="text-gradient">3 Options</span>
                </h2>
                <p className="text-white/40 text-sm sm:text-base">
                  We picked these just for you. Compare and choose.
                </p>
              </div>
              <ComparisonGrid filters={filters} onSelect={setSelected} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SelectionModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
