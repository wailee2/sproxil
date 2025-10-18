import React, { useState } from "react";
import Navmenu from "./Navmenu";
import HideOnScroll from "./ui/HideOnScroll-with-Lenis.jsx";
import AnimatedArrowButton from "./ui/AnimatedArrowButton";
import { Link } from 'react-router-dom';

const navlink = [
  { name: 'industries', slug: "industries",},
  { name: 'solutions', slug: "solutions",},
  { name: 'products', slug: "products",},
  { name: 'contact', slug: "contact",},
];

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header>
            <HideOnScroll className="fixed w-full">
                <nav className="mx-auto flex items-center justify-between relative bg-gray-100 border-b-1 border-gray-300 section-l-p section-r-p py-3">
                    <Link
                        to='/'
                    >
                        <img
                            src="/sproxil.png"
                            alt="sproxil logo"
                            className="w-30 sm:w-35"
                        />
                    </Link>

                    <div className="hidden lg:flex gap-6 text-[#484c48] text-lg">
                    {navlink.map((n) => (
                        <Link
                            to={`/${n.slug}`}
                            key={n.name}
                            className="capitalize"
                        >
                            {n.name}
                        </Link>
                    ))}
                    </div>

                    <div className="hidden lg:block"></div>

                    <div className="flex gap-4">
                        <div className="hidden sm:block">
                            <AnimatedArrowButton label="Get Started" to="#contact" />
                        </div>
                        <button
                            onClick={() => setOpen((s) => !s)}
                            aria-expanded={open}
                            aria-label={open ? "Close menu" : "Open menu"}
                            className="nav-button lg:hidden text-nowrap"
                        >
                            {open ? "close •" : "menu •"}
                        </button>
                    </div>
                </nav>
                <div className=" flex justify-between w-full pointer-events-none">
                    <div class="w-27 h-27 -rotate-48 relative -top-11 -left-13 pointer-events-none">
                        <svg 
                            viewBox="0 0 200 200"
                            class="w-full h-full"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            >

                            <path d="M100 0 L200 180 Q100 60 0 180 Z" class="fill-gray-100" />

                            <path
                                d="M200 180 Q100 60 0 180"
                                class="stroke-gray-300"
                                fill="none"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                    <div class="w-27 h-27 rotate-48 relative -top-11 -right-13 pointer-events-none">
                        <svg 
                            viewBox="0 0 200 200"
                            class="w-full h-full"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            >

                            <path d="M100 0 L200 180 Q100 60 0 180 Z" class="fill-gray-100" />

                            <path
                                d="M200 180 Q100 60 0 180"
                                class="stroke-gray-300"
                                fill="none"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </div>
                </div>

            </HideOnScroll>

            {/* Navmenu is rendered outside the HideOnScroll, controlled by open/setOpen */}
            <Navmenu
                open={open}
                setOpen={setOpen}
                renderToggleButton={true}
                overlayDuration={0.18}
                mainDuration={0.6}
            />
        </header>
    );
}
