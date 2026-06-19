import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
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

  // Split to highlight accent word in indigo
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
            <span className="text-indigo-500">{accentWord}</span>
          )}
        </span>
      ))}
    </span>
  );
});
ScrambleText.displayName = "ScrambleText";

/* ===========================
   Magnetic Image
=========================== */
const MagneticImage = memo(({ src, alt }: { src: string; alt: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.1);
    y.set((e.clientY - centerY) * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden cursor-none"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        whileHover={{ scale: 1.08 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-0 bg-white mix-blend-difference pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: [0, 0.3, 0, 0.2, 0], x: [-5, 5, -3, 0] }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
});
MagneticImage.displayName = "MagneticImage";

/* ===========================
   Impact Card
=========================== */
const ImpactCard = memo(({ item, index }: { item: typeof impacts[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const textX = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[70vh] lg:min-h-[80vh] border-t-2 border-black"
      style={{ opacity }}
    >
      {/* Image Side */}
      <motion.div
        className={`relative overflow-hidden bg-black ${isEven ? "lg:order-1" : "lg:order-2"}`}
        style={{ rotate: imageRotate }}
        initial={{ clipPath: isEven ? "polygon(0 0, 0 0, 0 100%, 0 100%)" : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
        animate={isInView ? { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <MagneticImage src={item.image} alt={item.title} />
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
      </motion.div>

      {/* Content Side */}
      <motion.div
        className={`relative flex flex-col justify-center p-8 lg:p-16 xl:p-20 bg-white ${isEven ? "lg:order-2" : "lg:order-1"}`}
        style={{ x: textX }}
      >
        <motion.div
          className="absolute top-4 right-4 lg:top-8 lg:right-8 text-[100px] lg:text-[160px] font-black text-black/[0.04] leading-none select-none"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Tag */}
          <div className="flex items-center gap-3 mb-8">
            <motion.div
              className="h-[2px] bg-indigo-500"
              initial={{ width: 0 }}
              animate={isInView ? { width: 40 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">
              0{index + 1} / 04
            </span>
          </div>

          {/* Title with scramble + indigo accent word */}
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-[1.05] mb-8">
            <ScrambleText text={item.title} trigger={isInView} accentWord={item.accentWord} />
          </h3>

          {/* Description with indigo highlight on key phrase */}
          <motion.p
            className="text-sm md:text-base text-black/60 leading-relaxed max-w-md"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {item.description}
          </motion.p>

          {/* Animated border */}
          <motion.div
            className="mt-10 h-[1px] bg-black/20"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 1 }}
            style={{ originX: 0 }}
          />
        </motion.div>
      </motion.div>
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set((e.clientX - window.innerWidth / 2) * 0.02);
    mouseY.set((e.clientY - window.innerHeight / 2) * 0.02);
  };

  return (
    <section className="bg-white overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Header */}
      <div ref={headerRef} className="container mx-auto px-4 max-w-6xl pt-24 pb-4 md:pt-32 md:pb-8">
        <motion.div
          className="relative"
          style={{ x: springMouseX, y: springMouseY }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="h-[1px] w-12 bg-indigo-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">
                Our Approach
              </span>
            </motion.div>

            {/* Title */}
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-black leading-[0.9] tracking-tighter">
              {["How", "We", "Deliver"].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 80, rotate: 5 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {["Real", "Business"].map((word, i) => (
                <motion.span
                  key={word}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 80, rotate: 5 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                className="inline-block relative text-indigo-500"
                initial={{ opacity: 0, y: 80, rotate: 5 }}
                animate={isHeaderInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Impact
                <motion.div
                  className="absolute -bottom-2 left-0 h-[8px] bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={isHeaderInView ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                />
              </motion.span>
            </h2>

            <motion.p
              className="mt-10 text-lg md:text-xl text-black/40 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Strategy, design, and technology working together to create products
              that <span className="text-indigo-500 font-semibold">perform</span>, scale, and last.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Cards */}
      <div className="container mx-auto px-4 max-w-6xl pb-20 md:pb-28">
        {impacts.map((item, index) => (
          <ImpactCard key={item.title} item={item} index={index} />
        ))}
      </div>

      {/* Footer Quote */}
      <motion.div
        className="container mx-auto px-4 max-w-6xl pb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative border-t-2 border-black pt-12">
          <motion.div
            className="absolute -top-[5px] left-0 w-3 h-3 bg-indigo-500"
            initial={{ scale: 0, rotate: 0 }}
            whileInView={{ scale: 1, rotate: 180 }}
            transition={{ duration: 0.4, type: "spring" }}
            viewport={{ once: true }}
          />
          <p className="text-2xl md:text-4xl font-black text-black max-w-2xl leading-tight">
            Not just building products —{" "}
            <span className="relative inline-block">
              building foundations
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[6px] bg"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
              />
            </span>{" "}
            for long-term <span className="text-indigo-500">growth</span>.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default ImpactShowcase;