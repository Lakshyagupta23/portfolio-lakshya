import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, ShieldCheck, Cpu, Code, Binary } from 'lucide-react';

const projects = [
  {
    id: "face",
    title: "Mark My Face",
    subtitle: "Real-Time Face Recognition Attendance System",
    category: "AI & Computer Vision",
    description: "Designed and engineered as our submission for the Smart India Hackathon (SIH) 2025 under Team VISIONEERS. Mark My Face is a computer-vision-based system built to automate class attendance logging for schools and colleges, saving valuable lecturing hours and giving students transparent access to their attendance records.",
    bullets: [
      "Real-time processing: Utilizes optimized OpenCV capture buffers to recognize multiple individuals in under 200ms.",
      "High accuracy: Integrates state-of-the-art Dlib facial landmark predictors for alignment and representation.",
      "Zero manual error: Automatically logs timestamps and exports reports to secure local databases."
    ],
    tech: ["Python", "OpenCV", "Face Recognition API", "Dlib", "Machine Learning", "NumPy", "SQLite"],
    color: "from-cyan-500/20 to-blue-500/5",
    accent: "text-primary",
    github: "https://github.com/Lakshyagupta23",
    codeIcon: Cpu
  },
  {
    id: "eventure",
    title: "Eventure",
    subtitle: "Verified College Events Sponsorship Platform",
    category: "Full-Stack Web Dev",
    description: "Designed and developed during the Bid2Code Hackathon (where we won 1st place). Eventure is a centralized hub where student event coordinators can publish verified sponsorship brochures, and startups or corporate sponsors can directly purchase packages.",
    bullets: [
      "Secure accounts: Implements encrypted user authentication profiles for organizers and sponsors.",
      "Brochure management: Allows event hosts to list packages, dates, and expected footfall details in real-time.",
      "Responsive panel: Leverages custom CSS structures to render mobile-friendly administrative dashboards."
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "RESTful APIs", "SQL Database"],
    color: "from-indigo-500/20 to-purple-500/5",
    accent: "text-secondary",
    github: "https://github.com/Lakshyagupta23",
    codeIcon: Code
  }
];

export default function Projects() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const bannerRef = useRef(null);
  const { scrollYProgress: bannerScroll } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"]
  });
  
  const bannerY = useTransform(bannerScroll, [0, 1], ["0%", "80%"]);
  const gridY = useTransform(bannerScroll, [0, 1], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="w-full bg-transparent pb-32">
      {/* Sticky Progress Bar */}
      <motion.div 
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary via-secondary to-primary origin-left"
      />

      {/* Cyber Grid Parallax Header (Clean mesh - no overlapping code text cards!) */}
      <div ref={bannerRef} className="relative flex h-[45vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b0f19]/40 to-[#030712] border-b border-white/5 select-none">
        
        {/* Background Cyber Grid */}
        <motion.div 
          style={{ y: gridY }}
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"
        />

        <motion.div 
          style={{ y: bannerY }}
          className="relative z-10 text-center px-4"
        >
          <div className="inline-flex items-center gap-1.5 text-xs text-primary font-mono tracking-widest uppercase mb-3">
            <Binary className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>SYS_READOUT: PORTFOLIO_INDEX</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight font-display text-white sm:text-7xl">
            PROJECTS
          </h1>
          <p className="mt-3 text-xs font-mono text-text-secondary tracking-wide">
            Source Code, AI Architectures, & Applied Engineering
          </p>
        </motion.div>
      </div>

      {/* Projects Feed */}
      <div className="mx-auto max-w-5xl px-6 pt-24 md:px-12 space-y-32">
        {projects.map((proj, idx) => {
          const ProjIcon = proj.codeIcon;
          
          return (
            <div 
              key={proj.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Technical Description Column */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`lg:col-span-6 space-y-6 ${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">
                    {proj.category}
                  </span>
                  <h2 className="text-3xl font-extrabold tracking-tight font-display text-white">
                    {proj.title}
                  </h2>
                  <p className="text-sm font-semibold text-text-secondary leading-normal font-display">
                    {proj.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {proj.description}
                </p>

                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Engineering Focus:</h4>
                  <ul className="space-y-2">
                    {proj.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-text-tertiary leading-relaxed">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tech.map(t => (
                    <span 
                      key={t}
                      className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.03] border border-white/5 text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-primary/30 hover:bg-primary/[0.04] px-4.5 py-2.5 text-xs font-semibold text-white transition-all cursor-pointer"
                  >
                    <Github className="w-4.5 h-4.5" />
                    <span>View Repository</span>
                  </a>
                  <button
                    onClick={() => alert("Project code can be explored directly in the Github repository link provided!")}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-text-tertiary hover:text-white transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4.5 h-4.5" />
                    <span>Explore Code</span>
                  </button>
                </div>
              </motion.div>

              {/* Graphic Placeholder Column */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`lg:col-span-6 ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <div className={`relative aspect-video w-full rounded-2xl bg-gradient-to-br ${proj.color} border border-white/5 p-8 flex items-center justify-center overflow-hidden animate-pulse-glow group`}>
                  
                  {/* Backdrop grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                  {/* Dynamic interactive icons */}
                  <div className="relative z-10 flex flex-col items-center text-center select-none">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black/40 border border-white/10 text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <ProjIcon className={`w-6 h-6 ${proj.accent}`} />
                    </div>
                    <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-white">
                      {proj.id === 'face' ? "Vision Buffer" : "Platform Hub"}
                    </span>
                    <span className="mt-1.5 text-[10px] text-text-tertiary font-mono">
                      {proj.id === 'face' ? "model.eval() · OpenCV active" : "rest_api_endpoint · listening"}
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 text-[9px] text-text-tertiary font-mono uppercase tracking-wider select-none">
                    SYS_ACTIVE
                  </div>
                  <div className="absolute bottom-4 right-4 text-[9px] font-mono text-primary font-semibold select-none">
                    {proj.id === 'face' ? "FPS: 60" : "PORT: 5000"}
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
