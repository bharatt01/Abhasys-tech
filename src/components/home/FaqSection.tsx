import { motion, useInView, LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { useRef, memo, useState } from "react";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most engagements run 6 to 10 weeks from kickoff to launch, depending on scope. We share a detailed timeline before work begins, so there are no surprises along the way.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. We work with teams at every stage, from pre-seed founders validating an idea to established companies rebuilding legacy systems. The process adapts to where you are.",
  },
  {
    question: "What does the design and development process look like?",
    answer:
      "We start with strategy and structure, move into UI design, then build in parallel with weekly reviews. You see working software early and often, not just static mockups.",
  },
  {
    question: "Can you help after the initial launch?",
    answer:
      "Absolutely. Most clients move into an ongoing partnership after launch, covering iteration, performance monitoring, and new feature development as the product grows.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Projects are scoped as a fixed engagement based on deliverables, not hourly billing. You get a clear number upfront, tied to a defined set of outcomes.",
  },
  {
    question: "Do you offer ongoing maintenance plans?",
    answer:
      "Yes. We offer monthly retainers that cover updates, monitoring, and small feature requests, so your product stays reliable long after launch.",
  },
  {
    question: "Which industries have you worked with?",
    answer:
      "Our client base spans SaaS, e-commerce, healthcare, and fintech. The principles stay the same: clarity, speed, and measurable outcomes regardless of sector.",
  },
  {
    question: "Can you work with our in-house engineering team?",
    answer:
      "Definitely. We regularly embed with internal teams, aligning on tooling and workflow so handoff after the engagement is seamless.",
  },
  {
    question: "What platforms and stacks do you build on?",
    answer:
      "We primarily build with React, Next.js, and modern headless CMS platforms, choosing the stack that best fits your scale and team.",
  },
  {
    question: "Do you provide SEO and performance audits?",
    answer:
      "Yes. Every project includes a technical performance and SEO review, with a prioritized list of fixes ranked by impact.",
  },
  {
    question: "How involved do we need to be during the build?",
    answer:
      "We recommend a weekly check-in, but the day-to-day build is handled by our team, so your time investment stays light.",
  },
  {
    question: "What happens if our scope changes mid-project?",
    answer:
      "We reassess scope together and adjust the timeline or budget transparently, rather than absorbing changes silently into delays.",
  },
];

/* ===========================
   FAQ Item
=========================== */
const FAQItem = memo(
  ({
    item,
    index,
    isOpen,
    onToggle,
  }: {
    item: (typeof faqs)[0];
    index: number;
    isOpen: boolean;
    onToggle: () => void;
  }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(itemRef, { once: true, margin: "-50px" });

    return (
      <motion.div
        ref={itemRef}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.06, ease: "easeOut" }}
        className="border-b border-black/10"
      >
        <button
          onClick={onToggle}
          className="w-full flex items-start gap-3 md:gap-4 py-4 md:py-5 text-left group"
        >
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 pt-1 shrink-0">
            Q{String(index + 1).padStart(2, "0")}
          </span>

          <span className="flex-1 text-sm md:text-base font-black text-black leading-[1.3] tracking-tight group-hover:text-indigo-600 transition-colors duration-200">
            {item.question}
          </span>

          <motion.span
            className="shrink-0 w-5 h-5 md:w-6 md:h-6 border border-black/20 flex items-center justify-center mt-0.5"
            animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? "#4f46e5" : "#ffffff" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span
              className={`relative block w-2 h-[1.5px] ${isOpen ? "bg-white" : "bg-black"}`}
            >
              <span
                className={`absolute inset-0 w-[1.5px] h-2 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${
                  isOpen ? "bg-white" : "bg-black"
                }`}
              />
            </span>
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pl-0 md:pl-[calc(1.5rem+1rem)] pb-4 md:pb-5 pr-8 md:pr-9">
                <p className="text-xs md:text-sm text-black/60 leading-[1.7] max-w-md">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);
FAQItem.displayName = "FAQItem";

/* ===========================
   Main Component
=========================== */
const FAQSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="bg-white overflow-hidden">
        {/* Header */}
        <div ref={headerRef} className="relative px-4 pt-16 pb-10 md:pt-24 md:pb-14">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              className="flex items-center justify-center gap-3 mb-5"
              initial={{ opacity: 0, y: 16 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <span className="w-2 h-2 bg-indigo-600 rotate-45" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-black/40">
                Common Questions
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-black leading-[0.95] tracking-tighter">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                Answers, before
              </motion.span>
              <motion.span
                className="block text-indigo-600"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                you have to ask.
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

        {/* FAQ List */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12">
            <div className="lg:border-r lg:border-black/10 lg:pr-0">
              {faqs.slice(0, 6).map((item, index) => (
                <FAQItem
                  key={item.question}
                  item={item}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>
            <div>
              {faqs.slice(6, 12).map((item, index) => {
                const realIndex = index + 6;
                return (
                  <FAQItem
                    key={item.question}
                    item={item}
                    index={realIndex}
                    isOpen={openIndex === realIndex}
                    onToggle={() => handleToggle(realIndex)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto px-4 pb-16 pt-10">
          <div className="relative border-t-2 border-black pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="absolute -top-[5px] left-0 w-2.5 h-2.5 bg-indigo-600 rotate-45" />
            <p className="text-xl md:text-2xl font-black text-black max-w-md leading-snug">
              Still have{" "}
              <span className="relative inline-block">
                questions
                <span className="absolute bottom-0 left-0 w-full h-[4px] bg-indigo-600/25" />
              </span>
              ?
            </p>
            <button className="shrink-0 px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors duration-200">
              Get in touch
            </button>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default FAQSection;