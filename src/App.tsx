/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Menu,
  X,
  UserSearch,
  Construction,
  MessageSquare,
  Handshake,
  Code,
  Palette,
  Lightbulb,
  Brain,
  Github,
  Twitter,
  CheckCircle,
  Loader2
} from 'lucide-react';

type BaseProps = { children: React.ReactNode; className?: string; [key: string]: unknown };

// ── Reusable fade-in-up wrapper ──────────────────────────────────────────────
const FadeInUp = ({ children, delay = 0, className = '' }: BaseProps & { delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Slide in from left/right ─────────────────────────────────────────────────
const SlideIn = ({ children, from = 'left', delay = 0, className = '' }: BaseProps & { from?: 'left' | 'right'; delay?: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === 'left' ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ── Stagger container ────────────────────────────────────────────────────────
const StaggerContainer = ({ children, className = '' }: BaseProps) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = '' }: BaseProps) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// ── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-white/5">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Terminal className="text-primary w-6 h-6" />
          <span className="text-xl font-black tracking-tighter text-primary uppercase font-sans">PILOT_LAB</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['#program', '#criteria'].map((href, i) => (
            <motion.a
              key={href}
              href={href}
              whileHover={{ y: -1 }}
              className="text-muted hover:text-primary transition-colors duration-200 font-display text-sm uppercase tracking-widest relative group"
            >
              {['The Program', 'Criteria'][i]}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="#apply"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-primary text-background rounded-full font-bold text-sm hover:bg-primary-dark transition-colors duration-200"
          >
            Apply
          </motion.a>
        </div>
        <button className="md:hidden text-primary" onClick={() => setMobileOpen(o => !o)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <motion.div whileTap={{ scale: 0.85 }}><span className="sr-only">Menu</span><Menu className="w-6 h-6" /></motion.div>}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 border-b border-white/5"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              <a href="#program" className="text-muted hover:text-primary transition-colors font-display text-sm uppercase tracking-widest" onClick={() => setMobileOpen(false)}>The Program</a>
              <a href="#criteria" className="text-muted hover:text-primary transition-colors font-display text-sm uppercase tracking-widest" onClick={() => setMobileOpen(false)}>Criteria</a>
              <a href="#apply" className="px-6 py-3 bg-primary text-background rounded-full font-bold text-sm text-center" onClick={() => setMobileOpen(false)}>Apply</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-tertiary/5 blur-[120px] rounded-full"
      />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/5 mb-8"
      >
        <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
        <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-muted">Batch 04 Applications Open</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-5xl md:text-8xl font-black tracking-tight leading-[0.9] text-gradient mb-8"
      >
        Find Your Cofounder. <br/> Build Your Startup.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
      >
        A curated community where student builders meet cofounders, validate ideas, and build startups together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <motion.a
          href="#apply"
          whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(196,192,255,0.45)' }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-background font-bold rounded-full shadow-[0_0_20px_rgba(196,192,255,0.2)] transition-shadow duration-300"
        >
          Apply for the Pilot
        </motion.a>
        <motion.a
          href="#program"
          whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.07)' }}
          whileTap={{ scale: 0.97 }}
          className="w-full sm:w-auto px-8 py-4 bg-surface text-ink font-semibold rounded-full border border-white/10 transition-colors duration-300"
        >
          View Curriculum
        </motion.a>
      </motion.div>
    </motion.div>
  </section>
);

// ── Problem ──────────────────────────────────────────────────────────────────
const Problem = () => (
  <section className="py-24 px-6 bg-surface/30">
    <div className="max-w-7xl mx-auto">
      <FadeInUp className="mb-16">
        <span className="font-display text-primary font-bold tracking-widest text-xs uppercase">The Reality</span>
        <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter">Why Most Student <br/> Startups Never Start</h2>
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: UserSearch, title: "No Cofounders", desc: "Most students build in silos. Great builders are hidden across different campuses and majors, never meeting their match." },
          { icon: Construction, title: "No Builder Environment", desc: "Coffee shops aren't enough. You need an environment where the default setting is 'shipping' and 'iteration'." },
          { icon: MessageSquare, title: "No Real Feedback", desc: "Friends will lie to you. You need ruthless, constructive feedback from other builders who understand the struggle." }
        ].map((item, i) => (
          <StaggerItem key={i}>
            <motion.div
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(196,192,255,0.08)' }}
              className="p-8 bg-surface rounded-xl border border-white/5 hover:border-primary/30 transition-colors duration-300 cursor-default h-full group"
            >
              <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <item.icon className="w-10 h-10 text-primary mb-6" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

// ── Solution ─────────────────────────────────────────────────────────────────
const Solution = () => (
  <section className="py-32 px-6" id="program">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <SlideIn from="left" className="lg:col-span-5 flex flex-col justify-center">
          <span className="font-display text-tertiary font-bold tracking-widest text-xs uppercase">The Solution</span>
          <h2 className="text-4xl md:text-6xl font-black mt-4 tracking-tighter leading-none mb-8">A Startup Lab <br/> for Students</h2>
          <p className="text-muted text-lg mb-8 leading-relaxed">We provide the structure, the community, and the network to turn ideas into software.</p>
        </SlideIn>

        <SlideIn from="right" delay={0.1} className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02, borderColor: 'rgba(196,192,255,0.25)' }}
            className="md:col-span-2 p-10 bg-surface rounded-xl relative overflow-hidden border border-white/5 transition-colors duration-300 group cursor-default"
          >
            <motion.div
              className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-15 transition-opacity duration-300"
              animate={{ rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Handshake className="w-32 h-32" />
            </motion.div>
            <div className="relative z-10">
              <h4 className="text-2xl font-bold mb-4 text-primary">Cofounder Matching</h4>
              <p className="text-muted max-w-md">Our algorithm and mixer events pair you based on complementary skillsets and shared long-term visions.</p>
            </div>
          </motion.div>

          {[
            { title: 'Build Together', desc: 'Intensive 48-hour sprints and weekly syncs to keep momentum high.' },
            { title: 'Founder Feedback', desc: 'Direct access to alumni founders and industry mentors for validation.' }
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, borderColor: 'rgba(196,192,255,0.25)' }}
              className="p-10 bg-surface rounded-xl relative overflow-hidden border border-white/5 transition-colors duration-300 cursor-default"
            >
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4 text-primary">{card.title}</h4>
                <p className="text-muted">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </SlideIn>
      </div>
    </div>
  </section>
);

// ── Program Steps ─────────────────────────────────────────────────────────────
const ProgramSteps = () => (
  <section className="py-24 px-6 bg-background border-y border-white/5">
    <div className="max-w-7xl mx-auto">
      <FadeInUp className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter">The Pilot Program</h2>
      </FadeInUp>

      <StaggerContainer className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
        <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />

        {[
          { step: 1, title: "Apply", desc: "Submit your builder profile and portfolio. Show us what you've tinkered with." },
          { step: 2, title: "Curated Selection", desc: "We hand-pick the top 5% of applicants to ensure a high-density environment of talent." },
          { step: 3, title: "Builder Sessions", desc: "An 8-week structured program of builds, mixers, and validation sprints." }
        ].map((item, i) => (
          <StaggerItem key={i} className="flex-1 relative z-10 group cursor-default">
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="w-12 h-12 rounded-full bg-primary text-background flex items-center justify-center font-black mb-8 shadow-lg shadow-primary/20 transition-shadow duration-300 group-hover:shadow-primary/40"
            >
              {item.step}
            </motion.div>
            <h4 className="text-xl font-bold mb-4 font-display uppercase tracking-widest">{item.title}</h4>
            <p className="text-muted">{item.desc}</p>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  </section>
);

// ── Criteria ──────────────────────────────────────────────────────────────────
const Criteria = () => (
  <section className="py-32 px-6" id="criteria">
    <div className="max-w-4xl mx-auto">
      <FadeInUp className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Who This Is For</h2>
        <p className="text-xl text-primary font-medium italic">"You don't need a startup idea yet. You just need the ambition to build."</p>
      </FadeInUp>

      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {[
          { icon: Code, label: "Developers" },
          { icon: Palette, label: "Designers" },
          { icon: Lightbulb, label: "Product Thinkers" },
          { icon: Brain, label: "Problem Solvers" }
        ].map((item, i) => (
          <StaggerItem key={i}>
            <motion.div
              whileHover={{ y: -6, borderColor: 'rgba(196,192,255,0.3)', backgroundColor: 'rgba(196,192,255,0.05)' }}
              className="p-6 bg-surface rounded-xl border border-white/5 flex flex-col items-center gap-3 cursor-default transition-colors duration-300"
            >
              <motion.div whileHover={{ rotate: 10, scale: 1.2 }} transition={{ type: 'spring', stiffness: 300 }}>
                <item.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="font-display text-xs uppercase font-bold tracking-wider">{item.label}</span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <FadeInUp delay={0.1}>
        <motion.div
          whileHover={{ borderColor: 'rgba(196,192,255,0.2)' }}
          className="p-8 bg-surface rounded-2xl border border-primary/10 text-center transition-colors duration-300"
        >
          <p className="text-muted italic">
            We look for 'The Tinkerer'. People who buy domain names before they have a plan.
            People who spend weekends debugging things for fun. The relentless ones.
          </p>
        </motion.div>
      </FadeInUp>
    </div>
  </section>
);

// ── Apply Form ────────────────────────────────────────────────────────────────
const ApplyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    city: '',
    skills: '',
    interests: '',
    motivation: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // ── Replace this URL with your Google Apps Script Web App URL ──
    const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

    if (!GOOGLE_SCRIPT_URL) {
      // If no URL configured, just show success (demo mode)
      setTimeout(() => setStatus('success'), 800);
      return;
    }

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = "w-full bg-surface border border-white/5 rounded-lg p-4 focus:ring-2 focus:ring-primary/40 focus:outline-none text-ink transition-all duration-200 hover:border-white/10 focus:border-primary/40";

  if (status === 'success') {
    return (
      <section className="py-32 px-6 bg-surface/20" id="apply">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle className="w-20 h-20 text-tertiary mx-auto mb-6" />
            </motion.div>
            <h2 className="text-4xl font-black tracking-tight mb-4">Application Received!</h2>
            <p className="text-muted text-lg">We'll be in touch soon. Keep building.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 px-6 bg-surface/20" id="apply">
      <div className="max-w-3xl mx-auto">
        <FadeInUp className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tight mb-4">Apply to the Pilot Builder Program</h2>
          <p className="text-muted">Join the next cohort of student founders.</p>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Full Name', key: 'name', placeholder: 'Avery Chen', type: 'text' },
                { label: 'College / University', key: 'university', placeholder: 'Stanford University', type: 'text' },
                { label: 'City', key: 'city', placeholder: 'Palo Alto', type: 'text' },
                { label: 'Primary Skills', key: 'skills', placeholder: 'React, Figma, Python...', type: 'text' },
              ].map(({ label, key, placeholder, type }) => (
                <motion.div key={key} className="space-y-2" whileHover={{ scale: 1.01 }} transition={{ type: 'spring', stiffness: 400 }}>
                  <label className="font-display text-xs uppercase tracking-widest text-muted">{label}</label>
                  <input
                    type={type}
                    className={inputClass}
                    placeholder={placeholder}
                    value={formData[key as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    required
                  />
                </motion.div>
              ))}
            </div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.005 }} transition={{ type: 'spring', stiffness: 400 }}>
              <label className="font-display text-xs uppercase tracking-widest text-muted">Interests & Industries</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Fintech, AI agents, EdTech..."
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                required
              />
            </motion.div>

            <motion.div className="space-y-2" whileHover={{ scale: 1.005 }} transition={{ type: 'spring', stiffness: 400 }}>
              <label className="font-display text-xs uppercase tracking-widest text-muted">Motivation</label>
              <textarea
                className={inputClass}
                placeholder="Tell us about the coolest thing you've built..."
                rows={4}
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                required
              />
            </motion.div>

            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-400 text-sm text-center">
                Something went wrong. Please try again.
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(196,192,255,0.4)' }}
              whileTap={{ scale: 0.98 }}
              disabled={status === 'loading'}
              className="w-full py-5 bg-primary text-background font-black rounded-full text-lg shadow-[0_10px_30px_rgba(196,192,255,0.2)] transition-shadow duration-300 disabled:opacity-70 flex items-center justify-center gap-3"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Submitting...
                </>
              ) : 'Apply Now'}
            </motion.button>
          </form>
        </FadeInUp>
      </div>
    </section>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-background border-t border-white/5 py-12 px-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2">
        <Terminal className="text-primary w-5 h-5" />
        <span className="text-primary font-bold uppercase tracking-tighter">PILOT LAB</span>
      </div>
      <p className="text-[10px] font-medium font-display tracking-widest uppercase text-white/40">
        © 2024 PILOT LAB. BUILT FOR THE NEXT GENERATION.
      </p>
      <div className="flex gap-6">
        {['Privacy', 'Terms'].map(label => (
          <motion.a key={label} href="#" whileHover={{ y: -1 }} className="text-white/40 hover:text-tertiary transition-colors text-[12px] font-medium font-display tracking-widest uppercase">{label}</motion.a>
        ))}
        <motion.a href="#" whileHover={{ scale: 1.2, color: '#4edea3' }} className="text-white/40 transition-colors"><Twitter className="w-4 h-4" /></motion.a>
        <motion.a href="#" whileHover={{ scale: 1.2, color: '#4edea3' }} className="text-white/40 transition-colors"><Github className="w-4 h-4" /></motion.a>
      </div>
    </div>
  </footer>
);

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <ProgramSteps />
        <Criteria />
        <ApplyForm />
      </main>
      <Footer />
    </div>
  );
}
