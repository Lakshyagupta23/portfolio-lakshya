import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }
    
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    // Mock API call simulating EmailJS dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({ 
        type: 'success', 
        message: 'Message sent successfully! I will get back to you shortly.' 
      });
      setFormState({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="relative min-h-screen w-full bg-transparent px-6 py-24 md:px-16 lg:px-24 flex items-center">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.04),transparent_50%)]"></div>

      <div className="mx-auto w-full max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Details & Animated Phone SVG */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold">GET IN TOUCH</span>
              <h1 className="text-4xl font-extrabold tracking-tight font-display text-white sm:text-5xl">
                Let's Work Together
              </h1>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                If you have a job opportunity, a project collaboration, or just want to chat about AI/ML pipelines and computer vision, drop me a line!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#0b0f19]/30 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">Email Me</p>
                  <a href="mailto:lakshyagupta23.lg@gmail.com" className="text-xs sm:text-sm font-semibold text-white hover:text-primary transition-colors">
                    lakshyagupta23.lg@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#0b0f19]/30 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">Call Me</p>
                  <a href="tel:+919250923902" className="text-xs sm:text-sm font-semibold text-white hover:text-primary transition-colors">
                    +91 9250923902
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#0b0f19]/30 backdrop-blur-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">Location</p>
                  <span className="text-xs sm:text-sm font-semibold text-white">
                    Delhi, India
                  </span>
                </div>
              </div>
            </div>

            {/* Line Drawing Phone SVG (Exact Recreation) */}
            <div className="flex justify-center lg:justify-start pt-4">
              <svg width="150" height="150" viewBox="0 0 24 24" fill="none" className="text-primary/25">
                {/* Outer ring */}
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="0.75"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                {/* Telephone outline */}
                <motion.path
                  d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.3 }}
                />
              </svg>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-card rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold font-display text-white mb-6">Send Me a Message</h3>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                      Your Name <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Enter name"
                      className="rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-text-tertiary focus:border-primary/30 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                      Your Email <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      className="rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-text-tertiary focus:border-primary/30 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="Message subject"
                    className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-text-tertiary focus:border-primary/30 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] font-semibold text-text-secondary uppercase tracking-wider">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    value={formState.message}
                    onChange={handleInputChange}
                    placeholder="Write your message here..."
                    className="w-full rounded-xl border border-white/5 bg-white/[0.02] px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder:text-text-tertiary focus:border-primary/30 focus:outline-none leading-relaxed resize-none"
                    required
                  />
                </div>

                {/* Status Banners */}
                <AnimatePresence mode="wait">
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`flex items-center gap-3 rounded-xl p-3.5 text-xs ${
                        status.type === 'success' 
                          ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-400' 
                          : 'border border-red-500/20 bg-red-500/10 text-red-400'
                      }`}
                    >
                      {status.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                      <span>{status.message}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-secondary py-3 text-xs sm:text-sm font-semibold text-black hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer shadow-[0_4px_20px_rgba(0,242,255,0.05)]"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
