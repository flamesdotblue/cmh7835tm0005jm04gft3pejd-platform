import React from "react";

const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white/90" />
          <span className="tracking-widest text-sm uppercase text-white/80">Noir Salon</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <a href="#experience" className="text-white/70 hover:text-white transition">Experience</a>
          <a href="#services" className="text-white/70 hover:text-white transition">Services</a>
          <a href="#book" className="text-white/70 hover:text-white transition">Book</a>
        </nav>
        <a href="#book" className="px-4 py-2 rounded-full border border-white/20 hover:border-white/60 text-xs tracking-wide transition">Book Now</a>
      </div>
    </header>
  );
};

export default Navbar;
