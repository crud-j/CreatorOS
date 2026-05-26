import { useEffect, useRef, useState } from 'react';
import {
  Activity,
  MessageSquare,
  Calendar,
  Cpu,
  BarChart2,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const features = [
  {
    title: "Viral moment detector",
    desc: "AI scores every segment of your video for hook strength, emotional impact, and shareability. Your best clips, found automatically.",
    icon: <Activity className="w-6 h-6" />,
    accent: "text-sky-400",
    bgHover: "group-hover:bg-sky-500/10",
    borderHover: "group-hover:border-sky-500/30",
    glow: "rgba(56, 189, 248, 0.12)",
  },
  {
    title: "Brand voice AI",
    desc: "Trained on your own writing. Every output passes a tone consistency check before you see it — nothing off-brand ever surfaces.",
    icon: <MessageSquare className="w-6 h-6" />,
    accent: "text-indigo-400",
    bgHover: "group-hover:bg-indigo-500/10",
    borderHover: "group-hover:border-indigo-500/30",
    glow: "rgba(99, 102, 241, 0.12)",
  },
  {
    title: "Smart content calendar",
    desc: "Visual week/month planner. Drag to reschedule. Platform color-coding. Queue status at a glance.",
    icon: <Calendar className="w-6 h-6" />,
    accent: "text-fuchsia-400",
    bgHover: "group-hover:bg-fuchsia-500/10",
    borderHover: "group-hover:border-fuchsia-500/30",
    glow: "rgba(232, 121, 249, 0.12)",
  },
  {
    title: "Autopilot publishing",
    desc: "Unattended robots publish to Meta, LinkedIn, X, and YouTube at your optimal windows. Engagement scraped back automatically.",
    icon: <Cpu className="w-6 h-6" />,
    accent: "text-rose-400",
    bgHover: "group-hover:bg-rose-500/10",
    borderHover: "group-hover:border-rose-500/30",
    glow: "rgba(244, 63, 94, 0.12)",
  },
  {
    title: "Analytics dashboard",
    desc: "See what's working across all platforms in one place. Weekly AI coach report delivered to your inbox every Sunday evening.",
    icon: <BarChart2 className="w-6 h-6" />,
    accent: "text-emerald-400",
    bgHover: "group-hover:bg-emerald-500/10",
    borderHover: "group-hover:border-emerald-500/30",
    glow: "rgba(52, 211, 153, 0.12)",
  },
  {
    title: "Trend scout agent",
    desc: "Daily scan of trending topics in your niche. Pro users get auto-generated content briefs waiting for them every morning.",
    icon: <TrendingUp className="w-6 h-6" />,
    accent: "text-amber-400",
    bgHover: "group-hover:bg-amber-500/10",
    borderHover: "group-hover:border-amber-500/30",
    glow: "rgba(251, 191, 36, 0.12)",
  }
];

export default function Features() {
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
    <section ref={sectionRef} id="features" className="py-32 bg-[#030303] text-white relative overflow-hidden z-20 font-sans selection:bg-white selection:text-black">

      {/* Premium Ambient Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-medium tracking-wide text-neutral-400 mb-8 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
                <span>The Arsenal</span>
              </div>
            </div>

            <div className={`space-y-6 transition-all duration-1000 delay-150 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-white">
                Everything a <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-400 italic font-light">solo creator</span> needs.
              </h2>
              <p className="text-lg md:text-xl text-neutral-400 leading-relaxed font-light max-w-2xl">
                No video editor. No social media manager. No scheduling app. Our platform replaces all three with a unified, intelligent workflow.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`group relative p-8 rounded-[2rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-md transition-all duration-700 ease-out hover:-translate-y-2 hover:bg-white/[0.03] overflow-hidden ${feature.borderHover} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: isVisible ? `${300 + idx * 100}ms` : '0ms' }}
            >
              {/* Dynamic Hover Glow */}
              <div
                className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(600px circle at 0% 0%, ${feature.glow}, transparent 60%)` }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 bg-white/[0.03] border border-white/[0.05] shadow-inner text-neutral-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${feature.bgHover} group-hover:${feature.accent}`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h4 className="text-xl font-semibold mb-4 text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all duration-300">
                    {feature.title}
                  </h4>

                  <p className="text-base text-neutral-400 leading-relaxed font-light group-hover:text-neutral-300 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}