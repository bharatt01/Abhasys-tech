import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

const ParallaxSection = ({ 
  children, 
  className = "", 
  speed = 0.5,
  direction = "up" 
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yValue = direction === "up" ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed];
  const y = useTransform(scrollYProgress, [0, 1], yValue);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxSection;