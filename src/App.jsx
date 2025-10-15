import React from 'react';
import './App.css'
import Headers from './components/Header';
import Navbar from './components/ui/Navbar';
import Hero from './components/Hero';
import Industries from './components/Industries';
import Services from './components/Services';
import Partners from './components/Partners';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black sansation-regular">
      {/*<Navbar />*/}
      <Headers />
      <main className=" flex-grow">
        <Hero />
        <Industries />
        <Services />
        <Partners />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
