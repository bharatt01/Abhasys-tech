import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MagnetButton from "@/components/ui/MagnetButton";
import ParallaxSection from "@/components/ui/ParallaxSection";
import { useRef } from "react";

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* Scroll motion (light + smooth) */
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* 🌄 Background Image + White Overlay */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: backgroundY }}
      >
        {/* Image */}
        <img
          src="/images/hero-bg.jpg"
          alt="Hero background"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* White overlay ABOVE image, BELOW text */}
        <div className="absolute inset-0 bg-white/25" />

      </motion.div>

      {/* 🎨 Subtle Parallax Blobs */}
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

      {/* 📝 Content (ALWAYS ON TOP) */}
      <motion.div
        className="container mx-auto px-4 relative z-10"
        style={{ y: textY, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-border shadow-soft mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold">
              360° Business Growth Solutions
            </span>
          </div>

          {/* 🔥 Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6 text-center">
  <span className="block text-slate-900">
    Transforming Businesses
  </span>

  <span className="block mt-3 text-gradient font-extrabold">
    Via
  </span>

  <span className="block mt-3 text-slate-900">
    Technology & Strategy
  </span>
</h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-900 max-w-3xl mx-auto mb-10 leading-relaxed">
            We combine technology with strategic marketing to deliver measurable
            growth — from web development to physical branding.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-2">
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

          {/* Trust Indicators */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-slate-600">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-slate-900">500+</span>
              <span className="text-sm">Projects</span>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-slate-900">150+</span>
              <span className="text-sm">Clients</span>
            </div>
            <div className="w-px h-8 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-slate-900">10x</span>
              <span className="text-sm">Avg. ROI</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
