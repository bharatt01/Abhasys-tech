import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const DepthZoomReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"], // fast finish
  });

  /* ⚡ Fast background reaction */
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1.05, 1]);
  const bgY = useTransform(scrollYProgress, [0, 0.35], ["0%", "3%"]);

  /* 💎 Card animation (quick & punchy) */
  const cardScale = useTransform(scrollYProgress, [0, 0.3], [0.88, 1]);
  const cardOpacity = useTransform(scrollYProgress, [0.05, 0.25], [0, 1]);
  const cardY = useTransform(scrollYProgress, [0.05, 0.25], [90, 0]);
  const cardRotateX = useTransform(scrollYProgress, [0, 0.3], [14, 0]);

  return (
    <div ref={ref} className="h-[140vh] bg-white">
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* 🤍 White Background */}
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="absolute inset-0 bg-white"
        />

        {/* 💎 Purple Foreground Card */}
        <motion.div
          style={{
            scale: cardScale,
            opacity: cardOpacity,
            y: cardY,
            rotateX: cardRotateX,
          }}
          className="relative z-10 w-[72vw] h-[62vh]
          bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700
          rounded-[28px]
          shadow-[0_60px_140px_rgba(80,0,150,0.45)]
          flex items-center justify-center"
        >
          {/* ✨ Subtle purple glow */}
          <div
            className="absolute inset-0 rounded-[28px]
            bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)]"
          />

          <div className="relative text-center px-12 text-white">
            <span className="uppercase tracking-widest text-xs opacity-70">
              Fast Reveal
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
              Depth
              <br />
              Zoom Effect
            </h1>

            <p className="mt-6 text-lg text-white/85 max-w-xl mx-auto">
              A rapid depth-based reveal that finishes early,
              grabs attention instantly, and feels bold.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DepthZoomReveal;
