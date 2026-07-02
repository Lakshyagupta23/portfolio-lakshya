import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Code, Terminal, Cpu, Sparkles, ExternalLink, Bot, X, MessageSquare, ArrowUpRight, Shield, Activity } from 'lucide-react';
import AITwin from '../components/AITwin';

// Advanced WebGL Tactical Radar Grid Shader
function CyberGridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl;
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    } catch (e) {
      console.error("WebGL context creation failed:", e);
      return;
    }
    if (!gl) return;

    const vs = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fs = `
      precision highp float;
      varying vec2 v_texCoord;
      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
          vec2 uv = v_texCoord;
          vec2 centered = uv - 0.5;
          centered.x *= u_resolution.x / u_resolution.y;
          
          float dist = length(centered);
          
          // Concentric radar rings
          float ring = fract(dist * 6.0 - u_time * 0.15);
          float ringPattern = smoothstep(0.98, 1.0, ring) + smoothstep(0.0, 0.02, ring);
          
          // Rotating scanning beam
          float angle = atan(centered.y, centered.x);
          float sweep = fract((angle / 6.28318) + u_time * 0.05);
          float beamPattern = smoothstep(0.95, 1.0, sweep) * (1.0 - dist * 1.5);
          
          // Background digital noise grid
          vec2 grid = fract(uv * 24.0);
          float line = smoothstep(0.0, 0.03, grid.x) + smoothstep(0.0, 0.03, grid.y);
          float gridVal = (1.0 - line) * 0.06;
          
          vec3 bgColor = vec3(0.01, 0.02, 0.05); // Deeper base to let gradients pop
          vec3 color1 = vec3(0.0, 0.95, 1.0); // Neon Cyan
          vec3 color2 = vec3(0.45, 0.15, 1.0); // Electric Purple
          vec3 scanColor = mix(color1, color2, sweep); // Vibrant blending beam
          
          vec3 finalColor = bgColor;
          finalColor += scanColor * (ringPattern * 0.07 * (1.0 - dist * 2.0));
          finalColor += scanColor * (beamPattern * 0.32);
          finalColor += scanColor * gridVal;
          
          // Vignette
          float vignette = smoothstep(0.9, 0.2, length(uv - 0.5));
          finalColor *= vignette;
          
          gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const compileShader = (type, src) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const program = gl.createProgram();
    const vertexShader = compileShader(gl.VERTEX_SHADER, vs);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fs);
    if (!vertexShader || !fragmentShader) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1
    ]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');

    let animationFrameId;
    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    };

    const render = (time) => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(uTime, time * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full opacity-60 pointer-events-none" 
      style={{ display: 'block' }} 
    />
  );
}

// Interactive Command Terminal Component (Cloning Face Recognition project)
function CommandLineTerminal() {
  const [lines, setLines] = useState([]);
  const [inputCommand, setInputCommand] = useState('');
  
  const terminalScript = [
    { type: 'input', text: 'git clone https://github.com/Lakshyagupta23/mark-my-face.git' },
    { type: 'output', text: 'Cloning into \'mark-my-face\'...\nremote: Enumerating objects: 38, done.\nremote: Counting objects: 100% (38/38), done.\nUnpacking objects: 100% (38/38), done.' },
    { type: 'input', text: 'cd mark-my-face && python main.py' },
    { type: 'output', text: 'Initializing OpenCV Capture streams...\n[INFO] Loading facial database...\n[INFO] 12 facial embeddings registered successfully.\n[INFO] Camera Feed active at 30 FPS.' },
    { type: 'json', text: {
        status: "SUCCESS",
        markedUser: "Lakshya Gupta",
        action: "Attendance Logged",
        timestamp: new Date().toLocaleTimeString(),
        stats: {
          confidence: "98.7%",
          detector: "Dlib 68-Point Landmark Predictor",
          database: "SQLite Logs"
        }
      }
    }
  ];

  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let timer;

    const runScript = () => {
      if (currentIdx >= terminalScript.length) return;

      const currentStep = terminalScript[currentIdx];

      if (currentStep.type === 'input') {
        setLines(prev => {
          if (charIdx === 0) {
            return [...prev, { type: 'input', text: '' }];
          }
          const newLines = [...prev];
          newLines[newLines.length - 1] = {
            type: 'input',
            text: currentStep.text.substring(0, charIdx)
          };
          return newLines;
        });

        if (charIdx < currentStep.text.length) {
          charIdx++;
          timer = setTimeout(runScript, 30);
        } else {
          charIdx = 0;
          currentIdx++;
          timer = setTimeout(runScript, 500);
        }
      } else {
        setLines(prev => [...prev, currentStep]);
        currentIdx++;
        timer = setTimeout(runScript, 1000);
      }
    };

    timer = setTimeout(runScript, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleCustomCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputCommand.trim()) return;

    const cmd = inputCommand.toLowerCase().trim();
    let response = `Command not recognized: "${inputCommand}". Type "help" for a list of commands.`;

    if (cmd === 'help') {
      response = 'Available commands:\n  about     - Brief summary about Lakshya\n  skills    - List core programming and AI skills\n  clear     - Clear terminal logs\n  neofetch  - Display system specifications';
    } else if (cmd === 'about') {
      response = 'Lakshya Gupta - AI/ML Engineer focused on OpenCV systems, LLM fine-tuning pipelines, and community leadership. Currently B.Tech student @ IPEC Ghaziabad.';
    } else if (cmd === 'skills') {
      response = 'Languages: Python, Go, C, C++, SQL\nSpecialties: Generative AI, Computer Vision (OpenCV), LLM fine-tuning, Model optimizations.';
    } else if (cmd === 'neofetch') {
      response = 'OS: LakshyaOS v1.0.0\nKernel: React 19 + Vite v7\nUptime: Live\nShell: zsh (Lakshya)\nCPU: Inderprastha Eng College B.Tech\nGPU: KVGAI Tech Limited AI Intern';
    }

    setLines(prev => [
      ...prev,
      { type: 'input', text: inputCommand },
      ...(cmd === 'clear' ? [] : [{ type: 'output', text: response }])
    ]);
    
    if (cmd === 'clear') {
      setLines([]);
    }
    setInputCommand('');
  };

  return (
    <div className="w-full border border-primary/20 bg-[#070b14]/85 shadow-[0_0_25px_rgba(0,242,255,0.06)] overflow-hidden flex flex-col font-mono text-xs text-text-secondary h-[400px] clip-cyber hud-brackets">
      <div className="hud-brackets-bottom" />
      <div className="bg-[#0b101d] px-4 py-3 flex items-center justify-between border-b border-white/5 shrink-0 select-none">
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[10px] text-primary font-semibold uppercase tracking-widest animate-pulse">BIOMETRIC_DETECTOR.SYS</span>
        <div className="w-12" />
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 no-scrollbar leading-relaxed">
        <div className="text-text-tertiary"># Initializing AI Developer Console...</div>
        
        {lines.map((line, idx) => (
          <div key={idx} className="space-y-1">
            {line.type === 'input' && (
              <div className="flex items-start gap-1 text-primary">
                <span className="shrink-0 select-none">$</span>
                <span>{line.text}</span>
                {idx === lines.length - 1 && (
                  <span className="inline-block w-1.5 h-3 bg-primary animate-pulse ml-0.5" />
                )}
              </div>
            )}
            
            {line.type === 'output' && (
              <div className="text-text-secondary whitespace-pre-wrap pl-3 border-l border-white/5">
                {line.text}
              </div>
            )}

            {line.type === 'json' && (
              <pre className="text-emerald-400 pl-3 border-l border-white/5 overflow-x-auto text-[11px]">
                {JSON.stringify(line.text, null, 2)}
              </pre>
            )}
          </div>
        ))}

        <form onSubmit={handleCustomCommandSubmit} className="flex items-center gap-1 text-primary pt-2 border-t border-white/5">
          <span className="shrink-0 select-none">$</span>
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            placeholder="Type 'help' or commands..."
            className="flex-1 bg-transparent border-none outline-none text-text-secondary placeholder:text-text-tertiary"
          />
        </form>
      </div>
    </div>
  );
}

export default function Home() {
  const [showFloatingChat, setShowFloatingChat] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-transparent overflow-x-hidden pt-12 pb-20">
      {/* Visual Overlay Sweeps */}
      <div className="scanlines-overlay" />
      <div className="screen-sweep" />

      {/* WebGL concentric radar background */}
      <div className="absolute inset-0 z-0">
        <CyberGridBackground />
      </div>

      {/* HUD Border Lines */}
      <div className="cyber-line-v left-[10%] hidden md:block"></div>
      <div className="cyber-line-v left-[90%] hidden md:block"></div>
      <div className="cyber-line-h top-[25%] hidden md:block"></div>
      <div className="cyber-line-h top-[75%] hidden md:block"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pt-16">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-6 space-y-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono text-primary animate-pulse"
            >
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span>KVGAI Tech Limited · AI/ML Developer</span>
            </motion.div>

            <div className="space-y-3">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tighter leading-tight glitch-text cursor-default"
                data-text="LAKSHYA GUPTA"
              >
                LAKSHYA GUPTA
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm font-mono text-primary/80 uppercase tracking-widest"
              >
                AI & Machine Learning Scholar · Developer
              </motion.p>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-lg"
            >
              I am an AI/ML developer specializing in OpenCV computer vision models, fine-tuning large language models, and core system architectures. Currently serving as the Social Media Lead of HackSphere and Event Head of THINK AI.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <Link
                to="/projects"
                className="rounded-lg bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-xs font-semibold text-black hover:brightness-110 active:scale-98 transition-all shadow-[0_0_20px_rgba(0,242,255,0.2)] cursor-pointer flex items-center gap-1.5 clip-cyber-btn"
              >
                <span>Explore Projects</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              
              <button
                onClick={() => setShowFloatingChat(true)}
                className="rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 px-5 py-2.5 text-xs font-semibold text-primary hover:text-white active:scale-98 transition-all cursor-pointer flex items-center gap-2 clip-cyber-btn"
              >
                <Bot className="w-4 h-4 text-primary animate-bounce" />
                <span>Interact AI Twin</span>
              </button>
            </motion.div>

            {/* Social Connect */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-5 border-t border-white/5 pt-6"
            >
              <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">Connect:</span>
              
              <a
                href="https://github.com/Lakshyagupta23"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white hover:scale-110 transition-all"
                title="GitHub"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a
                href="https://linkedin.com/in/lakshya-gupta-822770301"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-white hover:scale-110 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a
                href="mailto:lakshyagupta23.lg@gmail.com"
                className="text-text-secondary hover:text-white hover:scale-110 transition-all"
                title="Email"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-6 w-full">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CommandLineTerminal />
            </motion.div>
          </div>

        </div>

        {/* PROJECTS SECTION */}
        <section className="space-y-8 pt-12 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Featured Systems</span>
              </h2>
              <p className="text-[11px] font-mono text-text-tertiary">PROTOTYPES_DEVELOPED.SYS</p>
            </div>
            <Link to="/projects" className="text-xs text-primary hover:underline flex items-center gap-1 font-mono">
              <span>View All</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Mark My Face */}
            <div className="glass-panel group p-1.5 rounded-xl transition-all duration-300 hover:scale-[1.01] hover:border-primary/20 hover:shadow-[0_0_30px_rgba(0,242,255,0.12)] clip-cyber hud-brackets">
              <div className="hud-brackets-bottom" />
              <div className="relative overflow-hidden rounded-lg bg-surface-container/20">
                <div className="aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover opacity-40 group-hover:scale-[1.03] transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIRsAnCJSzz5KnP2CVDZqKiQOts6SeWkV4qZlbPLM3V8oq0JDV6t2s0trVNxVLZWH1kM_LnNtHgd2Z0qi0Ll7VYvFc5jV_5bdjbLRkezNJgemRhD_dCkqhPF47wYR7SQfoB0yMi7F3Luia4sba5bHF-nv270yDUsHX0phLwSsbkuc6mnaASQXFCURgMbTi48aT8DLNVJtf0PBPCgJHMWaISsskm_CaJEYxVw5YWCGcygY55Q8QARFS68uOUtGTGWuAaUvbIao4tgE"
                    alt="Mark My Face Dashboard"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"></div>
                  
                  {/* Radar/Scanning target lines overlay */}
                  <div className="absolute inset-0 border border-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center justify-center">
                    <div className="w-16 h-16 border border-dashed border-primary/40 rounded-full animate-spin" />
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-primary/10 border border-primary/20 text-[9px] font-mono text-primary rounded">SIH 2025</span>
                    <span className="px-2 py-1 bg-white/5 text-[9px] font-mono text-text-secondary rounded">OPENCV / DLIB</span>
                  </div>
                  <h3 className="text-lg font-semibold font-display text-white mb-1.5">Mark My Face</h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    Flagship Smart India Hackathon facial attendance logging application powered by OpenCV Dlib face landmarks.
                  </p>
                </div>
              </div>
            </div>

            {/* Eventure */}
            <div className="glass-panel group p-1.5 rounded-xl transition-all duration-300 hover:scale-[1.01] hover:border-primary/20 hover:shadow-[0_0_30px_rgba(0,242,255,0.12)] clip-cyber hud-brackets">
              <div className="hud-brackets-bottom" />
              <div className="relative overflow-hidden rounded-lg bg-surface-container/20">
                <div className="aspect-video w-full bg-slate-950 flex items-center justify-center overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover opacity-40 group-hover:scale-[1.03] transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGlYOcLbCVLWViZUFARM9Lg4L0HX6yvaTnFCdjjLhciRN1IyMUlaDWYjp_VSB01twfcrf4HRE1x_alkeEYf0OCnKoXAD5taHDYL-d21ADDMSD8g3c2oKQ2RCDK64oU4IimPH0BpUka0E4YQzFr1aEHzLLqj4QTmvb51NCWmRXYclLQq6PHTNGCU_dZXiwJYyeBHnb8kTQZA0SCX_nACYXV_Ruk8oaVy83hPkSK36wtBXSlntJGpBmvgtavh_JKHzyMPe18zelmu00"
                    alt="Eventure Network Map"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"></div>
                  
                  {/* Sweep line on hover */}
                  <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:animate-marquee pointer-events-none" />
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-1 bg-secondary/10 border border-secondary/20 text-[9px] font-mono text-secondary rounded">BID2CODE WIN</span>
                    <span className="px-2 py-1 bg-white/5 text-[9px] font-mono text-text-secondary rounded">NODE.JS / SECURE</span>
                  </div>
                  <h3 className="text-lg font-semibold font-display text-white mb-1.5">Eventure</h3>
                  <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                    Sponsorship matching platform featuring automated credential mapping and secure corporate dashboard.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>

      {/* FLOATING CHAT BUTTON & MODAL WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {showFloatingChat && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="w-[360px] sm:w-[420px] h-[520px] rounded-xl border border-primary/20 bg-[#070b14]/95 shadow-2xl overflow-hidden mb-4 flex flex-col clip-cyber hud-brackets"
            >
              <div className="hud-brackets-bottom" />
              <div className="bg-[#0b101d] px-4 py-3 flex items-center justify-between border-b border-white/5 shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <Bot className="w-4.5 h-4.5 text-primary animate-pulse" />
                  <span className="text-xs font-semibold text-primary font-display tracking-widest uppercase">AI TWIN INTERACTION [BETA]</span>
                </div>
                <button 
                  onClick={() => setShowFloatingChat(false)}
                  className="text-text-secondary hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden relative">
                <AITwin />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setShowFloatingChat(!showFloatingChat)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-black shadow-lg hover:shadow-[0_0_20px_rgba(0,242,255,0.4)] transition-all cursor-pointer relative"
        >
          {showFloatingChat ? <X className="w-5.5 h-5.5" /> : <MessageSquare className="w-5.5 h-5.5" />}
          
          {/* Pulsing indicator ring */}
          <span className="absolute inset-0 rounded-full border border-primary animate-ping opacity-25" />
        </motion.button>
      </div>

    </div>
  );
}
