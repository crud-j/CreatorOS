import { useEffect, useRef, useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

const faqCategories = [
  {
    id: 'general',
    label: 'General',
    items: [
      {
        q: 'Does it actually sound like me, or does it sound like AI?',
        a: 'CreatorOS trains a voice profile from your own writing samples and runs every output through a brand consistency check. If the tone drifts, it automatically revises before showing you. Most users\' audiences can\'t tell the difference — we\'ve had creators run for weeks without mentioning it.',
      },
      {
        q: 'How does the brand voice training actually work?',
        a: 'You paste 3–10 examples of your best existing content. Our AI extracts your sentence rhythm, vocabulary, humor patterns, and CTA style into a personal voice model. Every output is scored against this profile and only surfaced to you if it passes.',
      },
    ]
  },
  {
    id: 'features',
    label: 'Features & Capabilities',
    items: [
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
    ]
  },
  {
    id: 'privacy',
    label: 'Privacy & Data',
    items: [
      {
        q: 'Is my content stored or used to train AI models?',
        a: 'Your raw video files are stored temporarily (90-day TTL on secure storage) and are never used to train any model. Your brand voice data and generated content are stored privately and never shared. You can delete all your data from Settings at any time.',
      },
    ]
  },
  {
    id: 'billing',
    label: 'Pricing & Billing',
    items: [
      {
        q: 'What happens if I go over my plan limits?',
        a: 'On the Free plan, additional runs are paused until the next billing cycle or you upgrade. We never auto-charge overages. On Pro, runs are unlimited. You\'ll always see your usage in the dashboard.',
      },
    ]
  }
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const [openIdx, setOpenIdx] = useState<number | null>(0); // First item open by default

  // Entrance animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset open index when category changes
  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIdx(0);
  };

  const activeData = faqCategories.find(c => c.id === activeCategory)?.items || [];

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="py-24 sm:py-32 bg-[#030303] text-white relative overflow-hidden z-20 font-sans selection:bg-white selection:text-black"
    >

      {/* Premium Ambient Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header (Outside the card) */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-medium tracking-wide text-neutral-400 mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>Support & Knowledge</span>
            </div>
          </div>
        </div>

        {/* Main Glassmorphic Card (Matches Reference Image Structure) */}
        <div
          className={`relative rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl shadow-2xl transition-all duration-1000 delay-150 ease-out overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Inner ambient glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

          {/* Card Header */}
          <div className="px-8 sm:px-12 py-10 border-b border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base font-light">
                Everything you need to know about the platform, billing, and how it works.
              </p>
            </div>

            {/* Reference image '?' Circle */}
            <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 items-center justify-center shadow-inner">
              <HelpCircle className="w-7 h-7 text-neutral-300" />
            </div>
          </div>

          {/* Card Body - Split Layout */}
          <div className="flex flex-col lg:flex-row relative z-10">

            {/* Left Column: Categories */}
            <div className="w-full lg:w-1/3 p-8 sm:p-12 lg:border-r border-b lg:border-b-0 border-white/[0.08] bg-white/[0.01]">
              <div className="flex flex-col gap-2">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`text-left px-5 py-4 rounded-xl font-medium transition-all duration-300 ${activeCategory === category.id
                        ? 'bg-white text-black shadow-lg scale-100' // Dark mode translation of the black active block
                        : 'bg-transparent text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200'
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Accordion Questions */}
            <div className="w-full lg:w-2/3 p-8 sm:p-12">
              <div className="flex flex-col">
                {activeData.map((faq, idx) => {
                  const isOpen = openIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`group border-b border-white/[0.08] last:border-0 ${idx === 0 ? 'pt-0' : 'pt-2'}`}
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-6 py-6 text-left"
                      >
                        <span
                          className={`text-base sm:text-lg font-medium pr-4 transition-colors duration-300 ${isOpen ? 'text-white' : 'text-neutral-300 group-hover:text-white'
                            }`}
                        >
                          {faq.q}
                        </span>

                        {/* Reference image small square icon */}
                        <div
                          className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-300 ${isOpen
                              ? 'bg-white border-white text-black'
                              : 'bg-white/[0.03] border-white/10 text-neutral-400 group-hover:bg-white/[0.08] group-hover:text-white'
                            }`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </div>
                      </button>

                      {/* Smooth CSS Grid Dropdown Animation */}
                      <div
                        className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                          }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-8 text-neutral-400 text-sm sm:text-base leading-relaxed font-light pr-12">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}