import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiPlus, FiMinus } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'Does it actually sound like me, or does it sound like AI?',
    a: 'CreatorOS trains a voice profile from your own writing samples and runs every output through a brand consistency check. If the tone drifts, it automatically revises before showing you. Most users\' audiences can\'t tell the difference — we\'ve had creators run for weeks without mentioning it.',
  },
  {
    q: 'Which platforms does the autopilot support?',
    a: 'Instagram (Reels + Feed), LinkedIn, X/Twitter, YouTube (Community posts + Shorts metadata), Pinterest, and Facebook Pages. TikTok autopublish is in beta — you can schedule the content and get a one-tap post reminder instead.',
  },
  {
    q: 'What video formats and lengths do you support?',
    a: 'MP4, MOV, and MP3 up to 4 hours. YouTube URLs of any length. Loom recordings. Podcast RSS feeds (auto-ingested daily). The longer the video, the more outputs and viral moment clips we can extract.',
  },
  {
    q: 'Can I edit the outputs before they go out?',
    a: 'Yes, always. Every output has an inline editor. You can edit, regenerate with new instructions, or reject it entirely. The autopilot only publishes outputs you\'ve approved — you\'re always in control of what goes live.',
  },
  {
    q: 'Is my content stored or used to train AI models?',
    a: 'Your raw video files are stored temporarily (90-day TTL on S3) and are never used to train any model. Your brand voice data and generated content are stored privately and never shared. You can delete all your data from Settings at any time.',
  },
  {
    q: 'How does the brand voice training actually work?',
    a: 'You paste 3–10 examples of your best existing content. Our AI extracts your sentence rhythm, vocabulary, humor patterns, and CTA style into a personal voice model. Every output is scored against this profile and only surfaced to you if it passes. You can rate outputs to keep improving it over time.',
  },
  {
    q: 'What happens if I go over my plan limits?',
    a: 'On the Free plan, additional runs are paused until the next billing cycle or you upgrade. We never auto-charge overages. On Pro, runs are unlimited. You\'ll always see your usage in the dashboard.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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

      if (listRef.current) {
        const items = listRef.current.querySelectorAll('.faq-row');
        gsap.fromTo(items, 
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 95%',
              once: true,
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = (idx: number) => {
    setOpenIdx(prev => (prev === idx ? null : idx));
  };

  return (
    <section ref={sectionRef} id="faq" className="py-28 bg-transparent relative overflow-hidden z-20">
      {/* Subtle glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/6 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div ref={headingRef} className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 tracking-wider uppercase mb-6">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Common{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-base text-white/50 leading-relaxed">
            Everything you need to know before you start. Can't find your answer?{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors underline">
              Chat with us.
            </a>
          </p>
        </div>

        {/* FAQ list */}
        <div ref={listRef} className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`faq-row group rounded-2xl border backdrop-blur-sm transition-all duration-400 overflow-hidden ${
                  isOpen
                    ? 'bg-white/[0.05] border-indigo-500/30'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.03]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className={`text-sm md:text-base font-semibold leading-snug transition-colors duration-300 ${
                    isOpen ? 'text-white' : 'text-white/80 group-hover:text-white'
                  }`}>
                    {faq.q}
                  </span>
                  <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isOpen
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                  }`}>
                    {isOpen ? <FiMinus className="w-3.5 h-3.5" /> : <FiPlus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {/* Answer panel */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="h-px bg-white/5 mb-4" />
                    <p className="text-sm text-white/55 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
