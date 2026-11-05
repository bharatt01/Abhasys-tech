import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, memo } from "react";
import type { CSSProperties } from "react";

const NAVBAR_HEIGHT = 56;

type SlideData = {
  subtitle: string;
  title: string;
  content: string;
  image: string;
  button: string;
};

/* ===========================
   Static Slide Layout (Memoized)

   Responsive strategy:
   - Layout is a flex column below `lg`, a two-column grid from `lg` up, and also
     a two-column grid on short landscape screens (phones turned sideways).
   - Spacing, headline and body sizes use min()/clamp() against viewport height, so they
     match the original sizes on normal screens and only shrink when height runs short.
   - The image takes the leftover height instead of a fixed pixel height.
   - On phones the paragraph is clamped to 4 lines. It stays in the DOM for SEO.
   - On very short screens (landscape phones) the paragraph is hidden to avoid overflow.
=========================== */
const SlideLayout = memo(({ title, subtitle, content, image, button }: SlideData) => (
  <div
    className="flex h-full w-full flex-col justify-center gap-[min(1.5rem,3vh)]
               lg:grid lg:grid-cols-2 lg:items-center lg:gap-12
               [@media(orientation:landscape)_and_(max-height:520px)]:grid
               [@media(orientation:landscape)_and_(max-height:520px)]:grid-cols-2
               [@media(orientation:landscape)_and_(max-height:520px)]:items-center
               [@media(orientation:landscape)_and_(max-height:520px)]:gap-6"
  >
    <div className="max-w-xl shrink-0 text-white">
      <span className="text-xs uppercase tracking-widest opacity-80 lg:text-sm">{subtitle}</span>
      <h2
        className="mt-3 font-extrabold leading-tight lg:mt-5
                   text-[length:clamp(1.375rem,4.6vh,1.875rem)]
                   sm:text-[length:clamp(1.5rem,5vh,2.25rem)]
                   lg:text-[length:clamp(1.75rem,6.4vh,3rem)]"
      >
        {title}
      </h2>
      <div
        className="mt-4 line-clamp-4 leading-relaxed opacity-90 sm:line-clamp-none lg:mt-6
                   text-[length:clamp(0.8125rem,2.4vh,1rem)]
                   lg:text-[length:clamp(0.875rem,2.6vh,1.125rem)]
                   [@media(max-height:520px)]:hidden"
      >
        {content}
      </div>
      <button
        type="button"
        className="mt-6 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-white lg:mt-8 lg:px-7 lg:text-base"
      >
        {button}
      </button>
    </div>

    <div
      className="relative w-full min-h-[6rem] max-h-[200px] flex-1 overflow-hidden rounded-2xl
                 sm:max-h-none sm:flex-none sm:h-[min(280px,40vh)]
                 lg:h-[min(420px,50vh)]
                 [@media(orientation:landscape)_and_(max-height:520px)]:max-h-none
                 [@media(orientation:landscape)_and_(max-height:520px)]:flex-none
                 [@media(orientation:landscape)_and_(max-height:520px)]:h-[min(280px,40vh)]"
    >
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
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
const Slide = memo(
  ({
    zIndex,
    bgClass,
    slideData,
    y,
  }: {
    zIndex: number;
    bgClass: string;
    slideData: SlideData;
    y?: MotionValue<string>;
  }) => (
    <motion.div
      style={{ zIndex, y }}
      className={`absolute inset-0 flex items-center will-change-transform ${bgClass}
                  p-[min(1.5rem,4vh)] sm:p-[min(2.5rem,5.5vh)] lg:p-[min(3.5rem,7vh)]`}
    >
      <SlideLayout {...slideData} />
    </motion.div>
  ),
);
Slide.displayName = "Slide";

const ScrollOverlapSlides = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const slide2Y = useTransform(scrollYProgress, [0.1, 0.35], ["100%", "0%"]);
  const slide3Y = useTransform(scrollYProgress, [0.45, 0.65], ["100%", "0%"]);
  const slide4Y = useTransform(scrollYProgress, [0.65, 0.85], ["100%", "0%"]);

  const slides: {
    zIndex: number;
    bgClass: string;
    data: SlideData;
    y?: MotionValue<string>;
  }[] = [
    {
      zIndex: 10,
      bgClass: "bg-gradient-to-br from-[#a8d8ea] to-[#7ec8e3]",
      data: {
        subtitle: "The Challenge",
        title: "Most Websites Look Good — But Don't Perform",
        content:
          "Many businesses invest in websites that look visually appealing but fail to attract traffic, retain users, or generate leads. Slow load times, poor structure, and unclear messaging often limit real growth, even when the product or service is strong.",
        image: "/images/slide.png",
        button: "Why Performance Matters",
      },
    },
    {
      zIndex: 20,
      bgClass: "bg-gradient-to-br from-[#8ecae6] to-[#5b8fb0]",
      data: {
        subtitle: "Our Philosophy",
        title: "Design and Development Must Work Together",
        content:
          "We believe successful digital products are built at the intersection of strategy, user experience, and technology. Every layout, interaction, and content block is planned to guide users clearly while supporting long-term scalability and search visibility.",
        image: "/images/slide2.jpg",
        button: "How We Approach Projects",
      },
      y: slide2Y,
    },
    {
      zIndex: 30,
      bgClass: "bg-gradient-to-br from-[#4a6fa5] to-[#2c4870]",
      data: {
        subtitle: "Technology",
        title: "Modern, Performance-First Web Development",
        content:
          "Our builds focus on clean architecture, fast performance, and maintainable code. Using modern frameworks and motion-driven interfaces, we create websites that feel smooth to use while remaining lightweight, accessible, and optimized for search engines.",
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
        content:
          "The result is a website or application that loads fast, ranks better, adapts easily, and supports real business goals. Whether it's lead generation, brand positioning, or product expansion, the foundation is built to scale as your business evolves.",
        image: "/images/slide4.jpg",
        button: "Start a Project",
      },
      y: slide4Y,
    },
  ];

  return (
    <div ref={ref} className="bg-white" style={{ "--nav": `${NAVBAR_HEIGHT}px` } as CSSProperties}>
      <div style={{ height: 2 }} />

      <div className="h-[320vh] sm:h-[350vh] lg:h-[400vh]">
        {/* svh = visible viewport on mobile, so the card isn't hidden behind browser toolbars.
            The vh rule is the fallback for browsers without svh support. */}
        <div
          className="sticky top-[var(--nav)] flex h-[calc(100vh-var(--nav))] items-center justify-center
                     supports-[height:100svh]:h-[calc(100svh-var(--nav))]"
        >
          <div
            className="relative h-[88%] w-[96vw] max-w-7xl overflow-hidden rounded-3xl
                       shadow-[0_30px_90px_rgba(0,0,0,0.45)]
                       sm:h-[83%] lg:h-[80%] lg:w-[92vw]"
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