import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const NAVBAR_HEIGHT = 56;

const CurtainReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,

    // ✅ Start BEFORE reaching section & end early
    offset: ["start 85%", "end 40%"],
  });

  /* 🎭 Curtains reveal early and finish fast */
  const leftX = useTransform(scrollYProgress, [0, 0.7], ["0%", "-110%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.7], ["0%", "110%"]);
  const curtainScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.97]);

  /* ✨ Text reveal slightly delayed */
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.3, 0.8], [40, 0]);
  const textScale = useTransform(scrollYProgress, [0.3, 0.8], [0.95, 1]);

  return (
    <div ref={ref} className="bg-white -mt-12">
      <div style={{ height: NAVBAR_HEIGHT }} />

      {/* ✅ Only little extra scroll after reveal */}
      <div className="h-[140vh]">
        <div
          className="sticky flex items-center justify-center overflow-hidden"
          style={{
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <div className="relative w-[90vw] h-[80vh] rounded-3xl overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.35)]">

            {/* Background */}
            <img
              src="/images/bg-curtain.jpg"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/15 to-cyan-400/10" />

            {/* Left Curtain */}
            <motion.div
              style={{ x: leftX, scaleX: curtainScale }}
              className="absolute inset-y-0 left-0 w-1/2 z-20 bg-neutral-950 shadow-[inset_-50px_0_80px_rgba(0,0,0,0.75)]"
            />

            {/* Right Curtain */}
            <motion.div
              style={{ x: rightX, scaleX: curtainScale }}
              className="absolute inset-y-0 right-0 w-1/2 z-20 bg-neutral-950 shadow-[inset_50px_0_80px_rgba(0,0,0,0.75)]"
            />

            {/* Text */}
            <motion.div
              style={{ opacity: textOpacity, y: textY, scale: textScale }}
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
                  create fast, reliable digital products that support growth.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurtainReveal;
