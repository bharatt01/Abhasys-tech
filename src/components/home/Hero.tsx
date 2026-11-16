import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagnetButton from "@/components/ui/MagnetButton";
import { useEffect, useState, memo, useRef } from "react";

/* Set to false to show only the poster image on phones (lightest option). */
const VIDEO_ON_MOBILE = true;

/* ===========================
   Typewriter
   Lives in its own component, so only this tiny span re-renders on each
   keystroke instead of the whole Hero (buttons, video, motion tree).
=========================== */
const Typewriter = memo(
  ({
    text,
    typingSpeed = 120,
    deletingSpeed = 90,
    delayBetween = 5000,
  }: {
    text: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    delayBetween?: number;
  }) => {
    const reduce = useReducedMotion();
    const [length, setLength] = useState(0);

    useEffect(() => {
      if (reduce) {
        setLength(text.length);
        return;
      }

      let i = 0;
      let direction: 1 | -1 = 1;
      let timer: ReturnType<typeof setTimeout>;

      const step = () => {
        if (direction === 1) {
          if (i < text.length) {
            i += 1;
            setLength(i);
            timer = setTimeout(step, typingSpeed);
          } else {
            direction = -1;
            timer = setTimeout(step, delayBetween); // pause on the full text
          }
        } else if (i > 0) {
          i -= 1;
          setLength(i);
          timer = setTimeout(step, deletingSpeed);
        } else {
          direction = 1;
          timer = setTimeout(step, 300);
        }
      };

      timer = setTimeout(step, typingSpeed);
      return () => clearTimeout(timer);
    }, [reduce, text, typingSpeed, deletingSpeed, delayBetween]);

    return (
      <>
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {text.slice(0, length)}
          <span className="inline-block w-[2px] h-[1em] ml-1 align-middle bg-white/80 animate-pulse" />
        </span>
      </>
    );
  },
);
Typewriter.displayName = "Typewriter";

/* ===========================
   Video Background
   - Pauses when the hero is off screen (no decoding while you scroll the rest of the page)
   - Skipped for reduced-motion and data-saver users (poster image only)
=========================== */
const VideoBackground = memo(() => {
  const [loaded, setLoaded] = useState(false);
  const [useVideo, setUseVideo] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  // Decide once, on the client, whether the video should load at all.
  useEffect(() => {
    const conn = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    const saveData = !!conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "");
    const phone = window.matchMedia("(max-width: 767px)").matches;
    setUseVideo(!reduce && !saveData && (VIDEO_ON_MOBILE || !phone));
  }, [reduce]);

  // Play only while visible.
  useEffect(() => {
    const video = videoRef.current;
    const wrap = wrapRef.current;
    if (!useVideo || !video || !wrap) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0 },
    );
    io.observe(wrap);
    return () => io.disconnect();
  }, [useVideo]);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-0">
      <img
        src="/images/hero-poster.jpg"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        loading="eager"
        fetchpriority="high"
      />

      {useVideo && (
        <video
          ref={videoRef}
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
          aria-hidden
          tabIndex={-1}
          disablePictureInPicture
          onLoadedData={() => setLoaded(true)}
        />
      )}

      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
});
VideoBackground.displayName = "VideoBackground";

/* ===========================
   Hero Component
=========================== */
const Hero = () => (
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
            Through
          </motion.span>

          <motion.span
            className="relative inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Typewriter text="Technology & Strategy" />
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

export default Hero;