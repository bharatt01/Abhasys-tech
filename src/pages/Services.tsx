"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Smartphone,
  Server,
  Search,
  BarChart3,
  Share2,
  Megaphone,
  Users,
  Lightbulb,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* -------------------- DATA -------------------- */

const technicalServices = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Modern, responsive websites built with React, Next.js, and scalable architecture.",
    features: ["React / Next.js", "TypeScript", "Headless CMS", "API Integration"],
  },
  {
    icon: Smartphone,
    title: "App Development",
    description:
      "Native and cross-platform mobile apps with smooth performance and UX.",
    features: ["React Native", "Flutter", "iOS / Android", "Store Launch"],
  },
  {
    icon: Server,
    title: "SaaS Maintenance",
    description:
      "Continuous monitoring, updates, and performance improvements.",
    features: ["24/7 Monitoring", "Bug Fixes", "Feature Updates", "Optimization"],
  },
];

const digitalServices = [
  {
    icon: Search,
    title: "SEO Optimization",
    description:
      "Organic growth strategies that increase visibility and rankings.",
    features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"],
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    description:
      "High-ROI ad campaigns across Google, Meta, and LinkedIn.",
    features: ["Google Ads", "Meta Ads", "LinkedIn Ads", "Tracking"],
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description:
      "Brand storytelling and audience engagement across platforms.",
    features: ["Content Creation", "Community", "Analytics", "Influencers"],
  },
];

const physicalServices = [
  {
    icon: Megaphone,
    title: "Offline Branding",
    description:
      "Visual identity systems for physical brand touchpoints.",
    features: ["Logo Design", "Brand System", "Packaging", "Signage"],
  },
  {
    icon: Users,
    title: "BTL Activations",
    description:
      "Experiential marketing campaigns with real-world impact.",
    features: ["Events", "Promotions", "Experiential", "Sampling"],
  },
  {
    icon: Lightbulb,
    title: "Physical Consultancy",
    description:
      "Strategic consulting for retail, offices, and customer journeys.",
    features: ["Retail Design", "CX Strategy", "Space Planning", "Visual Merch."],
  },
];

/* -------------------- COMPONENTS -------------------- */

const SectionHeader = ({ badge, title, description, color }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center max-w-2xl mx-auto mb-16"
    >
      <span
        className={`inline-block px-5 py-2 rounded-full text-white text-sm font-semibold mb-5`}
        style={{ backgroundColor: color }}
      >
        {badge}
      </span>

      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
        {title}
      </h2>

      <p className="text-slate-600 text-lg">{description}</p>
    </motion.div>
  );
};

const ServiceCard = ({ service, index, bg, iconBg }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className="h-full p-8 rounded-3xl border border-black/5
        hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
        style={{ backgroundColor: bg }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6
          shadow-md group-hover:scale-110 transition"
          style={{ backgroundColor: iconBg }}
        >
          <service.icon className="w-6 h-6 text-white" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3">
          {service.title}
        </h3>

        <p className="text-slate-800 mb-6 leading-relaxed">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {service.features.map((feature: string) => (
            <span
              key={feature}
              className="px-3 py-1.5 rounded-full bg-white text-xs font-medium text-slate-800 border border-black/10"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* -------------------- PAGE -------------------- */

const Services = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* HERO */}
        <section className="container mx-auto px-4 mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900">
              Our <span className="text-pink-500">Services</span>
            </h1>
            <p className="text-xl text-slate-600">
              End-to-end technology, marketing, and branding services that help
              businesses scale.
            </p>
          </motion.div>
        </section>

        {/* TECHNICAL */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Technical Services"
              title="Build with Modern Technology"
              description="Scalable and future-ready digital products."
              color="#38BDF8"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {technicalServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  bg="#E0F2FE"
                  iconBg="#38BDF8"
                />
              ))}
            </div>
          </div>
        </section>

        {/* DIGITAL */}
        <section className="py-20 bg-pink-50">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Digital Growth"
              title="Grow Your Online Presence"
              description="Data-driven marketing that delivers measurable results."
              color="#EC4899"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {digitalServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  bg="#FCE7F3"
                  iconBg="#EC4899"
                />
              ))}
            </div>
          </div>
        </section>

        {/* PHYSICAL */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              badge="Physical Marketing"
              title="Strengthen Your Physical Presence"
              description="Offline branding and real-world engagement strategies."
              color="#F59E0B"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {physicalServices.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  bg="#FEF3C7"
                  iconBg="#F59E0B"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
 