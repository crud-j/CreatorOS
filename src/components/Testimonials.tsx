/*
  PREMIUM TESTIMONIALS SECTION — FINAL REFINED VERSION

  IMPROVEMENTS:
  ✓ Much smoother GSAP motion
  ✓ Better sticky timing
  ✓ More premium spacing rhythm
  ✓ Cleaner visual hierarchy
  ✓ Better horizontal card alignment
  ✓ More balanced typography
  ✓ Better viewport composition
  ✓ More elegant card sizing
  ✓ Smoother easing curves
  ✓ More natural parallax depth
  ✓ Cleaner footer placement
  ✓ More refined luxury aesthetic
  ✓ Improved scroll experience
  ✓ Better responsive proportions
*/

import { useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Star,
} from 'lucide-react';

import gsapActual from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const gsap = gsapActual;

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "I was spending 12 hours a week repurposing content. CreatorOS reduced it to under 30 minutes. I genuinely can't go back.",
    name: 'Jake Reyes',
    handle: '@jakereyes',
    platform: '84K YouTube subscribers',
    initials: 'JR',
    metric: '12h → 30m',
    metricLabel: 'saved weekly',
  },
  {
    quote:
      'The voice training is scary accurate. My audience thought I was writing every post manually for weeks.',
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
      'My LinkedIn grew from 800 to 14,000 followers in 90 days simply because I finally posted consistently.',
    name: 'Tom Laird',
    handle: '@tomlaird',
    platform: '14K LinkedIn followers',
    initials: 'TL',
    metric: '800 → 14K',
    metricLabel: 'in 90 days',
  },
  {
    quote:
      'I record one video Sunday night and wake up Monday with content scheduled everywhere automatically.',
    name: 'Sandra Park',
    handle: '@sandrapark',
    platform: '52K Instagram followers',
    initials: 'SP',
    metric: '6 platforms',
    metricLabel: 'fully automated',
  },
];

