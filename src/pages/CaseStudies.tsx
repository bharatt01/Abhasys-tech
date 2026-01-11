import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "Fintech SaaS Platform",
    desc: "Scalable dashboard with real-time analytics & secure architecture.",
    image: "/images/project1.jpg",
    tag: "SaaS • UI/UX",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    title: "D2C E-commerce Growth",
    desc: "Conversion-focused store with performance marketing funnels.",
    image: "/images/project2.jpg",
    tag: "E-commerce • Marketing",
    gradient: "from-orange-500 via-amber-400 to-yellow-400",
  },
  {
    title: "EdTech Learning Platform",
    desc: "Modern learning experience with high retention UX.",
    image: "/images/project3.jpg",
    tag: "EdTech • Web App",
    gradient: "from-indigo-500 via-violet-500 to-purple-500",
  },
  {
    title: "Healthcare Portal",
    desc: "Secure, compliant patient management system.",
    image: "/images/project4.jpg",
    tag: "Healthcare • Software",
    gradient: "from-emerald-500 via-teal-500 to-green-500",
  },
  {
    title: "Startup Brand Identity",
    desc: "Complete branding + website for early-stage startup.",
    image: "/images/project5.jpg",
    tag: "Branding • Design",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    title: "Real Estate Platform",
    desc: "High-conversion landing pages & lead funnels.",
    image: "/images/project6.jpg",
    tag: "Real Estate • Growth",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
  },
  {
    title: "Corporate Website Revamp",
    desc: "Modern UI overhaul with performance optimization.",
    image: "/images/project7.jpg",
    tag: "Corporate • Web",
    gradient: "from-slate-700 via-slate-800 to-slate-900",
  },
  {
    title: "Marketing Automation System",
    desc: "AI-driven automation for lead nurturing & CRM.",
    image: "/images/project8.jpg",
    tag: "Automation • AI",
    gradient: "from-lime-500 via-emerald-500 to-green-600",
  },
];

const OurWork = () => {
  return (
 <>
 <Navbar />
 <section className="bg-white overflow-hidden">
      {/* HERO */}
      <div className="relative py-36">
        {/* Indigo Blobs */}
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-400/20 blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-[600px] h-[600px] bg-purple-400/20 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <span className="uppercase tracking-widest text-indigo-600 font-semibold">
            Our Work
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
            Crafting Digital Experiences <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
              That Drive Real Growth
            </span>
          </h1>

          <p className="mt-8 text-xl text-slate-600 max-w-3xl mx-auto">
            From startups to enterprises, we design, build, and scale digital
            products that convert users into customers and ideas into impact.
          </p>
        </motion.div>
      </div>

      {/* PROJECT GRID */}
      <div className="container mx-auto px-6 pb-40">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative"
            >
              {/* Glow */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient}
                opacity-0 group-hover:opacity-100 blur-2xl transition duration-500`}
              />

              {/* Card */}
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl group-hover:-translate-y-4 transition-all duration-500">
                <div className="h-72 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                <div className="p-8">
                  <span className="text-sm font-semibold text-indigo-600">
                    {project.tag}
                  </span>

                  <h3 className="text-2xl font-bold mt-2 text-slate-900">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                    {project.desc}
                  </p>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 mt-6 text-base font-semibold text-slate-700 group-hover:text-indigo-600 transition"
                  >
                    View Case Study
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-950 py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Want Your Project Featured Here?
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Let’s build something impactful together — strategy, design,
            technology, and growth under one roof.
          </p>

          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full
            bg-gradient-to-r from-indigo-500 to-pink-500
            text-white font-semibold text-lg shadow-xl hover:scale-105 transition"
          >
            Start Your Project
            <ArrowUpRight className="w-6 h-6" />
          </Link>
        </motion.div>
      </div>
    </section>
    <Footer />
    </>
  );
};

export default OurWork;
