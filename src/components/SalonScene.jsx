import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// A stylized, monochrome "3D-like" salon scene built with SVG, parallax, and keyframed animation.
// Sequence: walk in -> sit -> haircut (hair shortens, scissors animate) -> nod -> loop.

const useProgressLoop = (durationMs = 12000) => {
  const [p, setP] = useState(0);
  const rafRef = useRef();
  const startRef = useRef();

  useEffect(() => {
    const tick = (t) => {
      if (!startRef.current) startRef.current = t;
      const elapsed = t - startRef.current;
      const progress = (elapsed % durationMs) / durationMs; // 0..1 looping
      setP(progress);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [durationMs]);

  return p;
};

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const lerp = (a, b, t) => a + (b - a) * t;

const SalonScene = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, -120]);
  const p = useProgressLoop(12000);

  // Phases
  const walkP = clamp(p / 0.4, 0, 1); // 0 -> 0.4
  const sitP = clamp((p - 0.4) / 0.15, 0, 1); // 0.4 -> 0.55
  const cutP = clamp((p - 0.55) / 0.3, 0, 1); // 0.55 -> 0.85
  const nodP = clamp((p - 0.85) / 0.15, 0, 1); // 0.85 -> 1

  // Coordinates in SVG viewBox
  // Person starts off-canvas x=-80, moves to chair x=140
  const personX = lerp(-80, 140, walkP);
  // Slight vertical sink when sitting
  const personY = lerp(0, 8, sitP);
  // Hair height scales down as cutP grows
  const hairScale = lerp(1, 0.4, cutP);
  // Finishing nod rotation
  const headRot = lerp(0, -6, nodP);

  // Scissors oscillation during cut
  const scissorAmp = 10 * cutP; // degrees
  const scissorRot = Math.sin(p * Math.PI * 8) * scissorAmp;

  // Mouse tilt for subtle parallax depth
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width; // -0.5..0.5
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    setMouse({ x, y });
  };
  const rotY = mouse.x * 10;
  const rotX = -mouse.y * 8;

  return (
    <section id="experience" className="relative py-28 md:py-40 border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">The Monochrome Cut</h2>
            <p className="mt-5 text-white/70 max-w-prose">
              Watch our low-poly gent walk in, sit down, and get a fresh trim. A lightweight, 3D-inspired sequence built in pure SVG with parallax and motion.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <a href="#services" className="px-5 py-3 rounded-full bg-white text-black text-sm tracking-wide hover:bg-white/90 transition">Explore Services</a>
              <a href="#book" className="px-5 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide hover:border-white/60 transition">Book a Seat</a>
            </div>
          </div>

          <motion.div
            ref={containerRef}
            onMouseMove={onMouseMove}
            style={{ y: yParallax }}
            className="relative h-[440px] md:h-[540px] rounded-3xl bg-gradient-to-b from-white/5 to-black/20 border border-white/10 overflow-hidden"
          >
            <div className="absolute inset-0" style={{ perspective: 900 }}>
              <div
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d', transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`, transition: 'transform 120ms linear' }}
              >
                {/* Soft grid background */}
                <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)', backgroundSize: '56px 56px' }} />

                {/* Floor ellipse (depth hint) */}
                <div className="absolute inset-x-0 bottom-10 h-24">
                  <svg viewBox="0 0 600 120" className="w-full h-full">
                    <ellipse cx="300" cy="60" rx="260" ry="28" fill="white" opacity="0.05" />
                  </svg>
                </div>

                {/* Chair (back) */}
                <div className="absolute left-[38%] top-[26%] w-48 h-56" style={{ transform: 'translateZ(-40px)' }}>
                  <svg viewBox="0 0 200 240" className="w-full h-full">
                    <g fill="white" opacity="0.12">
                      <rect x="20" y="90" width="160" height="60" rx="8" />
                      <rect x="30" y="40" width="140" height="60" rx="10" />
                      <rect x="60" y="150" width="20" height="60" rx="4" />
                      <rect x="120" y="150" width="20" height="60" rx="4" />
                      <rect x="50" y="208" width="100" height="10" rx="5" />
                    </g>
                  </svg>
                </div>

                {/* Person */}
                <div className="absolute top-[18%] left-0 w-full h-[60%]" style={{ transform: 'translateZ(20px)' }}>
                  <svg viewBox="0 0 600 400" className="w-full h-full">
                    <g transform={`translate(${personX}, ${personY})`}>
                      {/* Legs */}
                      <rect x="-6" y="250" width="12" height="60" fill="white" opacity="0.9" />
                      <rect x="14" y="250" width="12" height="60" fill="white" opacity="0.9" />
                      {/* Body */}
                      <rect x="-20" y="180" width="60" height="80" rx="14" fill="white" opacity="0.95" />
                      {/* Arms */}
                      <rect x="-36" y="190" width="14" height="50" rx="6" fill="white" opacity="0.9" />
                      <rect x="40" y="190" width="14" height="50" rx="6" fill="white" opacity="0.9" />
                      {/* Head group with slight nod */}
                      <g transform={`translate(10, 160) rotate(${headRot})`}>
                        {/* Neck */}
                        <rect x="-6" y="18" width="12" height="16" rx="4" fill="white" opacity="0.6" />
                        {/* Head */}
                        <circle cx="0" cy="0" r="22" fill="white" />
                        {/* Hair (scaleY to simulate cutting) */}
                        <g transform={`translate(0,-22) scale(1, ${hairScale}) translate(0,22)`}>
                          <rect x="-22" y="-28" width="44" height="16" rx="6" fill="black" />
                        </g>
                      </g>
                    </g>
                  </svg>
                </div>

                {/* Scissors (animated near head during cut) */}
                <div className="absolute right-10 top-16 w-28 h-28 md:w-32 md:h-32" style={{ transform: 'translateZ(60px)' }}>
                  <motion.svg viewBox="0 0 200 200" className="w-full h-full" style={{ rotate: scissorRot }}>
                    <g stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" opacity={0.9}>
                      <circle cx="65" cy="80" r="18" />
                      <circle cx="110" cy="120" r="18" />
                      <path d="M65 80 L170 30" />
                      <path d="M110 120 L170 170" />
                    </g>
                  </motion.svg>
                </div>

                {/* Floating hair particles during cut */}
                <div className="absolute inset-0 pointer-events-none" style={{ transform: 'translateZ(100px)' }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] h-[10px] bg-white/40"
                      style={{ left: `${20 + ((i * 80) % 520)}px`, top: `${80 + ((i * 30) % 260)}px` }}
                      animate={{ y: [0, 14, 0], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 2 + (i % 5) * 0.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.55))]" />
            <div className="absolute bottom-4 left-4 text-[11px] tracking-widest uppercase text-white/60">Interactive Scene</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SalonScene;
