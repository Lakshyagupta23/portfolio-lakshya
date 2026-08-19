import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Github, ExternalLink, ShieldCheck, ShieldAlert, Gamepad2, Cpu, Code, Binary } from 'lucide-react';

const projects = [
  {
    id: "sentinel",
    title: "SentinelFlow",
    subtitle: "Real-Time DDoS Detection & Mitigation Platform",
    category: "Cybersecurity & ML",
    description: "Designed and engineered as a state-of-the-art security platform to monitor, identify, and mitigate distributed denial-of-service threats in real-time. Built with a technical blueprint aesthetic, it features real-time network traffic telemetry, custom alert rules creation, automated incident playbooks, and a machine learning anomaly detection engine.",
    bullets: [
      "AI Anomaly Detection Daemon: Integrates scikit-learn's Isolation Forest algorithm running on a FastAPI service to classify volumetric, protocol, or application layer anomalies in real-time.",
      "Real-Time Traffic Telemetry: High-performance dashboard displaying network volume, request rates, protocol distributions, and IP entropy with live charts.",
      "Incident Response Playbooks: Interactive mitigation tools allowing operators to construct and deploy automated response chains (block IPs, throttle traffic, rate limit)."
    ],
    tech: ["React 19", "Tailwind CSS", "FastAPI", "scikit-learn", "Express", "tRPC 11", "MySQL", "Drizzle ORM"],
    color: "from-amber-500/20 to-yellow-500/5",
    accent: "text-amber-500",
    github: "https://github.com/Lakshyagupta23/Sentinelflow-DDOS",
    live: "https://sentinelflow-web-server.onrender.com/",
    codeIcon: ShieldAlert
  },
  {
    id: "roguedex",
    title: "RogueDex",
    subtitle: "Pokémon Randomizer & Team Builder",
    category: "Web Application",
    description: "A modern, responsive web application for Pokémon fans that allows users to randomly generate Pokémon, create randomized teams, explore Pokémon information, apply advanced filters, and generate competitive teams. Styled with a polished gaming product UI rather than a basic random-number generator.",
    bullets: [
      "Advanced Filters Panel: Select from Generations 1-9, specific types, and filter by legendary, mythical, paradox, or ultra beast statuses.",
      "Team Builder Randomizer: Construct randomized party sets matching specific rule constraints for Pokémon challenges.",
      "Next.js Integration: Built with a highly responsive, optimized Next.js setup fetching live data dynamically from the PokeAPI."
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PokeAPI", "Framer Motion"],
    color: "from-red-500/20 to-rose-500/5",
    accent: "text-red-500",
    github: "https://github.com/Lakshyagupta23/RogueDex",
    live: "https://rogue-dex.vercel.app/",
    codeIcon: Gamepad2
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
                  {proj.live ? (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-text-tertiary hover:text-white transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                      <span>View Live Site</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => alert("Project code can be explored directly in the Github repository link provided!")}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-text-tertiary hover:text-white transition-colors cursor-pointer"
                      style={{ cursor: 'pointer' }}
                    >
                      <ExternalLink className="w-4.5 h-4.5" />
                      <span>Explore Code</span>
                    </button>
                  )}
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
                <div className={`relative aspect-video w-full rounded-2xl bg-gradient-to-br ${proj.color} border border-white/5 overflow-hidden group shadow-lg flex items-center justify-center`}>
                  
                  {/* Actual generated preview image */}
                  <img 
                    src={proj.id === 'sentinel' ? "/images/sentinelflow.png" : "/images/roguedex.png"} 
                    alt={`${proj.title} Preview`}
                    className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:opacity-50 group-hover:scale-[1.03] transition-all duration-500"
                  />
                  
                  {/* Backdrop overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90" />
                  
                  {/* Dynamic interactive icons */}
                  <div className="relative z-10 flex flex-col items-center justify-center text-center select-none p-6">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-black/60 border border-white/10 text-white shadow-xl group-hover:scale-105 transition-transform duration-300">
                      <ProjIcon className={`w-5.5 h-5.5 ${proj.accent}`} />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-white">
                      {proj.id === 'sentinel' ? "Traffic Monitor" : "Pokedex Engine"}
                    </span>
                    <span className="mt-1 text-[9px] text-text-tertiary font-mono">
                      {proj.id === 'sentinel' ? "scikit-learn · Active Protection" : "nextjs-api-route · listening"}
                    </span>
                  </div>

                  <div className="absolute top-4 left-4 text-[9px] text-text-tertiary font-mono uppercase tracking-wider select-none">
                    SYS_ACTIVE
                  </div>
                  <div className="absolute bottom-4 right-4 text-[9px] font-mono text-primary font-semibold select-none">
                    {proj.id === 'sentinel' ? "PORT: 3000" : "PORT: 3000"}
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
