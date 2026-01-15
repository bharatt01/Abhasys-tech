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
    {/* REDUCED TOP WHITE GAP */}
    <div style={{ height:  2}} />


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
        <div className="relative w-[96vw] lg:w-[92vw] max-w-7xl
                        h-[82vh] sm:h-[78vh] lg:h-[75vh]
                        rounded-3xl overflow-hidden
                        shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
          {/* slides stay SAME */}

            {/* SLIDE 1 */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-rose-600 to-red-700 
                            p-6 sm:p-10 lg:p-14 flex items-center">
              <SlideLayout
                subtitle="The Challenge"
                title="Most Websites Look Good — But Don’t Perform"
                content="Many businesses invest in websites that look visually appealing but fail to attract traffic, retain users, or generate leads. Slow load times, poor structure, and unclear messaging often limit real growth, even when the product or service is strong."
                image="/images/slide1.jpg"
                button="Why Performance Matters
"
              />
            </div>

            {/* SLIDE 2 */}
            <motion.div
              style={{ y: slide2Y }}
              className="absolute inset-0 z-20 bg-gradient-to-br from-emerald-600 to-emerald-800 
                         p-6 sm:p-10 lg:p-14 flex items-center"
            >
              <SlideLayout
                subtitle="Our Philosophy"
                title="Design and Development Must Work Together"
                content="We believe successful digital products are built at the intersection of strategy, user experience, and technology. Every layout, interaction, and content block is planned to guide users clearly while supporting long-term scalability and search visibility."
                image="/images/slide2.jpg"
                button="How We Approach Projects"
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
                title="Modern, Performance-First Web Development"
                content="Our builds focus on clean architecture, fast performance, and maintainable code. Using modern frameworks and motion-driven interfaces, we create websites that feel smooth to use while remaining lightweight, accessible, and optimized for search engines."
                image="/images/slide3.jpg"
                button="Our Technical Stack"
              />
            </motion.div>

            {/* SLIDE 4 */}
            <motion.div
              style={{ y: slide4Y }}
              className="absolute inset-0 z-40 bg-gradient-to-br from-slate-800 to-slate-900 
                         p-6 sm:p-10 lg:p-14 flex items-center"
            >
              <SlideLayout
                subtitle="The Result"
                title="Digital Platforms That Grow With Your Business"
                content="The result is a website or application that loads fast, ranks better, adapts easily, and supports real business goals. Whether it’s lead generation, brand positioning, or product expansion, the foundation is built to scale as your business evolves."
                image="/images/slide4.jpg"
                button="Start a Project"
              />
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollOverlapSlides;
