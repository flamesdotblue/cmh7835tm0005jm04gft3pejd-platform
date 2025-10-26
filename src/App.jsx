import React from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import ThreeSalonExperience from './components/ThreeSalonExperience';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter selection:bg-white selection:text-black overflow-x-hidden">
      <NavBar />
      <main>
        <Hero />
        <ThreeSalonExperience />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default App;
