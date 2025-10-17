import React from 'react';
import AnimatedArrowButton from './ui/AnimatedArrowButton';
import RevealAll from './ui/RevealAll';
import HeadlineReveal from './ui/TextReveal';

export default function Hero() {
    return (
        <section className=" section-l-p section-r-p pt-30 sm:pt-52 lg:pt-52 relative overflow-hidden">
            <div
                aria-hidden="true"
                className="gradient-bg absolute top-5 lg:top-10 -right-70 w-100 h-90 md:w-130 md:h-110 rounded-full blur-3xl opacity-50"
            />
            <div className="mx-auto pb-12 md:pb-10 lg:pb-11 xl:pb-8  relative z-10">
                <HeadlineReveal
                    tag="h1"
                    text="We help brands build trust and loyalty."
                    duration={0.8}
                    stagger={0.04}
                    distance={60}
                    delay={0.1}
                    triggerOnView
                    className=""
                />
                <div className='flex flex-col-reverse md:flex-row md:justify-between md:items-center mt-7.5 lg:mt-9 gap-4'>
                    <div className="">
                        <AnimatedArrowButton label="Get Started" to="#contact" />
                    </div>
                    <HeadlineReveal
                        tag="p"
                        text="Secure product verification, protect supply chains, and turn each mobile scan into a trusted connection between your brand and customers."
                        duration={0.8}
                        stagger={0.04}
                        distance={60}
                        delay={0.1}
                        triggerOnView
                        className="text-fluid-body text-balance max-w-md"
                    />
                    
                </div>
                <div
                    className="
                        mt-16 lg:mt-18 w-full bg-[url('/herobg.jpg')] bg-cover bg-center 
                        h-[70vh] md:h-[80vh] lg:h-[73vh] xl:h-[84vh] 2xl:h-[70vh] max-h-[450px] xl:max-h-[550px] 2xl:max-h-[950px]
                        rounded-tl-[5rem] rounded-tr-2xl rounded-bl-2xl rounded-br-[5rem]
                        md:rounded-tl-[8.5rem] md:rounded-tr-[1.5rem] md:rounded-bl-[1.5rem] md:rounded-br-[8.5rem]
                        lg:rounded-tl-[10.5rem] lg:rounded-tr-[2rem] lg:rounded-bl-[2rem] lg:rounded-br-[10.5rem]
                        xl:rounded-tl-[16rem] xl:rounded-tr-[2.5rem] xl:rounded-bl-[2.5rem] xl:rounded-br-[16rem]
                        2xl:rounded-tl-[27rem] 2xl:rounded-tr-[5rem] 2xl:rounded-bl-[5rem] 2xl:rounded-br-[27rem] 
                    "
                />
                
            </div>
        </section>
    );
}