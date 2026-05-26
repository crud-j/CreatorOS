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
      // Header Animation
      gsapInstance.fromTo(
        headingRef.current?.children ?? [],
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );

      // Cards Animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.pricing-card');
        gsapInstance.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
            y: 0,
            opacity: 1,
            scale: (idx) => (idx === 1 ? 1.08 : 1), // Feature card scale increased for emphasis
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      }

      // Parallax Ambient Glow
      gsapInstance.to('.pricing-ambient-glow', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
        y: -150,
        ease: 'none',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-32 bg-[#020202] text-white relative overflow-hidden z-20">

      {/* Deep Cyber Dot Matrix Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '4px 4px',
          maskImage: 'radial-gradient(circle at center top, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center top, black 20%, transparent 80%)'
        }}
      />

      {/* Volumetric Orange to Green Cinematic Ambient Glow - Refined for wider horizontal spread */}
      <div className="pricing-ambient-glow absolute top-[5%] left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-r from-[#ff6b00]/30 via-transparent to-[#00ff88]/30 blur-[120px] rounded-[100%] pointer-events-none mix-blend-screen z-0" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header & Toggle Section */}
        <div ref={headingRef} className="text-center mx-auto mb-16 relative z-10">

          {/* Precision Toggle Switch */}
          <div className="flex justify-center items-center gap-4 relative">
            <span className={`text-[13px] font-medium transition-colors duration-300 ${!annual ? 'text-white' : 'text-[#777]'}`}>
              Monthly
            </span>

            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-[44px] h-[20px] rounded-full bg-gradient-to-r from-[#ff6b00] to-[#00ff88] flex items-center px-[2px] cursor-pointer shadow-[0_0_12px_rgba(255,107,0,0.2)]"
              aria-label="Toggle Annual Billing"
            >
              <div
                className={`w-[16px] h-[16px] rounded-full bg-white shadow-md transition-transform duration-300 ease-out ${annual ? 'translate-x-[24px]' : 'translate-x-0'
                  }`}
              />
            </button>

            <span className={`text-[13px] font-medium transition-colors duration-300 ${annual ? 'text-white' : 'text-[#777]'}`}>
              Annually
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch relative">
          {plans.map((plan, idx) => {
            if (!plan.featured) {
              return (
                <div
                  key={idx}
                  className="pricing-card relative flex flex-col rounded-[20px] bg-[#070707] border border-white/[0.03] p-8 z-0 mt-2 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]"
                >
                  <div className="mb-4">
                    {plan.price.monthly === 0 ? (
                      <h3 className="text-[44px] font-medium text-white tracking-tight mb-1">
                        {plan.tier}
                      </h3>
                    ) : (
                      <div className="flex items-baseline gap-1 mb-1 mt-1">
                        <span className="text-[42px] font-medium tracking-tight text-white">
                          ${annual ? plan.price.annual : plan.price.monthly}.00
                        </span>
                        <span className="text-[12px] font-medium text-[#777]">/month</span>
                      </div>
                    )}
                    <p className="text-[13px] text-[#777] leading-relaxed min-h-[40px] mt-3">
                      {plan.desc}
                    </p>
                  </div>

                  <button className="w-full py-[14px] rounded-[10px] text-[13px] font-semibold bg-[#111111] border border-white/[0.04] text-[#888] hover:bg-[#1a1a1a] hover:text-[#aaa] transition-colors mt-2 shadow-inner">
                    {plan.cta}
                  </button>

                  <div className="relative flex items-center justify-center my-8 opacity-60">
                    <div className="h-px bg-[#222] flex-1" />
                    <span className="px-4 text-[9px] tracking-[0.25em] text-[#555] uppercase font-bold">
                      Features
                    </span>
                    <div className="h-px bg-[#222] flex-1" />
                  </div>

                  <ul className="space-y-[16px] flex-grow">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-[16px] h-[16px] rounded-full border border-[#222] bg-[#0d0d0d] flex-shrink-0">
                          <FiCheck className="w-2.5 h-2.5 text-[#333]" />
                        </div>
                        <span className="text-[13px] text-[#555] leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className="pricing-card relative flex flex-col rounded-[24px] z-10 md:scale-[1.08] shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)]"
              >
                {/* Outer Ambient Glow - Stronger and deeper */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#ff6b00] to-[#00ff88] rounded-[24px] blur-[22px] opacity-[0.85]" />

                {/* Sharp 1.5px Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff8c33] via-[#f4e262] to-[#33ffaa] rounded-[24px] p-[1.5px]">
                  {/* Inner background block */}
                  <div className="absolute inset-[1.5px] bg-[#050505] rounded-[22.5px] overflow-hidden">
                    {/* Soft Inner wash - Split into distinct corner lights for 3D depth */}
                    <div className="absolute top-0 left-0 w-[60%] h-[300px] bg-[#ff6b00]/15 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-0 right-0 w-[60%] h-[300px] bg-[#00ff88]/15 blur-[60px] rounded-full translate-x-1/2 -translate-y-1/2" />

                    {/* Noise Texture */}
                    <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="relative p-10 flex flex-col h-full z-10">
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1 mb-1 mt-1">
                      <span className="text-[44px] font-medium tracking-tight text-white drop-shadow-md">
                        ${annual ? plan.price.annual : plan.price.monthly}.00
                      </span>
                      <span className="text-[12px] font-medium text-neutral-400">/month</span>
                    </div>
                    <p className="text-[13px] text-[#ddd] leading-relaxed min-h-[40px] mt-3 drop-shadow-sm">
                      {plan.desc}
                    </p>
                  </div>

                  <button className="w-full py-[14px] rounded-[10px] text-[13px] font-semibold text-black bg-gradient-to-b from-[#ffffff] to-[#e6e6e6] shadow-[0_0_24px_rgba(255,255,255,0.4)] transition-all hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(255,255,255,0.6)] mt-2">
                    {plan.cta}
                  </button>

                  <div className="relative flex items-center justify-center my-8 opacity-90">
                    <div className="h-px bg-[#333] flex-1" />
                    <span className="px-4 text-[9px] tracking-[0.25em] text-[#777] uppercase font-bold">
                      Features
                    </span>
                    <div className="h-px bg-[#333] flex-1" />
                  </div>

                  <ul className="space-y-[16px] flex-grow">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-[16px] h-[16px] rounded-full border border-[#444] bg-[#1a1a1a] flex-shrink-0 shadow-inner">
                          <FiCheck className="w-2.5 h-2.5 text-[#999]" />
                        </div>
                        <span className="text-[13.5px] text-[#aaa] leading-snug font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
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