import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Layers, Mic2, ArrowRight, Sparkles } from 'lucide-react';
import CardNav from '../components/CardNav';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: '10x',
    label: 'Faster output',
    sub: 'versus manual repurposing',
    icon: Zap,
    accent: 'from-violet-400 to-indigo-400',
    glow: 'rgba(139,92,246,0.12)',
  },
  {
    value: '30+',
    label: 'Destinations',
    sub: 'native formats, tuned per channel',
    icon: Layers,
    accent: 'from-indigo-400 to-cyan-400',
    glow: 'rgba(99,102,241,0.12)',
  },
  {
    value: '100%',
    label: 'Your voice',
    sub: 'brand-voice fidelity, every time',
    icon: Mic2,
    accent: 'from-cyan-400 to-sky-400',
    glow: 'rgba(34,211,238,0.12)',
  },
] as const;

const chapters = [
  {
    num: '01',
    heading: 'Built with creators',
    body: 'We lived the grind: record, edit, then lose hours rewriting the same story for every channel. CreatorOS is the system we always wanted — one workflow, everywhere you publish.',
    tag: 'Origin story',
    accent: 'text-violet-400',
    bar: 'bg-gradient-to-b from-violet-500 to-violet-500/0',
  },
  {
    num: '02',
    heading: 'Obsessed with authenticity',
    body: 'Brand Voice AI learns your cadence, vocabulary, and intent so every output feels unmistakably yours. Each piece passes a similarity gate before it reaches your desk.',
    tag: 'Voice intelligence',
    accent: 'text-indigo-400',
    bar: 'bg-gradient-to-b from-indigo-500 to-indigo-500/0',
  },
  {
    num: '03',
    heading: 'Automation without friction',
    body: 'UiPath robots handle the last mile: scheduling, uploading, and captioning across 30+ platforms while you focus on the work that only you can do.',
    tag: 'Autopilot',
    accent: 'text-cyan-400',
    bar: 'bg-gradient-to-b from-cyan-500 to-cyan-500/0',
  },
] as const;

const navItems = [
  {
    label: 'Product',
    bgColor: 'var(--color-nav-card-product)',
    textColor: 'var(--color-nav-card-product-text)',
    links: [
      { label: 'How it works', href: '/#how-it-works', ariaLabel: 'How it works' },
      { label: 'Features', href: '/#features', ariaLabel: 'Features' },
      { label: 'Examples', href: '/#examples', ariaLabel: 'Examples' },
    ],
  },
  {
    label: 'Resources',
    bgColor: 'var(--color-nav-card-resources)',
    textColor: 'var(--color-nav-card-resources-text)',
    links: [
      { label: 'Wall of Love', href: '/#testimonials', ariaLabel: 'Testimonials' },
      { label: 'Pricing', href: '/#pricing', ariaLabel: 'Pricing' },
      { label: 'FAQ', href: '/#faq', ariaLabel: 'FAQ' },
    ],
  },
  {
    label: 'Company',
    bgColor: 'var(--color-nav-card-company)',
    textColor: 'var(--color-nav-card-company-text)',
    links: [
      { label: 'About Us', href: '/about', ariaLabel: 'About us' },
      { label: 'Log In', href: '/login', ariaLabel: 'Log in' },
      { label: 'Contact', href: '/#contact', ariaLabel: 'Contact us' },
    ],
  },
];

