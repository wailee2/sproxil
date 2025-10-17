import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * RevealText (word-split version)
 * Splits the input on words and wraps each word in a span so words rise up instead of characters.
 * The outer wrapper is `inline-block overflow-visible` and has a transform style applied, per request.
 *
 * Props
 * - children | text: string - text to reveal (children preferred)
 * - speed: number - stagger between words (seconds)
 * - height: number - starting offset (px) the words rise from
 * - jump: number - small overshoot amount (px) for a "jump" effect
 * - duration: number - per-word easing duration (seconds)
 * - delay: number - initial delay before reveal starts (seconds)
 * - replayOnHover: boolean - replay animation when container is hovered
 * - className: string - extra classes for the outer wrapper
 * - onComplete: function - callback when animation completes
 * - tag: string|component - wrapper tag to render (default: span)
 */

export default function RevealText({
  children,
  text,
  speed = 0.08,
  height = 40,
  jump = 8,
  duration = 0.6,
  delay = 0,
  replayOnHover = false,
  className = "",
  onComplete,
  tag: Tag = "span",
  ...rest
}) {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);
  const tlRef = useRef(null);

  // Source text
  const source = (children ?? text ?? "").toString();

  // Split on words but keep the whitespace tokens so spacing is preserved.
  // Example: "Hello  world" => ["Hello", "  ", "world"]
  const tokens = source.split(/(\s+)/);

  // Helpers for refs
  const setWordRef = (el, i) => {
    wordsRef.current[i] = el;
  };

  useEffect(() => {
    // Cleanup any previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    // Filter nodes that have been assigned (only word spans, not whitespace)
    const nodes = wordsRef.current.filter(Boolean);
    if (!nodes.length) return;

    // Initial state: words below and hidden
    gsap.set(nodes, { y: height, opacity: 0 });

    const tl = gsap.timeline({ paused: false, delay });

    // Rise to overshoot then settle to y:0
    tl.to(nodes, {
      y: -jump,
      opacity: 1,
      duration: Math.max(0.01, duration * 0.6),
      ease: "power3.out",
      stagger: { each: speed, from: "start" }
    });

    tl.to(nodes, {
      y: 0,
      duration: Math.max(0.01, duration * 0.4),
      ease: "bounce.out",
      stagger: { each: speed, from: "start" }
    });

    tl.eventCallback("onComplete", () => onComplete && onComplete());

    tlRef.current = tl;

    // Optional replay on hover
    const container = containerRef.current;
    let enterHandler;
    if (replayOnHover && container) {
      enterHandler = () => tl.restart();
      container.addEventListener("mouseenter", enterHandler);
    }

    return () => {
      if (enterHandler && container) container.removeEventListener("mouseenter", enterHandler);
      tl.kill();
      tlRef.current = null;
    };
  }, [source, speed, height, jump, duration, delay, replayOnHover, onComplete]);

  return (
    <Tag
      ref={containerRef}
      aria-label={source}
      className={`inline-block overflow-visible ${className}`}
      style={{ transform: "translateY(0px) translateZ(0px)" }}
      {...rest}
    >
      {tokens.map((tok, i) => {
        // If the token is purely whitespace, render it plainly so spacing is preserved and it is not animated
        if (/^\s+$/.test(tok)) {
          // Render whitespace inside a span that preserves spacing (whitespace-pre)
          return (
            <span
              key={`ws-${i}`}
              aria-hidden
              className="whitespace-pre inline-block"
              // keep from being targeted by GSAP
              style={{ display: "inline-block" }}
            >
              {tok}
            </span>
          );
        }

        // Otherwise it's a word token — wrap in span and add ref for animation
        return (
          <span
            key={`w-${i}`}
            ref={(el) => setWordRef(el, i)}
            aria-hidden
            className="reveal-word inline-block leading-[1] whitespace-pre"
            style={{ willChange: "transform, opacity", marginRight: 0 }}
          >
            {tok}
          </span>
        );
      })}
    </Tag>
  );
}

/*
Usage notes (inside this file so you can copy/paste into your project):

- Install gsap: `npm install gsap`.
- This component preserves whitespace exactly as provided (including multiple spaces and line breaks).
- The outer wrapper uses `inline-block overflow-visible` and applies `transform: translateY(0px) translateZ(0px)` inline style — this helps avoid some browser subpixel/jank issues when animating.

Examples:

<RevealText text="Hello world, this is a word reveal" />

<RevealText
  text="Staggered word reveal"
  speed={0.06}      // slower stagger between words
  height={80}      // start 80px below
  jump={14}        // overshoot
  duration={0.8}   // per-word animation duration
  delay={0.15}     // initial delay
  replayOnHover    // replay when hovered
  className="text-xl font-medium"
/>

Accessibility:
- Outer element contains the full text in aria-label so screen readers read the sentence as one unit.
- Animated word spans are aria-hidden so screen readers won't read them twice.

SSR note:
If you render server-side, guard GSAP usage (e.g. dynamic import or `if (typeof window !== 'undefined')` before using GSAP) to avoid referencing `window` during build.
*/
