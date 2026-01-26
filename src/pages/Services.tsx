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
import CenterExpandReveal from "@/components/home/CenterExpandReveal";

const sections = [
  {
    label: "Technical Services",
    title: "Scalable Technology Solutions for Modern Businesses",
    accent: "bg-black",
    services: [
      {
        icon: Code2,
        title: "Web Development",
        description:
          "Custom website development using modern frameworks to build fast, secure, and scalable websites that improve user experience and conversions.",
        why: "Optimized code and architecture improve speed, SEO, and conversions.",
        tags: [
          "Website Development",
          "React Development",
          "Next.js",
          "Custom Websites",
          "Web Development Company",
        ],
        image: "https://picsum.photos/700/600?random=11",
      },
      {
        icon: Smartphone,
        title: "Mobile App Development",
        description:
          "High-performance Android and iOS app development with seamless UX, robust backend, and scalable architecture for growing businesses.",
        why: "Cross-platform apps reduce cost and accelerate product launch.",
        tags: [
          "App Development",
          "Mobile Apps",
          "React Native",
          "Flutter",
          "iOS & Android",
        ],
        image: "https://picsum.photos/700/600?random=12",
      },
      {
        icon: Server,
        title: "SaaS & System Maintenance",
        description:
          "Ongoing SaaS maintenance, cloud optimization, and system monitoring to ensure security, uptime, and performance at scale.",
        why: "Continuous optimization ensures long-term scalability and reliability.",
        tags: [
          "SaaS Maintenance",
          "Cloud Solutions",
          "System Scaling",
          "Security",
          "DevOps",
        ],
        image: "https://picsum.photos/700/600?random=13",
      },
    ],
  },
  {
    label: "Digital Growth",
    title: "Data-Driven Digital Marketing & SEO Solutions",
    accent: "bg-[#FF2E00]",
    services: [
      {
        icon: Search,
        title: "SEO Services",
        description:
          "Professional SEO services to improve Google rankings, organic traffic, and online visibility using proven on-page and off-page strategies.",
        why: "SEO builds long-term traffic and sustainable brand authority.",
        tags: [
          "SEO Services",
          "Search Engine Optimization",
          "Local SEO",
          "Google Ranking",
          "Organic Traffic",
        ],
        image: "https://picsum.photos/700/600?random=21",
      },
      {
        icon: BarChart3,
        title: "Performance Marketing",
        description:
          "ROI-focused digital advertising campaigns across Google Ads, Meta Ads, and analytics-driven funnels to maximize conversions and revenue.",
        why: "Every campaign is optimized using real-time data and analytics.",
        tags: [
          "Digital Marketing",
          "Google Ads",
          "Meta Ads",
          "Performance Marketing",
          "Lead Generation",
        ],
        image: "https://picsum.photos/700/600?random=22",
      },
      {
        icon: Share2,
        title: "Social Media Marketing",
        description:
          "Strategic social media marketing to build brand awareness, trust, and engagement across Instagram, Facebook, LinkedIn, and more.",
        why: "Consistent storytelling builds long-term brand loyalty.",
        tags: [
          "Social Media Marketing",
          "Brand Building",
          "Instagram Marketing",
          "Content Strategy",
        ],
        image: "https://picsum.photos/700/600?random=23",
      },
    ],
  },
  {
    label: "Brand & Experience",
    title: "Branding & UI/UX That Converts Users into Customers",
    accent: "bg-[#1D4ED8]",
    services: [
      {
        icon: Palette,
        title: "Brand Identity Design",
        description:
          "Strategic brand identity design including logo, typography, and visual systems that create a strong and memorable brand presence.",
        why: "Strong branding increases recognition and customer trust.",
        tags: [
          "Brand Identity",
          "Logo Design",
          "Brand Strategy",
          "Visual Identity",
        ],
        image: "https://picsum.photos/700/600?random=31",
      },
      {
        icon: Layout,
        title: "UI / UX Design",
        description:
          "User-centric UI/UX design focused on usability, accessibility, and conversion optimization for websites and applications.",
        why: "Great UX reduces friction and increases user engagement.",
        tags: [
          "UI UX Design",
          "User Experience",
          "Interface Design",
          "Product Design",
        ],
        image: "https://picsum.photos/700/600?random=32",
      },
      {
        icon: Lightbulb,
        title: "Creative Strategy & Direction",
        description:
          "Unified creative direction for digital products, marketing campaigns, and brand communication to ensure consistency and impact.",
        why: "Consistent messaging strengthens brand authority.",
        tags: [
          "Creative Strategy",
          "Design Systems",
          "Brand Communication",
          "Creative Direction",
        ],
        image: "https://picsum.photos/700/600?random=33",
      },
    ],
  },
];


