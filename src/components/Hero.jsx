import React from 'react';
import AnimatedArrowButton from './ui/AnimatedArrowButton';

export default function Hero() {
    return (
        <section className=" section-l-p section-r-p pt-12 relative overflow-hidden">
            <div
                aria-hidden="true"
                className="gradient-bg absolute top-5 lg:top-10 -right-70 w-100 h-90 md:w-130 md:h-110 rounded-full blur-3xl opacity-50"
            />
            <div className="mx-auto pb-12 md:pb-10 lg:pb-11 xl:pb-8 pt-20 lg:pt-52 relative z-10">
                <h1 className="lg:max-w-[85%] text-black sansation-bold">
                    We <span className="sansation-bold-italic">help</span> brands build trust and loyalty.
                </h1>
                <div className='flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center mt-7.5 lg:mt-9 gap-4'>
                    <div className="">
                        <AnimatedArrowButton label="Get Started" to="#contact" />
                    </div>
                    <p className="text-fluid-body text-balance  max-w-lg">Secure product verification, protect supply chains, and turn each mobile scan into a trusted connection between your brand and customers.</p>
                </div>
                <div className="mt-16 lg:mt-18 w-full bg-[url('/herobg.jpg')] bg-cover bg-center h-[65vh] lg:h-[70vh] rounded-bl-2xl lg:rounded-bl-4xl rounded-br-[5rem] lg:rounded-br-[10rem] rounded-tl-[5rem] lg:rounded-tl-[10rem] rounded-tr-2xl lg:rounded-tr-4xl ">
                </div>
            </div>
        </section>
    );
}