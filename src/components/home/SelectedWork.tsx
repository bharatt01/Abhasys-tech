import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Enterprise SaaS Platform",
    category: "Product Website + Dashboard",
    image: "https://picsum.photos/seed/project1/800/600",
    link: "/work/project-1",
  },
  {
    title: "Global Export Brand",
    category: "B2B Website + Lead System",
    image: "https://picsum.photos/seed/project2/800/600",
    link: "/work/project-2",
  },
  {
    title: "Education Technology Suite",
    category: "EdTech Platform",
    image: "https://picsum.photos/seed/project3/800/600",
    link: "/work/project-3",
  },
];

const SelectedWork = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  return (
<section className="pt-8 pb-28 bg-white -mt-12">

<div ref={ref} className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-20"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-neutral-500">
            Selected Work
          </span>

          <h2 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight text-black">
            Projects That
            <br />
            Drove Real Growth
          </h2>

          <p className="mt-6 text-lg text-neutral-600 max-w-xl">
            A curated selection of projects showcasing how we design, build,
            and scale digital products.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group"
            >
              <Link to={project.link} className="block h-full">
                <div className="relative h-full border-2 border-black overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-8 bg-white">
                    <span className="text-sm font-semibold text-neutral-500">
                      {project.category}
                    </span>

                    <h3 className="mt-2 text-2xl font-bold text-black">
                      {project.title}
                    </h3>

                    <div className="mt-6 inline-flex items-center gap-2 font-bold text-black">
                      View Case Study
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24">
          <Button
            asChild
            size="lg"
            className="bg-black text-white px-12 py-6 text-lg hover:bg-neutral-900"
          >
            <Link to="/work" className="gap-2">
              View All Projects
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
