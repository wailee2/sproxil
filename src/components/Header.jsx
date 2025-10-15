import React, { useState } from "react";
import Navbar from "./Navbar";
import HideOnScrollHeader from "./ui/HideOnScrollHeader";
import AnimatedArrowButton from "./ui/AnimatedArrowButton";

export default function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <HideOnScrollHeader className="fixed bg-gray-100 section-l-p section-r-p py-3">
                <nav className="mx-auto flex items-center justify-between relative">
                    <img
                        src="/sproxil.png"
                        alt="sproxil logo"
                        className="w-30 sm:w-35"
                    />

                    <ul className="hidden lg:flex gap-6 text-gray-800 font-medium">
                        <li><a href="#home" className="hover:text-green-700 transition-colors">Home</a></li>
                        <li><a href="#about" className="hover:text-green-700 transition-colors">About</a></li>
                        <li><a href="#services" className="hover:text-green-700 transition-colors">Services</a></li>
                        <li><a href="#contact" className="hover:text-green-700 transition-colors">Contact</a></li>
                    </ul>

                    <div className="flex gap-4">
                        <div className="hidden sm:block">
                            <AnimatedArrowButton label="Get Started" to="#contact" />
                        </div>
                        <button
                            onClick={() => setOpen((s) => !s)}
                            aria-expanded={open}
                            aria-label={open ? "Close menu" : "Open menu"}
                            className="nav-button lg:hidden"
                        >
                            {open ? "close •" : "menu •"}
                        </button>
                    </div>
                </nav>
            </HideOnScrollHeader>

            {/* Navbar is rendered outside the HideOnScrollHeader, controlled by open/setOpen */}
            <Navbar 
                open={open}
                setOpen={setOpen}
                renderToggleButton={true}
                overlayDuration={0.18}
                mainDuration={0.55}
            />
        </>
    );
}
