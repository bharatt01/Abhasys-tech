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
    title: "Customer Delight",
    category: "SaaS • Product Engineering",
    description:
      "A comprehensive platform enhancing customer engagement and retention through personalized experiences and data-driven insights.",
    image:
      "/images/customerdelight.png",
  },
   {
    id: "02",
    title: "JobsInDelhiNCR",
    category: "Job Portal • Lead Generation",
    description:
      "A user-friendly job portal designed to connect job seekers with employers in the Delhi NCR region, featuring advanced search and application tracking.",
    image:
      "/images/jobsindelhincr.png",
  },
  {
    id: "03",
    title: "VMIDAS E-commerce",
    category: "E-commerce •",
    description:
      "Conversion-optimized storefront paired with performance marketing systems that increased revenue and repeat purchases.",
    image:
      "/images/vmidas.png",
  },
  {
    id: "04",
    title: "Tathastu Learning Platform",
    category: "EdTech",
    description:
      "A modern learning experience designed to improve student engagement, retention, and measurable outcomes.",
    image:
      "/images/tathastu.png",
  },
  {
    id: "05",
    title: "Medical Mission",
    category: "Healthcare",
    description:
      "A secure, compliant patient management system designed for operational efficiency and data privacy.",
    image:
      "/images/medicalmission.png",
  },
  {
    id: "06",
    title: "SuperShape Branding & Website",
    category: "Branding • Web Design",
    description:
      "End-to-end brand identity and website design for an early-stage startup entering a competitive market.",
    image:
      "/images/supershape.png",
  },
  {
    id: "07",
    title: "SpiceVista",
    category: "Food & Beverage • Lead Systems",
    description:
      "High-conversion landing pages and lead funnels built to generate qualified inquiries at scale.",
    image:
      "/images/spicevista.png",
  },
   {
    id: "08",
    title: "CollabKaroo",
    category: "Collaboration Software • SaaS",
    description:
      "A robust collaboration platform designed to enhance team productivity and streamline project management.",
    image:
      "/images/collabkaroo.png",
  },
   {
    id: "09",
    title: "CollegeFindkaroo",
    category: "Education • Lead Systems",
    description:
      "High-conversion landing pages and lead funnels built to generate qualified inquiries at scale.",
    image:
      "/images/college.png",
    
  },
   {
    id: "10",
    title: "Star Foundation",
    category: "Non-Profit • Growth Systems",
    description:
      "High-conversion landing pages and lead funnels built to generate qualified inquiries at scale.",
    image:
      "/images/starfoundation.png",
  },
   {
    id: "11",
    title: "TaxReps",
    category: "Financial Services • Lead Systems",
    description:
      "High-conversion landing pages and lead funnels built to generate qualified inquiries at scale.",
    image:
      "/images/taxreps.png",
  },
   {
    id: "12",
    title: "BankeBihari",
    category: "Spiritual Tourism • Lead Systems",
    description:
      "High-conversion landing pages and lead funnels built to generate qualified inquiries at scale.",
    image:
      "/images/bankebihari.png",
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

const Work = () => {
  return (
    <>
      <Navbar />

      {/* HERO */}
      {/* HERO */}
<section className="pt-36 pb-20 text-center relative overflow-hidden">
  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="/images/our-work.jpg" // 👈 change image path
      alt="Work Background"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Overlay Gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent" />

  <div className="relative container mx-auto px-6">
    <motion.div
      variants={staggerText}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto text-center"
    >
      <motion.h1
        variants={fadeUp}
        className="text-6xl md:text-7xl font-extrabold leading-tight text-white"
      >
        Projects That Turn <br />
        <span className="text-neutral-300">Vision Into Results</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-8 text-2xl text-neutral-200 max-w-2xl mx-auto"
      >
        A selection of work where strategy, design, and technology come
        together to create measurable business impact.
      </motion.p>
    </motion.div>
  </div>
</section>


    <section className="bg-white py-36">
        <div className="container mx-auto px-6">
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
    className="relative w-full h-auto"
  >
    {/* Decorative Border */}
    <div className="absolute -top-8 -left-8 w-full h-full border border-neutral-900/20" />

    {/* Image */}
    <img
      src={project.image}
      alt={project.title}
      className="relative z-10 w-full max-w-[100vw] h-auto object-cover rounded-xl"
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
      {/* MORE PROJECTS BLOCK */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: "easeOut" }}
  className="relative border border-neutral-900/20 rounded-2xl 
             py-24 px-10 text-center max-w-4xl mx-auto"
>
  {/* Decorative corner */}
  <div className="absolute -top-6 -left-6 w-full h-full border border-neutral-900/10" />

  <span className="block text-sm uppercase tracking-widest text-neutral-500 font-semibold">
    And Many More
  </span>

  <h3 className="mt-6 text-3xl md:text-4xl font-extrabold text-neutral-900">
    More Projects Across Industries
  </h3>

  <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
    Over the years, we’ve delivered numerous projects across SaaS, eCommerce,
    healthcare, education, fintech, and service businesses. Some work remains
    confidential, while other projects are currently under active development.
  </p>

  <Link
    to="/contact"
    className="mt-10 inline-flex items-center gap-2 font-semibold 
               text-neutral-900 group"
  >
    Discuss Your Project
    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition" />
  </Link>
</motion.div>


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

export default Work;
