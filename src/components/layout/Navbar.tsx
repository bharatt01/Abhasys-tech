import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLenisAnchor } from "./ScrollTo";
const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Our Work", path: "/our-work" },
];

/* ===========================
   Animated Hamburger Icon
=========================== */
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (custom: number) => ({
      rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
      y: custom === 1 ? 8 : custom === 3 ? -8 : 0,
      opacity: custom === 2 ? 0 : 1,
    }),
  };

  return (
    <div className="w-7 h-5 relative flex flex-col justify-between">
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={lineVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="block w-full h-[2.5px] bg-white rounded-full origin-center"
        />
      ))}
    </div>
  );
};

/* ===========================
   Scroll Progress Bar
=========================== */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 h-[2px] bg-indigo-500 origin-left z-[60]"
      style={{ scaleX }}
    />
  );
};

const Navbar = () => {

  const handleAnchorClick = useLenisAnchor(); // Custom hook for smooth scrolling to anchors
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-black/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] py-3"
            : "bg-black/40 backdrop-blur-sm py-5"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/images/logo.png"
                alt="Abhasys Logo"
                className={`w-auto object-contain transition-all duration-300 ${
                  isScrolled ? "h-9" : "h-11"
                } group-hover:scale-105`}
              />
              <span className="text-2xl font-bold tracking-wide text-white">
                Abhasys
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-lg font-semibold transition-colors duration-200 relative group ${
                      isActive
                        ? "text-indigo-500"
                        : "text-white/70 md:hover:text-indigo-500"
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-indigo-500 transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 md:group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Button
                asChild
                size="lg"
                className="bg-indigo-500 hover:bg-indigo-600 text-black font-bold shadow-[0_0_30px_rgba(212,160,23,0.35)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,160,23,0.5)]"
              >
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>

            {/* Animated Hamburger Toggle */}
            <button
            
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
            >
              <HamburgerIcon isOpen={isMobileMenuOpen} />
            </button>
          </nav>
        </div>

        {/* Scroll Progress Bar */}
        <ScrollProgress />
      </motion.header>

      {/* ============================================
          MOBILE MENU OVERLAY
      ============================================ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black md:hidden"
          >
            {/* Close button */}
            <div className="absolute top-5 right-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <HamburgerIcon isOpen={true} />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col items-center justify-center h-full px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="space-y-6 text-center"
              >
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;

                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block text-3xl font-bold transition-colors duration-200 ${
                          isActive
                            ? "text-indigo-500"
                            : "text-white/80 active:text-indigo-500"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6"
                >
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-black font-bold text-lg px-12 py-6"
                  >
                    <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Get a Quote
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;