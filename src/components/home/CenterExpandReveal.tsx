import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";

const NAVBAR_HEIGHT = 80;

const InsaneCenterReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end start"],
  });

  /* 🔥 Reveal mask (slow & premium) */
  const clipPath: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["circle(3% at 50% 50%)", "circle(120% at 50% 50%)"]
  );

  /* Container subtle scale */
  const containerScale = useTransform(scrollYProgress, [0, 1], [0.982, 1]);

  /* 🎯 Text motion */
  const opacity = useTransform(scrollYProgress, [0.1, 0.52], [0, 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.52], [32, 0]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.52], [0.965, 1]);

  return (
    <div ref={ref} className="bg-white">
      {/* ✅ White buffer before sticky */}
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
            {/* 🔥 Reveal Layer */}
            <motion.div
              style={{ clipPath }}
              className="absolute inset-0 bg-gradient-to-br
                from-slate-900 via-slate-800 to-slate-900"
            />

            {/* Depth overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_60%)]" />

            {/* Content */}
            <motion.div
              style={{ opacity, y, scale: textScale }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 28,
              }}
              className="relative z-10 h-full flex items-center justify-center text-center px-10"
            >
              <div className="max-w-3xl text-white">
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="uppercase tracking-widest text-xs opacity-70"
                >
                  Premium Reveal
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight"
                >
                  Designed to Feel
                  <br />
                  Effortless
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 }}
                  className="mt-6 text-lg text-slate-300"
                >
                  A clean, center-based reveal using professional tones,
                  smooth motion, and zero visual noise.
                  Perfect for high-end landing pages.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 }}
                  className="mt-10 flex justify-center gap-4"
                >
                  <button className="px-8 py-4 rounded-full bg-white text-slate-900 font-semibold">
                    Get Started
                  </button>
                  <button className="px-8 py-4 rounded-full border border-white/30 text-white">
                    Learn More
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InsaneCenterReveal;
