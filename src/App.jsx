import React from "react";
import './App.css'
import Header from './components/Header';
import Hero from './components/Hero';
import Industries from './components/Industries';
import Services from './components/Services';
import Partners from './components/Partners';
import Testimonial from './components/Testimonial';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className=" bg-gray-100 text-black sansation-regular ">
      <Header />
      <main className="min-h-screen flex flex-col z-11 overflow-x-hidden bg-gray-100">
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