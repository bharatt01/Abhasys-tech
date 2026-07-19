import { motion, useInView, LazyMotion, domAnimation } from "framer-motion";
import { useRef, memo, useState, useEffect, useCallback } from "react";

const impacts = [
  {
    title: "Design Systems That Build Trust",
    description:
      "Our UI and UX design focuses on clarity, consistency, and usability—creating interfaces that feel reliable, intuitive, and professionally crafted.",
    image: "/images/img1.jpg",
    accentWord: "Trust",
  },
  {
    title: "Scalable Technology Foundations",
    description:
      "We engineer fast, secure, and scalable web applications that are easy to maintain, future-ready, and built to grow with your business.",
    image: "/images/img2.jpg",
    accentWord: "Scalable",
  },
  {
    title: "Growth Driven by Real Data",
    description:
      "Every improvement is guided by analytics, user behavior, and performance insights—ensuring smarter decisions and measurable business growth.",
    image: "/images/img3.jpg",
    accentWord: "Growth",
  },
  {
    title: "Strategic Clarity That Aligns Teams",
    description:
      "We break down complex business goals into clear digital strategies, helping teams align faster, reduce friction, and execute with confidence.",
    image: "/images/img4.jpg",
    accentWord: "Clarity",
  },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/* ===========================
   Optimized Scramble Text
=========================== */
const ScrambleText = memo(({ text, trigger, accentWord }: { text: string; trigger: boolean; accentWord: string }) => {
  const [display, setDisplay] = useState(text);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!trigger || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let iteration = 0;
    const len = text.length;
    const interval = setInterval(() => {
      iteration += 0.8;
      if (iteration >= len) {
        clearInterval(interval);
        setDisplay(text);
        return;
      }
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
    }, 30);

    return () => clearInterval(interval);
  }, [trigger, text]);

  const parts = display.split(accentWord);
  if (parts.length === 1) return <span>{display}</span>;

  return (
    <span>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="text-indigo-600">{accentWord}</span>}
        </span>
      ))}
    </span>
  );
});
ScrambleText.displayName = "ScrambleText";

/* ===========================
   Impact Card
=========================== */
const ImpactCard = memo(({ item, index }: { item: typeof impacts[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={cardRef} className="relative py-6 md:py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
          
          {/* Image */}
          <motion.div
            className={`relative overflow-hidden ${isEven ? "lg:order-1" : "lg:order-2"}`}
            initial={{ opacity: 0, x: isEven ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative bg-black overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-[4/3] object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 border border-white/10 pointer-events-none" />
            </div>

            {/* Index Badge */}
            <motion.div
              className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-indigo-600 text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <span className="text-sm md:text-lg font-black">{String(index + 1).padStart(2, "0")}</span>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            className={`${isEven ? "lg:order-2" : "lg:order-1"}`}
            initial={{ opacity: 0, x: isEven ? 40 : -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Principle Tag */}
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  className="h-[2px] bg-indigo-600"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 32 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">
                  Principle 0{index + 1}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-black leading-[1.1] mb-4">
               {item.title}
              </h3>

              {/* Description */}
              <motion.p
                className="text-sm md:text-base text-black/60 leading-[1.8] max-w-md"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {item.description}
              </motion.p>

              {/* Bottom Accent */}
              <div className="mt-6 flex items-center gap-4">
                <motion.div
                  className="h-px bg-black/15 flex-1 max-w-[120px]"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  style={{ originX: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-indigo-600 rotate-45"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1, type: "spring", stiffness: 300 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {index < impacts.length - 1 && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-black/10" />
      )}
    </div>
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
    <LazyMotion features={domAnimation} strict>
      <section className="bg-white overflow-hidden">
        {/* Header */}
        <div ref={headerRef} className="relative px-4 pt-16 pb-10 md:pt-24 md:pb-14">
          <div className="max-w-5xl mx-auto text-center">
         

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black leading-[0.95] tracking-tighter">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                We do not
              </motion.span>
              <motion.span
                className="block text-indigo-600"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                ship mediocrity.
              </motion.span>
            </h2>
          </div>
        </div>

        {/* Thick Divider */}
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            className="h-[2px] bg-black"
            initial={{ scaleX: 0 }}
            animate={isHeaderInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            style={{ originX: 0.5 }}
          />
        </div>

        {/* Cards */}
        <div className="relative">
          {impacts.map((item, index) => (
            <ImpactCard key={item.title} item={item} index={index} />
          ))}
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto px-4 pb-16 pt-8">
          <div className="relative border-t-2 border-black pt-8">
            <div className="absolute -top-[5px] left-0 w-2.5 h-2.5 bg-indigo-600 rotate-45" />
            <p className="text-xl md:text-2xl font-black text-black max-w-lg leading-snug">
              The work either{" "}
              <span className="relative inline-block">
                holds up
                <span className="absolute bottom-0 left-0 w-full h-[4px] bg-indigo-600/25" />
              </span>
              {" "}or it does not.
            </p>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default ImpactShowcase;
