import React from 'react';
import AnimatedArrowButton from './ui/AnimatedArrowButton';
import AnimatedUnderline from './ui/AnimatedUnderline';
import { Link } from "react-router-dom";

const navlink = [
  { name: 'home', slug: ""},
  { name: 'industries', slug: "industries",},
  { name: 'solutions', slug: "solutions",},
  { name: 'products', slug: "products",},
];

const sociallink = [
  {
    name: 'Facebook', image: '/socials/facebook.png',
    slug: "http://facebook.com/",
  },
  {
    name: 'x', image: '/socials/x.png',
    slug: "http://x.com/",
  },
  {
    name: 'linkedin', image: '/socials/linkedin.png',
    slug: "http://linkedin.com/",
  },
  {
    name: 'instagram', image: '/socials/instagram.png',
    slug: "http://instagram.com/",
  },
];

export default function Footer() {
  return (
    <footer className="section-l-p section-r-p section-bg rounded-t-xl pt-16 pb-7 relative overflow-hidden ">
      <div
        aria-hidden="true"
        className="gradient-bg rotate-45 absolute -bottom-50 left-[15%] sm:left-[30%] lg:left-[35%] 2xl:left-[45%]  w-80 h-80 lg:w-100 lg:h-100 blur-2xl opacity-75"
      />
      <div className="mx-auto px-1.5 md:px-[2%] relative z-10">
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-x-4 gap-y-12 lg:gap-x-12'>
          <div className=' sm:col-span-2 md:col-span-6'>
            <div>
              <img
                src="/sproxil.png" 
                alt="" 
                className='hidden'
              />
            </div>
            <span className='font-semibold text-3xl lg:text-4xl text-white'>SPROXIL •</span>
            <div className="mt-5 lg:mt-6">
              <AnimatedArrowButton
                label="Reach out to us"
                to="#contact"
                labelClass="bg-[#f5f9f5] text-[#0a0f0a]"
                iconTextColor="text-red-950"
              />
            </div>
          </div>
          <div className='flex flex-col sm:col-span-1 md:col-span-4 gap-2.5 w-fit'>
            {navlink.map((n) => (
              <AnimatedUnderline
                key={n.name}
                as="a"
                href={`/${n.slug}`}
                className=' bg-white'
              >
                <span className='w-fit text-[#ecefec] text-2xl lg:text-[32px] font-semibold capitalize'>{n.name}</span>
              </AnimatedUnderline>
            ))}
          </div>

          <div className='flex flex-col sm:col-span-1 md:col-span-2 gap-1.5 w-fit'>
            <span className='text-[#ecefec] text-[16px] text-lg font-semibold'>Our Socials</span>
            {sociallink.map((s) => (
              <div className='flex items-center gap-1.5'>
                <img
                  src={s.image}
                  alt={`${s.name} logo`}
                  loading="lazy"
                  className="w-4.5 h-4.5 object-cover"
                />
                <AnimatedUnderline
                  key={s.name}
                  as="a"
                  href={s.slug}
                  className=' bg-white'
                  thickness={1.5}
                >
                  <span className='w-fit capitalize text-[#a7aaa7]'>{s.name}</span>
                </AnimatedUnderline>
              </div>
            ))}
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-8 gap-x-6 lg:gap-x-12 gap-y-1 text-[16px] md:text-lg mt-25 '>
          <span className='text-[#dadad8] col-span-4'>Sproxil. All rights reserved</span>
          <span className='flex items-center col-span-2 shrink-0 text-nowrap gap-1 text-[#959795] '>Crafted
            <AnimatedUnderline
              as="a" href="https://wa.me/2348119684024"
              className='bg-white text-[#959795]'
            >
              <div className='mt-1'>
                <span>by Wailee</span>
              </div>
              
            </AnimatedUnderline>
          </span>
          <span className='text-[#959795] col-span-2 flex justify-end'>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}