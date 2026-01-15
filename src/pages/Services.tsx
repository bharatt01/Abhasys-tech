"use client";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Server,
  Search,
  BarChart3,
  Palette,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CenterExpandReveal from "@/components/home/CenterExpandReveal";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    statement: "Websites are not brochures. They are systems.",
    description:
      "We build high-performance websites that load fast, scale effortlessly, and convert without friction. Every line of code exists to reduce latency — technical or psychological.",
    accent: "text-black",
  },
  {
    icon: Smartphone,
    title: "App Development",
    statement: "Good apps feel inevitable.",
    description:
      "We design and develop mobile applications that feel obvious to use. No tutorials. No confusion. Just clean flows, native performance, and long-term maintainability.",
    accent: "text-neutral-700",
  },
  {
    icon: Server,
    title: "SaaS Engineering",
    statement: "Stability is a growth feature.",
    description:
      "From monitoring to scaling, we treat maintenance as a product advantage. Quiet reliability compounds faster than flashy launches.",
    accent: "text-black",
  },
  {
    icon: Search,
    title: "SEO & Discovery",
    statement: "Traffic is earned, not hacked.",
    description:
      "Our SEO work focuses on durable visibility — technical foundations, content architecture, and intent-driven growth that survives algorithm changes.",
    accent: "text-neutral-700",
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    statement: "Every click must justify itself.",
    description:
      "We run paid campaigns with one rule: measurable leverage. If a rupee goes in, it must come back smarter.",
    accent: "text-black",
  },
  {
    icon: Palette,
    title: "Brand & Experience",
    statement: "Design is silent persuasion.",
    description:
      "We build visual systems that reduce doubt before a word is read. Consistency, restraint, and clarity over decoration.",
    accent: "text-neutral-700",
  },
];

export default function Services() {
  return (
    <div className="bg-white text-black">
      <Navbar />
      <CenterExpandReveal />

      {/* HERO */}
      <section className="pt-40 pb-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-extrabold leading-tight"
          >
            What We Do
            <br />
            <span className="text-neutral-400">
              — and why it works.
            </span>
          </motion.h1>

          <p className="mt-10 text-xl text-neutral-600 max-w-2xl">
            We don’t offer disconnected services.  
            We design systems where engineering, growth, and design reinforce each other.
          </p>
        </div>
      </section>

      {/* SERVICES — EDITORIAL FLOW */}
      <section className="pb-40">
        <div className="container mx-auto px-6 max-w-6xl space-y-40">
          {services.map((service, index) => {
            const Icon = service.icon;
            const reverse = index % 2 !== 0;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid md:grid-cols-2 gap-20 items-start ${
                  reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* LEFT */}
                <div className={`${reverse ? "md:order-2" : ""}`}>
                  <div className="flex items-center gap-4 mb-6">
                    <Icon className="w-7 h-7" />
                    <span className="uppercase tracking-widest text-sm font-semibold text-neutral-500">
                      {service.title}
                    </span>
                  </div>

                  <h2 className={`text-4xl md:text-5xl font-extrabold leading-tight ${service.accent}`}>
                    {service.statement}
                  </h2>
                </div>

                {/* RIGHT */}
                <div className={`${reverse ? "md:order-1" : ""}`}>
                  <p className="text-lg text-neutral-600 leading-relaxed max-w-xl">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CLOSING STATEMENT */}
      <section className="py-40 bg-neutral-100">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            We build things that age well.
          </h2>
          <p className="mt-6 text-lg text-neutral-600">
            No gimmicks. No noise. Just systems designed to last.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
