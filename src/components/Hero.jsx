import React from 'react';
import AnimatedArrowButton from './ui/AnimatedArrowButton';

export default function Hero() {
    return (
        <section className="bg-white section-x-padding">
            <div className="mx-auto py-15 lg:py-20">
                <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">For Donors • Pharma • FMCG</p>
                <h1 className="lg:max-w-[85%] text-black sansation-bold">
                    We <span className="sansation-bold-italic">help</span> brands build trust and loyalty.
                </h1>
                <div className='flex flex-col-reverse lg:flex-row lg:justify-betwdeen lg:items-center mt-7.5 lg:mt-9 gap-4'>
                    <div className="flex items-center gap-4">
                        <AnimatedArrowButton label="Get Started" to="#contact" />
                    </div>
                    <p className="text-fluid-body text-balance  max-w-lg">Secure product verification, protect supply chains, and turn each mobile scan into a trusted connection between your brand and customers.</p>
                </div>
                <div className="mt-16 lg:mt-12 w-full bg-[url('/herobg.jpg')] bg-cover bg-center h-[90vh] lg:h-[70vh] rounded-bl-2xl lg:rounded-bl-4xl rounded-br-[5rem] lg:rounded-br-[10rem] rounded-tl-[5rem] lg:rounded-tl-[10rem] rounded-tr-2xl lg:rounded-tr-4xl ">
                </div>
            </div>
        </section>
    );
}