import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertTriangle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: "error", message: "Please fill in all required fields." });
      return;
    }
    setSubmitting(true);
    setStatus({ type: null, message: "" });
    setTimeout(() => {
      setSubmitting(false);
      setStatus({ type: "success", message: "Message sent! I will get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1600);
  };

  const inputCls = "w-full rounded-[2px] border border-[rgba(240,236,227,0.07)] bg-[rgba(240,236,227,0.02)] px-4 py-3 text-sm text-[#f0ece3] placeholder:text-[rgba(240,236,227,0.25)] focus:outline-none focus:border-[rgba(201,168,76,0.4)] transition-colors duration-200";

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <div className="relative min-h-screen w-full px-6 pt-28 pb-28 md:px-12 lg:px-20 flex items-center">
      <div className="mx-auto w-full max-w-5xl">

        {/* Page header */}
        <div className="relative mb-16">
          <span className="page-num" aria-hidden="true">03</span>
          <motion.div {...fadeUp(0)} className="space-y-3">
            <span className="label-tag">Get In Touch</span>
            <h1
              className="text-5xl sm:text-6xl font-extrabold tracking-tight text-[#f0ece3] leading-none"
              style={{ fontFamily: '"Sora", sans-serif' }}
            >
              Let's<br />Connect
            </h1>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16,1,0.3,1] }}
            className="mt-8 h-px bg-[rgba(201,168,76,0.2)] origin-left"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left: Info */}
          <motion.div {...fadeUp(0.1)} className="lg:col-span-4 space-y-8">
            <p
              className="text-sm text-[rgba(240,236,227,0.55)] leading-relaxed"
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              Whether you have a job opportunity, a project idea, or just want to discuss AI/ML and computer vision — drop me a line. I read and reply to everything.
            </p>

            <div className="space-y-4">
              <a
                href="mailto:lakshyagupta23.lg@gmail.com"
                className="flex items-center gap-3 group"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[rgba(201,168,76,0.2)] text-[rgba(201,168,76,0.6)] group-hover:border-[rgba(201,168,76,0.5)] group-hover:text-[#c9a84c] transition-colors duration-200">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.3)] mb-0.5" style={{ fontFamily: '"JetBrains Mono", monospace' }}>Email</p>
                  <span className="text-xs text-[rgba(240,236,227,0.65)] group-hover:text-[rgba(240,236,227,0.9)] transition-colors" style={{ fontFamily: '"Outfit", sans-serif' }}>lakshyagupta23.lg@gmail.com</span>
                </div>
              </a>

              <a href="tel:+919250923902" className="flex items-center gap-3 group">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[rgba(201,168,76,0.2)] text-[rgba(201,168,76,0.6)] group-hover:border-[rgba(201,168,76,0.5)] group-hover:text-[#c9a84c] transition-colors duration-200">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.3)] mb-0.5" style={{ fontFamily: '"JetBrains Mono", monospace' }}>Phone</p>
                  <span className="text-xs text-[rgba(240,236,227,0.65)] group-hover:text-[rgba(240,236,227,0.9)] transition-colors" style={{ fontFamily: '"Outfit", sans-serif' }}>+91 9250923902</span>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[rgba(201,168,76,0.2)] text-[rgba(201,168,76,0.6)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.3)] mb-0.5" style={{ fontFamily: '"JetBrains Mono", monospace' }}>Location</p>
                  <span className="text-xs text-[rgba(240,236,227,0.65)]" style={{ fontFamily: '"Outfit", sans-serif' }}>Delhi, India</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/Lakshyagupta23" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[rgba(240,236,227,0.35)] hover:text-[rgba(240,236,227,0.8)] transition-colors"
                style={{ fontFamily: '"Outfit", sans-serif' }}>
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a href="https://linkedin.com/in/lakshya-gupta-822770301" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-[rgba(240,236,227,0.35)] hover:text-[rgba(240,236,227,0.8)] transition-colors"
                style={{ fontFamily: '"Outfit", sans-serif' }}>
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.3)]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    Name <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input type="text" id="name" value={form.name} onChange={handleChange}
                    placeholder="Your name" className={inputCls} required
                    style={{ fontFamily: '"Outfit", sans-serif' }} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.3)]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                    Email <span className="text-[#c9a84c]">*</span>
                  </label>
                  <input type="email" id="email" value={form.email} onChange={handleChange}
                    placeholder="your@email.com" className={inputCls} required
                    style={{ fontFamily: '"Outfit", sans-serif' }} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.3)]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Subject
                </label>
                <input type="text" id="subject" value={form.subject} onChange={handleChange}
                  placeholder="What is this about?" className={inputCls}
                  style={{ fontFamily: '"Outfit", sans-serif' }} />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-[rgba(240,236,227,0.3)]" style={{ fontFamily: '"JetBrains Mono", monospace' }}>
                  Message <span className="text-[#c9a84c]">*</span>
                </label>
                <textarea id="message" rows="6" value={form.message} onChange={handleChange}
                  placeholder="Write your message here..." className={inputCls + " resize-none leading-relaxed"} required
                  style={{ fontFamily: '"Outfit", sans-serif' }} />
              </div>

              <AnimatePresence mode="wait">
                {status.message && (
                  <motion.div
                    key="status"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className={`flex items-center gap-3 rounded-[2px] p-3.5 text-xs ${
                      status.type === "success"
                        ? "border border-emerald-800/40 bg-emerald-900/20 text-emerald-400"
                        : "border border-red-800/40 bg-red-900/20 text-red-400"
                    }`}
                    style={{ fontFamily: '"Outfit", sans-serif' }}
                  >
                    {status.type === "success" ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" disabled={submitting} className="btn-gold-solid" style={{ fontFamily: '"Outfit", sans-serif' }}>
                {submitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center text-[10px] text-[rgba(240,236,227,0.2)] tracking-widest uppercase"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          © {new Date().getFullYear()} Lakshya Gupta · All rights reserved
        </motion.p>
      </div>
    </div>
  );
}
