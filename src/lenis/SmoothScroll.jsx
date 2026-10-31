import { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

/**
 * Read the shared Lenis instance from anywhere below <SmoothScroll>.
 * Returns a ref object: `lenisRef.current` is the Lenis instance (or null
 * before mount / after unmount).
 */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Wraps the app in Lenis smooth scrolling and keeps GSAP's ScrollTrigger
 * in sync with it. Lenis is driven manually off GSAP's own ticker
 * (autoRaf: false) — running Lenis's *own* internal rAF loop on top of the
 * GSAP ticker was the bug causing the double-stepped, "slow on reload"
 * feel: two loops were both calling lenis.raf() every frame.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.4,
      // Slow, heavy descent (closer to flshfrm.com's feel) instead of a
      // sharp stop — same exponential ease-out Lenis ships in its docs.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
