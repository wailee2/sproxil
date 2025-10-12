import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward } from "react-icons/io5";
import AnimatedArrowButton from './ui/AnimatedArrowButton';

export default function Hero() {
    return (
        <section className="bg-white ">
            <div className="mx-auto py-20">
                <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">For Donors • Pharma • FMCG</p>
                <h1 className="lg:max-w-[85%] text-black sansation-bold">
                    We <span className="sansation-bold-italic">help</span> brands build trust and loyalty.
                </h1>
                <div className='flex justify-between items-center mt-9'>
                    <div className="flex items-center gap-4">
                        <AnimatedArrowButton label="Get Started" to="#contact" />
                    </div>
                    <p className="text-fluid-body text-balance  max-w-lg">Secure product verification, protect supply chains, and turn each mobile scan into a trusted connection between your brand and customers.</p>
                </div>
                <div className="mt-12 w-full bg-[url('/herobg.jpg')] bg-cover bg-center h-[70vh] rounded-bl-4xl rounded-br-[10rem] rounded-tl-[10rem] rounded-tr-4xl ">
                </div>
            </div>
        </section>
    );
}