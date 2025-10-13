import React from 'react';
import AnimatedArrowButton from './ui/AnimatedArrowButton';
import AnimatedUnderline from './ui/AnimatedUnderline';
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="section-l-p section-r-p overflow-x-hidden bg-red-900 rounded-t-xl pt-16 pb-7">
      <div className="mx-auto px-1.5 md:px-[2%] ">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-12 lg:gap-x-12'>
          <div className=' sm:col-span-2 md:col-span-6'>
            <div>
              <img
                src="public/sproxil.png" 
                alt="" 
                className='hidden'
              />
            </div>
            <span className='font-semibold text-3xl lg:text-4xl text-white'>SPROXIL</span>
            <div className="mt-5 lg:mt-6">
              <AnimatedArrowButton
                label="Reach out to us"
                to="#contact"
                labelClass="bg-[#f5f9f5] text-[#0a0f0a]"
                iconTextColor="text-red-950"
              />
            </div>
          </div>
          <div className='flex flex-col sm:col-span-1 md:col-span-4 gap-1 w-fit'>
            <AnimatedUnderline
              as="a" href="/"
              color="#ffffff"
              className='footer-link'
            >
              Home
            </AnimatedUnderline>
            <AnimatedUnderline
              as="a" href="/about"
              color="#ffffff"
              className='footer-link'
            >
              About
            </AnimatedUnderline>
            <AnimatedUnderline
              as="a" href="/faqs"
              color="#ffffff"
              className='footer-link'
            >
              FAQs - AISHA
            </AnimatedUnderline>
            <AnimatedUnderline
              as="a" href="/term-of-service"
              color="#ffffff"
              className='footer-link'
            >
              Term of Service
            </AnimatedUnderline>
            <AnimatedUnderline
              as="a" href="/privacy-policy"
              color="#ffffff"
              className='footer-link'
            >
              Privacy Policy
            </AnimatedUnderline>
          </div>

          <div className='flex flex-col sm:col-span-1 md:col-span-2 gap-1.5 w-fit'>
            <span className='text-[#ecefec] text-[16px] text-lg font-semibold'>Our Socials</span>
            <div className='footer-social-div'>
              <img
                src="public/gsk_logo.jpg"
                alt="logo"
                className='footer-social-img'
              />
              <AnimatedUnderline
                as="a" href="/facebook"
                color="#ffffff"
                className='footer-social'
              >
                Facebook
              </AnimatedUnderline>
            </div>
            <div className='footer-social-div'>
              <img
                src="public/gsk_logo.jpg"
                alt="logo"
                className='footer-social-img'
              />
              <AnimatedUnderline
                as="a" href="/x"
                color="#ffffff"
                className='footer-social'
              >
                X
              </AnimatedUnderline>
            </div>
            <div className='footer-social-div'>
              <img
                src="public/gsk_logo.jpg"
                alt="logo"
                className='footer-social-img'
              />
              <AnimatedUnderline
                as="a" href="/linkedin"
                color="#ffffff"
                className='footer-social'
              >
                linkedin
              </AnimatedUnderline>
            </div>
            <div className='footer-social-div'>
              <img
                src="public/gsk_logo.jpg"
                alt="logo"
                className='footer-social-img'
              />
              <AnimatedUnderline
                as="a" href="/instagram"
                color="#ffffff"
                className='footer-social'
              >
                instagram
              </AnimatedUnderline>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-8 gap-x-6 lg:gap-x-12 gap-y-1 text-[16px] md:text-lg mt-25 '>
          <span className='text-[#dadad8] col-span-4'>Sproxil. All rights reserved</span>
          <span className='flex items-center col-span-2 shrink-0 text-nowrap gap-1 text-[#959795] '>Crafted
            <AnimatedUnderline
              as="a" href="https://www.wailee.com/"
              color="#ffffff"
              className=' mt-1 text-[#959795]'
            >
              by Wailee
            </AnimatedUnderline>
          </span>
          <span className='text-[#959795] col-span-2 flex justify-end'>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}