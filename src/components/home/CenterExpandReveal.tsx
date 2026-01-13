import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
const NAVBAR_HEIGHT = 56;


const InsaneCenterReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end start"],
  });

  /* 🔥 Reveal mask */
  const clipPath: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["circle(4% at 50% 50%)", "circle(130% at 50% 50%)"]
  );

  /* Subtle container scale */
  const containerScale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);

  /* 🎯 Text motion */
  const opacity = useTransform(scrollYProgress, [0.12, 0.55], [0, 1]);
  const y = useTransform(scrollYProgress, [0.12, 0.55], [36, 0]);
  const textScale = useTransform(scrollYProgress, [0.12, 0.55], [0.97, 1]);

  return (
    <div ref={ref} className="bg-white -mt-12">

      {/* Buffer for navbar */}
      <div style={{ height: NAVBAR_HEIGHT }} />

      <div className="h-[130vh]">
        <div
          className="sticky flex items-center justify-center"
          style={{
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <motion.div
            style={{ scale: containerScale }}
            className="relative w-[90vw] h-[85vh] rounded-3xl overflow-hidden"
          >
            {/* 🔵 SOLID CANDY BLUE REVEAL */}
            <motion.div
              style={{ clipPath }}
              className="absolute inset-0 bg-[#2563EB]"
            />

            {/* Soft premium glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]" />

            {/* Content */}
            <motion.div
              style={{ opacity, y, scale: textScale }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 26,
              }}
              className="relative z-10 h-full flex items-center justify-center text-center px-10"
            >
              <div className="max-w-3xl text-white">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="uppercase tracking-widest text-xs opacity-80"
                >
                  Modern Digital Craft
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight"
                >
                  Built to Perform
                  <br />
                  Designed to Scale
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 }}
                  className="mt-6 text-lg text-white/90"
                >
                  Strong visuals. Clean motion. Solid engineering.
                  Everything crafted to move brands forward.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.48 }}
                  className="mt-12 flex justify-center gap-5"
                >
                  <button className="px-9 py-4 rounded-full bg-white text-[#2563EB] font-semibold hover:scale-105 transition">
                    Get Started
                  </button>

                  <button className="px-9 py-4 rounded-full border-2 border-white/60 text-white hover:bg-white/10 transition">
                    View Work
                  </button>
                </motion.div>
              </div>
            </motion.div>

            {/* Accent glow blobs */}
            <div className="absolute -bottom-28 -right-28 w-72 h-72 rounded-full bg-[#22D3EE] opacity-35 blur-3xl" />
            <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-[#4F46E5] opacity-30 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InsaneCenterReveal;
