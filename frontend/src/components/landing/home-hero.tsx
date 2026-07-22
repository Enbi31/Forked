import { motion } from 'framer-motion';
import { useLenis } from 'lenis/react';

const ease = [0.16, 1, 0.3, 1] as const;
const fadeUp = (y = 20, delay = 0) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const circles = [
  { cls: 'top-20 left-10 w-64 h-64 bg-purple-500/10', dur: 8, y: [-30, 0] },
  { cls: 'bottom-32 right-10 w-48 h-48 bg-purple-400/10', dur: 6, y: [25, 0] },
  { cls: 'top-1/3 right-1/4 w-36 h-36 bg-purple-600/10', dur: 7, y: [-20, 0] },
];

export default function HomeHero({ onLaunch }: { onLaunch: () => void }) {
  const lenis = useLenis();

  const handleLearnMore = () => {
    if (lenis) {
      lenis.scrollTo('#how-it-works', { duration: 1.2 });
    } else {
      document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#07070B] pt-32 pb-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,#7C3AED_0%,#A855F7_25%,transparent_60%)] opacity-15 pointer-events-none" />

      {circles.map((c, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl pointer-events-none ${c.cls}`}
          animate={{ y: c.y }}
          transition={{ duration: c.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto w-full mt-8 sm:mt-12">
        <motion.div {...fadeUp(30)} className="w-full flex flex-col items-center mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <div className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <span className="text-sm font-semibold text-[#00F0FF] tracking-wide">Cure decision paralysis forever</span>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-[5.5rem] font-bold tracking-tight text-white leading-[1.05]">
            Stop scrolling.
            <br />
            Start <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F028C6] via-[#D9C3D1] to-[#83E08F] pr-1">forking.</span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-white/50 max-w-2xl font-medium leading-relaxed">
            Every choice reduced to 3. Tell us what you're looking for in plain words, and we'll instantly find the perfect options for you.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp(15, 0.4)}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onLaunch}
            className="px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B4AF7] hover:to-[#B565F7] text-white font-semibold rounded-xl glow-button transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            Find My 3 Options →
          </button>
          <button 
            onClick={handleLearnMore}
            className="px-8 py-4 glass-card bg-transparent text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:border-[rgba(168,85,247,0.4)] cursor-pointer"
          >
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
