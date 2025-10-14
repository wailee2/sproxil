/*
InfiniteCarousel.jsx
React + Tailwind v4 component — True infinite loop carousel (self-replicating), full-bleed width.

Improvements in this version:
- Automatically repeats (replicates) the children enough times to fill the viewport so there's no gap.
- Uses a measurement of a single "set" of children to compute how many copies are needed.
- Keeps only one measurement ref (`setRef`) and duplicates setsCount times inside the scroller.
- Smooth velocity interpolation and wrap-around logic using the measured set width.
- Full-viewport width by default (`w-screen max-w-none`), but still accepts `className` and `style` overrides.
- Keeps previous features: pause on hover, change direction on page scroll/wheel/touch, only animate while visible.

Usage notes:
- Pass card elements as children (each child should use `flex-shrink-0` or `inline-block` so widths don't collapse).
- The component ensures the total repeated width >= container width so the loop is seamless.
*/

import React, { useEffect, useRef, useState } from "react";

export default function InfiniteCarousel({
  children,
  speed = 60, // px per second
  direction = "left", // 'left' | 'right' initial moving direction
  onScrollUp = "left",
  onScrollDown = null,
  pauseOnHover = true,
  className = "",
  style = {},
  minSets = 20, // minimum number of repeated sets
}) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const setRef = useRef(null); // measure one set

  const setWidthRef = useRef(0); // width of one set (one repetition of children)
  const containerWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const targetVelRef = useRef((direction === "left" ? -1 : 1) * speed);
  const currentVelRef = useRef(targetVelRef.current);
  const animRef = useRef(null);
  const lastTRef = useRef(null);
  const inViewRef = useRef(false);
  const lastScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);

  const [setsCount, setSetsCount] = useState(minSets);

  const scrollDownDirection = onScrollDown || direction;

  // measure function: measure set width and container width and compute setsCount
  useEffect(() => {
    if (typeof window === "undefined") return;

    function measure() {
      const container = containerRef.current;
      const setEl = setRef.current;
      if (!container || !setEl) return;

      const cw = Math.ceil(container.getBoundingClientRect().width);
      const sw = Math.ceil(setEl.getBoundingClientRect().width) || 1;

      containerWidthRef.current = cw;
      setWidthRef.current = sw;

      // compute how many sets we need so that total width >= container width + one set (buffer)
      const required = Math.max(minSets, Math.ceil((cw + sw) / sw));
      // add extra 1 to avoid edge gaps when wrapping
      const recommended = required + 1;
      if (recommended !== setsCount) setSetsCount(recommended);
    }

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    if (setRef.current) ro.observe(setRef.current);
    window.addEventListener("resize", measure);

    // ensure measure happens after images/fonts loaded
    window.requestAnimationFrame(measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children, minSets, setsCount]);

  // intersection observer to only animate when visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          inViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0;
        });
      },
      { threshold: [0, 0.01, 0.5] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // animation loop
  useEffect(() => {
    function step(t) {
      if (!lastTRef.current) lastTRef.current = t;
      const dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;

      // smooth velocity interpolation
      const cur = currentVelRef.current;
      const targ = targetVelRef.current;
      const factor = 0.12;
      currentVelRef.current = cur + (targ - cur) * factor;

      if (inViewRef.current && scrollerRef.current) {
        offsetRef.current += currentVelRef.current * dt;

        const sw = setWidthRef.current || (setRef.current ? setRef.current.offsetWidth : 1);

        // wrap-around using setWidth so we always keep offset in (-sw, 0]
        if (sw > 0) {
          if (offsetRef.current <= -sw) offsetRef.current += sw;
          if (offsetRef.current > 0) offsetRef.current -= sw;
        }

        scrollerRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }

      animRef.current = requestAnimationFrame(step);
    }

    animRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(animRef.current);
      lastTRef.current = null;
    };
  }, []);

  // update velocity when props change
  useEffect(() => {
    targetVelRef.current = (direction === "left" ? -1 : 1) * speed;
  }, [direction, speed]);

  // scroll/wheel/touch handlers to change direction
  useEffect(() => {
    function handleWheel(e) {
      if (!inViewRef.current) return;
      if (e.deltaY < 0) {
        // user scrolling up
        const dir = onScrollUp === "left" ? -1 : 1;
        targetVelRef.current = dir * speed;
      } else if (e.deltaY > 0) {
        const dir = scrollDownDirection === "left" ? -1 : 1;
        targetVelRef.current = dir * speed;
      }
    }

    let touchStartY = null;
    function handleTouchStart(e) {
      touchStartY = e.touches ? e.touches[0].clientY : null;
    }
    function handleTouchMove(e) {
      if (!inViewRef.current) return;
      if (!touchStartY) return;
      const y = e.touches ? e.touches[0].clientY : 0;
      const dy = touchStartY - y;
      if (dy > 2) {
        const dir = scrollDownDirection === "left" ? -1 : 1;
        targetVelRef.current = dir * speed;
      } else if (dy < -2) {
        const dir = onScrollUp === "left" ? -1 : 1;
        targetVelRef.current = dir * speed;
      }
    }

    function handleScroll() {
      if (!inViewRef.current) return;
      const cur = window.scrollY;
      const dy = cur - lastScrollYRef.current;
      if (dy > 0) {
        const dir = scrollDownDirection === "left" ? -1 : 1;
        targetVelRef.current = dir * speed;
      } else if (dy < 0) {
        const dir = onScrollUp === "left" ? -1 : 1;
        targetVelRef.current = dir * speed;
      }
      lastScrollYRef.current = cur;
    }

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onScrollUp, scrollDownDirection, speed]);

  // pause on hover
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !pauseOnHover) return;
    function enter() {
      targetVelRef.current = 0;
    }
    function leave() {
      targetVelRef.current = (direction === "left" ? -1 : 1) * speed;
    }
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover, direction, speed]);

  // prepare children array
  const kids = React.Children.toArray(children).map((c, i) => (
    <div key={`kid-${i}`} className="inline-block flex-shrink-0">
      {c}
    </div>
  ));

  // build repeated sets: each set is the group of kids
  const sets = [];
  for (let s = 0; s < Math.max(minSets, setsCount); s++) {
    // attach ref to the first set to measure its width
    if (s === 0) {
      sets.push(
        <div key={`set-${s}`} ref={setRef} className="flex items-stretch whitespace-nowrap">
          {kids}
        </div>
      );
    } else {
      sets.push(
        <div key={`set-${s}`} className="flex items-stretch whitespace-nowrap" aria-hidden>
          {kids}
        </div>
      );
    }
  }

  return (
    <div
      ref={containerRef}
      className={`w-screen max-w-none overflow-hidden relative ${className}`}
      style={{ ...style }}
      aria-hidden={false}
    >
      <div
        ref={scrollerRef}
        className="flex items-s\tretch whitespace-nowrap will-change-transform"
        style={{ transform: "translateX(0px)" }}
      >
        {sets}
      </div>
    </div>
  );
}

/*
Usage (same as before):

<InfiniteCarousel
  speed={80}
  direction="left"
  onScrollUp="left"
  onScrollDown="right"
  pauseOnHover={true}
  className="py-6"
>
  {cards.map(card => (
    <Card key={card.id} className="w-48 h-36" />
  ))}
</InfiniteCarousel>

Notes:
- Make sure each child (card) has a fixed width (or at least uses `flex-shrink-0`) so the measurements are stable.
- The component automatically increases the number of repeated sets so the total repeated width exceeds the viewport width + one set buffer. That ensures a seamless loop.
- If you still see gaps, ensure your children do not have percentage widths tied to the parent's width (that can change when the sets repeat) and that images are loaded (the ResizeObserver re-measures on resize).
*/