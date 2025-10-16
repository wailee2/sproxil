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
    name: 'Facebook', image: '/bliss.png',
    slug: "http://facebook.com/",
  },
  {
    name: 'x', image: '/bliss.png',
    slug: "http://x.com/",
  },
  {
    name: 'linkedin', image: '/bliss.png',
    slug: "http://linkedin.com/",
  },
  {
    name: 'instagram', image: '/bliss.png',
    slug: "http://instagram.com/",
  },
];

export default function Navbar({
    open = false,          // controlled open state
    setOpen = () => {},    // setter from parent
    renderToggleButton = false, // default: 
    overlayDuration = 0.25,
    mainDuration = 0.6,
    items = null,
}) {
    const defaultItems = [
        { bg: "bg-green-500", translate: 24, duration: 0.35, delay: 0.06, drag: false },
        { bg: "bg-blue-500", translate: 20, duration: 0.45, delay: 0.12, drag: false },
        { bg: "bg-yellow-400", translate: 16, duration: 0.7, delay: 0.22, drag: true },
    ];
    const cfg = items && items.length === 3 ? items : defaultItems;

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
                    initial={{ y: "100%", borderTopLeftRadius: "20rem", borderTopRightRadius: "20rem" }}
                    animate={{ y: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
                    exit={{ y: "100%", borderTopLeftRadius: "20rem", borderTopRightRadius: "20rem" }}
                    transition={{ duration: mainDuration, ease: "easeInOut", delay: overlayDuration }}
                    className="fixed left-0 right-0 bottom-0 z-60 h-screen max-h-screen bg-[#0f0a0a] text-white rounded-t-[20rem] shadow-2xl"
                    style={{ paddingTop: 'env(safe-area-inset-top)' }}
                >
                    <div className=" mx-auto p-4 gap-4 w-full h-full bg-amber-400 flex flex-col sm:flex-row min-h-0 overflow-y-auto">
                        <div className="bg-white py-4 px-8 sm:px-14 sm:w-1/2 rounded-2xl flex flex-col justify-between min-h-0 overflow-auto">
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
                        </div>
                        <div className="flex flex-col sm:w-1/2 gap-4 min-h-0 overflow-auto">
                            <div className="bg-white py-4 px-8 sm:px-14 md:px-20 rounded-2xl w-full h-full min-h-0 overflow-auto">
                                <span className="text-2xl sm:text-[32px] font-semibold text-black">Our Socials</span>
                                {sociallink.map((s) => (
                                    <div className='text-black flex '>
                                        
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
                                                    className="w-4 h-4 sm:w-6 sm:h-6 rounded-full object-cover"
                                                />
                                                <span className='text-lg sm:text-xl capitalize'>{s.name}</span>
                                            </div>
                                        </AnimatedUnderline>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to='/login'
                                className="bg-green-600 relative h-full w-full rounded-2xl group flex gap-4 justify-center items-center overflow-hidden px-3 sm:py-1.5"
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
                        </div>




                        {/** 
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                            {cfg.map((c, i) => (
                            <motion.div
                                key={i}
                                drag={c.drag}
                                dragConstraints={{ top: -20, bottom: 20, left: -10, right: 10 }}
                                initial={{ y: c.translate, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: c.translate, opacity: 0 }}
                                transition={{ duration: c.duration, delay: c.delay, ease: "easeOut" }}
                                className={`rounded-xl p-6 ${c.bg} text-white min-h-[8rem] flex items-center justify-center`}
                            >
                                <div className="text-center">
                                <div className="font-semibold text-lg">Box {i + 1}</div>
                                <div className="text-sm opacity-90">drag: {String(Boolean(c.drag))}</div>
                                </div>
                            </motion.div>
                            ))}
                        </div>

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
