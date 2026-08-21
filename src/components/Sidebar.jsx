import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/ai-twin", label: "AI Twin" },
  { path: "/contact", label: "Contact" },
];

export default function TopNav() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = "auto";
  }, [location]);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? "hidden" : "auto";
  };

  return (
    <>
      {/* Fixed top bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-6 md:px-12 lg:px-20 transition-all duration-500 ${
          scrolled
            ? "border-b border-[rgba(240,236,227,0.06)] bg-[rgba(14,12,10,0.92)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <div
            className="flex h-8 w-8 items-center justify-center border border-[rgba(201,168,76,0.35)] text-[#c9a84c] text-xs font-bold font-display tracking-widest transition-colors duration-300 group-hover:bg-[rgba(201,168,76,0.08)] group-hover:border-[rgba(201,168,76,0.6)]"
            style={{ borderRadius: "2px", fontFamily: '"Sora", sans-serif' }}
          >
            LG
          </div>
          <span
            className="hidden sm:block text-[11px] font-medium tracking-[0.15em] uppercase text-[rgba(240,236,227,0.55)] group-hover:text-[rgba(240,236,227,0.85)] transition-colors duration-300"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          >
            Lakshya Gupta
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link-wrap text-[12px] font-medium tracking-[0.08em] uppercase transition-colors duration-200 ${
                  isActive
                    ? "nav-link-active text-[#c9a84c]"
                    : "text-[rgba(240,236,227,0.55)] hover:text-[rgba(240,236,227,0.9)]"
                }`}
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side: socials + hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Lakshyagupta23"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/lakshya-gupta-822770301"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            onClick={toggleMenu}
            className="flex md:hidden flex-col gap-[5px] p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-[rgba(240,236,227,0.7)]"
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[rgba(240,236,227,0.7)]"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[rgba(240,236,227,0.7)]"
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0e0c0a] flex flex-col justify-center px-10"
          >
            <motion.nav
              className="flex flex-col gap-6"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.path}
                    variants={{
                      open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                      closed: { opacity: 0, x: -30, transition: { duration: 0.3 } },
                    }}
                  >
                    <Link
                      to={item.path}
                      className={`text-4xl font-bold tracking-tight transition-colors duration-200 ${
                        isActive ? "text-[#c9a84c]" : "text-[rgba(240,236,227,0.6)] hover:text-[#f0ece3]"
                      }`}
                      style={{ fontFamily: '"Sora", sans-serif' }}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
            <div className="flex gap-6 mt-16 border-t border-[rgba(240,236,227,0.06)] pt-8">
              <a
                href="https://github.com/Lakshyagupta23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/lakshya-gupta-822770301"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
