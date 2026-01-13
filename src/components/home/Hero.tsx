import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagnetButton from "@/components/ui/MagnetButton";
import ParallaxSection from "@/components/ui/ParallaxSection";
import { useRef, useEffect, useState } from "react";

/* ===========================
   Typewriter Hook (Slow + 5s Pause)
=========================== */
const useTypewriter = (
  text: string,
  typingSpeed = 120,
  deletingSpeed = 90,
  delayBetween = 5000
) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, index + 1));
        setIndex(index + 1);
      }, typingSpeed);
    } else if (!isDeleting && index === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetween);
    } else if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, index - 1));
        setIndex(index - 1);
      }, deletingSpeed);
    } else if (isDeleting && index === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [text, index, isDeleting, typingSpeed, deletingSpeed, delayBetween]);

  return displayText;
};

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const typedText = useTypewriter(
    "Transforming Businesses Via Technology & Strategy"
  );

  return (
    <section
  ref={containerRef}
  className="
    sticky top-0 
    min-h-screen 
    flex items-center 
    pt-20 
    overflow-hidden
    z-10
  "
>

      {/* 🎥 Background Video */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: backgroundY }}
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />

        {/* ✅ Light Black Overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </motion.div>

      {/* 🎨 Parallax Blobs */}
      <ParallaxSection
        speed={0.2}
        direction="up"
        className="absolute top-24 right-10 w-80 h-80 z-0"
      >
        <div className="w-full h-full bg-primary/10 rounded-full blur-3xl" />
      </ParallaxSection>

      <ParallaxSection
        speed={0.3}
        direction="down"
        className="absolute bottom-32 left-10 w-72 h-72 z-0"
      >
        <div className="w-full h-full bg-accent/10 rounded-full blur-3xl" />
      </ParallaxSection>

      {/* 📝 Content */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* 🔥 Typewriter Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                       font-extrabold leading-[1.05] mb-20 
                       text-center tracking-tight"
          >
            <span className="relative inline-block text-white">
              {typedText}
              <span
                className="inline-block w-[2px] h-[1em] ml-1 align-middle 
                           bg-white/80 
                           animate-[pulse_1.8s_ease-in-out_infinite]"
              />
            </span>
          </h1>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <MagnetButton strength={0.15}>
              <Button asChild variant="cta" size="xl">
                <Link to="/contact" className="gap-2">
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
                className="bg-white/70 backdrop-blur-sm"
              >
                <Link to="/services" className="gap-2">
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
