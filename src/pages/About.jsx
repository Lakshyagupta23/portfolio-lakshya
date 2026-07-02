import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Brain, 
  Code2, 
  Settings2, 
  ChevronRight,
  Terminal
} from 'lucide-react';

const skillCategories = [
  {
    title: "AI/ML & Data Science",
    icon: Brain,
    skills: ["Machine Learning", "Generative AI", "Model Fine-Tuning", "Model Optimization", "OpenCV Computer Vision", "Prompt Refinement", "Data Analysis"]
  },
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["Python", "Go", "C", "C++", "SQL"]
  },
  {
    title: "Core CS & Tools",
    icon: Settings2,
    skills: ["Data Structures & Algorithms", "Problem-Solving", "Critical Thinking", "Intelligent Automation Tools"]
  }
];

const timelineData = [
  {
    type: "work",
    title: "AI Developer (Intern)",
    company: "KVGAI Tech Limited",
    period: "Jan 2026 – Apr 2026",
    location: "Delhi, India (Remote)",
    description: [
      "Executed comprehensive fine-tuning and debugging of advanced LLMs (Opus, Claude) across cross-compatible architectures.",
      "Optimized data execution pipelines to evaluate model accuracy and reduce system response latency."
    ]
  },
  {
    type: "work",
    title: "Social Media Head",
    company: "Dev Nation",
    period: "Oct 2025 – Present",
    location: "Ghaziabad, India",
    description: [
      "Steering branding campaigns and public relations strategies to increase developer community outreach."
    ]
  },
  {
    type: "work",
    title: "Event Head",
    company: "THINK AI IPEC",
    link: "https://www.linkedin.com/company/think-ai-ipec/",
    period: "Sep 2025 – Present",
    location: "IPEC Chapter",
    description: [
      "Directing club event operations, scheduling technical seminars, and coordinating developer hackathons."
    ]
  },
  {
    type: "work",
    title: "Social Media Lead",
    company: "HackSphere",
    link: "https://www.linkedin.com/company/hacksphere-ipec-chapter/",
    period: "Aug 2025 – Present",
    location: "Delhi, India",
    description: [
      "Leading social media marketing campaigns and branding initiatives to grow outreach for a student developer tech community.",
      "Co-organizing code sprints, developer workshops, and peer panels to bridge technical learning gaps."
    ]
  },
  {
    type: "hack",
    title: "Hackathon Participant",
    company: "Smart India Hackathon (SIH) 2025",
    period: "Aug 2025 – Dec 2025",
    location: "IPEC Chapter",
    description: [
      "Represented Inderprastha Engineering College under Team VISIONEERS in the internal hackathon stage.",
      "Engineered computer-vision prototypes to address real-world problem statements."
    ]
  },
  {
    type: "work",
    title: "Former Social Media Head",
    company: "HackWithIndia - IPEC Chapter",
    period: "Jul 2025 – Dec 2025",
    location: "Delhi, India",
    description: [
      "Led social media marketing initiatives and community campaigns to scale developer participation.",
      "Served as Event Manager (Feb 2025 – Dec 2025) managing partner relationships and hackathon logistics."
    ]
  },
  {
    type: "work",
    title: "Documentation Head",
    company: "THINK AI IPEC",
    period: "Sep 2024 – Oct 2025",
    location: "IPEC Chapter",
    description: [
      "Authored technical documentations, workshop proposals, and club activity reviews."
    ]
  },
  {
    type: "work",
    title: "Core Dramatic Member",
    company: "Inaayat dramatic society",
    period: "Jan 2024 – Present",
    location: "Delhi, India",
    description: [
      "Collaborating on Nukkad Natak (street plays) and stage performances, addressing critical social issues.",
      "Secured 2nd Position in Nukkad Natak at AIIMS Pulse Fest, the largest socio-cultural college festival in South Asia.",
      "Organizing event logistics, leading crowd control, and building public speaking confidence and stage presence."
    ]
  },
  {
    type: "work",
    title: "Cybersecurity Virtual Intern",
    company: "Cisco",
    period: "1-Month Training",
    location: "Virtual",
    description: [
      "Completed a specialized cybersecurity training program focused on threat detection, packet inspection, and network security protocols."
    ]
  },
  {
    type: "edu",
    title: "Bachelors in Technology (AI & Machine learning)",
    company: "Inderprastha Engineering College",
    period: "Expected May 2027",
    location: "Ghaziabad, India",
    description: [
      "Specializing in AI models, neural networks, predictive analytics, and algorithm designs."
    ]
  },
  {
    type: "edu",
    title: "Class XII (Science)",
    company: "Greenfields Public School",
    period: "Completed Dec 2023",
    location: "New Delhi, India",
    description: [
      "Focused on Physics, Chemistry, Mathematics, and Computer Science fundamentals."
    ]
  }
];

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 0.4], ["0%", "120%"]);
  const gridY = useTransform(scrollYProgress, [0, 0.4], ["0%", "30%"]);

  return (
    <div ref={containerRef} className="w-full bg-transparent pb-24">
      
      {/* Cyber Grid Parallax Header (Clean layout - no overlapping text) */}
      <div className="relative flex h-[45vh] w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b0f19]/40 to-[#030712] border-b border-white/5 select-none">
        
        {/* Background Cyber Grid */}
        <motion.div 
          style={{ y: gridY }}
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60"
        />

        {/* Title Container */}
        <motion.div 
          style={{ y: textY }}
          className="relative z-10 text-center px-4"
        >
          <div className="inline-flex items-center gap-1.5 text-xs text-primary font-mono tracking-widest uppercase mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>SYS_READOUT: PROFILE_SPEC</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight font-display text-white sm:text-7xl">
            ABOUT ME
          </h1>
          <p className="mt-3 text-xs font-mono text-text-secondary tracking-wide">
            Lakshya Gupta · AI/ML Engineering & Student Leadership
          </p>
        </motion.div>
      </div>

      {/* Main content grid */}
      <div className="mx-auto max-w-5xl px-6 pt-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          
          {/* Left Column - Bio & Tech Skills */}
          <div className="lg:col-span-7 space-y-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight font-display text-white mb-4">
                AI/ML Engineer & Community Leader
              </h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                I am a B.Tech AI & Machine Learning student at Inderprastha Engineering College with a core interest in computer vision and large language model architectures. My development path balances mathematical modeling with writing low-level systems logic.
              </p>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                As an AI Intern at KVGAI Tech, I gained practical experience fine-tuning LLMs (such as Claude and Opus) and optimizing pipelines for latency and evaluation accuracy. I am also highly active in leadership, serving as the Social Media Lead of HackSphere and Event Head of THINK AI to build developer ecosystems.
              </p>
            </div>

            {/* Skills Grids */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold tracking-tight font-display text-white">
                Technical Expertise
              </h3>
              <div className="space-y-4">
                {skillCategories.map((cat, idx) => {
                  const Icon = cat.icon;
                  return (
                    <motion.div
                      key={cat.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                      className="rounded-xl border border-white/5 bg-[#0b0f19]/40 p-4 backdrop-blur-md"
                    >
                      <div className="flex items-center gap-3 border-b border-white/5 pb-2 mb-3">
                        <Icon className="w-4.5 h-4.5 text-primary" />
                        <h4 className="text-xs font-bold text-white font-display uppercase tracking-wider">{cat.title}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map(s => (
                          <span 
                            key={s} 
                            className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/5 text-text-secondary"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Work & Edu Timeline */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl font-bold tracking-tight font-display text-white">
              Academic & Work Steps
            </h2>

            {/* Timeline (Mathematically Centered Line & Circle nodes!) */}
            <div className="relative border-l border-white/10 pl-8 ml-3 space-y-8">
              {timelineData.map((item, idx) => {
                let Icon = Briefcase;
                if (item.type === 'edu') Icon = GraduationCap;
                if (item.type === 'hack') Icon = Award;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="relative timeline-item"
                  >
                    {/* Circle icon - centered exactly on the line at left: -14px relative to pl-8 */}
                    <div className="absolute -left-[45px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#030712] text-primary shadow-lg">
                      <Icon className="w-3.5 h-3.5" />
                    </div>

                    {/* Content */}
                    <div>
                      <span className="text-[9px] font-mono text-primary uppercase tracking-wider">{item.period}</span>
                      <h4 className="text-xs font-bold text-white font-display mt-0.5">{item.title}</h4>
                      <p className="text-[11px] text-text-secondary font-mono">
                        {item.link ? (
                          <a 
                            href={item.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-primary transition-colors hover:underline inline-flex items-center gap-0.5 text-text-secondary"
                          >
                            <span>{item.company}</span>
                            <span className="text-[9px] text-primary">↗</span>
                          </a>
                        ) : (
                          <span>{item.company}</span>
                        )} · {item.location}
                      </p>
                      
                      <ul className="mt-2 space-y-1 list-none">
                        {item.description.map((desc, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-1.5 text-xs text-text-tertiary leading-relaxed">
                            <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Accomplishments section */}
        <div className="border-t border-white/5 mt-16 pt-12">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-6 h-6 text-primary animate-pulse" />
            <h2 className="text-2xl font-bold tracking-tight font-display text-white">
              Key Achievements
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">Winner</span>
                <span className="text-[11px] text-text-tertiary font-mono">JECRC University</span>
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">Bid2Code Hackathon</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Partnered with Lakshay Mahajan, Sharjil Sharma, and Sthal Pathak to design and engineer **Eventure** (our verified events sponsorship platform) under intense 24-hour hackathon conditions. Secured 1st place among dozens of competing university teams.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-secondary/5 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase">Participant</span>
                <span className="text-[11px] text-text-tertiary font-mono">SIH 2025</span>
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">Smart India Hackathon</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Collaborated under Team VISIONEERS representing Inderprastha Engineering College to build **Mark My Face**, an automated computer-vision attendance logging system designed to eliminate manual tracking overhead in schools and universities.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">2nd Place</span>
                <span className="text-[11px] text-text-tertiary font-mono">AIIMS Delhi</span>
              </div>
              <h3 className="text-base font-bold text-white font-display mb-2">AIIMS Pulse Nukkad Natak</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Represented Inaayat Dramatic Society at Pulse, the largest socio-cultural college festival in South Asia. Secured 2nd position in Nukkad Natak (street play), demonstrating strong creative and management skills.
              </p>
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
