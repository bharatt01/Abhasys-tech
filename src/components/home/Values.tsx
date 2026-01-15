import { motion } from "framer-motion";
import { Target, ShieldCheck, Zap, Rocket } from "lucide-react";

const values = [
  {
    title: "Strategic Thinking",
    desc: "We focus on measurable business outcomes — leads, revenue,engagement, and operational efficiency.",
    icon: Target,
    bg: "from-pink-100 to-rose-100",
    iconBg: "bg-rose-500",
  },
  {
    title: "Execution Excellence",
    desc: "We continuously adopt modern frameworks, AI tools, and automation to keep our clients ahead.",
    icon: Zap,
    bg: "from-sky-100 to-blue-100",
    iconBg: "bg-sky-500",
  },
  {
    title: "Innovation with Purpose",
    desc: "We work as long-term partners, not vendors — aligned with your business goals and growth roadmap.",
    icon: Rocket,
    bg: "from-amber-100 to-orange-100",
    iconBg: "bg-amber-500",
  },
  {
    title: "Trust & Transparency",
    desc: "From design to deployment, we maintain high standardsin quality, performance, and reliability.",
    icon: ShieldCheck,
    bg: "from-emerald-100 to-mint-100",
    iconBg: "bg-emerald-500",
  },
];

const ValuesProfessional = () => {
  return (
    <section className="py-28 bg-white">
      <div className="container mx-auto px-6">
        {/* Center Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-rose-500">
            Our Principles
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            Values that guide how we work
          </h2>

          {/* Candy underline */}
          <div className="mx-auto mt-6 h-1 w-28 rounded-full bg-gradient-to-r from-rose-400 via-sky-400 to-emerald-400" />

          <p className="mt-6 text-lg text-slate-600">
            We believe great results come from clarity, discipline, and strong
            partnerships — not shortcuts.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 gap-10">
          {values.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-2xl border border-slate-200 p-10 bg-gradient-to-br ${item.bg} hover:shadow-xl transition-all duration-300`}
            >
              {/* Glow hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl bg-white/40 transition" />

              <div className="relative flex items-start gap-6">
                {/* Icon */}
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${item.iconBg} text-white shadow-md`}
                >
                  <item.icon className="h-6 w-6" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-slate-700 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesProfessional;
