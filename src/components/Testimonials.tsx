import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiStar } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "I was spending 12 hours a week repurposing content. CreatorOS cut it to under 30 minutes. I genuinely can't go back to the old way.",
    name: 'Jake Reyes',
    handle: '@jakereyes',
    platform: '84K YouTube subscribers',
    initials: 'JR',
    gradient: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-500/10',
    metric: '12h → 30min',
    metricLabel: 'per week saved',
  },
  {
    quote: "The brand voice training is scary good. My audience thought I was posting manually for three weeks before I told them. Nobody noticed.",
    name: 'Maya Kowalski',
    handle: '@mayakowalski',
    platform: '210K TikTok followers',
    initials: 'MK',
    gradient: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-500/10',
    metric: '100%',
    metricLabel: 'brand consistency score',
    featured: true,
  },
  {
    quote: "My LinkedIn went from 800 to 14,000 followers in 90 days. I attribute 80% of that to showing up consistently via CreatorOS.",
    name: 'Tom Laird',
    handle: '@tomlaird',
    platform: '14K LinkedIn connections',
    initials: 'TL',
    gradient: 'from-emerald-500 to-teal-500',
    bg: 'bg-emerald-500/10',
    metric: '800 → 14K',
    metricLabel: 'LinkedIn in 90 days',
  },
  {
    quote: "UiPath autopilot is wild. I record one video Sunday night and wake up Monday to posts going live across six platforms. It's like having a full team.",
    name: 'Sandra Park',
    handle: '@sandrapark',
    platform: '52K Instagram followers',
    initials: 'SP',
    gradient: 'from-violet-500 to-purple-500',
    bg: 'bg-violet-500/10',
    metric: '6 platforms',
    metricLabel: 'auto-published daily',
  },
  {
    quote: "I tried 4 repurposing tools before this. Nothing else nails the voice match. My newsletter open rate went up 22% because readers can't tell what I wrote vs what it wrote.",
    name: 'Alex Wu',
    handle: '@alexwutech',
    platform: '31K newsletter subscribers',
    initials: 'AW',
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-500/10',
    metric: '+22%',
    metricLabel: 'newsletter open rate',
  },
  {
    quote: "We manage 8 creator clients from one Agency dashboard. What used to take a team of 3 now runs on autopilot. CreatorOS pays for itself 10x over.",
    name: 'Rachel Singh',
    handle: '@rachelcreates',
    platform: 'Agency · 8 client brands',
    initials: 'RS',
    gradient: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-500/10',
    metric: '10×',
    metricLabel: 'ROI for agency clients',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading entrance
      gsap.fromTo(headingRef.current?.children ?? [],
        { y: 40, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );

      // Cards cascade in
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.testi-card');
        gsap.fromTo(cards,
          { y: 70, opacity: 0, scale: 0.92 },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 95%',
              once: true,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      }

      // Glow parallax
      gsap.to('.testi-glow-1', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
        y: -100,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-28 bg-transparent relative overflow-hidden z-20">
      {/* Decorative glows */}
      <div className="testi-glow-1 absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-600/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 tracking-wider uppercase mb-6">
            What creators say
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Real results from{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              real creators
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/50 leading-relaxed">
            2,400+ creators ship more content in less time. Here's what they actually say.
          </p>
        </div>

        {/* Testimonials grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className={`testi-card group relative p-7 rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 cursor-default ${
                t.featured
                  ? 'bg-white/[0.04] border-indigo-500/30 md:col-span-1'
                  : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'
              }`}
            >
              {t.featured && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/8 to-purple-500/8 pointer-events-none" />
              )}

              <div className="relative z-10 flex flex-col h-full">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm md:text-[15px] text-white/80 leading-relaxed mb-6 flex-grow font-light italic">
                  "{t.quote}"
                </p>

                {/* Metric pill */}
                <div className={`inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-xl ${t.bg} border border-white/10 mb-5`}>
                  <span className={`text-base font-black bg-gradient-to-r ${t.gradient} bg-clip-text text-transparent`}>
                    {t.metric}
                  </span>
                  <span className="text-[11px] text-white/40">{t.metricLabel}</span>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-4" />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${t.gradient} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-[11px] font-black text-white">{t.initials}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-white/40">{t.handle} · {t.platform}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {['from-blue-500 to-indigo-500','from-pink-500 to-rose-500','from-emerald-500 to-teal-500','from-amber-400 to-orange-500','from-violet-500 to-purple-500'].map((g, i) => (
                <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${g} border-2 border-black flex items-center justify-center`}>
                  <span className="text-[9px] font-bold text-white">
                    {['JR','MK','TL','SP','AW'][i]}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-sm text-white/50 ml-1">2,400+ creators</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/10" />
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm text-white/50 ml-1">4.9 / 5 average rating</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-white/10" />
          <span className="text-sm text-white/50">5 free runs / month · no credit card</span>
        </div>
      </div>
    </section>
  );
}
