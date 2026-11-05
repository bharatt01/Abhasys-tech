import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, MotionValue } from "framer-motion";

const services = [
  "Website design and development",
  "Custom software development",
  "SEO and digital marketing",
  "Analytics and reporting",
];

const steps = [
  {
    title: "Understand",
    text: "We start with your goals, your customers and your numbers.",
    detail: "Research, analytics and a competitor review shape a brief everyone agrees on.",
  },
  {
    title: "Design",
    text: "A clear plan comes before any pixel or line of code.",
    detail: "Sitemap, wireframes and a clickable prototype that you approve first.",
  },
  {
    title: "Build",
    text: "Websites and software made to scale with your business.",
    detail: "Fast, accessible, search-friendly code with technical SEO built in.",
  },
  {
    title: "Grow",
    text: "Campaigns measured against revenue, then improved.",
    detail: "SEO, paid ads and email campaigns, with a clear report every month.",
  },
];

const StepBody = ({ step, index }: { step: (typeof steps)[number]; index: number }) => (
  <>
    <p className="text-sm font-semibold text-white/60">0{index + 1}</p>
    <h3 className="mt-1 text-xl font-bold md:text-2xl">{step.title}</h3>
    <p className="mt-2 hidden text-sm leading-relaxed text-white/85 md:block">{step.text}</p>
    <p className="mt-2 hidden text-sm leading-relaxed text-white/60 lg:block">{step.detail}</p>
  </>
);

const Step = ({
  step,
  index,
  progress,
}: {
  step: (typeof steps)[number];
  index: number;
  progress: MotionValue<number>;
}) => {
  // Steps start right as the heading finishes and overlap heavily, so the card
  // never sits half-empty and never shows just one step on its own.
  const start = 0.3 + index * 0.025;
  const opacity = useTransform(progress, [start, start + 0.12], [0, 1]);
  const y = useTransform(progress, [start, start + 0.12], [24, 0]);

  return (
    <motion.li style={{ opacity, y }} className="border-t border-white/30 pt-4">
      <StepBody step={step} index={index} />
    </motion.li>
  );
};

/** True on phones, so the starting frame can be wider and taller there. */
const useCompact = (): boolean => {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return compact;
};

const DepthZoomReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const compact = useCompact();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // The card grows from a framed image to full screen as you scroll.
  // Sizes are percentages of the sticky stage, so they follow the real visible viewport.
  const width = useTransform(scrollYProgress, [0, 0.4], [compact ? "88%" : "62%", "100%"]);
  const height = useTransform(scrollYProgress, [0, 0.4], [compact ? "62%" : "55%", "100%"]);
  const radius = useTransform(scrollYProgress, [0, 0.4], [compact ? 28 : 40, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.6], [1.12, 1]);
  // The dark overlay fades in with the text, so the framed image stays bright and clear at the top.
  const overlayOpacity = useTransform(scrollYProgress, [0.04, 0.3], [0, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0.08, 0.3], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.08, 0.3], [30, 0]);

  const content = (
    <div className="relative z-10 flex h-full w-full flex-col justify-between gap-6 p-6 pt-24 text-white md:p-14 md:pt-24">
      <motion.div style={reduce ? undefined : { opacity: headingOpacity, y: headingY }}>
        <h2 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-tighter md:text-6xl">
          Strategy first. Everything else follows.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
          Every solution we build starts with a clear plan, so design, technology and marketing
          all pull in the same direction.
          <span className="hidden md:inline">
            {" "}
            Whether you need a new business website, custom software or a search and paid
            marketing programme, one team plans it, builds it and measures it against revenue.
          </span>
        </p>
        <ul
          aria-label="Our services"
          className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm font-medium"
        >
          {services.map((s) => (
            <li key={s} className="rounded-full border border-white/40 px-3 py-1 text-white/90">
              {s}
            </li>
          ))}
        </ul>
      </motion.div>

      <ol className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-8">
        {steps.map((s, i) =>
          reduce ? (
            <li key={s.title} className="border-t border-white/30 pt-4">
              <StepBody step={s} index={i} />
            </li>
          ) : (
            <Step key={s.title} step={s} index={i} progress={scrollYProgress} />
          ),
        )}
      </ol>
    </div>
  );

  const background = (
    <>
      <motion.img
        src="/images/expand.jpg"
        alt=""
        aria-hidden
        style={reduce ? undefined : { scale: imageScale }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Light scrim always on, so the image never looks flat or washed out */}
      <div className="absolute inset-0 bg-black/10" />
      {/* Strong gradient for text legibility, faded in on scroll */}
      <motion.div
        style={reduce ? undefined : { opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/50"
      />
    </>
  );

  // Reduced motion: show the finished state with no scroll effects.
  if (reduce) {
    return (
      <section className="px-4 py-16" aria-label="Our approach">
        <div className="relative mx-auto min-h-[34rem] max-w-7xl overflow-hidden rounded-[2.5rem] bg-foreground">
          {background}
          {content}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label="Our approach">
      {/* svh = the visible viewport on phones; h-screen is the fallback */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden supports-[height:100svh]:h-[100svh]">
        <motion.div
          style={{ width, height, borderRadius: radius }}
          className="relative overflow-hidden bg-foreground shadow-2xl"
        >
          {background}
          {/* Content is laid out at full-screen size and centred, so the growing card just
              reveals it. Text no longer re-wraps or squashes while the card is small. */}
          <div className="absolute left-1/2 top-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2 supports-[height:100svh]:h-[100svh]">
            {content}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DepthZoomReveal;