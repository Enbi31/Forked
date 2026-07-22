import { useState } from 'react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <section className="relative min-h-[70dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-zinc-950 to-zinc-950 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl mx-auto w-full"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-3xl"></span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Fork
          </h1>
        </div>

        <p className="text-base sm:text-lg text-zinc-400 mb-10 leading-relaxed">
          Decisions made simple.
          <br />
          No endless scrolling.
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Laptop for JEE prep and light gaming"
              className="w-full pl-14 pr-5 py-4 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-lg transition-colors"
          >
            Find my 3 options
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
