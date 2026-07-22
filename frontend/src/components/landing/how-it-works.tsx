import { motion } from 'framer-motion';

const steps = [
  { step: 1, icon: '🔍', title: 'Tell us what you need', desc: 'Describe the product you\'re looking for in plain words.' },
  { step: 2, icon: '⚙️', title: 'Refine your preferences', desc: 'Pick your price range, use case, and must-have feature.' },
  { step: 3, icon: '✅', title: 'Choose from 3 options', desc: 'Compare Budget, Balanced, and Powerhouse — pick the one that fits.' },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#07070B] px-4 py-24">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16">
        How <span className="text-gradient">Fork</span> Works
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }} className="glass-card p-8 hover:border-[rgba(168,85,247,0.3)] transition-all">
            <span className="text-3xl">{s.icon}</span>
            <h3 className="mt-4 text-lg font-semibold text-white">{s.title}</h3>
            <p className="mt-2 text-sm text-[#D8CFF8]/60 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
