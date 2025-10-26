import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import SalonScene from './components/SalonScene';
import ParallaxSection from './components/ParallaxSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter selection:bg-white selection:text-black overflow-x-hidden">
      <NavBar />
      <main>
        <Hero />
        <SalonScene />
        <ParallaxSection
          id="services"
          index={1}
          title="Minimal Menu, Maximum Craft"
          subtitle="Classic cuts, fades, and beard work — tailored to your features and finished with precision." 
          cta={{ label: 'Book a Seat', href: '#book' }}
        />
        <ParallaxSection
          id="studio"
          index={2}
          title="Monochrome Studio"
          subtitle="A calm, focused space in black and white. Every detail designed to keep you at ease." 
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
