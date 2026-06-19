import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagnetButton from "@/components/ui/MagnetButton";
import { useRef, useEffect, useState, memo } from "react";

/* ===========================
   Typewriter Hook (Optimized)
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
   Static Background (No Parallax on Video)
=========================== */
const VideoBackground = memo(() => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="absolute inset-0 z-0">
      {/* Low-res poster loads instantly */}
      <img
        src="/images/hero-poster.jpg"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        fetchpriority="high"
      />

      {/* Video loads after */}
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

      {/* Single overlay — no transparency animation */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
});
VideoBackground.displayName = "VideoBackground";

/* ===========================
   Hero Component
=========================== */
const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const typedText = useTypewriter("Technology & Strategy");

  /* Light parallax on TEXT only — not on video */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden"
    >
      {/* Static background — NO parallax transform */}
      <VideoBackground />

      {/* Content with light parallax */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] text-white mt-16 mb-20">
            <span className="block mb-2">Transforming Businesses</span>

            <span className="block mb-3 text-indigo-500 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-widest uppercase translate-y-3">
              Via
            </span>

            <span className="relative inline-block">
              {typedText}
              <span className="inline-block w-[2px] h-[1em] ml-1 align-middle bg-white/80 animate-pulse" />
            </span>
          </h1>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
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
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;