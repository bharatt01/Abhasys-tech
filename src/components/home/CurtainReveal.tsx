import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const NAVBAR_HEIGHT = 56;

/* Looping arrow now runs as CSS (compositor), not as two endless JavaScript animations. */
const css = `
@keyframes cr-bob { 0%,100% { transform: translateY(0) } 50% { transform: translateY(5px) } }
@keyframes cr-dot { 0%,100% { transform: translateY(0); opacity: 1 } 50% { transform: translateY(12px); opacity: .3 } }
@media (prefers-reduced-motion: reduce) { .cr-bob, .cr-dot { animation: none !important } }
`;

const CurtainReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  /* Curtain split */
  const leftX = useTransform(scrollYProgress, [0, 0.6], ["0%", "-110%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ["0%", "110%"]);
  const leftSkew = useTransform(scrollYProgress, [0, 0.6], [0, -8]);
  const rightSkew = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
  const curtainScaleY = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);

  /* Center seam (these were created inline inside the JSX before; now created once) */
  const seamOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.5, 0]);
  const seamScaleY = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  /* Text reveal */
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.7], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.25, 0.7], [60, 0]);
  const textScale = useTransform(scrollYProgress, [0.25, 0.7], [0.9, 1]);
  const textRotate = useTransform(scrollYProgress, [0.25, 0.7], [3, 0]);

  /* Background zoom */
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [2, 0]);

  /* Glow pulse after reveal */
  const glowOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 0.6, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.5 && !hasRevealed) setHasRevealed(true);
  });

  return (
    <div ref={ref} className="bg-white -mt-12">
      <style>{css}</style>
      <div style={{ height: NAVBAR_HEIGHT }} />

      <div className="h-[140vh]">
        <div
          className="sticky flex items-center justify-center overflow-hidden"
          style={{
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Background with parallax zoom */}
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ scale: bgScale, rotate: bgRotate }}
            >
              <img
                src="/images/bg-curtain.jpg"
                alt="Background"
                className="w-full h-full object-cover"
                decoding="async"
              />
            </motion.div>

            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Glow behind text.
                Was: blur-[120px] on a solid circle (very expensive to draw).
                Now: a radial gradient, which looks the same but costs almost nothing. */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(closest-side,rgba(99,102,241,0.85),rgba(99,102,241,0.35)_55%,transparent)]"
              style={{ opacity: glowOpacity }}
            />

            {/* Left Curtain */}
            <motion.div
              style={{ x: leftX, skewX: leftSkew, scaleY: curtainScaleY }}
              className="absolute inset-y-0 left-0 w-1/2 z-20 bg-neutral-950 will-change-transform"
            >
              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/50 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[2px] bg-white/10" />
            </motion.div>

            {/* Right Curtain */}
            <motion.div
              style={{ x: rightX, skewX: rightSkew, scaleY: curtainScaleY }}
              className="absolute inset-y-0 right-0 w-1/2 z-20 bg-neutral-950 will-change-transform"
            >
              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-[2px] bg-white/10" />
            </motion.div>

            {/* Center seam line */}
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20 z-30"
              style={{ opacity: seamOpacity, scaleY: seamScaleY }}
            />

            {/* Text */}
            <motion.div
              style={{ opacity: textOpacity, y: textY, scale: textScale, rotate: textRotate }}
              className="relative z-10 h-full flex items-center justify-center text-center px-6 md:px-10"
            >
              <div className="max-w-3xl">
                <motion.div
                  className="flex items-center justify-center gap-4 mb-8"
                  initial={{ opacity: 0 }}
                  animate={hasRevealed ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    className="h-[1px] bg-white/40"
                    initial={{ width: 0 }}
                    animate={hasRevealed ? { width: 40 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                  <span className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/60 font-medium">
                    Building Digital Experiences
                  </span>
                  <motion.div
                    className="h-[1px] bg-white/40"
                    initial={{ width: 0 }}
                    animate={hasRevealed ? { width: 40 } : {}}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  />
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 50, rotateX: 40 }}
                    animate={hasRevealed ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Designing
                  </motion.span>
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 50, rotateX: 40 }}
                    animate={hasRevealed ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    & Building
                  </motion.span>
                  <motion.span
                    className="block mt-2"
                    initial={{ opacity: 0, y: 50, rotateX: 40 }}
                    animate={hasRevealed ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Products That
                  </motion.span>
                  <motion.span
                    className="block relative mt-2"
                    initial={{ opacity: 0, y: 50, rotateX: 40 }}
                    animate={hasRevealed ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="text-indigo-400">Scale</span>
                    <motion.div
                      className="absolute -bottom-2 left-0 h-[6px] bg-indigo-500"
                      initial={{ width: 0 }}
                      animate={hasRevealed ? { width: "100%" } : {}}
                      transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </motion.span>
                </h1>

                <motion.p
                  className="mt-10 md:mt-12 text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  We combine strategy, design, and modern web development to
                  create fast, reliable digital products that support growth.
                </motion.p>

                {/* Arrow: CSS animation, only visible after reveal */}
                <motion.div
                  className="mt-12 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={hasRevealed ? { opacity: 1 } : {}}
                  transition={{ delay: 1.3 }}
                >
                  <div
                    className="cr-bob w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
                    style={{ animation: "cr-bob 2s ease-in-out infinite" }}
                  >
                    <div
                      className="cr-dot w-1.5 h-2.5 rounded-full bg-white/60"
                      style={{ animation: "cr-dot 2s ease-in-out infinite" }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurtainReveal;