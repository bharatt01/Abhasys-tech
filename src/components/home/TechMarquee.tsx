import { motion, useInView, LazyMotion, domAnimation } from "framer-motion";
import { useRef, memo } from "react";

const rowOne = [
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Tailwind CSS", slug: "tailwindcss" },
  { name: "Framer Motion", slug: "framer" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "GraphQL", slug: "graphql" },
  { name: "PostgreSQL", slug: "postgresql" },
];

const rowTwo = [
  { name: "Figma", slug: "figma" },
  { name: "Vercel", slug: "vercel" },
  { name: "AWS", slug: "amazonaws" },
  { name: "Docker", slug: "docker" },
  { name: "Sanity", slug: "sanity" },
  { name: "Stripe", slug: "stripe" },
  { name: "Redis", slug: "redis" },
  { name: "Supabase", slug: "supabase" },
];

/* ===========================
   Tech Pill with Colorful Logo
=========================== */
const TechPill = memo(({ name, slug }: { name: string; slug: string }) => (
  <div className="group flex items-center gap-4 shrink-0 border border-black/10 bg-white px-7 py-4 md:px-8 md:py-5 mx-3 md:mx-4 rounded-xl hover:border-[#D4A017]/60 hover:shadow-[0_0_20px_rgba(212,160,23,0.15)] transition-all duration-300">
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={`${name} logo`}
      className="w-9 h-9 md:w-10 md:h-10 shrink-0 object-contain group-hover:scale-110 transition-transform duration-300"
      loading="lazy"
      decoding="async"
      draggable={false}
    />

    <span className="text-lg md:text-xl font-black text-black tracking-tight whitespace-nowrap">
      {name}
    </span>
  </div>
));


/* ===========================
   Marquee Row
=========================== */
const MarqueeRow = memo(
  ({
    items,
    direction,
    duration,
  }: {
    items: { name: string; slug: string }[];
    direction: "left" | "right";
    duration: number;
  }) => {
    const loopItems = [...items, ...items, ...items, ...items];

    return (
      <div className="relative overflow-hidden w-full">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex w-max py-2"
          animate={{
            x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
          }}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {loopItems.map((item, i) => (
            <TechPill key={`${item.slug}-${i}`} name={item.name} slug={item.slug} />
          ))}
        </motion.div>
      </div>
    );
  }
);
MarqueeRow.displayName = "MarqueeRow";

/* ===========================
   Main Component
=========================== */
const TechMarquee = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="bg-white overflow-hidden">
        {/* Header */}
        <div ref={headerRef} className="relative px-4 pt-16 pb-4 md:pt-24 md:pb-6">
          <div className="max-w-5xl mx-auto text-center">
           
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-indigo-600 leading-[0.95] tracking-tighter">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                Tools we trust,
              </motion.span>
              <motion.span
                className="block text-black"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                built to last.
              </motion.span>
            </h2>
          </div>
        </div>

        {/* Thick Divider */}
      

        {/* Marquee Rows */}
        <div className="py-10 md:py-10 flex flex-col gap-2 md:gap-4">
          <MarqueeRow items={rowOne} direction="left" duration={60} />
          <MarqueeRow items={rowTwo} direction="right" duration={66} />
        </div>
      </section>
    </LazyMotion>
  );
};

export default TechMarquee;