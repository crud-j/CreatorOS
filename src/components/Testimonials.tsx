'use client';

import { useEffect, useRef } from 'react';

import { ArrowLeft, ArrowRight, Star } from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'CreatorOS reduced our weekly content workflow from 12 hours to under 30 minutes.',
    name: 'Jake Reyes',
    handle: '@jakereyes',
    platform: '84K YouTube subscribers',
    initials: 'JR',
    metric: '12h → 30m',
    metricLabel: 'saved weekly',
  },
  {
    quote:
      'The AI voice training is frighteningly accurate. My audience never noticed the automation.',
    name: 'Maya Kowalski',
    handle: '@mayakowalski',
    platform: '210K TikTok followers',
    initials: 'MK',
    metric: '100%',
    metricLabel: 'brand consistency',
    featured: true,
  },
  {
    quote:
      'We scaled from 800 to 14K followers in under 90 days with consistent publishing.',
    name: 'Tom Laird',
    handle: '@tomlaird',
    platform: '14K LinkedIn followers',
    initials: 'TL',
    metric: '14K',
    metricLabel: 'followers gained',
  },
  {
    quote:
      'One recording session now powers every platform automatically throughout the week.',
    name: 'Sandra Park',
    handle: '@sandrapark',
    platform: '52K Instagram followers',
    initials: 'SP',
    metric: '6 Platforms',
    metricLabel: 'fully automated',
  },
  {
    quote:
      'Our publishing output tripled without increasing team size.',
    name: 'Lena Morris',
    handle: '@lenamorris',
    platform: 'Creative Director',
    initials: 'LM',
    metric: '3x',
    metricLabel: 'content output',
  },
  {
    quote:
      'We finally built a scalable creator workflow instead of relying on chaotic manual systems.',
    name: 'David Chen',
    handle: '@davidchen',
    platform: 'Startup Founder',
    initials: 'DC',
    metric: '94%',
    metricLabel: 'workflow efficiency',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      /*
        HEADER REVEAL
      */
      gsap.fromTo(
        headingRef.current?.children ?? [],
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
          },
        }
      );

      const cards = gsap.utils.toArray<HTMLElement>('.testimonial-card');

      /*
        MOBILE ANIMATION
      */
      if (isMobile) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            },
          }
        );

        return;
      }

      /*
        HORIZONTAL CINEMATIC SCROLL
      */
      const totalScroll = trackRef.current!.scrollWidth - window.innerWidth;
      const scrollDistance = Math.max(totalScroll, 1);

      const horizontalTween = gsap.to(trackRef.current, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: 3.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (cards.length - 1),
            duration: {
              min: 0.45,
              max: 0.9,
            },
            delay: 0,
            ease: 'power3.out',
          },
          fastScrollEnd: true,
        },
      });

      /*
        INITIAL CARD STATE
      */
      gsap.set(cards, {
        opacity: 0.38,
        scale: 0.97,
      });

      /*
        ACTIVE CARD SYSTEM
      */
      cards.forEach((card: HTMLElement) => {
        ScrollTrigger.create({
          trigger: card,
          containerAnimation: horizontalTween,
          start: 'left center',
          end: 'right center',
          onToggle: (self) => {
            gsap.to(card, {
              opacity: self.isActive ? 1 : 0.4,
              scale: self.isActive ? 1 : 0.97,
              y: self.isActive ? -2 : 0,
              duration: 1,
              ease: 'expo.out',
              overwrite: 'auto',
            });
          },
        });
      });

      /*
        SUBTLE FLOATING DEPTH
      */
      cards.forEach((card: HTMLElement, i: number) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -6 : 6,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            containerAnimation: horizontalTween,
            scrub: 3,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!cardsRef.current) return;

    const amount = window.innerWidth < 768 ? 280 : 420;

    cardsRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[10%] h-[700px] w-[700px] rounded-full bg-white/[0.02] blur-[180px]" />

        <div className="absolute bottom-[-10%] right-[10%] h-[650px] w-[650px] rounded-full bg-white/[0.018] blur-[180px]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_60%)]" />
      </div>

      <div className="relative flex min-h-screen w-full flex-col justify-center">
        <div className="relative w-full py-24 md:py-0">
          {/* HEADER */}
          <div ref={headingRef} className="relative z-20 mb-20">
            <div className="mx-auto max-w-[1400px] px-6 sm:px-8 lg:px-16">
              {/* LABEL */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 backdrop-blur-2xl">
                <div className="h-1.5 w-1.5 rounded-full bg-white/80" />

                <span className="text-[10px] uppercase tracking-[0.34em] text-white/38">
                  Testimonials
                </span>
              </div>

              {/* GRID */}
              <div className="mt-10 grid items-end gap-14 xl:grid-cols-[1.05fr_0.95fr]">
                {/* LEFT */}
                <div className="max-w-3xl">
                  <h2 className="text-[30px] sm:text-[46px] lg:text-[56px] leading-[0.95] tracking-[-0.055em] font-semibold">
                    Trusted by creators
                    <span className="block text-white/20">
                      building scalable
                      systems.
                    </span>
                  </h2>

                  <p className="mt-6 max-w-xl text-[14px] leading-[1.9] text-white/40">
                    CreatorOS helps modern
                    creators automate
                    workflows, scale content
                    systems, and publish
                    consistently across every
                    platform.
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col items-start gap-10 xl:items-end">
                  {/* STATS */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-7">
                    {[
                      ['4.9/5', 'Average rating'],
                      ['2,400+', 'Verified reviews'],
                      ['120M+', 'Monthly reach'],
                      ['94%', 'Retention increase'],
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="text-[26px] font-semibold tracking-[-0.05em]">
                          {item[0]}
                        </div>

                        <div className="mt-2 text-[10px] uppercase tracking-[0.28em] text-white/22">
                          {item[1]}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CONTROLS */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => scroll('left')}
                      className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/40 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:text-white"
                    >
                      <ArrowLeft
                        size={16}
                        className="transition-transform duration-500 group-hover:-translate-x-1"
                      />
                    </button>

                    <button
                      onClick={() => scroll('right')}
                      className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/40 backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:text-white"
                    >
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TRACK */}
          <div
            ref={trackRef}
            className="flex items-center gap-6 px-6 sm:px-8 lg:px-16 will-change-transform"
          >
            {/* INTRO CARD */}
            <div className="h-[320px] w-[280px] md:w-[300px] shrink-0">
              <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl">
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.06] to-transparent" />

                <div className="relative z-10">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/28">
                    Creator Stories
                  </span>

                  <h3 className="mt-5 text-[28px] leading-[0.98] tracking-[-0.055em] font-semibold">
                    Real growth.
                    <span className="block text-white/20">
                      Real systems.
                    </span>
                  </h3>
                </div>

                <p className="relative z-10 text-[12.5px] leading-[1.8] text-white/36">
                  Explore how modern creators
                  scale content operations
                  through automation and
                  publishing consistency.
                </p>
              </div>
            </div>

            {/* TESTIMONIALS */}
            <div ref={cardsRef} className="flex items-center gap-6">
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className={`testimonial-card group relative flex h-[320px] w-[280px] md:w-[300px] shrink-0 flex-col overflow-hidden rounded-[24px] border bg-white/[0.03] p-6 backdrop-blur-2xl transition-all duration-700 ${
                    t.featured ? 'border-white/18' : 'border-white/10'
                  }`}
                >
                  {/* LIGHT */}
                  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.06] to-transparent" />

                  {/* GLOW */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />

                  {/* CONTENT */}
                  <div className="relative z-10 flex h-full flex-col">
                    {/* STARS */}
                    <div className="mb-5 flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-white text-white" />
                      ))}
                    </div>

                    {/* QUOTE */}
                    <div className="flex-1">
                      <p className="text-[15px] md:text-[17px] leading-[1.6] tracking-[-0.04em] text-white/90">
                        “{t.quote}”
                      </p>
                    </div>

                    {/* METRIC */}
                    <div className="mt-6 flex items-center gap-3">
                      <span className="text-[18px] font-semibold tracking-[-0.04em]">
                        {t.metric}
                      </span>

                      <div className="h-4 w-px bg-white/10" />

                      <span className="text-[9px] uppercase tracking-[0.25em] text-white/24">
                        {t.metricLabel}
                      </span>
                    </div>

                    {/* DIVIDER */}
                    <div className="my-4 h-px w-full bg-white/10" />

                    {/* FOOTER */}
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/10 bg-white/[0.03] text-[10px] font-semibold text-white/85">
                        {t.initials}
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[12.5px] font-medium tracking-[-0.02em]">
                          {t.name}
                        </span>

                        <span className="mt-1 text-[9px] text-white/34">
                          {t.handle} · {t.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FOOTER */}
          <div className="mt-20 flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.34em] text-white/14">
            <div className="h-px w-14 bg-white/10" />

            CreatorOS powers modern creator
            operations

            <div className="h-px w-14 bg-white/10" />
          </div>

          {/* EXIT SPACING */}
          <div className="h-[28vh] md:h-[38vh]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
