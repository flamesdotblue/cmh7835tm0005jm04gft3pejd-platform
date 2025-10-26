import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 600], [0, -140]);
  const fade = useTransform(scrollY, [0, 300], [1, 0.7]);

  return (
    <section className="relative min-h-[96vh] flex items-center" aria-label="Hero">
      <motion.div style={{ y: yBg, opacity: fade }} className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.12]" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)',
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.6)_80%)]" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-semibold tracking-tight"
        >
          Clean cuts. Bold confidence.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="mt-6 max-w-2xl text-white/70"
        >
          A premium monochrome salon experience with subtle parallax and a bespoke 3D scene: watch the walk-in, the sit, and the sharp trim in real time.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="mt-10 flex items-center gap-4"
        >
          <a href="#experience" className="px-6 py-3 rounded-full bg-white text-black text-sm tracking-wide hover:bg-white/90 transition">View Experience</a>
          <a href="#services" className="px-6 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide hover:border-white/60 transition">Our Services</a>
        </motion.div>
      </div>

      <motion.div style={{ y: yBg }} className="absolute bottom-8 inset-x-0 flex justify-center">
        <div className="text-white/50 text-xs tracking-widest uppercase">Scroll</div>
      </motion.div>
    </section>
  );
};

export default Hero;
