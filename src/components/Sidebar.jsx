import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, FolderGit2, Bot, Mail, Github, Linkedin } from 'lucide-react';

const sidebarVariants = {
  open: {
    clipPath: "circle(1200px at 48px 48px)",
    transition: {
      type: "spring",
      stiffness: 40,
      restDelta: 2
    }
  },
  closed: {
    clipPath: "circle(24px at 48px 48px)",
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 300,
      damping: 40
    }
  }
};

const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About Me', icon: User },
  { path: '/projects', label: 'Projects', icon: FolderGit2 },
  { path: '/ai-twin', label: 'AI Twin Chat', icon: Bot },
  { path: '/contact', label: 'Contact', icon: Mail }
];

const listVariants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

const itemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 }
    }
  },
  closed: {
    y: 30,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 }
    }
  }
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="fixed top-0 left-0 bottom-0 z-50 pointer-events-none">
      {/* Sidebar background and overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="absolute top-0 left-0 bottom-0 w-72 sm:w-80 bg-[#070b14]/98 border-r border-white/5 backdrop-blur-2xl pointer-events-auto"
      >
        <div className="flex flex-col h-full justify-between pt-24 px-6 pb-8">
          {/* Nav Links */}
          <motion.ul variants={listVariants} className="space-y-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <motion.li
                  key={item.path}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary/10 border border-primary/20 text-primary shadow-[0_0_15px_rgba(0,242,255,0.05)]'
                        : 'text-text-secondary border border-transparent hover:text-white hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-semibold font-display tracking-wide">{item.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Sidebar Footer */}
          <motion.div 
            variants={itemVariants}
            className="border-t border-white/5 pt-6 flex flex-col gap-4"
          >
            <div className="flex items-center gap-4 px-2">
              <a
                href="https://github.com/Lakshyagupta23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-white hover:scale-110 transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/lakshya-gupta-822770301"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-tertiary hover:text-white hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-[10px] text-text-tertiary font-mono px-2">
              © {new Date().getFullYear()} LAKSHYA GUPTA
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute top-6 left-6 z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/40 hover:bg-black/60 backdrop-blur-md pointer-events-auto cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/40 transition-colors"
        aria-label="Toggle navigation menu"
      >
        <svg width="20" height="20" viewBox="0 0 23 23" fill="none">
          <motion.path
            strokeWidth="2.5"
            stroke="currentColor"
            strokeLinecap="round"
            animate={isOpen ? { d: "M 3 16.5 L 17 2.5" } : { d: "M 2 2.5 L 20 2.5" }}
            className="text-white"
          />
          <motion.path
            strokeWidth="2.5"
            stroke="currentColor"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="text-white"
          />
          <motion.path
            strokeWidth="2.5"
            stroke="currentColor"
            strokeLinecap="round"
            animate={isOpen ? { d: "M 3 2.5 L 17 16.5" } : { d: "M 2 16.346 L 20 16.346" }}
            className="text-white"
          />
        </svg>
      </button>
    </div>
  );
}
