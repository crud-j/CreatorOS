
import { useEffect, useRef, useState } from 'react';
import gsapActual from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiCheck } from 'react-icons/fi';

const gsapInstance = gsapActual;
gsapInstance.registerPlugin(ScrollTrigger);

const plans = [
  {
    tier: 'Free',
    price: { monthly: 0, annual: 0 },
    desc: 'Best for beginners looking to start their journey with AI video generation.',
    cta: 'Get Started',
    features: [
      '5 video runs / month',
      '30 outputs per run',
      'Brand voice training',
      'Manual scheduling',
      'Basic analytics',
    ],
    featured: false,
  },
  {
    tier: 'Pro',
    price: { monthly: 98, annual: 79 },
    desc: 'Best for creators looking to grow their audience in stable and secure way.',
    cta: 'Get Started',
    features: [
      'Unlimited video runs',
      'UiPath autopilot publish',
      'Smart content calendar',
      'Full analytics dashboard',
      'Weekly AI coach report',
    ],
    featured: true,
  },
  {
    tier: 'Agency',
    price: { monthly: 124, annual: 99 },
    desc: 'Best for professionals looking to scale their production with all features we offer.',
    cta: 'Get Started',
    features: [
      '10 creator workspaces',
      'Everything in Pro',
      'White-label reports',
      'Team collaboration',
      'Priority support (SLA)',
    ],
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [annual, setAnnual] = useState(false);

  useEffect(() => {
    const ctx = gsapInstance.context(() => {
      gsapInstance.fromTo(
        headingRef.current?.children ?? [],
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      if (gridRef.current) {
        const cards =
          gridRef.current.querySelectorAll(
            '.pricing-card'
          );

        gsapInstance.set(cards, {
          opacity: 0,
          y: 80,
          rotateX: 8,
          transformPerspective: 1200,
        });

        gsapInstance.to(cards, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.4,
          stagger: 0.12,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 78%',
            once: true,
          },
        });
      }

      gsapInstance.to(
        '.pricing-ambient-glow',
        {
          yPercent: -18,
          scale: 1.08,
          opacity: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative overflow-hidden bg-[#020202] py-28 text-white"
    >
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 opacity-[0.22] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
          maskImage:
            'radial-gradient(circle at center top, black 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(circle at center top, black 20%, transparent 80%)',
        }}
      />

      {/* AMBIENT GLOW */}
      <div className="pricing-ambient-glow absolute top-[8%] left-1/2 -translate-x-1/2 w-[760px] h-[260px] rounded-full bg-gradient-to-r from-[#ff6b00]/25 via-transparent to-[#00ff88]/25 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8">
        {/* HEADER */}
        <div
          ref={headingRef}
          className="mb-16 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 backdrop-blur-xl">
            <span
              className={`text-[12px] font-medium transition-colors duration-300 ${
                !annual
                  ? 'text-white'
                  : 'text-white/35'
              }`}
            >
              Monthly
            </span>

            <button
              onClick={() =>
                setAnnual(!annual)
              }
              className="relative flex h-[22px] w-[46px] items-center rounded-full bg-gradient-to-r from-[#ff6b00] to-[#00ff88] px-[2px]"
            >
              <div
                className={`h-[18px] w-[18px] rounded-full bg-white transition-transform duration-300 ${
                  annual
                    ? 'translate-x-[24px]'
                    : 'translate-x-0'
                }`}
              />
            </button>

            <span
              className={`text-[12px] font-medium transition-colors duration-300 ${
                annual
                  ? 'text-white'
                  : 'text-white/35'
              }`}
            >
              Annual
            </span>
          </div>

          <h2 className="mt-8 text-center text-[34px] sm:text-[48px] lg:text-[58px] leading-[0.95] tracking-[-0.055em] font-semibold">
            Pricing designed
            <span className="block text-white/22">
              for modern creators.
            </span>
          </h2>

          <p className="mt-5 max-w-[560px] text-center text-[14px] leading-[1.9] text-white/40">
            Flexible plans built for
            creators, teams, and agencies
            scaling automated content
            systems.
          </p>
        </div>

        {/* GRID */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-5 md:grid-cols-3 items-stretch"
        >
          {plans.map((plan, idx) => {
            if (!plan.featured) {
              return (
                <div
                  key={idx}
                  className="pricing-card relative flex flex-col rounded-[22px] border border-white/[0.06] bg-white/[0.02] p-7 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:-translate-y-1"
                >
                  <div>
                    {plan.price.monthly ===
                    0 ? (
                      <h3 className="text-[38px] tracking-[-0.05em] font-semibold">
                        {plan.tier}
                      </h3>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="text-[40px] tracking-[-0.05em] font-semibold">
                          $
                          {annual
                            ? plan.price
                                .annual
                            : plan.price
                                .monthly}
                        </span>

                        <span className="mb-[8px] text-[11px] text-white/35">
                          /month
                        </span>
                      </div>
                    )}

                    <p className="mt-4 text-[13px] leading-[1.8] text-white/38">
                      {plan.desc}
                    </p>
                  </div>

                  <button className="mt-7 h-[48px] rounded-[12px] border border-white/10 bg-white/[0.03] text-[13px] font-medium text-white/70 transition-all duration-300 hover:bg-white/[0.06] hover:text-white">
                    {plan.cta}
                  </button>

                  <div className="my-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />

                    <span className="text-[9px] uppercase tracking-[0.28em] text-white/20">
                      Features
                    </span>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <ul className="space-y-4">
                    {plan.features.map(
                      (feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
                            <FiCheck className="h-2.5 w-2.5 text-white/45" />
                          </div>

                          <span className="text-[13px] text-white/42">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="pricing-card relative flex flex-col rounded-[24px] transition-all duration-500 hover:-translate-y-1 hover:scale-[1.02]"
              >
                {/* OUTER GLOW */}
                <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-[#ff6b00] to-[#00ff88] opacity-70 blur-[18px]" />

                {/* BORDER */}
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-r from-[#ff8c33] via-[#f3d96b] to-[#33ffaa] p-[1px]">
                  <div className="relative h-full rounded-[23px] bg-[#050505] overflow-hidden">
                    <div className="absolute left-0 top-0 h-[240px] w-[50%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6b00]/15 blur-[70px]" />

                    <div className="absolute right-0 top-0 h-[240px] w-[50%] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00ff88]/15 blur-[70px]" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="relative z-10 flex h-full flex-col p-8">
                  <div>
                    <div className="flex items-end gap-1">
                      <span className="text-[42px] tracking-[-0.055em] font-semibold">
                        $
                        {annual
                          ? plan.price
                              .annual
                          : plan.price
                              .monthly}
                      </span>

                      <span className="mb-[8px] text-[11px] text-white/45">
                        /month
                      </span>
                    </div>

                    <p className="mt-4 text-[13px] leading-[1.8] text-white/55">
                      {plan.desc}
                    </p>
                  </div>

                  <button className="mt-7 h-[50px] rounded-[12px] bg-white text-[13px] font-semibold text-black transition-all duration-300 hover:scale-[1.01]">
                    {plan.cta}
                  </button>

                  <div className="my-7 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />

                    <span className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                      Features
                    </span>

                    <div className="h-px flex-1 bg-white/10" />
                  </div>

                  <ul className="space-y-4">
                    {plan.features.map(
                      (feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-center gap-3"
                        >
                          <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                            <FiCheck className="h-2.5 w-2.5 text-white/60" />
                          </div>

                          <span className="text-[13px] text-white/65">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
 