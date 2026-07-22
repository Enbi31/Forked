import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { filterOptions } from '@/lib/fork-data';

const steps = [
  {
    key: 'price',
    title: 'What\'s your budget?',
    subtitle: 'Pick a price range that works for you.',
    icon: '💰',
    options: filterOptions.price,
  },
  {
    key: 'utility',
    title: 'What will you use it for?',
    subtitle: 'Help us understand your main use case.',
    icon: '🎯',
    options: filterOptions.utility,
  },
  {
    key: 'feature',
    title: 'What matters most?',
    subtitle: 'Choose the feature you care about most.',
    icon: '⚡',
    options: filterOptions.feature,
  },
];

interface StepWizardProps {
  onComplete: (selections: Record<string, string>) => void;
}

export default function StepWizard({ onComplete }: StepWizardProps) {
  const [current, setCurrent] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [direction, setDirection] = useState(1);

  const step = steps[current];

  const select = (value: string) => {
    const next = { ...selections, [step.key]: value };
    setSelections(next);

    if (current < steps.length - 1) {
      setDirection(1);
      setTimeout(() => setCurrent((c) => c + 1), 300);
    } else {
      setTimeout(() => onComplete(next), 400);
    }
  };

  const goBack = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((c) => c - 1);
    }
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Progress bar */}
      <div className="flex items-center gap-2 mb-12">
        {steps.map((_, i) => (
          <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-white/[0.06]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#A855F7]"
              initial={{ width: '0%' }}
              animate={{ width: i <= current ? '100%' : '0%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        ))}
      </div>

      {/* Step counter + back button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={goBack}
          className={`flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer ${current === 0 ? 'invisible' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <span className="text-sm text-white/30 font-medium">
          Step {current + 1} of {steps.length}
        </span>
      </div>

      {/* Animated step content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-center mb-10">
            <span className="text-4xl mb-4 block">{step.icon}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{step.title}</h2>
            <p className="mt-2 text-white/40 text-sm sm:text-base">{step.subtitle}</p>
          </div>

          <div className="grid gap-3">
            {step.options.map((opt) => {
              const selected = selections[step.key] === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  onClick={() => select(opt.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative w-full py-5 px-6 rounded-2xl text-left font-medium transition-all duration-300 cursor-pointer border ${
                    selected
                      ? 'bg-[#7C3AED]/20 border-[#A855F7]/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                      : 'bg-white/[0.03] border-white/[0.06] text-white/70 hover:bg-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg">{opt.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      selected ? 'border-[#A855F7] bg-[#7C3AED]' : 'border-white/20'
                    }`}>
                      {selected && (
                        <motion.svg
                          initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
