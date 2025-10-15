import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navlink = [
  { name: 'home', slug: "/"},
  { name: 'industries', slug: "/"},
  { name: 'solution', slug: "/"},
  { name: 'home', slug: "/"},
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
                    className="fixed left-0 right-0 bottom-0 z-60 min-h-screen bg-[#0f0a0a] text-white rounded-t-[20rem] shadow-2xl"
                >
                    <div className=" mx-auto p-4 gap-4 w-full flex flex-col sm:flex-row">
                        <div className="bg-white py-4 px-8 sm:px-14 md:px-20 text-base sm:text-xl w-full rounded-3xl">
                            <span className="text-base font-semibold text-black">Navigation</span>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Industries</a></li>
                                <li><a href="#">Solutions</a></li>
                                <li><a href="#">Products</a></li>
                            </ul>
                        </div>
                        <div className="bg-white px-8 sm:px-14 md:px-20 text-base sm:text-xl w-full">je</div>

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
                <button
                    onClick={() => setOpen((s) => !s)}
                    className="absolute top-3 h-7.5 sm:h-15 right-6 sm:right-[4%] z-70 nav-button lg:hidden"
                >
                    {open ? "close •" : "menu  •"}
                </button>
            )}
        </div>
    );
}
