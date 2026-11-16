import { ReactNode, useEffect, useRef } from "react";

/**
 * CSS-driven marquee. Runs on the compositor (not JavaScript), pauses when off screen,
 * and stops for reduced-motion users.
 *
 * `children` must be TWO identical halves back to back, each wider than the screen.
 * The track moves exactly -50%, so the loop is seamless.
 * Use margin/padding on items for spacing (not flex gap), or the loop will jump slightly.
 * Save as: src/components/ui/Marquee.tsx
 */
const Marquee = ({
  children,
  duration,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration: number;
  reverse?: boolean;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes marquee-x { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } }
        @media (prefers-reduced-motion: reduce) { .marquee-track { animation: none !important } }
      `}</style>
      <div
        ref={ref}
        className={`marquee-track flex w-max ${className}`}
        style={{
          animationName: "marquee-x",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </>     
  );
};

export default Marquee;