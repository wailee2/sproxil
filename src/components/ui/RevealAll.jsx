import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * RevealAll
 * A simple React component that reveals the *entire* text at once (no stagger).
 * - Starts invisible and translated down, then moves up into place.
 * - Controls:
 *   - distance (px): how far down it starts (you requested "allow distance in usage")
 *   - speed (s): how long the reveal animation takes (you requested "allow speed setting in usage")
 *   - delay (s): initial delay before the animation starts
 *   - replayOnHover: restart animation when hovered
 *
 * Props:
 * - children | text: string
 * - distance: number (px) default 40
 * - speed: number (seconds) default 0.6
 * - delay: number (seconds) default 0
 * - ease: string|function - gsap easing, default "power3.out"
 * - replayOnHover: boolean
 * - className: string
 * - onComplete: fn
 * - tag: string|component - wrapper tag (default: span)
 */
export default function RevealAll({
  children,
  text,
  distance = 40,
  speed = 0.6,
  delay = 0,
  ease = "power3.out",
  replayOnHover = false,
  className = "",
  onComplete,
  tag: Tag = "span",
  ...rest
}) {
  const containerRef = useRef(null);
  const tlRef = useRef(null);
  const source = (children ?? text ?? "").toString();

  useEffect(() => {
    // guard for SSR
    if (typeof window === "undefined") return;

    const el = containerRef.current;
    if (!el) return;

    // cleanup previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    // initial state: invisible and down by distance
    gsap.set(el, { y: distance, opacity: 0 });

    const tl = gsap.timeline({ paused: false, delay });
    tl.to(el, { y: 0, opacity: 1, duration: Math.max(0.01, speed), ease });
    tl.eventCallback("onComplete", () => onComplete && onComplete());
    tlRef.current = tl;

    // optional replay on hover
    let enterHandler;
    if (replayOnHover) {
      enterHandler = () => tl.restart();
      el.addEventListener("mouseenter", enterHandler);
    }

    return () => {
      if (enterHandler) el.removeEventListener("mouseenter", enterHandler);
      tl.kill();
      tlRef.current = null;
    };
  }, [source, distance, speed, delay, ease, replayOnHover, onComplete]);

  return (
    <Tag
      ref={containerRef}
      aria-label={source}
      className={`inline-block overflow-visible ${className}`}
      style={{ transform: "translateY(0px) translateZ(0px)", whiteSpace: "normal", display: "inline-block" }}
      {...rest}
    >
      {source}
    </Tag>
  );
}

/*
Usage example:

<RevealAll
  text="All words rise together, no stagger. This wraps nicely across lines." 
  distance={80}     // pixels the text starts below
  speed={0.9}       // animation duration in seconds
  delay={0.1}
  replayOnHover
  className="text-lg font-medium"
/>

Notes:
- This component animates the entire text node as one unit, so there's NO per-word stagger.
- For accessibility the full text is exposed via aria-label and the visible content is the same text.
- If you'd like the text split into spans but still animate all of them simultaneously (for per-word styles),
  tell me and I can add a `wrapWords` boolean that wraps words while still using a single simultaneous animation.
*/
