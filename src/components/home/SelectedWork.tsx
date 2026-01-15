import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Customer Benefits Platform",
    category: "Product Website + Dashboard",
    image: "/images/customerdelight.png",
    link: "/our-work",
  },
  {
    title: "Global Export Brand",
    category: "B2B Website + Lead System",
    image: "/images/vmidas.png",
    link: "/work/project-2",
  },
  {
    title: "Education Technology Suite",
    category: "EdTech Platform",
    image: "/images/medicalmission.png",
    link: "/work/project-3",
  },
];

const SelectedWork = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="pb-16 bg-white">
      <div ref={ref} className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight text-black">
            Projects That
            <br />
            Drove Real Growth
          </h2>

          <p className="mt-5 text-lg text-neutral-600 max-w-xl">
            A curated selection of projects showcasing how we design, build,
            and scale digital products.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group"
            >
              <Link to={project.link} className="block h-full">
                <div className="relative h-full border-2 border-black overflow-hidden transition-transform duration-300 group-hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative w-full bg-neutral-50">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-auto max-h-[440px] mx-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
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
        <div className="mt-12">
          <Button
            asChild
            size="lg"
            className="bg-black text-white px-12 py-6 text-lg hover:bg-neutral-900"
          >
            <Link to="/our-work" className="flex items-center gap-2">
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
