"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------ DATA ------------------ */

const projects = [
  {
    id: "01",
    title: "Fintech SaaS Platform",
    category: "SaaS • Product Engineering",
    description:
      "A scalable fintech platform built with performance-first architecture, real-time analytics, and enterprise-grade security.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
  },
  {
    id: "02",
    title: "D2C E-commerce Growth Engine",
    category: "E-commerce • Growth",
    description:
      "Conversion-optimized storefront paired with performance marketing systems that increased revenue and repeat purchases.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "03",
    title: "EdTech Learning Platform",
    category: "EdTech • Web Application",
    description:
      "A modern learning experience designed to improve student engagement, retention, and measurable outcomes.",
    image:
      "https://images.unsplash.com/photo-1584697964154-1c3cdd97d4a0",
  },
  {
    id: "04",
    title: "Healthcare Management System",
    category: "Healthcare • Software",
    description:
      "A secure, compliant patient management system designed for operational efficiency and data privacy.",
    image:
      "https://images.unsplash.com/photo-1580281658629-88c3d5c3b5a1",
  },
  {
    id: "05",
    title: "Startup Brand & Website",
    category: "Branding • Web Design",
    description:
      "End-to-end brand identity and website design for an early-stage startup entering a competitive market.",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d",
  },
  {
    id: "06",
    title: "Real Estate Lead Platform",
    category: "Real Estate • Growth Systems",
    description:
      "High-conversion landing pages and lead funnels built to generate qualified inquiries at scale.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
];

/* ------------------ ANIMATION VARIANTS ------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const staggerText = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* ------------------ COMPONENT ------------------ */

const OurWork = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="bg-white py-36">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerText}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center mb-40"
          >
            <motion.span
              variants={fadeUp}
              className="uppercase tracking-widest text-neutral-500 font-semibold"
            >
              Our Work
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-neutral-900"
            >
              Projects That Turn <br /> Vision Into Results
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-8 text-xl text-neutral-600 max-w-2xl mx-auto"
            >
              A selection of work where strategy, design, and technology come
              together to create measurable business impact.
            </motion.p>
          </motion.div>

          {/* PROJECTS */}
          <div className="space-y-44">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="grid lg:grid-cols-2 gap-24 items-center"
              >
                {/* IMAGE */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={index % 2 !== 0 ? "lg:order-2" : ""}
                >
                  <motion.div
                    initial={{ scale: 1.08, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                  >
                    <div className="absolute -top-8 -left-8 w-full h-full border border-neutral-900/20" />
                    <img
                      src={project.image}
                      alt={project.title}
                      className="relative z-10 w-full h-[480px] object-cover"
                    />
                  </motion.div>
                </motion.div>

                {/* CONTENT */}
                <motion.div
                  variants={staggerText}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className={index % 2 !== 0 ? "lg:order-1" : ""}
                >
                  <motion.span
                    variants={fadeUp}
                    className="text-7xl font-extrabold text-neutral-200"
                  >
                    {project.id}
                  </motion.span>

                  <motion.span
                    variants={fadeUp}
                    className="block mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500"
                  >
                    {project.category}
                  </motion.span>

                  <motion.h3
                    variants={fadeUp}
                    className="mt-4 text-3xl md:text-4xl font-bold text-neutral-900"
                  >
                    {project.title}
                  </motion.h3>

                  <motion.p
                    variants={fadeUp}
                    className="mt-6 text-lg text-neutral-600 max-w-md leading-relaxed"
                  >
                    {project.description}
                  </motion.p>

                  <motion.div variants={fadeUp}>
                    <Link
                      to="/contact"
                      className="mt-10 inline-flex items-center gap-2 font-semibold text-neutral-900 group"
                    >
                      View Case Study
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-neutral-950 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Have a Project in Mind?
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Let’s build something meaningful — strategy, design, technology, and
            growth aligned from day one.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full
            bg-white text-neutral-900 font-semibold text-lg
            hover:scale-105 transition"
          >
            Start a Conversation
            <ArrowUpRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default OurWork;
