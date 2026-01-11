import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NAVBAR_HEIGHT = 80;

const CurtainReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* 🎭 Curtains */
  const leftX = useTransform(scrollYProgress, [0, 0.4], ["0%", "-105%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.4], ["0%", "105%"]);
  const curtainScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.98]);

  /* ✨ Text reveal */
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.25, 1]);
  const textY = useTransform(scrollYProgress, [0.15, 0.55], [24, 0]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.5], [0.9, 1]);

  return (
    <div ref={ref} className="bg-white">
      {/* ✅ White buffer BEFORE sticky */}
      <div style={{ height: NAVBAR_HEIGHT }} />

      <div className="h-[200vh]">
        <div
          className="sticky flex items-center justify-center overflow-hidden"
          style={{
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <div className="relative w-[90vw] h-[80vh] rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.35)]">

            {/* 🎨 Solid background */}
            <div className="absolute inset-0 bg-rose-600" />

            {/* 🎭 Left Curtain */}
            <motion.div
              style={{ x: leftX, scaleX: curtainScale }}
              className="absolute inset-y-0 left-0 w-1/2 z-20
              bg-slate-900 shadow-[inset_-40px_0_60px_rgba(0,0,0,0.6)]"
            />

            {/* 🎭 Right Curtain */}
            <motion.div
              style={{ x: rightX, scaleX: curtainScale }}
              className="absolute inset-y-0 right-0 w-1/2 z-20
              bg-slate-900 shadow-[inset_40px_0_60px_rgba(0,0,0,0.6)]"
            />

            {/* ✨ Text */}
            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
                scale: textScale,
              }}
              className="relative z-10 h-full flex items-center justify-center text-center px-10"
            >
              <div className="max-w-2xl text-white">
                <span className="uppercase tracking-widest text-xs opacity-80">
                  Cinematic Reveal
                </span>

                <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
                  Split Reveal
                  <br />
                  Experience
                </h1>

                <p className="mt-6 text-lg text-white/90">
                  The message is visible early, building anticipation
                  while the curtains slowly parts.
                </p>
              </div>
            </motion.div>

            {/* 🌫 Glow */}
            <div className="absolute inset-0 pointer-events-none
              bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurtainReveal;
