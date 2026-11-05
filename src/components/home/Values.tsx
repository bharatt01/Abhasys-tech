import { useState } from "react";
import { motion } from "framer-motion";
import { Target, ShieldCheck, Zap, Rocket } from "lucide-react";

const values = [
  {
    title: "Strategic thinking",
    desc: "We focus on measurable outcomes: leads, revenue, engagement and operational efficiency.",
    icon: Target,
    panel: "bg-primary text-primary-foreground",
    muted: "text-primary-foreground/70",
  },
  {
    title: "Execution excellence",
    desc: "From design to deployment, we hold every project to a high standard of quality, performance and reliability.",
    icon: Zap,
    panel: "bg-foreground text-background",
    muted: "text-background/70",
  },
  {
    title: "Innovation with purpose",
    desc: "We adopt modern frameworks, AI tools and automation, but only where they help our clients get ahead.",
    icon: Rocket,
    panel: "bg-accent text-accent-foreground",
    muted: "text-accent-foreground/75",
  },
  {
    title: "Trust and transparency",
    desc: "We work as long-term partners, not vendors, aligned with your goals and your growth roadmap.",
    icon: ShieldCheck,
    panel: "bg-ring text-background border border-border",
    muted: "text-background/80",
  },
];

const ValuesProfessional = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-background py-24 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-4 md:grid-cols-12 md:items-end"
        >
          <h2 className="text-3xl font-extrabold tracking-tight md:col-span-7 md:text-5xl">
            Four principles behind every project
          </h2>
          <p className="text-lg text-muted-foreground md:col-span-5">
            Great results come from clarity, discipline and strong
            partnerships, not shortcuts.
          </p>
        </motion.div>

        <div className="flex h-[36rem] flex-col gap-3 md:h-[30rem] md:flex-row">
          {values.map((v, i) => {
            const isActive = active === i;
            return (
              <button
                key={v.title}
                type="button"
                aria-expanded={isActive}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                style={{ flexGrow: isActive ? 4 : 1 }}
                className={`relative min-h-0 min-w-0 basis-0 overflow-hidden rounded-3xl p-6 text-left transition-[flex-grow] duration-500 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none md:p-8 ${v.panel}`}
              >
                {/* Collapsed state */}
                <div
                  className={`absolute inset-0 flex items-center gap-4 p-6 transition-opacity duration-300 md:flex-col md:justify-between md:p-8 ${
                    isActive ? "pointer-events-none opacity-0" : "opacity-100 delay-200"
                  }`}
                >
                  <v.icon className="h-6 w-6 shrink-0" aria-hidden />
                  <span className="text-lg font-bold md:rotate-180 md:text-xl md:[writing-mode:vertical-rl]">
                    {v.title}
                  </span>
                </div>

                {/* Expanded state */}
                <div
                  className={`flex h-full w-[calc(100vw-5rem)] max-w-md flex-col justify-between transition-opacity duration-300 ${
                    isActive ? "opacity-100 delay-200" : "pointer-events-none opacity-0"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <v.icon className="h-10 w-10" aria-hidden />
                    <span className={`text-sm font-semibold ${v.muted}`}>0{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="mb-3 text-2xl font-bold tracking-tight md:text-4xl">{v.title}</h3>
                    <p className={`text-base leading-relaxed md:text-lg ${v.muted}`}>{v.desc}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValuesProfessional;