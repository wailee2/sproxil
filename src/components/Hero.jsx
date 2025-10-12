import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward } from "react-icons/io5";
import AnimatedArrowButton from './ui/AnimatedArrowButton';

export default function Hero() {
  return (
    <section className="bg-white">
        <div className="mx-auto py-20">
            <div>
                <p className="mb-3 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">For Donors • Pharma • FMCG</p>
                <h1 className="text-8xl 2xl:text-9xl max-w-[75%] font-semibold tracking-tight text-black">
                We help brands build trust and loyalty.
                </h1>
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-4">
                        <AnimatedArrowButton label="Get Started" to="#contact" />
                    </div>
                    <p className=" text-xl text-black max-w-md">Secure product verification, protect supply chains, and turn each mobile scan into a trusted connection between your brand and customers.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="text-sm text-slate-600">
                        <div className="font-semibold text-slate-900">99.9%</div>
                        <div>Uptime</div>
                    </div>
                    <div className="text-sm text-slate-600">
                        <div className="font-semibold text-slate-900">50+</div>
                        <div>Brands Served</div>
                    </div>
                    <div className="text-sm text-slate-600">
                        <div className="font-semibold text-slate-900">2M+</div>
                        <div>Verifications</div>
                    </div>
                    <div className="text-sm text-slate-600">
                        <div className="font-semibold text-slate-900">PCI & ISO</div>
                        <div>Compliant</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
}