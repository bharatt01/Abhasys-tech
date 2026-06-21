// components/SmoothScrollProvider.tsx

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

const SmoothScrollProvider = ({
  children,
}: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // Sync Lenis with Framer Motion
    const handleScroll = () => {
      window.dispatchEvent(new Event("scroll"));
    };

    lenis.on("scroll", handleScroll);

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    if (!lenisRef.current) return;

    requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, {
        immediate: true,
      });
    });
  }, [location.pathname]);

  return <>{children}</>;
};

export default SmoothScrollProvider;