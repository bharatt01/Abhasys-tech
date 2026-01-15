import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const momentumSteps = [
  {
    step: "01",
    title: "Clarity Before Execution",
    text:
      "Before building or scaling, we define positioning, priorities, and success metrics. Clear direction prevents wasted effort and aligns teams around outcomes, not assumptions.",
    accent: "#000000",
  },
  {
    step: "02",
    title: "Systems That Compound Growth",
    text:
      "Instead of short-lived campaigns, we design scalable systems — from product architecture to marketing workflows — that create consistent, repeatable growth across channels.",
    accent: "#FF2E00",
  },
  {
    step: "03",
    title: "Measured Execution, Real Accountability",
    text:
      "Every initiative is tracked, reviewed, and refined. We take ownership of decisions, measure performance against real data, and improve continuously — without guesswork.",
    accent: "#0047FF",
  },
];

const MomentumSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-36 bg-white">
      <div ref={ref} className="max-w-6xl mx-auto px-6">

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-neutral-500">
            Our Process
          </span>

          <h2 className="mt-6 text-5xl md:text-7xl font-extrabold text-black leading-tight">
            Momentum
            <br />
            Is Engineered.
          </h2>

          <p className="mt-8 max-w-2xl text-lg text-neutral-600">
            Sustainable growth is not driven by hacks or isolated efforts.
            It’s built when strategy, systems, and execution are designed
            to work together — over time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-28">
          {momentumSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative"
            >
              {/* Large Step Number */}
              <div
                className="absolute -top-16 left-0 text-[120px] font-extrabold leading-none opacity-10 select-none"
                style={{ color: item.accent }}
              >
                {item.step}
              </div>

              <div className="max-w-3xl pl-2">
                <h3 className="text-3xl md:text-4xl font-bold text-black">
                  {item.title}
                </h3>

                <p className="mt-6 text-lg text-neutral-600 leading-relaxed">
                  {item.text}
                </p>

                {/* Accent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "120px" } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8 h-[4px]"
                  style={{ backgroundColor: item.accent }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-40"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 text-xl font-bold text-black border-b-4 border-black pb-2 hover:gap-6 transition-all"
          >
            Start a Strategic Conversation
            <ArrowRight className="w-6 h-6" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default MomentumSection;
