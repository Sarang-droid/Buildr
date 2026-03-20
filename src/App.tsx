import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  Brain,
  CheckCircle,
  Code,
  Github,
  Handshake,
  Lightbulb,
  Loader2,
  Menu,
  Palette,
  Rocket,
  UserSearch,
  X,
} from 'lucide-react';
import buildersClubLogo from './assets/builders-club-logo.png';

type BaseProps = {
  children: React.ReactNode;
  className?: string;
};

type ApplicationForm = {
  name: string;
  email: string;
  university: string;
  city: string;
  skills: string;
  interests: string;
  portfolio: string;
  motivation: string;
};

const navLinks = [
  { href: '#program', label: 'Program' },
  { href: '#criteria', label: 'Criteria' },
  { href: '#apply', label: 'Apply' },
];

const problemCards = [
  {
    icon: UserSearch,
    title: 'Good cofounders are fragmented',
    desc: 'Strong builders sit in different campuses, clubs, and majors, so the right people rarely meet at the right moment.',
  },
  {
    icon: Rocket,
    title: 'Momentum dies without structure',
    desc: 'Most student teams start with energy, then stall because there is no rhythm for shipping, testing, and accountability.',
  },
  {
    icon: Handshake,
    title: 'Feedback is usually too soft',
    desc: 'Friends are supportive, but startups need sharper feedback loops from people who actually build and validate products.',
  },
];

const stepCards = [
  {
    step: '01',
    title: 'Apply',
    desc: 'Share what you build, what you want to work on, and the kind of teammates you want beside you.',
  },
  {
    step: '02',
    title: 'Get matched',
    desc: 'We use skills, ambition, and working style to connect founders who can actually build together.',
  },
  {
    step: '03',
    title: 'Ship weekly',
    desc: 'Inside the cohort, you build in public, get feedback fast, and move from idea to prototype quickly.',
  },
];

const criteriaCards = [
  { icon: Code, label: 'Developers' },
  { icon: Palette, label: 'Designers' },
  { icon: Lightbulb, label: 'Product thinkers' },
  { icon: Brain, label: 'Problem solvers' },
];

const initialForm: ApplicationForm = {
  name: '',
  email: '',
  university: '',
  city: '',
  skills: '',
  interests: '',
  portfolio: '',
  motivation: '',
};