export default function Services() {
  return (
    <div className="bg-white overflow-hidden">
      <Navbar />
      {/* <CenterExpandReveal /> */}

      {/* HERO */}
<section className="pt-36 pb-20 text-center relative overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/services.jpg" // 👈 change image path
      alt="Services Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-white" />

  {/* Content */}
  <div className="relative container mx-auto px-4">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-6xl md:text-7xl font-extrabold text-white"
    >
      Our Services That
      <br />
      <span className="text-neutral-300">Create Impact At Scale</span>
    </motion.h1>

    <p className="mt-8 text-lg text-neutral-200 max-w-2xl mx-auto">
      We don’t just design, we execute systems that compound growth.
    </p>
  </div>
</section>


      {/* SECTIONS */}
      {sections.map((section) => (
        <section key={section.label} className="py-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <div className="max-w-3xl mb-6 relative">
              <div className={`absolute left-0 top-0 h-full w-1 ${section.accent}`} />
              <div className="pl-6">
                <span
                  className={`inline-block px-4 py-2 text-sm font-bold text-white ${section.accent}`}
                >
                  {section.label}
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold">
                  {section.title}
                </h2>
              </div>
            </div>

            {/* HORIZONTAL SERVICES */}
            <div className="overflow-x-auto pb-6">
              <div className="flex gap-10 min-w-max">
                {section.services.map((service, index) => {
                  const Icon = service.icon;

                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -12 }}
                      className="relative w-[380px] h-[480px]
                      rounded-2xl overflow-hidden border border-black/15
                      bg-white group"
                    >
                      {/* Glow */}
                      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full
                      bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition" />

                      {/* Image */}
                      <img
                        src={service.image}
                        className="absolute inset-0 w-full h-full object-cover
                        opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100
                        transition-all duration-700"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition" />

                      {/* Content */}
                      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                        <div>
                          <div className={`w-12 h-12 ${section.accent} flex items-center justify-center rounded-md`}>
                            <Icon className="text-white w-5 h-5" />
                          </div>

                          <h3 className="mt-6 text-2xl font-bold group-hover:text-white">
                            {service.title}
                          </h3>

                          <p className="mt-4 text-neutral-600 group-hover:text-neutral-200">
                            {service.description}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-semibold group-hover:text-white">
                            {service.why}
                          </p>

                          <div className="mt-4 flex gap-2 flex-wrap">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1 text-xs font-bold bg-black text-white
                                group-hover:bg-white group-hover:text-black transition"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* PHILOSOPHY BREAK */}
      <section className="py-40 bg-black text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-cyan-500/10" />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative text-5xl md:text-6xl font-extrabold max-w-4xl mx-auto"
        >
          We don’t sell services.
          <br />
          <span className="text-white/60">
            We build unfair digital advantages.
          </span>
        </motion.h2>

        <p className="relative mt-10 text-lg text-white/70 max-w-xl mx-auto">
          Strategy, execution, and compounding systems — engineered together.
        </p>
      </section>

      <Footer />
    </div>
  );
}
