import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/* =========================
   HERO (BOTTOM LAYER)
========================= */
const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

  return (
    <motion.section
      ref={ref}
      style={{ scale }}
      className="sticky top-0 h-screen z-10 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <video
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <h1 className="text-white text-5xl md:text-7xl font-extrabold text-center max-w-5xl leading-tight">
          Transforming Businesses
          <br />
          Via Technology & Strategy
        </h1>
      </div>
    </motion.section>
  );
};

/* =========================
   STACK SECTION
========================= */
type StackSectionProps = {
  title: string;
  description: string;
  image: string;
  bg: string;
  index: number;
};

const StackSection = ({
  title,
  description,
  image,
  bg,
  index,
}: StackSectionProps) => {
  return (
    <motion.section
      className={`sticky top-0 h-screen flex items-center ${bg}`}
      style={{ zIndex: 20 + index }}
      initial={{ y: "100%" }}
      whileInView={{ y: "0%" }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        {/* Text */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {title}
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Image */}
        <div>
          <img
            src={image}
            alt={title}
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </div>
      </div>
    </motion.section>
  );
};

/* =========================
   PAGE (STACKING LOGIC)
========================= */
const StackedPage = () => {
  return (
    <main className="relative">
      {/* HERO */}
      <Hero />

      {/* STACKED SECTIONS */}
      <StackSection
        index={1}
        title="Strategy-Driven Digital Work"
        description="We align business goals with technology to build systems that scale, convert, and last."
        image="/images/project1.jpg"
        bg="bg-[#F4F4F3]"
      />

      <StackSection
        index={2}
        title="Design That Makes Impact"
        description="Every layout, color, and interaction is intentional — crafted to build trust and drive action."
        image="/images/project2.jpg"
        bg="bg-[#ECECEA]"
      />

      <StackSection
        index={3}
        title="Engineering for Performance"
        description="High-speed builds with modern stacks, SEO optimization, and rock-solid architecture."
        image="/images/project3.jpg"
        bg="bg-[#E3E3E0]"
      />
    </main>
  );
};

export default StackedPage;
