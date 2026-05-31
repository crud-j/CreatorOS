import { useEffect, useRef, useState } from 'react';
import { Sparkles, PlayCircle, FileText, Share2 } from 'lucide-react';

const examples = [
  {
    title: "YouTube to 30 assets",
    desc: "One 18-minute upload becomes a shorts script, LinkedIn essay, X thread, and IG caption in under 12 minutes.",
    tag: "Multi-platform pack",
    icon: <PlayCircle className="w-6 h-6" />,
    accent: "text-sky-400",
    chip: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  },
  {
    title: "Voice profile lock",
    desc: "Outputs are aligned to the creator's tone, cadence, and CTA style with a voice score above 0.72.",
    tag: "Voice guard",
    icon: <FileText className="w-6 h-6" />,
    accent: "text-fuchsia-400",
    chip: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
  },
  {
    title: "Autopublish + scrape",
    desc: "Scheduled posts go live via UiPath robots, then engagement metrics flow back into analytics automatically.",
    tag: "Robot workflow",
    icon: <Share2 className="w-6 h-6" />,
    accent: "text-emerald-400",
    chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  }
];

const proof = [
  { label: "Avg. time to first output", value: "4m 12s" },
  { label: "Outputs per project", value: "30+" },
  { label: "Platforms supported", value: "6" },
  { label: "Voice score target", value: "0.72+" }
];

export default function Examples() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="examples"
      className="relative overflow-hidden bg-black py-32 md:py-40 text-white z-20 font-sans selection:bg-white selection:text-black"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] right-[4%] w-[760px] h-[760px] rounded-full bg-white/[0.03] blur-[180px]" />
        <div className="absolute bottom-[-20%] left-[6%] w-[680px] h-[680px] rounded-full bg-white/[0.02] blur-[190px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
          <div className="max-w-2xl">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-2xl px-5 py-2 mb-8 shadow-[0_0_60px_rgba(255,255,255,0.03)]">
                <Sparkles className="w-3.5 h-3.5 text-white/70" />
                <span className="text-[10px] uppercase tracking-[0.34em] text-white/38">Examples</span>
              </div>
            </div>

            <div className={`space-y-6 transition-all duration-1000 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-[40px] sm:text-[58px] lg:text-[72px] leading-[0.98] tracking-[-0.06em] font-semibold text-white">
                CreatorOS in motion.
              </h2>
              <p className="text-[15px] md:text-[18px] leading-[2] text-white/42 max-w-2xl">
                See what a single upload becomes once CreatorOS finishes the full pipeline from transcript to autopublish.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {proof.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-5 text-center"
              >
                <div className="text-xl md:text-2xl font-semibold text-white">{item.value}</div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-white/40">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {examples.map((example, idx) => (
            <div
              key={example.title}
              className={`group relative p-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-white/[0.04] overflow-hidden shadow-[0_0_60px_rgba(255,255,255,0.03)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: isVisible ? `${220 + idx * 120}ms` : '0ms' }}
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-b from-white/[0.06] via-transparent to-transparent opacity-70 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.05] shadow-inner ${example.accent}`}>
                    {example.icon}
                  </div>
                  <span className={`text-[11px] uppercase tracking-[0.24em] border rounded-full px-3 py-1 ${example.chip}`}>
                    {example.tag}
                  </span>
                </div>

                <h4 className="text-xl font-semibold mb-4 text-white tracking-tight">
                  {example.title}
                </h4>
                <p className="text-base text-neutral-400 leading-relaxed font-light">
                  {example.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}