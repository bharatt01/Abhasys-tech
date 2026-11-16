import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect } from "react";
import { TrendingUp, Users, Award, Briefcase } from "lucide-react";

const stats = [
  { icon: Briefcase, value: 50, suffix: "+", label: "Projects Delivered" },
  { icon: TrendingUp, value: 10, suffix: "x", label: "Average ROI" },
  { icon: Users, value: 20, suffix: "+", label: "Happy Clients" },
  { icon: Award, value: 5, suffix: "+", label: "Industry Awards" },
];

/* Writes straight to the DOM node, so counting up causes zero React re-renders
   (before: 60 setState calls per counter). */
const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!isInView || !node) return;

    if (reduce) {
      node.textContent = `${value}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [isInView, value, suffix, reduce]);

  return <span ref={ref}>0{suffix}</span>;
};

const Stats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section className="pt-12 pb-14 bg-white">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-3">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>

              <div className="text-4xl md:text-5xl font-extrabold text-foreground mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>

              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;