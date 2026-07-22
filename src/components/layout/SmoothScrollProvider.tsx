import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

interface Props {
  children: ReactNode;
}

export default function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,

      // Premium feeling
      lerp: 0.07,

      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
      syncTouch: true,

      overscroll: true,
      infinite: false,
    });

    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, {
      immediate: true,
    });
  }, [location.pathname]);

  return <>{children}</>;
}