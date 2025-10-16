import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedUnderline from './ui/AnimatedUnderline';
import AnimatedArrowButton from './ui/AnimatedArrowButton';
import { IoArrowForward } from "react-icons/io5";
import { Link } from 'react-router-dom';
import HideOnScroll from "./ui/HideOnScroll";

const navlink = [
  { name: 'home', slug: ""},
  { name: 'industries', slug: "industries",},
  { name: 'solutions', slug: "solutions",},
  { name: 'products', slug: "products",},
  { name: 'contact', slug: "contact",},
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

export default function Navbar({
    open = false,          // controlled open state
    setOpen = () => {},    // setter from parent
    renderToggleButton = false, // default: 
    overlayDuration = 0.25,
    mainDuration = 0.6,
}) {

    const iconAnim = `transform transition-all duration-500 ease-in-out`;
    const originalIconCls = `${iconAnim} opacity-100  group-hover:-translate-y-6 group-hover:translate-x-6 -rotate-45 group-hover:opacity-0`;
    const incomingIconCls = `${iconAnim} opacity-0 group-hover:translate-x-0 group-hover:rotate-0 group-hover:opacity-100 -translate-x-6 -rotate-12`;

    useEffect(() => {
        function onKey(e) {
        if (e.key === "Escape") setOpen(false);
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [setOpen]);

    return (
        <div className="lg:hidden">
            

            {/* Overlay: white fade-in. Controlled via `open` and overlayDuration prop */}
            <AnimatePresence>
                {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: overlayDuration }}
                    className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
                    onClick={() => setOpen(false)}
                    aria-hidden={!open}
                />
                )}
            </AnimatePresence>

            {/* Red panel */}
            <AnimatePresence>
                {open && (
                <motion.div
                    initial={{ y: "100%", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    animate={{ y: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    exit={{ y: "100%", borderTopLeftRadius: "20%", borderTopRightRadius: "20%" }}
                    transition={{ duration: mainDuration, ease: "easeInOut", delay: overlayDuration }}
                    className="fixed top-0 left-0 right-0 bottom-0 z-60 h-screen overflow-auto bg-[#0f0a0a] text-white rounded-t-[20rem] shadow-2xl"
                >
                    <div className=" mx-auto p-4 gap-4 w-full h-full flex flex-col sm:flex-row min-h-0 overflow-y-auto">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 1}}
                            transition={{ duration: 1.5, delay: 0, ease: "easeOut" }}
                            className="bg-white py-4 px-8 sm:px-14 sm:w-1/2 rounded-2xl flex flex-col justify-between min-h-0 overflow-auto"
                        >
                            <span className="text-sm sm:text-xl font-semibold text-black">Navigation</span>
                            {navlink.map((n) => (
                                <Link
                                    to={`/${n.slug}`}
                                    key={n.name}
                                    className="w-full"
                                >
                                    <div className="text-black border-t-2 w-full border-gray-200 py-1 sm:py-3">
                                        <span className="capitalize text-[32px] sm:text-5xl font-semibold ">{n.name}</span>
                                    </div>
                                </Link>
                            ))}
                        </motion.div>
                        <div className="flex flex-col sm:w-1/2 gap-4 min-h-0">
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 300, opacity: 0}}
                                transition={{ duration: 1.5, delay: 0, ease: "easeInOut" }}
                                className="bg-white flex flex-col justify-between py-4 px-8 sm:px-14 md:px-20 rounded-2xl w-full h-full min-h-0 overflow-auto"
                            >
                                <div className="mb-1.5">
                                    <span className="text-2xl sm:text-[32px] font-semibold text-black">Our Socials</span>
                                </div>
                                {sociallink.map((s) => (
                                    <div className='text-black flex justify-between'>
                                        <AnimatedUnderline
                                            key={s.name}
                                            as="a"
                                            href={s.slug}
                                            className=' bg-black'
                                        >
                                            <div className="flex items-center gap-3 mb-1">
                                                <img
                                                    src={s.image}
                                                    alt={`${s.name} logo`}
                                                    loading="lazy"
                                                    className="w-5 h-5 sm:w-6 sm:h-6"
                                                />
                                                <span className='text-lg sm:text-xl capitalize'>{s.name}</span>
                                            </div>
                                        </AnimatedUnderline>
                                    </div>
                                ))}
                            </motion.div>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: 500, opacity: 0 }}
                                transition={{ duration: 1.5, delay: 0, ease: "easeInOut" }}
                                className="h-full w-full rounded-2xl relative overflow-hidden section-bsg bg-red-950"
                            >
                                <div
                                    aria-hidden="true"
                                    className="gradient-bg absolute -bottom-15 -right-10 sm:-bottom-40 sm:-right-10 w-30 h-30 sm:w-70 sm:h-70 rounded-full blur-2xl opacity-40"
                                />
                                <Link
                                    to='/login'
                                    className="z-10 relative h-full w-full rounded-2xl group flex gap-4 justify-center items-center overflow-hidden px-3 sm:py-1.5"
                                >
                                    <span className="text-nowdrap font-semibold text-white text-[30px] sm:text-[40px]">Sign in</span>
                                    <div
                                        className={`p-5 sm:p-7.5 rounded-full text-[1.7rem] sm:text-[2rem] shadow-md flex items-center justify-center relative overflow-hidden bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-red-950`}
                                        aria-hidden={false}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none ">
                                            <span className={originalIconCls}>
                                                <IoArrowForward className={``} />
                                            </span>
                                        </div>
                                
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <span className={incomingIconCls}>
                                                <IoArrowForward className={``} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        </div>


                        {/** 
                        <div className="mt-8 text-sm opacity-80">
                            Press <kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> to close
                        </div>*/}
                    </div>
                </motion.div>
                )}
            </AnimatePresence>

            {renderToggleButton && open && (
                <HideOnScroll
                    topOffset={10}
                    className="fixed top-4.5  right-6.5 sm:right-[4%] z-70 "
                >
                    <button
                        onClick={() => setOpen((s) => !s)}
                        className=" nav-button "
                    >
                        {open ? "close •" : "menu  •"}
                    </button>
                </HideOnScroll>
            )}
        </div>
    );
}
