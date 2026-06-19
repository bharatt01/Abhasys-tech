import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

const NAVBAR_HEIGHT = 56;

const CurtainReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasRevealed, setHasRevealed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  /* Curtain split — faster, more dramatic */
  const leftX = useTransform(scrollYProgress, [0, 0.6], ["0%", "-110%"]);
  const rightX = useTransform(scrollYProgress, [0, 0.6], ["0%", "110%"]);
  const leftSkew = useTransform(scrollYProgress, [0, 0.6], [0, -8]);
  const rightSkew = useTransform(scrollYProgress, [0, 0.6], [0, 8]);
  const leftScaleY = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);
  const rightScaleY = useTransform(scrollYProgress, [0, 0.6], [1, 1.1]);

  /* Text reveal with stagger */
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
      <div style={{ height: NAVBAR_HEIGHT }} />

      <div className="h-[140vh]">
        <div
          className="sticky flex items-center justify-center overflow-hidden"
          style={{
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          {/* Full-bleed container — no rounded corners, sharp edges */}
          <div className="relative w-full h-full overflow-hidden">
            {/* Background with parallax zoom */}
            <motion.div
              className="absolute inset-0"
              style={{ scale: bgScale, rotate: bgRotate }}
            >
              <img
                src="/images/bg-curtain.jpg"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Dark overlay with gradient */}
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Animated glow behind text */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] bg-indigo-500"
              style={{ opacity: glowOpacity }}
            />

            {/* Left Curtain — with texture and skew */}
            <motion.div
              style={{
                x: leftX,
                skewX: leftSkew,
                scaleY: leftScaleY,
              }}
              className="absolute inset-y-0 left-0 w-1/2 z-20 bg-neutral-950"
            >
              {/* Texture overlay */}
              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
              {/* Inner shadow */}
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/50 to-transparent" />
              {/* Edge highlight */}
              <div className="absolute inset-y-0 right-0 w-[2px] bg-white/10" />
            </motion.div>

            {/* Right Curtain — with texture and skew */}
            <motion.div
              style={{
                x: rightX,
                skewX: rightSkew,
                scaleY: rightScaleY,
              }}
              className="absolute inset-y-0 right-0 w-1/2 z-20 bg-neutral-950"
            >
              <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/50 to-transparent" />
              <div className="absolute inset-y-0 left-0 w-[2px] bg-white/10" />
            </motion.div>

            {/* Center seam line */}
            <motion.div
              className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/20 z-30"
              style={{
                opacity: useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.5, 0]),
                scaleY: useTransform(scrollYProgress, [0, 0.6], [1, 0]),
              }}
            />

            {/* Text — cinematic reveal */}
            <motion.div
              style={{
                opacity: textOpacity,
                y: textY,
                scale: textScale,
                rotate: textRotate,
              }}
              className="relative z-10 h-full flex items-center justify-center text-center px-6 md:px-10"
            >
              <div className="max-w-3xl">
                {/* Eyebrow with animated line */}
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

                {/* Title — word by word stagger */}
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

                {/* Description */}
                <motion.p
                  className="mt-10 md:mt-12 text-base md:text-lg lg:text-xl text-white/70 leading-relaxed max-w-xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={hasRevealed ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  We combine strategy, design, and modern web development to
                  create fast, reliable digital products that support growth.
                </motion.p>

                {/* Animated arrow down */}
                <motion.div
                  className="mt-12 flex justify-center"
                  initial={{ opacity: 0 }}
                  animate={hasRevealed ? { opacity: 1 } : {}}
                  transition={{ delay: 1.3 }}
                >
                  <motion.div
                    className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <motion.div
                      className="w-1.5 h-2.5 rounded-full bg-white/60"
                      animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </motion.div>
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