import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, ExternalLink } from "lucide-react";
import AITwin from "../components/AITwin";

// Neural Network SVG Illustration
function NeuralGraph() {
  const nodes = [
    { cx: 80, cy: 200, label: "ML" },
    { cx: 80, cy: 310, label: "CV" },
    { cx: 240, cy: 120, label: "API" },
    { cx: 240, cy: 255, label: "AI" },
    { cx: 240, cy: 380, label: "DB" },
    { cx: 390, cy: 200, label: "React" },
    { cx: 390, cy: 320, label: "Py" },
  ];
  const edges = [
    [0,2],[0,3],[1,3],[1,4],[2,5],[3,5],[3,6],[4,6],[2,3],[3,4]
  ];
  return (
    <svg viewBox="0 0 480 480" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Edges */}
      {edges.map(([a,b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(201,168,76,0.18)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 + i * 0.08, ease: "easeOut" }}
        />
      ))}
      {/* Glow halos */}
      {nodes.map((n, i) => (
        <motion.circle
          key={"halo-" + i}
          cx={n.cx} cy={n.cy} r="26"
          fill="url(#nodeGrad)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.g
          key={"node-" + i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 + i * 0.1, ease: [0.16,1,0.3,1] }}
        >
          <circle cx={n.cx} cy={n.cy} r="18" fill="#161412" stroke="rgba(201,168,76,0.35)" strokeWidth="1" />
          <text x={n.cx} y={n.cy + 4} textAnchor="middle" fill="#c9a84c" fontSize="8" fontFamily="JetBrains Mono, monospace" fontWeight="700">
            {n.label}
          </text>
        </motion.g>
      ))}
      {/* Animated pulse ring on center node */}
      <motion.circle
        cx={240} cy={255} r="24"
        fill="none"
        stroke="rgba(201,168,76,0.5)"
        strokeWidth="1"
        animate={{ r: [24, 38, 24], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

const words = ["Developer", "AI/ML Engineer", "Builder", "Problem Solver"];

export default function Home() {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayWord, setDisplayWord] = useState(words[0]);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx((prev) => {
        const next = (prev + 1) % words.length;
        setDisplayWord(words[next]);
        return next;
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div className="relative min-h-screen w-full">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center px-6 pt-24 pb-16 md:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Text */}
            <div className="space-y-8">
              <motion.div {...fadeUp(0.1)}>
                <span className="label-tag">Available for Work · 2026</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  className="font-display font-extrabold leading-none tracking-tighter text-[#f0ece3]"
                  style={{ fontSize: "clamp(50px, 7vw, 90px)", fontFamily: '"Sora", sans-serif' }}
                  {...fadeUp(0.2)}
                >
                  LAKSHYA<br />GUPTA
                </motion.h1>

                <motion.div {...fadeUp(0.3)} className="flex items-center gap-3">
                  <div className="h-px w-8 bg-[#c9a84c] animate-line-grow" />
                  <span
                    className="text-[#c9a84c] text-base font-medium tracking-wide"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    <motion.span
                      key={displayWord}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                    >
                      {displayWord}
                    </motion.span>
                  </span>
                </motion.div>
              </div>

              <motion.p
                {...fadeUp(0.4)}
                className="text-[rgba(240,236,227,0.6)] text-base leading-relaxed max-w-md"
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                B.Tech AI/ML student at IPEC, Ghaziabad. Building real-world products at the intersection of machine learning, computer vision, and modern web engineering.
              </motion.p>

              <motion.div {...fadeUp(0.5)} className="flex flex-wrap gap-3">
                <Link to="/projects" className="btn-gold">
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  id="open-ai-twin-btn"
                  onClick={() => setChatOpen(true)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[rgba(240,236,227,0.55)] hover:text-[rgba(240,236,227,0.9)] transition-colors duration-200 cursor-pointer"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  Chat with my AI Twin <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>

              <motion.div {...fadeUp(0.6)} className="flex items-center gap-5 pt-2">
                <a href="https://github.com/Lakshyagupta23" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                  className="text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors duration-200">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://linkedin.com/in/lakshya-gupta-822770301" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                  className="text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:lakshyagupta23.lg@gmail.com" aria-label="Email"
                  className="text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors duration-200">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="/resumes/Lakshya_Resume.pdf" target="_blank" rel="noopener noreferrer"
                  className="label-tag hover:border-[rgba(201,168,76,0.5)] transition-colors duration-200">
                  View Resume
                </a>
              </motion.div>
            </div>

            {/* Right: Neural Graph */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md mx-auto aspect-square"
            >
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-[rgba(201,168,76,0.06)]" />
              <div className="absolute inset-8 rounded-full border border-[rgba(201,168,76,0.04)]" />
              <NeuralGraph />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          >
            <div className="w-[1px] h-10 bg-[rgba(240,236,227,0.1)] relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-4 bg-[rgba(201,168,76,0.6)] animate-scroll-dot" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ROW ─────────────────────────────────────────────── */}
      <section className="border-y border-[rgba(240,236,227,0.06)] px-6 py-8 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(240,236,227,0.08)]"
          >
            {[
              { val: "2+", label: "Projects Live" },
              { val: "1st", label: "Place Hackathon · JECRC" },
              { val: "AI/ML", label: "Intern @ KVGAI Tech" },
              { val: "SIH", label: "2025 Participant" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center py-4 px-10 gap-1 text-center">
                <span
                  className="text-xl font-bold text-[#c9a84c]"
                  style={{ fontFamily: '"Sora", sans-serif' }}
                >
                  {s.val}
                </span>
                <span
                  className="text-xs text-[rgba(240,236,227,0.4)] tracking-wide uppercase"
                  style={{ fontFamily: '"Outfit", sans-serif' }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS STRIP ───────────────────────────────── */}
      <section className="px-6 pt-20 pb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-10"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-6 bg-[rgba(201,168,76,0.4)]" />
              <span className="label-tag">Featured Work</span>
            </div>
            <Link
              to="/projects"
              className="text-xs text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.8)] transition-colors flex items-center gap-1"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              All Projects <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                num: "01",
                title: "SentinelFlow",
                cat: "Cybersecurity · ML",
                desc: "Real-time DDoS detection and mitigation platform. scikit-learn Isolation Forest + FastAPI + React.",
                live: "https://sentinelflow-web-server.onrender.com/",
                gh: "https://github.com/Lakshyagupta23/Sentinelflow-DDOS",
                tech: ["React", "FastAPI", "scikit-learn", "MySQL"],
              },
              {
                num: "02",
                title: "RogueDex",
                cat: "Web Application",
                desc: "Pokémon randomizer and team builder with advanced filters and holographic card design.",
                live: "https://rogue-dex.vercel.app/",
                gh: "https://github.com/Lakshyagupta23/RogueDex",
                tech: ["Next.js", "TypeScript", "PokeAPI"],
              },
            ].map((proj, i) => (
              <motion.div
                key={proj.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="card-surface rounded-[3px] p-8 group relative overflow-hidden"
              >
                {/* Large project number watermark */}
                <span
                  className="absolute top-4 right-6 text-7xl font-bold text-[rgba(201,168,76,0.04)] pointer-events-none select-none"
                  style={{ fontFamily: '"Sora", sans-serif' }}
                >
                  {proj.num}
                </span>

                <div className="relative z-10 space-y-4">
                  <div>
                    <p className="text-[10px] font-mono text-[rgba(201,168,76,0.7)] uppercase tracking-widest mb-1" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                      {proj.cat}
                    </p>
                    <h3 className="text-2xl font-bold text-[#f0ece3]" style={{ fontFamily: '"Sora", sans-serif' }}>
                      {proj.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[rgba(240,236,227,0.55)] leading-relaxed" style={{ fontFamily: '"Outfit", sans-serif' }}>
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {proj.tech.map((t) => (
                      <span key={t} className="tech-pill">{t}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t border-[rgba(240,236,227,0.05)]">
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[rgba(201,168,76,0.8)] hover:text-[#c9a84c] transition-colors font-medium"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Live Site
                    </a>
                    <a
                      href={proj.gh}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.8)] transition-colors"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      <Github className="w-3.5 h-3.5" /> Repository
                    </a>
                  </div>
                </div>

                {/* Bottom gold border on hover */}
                <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[rgba(201,168,76,0.5)] group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI TWIN FLOATING BUTTON ──────────────────────────────── */}
      <motion.button
        id="ai-twin-float-btn"
        onClick={() => setChatOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        className="fixed bottom-7 right-7 z-30 flex h-14 w-14 items-center justify-center rounded-full border border-[rgba(201,168,76,0.4)] bg-[#161412] shadow-xl cursor-pointer group"
        aria-label="Open AI Twin chat"
      >
        <span className="text-lg" aria-hidden="true" style={{ fontFamily: '"Sora", sans-serif', fontWeight: 800, color: "#c9a84c" }}>AI</span>
        <div className="absolute inset-0 rounded-full border border-[rgba(201,168,76,0.15)] animate-live-glow pointer-events-none" />
      </motion.button>

      {/* ── AI TWIN MODAL ────────────────────────────────────────── */}
      {chatOpen && (
        <motion.div
          id="ai-twin-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-[rgba(14,12,10,0.8)] backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setChatOpen(false); }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl h-[85vh] max-h-[720px] flex flex-col"
          >
            <button
              onClick={() => setChatOpen(false)}
              className="absolute -top-10 right-0 text-xs text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors cursor-pointer flex items-center gap-1"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Close
            </button>
            <AITwin />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
