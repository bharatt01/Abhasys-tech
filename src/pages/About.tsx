import { useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, ArrowUpRight, Linkedin, Twitter, Mail, User } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import ValuesPop from "@/components/home/Values";
import DepthZoomReveal from "@/components/home/DepthZoomReveal";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const heroLines = ["We turn ambitious", "businesses into", "digital-first ones."];

const keyFacts = [
  { value: "20+", label: "projects delivered" },
  { value: "15+", label: "clients served" },
  // { value: "3", label: "offices across India" },
];

const capabilities = [
  { name: "Websites and products", text: "Fast, high-converting websites and custom software built around how your customers buy." },
  { name: "Performance marketing", text: "Campaigns tracked to revenue, so you know what to keep and what to stop paying for." },
  { name: "SaaS maintenance", text: "Updates, fixes and monitoring that keep your product stable after launch." },
  { name: "Offline branding", text: "On-ground activations and physical branding that match your online presence." },
  { name: "Consultancy", text: "Practical advice on technology and growth for founders and leadership teams." },
  { name: "AI solutions", text: "AI and LLM features and automations built into the tools your team uses daily." },
];

const statements = {
  mission: {
    label: "Our mission",
    text: "Help startups, SMEs and enterprises use modern technology and performance marketing without the complexity or the cost.",
    note: "We choose clear plans and careful execution over short-term tactics, so growth lasts.",
  },
  vision: {
    label: "Our vision",
    text: "Become the digital growth partner Indian businesses trust most.",
    note: "Known for strategy-led design, dependable technology and results that last across industries.",
  },
} as const;

const timelineEvents = [
  { year: "2022", title: "Professional team, one office", description: "We started in Faridabad with one belief: Indian businesses grow faster when strategy, design and technology come from one team.", highlight: "Professional team" },
  { year: "2023", title: "Our first enterprise client", description: "An enterprise team trusted us with a full engagement. We added digital marketing and shipped over 50 projects.", highlight: "20+ projects" },
  { year: "2024", title: "Remote-first, across India", description: "We moved to remote work, hired from across the country, and launched SaaS maintenance for products that need steady care.", highlight: "15+ clients" },
  // { year: "2024", title: "From screens to streets", description: "We added on-ground activations and offline branding, so one campaign can run across digital and physical channels.", highlight: "25 team members" },
  { year: "2025", title: "Delhi NCR Based", description: "We opened two new offices and started advising leadership teams on technology and growth.", highlight: "20+ projects" },
  { year: "2026", title: "AI built into how we work", description: "AI and LLM capabilities now sit inside our tech stack, helping clients automate work and ship smarter products.", highlight: "10+ projects" },
];

const teamMembers = [
  { name: "Bharat Sharma", role: "Founder", image: "/images/Founder.jpg", bio: "Leads business development and enterprise partnerships, and sets the company's direction." },
  { name: "Abhishek Rawat", role: "Web Developer", image: "/images/Technical-Head.jpg", bio: "Builds fast, reliable websites and web apps, from prototype to production." },
  { name: "Bhavesh Gupta", role: "Business Head", image: "/images/founder5.png", bio: "Turns client goals into plans, and plans into results." },
];

// Set to true to show the team section.
const SHOW_TEAM = false;

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

/** Rotating text badge that sits on the hero. */
const SpinBadge = () => {
  const id = useId();
  const reduce = useReducedMotion();
  return (
    <a
      href="#story"
      aria-label="Scroll to our story"
      className="relative hidden h-36 w-36 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground md:flex"
    >
      <motion.svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path id={id} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text className="fill-current text-[11px] font-semibold" letterSpacing="2.6">
          <textPath href={`#${id}`}>Faridabad • Since 2022 •</textPath>
        </text>
      </motion.svg>
      <ArrowDown className="h-7 w-7" aria-hidden />
    </a>
  );
};

