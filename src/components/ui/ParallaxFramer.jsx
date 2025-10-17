// ParallaxFramer.jsx
import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function ParallaxFramer() {
  const heroRef = useRef();
  const aboutRef = useRef();

  // a motion value we will drive from Lenis
  const y = useMotionValue(0);
  // transform values for parallax layers
  const heroY = useTransform(y, (v) => v * -0.06);   // hero moves slower
  const aboutInnerY = useTransform(y, (v) => v * -6); // about inner moves faster

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smooth: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // update motion value on lenis scroll
    lenis.on("scroll", (e) => {
      y.set(e.scroll); // e.scroll is the current scroll Y
    });

    return () => {
      lenis.destroy();
    };
  }, [y]);

  return (
    <div>
      <section ref={heroRef} className="relative h-screen bg-red-500 overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 flex items-center justify-center text-white text-6xl font-bold"
        >
          Hero section (behind)
        </motion.div>
      </section>

      <section ref={aboutRef} className="relative bg-green-500 min-h-[140vh]">
        <motion.div
          style={{ y: aboutInnerY }}
          className="max-w-3xl mx-auto p-12 text-white text-2xl"
        >
          <h2 className="text-4xl mb-6">About (scrolls over hero)</h2>
          <p>
            This content is driven by a motion value that gets updated by Lenis.
            The hero text uses a different transform multiplier so the speeds differ.
          </p>
          <div style={{ height: "80vh" }} />
        </motion.div>
      </section>
    </div>
  );
}
