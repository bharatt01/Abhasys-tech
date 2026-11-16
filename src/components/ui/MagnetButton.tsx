import { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagnetButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/* Motion values instead of useState: mouse movement no longer re-renders the component,
   and the element's rect is measured once on enter instead of on every mouse move. */
const MagnetButton = ({ children, className = "", strength = 0.3 }: MagnetButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<DOMRect | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 350, damping: 15, mass: 0.5 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const handleEnter = () => {
    rect.current = ref.current?.getBoundingClientRect() ?? null;
  };

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = rect.current;
    if (!r) return;
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const handleLeave = () => {
    rect.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default MagnetButton;