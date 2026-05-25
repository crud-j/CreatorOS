import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowRight, FiZap } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content entrance
      gsap.fromTo(contentRef.current?.children ?? [],
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        }
      );

      // Slow floating blobs
      gsap.to('.cta-blob-1', {
        y: -40,
        x: 20,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.cta-blob-2', {
        y: 30,
        x: -15,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });
      gsap.to('.cta-blob-3', {
        y: -20,
        x: 30,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 4,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="py-28 bg-transparent relative overflow-hidden z-20">
      {/* Animated blobs */}
      <div className="cta-blob-1 absolute top-10 left-1/4 w-[400px] h-[400px] bg-pink-600/12 blur-[130px] rounded-full pointer-events-none" />
      <div className="cta-blob-2 absolute bottom-10 right-1/4 w-[350px] h-[350px] bg-indigo-600/12 blur-[120px] rounded-full pointer-events-none" />
      <div className="cta-blob-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-purple-600/8 blur-[140px] rounded-full pointer-events-none" />

      {/* Decorative grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <div ref={contentRef}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 mb-8">
            <FiZap className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-xs font-bold text-white/60 tracking-wider uppercase">
              Free forever on starter
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Start turning one video
            <br />
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent">
              into a week of content
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-base md:text-lg text-white/50 leading-relaxed mb-10 max-w-xl mx-auto">
            Join 2,400+ creators already shipping more content in less time. No credit card. No contracts. Just results.
          </p>

          {/* Email form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-4 rounded-2xl bg-white/[0.05] border border-white/15 text-white placeholder-white/25 text-sm focus:outline-none focus:border-pink-500/60 focus:bg-white/[0.08] transition-all duration-300"
              />
              <button
                type="submit"
                className="group flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-bold transition-all duration-300 hover:from-pink-400 hover:to-rose-400 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                Get started free
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 max-w-md mx-auto mb-6">
              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-emerald-400 font-semibold">You're in! Check your inbox for next steps.</span>
            </div>
          )}

          {/* Micro-trust line */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/25">
            <span>5 free runs / month</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>No credit card required</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>Cancel any time</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>GDPR compliant</span>
          </div>

        </div>
      </div>
    </section>
  );
}