const FadeInUp = ({ children, className = '' }: BaseProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/78 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#top" className="flex min-w-0 items-center gap-3">
          <img src={buildersClubLogo} alt="Builders Club logo" className="h-11 w-11 rounded-xl bg-white/5 object-contain p-1.5" />
          <div className="min-w-0">
            <p className="truncate text-xs font-display uppercase tracking-[0.28em] text-primary/80">Builders Club</p>
            <p className="truncate text-base font-black tracking-tight text-white sm:text-lg">Buildr</p>
          </div>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map(({ href, label }) => (
            <a key={href} href={href} className="text-sm font-display uppercase tracking-[0.24em] text-muted transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-background/96 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm font-display uppercase tracking-[0.2em] text-white/88"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(196,192,255,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(78,222,163,0.18),transparent_25%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <FadeInUp className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-tertiary" />
            <span className="text-[11px] font-display uppercase tracking-[0.28em] text-primary">Applications open now</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Find the right cofounder and start building faster.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Buildr is a curated startup community for student builders who want strong teammates, real momentum, and sharper feedback.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-4 text-sm font-black uppercase tracking-[0.18em] text-background transition-transform hover:-translate-y-0.5"
            >
              Apply now
            </a>
            <a
              href="#program"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/3 px-7 py-4 text-sm font-display uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/8"
            >
              Explore program
            </a>
          </div>
        </FadeInUp>

        <FadeInUp className="lg:justify-self-end">
          <div className="relative mx-auto max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            <div className="grid gap-5 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-[1.5rem] bg-white p-3 shadow-[0_18px_40px_rgba(255,255,255,0.12)] sm:h-32 sm:w-32">
                <img src={buildersClubLogo} alt="Builders Club crest" className="h-full w-full object-contain" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-xs font-display uppercase tracking-[0.3em] text-tertiary">Builders Club</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">Buildr</h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  Built for students who already tinker, prototype, and want to meet the people serious enough to ship beside them.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
                <p className="text-xs font-display uppercase tracking-[0.24em] text-primary">Format</p>
                <p className="mt-2 text-sm text-white">Weekly build rhythm and founder matching</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
                <p className="text-xs font-display uppercase tracking-[0.24em] text-primary">Who it fits</p>
                <p className="mt-2 text-sm text-white">Developers, designers, and ambitious student operators</p>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <FadeInUp className="max-w-2xl">
          <p className="text-xs font-display uppercase tracking-[0.28em] text-primary">Why this exists</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">Most student startups fail before the first real sprint.</h2>
        </FadeInUp>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {problemCards.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              whileHover={{ y: -6 }}
              className="rounded-[1.75rem] border border-white/8 bg-surface/80 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.18)]"
            >
              <Icon className="h-10 w-10 text-primary" />
              <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Program() {
  return (
    <section id="program" className="border-y border-white/8 bg-surface/35 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeInUp className="max-w-xl">
            <p className="text-xs font-display uppercase tracking-[0.28em] text-tertiary">Program design</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">A focused system for finding teammates and shipping together.</h2>
            <p className="mt-5 text-base leading-7 text-muted">
              The program is designed to reduce random networking and replace it with curated matches, weekly pressure, and practical feedback loops.
            </p>
          </FadeInUp>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] border border-primary/16 bg-background/78 p-6 sm:col-span-2">
              <h3 className="text-2xl font-black tracking-tight text-white">Cofounder matching</h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                Applicants are matched on skill overlap, working style, startup intent, and what each person can contribute in the first few weeks.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/8 bg-background/70 p-6">
              <h3 className="text-xl font-bold text-white">Weekly build sessions</h3>
              <p className="mt-3 text-sm leading-7 text-muted">Short cycles keep teams moving from conversation to actual prototypes.</p>
            </div>
            <div className="rounded-[1.75rem] border border-white/8 bg-background/70 p-6">
              <h3 className="text-xl font-bold text-white">Founder feedback</h3>
              <p className="mt-3 text-sm leading-7 text-muted">Mentors and peers give grounded feedback on execution, not vague encouragement.</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {stepCards.map(({ step, title, desc }) => (
            <div key={step} className="rounded-[1.75rem] border border-white/8 bg-background/68 p-6">
              <p className="text-sm font-display uppercase tracking-[0.28em] text-primary">{step}</p>
              <h3 className="mt-5 text-2xl font-black tracking-tight text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted sm:text-base">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Criteria() {
  return (
    <section id="criteria" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <FadeInUp className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-display uppercase tracking-[0.28em] text-primary">Who should apply</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">This is for people who already have the instinct to build.</h2>
          <p className="mt-5 text-base leading-7 text-muted">
            You do not need a finished startup idea. You do need curiosity, initiative, and the ability to follow through.
          </p>
        </FadeInUp>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {criteriaCards.map(({ icon: Icon, label }) => (
            <motion.div
              key={label}
              whileHover={{ y: -4 }}
              className="rounded-[1.5rem] border border-white/8 bg-surface/70 p-5 text-center"
            >
              <Icon className="mx-auto h-8 w-8 text-tertiary" />
              <p className="mt-4 text-xs font-display uppercase tracking-[0.2em] text-white sm:text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApplyForm() {
  const [formData, setFormData] = useState<ApplicationForm>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const inputClass =
    'w-full rounded-2xl border border-white/10 bg-background/80 px-4 py-3.5 text-sm text-white outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/20';

  const setField = (key: keyof ApplicationForm, value: string) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit your application.');
      }

      setStatus('success');
      setFormData(initialForm);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit your application.');
    }
  };

  return (
    <section id="apply" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeInUp className="rounded-[2rem] border border-white/10 bg-surface/75 p-6 sm:p-8">
            <p className="text-xs font-display uppercase tracking-[0.28em] text-tertiary">Apply</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">Send your builder profile.</h2>
            <p className="mt-5 text-base leading-7 text-muted">
              Tell us what you are building, what kind of collaborators you want to meet, and how you hope to contribute to the community.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-background/65 p-4">
                <Handshake className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-white">Built for real collaboration</p>
                  <p className="text-sm leading-6 text-muted">This application helps us bring together builders who want to share ideas, trade feedback, and start things together.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-background/65 p-4">
                <Lightbulb className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-white">Community-first energy</p>
                  <p className="text-sm leading-6 text-muted">We are building a community where ambitious students can learn in public, find strong teammates, and keep each other moving.</p>
                </div>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp className="rounded-[2rem] border border-white/10 bg-background/72 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:p-8">
            {status === 'success' ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center text-center">
                <CheckCircle className="h-16 w-16 text-tertiary" />
                <h3 className="mt-5 text-3xl font-black tracking-tight text-white">Application received</h3>
                <p className="mt-4 max-w-md text-base leading-7 text-muted">
                  Your application was sent successfully. You can submit another one if needed.
                </p>
                <button
                  type="button"
                  className="mt-8 rounded-full border border-white/12 px-6 py-3 text-sm font-display uppercase tracking-[0.2em] text-white"
                  onClick={() => setStatus('idle')}
                >
                  Submit another
                </button>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs font-display uppercase tracking-[0.24em] text-muted">Full name</span>
                    <input className={inputClass} value={formData.name} onChange={(e) => setField('name', e.target.value)} required />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-display uppercase tracking-[0.24em] text-muted">Email</span>
                    <input type="email" className={inputClass} value={formData.email} onChange={(e) => setField('email', e.target.value)} required />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-display uppercase tracking-[0.24em] text-muted">College / University</span>
                    <input className={inputClass} value={formData.university} onChange={(e) => setField('university', e.target.value)} required />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-display uppercase tracking-[0.24em] text-muted">City</span>
                    <input className={inputClass} value={formData.city} onChange={(e) => setField('city', e.target.value)} required />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-display uppercase tracking-[0.24em] text-muted">Primary skills</span>
                    <input className={inputClass} value={formData.skills} onChange={(e) => setField('skills', e.target.value)} required />
                  </label>
                  <label className="space-y-2">
                    <span className="text-xs font-display uppercase tracking-[0.24em] text-muted">Interests</span>
                    <input className={inputClass} value={formData.interests} onChange={(e) => setField('interests', e.target.value)} required />
                  </label>
                </div>

                <label className="block space-y-2">
                  <span className="text-xs font-display uppercase tracking-[0.24em] text-muted">Portfolio / LinkedIn</span>
                  <input
                    type="url"
                    className={inputClass}
                    placeholder="https://"
                    value={formData.portfolio}
                    onChange={(e) => setField('portfolio', e.target.value)}
                    required
                  />
                </label>

                <label className="block space-y-2">
                  <span className="text-xs font-display uppercase tracking-[0.24em] text-muted">Why do you want to join?</span>
                  <textarea
                    rows={6}
                    className={`${inputClass} resize-y`}
                    value={formData.motivation}
                    onChange={(e) => setField('motivation', e.target.value)}
                    required
                  />
                </label>

                {status === 'error' && <p className="text-sm text-red-300">{errorMessage}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-background disabled:opacity-70"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending
                    </>
                  ) : (
                    'Apply now'
                  )}
                </button>
              </form>
            )}
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/8 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src={buildersClubLogo} alt="Builders Club logo" className="h-10 w-10 rounded-xl bg-white/5 object-contain p-1.5" />
          <div>
            <p className="text-sm font-black tracking-tight text-white">Buildr</p>
            <p className="text-[11px] font-display uppercase tracking-[0.24em] text-muted">Student founder community</p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-white/50">
          <a href="mailto:shaunakkate87@gmail.com" className="text-xs font-display uppercase tracking-[0.2em] hover:text-white">
            Contact
          </a>
          <a href="#" className="hover:text-white" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Program />
        <Criteria />
        <ApplyForm />
      </main>
      <Footer />
    </div>
  );
}