/** Endless scrolling band of capabilities. */
const Marquee = () => {
  const reduce = useReducedMotion();
  const items = [...capabilities, ...capabilities];
  return (
   <div className="overflow-hidden py-20 md:py-32">
  <div className="-rotate-6 scale-105 bg-primary py-5 text-primary-foreground">
    <motion.div
      className="flex w-max gap-10 whitespace-nowrap"
      animate={reduce ? undefined : { x: ["-50%", "10%"] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      {items.map((c, i) => (
        <span key={i} className="flex items-center gap-10 text-3xl font-extrabold tracking-tight md:text-5xl">
          {c.name}
          <span aria-hidden className="text-primary-foreground/50">✦</span>
        </span>
      ))}
    </motion.div>
  </div>
</div>
  );
};

/** Mission / vision toggle. */
const Statement = () => {
  const [tab, setTab] = useState<keyof typeof statements>("mission");
  const s = statements[tab];
  return (
    <section className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div role="tablist" className="mb-10 inline-flex rounded-full border border-background/25 p-1">
          {(Object.keys(statements) as (keyof typeof statements)[]).map((k) => (
            <button
              key={k}
              role="tab"
              aria-selected={tab === k}
              onClick={() => setTab(k)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-background ${
                tab === k ? "bg-background text-foreground" : "text-background/70 hover:text-background"
              }`}
            >
              {statements[k].label}
            </button>
          ))}
        </div>

        <div className="min-h-[18rem] md:min-h-[22rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.35 }}
            >
              <p className="max-w-5xl text-3xl font-bold leading-[1.1] tracking-tight md:text-6xl">{s.text}</p>
              <p className="mt-8 max-w-2xl text-lg text-background/70">{s.note}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

/** Hover-reveal list of what we do. */
const Capabilities = () => (
  <section className="container mx-auto px-4 py-24">
    <h2 className="mb-12 max-w-2xl text-3xl font-extrabold tracking-tight md:text-5xl">
      One team for the whole journey
    </h2>
    <ul>
      {capabilities.map((c) => (
        <li
          key={c.name}
          tabIndex={0}
          className="group flex flex-col gap-3 border-t border-border py-7 outline-none last:border-b focus-visible:bg-muted md:flex-row md:items-center md:justify-between md:gap-10"
        >
          <h3 className="flex items-center gap-4 text-3xl font-bold tracking-tight text-foreground/50 transition-all duration-300 group-hover:translate-x-3 group-hover:text-primary group-focus-visible:text-primary md:text-5xl">
            {c.name}
            <ArrowUpRight className="h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 md:h-10 md:w-10" aria-hidden />
          </h3>
          <p className="max-w-sm text-muted-foreground transition-all duration-300 md:translate-x-4 md:opacity-0 md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-focus-visible:translate-x-0 md:group-focus-visible:opacity-100">
            {c.text}
          </p>
        </li>
      ))}
    </ul>
  </section>
);

/** The memorable piece: a giant year that changes as you scroll. */
const ScrollTimeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = timelineEvents.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const e = timelineEvents[active];

  return (
    <div ref={ref} className="relative" style={{ height: `${n * 60 + 40}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-4 pt-16">
          <div className="grid items-center gap-6 md:grid-cols-2 md:gap-12">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={e.year}
                  initial={{ y: "70%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-70%", opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-[26vw] font-black leading-[0.9] tracking-tighter text-primary md:text-[14rem]"
                  aria-live="polite"
                >
                  {e.year}
                </motion.p>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={e.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="min-h-[15rem]"
              >
                <h3 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{e.title}</h3>
                <p className="mb-6 max-w-lg text-lg leading-relaxed text-muted-foreground">{e.description}</p>
                <span className="inline-block rounded-full bg-accent px-5 py-2 text-lg font-bold text-accent-foreground">
                  {e.highlight}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress */}
          <div className="mt-10">
            <div className="relative h-1 rounded-full bg-border">
              <motion.div className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-primary" style={{ scaleX: barScale }} />
            </div>
            <div className="mt-3 flex justify-between text-sm font-semibold">
              {timelineEvents.map((t, i) => (
                <span key={t.year} className={i === active ? "text-primary" : "text-muted-foreground"}>
                  {t.year}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamCard = ({ member }: { member: (typeof teamMembers)[number] }) => (
  <article>
    <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
      <img
        src={member.image}
        alt={`Portrait of ${member.name}`}
        loading="lazy"
        onError={(ev) => {
          ev.currentTarget.style.display = "none";
          const f = ev.currentTarget.nextElementSibling as HTMLElement | null;
          if (f) f.style.display = "flex";
        }}
        className="h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 hidden items-center justify-center">
        <User className="h-16 w-16 text-muted-foreground" aria-hidden />
      </div>
    </div>
    <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
    <p className="font-medium text-primary">{member.role}</p>
    <p className="mt-2 max-w-sm text-sm text-muted-foreground">{member.bio}</p>
    <div className="mt-3 flex gap-2">
      {[Linkedin, Twitter, Mail].map((Icon, i) => (
        <a key={i} href="#" aria-label="Social link" className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  </article>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const About = () => {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-36">
          <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

          <div className="container relative mx-auto px-4">
            <h1 className="max-w-5xl text-5xl font-black leading-[1] tracking-tighter md:text-8xl">
              {heroLines.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-2">
                  <motion.span
                    className="block"
                    initial={reduce ? false : { y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="mt-10 flex flex-col justify-between gap-10 md:flex-row md:items-end">
              <div className="max-w-xl">
                <p className="mb-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  Websites, software and marketing from one team that plans,
                  designs, builds and measures. Every project is judged by what
                  it does for your business.
                </p>
                <Button asChild size="lg">
                  <Link to="/contact" className="gap-2">
                    Start a project
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Link>
                </Button>
              </div>
              <SpinBadge />
            </div>

            <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-border pt-8">
              {keyFacts.map((f) => (
                <div key={f.label}>
                  <dd className="text-4xl font-black tracking-tight tabular-nums md:text-6xl">{f.value}</dd>
                  <dt className="mt-1 text-sm text-muted-foreground md:text-base">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Marquee />

        <Statement />

        <Capabilities />

        <DepthZoomReveal />

        <ValuesPop />

        {/* Story */}
        <section id="story" className="scroll-mt-24 pt-24">
          <div className="container mx-auto px-4">
            <h2 className="max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">
              Five years of growing with our clients
            </h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">Keep scrolling to move through our story.</p>
          </div>
          <ScrollTimeline />
        </section>

        {SHOW_TEAM && (
          <section className="container mx-auto px-4 pb-24">
            <h2 className="mb-12 text-3xl font-extrabold tracking-tight md:text-5xl">The people you'll work with</h2>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="container mx-auto px-4 pb-24">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-8 py-16 text-primary-foreground md:px-16 md:py-24">
            <div aria-hidden className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary-foreground/10" />
            <div aria-hidden className="absolute -bottom-24 right-40 h-56 w-56 rounded-full bg-primary-foreground/10" />
            <h2 className="relative max-w-4xl text-4xl font-black leading-[1.02] tracking-tighter md:text-7xl">
              Let's build something people remember.
            </h2>
            <div className="relative mt-10 flex flex-wrap items-center gap-6">
              <Button asChild variant="secondary" size="lg">
                <Link to="/contact" className="gap-2">
                  Talk to our team
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
              </Button>
              <p className="text-primary-foreground/80">Tell us your goal and we'll reply with ideas and next steps.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;