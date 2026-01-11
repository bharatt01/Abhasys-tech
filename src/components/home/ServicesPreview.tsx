import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Megaphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Code2,
    title: "Technical Services",
    description:
      "Web & app development, SaaS maintenance, and custom software solutions built with cutting-edge technology.",
    features: ["React/Next.js", "Mobile Apps", "SaaS Platforms"],
    accent: "bg-black",
    iconBg: "bg-black",
    pill: "bg-black text-white",
  },
  {
    icon: Megaphone,
    title: "Digital Growth",
    description:
      "Data-driven SEO, performance marketing, and social media strategies that deliver measurable results.",
    features: ["SEO & SEM", "Performance Ads", "Social Media"],
    accent: "bg-[#FF2E00]",
    iconBg: "bg-[#FF2E00]",
    pill: "bg-[#FF2E00] text-white",
  },
  {
    icon: Users,
    title: "Physical Marketing",
    description:
      "Offline branding, BTL activations, and consultancy services to strengthen your physical presence.",
    features: ["BTL Activations", "Brand Identity", "Consultancy"],
    accent: "bg-[#0047FF]",
    iconBg: "bg-[#0047FF]",
    pill: "bg-[#0047FF] text-white",
  },
];

const ServicesPreview = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-28 bg-white">
      <div ref={ref} className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto mb-20 text-center"
        >
          <span className="text-sm font-bold uppercase tracking-widest text-black">
            What We Do
          </span>

          <h2 className="text-4xl md:text-6xl font-extrabold mt-4 leading-tight tracking-tight text-black">
            Built to Grow.
            <br />
            Designed to Win.
          </h2>

          <p className="mt-6 text-lg text-neutral-600 max-w-2xl mx-auto">
            We create bold, performance-focused solutions that help brands stand
            out and scale faster — online and offline.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="relative h-full border-2 border-black p-8 transition-transform hover:-translate-y-2">
                {/* Accent Bar */}
                <div
                  className={`absolute top-0 left-0 w-full h-2 ${service.accent}`}
                />

                {/* Icon */}
                <div
                  className={`w-14 h-14 ${service.iconBg} flex items-center justify-center mb-6`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-black">
                  {service.title}
                </h3>

                <p className="text-neutral-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className={`px-3 py-1 text-sm font-bold ${service.pill}`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 font-bold text-black"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <Button
            asChild
            size="lg"
            className="bg-black text-white px-12 py-6 text-lg hover:bg-neutral-900"
          >
            <Link to="/services" className="gap-2">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
