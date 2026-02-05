import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const DepthZoomReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 40%"],
  });

  /* ⚡ Background motion */
  const bgScale = useTransform(scrollYProgress, [0, 0.35], [1.08, 1]);
  const bgY = useTransform(scrollYProgress, [0, 0.35], ["0%", "3%"]);

  /* 💎 Card motion */
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
        {/* 🌌 IMAGE BACKGROUND */}
        <motion.div
          style={{ scale: bgScale, y: bgY }}
          className="absolute inset-0"
        >
          <img
            src="/images/expand.jpg" // 🔁 background image
            alt="Background"
            className="w-full h-full object-cover"
          />

          {/* Dark contrast overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Premium color wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/25 via-purple-600/20 to-cyan-500/20" />
        </motion.div>

        {/* 💎 IMAGE CARD */}
        <motion.div
          style={{
            scale: cardScale,
            opacity: cardOpacity,
            y: cardY,
            rotateX: cardRotateX,
          }}
          className="
            relative z-10
            w-[72vw] h-[62vh]
            rounded-[28px]
            overflow-hidden
            shadow-[0_60px_140px_rgba(0,0,0,0.45)]
            flex items-center justify-center
          "
        >
          {/* Card image */}
          <img
            src="/images/expand.jpg" // 🔁 card image
            alt="Card background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Card dark overlay */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Soft highlight */}
          <div
            className="
              absolute inset-0
              bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_60%)]
            "
          />

          {/* CONTENT */}
          <div className="relative z-10 text-center px-12 text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-lg font-semibold mb-6">
              About Us
            </span>

            <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
              Strategy-Led Digital
              <br />
              Growth Solutions
            </h1>

            <p className="mt-6 text-lg text-white/85 max-w-xl mx-auto">
              Every solution we build starts with strategy.
              We combine user experience design, modern engineering,
              and performance marketing to create digital systems
              that scale with your business.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DepthZoomReveal;
