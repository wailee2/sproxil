import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

/**
 * TextReveal — clip-path version to avoid layout jumps
 * 
 * <HeadlineReveal
      tag="h1"
      text="We help you start real companies"
      duration={0.8}
      stagger={0.04}
      distance={60}
      delay={0.1}
      triggerOnView
      className="text-[48px]"
    />
 */
export default function TextReveal({
  children,
  text,
  duration = 0.7,
  stagger = 0.04,
  distance = 60,
  delay = 0,
  ease = "power3.out",
  className = "",
  triggerOnView = true,
  onComplete,
  tag: Tag = "span",
  ...rest
}) {
  const source = (children ?? text ?? "").toString();

  const tokens = source.match(/\S+|\s+/g) || [];

  const rootRef = useRef(null);
  const innerRefs = useRef([]);
  const maskRefs = useRef([]);
  const tlRef = useRef(null);

  const setInnerRef = (el, i) => (innerRefs.current[i] = el);
  const setMaskRef = (el, i) => (maskRefs.current[i] = el);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (tlRef.current) {
      tlRef.current.kill();
      tlRef.current = null;
    }

    const nodes = innerRefs.current.filter(Boolean);
    const masks = maskRefs.current.filter(Boolean);
    if (!nodes.length || nodes.length !== masks.length) return;

    // initial states
    // inner: start translated down and invisible
    gsap.set(nodes, { y: distance, opacity: 0, force3D: true, willChange: "transform, opacity" });

    // masks: use clip-path to hide from the top (doesn't change layout)
    masks.forEach((m) => {
      // ensure clip-path set; keep overflow visible so layout doesn't change
      m.style.overflow = "visible";
      m.style.clipPath = "inset(100% 0 0 0)";
      m.style.webkitClipPath = "inset(100% 0 0 0)";
      // ensure inline-block measures consistently
      m.style.display = "inline-block";
      m.style.lineHeight = "1";
    });

    const build = () => {
      const tl = gsap.timeline({ paused: false, delay });

      // reveal mask (clip-path) and animate inner simultaneously.
      // we set both timelines to start at 0 so they act together and use the same stagger.
      const staggerConfig = stagger > 0 ? { each: stagger, from: "start" } : 0;

      tl.to(
        masks,
        {
          clipPath: "inset(0% 0 0 0)",
          webkitClipPath: "inset(0% 0 0 0)",
          duration: Math.max(0.01, duration),
          ease,
          stagger: staggerConfig
        },
        0
      );

      tl.to(
        nodes,
        {
          y: 0,
          opacity: 1,
          duration: Math.max(0.01, duration),
          ease,
          stagger: staggerConfig
        },
        0
      );

      tl.eventCallback("onComplete", () => {
        onComplete && onComplete();
      });

      tlRef.current = tl;
    };

    if (triggerOnView && rootRef.current) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              build();
              obs.disconnect();
            }
          });
        },
        { threshold: 0.15 }
      );
      obs.observe(rootRef.current);
      return () => {
        obs.disconnect();
        if (tlRef.current) tlRef.current.kill();
      };
    }

    build();

    return () => {
      if (tlRef.current) tlRef.current.kill();
      tlRef.current = null;
    };
  }, [source, duration, stagger, distance, delay, ease, triggerOnView, onComplete]);


  return (
    <Tag
      ref={rootRef}
      className={"inline-block " + className}
      style={{ whiteSpace: "pre-wrap" }} // <-- important for preserving \n
      {...rest}
    >
      {tokens.map((token, i) => {
        // Whitespace: render as-is, unanimated
        if (/^\s+$/.test(token)) {
          return token;
        }

        // Word: animate
        return (
          <span
            key={`mask-${i}`}
            ref={(el) => setMaskRef(el, i)}
            style={{
              display: "inline-block",
              overflow: "visible",
              lineHeight: 1,
              verticalAlign: "baseline",
            }}
          >
            <span
              ref={(el) => setInnerRef(el, i)}
              style={{
                display: "inline-block",
                lineHeight: 1,
                willChange: "transform, opacity",
              }}
            >
              {token}
            </span>
          </span>
        );
      })}
    </Tag>
  );
}
