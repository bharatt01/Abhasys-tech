import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NAVBAR_HEIGHT = 56;

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
  const textScale = useTransform(scrollYProgress, [0.1, 0.5], [0.92, 1]);

  return (
    <div ref={ref} className="bg-white -mt-12">
      {/* Navbar buffer */}
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

            {/* 🖼 Background Image */}
            <img
              src="/images/bg-curtain.jpg" // replace with your image path
              alt="Digital product background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 🌑 Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/65" />

            {/* 🎨 Subtle premium color tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-cyan-400/10" />

            {/* 🎭 Left Curtain */}
            <motion.div
              style={{ x: leftX, scaleX: curtainScale }}
              className="
                absolute inset-y-0 left-0 w-1/2 z-20
                bg-neutral-950
                shadow-[inset_-50px_0_80px_rgba(0,0,0,0.75)]
              "
            />

            {/* 🎭 Right Curtain */}
            <motion.div
              style={{ x: rightX, scaleX: curtainScale }}
              className="
                absolute inset-y-0 right-0 w-1/2 z-20
                bg-neutral-950
                shadow-[inset_50px_0_80px_rgba(0,0,0,0.75)]
              "
            />

            {/* ✨ Text Content */}
            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
                scale: textScale,
              }}
              className="relative z-10 h-full flex items-center justify-center text-center px-10"
            >
              <div className="max-w-2xl text-white backdrop-blur-sm bg-black/25 rounded-2xl p-10">
                <span className="uppercase tracking-widest text-xs text-white/80">
                  Building Digital Experiences
                </span>

                <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
                  Designing & Building
                  <br />
                  Products That Scale
                </h1>

                <p className="mt-6 text-lg text-white/85 leading-relaxed">
                  We combine strategy, design, and modern web development to
                  create fast, reliable digital products that support growth
                  long after launch — built for real users and real businesses.
                </p>
              </div>
            </motion.div>

            {/* 🌫 Soft top glow */}
            <div
              className="
                absolute inset-0 pointer-events-none
                bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]
              "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurtainReveal;
