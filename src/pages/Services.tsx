"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Server,
  Search,
  BarChart3,
  Share2,
  Palette,
  Layout,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sections = [
  /* ---------------- TECHNICAL ---------------- */
  {
    label: "Technical Services",
    title: "Built for Speed. Built to Scale.",
    accent: "bg-black",
    services: [
      {
        icon: Code2,
        title: "Web Development",
        description:
          "High-performance websites engineered for clarity, speed, and scalability.",
        why: "Clean architecture = faster load times & better conversions.",
        tags: ["React", "Next.js", "APIs"],
        image: "https://picsum.photos/600/500?random=11",
      },
      {
        icon: Smartphone,
        title: "App Development",
        description:
          "Cross-platform mobile apps with native performance and UX.",
        why: "One codebase. Faster releases. Lower maintenance.",
        tags: ["React Native", "Flutter", "iOS"],
        image: "https://picsum.photos/600/500?random=12",
      },
      {
        icon: Server,
        title: "SaaS Maintenance",
        description:
          "We keep your product stable, secure, and continuously improving.",
        why: "Small optimizations compound into long-term growth.",
        tags: ["Monitoring", "Scaling", "Security"],
        image: "https://picsum.photos/600/500?random=13",
      },
    ],
  },

  /* ---------------- DIGITAL ---------------- */
  {
    label: "Digital Growth",
    title: "Growth Backed by Data, Not Guesswork.",
    accent: "bg-[#FF2E00]",
    services: [
      {
        icon: Search,
        title: "SEO Optimization",
        description:
          "Search strategies focused on sustainable organic growth.",
        why: "Traffic that compounds month after month.",
        tags: ["SEO", "Content", "Local"],
        image: "https://picsum.photos/600/500?random=21",
      },
      {
        icon: BarChart3,
        title: "Performance Marketing",
        description:
          "High-ROI campaigns across Google, Meta, and LinkedIn.",
        why: "Every rupee tracked, optimized, and justified.",
        tags: ["Google Ads", "Meta", "Analytics"],
        image: "https://picsum.photos/600/500?random=22",
      },
      {
        icon: Share2,
        title: "Social Media",
        description:
          "Brand presence built through consistency and storytelling.",
        why: "Trust is built before the first click.",
        tags: ["Content", "Community", "Branding"],
        image: "https://picsum.photos/600/500?random=23",
      },
    ],
  },

  /* ---------------- NEW SECTION ---------------- */
  {
    label: "Brand & Experience",
    title: "Design That Builds Trust Instantly.",
    accent: "bg-[#1D4ED8]",
    services: [
      {
        icon: Palette,
        title: "Brand Identity",
        description:
          "Visual systems that make brands instantly recognizable.",
        why: "Strong brands reduce friction and increase recall.",
        tags: ["Branding", "Identity", "Guidelines"],
        image: "https://picsum.photos/600/500?random=31",
      },
      {
        icon: Layout,
        title: "UI / UX Design",
        description:
          "Interfaces designed for clarity, usability, and conversion.",
        why: "Good UX removes hesitation and builds confidence.",
        tags: ["UX", "UI", "Wireframes"],
        image: "https://picsum.photos/600/500?random=32",
      },
      {
        icon: Lightbulb,
        title: "Creative Direction",
        description:
          "Consistent creative vision across all digital touchpoints.",
        why: "Consistency builds credibility over time.",
        tags: ["Design Systems", "Creatives", "Direction"],
        image: "https://picsum.photos/600/500?random=33",
      },
    ],
  },
];

const Services = () => {
  return (
    <div className="bg-white">
      <Navbar />

      {/* HERO */}
      <section className="pt-32 pb-24 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-black">
          Services Designed
          <br />
          <span className="text-neutral-500">to Drive Impact.</span>
        </h1>

        <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
          We don’t just deliver services — we build systems that grow businesses.
        </p>
      </section>

      {/* SECTIONS */}
      {sections.map((section) => (
        <section key={section.label} className="py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mb-20">
              <span
                className={`inline-block px-4 py-2 text-sm font-bold text-white ${section.accent}`}
              >
                {section.label}
              </span>

              <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-black">
                {section.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="group relative border-2 border-black overflow-hidden"
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover opacity-0 scale-105
                        group-hover:opacity-100 group-hover:scale-100
                        transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 p-8 bg-white group-hover:bg-transparent transition">
                      <div className={`absolute top-0 left-0 w-full h-2 ${section.accent}`} />

                      <div className={`w-14 h-14 ${section.accent} flex items-center justify-center mb-6`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-white">
                        {service.title}
                      </h3>

                      <p className="text-neutral-600 group-hover:text-neutral-200 mb-6">
                        {service.description}
                      </p>

                      <p className="text-sm font-semibold mb-6 text-black group-hover:text-white">
                        Why this works →
                        <span className="block font-normal mt-1 opacity-80">
                          {service.why}
                        </span>
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-sm font-bold bg-black text-white
                            group-hover:bg-white group-hover:text-black transition"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default Services;
