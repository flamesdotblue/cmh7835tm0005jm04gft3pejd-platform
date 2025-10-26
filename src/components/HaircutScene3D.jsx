import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// This component simulates a clean, monochrome 3D-like haircut scene using layered parallax and perspective.
// It avoids external 3D packages to remain lightweight and instantly runnable.

const Layer = ({ className = "", style, children }) => (
  <div className={`absolute inset-0 will-change-transform ${className}`} style={style}>
    {children}
  </div>
);

const HaircutScene3D = () => {
  const containerRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, -120]);

  const onMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - (rect.left + rect.width / 2)) / rect.width; // -0.5..0.5
    const y = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    setMouse({ x, y });
  };

  const rotY = mouse.x * 14; // degrees
  const rotX = -mouse.y * 10;

  return (
    <section id="experience" className="relative py-28 md:py-40 border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-12">
          <div className="md:w-5/12">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">The Monochrome Cut</h2>
            <p className="mt-5 text-white/70">
              An interactive, parallax scene that captures the essence of a modern haircut: clean lines, subtle motion,
              and elevated calm. Move your cursor and scroll to explore the depth.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#services" className="px-5 py-3 rounded-full bg-white text-black text-sm tracking-wide hover:bg-white/90 transition">Explore Services</a>
              <a href="#book" className="px-5 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide hover:border-white/60 transition">Book a Seat</a>
            </div>
          </div>

          <motion.div
            ref={containerRef}
            onMouseMove={onMouseMove}
            style={{ y: yParallax }}
            className="md:w-7/12 relative h-[440px] md:h-[520px] rounded-3xl bg-gradient-to-b from-white/5 to-black/20 border border-white/10 overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                perspective: 900,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                  transition: "transform 120ms linear",
                }}
              >
                {/* Background soft grid */}
                <Layer>
                  <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                </Layer>
                {/* Salon chair silhouette */}
                <Layer style={{ transform: "translateZ(-60px)" }}>
                  <div className="absolute bottom-10 left-10 w-40 h-40 md:w-52 md:h-52">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <g fill="#ffffff" fillOpacity="0.12">
                        <rect x="50" y="100" width="60" height="50" rx="8" />
                        <rect x="40" y="85" width="80" height="20" rx="6" />
                        <rect x="60" y="150" width="20" height="30" rx="4" />
                        <rect x="80" y="150" width="20" height="30" rx="4" />
                        <rect x="56" y="178" width="48" height="8" rx="4" />
                      </g>
                    </svg>
                  </div>
                </Layer>
                {/* Person head + neck silhouette */}
                <Layer style={{ transform: "translateZ(20px)" }}>
                  <div className="absolute left-1/2 -translate-x-1/2 top-16 w-52 h-52 md:w-64 md:h-64">
                    <svg viewBox="0 0 300 300" className="w-full h-full">
                      <defs>
                        <clipPath id="hairClip">
                          <path d="M150 45c-40 3-73 28-80 62 8 12 22 24 38 25 14-4 35-6 50-6s36 2 50 6c16-1 30-13 38-25-7-34-40-59-80-62-6-0.5-10-0.5-16 0z" />
                        </clipPath>
                      </defs>
                      {/* Neck */}
                      <path d="M130 180c5 18 35 18 40 0v25c0 12-40 12-40 0z" fill="white" opacity="0.12" />
                      {/* Head base */}
                      <path d="M95 115c0-38 28-70 55-70s55 32 55 70-22 70-55 70-55-32-55-70z" fill="white" opacity="0.2" />
                      {/* Hair area */}
                      <g clipPath="url(#hairClip)">
                        <rect x="60" y="35" width="180" height="120" fill="white" opacity="0.6" />
                        {/* Hair strands */}
                        {Array.from({ length: 14 }).map((_, i) => (
                          <rect key={i} x={70 + i * 12} y={48 + (i % 3) * 4} width="6" height="90" fill="black" opacity="0.6" />
                        ))}
                      </g>
                    </svg>
                  </div>
                </Layer>
                {/* Scissors animated cutting hair */}
                <Layer style={{ transform: "translateZ(60px)" }}>
                  <motion.div
                    className="absolute right-10 top-20 w-28 h-28 md:w-32 md:h-32"
                    animate={{ rotate: [8, -8, 8], y: [0, 6, 0] }}
                    transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      <g stroke="white" strokeWidth="8" strokeLinecap="round" fill="none">
                        <circle cx="65" cy="80" r="18" />
                        <circle cx="110" cy="120" r="18" />
                        <path d="M65 80 L170 30" />
                        <path d="M110 120 L170 170" />
                      </g>
                    </svg>
                  </motion.div>
                </Layer>
                {/* Falling hair particles */}
                <Layer style={{ transform: "translateZ(100px)" }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-[2px] h-[10px] bg-white/40"
                      style={{ left: `${20 + (i * 80) % 480}px`, top: `${80 + (i * 30) % 260}px` }}
                      animate={{
                        y: [0, 14, 0],
                        opacity: [0.5, 0.2, 0.5],
                      }}
                      transition={{ duration: 2 + (i % 5) * 0.3, repeat: Infinity, ease: "easeInOut", delay: i * 0.05 }}
                    />
                  ))}
                </Layer>
              </div>
            </div>

            {/* Subtle vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.5))]" />
            {/* Caption */}
            <div className="absolute bottom-4 left-4 text-[11px] tracking-widest uppercase text-white/60">Interactive Scene</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HaircutScene3D;
