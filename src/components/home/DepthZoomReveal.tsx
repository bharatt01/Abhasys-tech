import { motion } from "framer-motion";
import { useRef } from "react";

const DepthZoomReveal = (): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="h-screen bg-white flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 90 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-[72vw] h-[62vh] rounded-[28px] overflow-hidden shadow-[0_60px_140px_rgba(0,0,0,0.45)] flex items-center justify-center"
      >
        <img src="/images/expand.jpg" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/55" />
        
        <div className="relative z-10 text-center px-12 text-white">
         
          <h1 className="text-5xl md:text-6xl font-extrabold mt-6 leading-tight">
            Strategy-Led Digital
            <br />
            Growth Solutions
          </h1>
          <p className="mt-6 text-lg text-white/85 max-w-xl mx-auto">
            Every solution we build starts with strategy...
          </p>
        </div>
      </motion.div>
    </div>
  );
};
export default DepthZoomReveal;