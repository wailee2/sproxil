import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * RevealText
 * A small React component that reveals text by rising each character using GSAP.
 *
 * Props
 * - children | text: string - text to reveal (children preferred)
 * - speed: number - stagger between characters (seconds)
 * - height: number - starting offset (px) the chars rise from
 * - jump: number - small overshoot amount (px) for a "jump" effect
 * - duration: number - per-character easing duration (seconds)
 * - delay: number - initial delay before reveal starts (seconds)
 * - replayOnHover: boolean - replay animation when container is hovered
 * - className: string - extra classes for the outer wrapper
 * - onComplete: function - callback when animation completes
 */

export default function RevealText({
  children,
  text,
  speed = 0.03,
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
  const charsRef = useRef([]);
  const tlRef = useRef(null);

  // Helpers to split text while preserving spaces
  const source = children ?? text ?? "";
  const chars = Array.from(source);

  // Add character refs
  const setCharRef = (el, i) => {
    charsRef.current[i] = el;
  };

  useEffect(() => {
    // Clean previous timeline
    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    const nodes = charsRef.current.filter(Boolean);
    if (!nodes.length) return;

    // initial state: hidden below the container
    gsap.set(nodes, { y: height, opacity: 0 });

    const tl = gsap.timeline({ paused: false, delay });

    // rise to overshoot (negative y), then settle to 0
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
      enterHandler = () => {
        tl.restart();
      };
      container.addEventListener("mouseenter", enterHandler);
    }

    return () => {
      if (enterHandler && container) container.removeEventListener("mouseenter", enterHandler);
      tl.kill();
      tlRef.current = null;
    };
    // We intentionally depend on the text and animation props so changes replay animation
  }, [source, speed, height, jump, duration, delay, replayOnHover, onComplete]);

  // Render: outer container has aria-label for screen readers, inner chars are aria-hidden
  return (
    <Tag
      ref={containerRef}
      aria-label={source}
      className={`reveal-text-wrapper inline-block overflow-hidden ${className}`}
      {...rest}
    >
      {chars.map((ch, i) => {
        // preserve spaces visually
        const displayChar = ch === " " ? "\u00A0" : ch;
        return (
          <span
            key={i}
            ref={el => setCharRef(el, i)}
            aria-hidden
            className="reveal-char inline-block leading-[1] whitespace-pre"
            style={{ willChange: "transform, opacity" }}
          >
            {displayChar}
          </span>
        );
      })}
    </Tag>
  );
}

/*
Usage examples:

1) Simple usage (install gsap first: `npm install gsap`)

import RevealText from './RevealText';

<RevealText text="Hello world" />

2) Customize: speed (stagger), height (px), jump (px), duration (seconds)

<RevealText
  text="Custom reveal"
  speed={0.05}
  height={60}
  jump={12}
  duration={0.7}
  delay={0.2}
  replayOnHover={true}
  className="text-2xl font-semibold"
/>

3) Using children instead of text prop:

<RevealText speed={0.04} height={50} jump={6} duration={0.5}>
  Reveal me!
</RevealText>

Notes:
- This component does not use GSAP's paid SplitText plugin; it splits characters manually.
- For word-by-word reveals, you can modify the split logic to split on words and wrap each word in a span.
- If you use server-side rendering, guard GSAP use behind a window check or dynamically import.
*/
