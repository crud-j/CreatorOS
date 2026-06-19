'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Sparkles,
} from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqCategories = [
  {
    id: 'general',
    label: 'General',
    items: [
      {
        q: 'Does it actually sound like me, or does it sound like AI?',
        a: 'CreatorOS trains a voice profile from your own writing samples and runs every output through advanced brand consistency refinement systems. Most audiences genuinely cannot tell the difference.',
      },

      {
        q: 'How does the brand voice training work?',
        a: 'You upload examples of your content and CreatorOS extracts vocabulary, cadence, sentence rhythm, CTA behavior, and stylistic patterns into a personalized voice model.',
      },
    ],
  },

  {
    id: 'features',
    label: 'Features',
    items: [
      {
        q: 'Which platforms does the autopilot support?',
        a: 'Instagram, LinkedIn, X/Twitter, YouTube, Facebook Pages, Pinterest, and TikTok scheduling workflows.',
      },

      {
        q: 'Can I edit outputs before publishing?',
        a: 'Yes. Every output can be edited, regenerated, refined, or rejected before going live.',
      },

      {
        q: 'What video formats are supported?',
        a: 'MP4, MOV, MP3, YouTube URLs, podcasts, Loom recordings, and long-form uploads up to 4 hours.',
      },
    ],
  },

  {
    id: 'privacy',
    label: 'Privacy',
    items: [
      {
        q: 'Is my data used to train AI models?',
        a: 'No. Your uploads, voice profile, and generated outputs remain private and are never used for public model training.',
      },

      {
        q: 'How secure is CreatorOS?',
        a: 'CreatorOS uses encrypted storage systems, secure cloud processing, and isolated workspace environments for every organization.',
      },
    ],
  },

  {
    id: 'billing',
    label: 'Billing',
    items: [
      {
        q: 'What happens if I exceed my plan limits?',
        a: 'Free plans pause additional runs until renewal or upgrade. Pro plans include unlimited workflow executions.',
      },

      {
        q: 'Can I cancel anytime?',
        a: 'Yes. You can cancel, pause, or upgrade your subscription at any time directly from your dashboard.',
      },
    ],
  },
];

