import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const NAVBAR_HEIGHT = 56;

const InsaneCenterReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end start"],
  });

  /* 🔥 Circular reveal mask */
  const clipPath: MotionValue<string> = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["circle(4% at 50% 50%)", "circle(130% at 50% 50%)"]
  );

  /* Subtle container scale */
  const containerScale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);

  /* Text animation */
  const opacity = useTransform(scrollYProgress, [0.12, 0.55], [0, 1]);
  const y = useTransform(scrollYProgress, [0.12, 0.55], [36, 0]);
  const textScale = useTransform(scrollYProgress, [0.12, 0.55], [0.97, 1]);

  const navigate = useNavigate();
  const handleCTAClick1 = () => navigate("/contact");
  const handleCTAClick2 = () => navigate("/our-work");

  return (
    <div ref={ref} className="bg-white -mt-12">
      {/* Navbar buffer */}
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
            className="relative w-[92vw] h-[86vh] rounded-3xl overflow-hidden"
          >
            {/* 🔥 REVEAL LAYER (IMAGE + OVERLAYS TOGETHER) */}
            <motion.div
              style={{ clipPath }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <img
                src="/images/bg-expand.jpg"
                alt="Digital solutions background"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Strong dark overlay for text */}
              <div className="absolute inset-0 bg-black/70" />

              {/* Premium color wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-indigo-500/20 to-cyan-400/15" />
            </motion.div>

            {/* CONTENT */}
            <motion.div
              style={{ opacity, y, scale: textScale }}
              transition={{ type: "spring", stiffness: 80, damping: 26 }}
              className="relative z-10 h-full flex items-center justify-center px-10"
            >
              <div className="max-w-3xl text-center text-white backdrop-blur-sm bg-black/25 rounded-2xl p-10">
                <span className="uppercase tracking-widest text-[11px] text-white/80">
                  End-to-End Digital Solutions
                </span>

                <h1 className="mt-6 text-[38px] md:text-[46px] font-extrabold leading-tight">
                  Building Digital Systems
                </h1>

                <h2 className="mt-3 text-[22px] md:text-[28px] font-semibold text-white/90">
                  That Power Real Business Growth
                </h2>

                <div className="mx-auto mt-6 h-px w-24 bg-white/30" />

                <p className="mt-6 text-[18px] md:text-[20px] leading-relaxed text-white/85">
                  We design and develop scalable digital platforms that support
                  marketing, operations, and long-term growth. From high-performance
                  websites to custom systems, everything we build is focused on
                  clarity, speed, and real-world usability — not just visuals.
                </p>

                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
                  <button
                    onClick={handleCTAClick1}
                    className="px-9 py-4 rounded-full bg-white text-blue-600 font-semibold hover:scale-105 transition"
                  >
                    Start a Project
                  </button>

                  <button
                    onClick={handleCTAClick2}
                    className="px-9 py-4 rounded-full border-2 border-white/60 text-white hover:bg-white/10 transition"
                  >
                    View Our Work
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Accent glows */}
            <div className="absolute -bottom-32 -right-32 w-72 h-72 rounded-full bg-cyan-400/30 blur-3xl" />
            <div className="absolute -top-32 -left-32 w-72 h-72 rounded-full bg-indigo-500/30 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InsaneCenterReveal;
