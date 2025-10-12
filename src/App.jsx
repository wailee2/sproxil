import React from 'react';
import './App.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Industries from './components/Industries';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black sansation-regular">
      {/*<Navbar />*/}
      <main className=" flex-grow">
        <Hero />
        <Industries />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
