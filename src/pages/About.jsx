import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const skills = [
  { cat: "Languages", items: ["Python", "C", "C++", "SQL"] },
  { cat: "AI / ML", items: ["Machine Learning", "Generative AI", "Model Fine-Tuning", "Prompt Engineering", "Data Analysis"] },
  { cat: "Computer Vision", items: ["OpenCV", "Dlib", "MediaPipe", "Face Recognition"] },
  { cat: "Web Development", items: ["React", "Next.js", "Node.js", "Express", "FastAPI", "TypeScript"] },
  { cat: "Databases & ORM", items: ["MySQL", "SQLite", "TiDB", "Drizzle ORM"] },
  { cat: "Core CS", items: ["Data Structures", "Algorithms", "OOP", "DBMS"] },
];

const timeline = [
  {
    year: "2026",
    title: "AI Developer Intern",
    place: "KVGAI Tech Limited",
    detail: "Fine-tuned and debugged Anthropic LLMs (Claude, Opus). Engineered prompt caching pipelines reducing latency and token costs significantly.",
  },
  {
    year: "2025",
    title: "Event Head, THINK AI",
    place: "Inderprastha Engineering College",
    detail: "Managed technical events, campus seminars, and coding challenges for the AI student community.",
  },
  {
    year: "2025",
    title: "SIH 2025 Participant",
    place: "Smart India Hackathon",
    detail: "Built Mark My Face — a real-time face recognition attendance system using OpenCV and Dlib (Team VISIONEERS).",
  },
  {
    year: "2024",
    title: "1st Place · JECRC Hackathon",
    place: "Bid2Code, Jaipur",
    detail: "Won with Eventure — a verified college sponsorship platform built on Node.js, Express, and SQL.",
  },
  {
    year: "2023",
    title: "B.Tech · AI & ML",
    place: "Inderprastha Engineering College, Ghaziabad",
    detail: "Specialising in predictive modelling, computer vision, and full-stack engineering. Expected May 2027.",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function About() {
  return (
    <div className="relative min-h-screen w-full px-6 pt-28 pb-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">

        {/* Page header */}
        <div className="relative mb-16">
          <span className="page-num" aria-hidden="true">01</span>
          <motion.div {...fadeUp(0)} className="space-y-3">
            <span className="label-tag">About Me</span>
            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#f0ece3] leading-none"
              style={{ fontFamily: '"Sora", sans-serif' }}
            >
              The Person<br />Behind the Code
            </h1>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16,1,0.3,1] }}
            className="mt-8 h-px bg-[rgba(201,168,76,0.2)] origin-left"
          />
        </div>

        {/* Two-column: 40/60 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT: Photo + Bio + Socials */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4 space-y-8">
            {/* Photo */}
            <div className="relative w-full max-w-xs">
              <div className="aspect-[3/4] rounded-[3px] overflow-hidden border border-[rgba(201,168,76,0.12)]">
                <img
                  src="/lakshya.png"
                  alt="Lakshya Gupta"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              {/* Gold accent corner */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-r border-b border-[rgba(201,168,76,0.3)]" />
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t border-l border-[rgba(201,168,76,0.3)]" />
            </div>

            {/* Bio */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-[#f0ece3]" style={{ fontFamily: '"Sora", sans-serif' }}>
                Lakshya Gupta
              </h2>
              <p className="text-sm text-[rgba(240,236,227,0.55)] leading-relaxed" style={{ fontFamily: '"Outfit", sans-serif' }}>
                B.Tech student specialising in AI and Machine Learning at Inderprastha Engineering College, Ghaziabad (Expected May 2027). I work at the intersection of computer vision, generative AI, and product engineering.
              </p>
              <p className="text-sm text-[rgba(240,236,227,0.55)] leading-relaxed" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Beyond code, I participate in Nukkad Natak street theatre with Inaayat Dramatics Society — which has sharpened my communication and leadership instincts.
              </p>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
              <a href="https://github.com/Lakshyagupta23" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors"
                style={{ fontFamily: '"Outfit", sans-serif' }}>
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://linkedin.com/in/lakshya-gupta-822770301" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors"
                style={{ fontFamily: '"Outfit", sans-serif' }}>
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a href="mailto:lakshyagupta23.lg@gmail.com"
                className="flex items-center gap-2 text-xs text-[rgba(240,236,227,0.4)] hover:text-[rgba(240,236,227,0.9)] transition-colors"
                style={{ fontFamily: '"Outfit", sans-serif' }}>
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </motion.div>

          {/* RIGHT: Skills + Timeline */}
          <div className="lg:col-span-8 space-y-16">

            {/* Skills */}
            <motion.div {...fadeUp(0.2)} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-5 bg-[rgba(201,168,76,0.4)]" />
                <span className="label-tag">Skills</span>
              </div>

              <div className="space-y-5">
                {skills.map((s) => (
                  <div key={s.cat} className="grid grid-cols-12 gap-4 items-start">
                    <div className="col-span-12 sm:col-span-3">
                      <span
                        className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.35)]"
                        style={{ fontFamily: '"JetBrains Mono", monospace' }}
                      >
                        {s.cat}
                      </span>
                    </div>
                    <div className="col-span-12 sm:col-span-9 flex flex-wrap gap-2">
                      {s.items.map((item) => (
                        <span key={item} className="tech-pill">{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="section-divider" />

            {/* Timeline */}
            <motion.div {...fadeUp(0.3)} className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="h-px w-5 bg-[rgba(201,168,76,0.4)]" />
                <span className="label-tag">Experience & Education</span>
              </div>

              <div className="space-y-8">
                {timeline.map((item, i) => (
                  <motion.div
                    key={i}
                    className="timeline-item relative pl-10"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {/* Dot */}
                    <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border border-[rgba(201,168,76,0.5)] bg-[#0e0c0a]" />
                    {/* Line */}
                    <div className="timeline-line" />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className="text-[10px] font-mono text-[#c9a84c]"
                          style={{ fontFamily: '"JetBrains Mono", monospace' }}
                        >
                          {item.year}
                        </span>
                        <span className="text-[rgba(240,236,227,0.15)] text-xs">·</span>
                        <span
                          className="text-[10px] text-[rgba(240,236,227,0.35)] uppercase tracking-wider"
                          style={{ fontFamily: '"Outfit", sans-serif' }}
                        >
                          {item.place}
                        </span>
                      </div>
                      <h4
                        className="text-sm font-semibold text-[rgba(240,236,227,0.9)]"
                        style={{ fontFamily: '"Sora", sans-serif' }}
                      >
                        {item.title}
                      </h4>
                      <p
                        className="text-xs text-[rgba(240,236,227,0.45)] leading-relaxed"
                        style={{ fontFamily: '"Outfit", sans-serif' }}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