export default function FAQ() {
  const sectionRef =
    useRef<HTMLElement>(null);

  const headingRef =
    useRef<HTMLDivElement>(null);

  const itemsRef =
    useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] =
    useState(faqCategories[0].id);

  const [openIdx, setOpenIdx] =
    useState<number | null>(0);

  const activeData =
    faqCategories.find(
      (c) => c.id === activeCategory
    )?.items || [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      /*
        HEADER ANIMATION
      */
      gsap.fromTo(
        headingRef.current?.children ?? [],
        {
          opacity: 0,
          y: 40,
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

      /*
        FAQ ITEMS REVEAL
      */
      gsap.fromTo(
        '.faq-item',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemsRef.current,
            start: 'top 88%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative overflow-hidden bg-black py-32 md:py-40 text-white"
    >
      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* AMBIENT LIGHTING */}
        <div className="absolute top-[-15%] left-[10%] w-200 h-200 rounded-full bg-white/[0.035] blur-[180px]" />

        <div className="absolute bottom-[-20%] right-[5%] w-175 h-175 rounded-full bg-white/[0.025] blur-[180px]" />

        {/* RADIAL LIGHT */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />

        {/* PREMIUM DOT GRID */}
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

        {/* PREMIUM DOT GRID */}
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

        {/* VIGNETTE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.5)_100%)]" />

        {/* TOP FADE */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-linear-to-b from-black via-black/70 to-transparent" />

        {/* BOTTOM FADE */}
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-linear-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* MAIN */}
      <div className="relative z-10 max-w-375 mx-auto px-6 sm:px-8 lg:px-16">

        {/* HEADER */}
        <div
          ref={headingRef}
          className="mb-24 md:mb-32"
        >

          {/* LABEL */}
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 backdrop-blur-2xl px-5 py-2 mb-10 shadow-[0_0_60px_rgba(255,255,255,0.03)]">

            <Sparkles className="w-3.5 h-3.5 text-white/70" />

            <span className="text-[10px] uppercase tracking-[0.34em] text-white/38">
              Support & Knowledge
            </span>
          </div>

          {/* GRID */}
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-16 lg:gap-24 items-end">

            {/* LEFT */}
            <div className="max-w-4xl">

              <h2 className="text-[42px] sm:text-[64px] lg:text-[92px] leading-[0.9] tracking-[-0.08em] font-semibold">

                Frequently
                <span className="block text-white/18">
                  asked questions.
                </span>
              </h2>
            </div>

            {/* RIGHT */}
            <div>

              <p className="max-w-xl text-[15px] md:text-[17px] leading-loose text-white/42">
                Everything you need to know
                about CreatorOS, publishing
                systems, automation workflows,
                brand voice intelligence,
                privacy, and scaling modern
                creator operations.
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-16 lg:gap-28">

          {/* SIDEBAR */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">

            {faqCategories.map((category) => {
              const active =
                activeCategory ===
                category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(
                      category.id
                    );

                    setOpenIdx(0);
                  }}
                  className={`group relative shrink-0 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-all duration-500
                  ${active
                      ? 'border-white/20 bg-white text-black shadow-[0_0_80px_rgba(255,255,255,0.08)]'
                      : 'border-white/10 bg-white/2 text-white/40 hover:text-white hover:bg-white/4'
                    }
                  `}
                >

                  {/* ACTIVE LIGHT */}
                  {active && (
                    <div className="absolute inset-0 bg-linear-to-b from-white to-white/90" />
                  )}

                  <span className="relative z-10 text-[13px] font-medium tracking-[-0.02em] whitespace-nowrap">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* FAQ ITEMS */}
          <div
            ref={itemsRef}
            className="flex flex-col"
          >
            {activeData.map((faq, idx) => {
              const isOpen =
                openIdx === idx;

              return (
                <div
                  key={idx}
                  className="faq-item group border-b border-white/[0.08]"
                >

                  {/* BUTTON */}
                  <button
                    onClick={() =>
                      setOpenIdx(
                        isOpen
                          ? null
                          : idx
                      )
                    }
                    className="w-full flex items-start justify-between gap-8 py-8 md:py-10 text-left"
                  >

                    {/* QUESTION */}
                    <div className="max-w-4xl">

                      <span
                        className={`block text-[22px] md:text-[30px] leading-[1.28] tracking-[-0.05em] transition-all duration-500
                        ${isOpen
                            ? 'text-white'
                            : 'text-white/70 group-hover:text-white'
                          }
                        `}
                      >
                        {faq.q}
                      </span>
                    </div>

                    {/* ICON */}
                    <div className={`relative shrink-0 w-12 h-12 rounded-2xl border flex items-center justify-center transition-all duration-500
                      ${isOpen
                        ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.08)]'
                        : 'bg-white/3 border-white/10 text-white/40 group-hover:bg-white/6 group-hover:text-white'
                      }
                    `}>

                      {/* INNER LIGHT */}
                      <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-white/8 to-transparent opacity-60" />

                      <ChevronDown
                        className={`relative z-10 w-4 h-4 transition-transform duration-500
                        ${isOpen
                            ? 'rotate-180'
                            : ''
                          }
                        `}
                      />
                    </div>
                  </button>

                  {/* ANSWER */}
                  <div
                    className={`grid transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0'
                      }
                    `}
                  >
                    <div className="overflow-hidden">

                      <div className="pb-10 md:pb-12 max-w-3xl">

                        <p className="text-[15px] md:text-[17px] leading-loose text-white/42">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-28 md:mt-32 flex items-center justify-center gap-4 text-[9px] uppercase tracking-[0.34em] text-white/14">

          <div className="w-14 h-px bg-white/10" />

          CreatorOS knowledge & support center

          <div className="w-14 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}