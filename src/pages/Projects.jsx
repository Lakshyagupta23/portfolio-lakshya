import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    num: "01",
    id: "sentinel",
    title: "SentinelFlow",
    subtitle: "Real-Time DDoS Detection & Mitigation Platform",
    category: "Cybersecurity & Machine Learning",
    description: "A production-grade security platform for monitoring, identifying, and mitigating distributed denial-of-service threats in real time. Combines a FastAPI-powered ML service running scikit-learn's Isolation Forest algorithm with a high-performance React dashboard for live traffic telemetry, custom alert rules, and automated incident playbooks.",
    bullets: [
      "Isolation Forest anomaly engine classifies volumetric, protocol, and application-layer attacks in real time",
      "High-performance live traffic telemetry with request rate charts, protocol distributions, and IP entropy",
      "Automated mitigation playbooks: block IPs, throttle traffic, enforce rate limits via a tRPC API",
    ],
    tech: ["React 19", "Tailwind CSS", "FastAPI", "scikit-learn", "Express", "tRPC 11", "MySQL / TiDB", "Drizzle ORM"],
    github: "https://github.com/Lakshyagupta23/Sentinelflow-DDOS",
    live: "https://sentinelflow-web-server.onrender.com/",
  },
  {
    num: "02",
    id: "roguedex",
    title: "RogueDex",
    subtitle: "Pokémon Randomizer & Team Builder",
    category: "Web Application",
    description: "A modern, type-safe web application for Pokémon enthusiasts featuring a production-level randomizer engine, competitive team builder, and comprehensive Pokédex. Built with Next.js and TypeScript for maximum performance with data sourced live from PokeAPI, wrapped in a polished holographic design system.",
    bullets: [
      "Advanced filter panel across Generations 1-9, all types, legendary/mythical/paradox statuses",
      "Team builder randomizer with rule constraints for Nuzlocke-style challenges",
      "Next.js App Router with dynamic API routes for fast, type-safe PokeAPI integration",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PokeAPI", "Framer Motion"],
    github: "https://github.com/Lakshyagupta23/RogueDex",
    live: "https://rogue-dex.vercel.app/",
  },
  {
    num: "03",
    id: "markface",
    title: "Mark My Face",
    subtitle: "Real-Time Face Recognition Attendance System",
    category: "Computer Vision · AI",
    description: "A Python-based face recognition attendance system engineered for SIH 2025. Uses Dlib's 68-point landmark predictor and a deep-metric ResNet model to log attendance in under 200ms per frame, with full-session reporting stored in SQLite.",
    bullets: [
      "Dlib 68-point landmark predictor selected over MediaPipe for superior classroom lighting tolerance",
      "128-dimensional facial embeddings matched against registered employee/student database in SQLite",
      "Sub-200ms attendance verification per face at 30 FPS camera feed",
    ],
    tech: ["Python", "OpenCV", "Dlib", "SQLite", "NumPy"],
    github: "https://github.com/Lakshyagupta23",
    live: null,
  },
  {
    num: "04",
    id: "eventure",
    title: "Eventure",
    subtitle: "Verified College Events Sponsorship Platform",
    category: "Full-Stack · Hackathon Winner",
    description: "A dual-key verified sponsorship marketplace connecting student event organisers with corporate sponsors. Won 1st place at JECRC Bid2Code Hackathon (Sep 2025). Implements a signed contract verification system to eliminate false sponsorship agreements common on informal channels.",
    bullets: [
      "Dual-key verification flow: both parties must sign off for a sponsorship contract to activate",
      "Corporate and event-host profile dashboards with deal tracking and status management",
      "Node.js + Express REST API with SQL relational schema for verified agreement records",
    ],
    tech: ["Node.js", "Express", "SQL", "HTML/CSS", "JavaScript"],
    github: "https://github.com/Lakshyagupta23",
    live: null,
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Projects() {
  return (
    <div className="relative min-h-screen w-full px-6 pt-28 pb-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">

        {/* Page header */}
        <div className="relative mb-16">
          <span className="page-num" aria-hidden="true">02</span>
          <motion.div {...fadeUp(0)} className="space-y-3">
            <span className="label-tag">Selected Work</span>
            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#f0ece3] leading-none"
              style={{ fontFamily: '"Sora", sans-serif' }}
            >
              Projects &<br />Engineering
            </h1>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16,1,0.3,1] }}
            className="mt-8 h-px bg-[rgba(201,168,76,0.2)] origin-left"
          />
        </div>

        {/* Project cards */}
        <div className="space-y-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              {...fadeUp(idx * 0.1)}
              className="card-surface rounded-[3px] p-8 md:p-10 group relative overflow-hidden"
            >
              {/* Large project number watermark */}
              <span
                className="absolute top-6 right-8 font-bold text-[rgba(201,168,76,0.05)] pointer-events-none select-none"
                style={{ fontFamily: '"Sora", sans-serif', fontSize: "clamp(60px, 8vw, 110px)", lineHeight: 1 }}
                aria-hidden="true"
              >
                {proj.num}
              </span>

              <div className="relative z-10 space-y-6">
                {/* Header */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span
                      className="text-[10px] text-[rgba(201,168,76,0.7)] font-mono uppercase tracking-widest"
                      style={{ fontFamily: '"JetBrains Mono", monospace' }}
                    >
                      {proj.category}
                    </span>
                  </div>
                  <h2
                    className="text-3xl font-bold text-[#f0ece3]"
                    style={{ fontFamily: '"Sora", sans-serif' }}
                  >
                    {proj.title}
                  </h2>
                  <p
                    className="text-sm text-[rgba(240,236,227,0.45)] font-medium"
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {proj.subtitle}
                  </p>
                </div>

                <div className="h-px bg-[rgba(240,236,227,0.05)]" />

                {/* Two columns */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Description */}
                  <div className="md:col-span-7 space-y-5">
                    <p
                      className="text-sm text-[rgba(240,236,227,0.55)] leading-relaxed"
                      style={{ fontFamily: '"Outfit", sans-serif' }}
                    >
                      {proj.description}
                    </p>

                    <ul className="space-y-2">
                      {proj.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-3 text-xs text-[rgba(240,236,227,0.4)]" style={{ fontFamily: '"Outfit", sans-serif' }}>
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-[rgba(201,168,76,0.5)] shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech + Links */}
                  <div className="md:col-span-5 space-y-6">
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.25)] mb-2"
                        style={{ fontFamily: '"JetBrains Mono", monospace' }}
                      >
                        Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.map((t) => (
                          <span key={t} className="tech-pill">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-gold text-xs"
                        style={{ justifyContent: "center" }}
                      >
                        <Github className="w-4 h-4" /> View Repository
                      </a>
                      {proj.live && (
                        <a
                          href={proj.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 text-xs text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.8)] transition-colors py-2"
                          style={{ fontFamily: '"Outfit", sans-serif' }}
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> View Live Site
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom gold border on hover */}
              <div className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[rgba(201,168,76,0.4)] group-hover:w-full transition-all duration-600" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
