import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagnetButton from "@/components/ui/MagnetButton";
import { useEffect, useState, memo, useRef } from "react";

/* ===========================
   Typewriter Hook
=========================== */
const useTypewriter = (
  text: string,
  typingSpeed = 120,
  deletingSpeed = 90,
  delayBetween = 5000
) => {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<"typing" | "waiting" | "deleting" | "done">("typing");
  const indexRef = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      const i = indexRef.current;

      if (phase === "typing") {
        if (i < text.length) {
          indexRef.current = i + 1;
          setDisplayText(text.slice(0, i + 1));
          timeout = setTimeout(tick, typingSpeed);
        } else {
          setPhase("waiting");
          timeout = setTimeout(() => setPhase("deleting"), delayBetween);
        }
      } else if (phase === "deleting") {
        if (i > 0) {
          indexRef.current = i - 1;
          setDisplayText(text.slice(0, i - 1));
          timeout = setTimeout(tick, deletingSpeed);
        } else {
          setPhase("typing");
          timeout = setTimeout(tick, 300);
        }
      }
    };

    timeout = setTimeout(tick, phase === "typing" ? typingSpeed : 0);
    return () => clearTimeout(timeout);
  }, [phase, text, typingSpeed, deletingSpeed, delayBetween]);

  return displayText;
};

/* ===========================
   Video Background
=========================== */
const VideoBackground = memo(() => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      <img
        src="/images/hero-poster.jpg"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        fetchpriority="high"
      />

      <video
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src="/videos/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
        onLoadedData={() => setLoaded(true)}
      />

      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
});
VideoBackground.displayName = "VideoBackground";

/* ===========================
   Hero Component
=========================== */
const Hero = () => {
  const typedText = useTypewriter("Technology & Strategy");

  return (
    <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
      <VideoBackground />

      <motion.div
        className="container mx-auto px-4 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white mt-16 mb-20">
            <motion.span
              className="block mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transforming Businesses
            </motion.span>

            <motion.span
              className="block mb-3 text-indigo-500 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-widest uppercase translate-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Via
            </motion.span>

            <motion.span
              className="relative inline-block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {typedText}
              <span className="inline-block w-[2px] h-[1em] ml-1 align-middle bg-white/80 animate-pulse" />
            </motion.span>
          </h1>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <MagnetButton strength={0.15}>
              <Button asChild size="xl" className="bg-indigo-500 text-white hover:bg-indigo-600 gap-2">
                <Link to="/contact">
                  Start Your Growth Journey
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </MagnetButton>

            <MagnetButton strength={0.15}>
              <Button
                asChild
                variant="outline"
                size="xl"
                className="border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white gap-2"
              >
                <Link to="/services">
                  <Play className="w-4 h-4" />
                  Explore Services
                </Link>
              </Button>
            </MagnetButton>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;