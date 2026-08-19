import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Copy, Check, Sparkles, Bot, RefreshCw, Settings, Eye, EyeOff } from 'lucide-react';

const SYSTEM_INSTRUCTION = `You are the AI Twin of Lakshya Gupta. 
Answer questions concisely (1-2 paragraphs) in a helpful, professional developer persona.
If asked about topics outside of your technology profile, answer in a single sentence and then gracefully bridge the conversation back to your projects or B.Tech engineering studies.

Here is your profile context:
- Name: Lakshya Gupta
- Current Role: B.Tech student specializing in AI/ML at Inderprastha Engineering College, Ghaziabad (Expected May 2027).
- Leadership Positions: Event Head at THINK AI student community, Social Media Lead at HackSphere.
- Internships: AI Developer Intern at KVGAI Tech Limited (Jan 2026 - Apr 2026) where you fine-tuned and debugged Anthropic-based LLMs (Claude/Opus) and optimized prompt caching.
- Main Projects:
  1. SentinelFlow: Real-time DDoS detection and mitigation platform utilizing scikit-learn's Isolation Forest model and live network telemetry (Live at: https://sentinelflow-web-server.onrender.com/).
  2. RogueDex: Pokémon randomizer and team builder web application featuring holographic design (Live at: https://rogue-dex.vercel.app/).
  3. Mark My Face: Real-time OpenCV & Dlib face recognition attendance system created for SIH 2025.
  4. Eventure: Verified sponsorship broker platform built with Node.js, Express, and SQL, winning 1st place at JECRC Bid2Code Hackathon.
- Personal Interests: Nukkad Natak street plays inside Inaayat dramatics society.
- Core Technical Skills: Python, C, C++, SQL, Machine Learning, Generative AI, Computer Vision (OpenCV), Data Structures & Algorithms.`;

