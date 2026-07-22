import * as React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';

export default function HeroSection() {
    const [location, setLocation] = useLocation();
    return (
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="z-10 max-w-4xl mx-auto"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-[#00e5ff]/30 text-[#00e5ff] text-sm font-medium tracking-wide">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff]/75 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00e5ff]"></span> 