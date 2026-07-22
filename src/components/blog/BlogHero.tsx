import { motion } from "framer-motion";

export default function BlogHero() {
  return (
    <section className="bg-black text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-bold tracking-widest uppercase text-gray-400">
            Insights & Updates
          </span>
          <h1 className="text-5xl md:text-7xl font-black mt-4 leading-tight">
            Tech Trends &<br />
            <span className="text-gray-500">Industry Insights</span>
          </h1>
          <p className="mt-6 text-gray-400 text-lg max-w-xl">
            Stay ahead with expert analysis on AI, cloud, cybersecurity, and emerging technologies.
          </p>
        </motion.div>
      </div>
    </section>
  );
}