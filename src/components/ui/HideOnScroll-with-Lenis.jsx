import React, { useEffect, useRef, useState } from "react";
import { useLenis } from "../../LenisProvider";

/**
 * HideOnScroll (Lenis-aware)
 * - Import and use the LenisProvider at the app root
 * - This component reads the Lenis instance from the provider via useLenis()
 */
export default function HideOnScroll({
  children,
  className = "bg-white/80 backdrop-blur-sm",
  invert = false,
  threshold = 2,
  topOffset = 40,
}) {
  const lenisRef = useLenis();
  const lenis = lenisRef?.current;

  const [hidden, setHidden] = useState(false);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  // initialize lastY using lenis.scroll if available
  useEffect(() => {
    if (lenis && typeof lenis.scroll === 'number') {
      lastY.current = lenis.scroll;
    } else if (typeof window !== 'undefined') {
      lastY.current = window.scrollY || 0;
    }
  }, [lenis]);

  useEffect(() => {
    function handleScrollCurrentY(currentY) {
      const delta = currentY - lastY.current;
      if (Math.abs(delta) < threshold) {
        // ignore
      } else {
        const scrolledEnoughFromTop = currentY > topOffset;
        let shouldHide = delta > 0 && scrolledEnoughFromTop; // hide on down
        if (invert) shouldHide = !shouldHide;
        setHidden(shouldHide);
      }
      lastY.current = currentY;
    }

    if (lenis && typeof lenis.on === 'function') {
      const onLenisScroll = (evt) => {
        const currentY = (evt && typeof evt === 'object' && typeof evt.scroll === 'number') ? evt.scroll : (typeof evt === 'number' ? evt : (window.scrollY || 0));
        handleScrollCurrentY(currentY);
      };

      lenis.on('scroll', onLenisScroll);
      return () => {
        try { lenis.off('scroll', onLenisScroll); } catch (e) {}
      };
    }

    // fallback to native scroll
    let ticking = false;
    function onNativeScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        handleScrollCurrentY(currentY);
        ticking = false;
      });
    }

    if (typeof window !== 'undefined') window.addEventListener('scroll', onNativeScroll, { passive: true });

    return () => {
      if (typeof window !== 'undefined') window.removeEventListener('scroll', onNativeScroll);
    };
  }, [lenis, threshold, invert, topOffset]);

  return (
    <div
      aria-hidden={hidden}
      className={`z-50 transform transition-transform duration-800 ease-in-out ${
        hidden ? "-translate-y-[150%] pointer-events-none" : "translate-y-0"
      } ${className}`}
    >
      <div className="w-full">{children}</div>
    </div>
  );
}


// Usage notes (include in your app root, e.g. src/main.jsx or App.jsx):
// import { LenisProvider } from './lenis/LenisProvider';
// import HideOnScroll from './components/HideOnScroll';
//
// <LenisProvider options={{ duration: 1.2 }}>
//   <HideOnScroll> ... nav ... </HideOnScroll>
//   <MainAppContent />
// </LenisProvider>
