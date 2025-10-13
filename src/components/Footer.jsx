import React from 'react';
import AnimatedArrowButton from './ui/AnimatedArrowButton';
import AnimatedUnderline from './ui/AnimatedUnderline';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="section-l-p section-r-p overflow-x-hidden bg-red-900 rounded-t-xl py-16">
      <div className="mx-auto md:px-[3%]">
        <div className=''>
          <div>
            <img
              src="public/sproxil.png" 
              alt="" 
              className='hidden'
            />
          </div>
          <span className='font-semibold text-3xl lg:text-4xl text-white'>SPROXIL</span>
          <div className="mt-6 lg:mt-8">
            <AnimatedArrowButton
              label="Book an Appointment"
              to="#contact"
              labelClass="bg-[#f5f9f5] text-[#0a0f0a]"
              iconTextColor="text-red-950"
            />
          </div>
        </div>

        <div>
          <div><Link to="/">Home</Link></div>
          <div><a href="#">Program</a></div>
          <div><a href="#">About</a></div>
          <div><a href="#">Contact</a></div>
        </div>

        <div>
          <span>Our Socials</span>
          <AnimatedUnderline as="a" href="/about" color="#16a34a" className='bg-pink-600 text-white'>Aboutmm</AnimatedUnderline>
          <AnimatedUnderline as="a" href="/about" color="#ffffff" className='bg-pink-600 text-white'>Aboutmm</AnimatedUnderline>
          <div><a href="#">Facebook</a></div>
          <div><a href="#">X</a></div>
          <div><a href="#">Linkedin</a></div>
          <div><a href="#">Instagram</a></div>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

          <div className="mt-4 flex gap-6">
            <a href="#" className="text-sm hover:text-white">Privacy</a>
            <a href="#" className="text-sm hover:text-white">Terms</a>
            <a href="#" className="text-sm hover:text-white">Security</a>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-6 text-sm text-slate-500">© {new Date().getFullYear()} MaiWay. All rights reserved.</div>
      </div>
    </footer>
  );
}