export default function Testimonials() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const headingRef =
    useRef<HTMLDivElement>(null);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const cardsRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /**
       * HEADER REVEAL
       */
      gsap.fromTo(
        headingRef.current?.children ?? [],
        {
          opacity: 0,
          y: 32,
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

      /**
       * CARDS REVEAL
       */
      const cards =
        cardsRef.current?.querySelectorAll(
          '.testimonial-card'
        ) ?? [];

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 80,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 88%',
          },
        }
      );

      /**
       * HORIZONTAL SCROLL
       */
      if (trackRef.current) {
        const totalScroll =
          trackRef.current.scrollWidth -
          window.innerWidth;

        gsap.to(trackRef.current, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () =>
              `+=${totalScroll + 1400}`,
            scrub: 1.1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }

      /**
       * FLOATING DEPTH
       */
      cards.forEach((card: Element, i: number) => {
        gsap.to(card, {
          y: i % 2 === 0 ? -16 : 16,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (
    direction: 'left' | 'right'
  ) => {
    if (!cardsRef.current) return;

    const amount =
      window.innerWidth < 768 ? 360 : 580;

    cardsRef.current.scrollBy({
      left:
        direction === 'left'
          ? -amount
          : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative bg-black text-white overflow-hidden"
    >
      {/* HEIGHT FOR STICKY */}
      <div className="relative h-[340vh]">

        {/* STICKY CONTAINER */}
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

          {/* MAIN WRAPPER */}
          <div className="relative w-full">

            {/* HEADER */}
            <div
              ref={headingRef}
              className="relative z-20 mb-24"
            >
              <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-16">

                {/* TOP LABEL */}
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 px-5 py-2.5 mb-10">
                  <div className="w-2 h-2 rounded-full bg-white/80" />

                  <span className="text-[10px] uppercase tracking-[0.34em] text-white/38">
                    Testimonials
                  </span>
                </div>

                {/* MAIN GRID */}
                <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-24 items-end">

                  {/* LEFT */}
                  <div className="max-w-5xl">

                    <h2 className="text-[46px] sm:text-[72px] lg:text-[118px] leading-[0.86] tracking-[-0.085em] font-semibold">
                      Trusted by creators
                      <span className="block text-white/26">
                        building modern media brands.
                      </span>
                    </h2>

                    <p className="mt-10 max-w-2xl text-lg md:text-xl leading-[1.9] text-white/40">
                      Thousands of creators,
                      operators, and media teams
                      use CreatorOS to scale
                      content systems with
                      consistency, automation,
                      and operational clarity.
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-col items-start xl:items-end gap-14">

                    {/* STATS */}
                    <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                      {[
                        [
                          '4.9/5',
                          'Average rating',
                        ],
                        [
                          '2,400+',
                          'Verified reviews',
                        ],
                        [
                          '120M+',
                          'Monthly impressions',
                        ],
                        [
                          '94%',
                          'Retention increase',
                        ],
                      ].map((item, i) => (
                        <div key={i}>
                          <div className="text-[42px] font-semibold tracking-[-0.05em]">
                            {item[0]}
                          </div>

                          <div className="mt-3 text-[11px] uppercase tracking-[0.24em] text-white/28">
                            {item[1]}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CONTROLS */}
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() =>
                          scroll('left')
                        }
                        className="w-14 h-14 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
                      >
                        <ArrowLeft size={18} />
                      </button>

                      <button
                        onClick={() =>
                          scroll('right')
                        }
                        className="w-14 h-14 rounded-full border border-white/10 bg-white/[0.02] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all duration-300"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HORIZONTAL TRACK */}
            <div
              ref={trackRef}
              className="flex items-center gap-8 pl-6 sm:pl-8 lg:pl-16 pr-[12vw] will-change-transform"
            >

              {/* INTRO CARD */}
              <div className="w-[440px] md:w-[540px] h-[620px] shrink-0">
                <div className="relative h-full rounded-[42px] border border-white/10 bg-black p-14 flex flex-col justify-between overflow-hidden">

                  {/* SUBTLE LIGHT */}
                  <div className="absolute inset-x-0 top-0 h-40 bg-white/[0.015]" />

                  {/* INNER BORDER */}
                  <div className="absolute inset-0 rounded-[42px] ring-1 ring-white/[0.03]" />

                  <div className="relative z-10">
                    <span className="text-[10px] uppercase tracking-[0.32em] text-white/30">
                      Creator Stories
                    </span>

                    <h3 className="mt-8 text-[58px] leading-[0.92] tracking-[-0.07em] font-semibold">
                      Real growth.
                      <span className="block text-white/26">
                        Real systems.
                      </span>
                    </h3>
                  </div>

                  <p className="relative z-10 text-lg leading-[1.9] text-white/38 max-w-[90%]">
                    Scroll horizontally to
                    explore how modern creators
                    use CreatorOS to automate
                    workflows and scale content
                    operations.
                  </p>
                </div>
              </div>

              {/* CARDS */}
              <div
                ref={cardsRef}
                className="flex items-center gap-8"
              >
                {testimonials.map((t, idx) => (
                  <div
                    key={idx}
                    className={`testimonial-card relative overflow-hidden w-[400px] md:w-[560px] h-[620px] shrink-0 rounded-[42px] border bg-black p-12 md:p-14 flex flex-col transition-all duration-500 ${t.featured
                        ? 'border-white/18'
                        : 'border-white/10'
                      } hover:border-white/20`}
                  >

                    {/* TOP LIGHT */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-white/[0.015]" />

                    {/* INNER BORDER */}
                    <div className="absolute inset-0 rounded-[42px] ring-1 ring-white/[0.03]" />

                    {/* CONTENT */}
                    <div className="relative z-10 flex flex-col h-full">

                      {/* STARS */}
                      <div className="flex items-center gap-1 mb-12">
                        {[...Array(5)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-white text-white"
                            />
                          )
                        )}
                      </div>

                      {/* QUOTE */}
                      <div className="flex-1">
                        <p className="text-[31px] md:text-[38px] leading-[1.48] tracking-[-0.05em] text-white/92">
                          “{t.quote}”
                        </p>
                      </div>

                      {/* METRIC */}
                      <div className="mt-14 flex items-center gap-5">
                        <span className="text-[44px] font-semibold tracking-[-0.06em]">
                          {t.metric}
                        </span>

                        <div className="w-px h-5 bg-white/10" />

                        <span className="text-[11px] uppercase tracking-[0.28em] text-white/28">
                          {t.metricLabel}
                        </span>
                      </div>

                      {/* DIVIDER */}
                      <div className="w-full h-px bg-white/10 my-10" />

                      {/* FOOTER */}
                      <div className="flex items-center gap-5">

                        {/* AVATAR */}
                        <div className="w-16 h-16 rounded-[22px] border border-white/10 bg-white/[0.02] flex items-center justify-center text-sm font-semibold text-white/85">
                          {t.initials}
                        </div>

                        {/* USER */}
                        <div className="flex flex-col">
                          <span className="text-lg font-medium tracking-[-0.02em]">
                            {t.name}
                          </span>

                          <span className="mt-1 text-sm text-white/35">
                            {t.handle} ·{' '}
                            {t.platform}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* END SPACING */}
                <div className="w-[20vw] shrink-0" />
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-24 flex items-center justify-center gap-5 text-[10px] uppercase tracking-[0.34em] text-white/18">
              <div className="w-20 h-px bg-white/10" />

              CreatorOS powers next-generation creator workflows

              <div className="w-20 h-px bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}