export default function AboutUs() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const pullRef = useRef<HTMLDivElement>(null);
  const chaptersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero chars stagger */
      gsap.fromTo(
        heroRef.current?.children ?? [],
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.09, duration: 1.1, ease: 'power3.out', delay: 0.2 }
      );

      /* Stats strip */
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.querySelectorAll('.stat-col'),
          { y: 36, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 82%', once: true },
          }
        );
      }

      /* Pull quote */
      if (pullRef.current) {
        gsap.fromTo(
          pullRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1.1, ease: 'power3.out',
            scrollTrigger: { trigger: pullRef.current, start: 'top 85%', once: true },
          }
        );
      }

      /* Chapter rows */
      if (chaptersRef.current) {
        gsap.fromTo(
          chaptersRef.current.querySelectorAll('.chapter-row'),
          { x: -32, opacity: 0 },
          {
            x: 0, opacity: 1, stagger: 0.14, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: chaptersRef.current, start: 'top 82%', once: true },
          }
        );
      }

      /* CTA */
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 32, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 88%', once: true },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans selection:bg-white selection:text-black"
    >

      {/* PREMIUM BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[980px] h-[980px] rounded-full bg-white/[0.03] blur-[210px]" />
        <div className="absolute top-[22%] left-[-10%] w-[720px] h-[720px] rounded-full bg-violet-600/[0.05] blur-[190px]" />
        <div className="absolute bottom-[-12%] right-[-6%] w-[760px] h-[760px] rounded-full bg-cyan-500/[0.045] blur-[190px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '4px 4px',
            maskImage:
              'radial-gradient(circle at center top, black 18%, transparent 82%)',
            WebkitMaskImage:
              'radial-gradient(circle at center top, black 18%, transparent 82%)',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* NAV */}
      <CardNav items={navItems} />

      <main className="relative z-10">

        {/* ══ HERO ══════════════════════════════════════════════════════════ */}
        <section className="pt-48 pb-28 md:pt-56 md:pb-36 max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16">

          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl px-5 py-2 mb-10 shadow-[0_0_60px_rgba(255,255,255,0.03)]">
            <Sparkles className="w-3.5 h-3.5 text-white/70" />
            <span className="text-[10px] uppercase tracking-[0.34em] text-white/38">
              Our Mission
            </span>
          </div>

          <div ref={heroRef}>
            {/* Overline */}
            <p className="text-[11px] uppercase tracking-[0.34em] text-white/25 mb-6 font-medium">
              CreatorOS · Est. 2024
            </p>

            {/* Headline */}
            <h1 className="text-[56px] sm:text-[86px] lg:text-[120px] xl:text-[140px] leading-[0.88] tracking-[-0.08em] font-semibold mb-10 max-w-5xl">
              For creators
              <span className="block text-white/18">who refuse</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">
                to compromise.
              </span>
            </h1>

            {/* Lede */}
            <p className="text-[16px] md:text-[19px] leading-[2] text-white/42 max-w-2xl">
              CreatorOS unifies strategy, production, and distribution so creators
              can scale across platforms without sacrificing voice, quality, or time.
            </p>
          </div>
        </section>

        {/* ══ STATS STRIP ═══════════════════════════════════════════════════ */}
        <section className="border-y border-white/[0.06]">
          <div
            ref={statsRef}
            className="max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="stat-col group relative overflow-hidden py-14 md:py-16 px-10 md:px-12 transition-colors duration-500 hover:bg-white/[0.02]"
                  style={{
                    background: `radial-gradient(320px circle at 50% 130%, ${stat.glow}, transparent 70%)`,
                  }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-2.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] text-transparent bg-clip-text">
                      <Icon className={`w-5 h-5 stroke-current`} style={{ stroke: 'url(#g' + idx + ')' }} />
                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <linearGradient id={`g${idx}`} x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={idx === 0 ? '#a78bfa' : idx === 1 ? '#818cf8' : '#22d3ee'} />
                            <stop offset="100%" stopColor={idx === 0 ? '#818cf8' : idx === 1 ? '#22d3ee' : '#38bdf8'} />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-white/20 pt-3">
                      {stat.sub}
                    </span>
                  </div>
                  <p
                    className={`text-[64px] md:text-[76px] font-semibold tracking-[-0.07em] leading-none text-transparent bg-clip-text bg-gradient-to-r ${stat.accent} mb-3`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[15px] font-medium text-white/60 tracking-tight">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══ PULL QUOTE ════════════════════════════════════════════════════ */}
        <section className="py-32 md:py-40 max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16">
          <div ref={pullRef} className="max-w-4xl mx-auto">
            <div className="w-10 h-px bg-gradient-to-r from-violet-500 to-transparent mb-10" />
            <blockquote className="text-[28px] sm:text-[36px] md:text-[46px] leading-[1.3] tracking-[-0.05em] text-white/80 font-light mb-10">
              "Creators lose{' '}
              <span className="text-white font-semibold">80% of their time</span>
              {' '}to manual repurposing. CreatorOS turns one upload into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-semibold">
                30+ native pieces
              </span>
              {' '}in minutes."
            </blockquote>
            <p className="text-[12px] uppercase tracking-[0.3em] text-white/25 font-medium">
              — CreatorOS team
            </p>
          </div>
        </section>

        {/* ══ CHAPTERS ══════════════════════════════════════════════════════ */}
        <section className="pb-32 md:pb-40 max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16">

          {/* Section label */}
          <div className="flex items-center gap-4 mb-20">
            <div className="w-6 h-px bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.32em] text-white/25">
              Our principles
            </span>
          </div>

          <div ref={chaptersRef} className="space-y-0">
            {chapters.map((chapter, idx) => (
              <div
                key={idx}
                className="chapter-row group grid grid-cols-[64px_1fr] md:grid-cols-[120px_1fr_auto] gap-8 md:gap-16 py-12 md:py-14 border-t border-white/[0.06] transition-all duration-500 hover:border-white/[0.12] items-start"
              >
                {/* Number + bar */}
                <div className="flex flex-col items-center gap-3 pt-1">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/18 font-medium">
                    {chapter.num}
                  </span>
                  <div className={`w-px h-16 ${chapter.bar} opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />
                </div>

                {/* Body */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`text-[10px] uppercase tracking-[0.26em] font-medium ${chapter.accent} opacity-70`}
                    >
                      {chapter.tag}
                    </span>
                  </div>
                  <h2 className="text-[28px] sm:text-[36px] md:text-[44px] leading-[1.1] tracking-[-0.06em] font-semibold text-white group-hover:text-white transition-colors duration-300">
                    {chapter.heading}
                  </h2>
                  <p className="text-[15px] md:text-[17px] leading-[1.9] text-white/42 max-w-2xl group-hover:text-white/55 transition-colors duration-500">
                    {chapter.body}
                  </p>
                </div>

                {/* Index tag — desktop only */}
                <div className="hidden md:flex items-start pt-1">
                  <span className={`text-[96px] font-bold tracking-[-0.08em] leading-none text-transparent bg-clip-text bg-gradient-to-b ${idx === 0 ? 'from-violet-500/20 to-transparent' : idx === 1 ? 'from-indigo-500/20 to-transparent' : 'from-cyan-500/20 to-transparent'} select-none`}>
                    {chapter.num}
                  </span>
                </div>
              </div>
            ))}
            {/* Last border */}
            <div className="border-t border-white/[0.06]" />
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════════════════════════════ */}
        <section className="pb-40 md:pb-52 max-w-[1500px] mx-auto px-6 sm:px-8 lg:px-16">
          <div
            ref={ctaRef}
            className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-14 md:p-20 text-center shadow-[0_0_80px_rgba(255,255,255,0.04)]"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/[0.08] via-transparent to-cyan-500/[0.08] pointer-events-none rounded-[32px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none rounded-[32px]" />

            <div className="relative z-10">
              <p className="text-[11px] uppercase tracking-[0.32em] text-white/25 mb-8 font-medium">
                Start with intent
              </p>
              <h2 className="text-[40px] sm:text-[58px] md:text-[74px] leading-[0.9] tracking-[-0.07em] font-semibold mb-8">
                Join the waitlist.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400">
                  Ship with precision.
                </span>
              </h2>
              <p className="text-[15px] md:text-[17px] leading-[2] text-white/40 max-w-lg mx-auto mb-12">
                Be among the first creators to publish 30+ premium outputs from a single upload.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[14px] font-semibold tracking-tight hover:from-violet-500 hover:to-indigo-500 transition-all duration-300 hover:shadow-[0_0_50px_rgba(139,92,246,0.45)] hover:-translate-y-[2px]"
                >
                  Get early access
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/"
                  className="text-[13px] text-white/35 hover:text-white/65 transition-colors duration-300 tracking-wide"
                >
                  ← Back to home
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom divider */}
        <div className="flex items-center justify-center gap-4 pb-8 text-[10px] uppercase tracking-[0.32em] text-white/15">
          <div className="w-16 h-px bg-white/[0.06]" />
          Built for the creator economy
          <div className="w-16 h-px bg-white/[0.06]" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
