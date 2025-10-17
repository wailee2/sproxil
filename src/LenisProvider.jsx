import React, { createContext, useContext, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import "lenis/dist/lenis.css";

const LenisContext = createContext(null);

export function LenisProvider({ children, options = {} }) {
  const lenisRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // HMR-safe: destroy prior instance (helps during Vite hot reload)
    if (window.__LENIS__) {
      try { window.__LENIS__.destroy(); } catch (e) {}
      window.__LENIS__ = undefined;
    }

    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothWheel: true,
      allowNestedScroll: true,
      ...options,
    });
    lenisRef.current = lenis;
    window.__LENIS__ = lenis;

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }
    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      try { lenis.destroy(); } catch (e) {}
      window.__LENIS__ = undefined;
      lenisRef.current = null;
    };
  }, [options]);

  return <LenisContext.Provider value={lenisRef.current}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}