const LAKSHYA_BOT_PROFILE = {
  name: "Lakshya Gupta",
  role: "AI/ML Engineer & Developer",
  bio: "Hi, I'm Lakshya's AI Twin. Ask me about my computer vision projects, LLM testing, hackathon wins, or anything else you'd like to know.",
  suggestedQuestions: [
    { id: "self", text: "Tell me about yourself" },
    { id: "intern", text: "Explain your AI/ML internship" },
    { id: "hacksphere", text: "What is HackSphere & your role?" },
    { id: "thinkai", text: "Tell me about THINK AI IPEC" },
    { id: "sentinel", text: "What is 'SentinelFlow'?" },
    { id: "roguedex", text: "What is 'RogueDex'?" },
    { id: "hackathons", text: "What hackathons have you won?" }
  ],
  responses: {
    self: `I am Lakshya Gupta, a B.Tech student specializing in Artificial Intelligence and Machine Learning at Inderprastha Engineering College (Ghaziabad). My technical expertise focuses on computer vision engineering, LLM pipeline optimization, and full-stack development. Professionally, I have worked as an AI Developer Intern at KVGAI Tech, and I lead developer events as Event Head at THINK AI and Social Media Lead at HackSphere.`,

    intern: `During my internship at KVGAI Tech Limited (Jan 2026 - Apr 2026), I focused on fine-tuning and debugging Anthropic-based LLMs (such as Claude and Opus). I also engineered pipeline optimizations—including prompt caching strategies and model inference adjustments—which successfully reduced token latency and operational costs.`,

    thinkai: `As Event Head (and former Documentation Head) at THINK AI, I manage technical event logistics, plan campus seminars, and coordinate coding challenges. This leadership role has honed my project management and multi-team coordination capabilities.`,

    hacksphere: `As the Social Media Lead for HackSphere, I direct developer branding, design outreach campaigns, and coordinate peer developer sprints and tech bootcamps to support our campus developer ecosystem.`,

    inaayat: `Inaayat is my creative outlet and dramatics society where I participate in street plays (Nukkad Natak). While it is a side hobby, it has been instrumental in building my public speaking, stage presence, and confidence in managing team collaboration.`,

    sentinelflow: `**SentinelFlow** is a premium, real-time DDoS Detection and Mitigation Platform (Live at: https://sentinelflow-web-server.onrender.com/).
*   *Key Features*: Real-time traffic telemetry charts, custom alert rule builders, and automated mitigation playbooks (blocking IPs, throttling traffic).
*   *Technical Details*: Integrates scikit-learn's Isolation Forest anomaly classification model on a FastAPI service to detect volumetric/application layer anomalies. Built on a React 19 + Tailwind CSS client, with an Express/tRPC backend connecting to MySQL/TiDB database pools via Drizzle ORM.`,

    roguedex: `**RogueDex** is a high-fidelity Pokémon database, randomizer, and team builder web application (Live at: https://rogue-dex.vercel.app/).
*   *Key Features*: Core randomizer with animations, advanced filtering (Gens 1-9, types, legendary/mythical status), and team builder challenge rules.
*   *Technical Details*: Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion, fetching live assets and statistics dynamically from the PokeAPI.`,

    face: `**Mark My Face** is a real-time face recognition attendance tracker built in Python using OpenCV and Dlib. 
*   *Technical Decisions*: We engineered this under Team VISIONEERS for the Smart India Hackathon (SIH) 2025. We chose Dlib's 68-point landmark predictor and deep-metric ResNet face recognition model over MediaPipe because it provided superior classification consistency in complex classroom lighting and angles. Facial embeddings (128D) are matched in SQLite in <200ms, saving lecture hours for teachers.`,

    eventure: `**Eventure** is a verified college events sponsorship platform connecting student hosts with corporate sponsors. 
*   *Technical Decisions*: We built this using Node.js, Express, and SQL, winning 1st place at the JECRC Bid2Code Hackathon (developed with Lakshay Mahajan, Sharjil Sharma, Sthal Pathak). We solved the issue of false sponsorship agreements by implementing a dual-key verified profile dashboard, letting corporate sponsors and event hosts sign off on verified contract agreements.`,

    hackathons: `I've won 1st place at the JECRC **Bid2Code Hackathon** (building Eventure), competed as an **SIH 2025** participant (building Mark My Face), and reached the Top 5 at the Meerut **Hackstreet Hackathon** (building an AI-assisted DDoS Security Machine).`,

    hire: `You should hire me because I combine practical AI/ML capabilities (like LLM fine-tuning and OpenCV) with full-stack development. I have a proven track record of building working solutions under tight deadlines in hackathons, and I bring strong communication and leadership skills from managing student tech communities.`,

    weaknesses: `That's a good question. I'd say one area I'm actively working on is my tendency to sometimes overcommit or take on too many responsibilities at once (balancing B.Tech studies, Event Head at THINK AI, and Social Media Lead at HackSphere). I am addressing this by using calendar prioritization, ruthlessly evaluating workloads, and learning to delegate tasks effectively to maintain high-quality results.`,

    cisco: `I completed a 1-month Cybersecurity Virtual Internship program with Cisco. The training focused on threat modeling, packet inspection protocols, and configuring security measures for virtual networks.`
  },
  
  fallbackKeywords: [
    {
      keywords: ["skills", "languages", "python", "c++", "c", "sql", "ml", "machine learning", "dsa"],
      response: `My core technical skill set includes:
*   **Programming**: Python, C, C++, SQL.
*   **AI/ML & Data Science**: Machine Learning, Generative AI, Model Training/Fine-Tuning, Model & Performance Evaluation, Prompt Refinement, Computer Vision (OpenCV), Data Analysis.
*   **Core CS**: Data Structures & Algorithms, Object-Oriented Programming, Database Management.`
    },
    {
      keywords: ["education", "college", "school", "ipec", "greenfields"],
      response: `Here is my educational background:
*   **B.Tech in AI and Machine Learning** at Inderprastha Engineering College, Ghaziabad (Expected May 2027). Current focus on predictive modeling and data science.
*   **Class XII (Science)** at Greenfields Public School, New Delhi (Completed December 2023).`
    },
    {
      keywords: ["cisco", "cybersecurity", "cyber security", "virtual internship"],
      response: `I completed a 1-month Cybersecurity Virtual Internship program with Cisco. The training focused on threat modeling, packet inspection protocols, and configuring security measures for virtual networks.`
    },
    {
      keywords: ["contact", "email", "phone", "linkedin", "github", "address", "delhi"],
      response: `You can reach out to me via:
*   **Email**: lakshyagupta23.lg@gmail.com
*   **Phone**: +91 9250923902
*   **Location**: Delhi, India
*   **LinkedIn**: linkedin.com/in/lakshya-gupta-822770301
*   **GitHub**: github.com/Lakshyagupta23`
    }
  ],
  defaultResponse: "I'm not sure about that specific topic. You can ask me about my B.Tech studies, my AI internship at KVGAI Tech, my projects ('SentinelFlow', 'RogueDex', 'Mark My Face', and 'Eventure'), my hackathon achievements, or check my contact info!"
};

