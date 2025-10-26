import React, { useEffect, useRef } from 'react';

function useParallax(strength = 36) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
      const y = (-mid / window.innerHeight) * strength;
      el.style.transform = `translateY(${y.toFixed(1)}px)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [strength]);
  return ref;
}

const ParallaxSection = ({ id, title, subtitle, index = 1, cta }) => {
  const ref = useParallax(40);
  return (
    <section id={id} className="relative py-28 md:py-36 border-t border-white/10">
      <div className="absolute inset-0 -z-10 opacity-[0.08]" aria-hidden>
        <div className="h-full w-full" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)',
          backgroundSize: '56px 56px'
        }} />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-400">0{index}</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
            <p className="mt-4 text-zinc-300 max-w-prose">{subtitle}</p>
            {cta && (
              <a href={cta.href} className="mt-6 inline-block text-black bg-white hover:bg-zinc-200 transition rounded-full px-5 py-2 text-sm font-medium">
                {cta.label}
              </a>
            )}
          </div>
          <div className="relative h-[260px] sm:h-[320px] md:h-[380px] rounded-xl border border-white/10 overflow-hidden bg-gradient-to-b from-white/5 to-black/20">
            <div ref={ref} className="absolute inset-0 grid place-items-center">
              <div className="h-40 w-40 rounded-full border border-white/20" />
              <div className="absolute inset-8 rounded-xl border border-white/10" />
              <div className="absolute inset-16 rounded-xl border border-white/10" />
            </div>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent,rgba(0,0,0,0.4))]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxSection;
