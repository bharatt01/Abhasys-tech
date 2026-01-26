import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTA = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-8 bg-white" ref={ref}>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="
            relative overflow-hidden
            rounded-3xl
            bg-gradient-to-br from-emerald-700 via-teal-700 to-blue-800
            px-8 py-16 md:px-16 md:py-20
            text-center
            shadow-[0_50px_120px_rgba(0,0,0,0.45)]
          "
        >
          {/* Glow background */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-emerald-400/20 via-teal-400/10 to-blue-400/20 blur-3xl"></div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="
              relative
              inline-flex items-center justify-center
              w-16 h-16 rounded-2xl
              bg-white/15 backdrop-blur-sm
              mb-8
            "
          >
            <Rocket className="w-8 h-8 text-white" />
          </motion.div>

          {/* Heading */}
          <h2 className="relative text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Ready to Accelerate Your Growth?
          </h2>

          {/* Subtext */}
          <p className="relative text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            We design and build high-performance digital systems focused on
            scalability, clarity, and real business outcomes — not visual noise.
          </p>

          {/* CTAs */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="xl"
              className="bg-white text-emerald-900 hover:bg-emerald-50 transition-all"
            >
              <Link to="/contact" className="gap-2">
                Start a Project
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>

           <Button
  asChild
  variant="outline"
  size="xl"
  className="
    border-white/80 
    text-white 
    bg-white/10
    hover:bg-white/20 
    hover:text-white
    backdrop-blur-sm
    transition-all
  "
>
  <Link to="/case-studies">View Case Studies</Link>
</Button>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