function getLakshyaAIResponse(input) {
  if (!input || typeof input !== 'string') {
    return LAKSHYA_BOT_PROFILE.defaultResponse;
  }
  const query = input.toLowerCase().trim();
  
  if (query.includes("about yourself") || query.includes("who are you") || query.includes("tell me about yourself")) {
    return LAKSHYA_BOT_PROFILE.responses.self;
  }
  if (query.includes("cisco") || query.includes("cybersecurity") || query.includes("cyber security")) {
    return LAKSHYA_BOT_PROFILE.responses.cisco;
  }
  if (query.includes("internship") || query.includes("intern") || query.includes("kvgai")) {
    return LAKSHYA_BOT_PROFILE.responses.intern;
  }
  if (query.includes("think ai") || query.includes("thinkai") || query.includes("club")) {
    return LAKSHYA_BOT_PROFILE.responses.thinkai;
  }
  if (query.includes("hacksphere") || query.includes("hack sphere") || query.includes("society")) {
    return LAKSHYA_BOT_PROFILE.responses.hacksphere;
  }
  if (query.includes("inaayat") || query.includes("dramatics") || query.includes("play") || query.includes("theater")) {
    return LAKSHYA_BOT_PROFILE.responses.inaayat;
  }
  if (query.includes("sentinelflow") || query.includes("sentinel") || query.includes("ddos")) {
    return LAKSHYA_BOT_PROFILE.responses.sentinelflow;
  }
  if (query.includes("roguedex") || query.includes("rogue") || query.includes("pokemon") || query.includes("pokédex") || query.includes("pokedex")) {
    return LAKSHYA_BOT_PROFILE.responses.roguedex;
  }
  if (query.includes("face") || query.includes("mark my face") || query.includes("recognition")) {
    return LAKSHYA_BOT_PROFILE.responses.face;
  }
  if (query.includes("eventure") || query.includes("sponsor") || query.includes("sponsorship")) {
    return LAKSHYA_BOT_PROFILE.responses.eventure;
  }
  if (query.includes("hackathon") || query.includes("winner") || query.includes("sih") || query.includes("visioneers") || query.includes("bid2code") || query.includes("hackstreet")) {
    return LAKSHYA_BOT_PROFILE.responses.hackathons;
  }
  if (query.includes("hire") || query.includes("why hire") || query.includes("why should we hire")) {
    return LAKSHYA_BOT_PROFILE.responses.hire;
  }
  if (query.includes("weakness") || query.includes("weaknesses") || query.includes("negative point") || query.includes("negative points")) {
    return LAKSHYA_BOT_PROFILE.responses.weaknesses;
  }

  for (const group of LAKSHYA_BOT_PROFILE.fallbackKeywords) {
    if (group.keywords.some(kw => {
      if (kw.length <= 2) {
        const escaped = kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const regex = new RegExp(`\\b${escaped}\\b`, 'i');
        return regex.test(query);
      }
      return query.includes(kw);
    })) {
      return group.response;
    }
  }

  return LAKSHYA_BOT_PROFILE.defaultResponse;
}

function renderMarkdown(text) {
  if (!text) return "";
  
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    let content = line;
    
    // Bold replacement
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Check if it's a bullet point
    if (content.trim().startsWith('* ')) {
      const indent = content.indexOf('*');
      const cleanContent = content.replace(/^\s*\*\s+/, '');
      return (
        <div key={idx} className="flex items-start gap-1.5 my-1" style={{ paddingLeft: `${indent * 4}px` }}>
          <span className="text-primary shrink-0 select-none">•</span>
          <span dangerouslySetInnerHTML={{ __html: cleanContent }} className="text-text-secondary" />
        </div>
      );
    }
    
    // Check if it's a numbered list item
    const matchNumbered = content.trim().match(/^(\d+)\.\s+(.*)$/);
    if (matchNumbered) {
      const num = matchNumbered[1];
      const cleanContent = matchNumbered[2].replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <div key={idx} className="flex items-start gap-1.5 my-1">
          <span className="text-primary shrink-0 font-semibold select-none font-mono">{num}.</span>
          <span dangerouslySetInnerHTML={{ __html: cleanContent }} className="text-text-secondary" />
        </div>
      );
    }
    
    return (
      <div key={idx} className="min-h-[1em]" dangerouslySetInnerHTML={{ __html: content }} />
    );
  });
}

