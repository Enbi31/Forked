import { useState } from 'react';
import { motion } from 'framer-motion';

interface HomeHeroProps { onLaunch: () => void }

const floatingCircles = [
  { className: 'top-20 left-10 w-64 h-64 bg-purple-500/10', duration: 8, y: [-30, 0] },
  { className: 'bottom-32 right-10 w-48 h-48 bg-purple-400/10', duration: 6, y: [25, 0] },
  { className: 'top-1/3 right-1/4 w-36 h-36 bg-purple-600/10', duration: 7, y: [-20, 0] },
];

export default function HomeHero({ onLaunch }: HomeHeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <section onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })} className="relative min-h-[90dvh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#07070B] pt-24 pb-20">
      <motion.div className="fixed pointer-events-none z-0" animate={{ left: mousePos.x - 100, top: mousePos.y - 100 }} transition={{ type: 'spring', stiffness: 80, damping: 20 }} style={{ width: 200, height: 200 }}>
        <div className="w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,#A855F7_0%,transparent_70%)] opacity-30" />
      </motion.div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,#7C3AED_0%,#A855F7_25%,transparent_60%)] opacity-15 pointer-events-none" />

      {floatingCircles.map((c, i) => (
        <motion.div key={i} className={`absolute rounded-full blur-3xl pointer-events-none ${c.className}`} animate={{ y: c.y }} transition={{ duration: c.duration, repeat: Infinity, ease: 'easeInOut' }} />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1]">
          Stop endless<br />scrolling.<br /><span className="text-gradient">Start choosing.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="mt-6 text-lg sm:text-xl text-[#D8CFF8]/70 max-w-xl mx-auto leading-relaxed">
          Describe what you're looking for and get 3 perfect options instantly. No more decision fatigue.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onLaunch} className="px-8 py-4 bg-gradient-to-r from-[#7C3AED] to-[#A855F7] hover:from-[#8B4AF7] hover:to-[#B565F7] text-white font-semibold rounded-xl glow-button transition-all duration-300 hover:scale-[1.03] cursor-pointer">
            Launch Fork →
          </button>
          <button className="px-8 py-4 glass-card bg-transparent text-white/80 hover:text-white font-semibold rounded-xl transition-all duration-300 hover:border-[rgba(168,85,247,0.4)] cursor-pointer">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
