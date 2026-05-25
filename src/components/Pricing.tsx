import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCheck, FiZap } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    tier: 'Free',
    price: { monthly: 0, annual: 0 },
    desc: 'Perfect for trying CreatorOS with your first few videos.',
    cta: 'Get started free',
    ctaStyle: 'border border-white/20 text-white hover:bg-white/5',
    features: [
      '5 video runs / month',
      '30 outputs per run',
      'Brand voice training',
      'Manual scheduling',
      'Basic analytics',
    ],
    gradient: 'from-white/5 to-white/[0.02]',
    border: 'border-white/10',
    glow: null,
  },
  {
    tier: 'Pro',
    price: { monthly: 29, annual: 19 },
    desc: 'For active creators publishing 3–5× per week across every platform.',
    cta: 'Start Pro — 14 days free',
    ctaStyle: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400 shadow-lg shadow-pink-500/25',
    features: [
      'Unlimited video runs',
      'UiPath autopilot publish',
      'Smart content calendar',
      'Full analytics dashboard',
      'Weekly AI coach report',
      'Trend scout (daily brief)',
      'Priority processing',
    ],
    badge: 'Most popular',
    gradient: 'from-pink-500/10 to-rose-500/10',
    border: 'border-pink-500/40',
    glow: 'rgba(236,72,153,0.12)',
    featured: true,
  },
  {
    tier: 'Agency',
    price: { monthly: 99, annual: 69 },
    desc: 'Manage up to 10 creator workspaces from one account with white-label reporting.',
    cta: 'Talk to us',
    ctaStyle: 'border border-white/20 text-white hover:bg-white/5',
    features: [
      '10 creator workspaces',
      'Everything in Pro',
      'White-label reports',
      'Team collaboration',
      'Priority support (SLA)',
      'Custom onboarding',
    ],
    gradient: 'from-indigo-500/10 to-purple-500/10',
    border: 'border-indigo-500/20',
    glow: null,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.pricing-card');
        gsap.fromTo(cards,
          { y: 70, opacity: 0, scale: 0.93 },
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
            stagger: 0.12,
            ease: 'power3.out',
          }
        );
      }

      gsap.to('.pricing-glow', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
        y: -80,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-28 bg-transparent relative overflow-hidden z-20">
      <div className="pricing-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-pink-600/8 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-pink-400 tracking-wider uppercase mb-6">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Simple,{' '}
            <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
              honest
            </span>{' '}
            pricing
          </h2>
          <p className="text-base md:text-lg text-white/50 leading-relaxed mb-8">
            No per-seat fees. No hidden usage limits. Cancel any time.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl bg-white/[0.04] border border-white/10">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                !annual ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                annual ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white/60'
              }`}
            >
              Annual
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                −35%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`pricing-card relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 ${
                plan.featured
                  ? 'bg-gradient-to-b from-pink-500/10 to-rose-500/5 shadow-2xl shadow-pink-500/10'
                  : 'bg-white/[0.02] hover:bg-white/[0.04]'
              } ${plan.border}`}
            >
              {plan.glow && (
                <div
                  className="absolute inset-0 rounded-3xl opacity-60 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top, ${plan.glow} 0%, transparent 70%)` }}
                />
              )}

              <div className="relative z-10">
                {/* Badge */}
                {plan.badge && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 mb-4">
                    <FiZap className="w-3 h-3 text-pink-400" />
                    <span className="text-[11px] font-bold text-pink-400 tracking-wide">{plan.badge}</span>
                  </div>
                )}

                {/* Tier */}
                <div className="text-xs font-bold text-white/40 tracking-widest uppercase mb-3">{plan.tier}</div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-black text-white">
                    ${annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-sm text-white/40 mb-2">/ mo</span>
                </div>
                {annual && plan.price.annual > 0 && (
                  <div className="text-xs text-white/30 mb-1">
                    billed annually · <span className="text-emerald-400 font-semibold">save ${(plan.price.monthly - plan.price.annual) * 12}/yr</span>
                  </div>
                )}

                {/* Desc */}
                <p className="text-sm text-white/50 leading-relaxed mt-3 mb-7">{plan.desc}</p>

                {/* CTA */}
                <button
                  className={`w-full py-3 rounded-2xl text-sm font-bold transition-all duration-300 mb-7 ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </button>

                {/* Divider */}
                <div className="h-px bg-white/5 mb-6" />

                {/* Features */}
                <ul className="space-y-3">
                  {plan.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                        plan.featured ? 'bg-pink-500/20' : 'bg-white/5'
                      }`}>
                        <FiCheck className={`w-2.5 h-2.5 ${plan.featured ? 'text-pink-400' : 'text-emerald-400'}`} />
                      </div>
                      <span className="text-sm text-white/65 leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-white/25 mt-10">
          All plans include SSL, 99.9% uptime SLA, and GDPR-compliant data handling. Questions?{' '}
          <a href="#" className="text-white/40 underline hover:text-white/60 transition-colors">Chat with us.</a>
        </p>
      </div>
    </section>
  );
}
