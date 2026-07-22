import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';
import StepWizard from '@/components/fork/step-wizard';
import ComparisonGrid from '@/components/fork/comparison-grid';
import SelectionModal from '@/components/fork/selection-modal';
import type { Product } from '@/lib/fork-data';
import { fetchRecommendations } from '@/lib/api';
import { mapAPIProducts } from '@/lib/mapper';
import logo from '@/assets/New_Project-Photoroom.png';

type Phase = 'search' | 'steps' | 'loading' | 'results' | 'error';

export default function ForkApp() {
  const [, navigate] = useLocation();
  const [phase, setPhase] = useState<Phase>('search');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({ price: [], utility: [], feature: [] });
  const [selected, setSelected] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState('');
  const [lastSelections, setLastSelections] = useState<Record<string, string>>({});

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) setPhase('steps');
  };

  const handleWizardComplete = async (selections: Record<string, string>) => {
    setPhase('loading');
    setError('');
    setLastSelections(selections);

    try {
      const apiProducts = await fetchRecommendations({
        query,
        price: selections.price ?? '',
        utility: selections.utility ?? '',
        feature: selections.feature ?? '',
      });

      const mapped = mapAPIProducts(apiProducts);
      setProducts(mapped);

      setFilters({
        price: selections.price ? [selections.price] : [],
        utility: selections.utility ? [selections.utility] : [],
        feature: selections.feature ? [selections.feature] : [],
      });

      setPhase('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setPhase('error');
    }
  };

  const restart = () => {
    setPhase('search');
    setQuery('');
    setFilters({ price: [], utility: [], feature: [] });
    setProducts([]);
    setError('');
    setLastSelections({});
  };

  return (
    <main className="fixed inset-0 bg-[#07070B] overflow-hidden flex flex-col">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(ellipse_at_center,#7C3AED_0%,transparent_65%)] blur-3xl" 
        />
        <motion.div 
          animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.08, 0.14, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[radial-gradient(ellipse_at_center,#A855F7_0%,transparent_65%)] blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.1, 0.16, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-[30%] left-[-15%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,#6D28D9_0%,transparent_65%)] blur-[120px]" 
        />
      </div>

      <div className="noise" />

      {/* Top bar */}
      <nav className="relative z-20 shrink-0 flex items-center justify-between px-6 sm:px-10 py-5">
        <button onClick={() => navigate('/')} className="cursor-pointer">
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
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto w-full pb-10">
        <AnimatePresence mode="wait">
          {/* Phase 1: Search */}
          {phase === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl text-center"
            >
              <h1 className="text-4xl sm:text-5xl md:text-[4rem] font-bold tracking-tight text-white leading-tight mb-6">
                What are you looking for?
              </h1>
              <p className="text-base sm:text-lg text-white/50 mb-12 max-w-xl mx-auto font-medium">
                Tell us in plain words. We'll find exactly 3 perfect options for you.
              </p>

              <form onSubmit={handleSearch} className="w-full relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 to-[#A855F7]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div className="relative flex items-center bg-[#0d0d12] border border-white/[0.08] rounded-2xl p-2 focus-within:border-[#7C3AED]/50 focus-within:ring-1 focus-within:ring-[#7C3AED]/50 transition-all duration-300 shadow-2xl">
                  <div className="pl-4 flex items-center pointer-events-none">
                    <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <input
                    type="text"
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                    placeholder="A fast laptop for coding under ₹60k..."
                    className="flex-1 bg-transparent border-none text-white placeholder-white/25 text-base sm:text-lg px-4 py-4 focus:outline-none focus:ring-0"
                  />
                  
                  <button
                    type="submit"
                    disabled={!query.trim()}
                    className={`ml-2 p-3 sm:px-6 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                      query.trim() 
                        ? 'bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:scale-[1.02] cursor-pointer' 
                        : 'bg-white/5 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    <span className="hidden sm:inline">Find 3 options</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
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

          {/* Phase 3: Loading */}
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl mx-auto text-center"
            >
              <div className="flex flex-col items-center gap-6">
                <div className="w-12 h-12 border-2 border-[#A855F7] border-t-transparent rounded-full animate-spin" />
                <div>
                  <p className="text-white/80 text-lg font-medium">Finding the best options for you...</p>
                  <p className="text-white/30 text-sm mt-1">This usually takes just a few seconds.</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 4: Error */}
          {phase === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md mx-auto text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Couldn't get recommendations</h2>
                <p className="text-white/40 text-sm">{error || 'The AI service is temporarily unavailable.'}</p>
                <div className="flex gap-3 mt-2">
                  <motion.button
                    onClick={() => handleWizardComplete(lastSelections)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] text-white font-semibold rounded-xl glow-button transition-all duration-300 cursor-pointer"
                  >
                    Try Again
                  </motion.button>
                  <motion.button
                    onClick={() => setPhase('steps')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white/[0.06] border border-white/[0.1] text-white/70 font-medium rounded-xl hover:bg-white/[0.1] transition-all duration-300 cursor-pointer"
                  >
                    Change Preferences
                  </motion.button>
                  <motion.button
                    onClick={restart}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-white/[0.06] border border-white/[0.1] text-white/70 font-medium rounded-xl hover:bg-white/[0.1] transition-all duration-300 cursor-pointer"
                  >
                    Start Over
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 5: Results */}
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
              <ComparisonGrid products={products} filters={filters} onSelect={setSelected} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SelectionModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
