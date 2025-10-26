import React from 'react';

const Footer = () => {
  return (
    <footer id="book" className="relative border-t border-white/10 bg-black/60">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-2xl font-semibold tracking-tight">Book your monochrome moment</h4>
            <p className="mt-3 text-white/70 max-w-md">Open Tue–Sun, 10:00–20:00. 21 Noir Avenue, Unit 04. Minimal space, maximal craft.</p>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 outline-none placeholder:text-white/40" placeholder="Name" />
            <input className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 outline-none placeholder:text-white/40" placeholder="Phone" />
            <input className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-white/40 outline-none placeholder:text-white/40 sm:col-span-2" placeholder="Preferred Date & Time" />
            <button className="px-6 py-3 rounded-full bg-white text-black text-sm tracking-wide hover:bg-white/90 transition sm:col-span-2">Request Booking</button>
          </form>
        </div>
        <div className="mt-12 flex items-center justify-between text-xs text-white/50">
          <span>© {new Date().getFullYear()} Monochrome Salon. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/80">Instagram</a>
            <a href="#" className="hover:text-white/80">Maps</a>
            <a href="#" className="hover:text-white/80">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
