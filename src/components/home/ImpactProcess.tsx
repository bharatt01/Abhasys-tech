import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const impacts = [
  {
    title: "Strategic Clarity That Aligns Teams",
    description:
      "We break down complex business goals into clear digital strategies, helping teams align faster, reduce friction, and execute with confidence.",
    image: "/images/img1.jpg",
  },
  {
    title: "Design Systems That Build Trust",
    description:
      "Our UI and UX design focuses on clarity, consistency, and usability—creating interfaces that feel reliable, intuitive, and professionally crafted.",
    image: "/images/img2.jpg",
  },
  {
    title: "Scalable Technology Foundations",
    description:
      "We engineer fast, secure, and scalable web applications that are easy to maintain, future-ready, and built to grow with your business.",
    image: "/images/img3.jpg",
  },
  {
    title: "Growth Driven by Real Data",
    description:
      "Every improvement is guided by analytics, user behavior, and performance insights—ensuring smarter decisions and measurable business growth.",
    image: "/images/img4.jpg",
  },
];

const ImpactShowcase = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
<section ref={ref} className="pt-10 pb-4 bg-white">

<div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-black leading-tight">
            How We Deliver
            <br />
            Real Business Impact
          </h2>

          <p className="mt-4 text-base text-neutral-600">
            Strategy, design, and technology working together to create products
            that perform, scale, and last.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {impacts.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 26 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              {/* Image */}
              <div className="relative h-[300px] overflow-hidden border-2 border-black">
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

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
         className="mt-8 text-center"

        >
         <p className="text-lg font-semibold text-black max-w-3xl mx-auto">
  " Not just building products — building foundations for long-term growth."
</p>

        </motion.div>
      </div>
    </section>
  );
};

export default ImpactShowcase;
