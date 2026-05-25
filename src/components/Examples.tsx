import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FiInstagram, FiTwitter, FiLinkedin, FiMail,
  FiYoutube, FiBookOpen
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const outputs = [
  {
    platform: 'Reels Script',
    icon: <FiInstagram className="w-4 h-4" />,
    color: 'from-pink-500 to-rose-500',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
    glow: 'rgba(236,72,153,0.15)',
    preview: `"I launched with zero followers and $0 revenue. Here's the thing nobody tells you about building in public..."`,
    tag: 'Hook · 45 sec · Reels format',
  },
  {
    platform: 'Tweet Thread',
    icon: <FiTwitter className="w-4 h-4" />,
    color: 'from-sky-400 to-blue-500',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    glow: 'rgba(56,189,248,0.15)',
    preview: `1/ I've been building my SaaS publicly for 90 days. The raw numbers, the brutal lessons, and what actually moved the needle...`,
    tag: '12-tweet thread · Engagement-optimized',
  },
  {
    platform: 'LinkedIn Essay',
    icon: <FiLinkedin className="w-4 h-4" />,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    glow: 'rgba(99,102,241,0.15)',
    preview: `Six months ago I made a decision that felt stupid at the time: I decided to show my work before it was ready. Here's what happened...`,
    tag: '~600 words · Authority tone',
  },
  {
    platform: 'Newsletter Section',
    icon: <FiMail className="w-4 h-4" />,
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    glow: 'rgba(251,191,36,0.15)',
    preview: `This week's big lesson: transparency is a growth strategy, not just a personality trait. Let me show you the receipts...`,
    tag: 'Substack-ready · Personal tone',
  },
  {
    platform: 'YT Community Post',
    icon: <FiYoutube className="w-4 h-4" />,
    color: 'from-red-500 to-rose-600',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    glow: 'rgba(239,68,68,0.15)',
    preview: `Dropped a new episode. One insight that changed how I think about audience growth — timestamps in the comments 👇`,
    tag: 'Community post · CTR-optimized',
  },
  {
    platform: 'Pinterest Caption',
    icon: <FiBookOpen className="w-4 h-4" />,
    color: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    glow: 'rgba(168,85,247,0.15)',
    preview: `Building in public: the raw strategy that took me from 0 to 14K followers in 90 days. Save this for your next launch...`,
    tag: 'SEO keywords · Discovery format',
  },
];

export default function Examples() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge + heading reveal
      gsap.fromTo([chipRef.current, headingRef.current?.children],
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

      // Cards stagger in
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.output-card');
        gsap.fromTo(cards,
          { y: 60, opacity: 0, scale: 0.94 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 95%',
              once: true,
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          }
        );
      }

      // Floating glow parallax
      gsap.to('.examples-glow-1', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -80,
        ease: 'none',
      });
      gsap.to('.examples-glow-2', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
        y: 80,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="examples" className="py-28 bg-transparent relative overflow-hidden z-20">
      {/* Decorative glows */}
      <div className="examples-glow-1 absolute top-20 left-1/4 w-[500px] h-[500px] bg-pink-600/8 blur-[140px] rounded-full pointer-events-none" />
      <div className="examples-glow-2 absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div ref={chipRef}>
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-pink-400 tracking-wider uppercase mb-6">
              Examples
            </span>
          </div>
          <div ref={headingRef}>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
              What comes out of one&nbsp;
              <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                20-minute video
              </span>
            </h2>
            <p className="text-base md:text-lg text-white/50 leading-relaxed">
              From a single podcast episode on "building in public" — here's everything CreatorOS generates, ready to post across every channel.
            </p>
          </div>
        </div>

        {/* Source pill */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
            <span className="text-sm text-white/60">Input: <span className="text-white font-medium">"Building in public" — Episode 47 · 22 min · Podcast</span></span>
            <span className="text-xs text-emerald-400 font-bold px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/20 ml-2">
              30 outputs generated
            </span>
          </div>
        </div>

        {/* Output cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {outputs.map((item, idx) => (
            <div
              key={idx}
              className={`output-card group relative p-6 rounded-3xl bg-white/[0.02] border ${item.border} backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:-translate-y-1 cursor-default`}
              style={{ '--glow-color': item.glow } as React.CSSProperties}
            >
              {/* Hover glow overlay */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at center, ${item.glow} 0%, transparent 70%)` }}
              />

              <div className="relative z-10">
                {/* Platform label */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-7 h-7 rounded-lg ${item.bg} flex items-center justify-center`}>
                    <span className={`bg-gradient-to-br ${item.color} bg-clip-text text-transparent`}>
                      {item.icon}
                    </span>
                  </div>
                  <span className={`text-xs font-bold tracking-wider uppercase bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.platform}
                  </span>
                </div>

                {/* Preview text */}
                <p className="text-sm text-white/75 leading-relaxed mb-5 font-light italic line-clamp-3">
                  {item.preview}
                </p>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-4" />

                {/* Tag */}
                <span className="text-[11px] text-white/30 tracking-wide font-medium">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom summary row */}
        <div className="mt-14 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { label: '30+', sub: 'outputs per video' },
            { label: '6', sub: 'platforms covered' },
            { label: '4 min', sub: 'generation time' },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4 py-5 rounded-2xl bg-white/[0.02] border border-white/10">
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-white/40 tracking-wide">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
