import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Our Work", path: "/our-work" },
];

const Navbar = () => {
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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0b0f1f]/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-800 to-violet-900 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_50px_rgba(99,102,241,0.45)] transition-all">
              <Zap className="w-5 h-5 text-indigo-200" />
            </div>
            <span className="text-xl font-bold text-slate-100">
              Apex
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Growth
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
  location.pathname === link.path
    ? "text-indigo-500"
    : "text-indigo-300 hover:text-indigo-700"
}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              size="lg"
              className="bg-indigo-800 hover:bg-indigo-700 text-indigo-100 shadow-[0_0_30px_rgba(99,102,241,0.35)]"
            >
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-slate-200" />
            ) : (
              <Menu className="w-6 h-6 text-slate-200" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`block py-3 px-4 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? "bg-indigo-900/60 text-indigo-300"
                          : "text-slate-400 hover:bg-white/5"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-indigo-800 hover:bg-indigo-700 text-indigo-100"
                  >
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
