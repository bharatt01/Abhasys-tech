import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, memo, useState, useEffect } from "react";

const impacts = [
  {
    title: "Design Systems That Build Trust",
    description:
      "Our UI and UX design focuses on clarity, consistency, and usability—creating interfaces that feel reliable, intuitive, and professionally crafted.",
    image: "/images/img2.jpg",
    accentWord: "Trust",
  },
  {
    title: "Scalable Technology Foundations",
    description:
      "We engineer fast, secure, and scalable web applications that are easy to maintain, future-ready, and built to grow with your business.",
    image: "/images/img3.jpg",
    accentWord: "Scalable",
  },
  {
    title: "Growth Driven by Real Data",
    description:
      "Every improvement is guided by analytics, user behavior, and performance insights—ensuring smarter decisions and measurable business growth.",
    image: "/images/img4.jpg",
    accentWord: "Growth",
  },
  {
    title: "Strategic Clarity That Aligns Teams",
    description:
      "We break down complex business goals into clear digital strategies, helping teams align faster, reduce friction, and execute with confidence.",
    image: "/images/img1.jpg",
    accentWord: "Clarity",
  },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

/* ===========================
   Text Scramble Effect
=========================== */
const ScrambleText = memo(({ text, trigger, accentWord }: { text: string; trigger: boolean; accentWord: string }) => {
  const [display, setDisplay] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!trigger || hasAnimated) return;
    setHasAnimated(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [trigger, text, hasAnimated]);

  const parts = display.split(accentWord);

  if (parts.length === 1) {
    return <span>{display}</span>;
  }

  return (
    <span>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span className="text-indigo-600">{accentWord}</span>
          )}
        </span>
      ))}
    </span>
  );
});
ScrambleText.displayName = "ScrambleText";

/* ===========================
   Impact Card — Stacked / Overlapping Layout
=========================== */
const ImpactCard = memo(({ item, index }: { item: typeof impacts[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const numberX = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center"
      style={{ opacity }}
    >
      {/* Background number — massive, behind everything */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
        style={{ x: numberX }}
      >
        <span 
          className="text-[30vw] font-black text-black/[0.03] leading-none select-none whitespace-nowrap"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </motion.div>

      <div className="container mx-auto px-4 max-w-6xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-0 items-center">

          {/* Image — offset left, overlapping */}
          <motion.div
            className="lg:col-span-7 lg:col-start-1 relative z-10"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden bg-black">
              <motion.div style={{ scale: imageScale }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[16/10] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              {/* Image overlay border */}
              <div className="absolute inset-0 border border-white/10 pointer-events-none" />
            </div>

            {/* Floating index badge */}
            <motion.div
              className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 bg-indigo-600 text-white w-12 h-12 lg:w-16 lg:h-16 flex items-center justify-center"
              initial={{ scale: 0, rotate: -90 }}
              animate={isInView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
            >
              <span className="text-sm lg:text-lg font-black">{String(index + 1).padStart(2, "0")}</span>
            </motion.div>
          </motion.div>

          {/* Content — offset right, overlapping image */}
          <motion.div
            className="lg:col-span-6 lg:col-start-7 lg:-ml-20 relative z-20"
            style={{ y: textY }}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-white p-8 lg:p-10 shadow-2xl shadow-black/5">
              {/* Tag */}
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="h-[2px] bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 32 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/30">
                  Principle 0{index + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-black leading-[1.1] mb-5">
                <ScrambleText text={item.title} trigger={isInView} accentWord={item.accentWord} />
              </h3>

              {/* Description */}
              <motion.p
                className="text-sm text-black/50 leading-[1.8]"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {item.description}
              </motion.p>

              {/* Bottom accent */}
              <div className="mt-8 flex items-center gap-4">
                <motion.div
                  className="h-px bg-black/10 flex-1"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1, delay: 1 }}
                  style={{ originX: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-indigo-600 rotate-45"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.2, type: "spring" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-black/5" />
    </motion.div>
  );
});
ImpactCard.displayName = "ImpactCard";

/* ===========================
   Main Component
=========================== */
const ImpactShowcase = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section className="bg-white overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="relative px-4 pt-24 pb-12 md:pt-36 md:pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
    

          {/* Title */}
          <h2 className="text-4xl text-center md:text-5xl lg:text-6xl font-black text-black leading-[0.95] tracking-tighter">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 60 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              We do not
            </motion.span>
            <motion.span
              className="block text-indigo-600"
              initial={{ opacity: 0, y: 60 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              ship mediocrity.
            </motion.span>
          </h2>

          {/* Subtitle */}
         
        </div>
      </div>

      {/* Thick divider */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div 
          className="h-[2px] bg-black"
          initial={{ scaleX: 0 }}
          animate={isHeaderInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />
      </div>

      {/* Cards — Overlapping stacked layout */}
      <div className="relative">
        {impacts.map((item, index) => (
          <ImpactCard key={item.title} item={item} index={index} />
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="max-w-4xl mx-auto px-4 pb-24 pt-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative border-t-2 border-black pt-10">
          <motion.div
            className="absolute -top-[5px] left-0 w-2.5 h-2.5 bg-indigo-600 rotate-45"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            viewport={{ once: true }}
          />
          <p className="text-xl md:text-2xl font-black text-black max-w-lg leading-snug">
            The work either{" "}
            <span className="relative inline-block">
              holds up
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[4px] bg-indigo-600/25"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
              />
            </span>
            {" "}or it does not.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactShowcase;