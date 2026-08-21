import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Copy, Check, RefreshCw, Settings, Eye, EyeOff, X, Wifi, WifiOff } from "lucide-react";

// ── SYSTEM INSTRUCTION ─────────────────────────────────────────────────────────
const SYSTEM_INSTRUCTION = `You are the AI Twin of Lakshya Gupta. Answer questions concisely (1-3 short paragraphs) in a helpful, professional and friendly developer persona.
If asked about topics outside your technology profile, answer briefly and then bridge the conversation back to your projects or studies.

Profile:
- Name: Lakshya Gupta
- Role: B.Tech student specialising in AI/ML at Inderprastha Engineering College, Ghaziabad (Expected May 2027)
- Internship: AI Developer Intern at KVGAI Tech Limited (Jan-Apr 2026) — fine-tuned Anthropic LLMs (Claude/Opus), optimised prompt caching
- Leadership: Event Head at THINK AI community; Social Media Lead at HackSphere
- Projects:
  1. SentinelFlow — Real-time DDoS detection & mitigation. scikit-learn Isolation Forest + FastAPI + React. Live at https://sentinelflow-web-server.onrender.com/
  2. RogueDex — Pokémon randomizer & team builder. Next.js + TypeScript. Live at https://rogue-dex.vercel.app/
  3. Mark My Face — OpenCV + Dlib real-time face recognition attendance (SIH 2025)
  4. Eventure — Verified sponsorship broker, won 1st at JECRC Bid2Code Hackathon
- Skills: Python, C, C++, SQL, ML, GenAI, Computer Vision, React, Next.js, FastAPI, Node.js
- Contact: lakshyagupta23.lg@gmail.com | +91 9250923902 | Delhi, India
- Hobbies: Nukkad Natak street plays in Inaayat Dramatics Society`;

// ── LOCAL FALLBACK DATABASE ────────────────────────────────────────────────────
const LAKSHYA_DB = {
  responses: {
    self: "I am Lakshya Gupta, a B.Tech AI/ML student at Inderprastha Engineering College (expected May 2027). I specialise in computer vision, LLM pipeline optimisation, and full-stack development. I have interned as an AI Developer at KVGAI Tech and lead events at THINK AI and HackSphere.",
    intern: "At KVGAI Tech Limited (Jan-Apr 2026) I fine-tuned and debugged Anthropic LLMs (Claude/Opus), engineered prompt caching strategies, and optimised inference pipelines to reduce token latency and operational costs.",
    thinkai: "As Event Head at THINK AI, I manage technical events, campus seminars, and coding challenges for our AI student community at IPEC.",
    hacksphere: "As Social Media Lead for HackSphere, I direct developer branding, design outreach campaigns, and coordinate peer developer sprints and tech bootcamps.",
    sentinelflow: "SentinelFlow is a real-time DDoS Detection & Mitigation Platform (live at https://sentinelflow-web-server.onrender.com/). It uses scikit-learn Isolation Forest on a FastAPI service to detect anomalies, with a React 19 dashboard for live traffic telemetry, alert rule builders, and automated mitigation playbooks.",
    roguedex: "RogueDex is a Pokémon randomizer and team builder (live at https://rogue-dex.vercel.app/). Built with Next.js, TypeScript, and Framer Motion, it features advanced filters across all 9 generations, a team builder with challenge rules, and holographic card design.",
    markface: "Mark My Face is a Python + OpenCV + Dlib real-time face recognition attendance system I built for SIH 2025 with Team VISIONEERS. It matches 128D facial embeddings in SQLite in under 200ms per frame.",
    eventure: "Eventure is a verified college sponsorship marketplace built on Node.js, Express, and SQL. We won 1st place at the JECRC Bid2Code Hackathon (Sep 2025) by solving false sponsorship agreements with a dual-key verification system.",
    hackathons: "I won 1st place at the JECRC Bid2Code Hackathon (Eventure), participated in SIH 2025 (Mark My Face), and reached Top 5 at the Meerut Hackstreet Hackathon.",
    hire: "I combine practical AI/ML skills (LLM fine-tuning, OpenCV, FastAPI) with full-stack development. I have a track record of shipping working products under tight hackathon deadlines and strong communication from leading student tech communities.",
    contact: "Email: lakshyagupta23.lg@gmail.com | Phone: +91 9250923902 | Location: Delhi, India | LinkedIn: linkedin.com/in/lakshya-gupta-822770301 | GitHub: github.com/Lakshyagupta23",
    skills: "Languages: Python, C, C++, SQL. AI/ML: Machine Learning, Generative AI, Model Fine-Tuning, Prompt Engineering, Computer Vision (OpenCV, Dlib). Web: React, Next.js, Node.js, Express, FastAPI, TypeScript. Databases: MySQL, SQLite, TiDB.",
    education: "B.Tech in AI and ML at Inderprastha Engineering College, Ghaziabad (Expected May 2027). Class XII (Science) at Greenfields Public School, New Delhi (2023).",
  },
  keywords: [
    { match: ["yourself", "about you", "who are you", "introduce"], key: "self" },
    { match: ["intern", "kvgai", "kvg", "anthropic", "claude"], key: "intern" },
    { match: ["think ai", "thinkai", "ipec"], key: "thinkai" },
    { match: ["hacksphere", "hack sphere"], key: "hacksphere" },
    { match: ["sentinelflow", "sentinel", "ddos", "security platform"], key: "sentinelflow" },
    { match: ["roguedex", "rogue dex", "pokemon", "pokedex"], key: "roguedex" },
    { match: ["mark my face", "face recognition", "attendance", "sih"], key: "markface" },
    { match: ["eventure", "sponsorship", "bid2code", "jecrc"], key: "eventure" },
    { match: ["hackathon", "won", "prize", "bid2code", "meerut", "hackstreet"], key: "hackathons" },
    { match: ["hire", "why should", "recruit", "job", "opportunity"], key: "hire" },
    { match: ["contact", "email", "phone", "linkedin", "github", "reach", "delhi"], key: "contact" },
    { match: ["skill", "language", "python", "c++", "sql", "ml", "machine learning", "tech"], key: "skills" },
    { match: ["education", "college", "school", "b.tech", "degree", "greenfields"], key: "education" },
  ],
  fallback: "I am not sure about that specific topic. Ask me about my B.Tech studies, AI internship at KVGAI Tech, projects (SentinelFlow, RogueDex, Mark My Face, Eventure), hackathon wins, or contact info!",
};

function getLocalResponse(input) {
  const q = input.toLowerCase().trim();
  for (const entry of LAKSHYA_DB.keywords) {
    if (entry.match.some((kw) => q.includes(kw))) {
      return LAKSHYA_DB.responses[entry.key];
    }
  }
  return LAKSHYA_DB.fallback;
}

// ── GEMINI API CALL ───────────────────────────────────────────────────────────
async function callGemini(apiKey, history, userMessage) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const contents = [
    ...history.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
    contents,
    generationConfig: {
      temperature: 0.75,
      topP: 0.95,
      maxOutputTokens: 512,
    },
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response.";
}

// ── SUGGESTED QUESTIONS ────────────────────────────────────────────────────────
const SUGGESTED = [
  { id: "self", text: "Tell me about yourself" },
  { id: "intern", text: "Your AI/ML internship?" },
  { id: "sentinel", text: "What is SentinelFlow?" },
  { id: "roguedex", text: "What is RogueDex?" },
  { id: "hackathons", text: "Hackathon wins?" },
  { id: "hire", text: "Why should we hire you?" },
];

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────────
export default function AITwin({ compact = false }) {
  const apiKeyFromEnv = import.meta.env.VITE_GEMINI_API_KEY ?? "";

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Hi! I am Lakshya's AI Twin, powered by Gemini. Ask me anything about his projects, internship, skills, or experience.",
      ts: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [customKey, setCustomKey] = useState(() => localStorage.getItem("lg_ai_key") ?? "");
  const [showKey, setShowKey] = useState(false);
  const [isLive, setIsLive] = useState(true); // optimistic: assume live
  const [chatHistory, setChatHistory] = useState([]); // [{role,text}] for Gemini context
  const bottomRef = useRef(null);

  const activeKey = customKey.trim() || apiKeyFromEnv.trim();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const addMsg = (msg) => setMessages((prev) => [...prev, { id: Date.now() + Math.random(), ts: Date.now(), ...msg }]);

  const saveKey = () => {
    localStorage.setItem("lg_ai_key", customKey.trim());
    setShowSettings(false);
  };

  const handleSend = async (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    setInput("");

    addMsg({ role: "user", text: q });
    setLoading(true);

    let aiText;
    let usedLive = false;

    if (activeKey) {
      try {
        aiText = await callGemini(activeKey, chatHistory, q);
        usedLive = true;
      } catch (err) {
        console.warn("Gemini API failed, falling back to local DB:", err.message);
        aiText = getLocalResponse(q);
      }
    } else {
      aiText = getLocalResponse(q);
    }

    setIsLive(usedLive);
    setChatHistory((prev) => [
      ...prev,
      { role: "user", text: q },
      { role: "assistant", text: aiText },
    ]);
    addMsg({ role: "assistant", text: aiText });
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const copyMsg = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1800);
  };

  const resetChat = () => {
    setMessages([{
      id: "welcome",
      role: "assistant",
      text: "Chat reset. Ask me anything about Lakshya's projects, skills, or experience!",
      ts: Date.now(),
    }]);
    setChatHistory([]);
    setIsLive(!!activeKey);
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#161412] border border-[rgba(240,236,227,0.07)] rounded-[3px] overflow-hidden">
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[rgba(240,236,227,0.06)] shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-[rgba(201,168,76,0.35)] text-[#c9a84c] text-[10px] font-bold" style={{ borderRadius: "2px", fontFamily: '"Sora", sans-serif' }}>
            AI
          </div>
          <div>
            <p className="text-xs font-semibold text-[rgba(240,236,227,0.9)]" style={{ fontFamily: '"Sora", sans-serif' }}>AI Twin</p>
            <p className="text-[10px] text-[rgba(240,236,227,0.35)]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>Lakshya Gupta</p>
          </div>
          {/* Live / Offline badge */}
          <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] text-[10px] font-medium ${isLive && activeKey ? "bg-emerald-900/30 border border-emerald-700/30 text-emerald-400" : "bg-[rgba(240,236,227,0.04)] border border-[rgba(240,236,227,0.08)] text-[rgba(240,236,227,0.35)]"}`} style={{ fontFamily: '"JetBrains Mono", monospace' }}>
            {isLive && activeKey ? <Wifi className="w-2.5 h-2.5" /> : <WifiOff className="w-2.5 h-2.5" />}
            {isLive && activeKey ? "Gemini Live" : "Offline DB"}
          </div>
        </div>
        <div className="flex items-center gap-2 relative z-50">
          <button type="button" onClick={resetChat} className="p-2 -mr-2 text-[rgba(240,236,227,0.3)] hover:text-[rgba(240,236,227,0.8)] transition-colors cursor-pointer" title="Reset chat">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button type="button" onClick={() => setShowSettings((p) => !p)} className="p-2 -mr-2 text-[rgba(240,236,227,0.3)] hover:text-[rgba(240,236,227,0.8)] transition-colors cursor-pointer" title="Settings">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── SETTINGS PANEL ─────────────────────────────────────── */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            key="settings"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b border-[rgba(240,236,227,0.06)] bg-[rgba(240,236,227,0.01)]"
          >
            <div className="p-4 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.3)]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                Override Gemini API Key
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type={showKey ? "text" : "password"}
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full rounded-[2px] border border-[rgba(240,236,227,0.07)] bg-[rgba(240,236,227,0.02)] px-3 py-2 text-xs text-[#f0ece3] placeholder:text-[rgba(240,236,227,0.2)] focus:outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors pr-9"
                    style={{ fontFamily: '"JetBrains Mono", monospace' }}
                  />
                  <button onClick={() => setShowKey((p) => !p)} className="absolute right-2 top-1/2 -translate-y-1/2 text-[rgba(240,236,227,0.3)] hover:text-[rgba(240,236,227,0.7)] transition-colors cursor-pointer">
                    {showKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <button onClick={saveKey} className="px-3 py-2 text-xs btn-gold" style={{ width: "auto" }}>Save</button>
              </div>
              <p className="text-[10px] text-[rgba(240,236,227,0.2)]" style={{ fontFamily: '"Outfit", sans-serif' }}>
                Stored in browser localStorage only. Leave blank to use the built-in key.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MESSAGES ───────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="flex h-6 w-6 shrink-0 mt-1 items-center justify-center border border-[rgba(201,168,76,0.25)] text-[rgba(201,168,76,0.7)] text-[8px] font-bold rounded-[1px]" style={{ fontFamily: '"Sora", sans-serif' }}>AI</div>
            )}

            <div className={`relative group max-w-[78%] ${msg.role === "user" ? "bubble-user" : "bubble-ai"}`}>
              <div
                className={`px-4 py-3 text-xs leading-relaxed rounded-[3px] whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-[rgba(201,168,76,0.08)] border border-[rgba(201,168,76,0.18)] text-[rgba(240,236,227,0.85)]"
                    : "bg-[rgba(240,236,227,0.03)] border border-[rgba(240,236,227,0.06)] text-[rgba(240,236,227,0.75)]"
                }`}
                style={{ fontFamily: '"Outfit", sans-serif' }}
              >
                {msg.text}
              </div>
              {msg.role === "assistant" && (
                <button
                  onClick={() => copyMsg(msg.id, msg.text)}
                  className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 text-[rgba(240,236,227,0.25)] hover:text-[rgba(240,236,227,0.7)] transition-all cursor-pointer"
                >
                  {copied === msg.id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-2 justify-start">
            <div className="flex h-6 w-6 shrink-0 mt-1 items-center justify-center border border-[rgba(201,168,76,0.25)] text-[rgba(201,168,76,0.7)] text-[8px] font-bold rounded-[1px]" style={{ fontFamily: '"Sora", sans-serif' }}>AI</div>
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[rgba(240,236,227,0.03)] border border-[rgba(240,236,227,0.06)] rounded-[3px]">
              <span className="animate-pulse-dot-1 w-1.5 h-1.5 rounded-full bg-[rgba(201,168,76,0.5)]" />
              <span className="animate-pulse-dot-2 w-1.5 h-1.5 rounded-full bg-[rgba(201,168,76,0.5)]" />
              <span className="animate-pulse-dot-3 w-1.5 h-1.5 rounded-full bg-[rgba(201,168,76,0.5)]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── SUGGESTIONS ────────────────────────────────────────── */}
      {messages.length <= 2 && (
        <div className="px-4 pb-3 flex gap-2 flex-wrap">
          {SUGGESTED.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSend(s.text)}
              className="text-[10px] px-2.5 py-1.5 rounded-[2px] border border-[rgba(240,236,227,0.07)] bg-[rgba(240,236,227,0.02)] text-[rgba(240,236,227,0.4)] hover:border-[rgba(201,168,76,0.25)] hover:text-[rgba(201,168,76,0.8)] transition-colors cursor-pointer"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              {s.text}
            </button>
          ))}
        </div>
      )}

      {/* ── INPUT ──────────────────────────────────────────────── */}
      <div className="border-t border-[rgba(240,236,227,0.06)] px-4 py-3 shrink-0">
        <div className="flex items-end gap-2 rounded-[2px] border border-[rgba(240,236,227,0.07)] bg-[rgba(240,236,227,0.02)] px-3 py-2">
          <textarea
            id="ai-twin-input"
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 resize-none bg-transparent text-xs text-[rgba(240,236,227,0.85)] placeholder:text-[rgba(240,236,227,0.2)] focus:outline-none leading-relaxed max-h-28 overflow-y-auto no-scrollbar"
            style={{ fontFamily: '"Outfit", sans-serif' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] bg-[#c9a84c] text-[#0e0c0a] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e8d5a3] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
