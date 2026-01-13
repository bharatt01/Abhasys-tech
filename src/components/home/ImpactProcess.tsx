import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const impacts = [
  {
    title: "Clarity That Aligns Teams",
    description:
      "We translate complex ideas into clear direction — so everyone moves forward with confidence.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  },
  {
    title: "Design That Earns Trust",
    description:
      "Clean, intentional interfaces that feel credible, familiar, and quietly persuasive.",
    image:
      "https://images.unsplash.com/photo-1545235617-9465d2a55698",
  },
  {
    title: "Technology Built to Scale",
    description:
      "Fast, stable systems designed to grow without rewrites, rework, or technical debt.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
  {
    title: "Growth Driven by Signals",
    description:
      "Every decision backed by data, feedback, and real-world performance — not assumptions.",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
  },
];

const ImpactShowcase = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="py-24 bg-white">

<div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
         className="text-center max-w-2xl mx-auto mb-14"

        >
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Our Impact
          </span>

          <h2 className="mt-5 text-3xl md:text-4xl font-extrabold text-black leading-tight">
            How We Create
            <br />
            Meaningful Impact
          </h2>

          <p className="mt-5 text-base text-neutral-600">
            Real outcomes that move businesses forward — without noise.
          </p>
        </motion.div>

        {/* Grid: 2 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {impacts.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              {/* Image */}
              <div className="relative h-[220px] overflow-hidden border-2 border-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="mt-6 max-w-md">
                <h3 className="text-xl font-bold text-black leading-snug">
                  {item.title}
                </h3>

                <div className="mt-3 h-[2px] w-12 bg-black" />

                <p className="mt-4 text-sm text-neutral-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <p className="text-lg font-semibold text-black max-w-xl mx-auto">
            The difference between launching —
            <br />
            and building something that lasts.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactShowcase;
