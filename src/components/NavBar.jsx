import React from 'react';

const NavBar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/50 bg-black/70 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <span className="inline-block w-6 h-6 rounded-full bg-white" />
          <span className="text-sm uppercase tracking-[0.25em] text-white/80">Monochrome Salon</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-300">
          <a href="#experience" className="hover:text-white transition">Experience</a>
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#book" className="hover:text-white transition">Book</a>
        </nav>
        <a href="#book" className="text-black bg-white hover:bg-zinc-200 transition rounded-full px-4 py-2 text-xs tracking-wide font-medium">Book</a>
      </div>
    </header>
  );
};

export default NavBar;
