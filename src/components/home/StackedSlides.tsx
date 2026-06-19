import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, memo } from "react";

const NAVBAR_HEIGHT = 56;

/* ===========================
   Static Slide Layout (Memoized)
=========================== */
const SlideLayout = memo(({
  title,
  subtitle,
  content,
  image,
  button,
}: {
  title: string;
  subtitle: string;
  content: string;
  image: string;
  button: string;
}) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
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
    <div className="relative w-full h-[200px] sm:h-[280px] lg:h-[420px] rounded-2xl overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  </div>
));
SlideLayout.displayName = "SlideLayout";

/* ===========================
   Individual Slide (Memoized)
=========================== */
const Slide = memo(({
  zIndex,
  bgClass,
  slideData,
  y,
}: {
  zIndex: number;
  bgClass: string;
  slideData: {
    subtitle: string;
    title: string;
    content: string;
    image: string;
    button: string;
  };
  y?: any;
}) => {
  const Component = y ? motion.div : "div";
  const props = y ? { style: { y } } : {};

  return (
    <Component
      {...props}
      className={`absolute inset-0 ${bgClass} p-6 sm:p-10 lg:p-14 flex items-center`}
      style={{ zIndex, ...props.style }}
    >
      <SlideLayout {...slideData} />
    </Component>
  );
});
Slide.displayName = "Slide";

const ScrollOverlapSlides = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.35) setActiveSlide(0);
    else if (latest < 0.65) setActiveSlide(1);
    else if (latest < 0.85) setActiveSlide(2);
    else setActiveSlide(3);
  });

  const slide2Y = useTransform(scrollYProgress, [0.1, 0.35], ["100%", "0%"]);
  const slide3Y = useTransform(scrollYProgress, [0.45, 0.65], ["100%", "0%"]);
  const slide4Y = useTransform(scrollYProgress, [0.65, 0.85], ["100%", "0%"]);

  const slides = [
    {
      zIndex: 10,
      bgClass: "bg-gradient-to-br from-[#a84b54] to-[#7a353c]",
      data: {
        subtitle: "The Challenge",
        title: "Most Websites Look Good — But Don't Perform",
        content: "Many businesses invest in websites that look visually appealing but fail to attract traffic, retain users, or generate leads. Slow load times, poor structure, and unclear messaging often limit real growth, even when the product or service is strong.",
        image: "/images/slide.png",
        button: "Why Performance Matters",
      },
      y: undefined,
    },
    {
      zIndex: 20,
      bgClass: "bg-gradient-to-br from-[#f3eb83] to-[#c4bd5a]",
      data: {
        subtitle: "Our Philosophy",
        title: "Design and Development Must Work Together",
        content: "We believe successful digital products are built at the intersection of strategy, user experience, and technology. Every layout, interaction, and content block is planned to guide users clearly while supporting long-term scalability and search visibility.",
        image: "/images/slide2.jpg",
        button: "How We Approach Projects",
      },
      y: slide2Y,
    },
    {
      zIndex: 30,
      bgClass: "bg-gradient-to-br from-[#54aed3] to-[#3a7a99]",
      data: {
        subtitle: "Technology",
        title: "Modern, Performance-First Web Development",
        content: "Our builds focus on clean architecture, fast performance, and maintainable code. Using modern frameworks and motion-driven interfaces, we create websites that feel smooth to use while remaining lightweight, accessible, and optimized for search engines.",
        image: "/images/slide3.jpg",
        button: "Our Technical Stack",
      },
      y: slide3Y,
    },
    {
      zIndex: 40,
      bgClass: "bg-gradient-to-br from-[#172b4c] to-[#0d1a2e]",
      data: {
        subtitle: "The Result",
        title: "Digital Platforms That Grow With Your Business",
        content: "The result is a website or application that loads fast, ranks better, adapts easily, and supports real business goals. Whether it's lead generation, brand positioning, or product expansion, the foundation is built to scale as your business evolves.",
        image: "/images/slide4.jpg",
        button: "Start a Project",
      },
      y: slide4Y,
    },
  ];

  return (
    <div ref={ref} className="bg-white">
      <div style={{ height: 2 }} />

      <div className="h-[320vh] sm:h-[350vh] lg:h-[400vh]">
        <div
          className="sticky flex items-center justify-center"
          style={{
            top: NAVBAR_HEIGHT,
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        >
          <div
            className="relative w-[96vw] lg:w-[92vw] max-w-7xl
                       h-[82vh] sm:h-[78vh] lg:h-[75vh]
                       rounded-3xl overflow-hidden
                       shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
          >
            {slides.map((slide) => (
              <Slide
                key={slide.data.title}
                zIndex={slide.zIndex}
                bgClass={slide.bgClass}
                slideData={slide.data}
                y={slide.y}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollOverlapSlides;