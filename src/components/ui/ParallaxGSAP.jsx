// ParallaxGSAP.jsx
import React, { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ParallaxGSAP() {
  const wrapper = useRef();
  const heroRef = useRef();
  const aboutRef = useRef();

  useEffect(() => {
    // init Lenis (if you already have a Lenis instance from your provider,
    // use that instead of creating a new one)
    const lenis = new Lenis({ duration: 1.2, smooth: true, lerp: 0.08 });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Integrate with ScrollTrigger
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      // use transform when lenis transforms the container
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    // refresh ScrollTrigger after resize / init
    ScrollTrigger.addEventListener("refresh", () => lenis && lenis.raf());
    ScrollTrigger.refresh();

    // --- Animations ---
    // Pin the hero while about scrolls over it
    ScrollTrigger.create({
      trigger: aboutRef.current,
      start: "top top",
      end: () => `+=${aboutRef.current.offsetHeight}`,
      pin: heroRef.current, // pin hero in place (it will stay below the about)
      pinSpacing: false,    // control spacing if you like
      scrub: true,
      scroller: document.documentElement,
    });

    // Parallax the hero text up slowly while about scrolls
    gsap.to(heroRef.current.querySelector(".hero-text"), {
      yPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        scroller: document.documentElement,
      },
    });

    // Parallax inner about text at a different speed (move slower)
    gsap.to(aboutRef.current.querySelector(".about-inner"), {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        scroller: document.documentElement,
      },
    });

    return () => {
      ScrollTrigger.killAll();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapper}>
      <section ref={heroRef} className="relative h-screen bg-red-500">
        <div className="hero-text absolute inset-0 flex items-center justify-center text-white text-6xl font-bold">
          Hero section (behind)
        </div>
      </section>

      <section ref={aboutRef} className="relative bg-green-500 min-h-[140vh]">
        <div className="about-inner max-w-3xl mx-auto p-12 text-white text-2xl">
          <h2 className="text-4xl mb-6">About (scrolls over hero)</h2>
          <p>
            This section scrolls *over* the hero. The hero text moves at a
            different speed (parallax). Add more content here to create the
            overlap and scrolling distance.
          </p>
          <div style={{ height: "80vh" }} /> {/* spacer so there's enough scroll */}
        </div>
      </section>
    </div>
  );
}
