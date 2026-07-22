import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="z-10 max-w-4xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-[#00e5ff]/30 text-[#00e5ff] text-sm font-medium tracking-wide">
                    
                    
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff]/75 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span>
                    </span>
                    Now available
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
                    Build the future
                    <br />
                    <span className="text-[#00e5ff]">with Axen</span>
                </h1>

                <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 mb-10">
                    A modern platform for building exceptional digital experiences.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button className="px-8 py-3 rounded-full bg-[#00e5ff] text-black font-semibold hover:bg-[#00e5ff]/90 transition-colors">
                        Get started
                    </button>
                    <button className="px-8 py-3 rounded-full border border-gray-700 text-white font-semibold hover:bg-white/5 transition-colors">
                        Learn more
                    </button>
                </div>
            </motion.div>
        </section>
    );
}