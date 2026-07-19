// components/ScrollTo.tsx
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export const scrollToSection = (id: string) => {
  const lenis = (window as any).lenis as Lenis;
  if (lenis) {
    lenis.scrollTo(`#${id}`, { offset: -80 }); // offset for navbar
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
};

// Hook for anchor links
export const useLenisAnchor = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };
  return handleClick;
};