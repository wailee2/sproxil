import React, { useEffect, useRef, useState } from "react";

/**
 * HideOnScroll
 * React + Tailwind v4 component
 * - Stays fixed at the top (top-0)
 * - Hides when scrolling DOWN and shows when scrolling UP by default
 * - Pass invert={true} to reverse behaviour (hide on UP, show on DOWN)
 * - Lightweight rAF-based scroll handler for performance
 *
 * Props:
 * - children: react nodes placed inside the header
 * - className: additional tailwind classes for the header container
 * - invert: boolean, flip show/hide logic
 * - threshold: number (px) minimal scroll delta to trigger hide/show
 * - topOffset: number (px) amount of scroll from top to allow automatic hiding
 *
 * Example usage:
 * <HideOnScroll>
 *   <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">...nav items...</nav>
 * </HideOnScroll>
 */

export default function HideOnScroll({
  children,
  className = "bg-white/80 backdrop-blur-sm",
  invert = false,
  threshold = 2,
  topOffset = 40,
}) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY || 0;
        const delta = currentY - lastY.current;

        // ignore tiny scrolls
        if (Math.abs(delta) < threshold) {
          // do nothing
        } else {
          // default: hide on scroll DOWN (delta > 0), show on UP (delta < 0)
          const scrolledEnoughFromTop = currentY > topOffset;
          let shouldHide = delta > 0 && scrolledEnoughFromTop;
          if (invert) shouldHide = !shouldHide;

          setHidden(shouldHide);
        }

        lastY.current = currentY;
        ticking.current = false;
      });
    }

    // initialise lastY for SSR-safe mount
    lastY.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, invert, topOffset]);

  return (
    <div
      aria-hidden={hidden}
      className={` z-50 transform transition-transform duration-500 ease-in-out ${
        hidden ? "-translate-y-full pointer-events-none" : "translate-y-0"
      } ${className}`}
    >
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
