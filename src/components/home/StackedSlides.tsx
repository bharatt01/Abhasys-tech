import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const NAVBAR_HEIGHT = 56;

const ScrollOverlapSlides = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const slide2Y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0.1, 0.35],
    ["100%", "0%"]
  );

  const slide3Y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0.45, 0.65],
    ["100%", "0%"]
  );

  const slide4Y: MotionValue<string> = useTransform(
    scrollYProgress,
    [0.65, 0.85],
    ["100%", "0%"]
  );

  const SlideLayout = ({
    title,
    subtitle,
    content,
    image,
    button,
  }: any) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
      {/* TEXT */}
      <div className="max-w-xl text-white">
        <span className="uppercase tracking-widest text-xs lg:text-sm opacity-80">
          {subtitle}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 lg:mt-5 leading-tight">
          {title}
        </h2>

        <div className="mt-4 lg:mt-6 text-base lg:text-lg opacity-90 leading-relaxed">
          {content}
        </div>

        <button className="mt-6 lg:mt-8 px-6 lg:px-7 py-3 rounded-full bg-white text-black font-semibold text-sm lg:text-base">
          {button}
        </button>
      </div>

      {/* IMAGE */}
      <div className="relative w-full h-[200px] sm:h-[280px] lg:h-[420px] rounded-2xl overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );

  return (
    <div ref={ref} className="bg-white">
      {/* NAVBAR BUFFER */}
      <div style={{ height: NAVBAR_HEIGHT }} />

      {/* SCROLL AREA */}
      <div className="h-[320vh] sm:h-[350vh] lg:h-[400vh]">
        <div
          className="sticky flex items-center justify-center"
          style={{
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          {/* MAIN CARD */}
          <div className="relative w-[94vw] lg:w-[90vw] max-w-6xl 
                          h-[82vh] sm:h-[78vh] lg:h-[75vh]
                          rounded-3xl overflow-hidden
                          shadow-[0_30px_90px_rgba(0,0,0,0.45)]">

            {/* SLIDE 1 */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-rose-600 to-red-700 
                            p-6 sm:p-10 lg:p-14 flex items-center">
              <SlideLayout
                subtitle="Introduction"
                title="Build Powerful User Interfaces"
                content="Create visually striking, high-performance interfaces using React, Tailwind CSS, and motion-driven design systems."
                image="/images/uiux.jpg"
                button="Learn More"
              />
            </div>

            {/* SLIDE 2 */}
            <motion.div
              style={{ y: slide2Y }}
              className="absolute inset-0 z-20 bg-gradient-to-br from-emerald-600 to-emerald-800 
                         p-6 sm:p-10 lg:p-14 flex items-center"
            >
              <SlideLayout
                subtitle="Strategy"
                title="Design With Purpose"
                content={
                  <ul className="space-y-2">
                    <li>• UX-first layouts</li>
                    <li>• Clear visual hierarchy</li>
                    <li>• Conversion-focused structure</li>
                  </ul>
                }
                image="/slides/slide2.png"
                button="View Strategy"
              />
            </motion.div>

            {/* SLIDE 3 */}
            <motion.div
              style={{ y: slide3Y }}
              className="absolute inset-0 z-30 bg-gradient-to-br from-indigo-600 to-blue-700 
                         p-6 sm:p-10 lg:p-14 flex items-center"
            >
              <SlideLayout
                subtitle="Technology"
                title="Motion-First Experiences"
                content={
                  <ul className="space-y-2">
                    <li>• Framer Motion powered</li>
                    <li>• Scroll-based animations</li>
                    <li>• Zero jank performance</li>
                  </ul>
                }
                image="/slides/slide3.png"
                button="Explore Tech"
              />
            </motion.div>

            {/* SLIDE 4 */}
            <motion.div
              style={{ y: slide4Y }}
              className="absolute inset-0 z-40 bg-gradient-to-br from-slate-800 to-slate-900 
                         p-6 sm:p-10 lg:p-14 flex items-center"
            >
              <SlideLayout
                subtitle="Growth"
                title="Built to Scale"
                content={
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <span>• Modular components</span>
                    <span>• Enterprise ready</span>
                    <span>• SEO optimized</span>
                    <span>• Lightning fast</span>
                  </div>
                }
                image="/slides/slide4.png"
                button="Start Building"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollOverlapSlides;