export default function AITwin() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('lakshya_ai_key') || '');
  const [apiProvider, setApiProvider] = useState(localStorage.getItem('lakshya_ai_provider') || 'gemini');
  const [apiEnabled, setApiEnabled] = useState(localStorage.getItem('lakshya_ai_enabled') === 'true');
  const [showApiKey, setShowApiKey] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [inputValue]);

  const saveSettings = () => {
    localStorage.setItem('lakshya_ai_key', apiKey);
    localStorage.setItem('lakshya_ai_provider', apiProvider);
    localStorage.setItem('lakshya_ai_enabled', apiEnabled ? 'true' : 'false');
    setShowSettings(false);
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    let aiText = "";

    // Live LLM query route
    if (apiEnabled && apiKey.trim()) {
      try {
        if (apiProvider === 'gemini') {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [
                  {
                    role: 'user',
                    parts: [
                      {
                        text: `${SYSTEM_INSTRUCTION}\n\nUser Question: ${text.trim()}`
                      }
                    ]
                  }
                ]
              })
            }
          );
          const data = await response.json();
          if (data.candidates && data.candidates[0].content.parts[0].text) {
            aiText = data.candidates[0].content.parts[0].text;
          } else {
            throw new Error(data.error?.message || "Invalid API response from Gemini");
          }
        } else {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              messages: [
                { role: 'system', content: SYSTEM_INSTRUCTION },
                { role: 'user', content: text.trim() }
              ],
              max_tokens: 250,
              temperature: 0.7
            })
          });
          const data = await response.json();
          if (data.choices && data.choices[0].message.content) {
            aiText = data.choices[0].message.content;
          } else {
            throw new Error(data.error?.message || "Invalid API response from OpenAI");
          }
        }
      } catch (err) {
        console.warn("Live API request failed, falling back to local database:", err);
        aiText = getLakshyaAIResponse(text);
      }
    } else {
      aiText = getLakshyaAIResponse(text);
    }

    const typingDuration = Math.max(600, Math.min(1500, text.length * 10));
    setTimeout(() => {
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, typingDuration);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#030712] rounded-2xl border border-white/5 shadow-2xl">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,242,255,0.06),transparent_50%)]"></div>

      {/* Chat Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 bg-[#070b14]/70 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/20">
            <Bot className="w-5 h-5 text-primary" />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#030712] bg-emerald-400"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-white tracking-wide font-display">Lakshya AI</span>
              <span className="text-[9px] px-1 py-0.5 rounded bg-primary/10 text-primary border border-primary/15 uppercase font-mono">Twin</span>
            </div>
            <p className="text-[10px] text-text-secondary font-mono">Status: Connected</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button 
            onClick={() => setShowSettings(true)}
            className="p-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-text-secondary hover:text-white hover:border-white/10 transition-all cursor-pointer focus:outline-none"
            title="AI Configuration"
          >
            <Settings className="w-4 h-4" />
          </button>
          
          {messages.length > 0 && (
            <button 
              onClick={() => setMessages([])}
              className="p-1.5 rounded-lg border border-white/5 bg-white/[0.02] text-text-secondary hover:text-white hover:border-white/10 transition-all cursor-pointer focus:outline-none"
              title="Reset Conversation"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 no-scrollbar">
        <div className="flex flex-col h-full justify-between">
          
          {messages.length === 0 ? (
            /* welcome view */
            <div className="flex flex-1 flex-col justify-center py-6 text-center animate-slide-up">
              <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-primary/15 bg-primary/5 text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight font-display mb-1.5">Chat with Lakshya's AI Twin</h3>
              <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed mb-6">
                Ask me about my AI Intern role at KVGAI Tech, computer vision projects, or hackathon experiences.
              </p>

              <div className="w-full max-w-lg mx-auto">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-left">
                  {LAKSHYA_BOT_PROFILE.suggestedQuestions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => handleSendMessage(q.text)}
                      className="group rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-3 transition-all duration-200 hover:border-primary/20 hover:bg-primary/[0.04] text-xs font-medium text-text-secondary hover:text-white cursor-pointer"
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* messages view */
            <div className="space-y-4 pb-6">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex w-full items-start gap-2.5 animate-slide-up ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-[9px] font-bold text-primary border border-primary/10 font-mono">
                      LG
                    </div>
                  )}

                  <div className={`flex flex-col max-w-[85%] sm:max-w-[75%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-primary/10 border border-primary/20 text-white bubble-user shadow-[0_0_12px_rgba(0,242,255,0.02)]' 
                          : 'bg-white/[0.02] border border-white/5 text-text-secondary bubble-ai'
                      }`}
                    >
                      <div className="font-sans space-y-1">
                        {renderMarkdown(msg.text)}
                      </div>
                    </div>

                    {msg.sender === 'ai' && (
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        className="mt-1 flex items-center gap-1 text-[10px] text-text-tertiary hover:text-white px-1.5 py-0.5 rounded transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-2.5 h-2.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex w-full items-start gap-2.5 justify-start animate-slide-up">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 text-[9px] font-bold text-primary border border-primary/10 font-mono">
                    LG
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 text-text-secondary rounded-xl bubble-ai px-4 py-3 flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-text-tertiary animate-pulse-dot-1"></span>
                    <span className="h-1 w-1 rounded-full bg-text-tertiary animate-pulse-dot-2"></span>
                    <span className="h-1 w-1 rounded-full bg-text-tertiary animate-pulse-dot-3"></span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Chat Footer Input */}
      <div className="relative z-10 border-t border-white/5 bg-[#070b14]/70 px-4 py-3.5 backdrop-blur-xl">
        <div className="flex items-end gap-2 rounded-xl border border-white/5 bg-white/[0.03] p-1.5 focus-within:border-primary/25">
          <textarea
            ref={textareaRef}
            rows="1"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Lakshya's twin anything..."
            disabled={isTyping}
            className="max-h-24 min-h-[2.25rem] flex-1 resize-none bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-white placeholder:text-text-tertiary focus:outline-none disabled:cursor-not-allowed leading-relaxed"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-black transition-transform hover:brightness-115 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            aria-label="Send query"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
        <div className="mt-2 flex items-center justify-between text-[9px] text-text-tertiary font-mono">
          <span>Enter to send · Shift+Enter for new line</span>
          <span>{apiEnabled && apiKey.trim() ? `Active Mode (${apiProvider === 'gemini' ? 'Gemini API' : 'OpenAI API'})` : 'Offline Database Mode'}</span>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl border border-white/10 bg-[#070b14] p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <h4 className="text-sm font-semibold text-white font-display">AI Twin Configuration</h4>
              <button onClick={() => setShowSettings(false)} className="text-text-secondary hover:text-white text-xs">Close</button>
            </div>
            
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs text-text-secondary font-mono">Enable Live LLM Mode</label>
                <input 
                  type="checkbox" 
                  checked={apiEnabled} 
                  onChange={(e) => setApiEnabled(e.target.checked)}
                  className="cursor-pointer"
                />
              </div>

              {apiEnabled && (
                <>
                  <div className="space-y-1">
                    <label className="text-[10px] text-text-tertiary font-mono uppercase tracking-wider">Select Provider</label>
                    <select 
                      value={apiProvider} 
                      onChange={(e) => setApiProvider(e.target.value)}
                      className="w-full rounded bg-white/[0.03] border border-white/10 text-white text-xs p-2 focus:outline-none"
                    >
                      <option value="gemini" className="bg-[#070b14]">Google Gemini (v1beta)</option>
                      <option value="openai" className="bg-[#070b14]">OpenAI ChatGPT (gpt-4o-mini)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-text-tertiary font-mono uppercase tracking-wider">API Key</label>
                    <div className="relative">
                      <input 
                        type={showApiKey ? "text" : "password"} 
                        value={apiKey} 
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder={apiProvider === 'gemini' ? "AIzaSy..." : "sk-..."}
                        className="w-full rounded bg-[#030712] border border-white/10 text-white text-xs p-2 pr-8 focus:outline-none font-mono"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-2 top-2.5 text-text-secondary hover:text-white"
                      >
                        {showApiKey ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-2.5 pt-2 border-t border-white/5">
              <button 
                onClick={saveSettings}
                className="flex-1 rounded bg-primary text-black text-xs font-semibold py-2 hover:brightness-110 cursor-pointer"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
