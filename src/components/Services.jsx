import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const services = [
  { title: 'Signature Cut', desc: 'Tailored to your features with precision scissor work and clean lines.', price: '$45' },
  { title: 'Skin Fade + Style', desc: 'Seamless gradients with matte finish styling and product advice.', price: '$55' },
  { title: 'Beard Shape & Finish', desc: 'Defined contours, hot towel, and nourishing oil finish.', price: '$30' },
  { title: 'Wash & Finish', desc: 'Clarifying wash, scalp massage, and blow-dry style.', price: '$20' },
];

const Services = () => {
  return (
    <section id="services" className="relative py-28 md:py-36 border-t border-white/10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_55%)]" />
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between gap-8">
          <div>
            <h3 className="text-2xl md:text-4xl font-semibold tracking-tight">Services</h3>
            <p className="mt-3 text-white/70 max-w-xl">Minimal menu. Maximum craft. Every service is performed with precision and care.</p>
          </div>
          <a href="#book" className="hidden md:inline-flex px-5 py-3 rounded-full border border-white/20 text-white text-sm tracking-wide hover:border-white/60 transition">Reserve</a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl p-6 bg-gradient-to-b from-white/5 to-black/10 border border-white/10 hover:border-white/30 transition"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-medium">{s.title}</h4>
                <span className="text-white/60 text-sm">{s.price}</span>
              </div>
              <p className="mt-3 text-white/70">{s.desc}</p>
              <div className="mt-5 flex items-center gap-2 text-white/60 text-xs">
                <Star size={14} /> Premium finish included
              </div>
              <div className="mt-6 flex gap-3">
                <button className="px-4 py-2 rounded-full bg-white text-black text-xs tracking-wide hover:bg-white/90 transition">Book</button>
                <button className="px-4 py-2 rounded-full border border-white/20 text-white text-xs tracking-wide hover:border-white/60 transition">Details</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
