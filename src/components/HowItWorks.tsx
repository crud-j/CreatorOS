import { useEffect, useRef } from 'react';
import gsapActual from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const gsapInstance = gsapActual;
gsapInstance.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01',
    title: 'Upload your content',
    desc:
      'Paste a YouTube link, upload a podcast, or drop in raw media files. CreatorOS automatically structures and prepares every format for distribution.',
    footer: 'YouTube · Podcasts · MP4 · Audio',
    glow: 'from-orange-500/20 to-transparent',
  },
  {
    num: '02',
    title: 'Train your voice',
    desc:
      'The AI learns your tone, pacing, formatting patterns, and writing style so every generated asset feels authentically yours.',
    footer: 'Adaptive AI · One-time setup',
    glow: 'from-amber-400/20 to-transparent',
  },
  {
    num: '03',
    title: 'Generate platform-native content',
    desc:
      'Instantly create tweet threads, LinkedIn posts, captions, newsletters, hooks, scripts, and multi-platform content systems.',
    footer: '30+ outputs generated instantly',
    glow: 'from-emerald-400/20 to-transparent',
  },
  {
    num: '04',
    title: 'Publish & optimize automatically',
    desc:
      'Schedule, distribute, and optimize content workflows while CreatorOS continuously improves performance using engagement data.',
    footer: 'Automated publishing engine',
    glow: 'from-cyan-400/20 to-transparent',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsapInstance.context(() => {

      // Heading animation
      gsapInstance.fromTo(
        headingRef.current?.children ?? [],
        {
          y: 40,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      // Cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.step-card');

        gsapInstance.fromTo(
          cards,
          {
            y: 60,
            opacity: 0,
            scale: 0.96,
          },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      }

      // Ambient floating gradients
      gsapInstance.to('.ambient-gradient-left', {
        y: -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
      });

      gsapInstance.to('.ambient-gradient-right', {
        y: 120,
        scrollTrigger: {
          trigger: sectionRef.current,
          scrub: 1,
          start: 'top bottom',
          end: 'bottom top',
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative overflow-hidden bg-black py-32 lg:py-40 text-white"
    >

      {/* Ambient Background Gradients */}
      <div className="ambient-gradient-left absolute -top-40 left-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/10 blur-[140px] pointer-events-none" />

      <div className="ambient-gradient-right absolute bottom-[-200px] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[140px] pointer-events-none" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_45%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <div
          ref={headingRef}
          className="max-w-4xl mx-auto text-center mb-28"
        >

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 backdrop-blur-xl mb-8">
            <div className="w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_12px_rgba(251,146,60,0.8)]" />

            <span className="text-[11px] uppercase tracking-[0.3em] text-white/50 font-medium">
              How It Works
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-7xl lg:text-[82px] font-semibold tracking-[-0.06em] leading-[0.92]">
            Turn one piece of content
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">
              into an entire content engine.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-white/50">
            CreatorOS transforms long-form content into premium,
            platform-native distribution systems — optimized for every
            channel automatically.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="step-card group relative rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-2xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:-translate-y-1"
            >

              {/* Gradient Hover Glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${step.glow}`}
              />

              {/* Inner Top Light */}
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/[0.04] to-transparent opacity-60" />

              {/* Large Number */}
              <div className="absolute top-6 right-6 text-[90px] font-semibold tracking-[-0.08em] text-white/[0.04] select-none leading-none">
                {step.num}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full p-8 lg:p-10">

                {/* Top Line */}
                <div className="w-12 h-px bg-gradient-to-r from-white/60 to-transparent mb-10 transition-all duration-500 group-hover:w-20" />

                {/* Step */}
                <div className="mb-8">
                  <span className="text-[11px] uppercase tracking-[0.3em] text-white/35 font-medium">
                    Step {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-medium tracking-tight leading-tight text-white mb-5 max-w-[260px]">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-7 text-white/50 flex-grow">
                  {step.desc}
                </p>

                {/* Divider */}
                <div className="mt-12 pt-6 border-t border-white/10">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/30">
                    {step.footer}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-28 text-center">
          <div className="inline-flex items-center gap-3 text-white/25 text-xs uppercase tracking-[0.35em]">
            <div className="w-12 h-px bg-white/10" />

            Built for modern creators & media teams

            <div className="w-12 h-px bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}