import { FiActivity, FiMessageSquare, FiCalendar, FiCpu, FiBarChart2, FiTrendingUp } from 'react-icons/fi';

const features = [
  {
    title: "Viral moment detector",
    desc: "AI scores every segment of your video for hook strength, emotional impact, and shareability. Your best clips, found automatically.",
    icon: <FiActivity className="w-6 h-6" />,
    color: "from-blue-500/20 to-cyan-500/20",
    iconColor: "text-blue-400",
    bgClass: "bg-blue-500/10"
  },
  {
    title: "Brand voice AI",
    desc: "Trained on your own writing. Every output passes a tone consistency check before you see it — nothing off-brand ever surfaces.",
    icon: <FiMessageSquare className="w-6 h-6" />,
    color: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-400",
    bgClass: "bg-indigo-500/10"
  },
  {
    title: "Smart content calendar",
    desc: "Visual week/month planner. Drag to reschedule. Platform color-coding. Queue status at a glance.",
    icon: <FiCalendar className="w-6 h-6" />,
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-400",
    bgClass: "bg-purple-500/10"
  },
  {
    title: "UiPath autopilot",
    desc: "Unattended robots publish to Meta, LinkedIn, X, and YouTube at your optimal windows. Engagement scraped back automatically.",
    icon: <FiCpu className="w-6 h-6" />,
    color: "from-rose-500/20 to-orange-500/20",
    iconColor: "text-rose-400",
    bgClass: "bg-rose-500/10"
  },
  {
    title: "Analytics dashboard",
    desc: "See what's working across all platforms in one place. Weekly AI coach report every Sunday evening.",
    icon: <FiBarChart2 className="w-6 h-6" />,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    bgClass: "bg-emerald-500/10"
  },
  {
    title: "Trend scout agent",
    desc: "Daily scan of trending topics in your niche. Pro users get auto-generated content briefs waiting every morning.",
    icon: <FiTrendingUp className="w-6 h-6" />,
    color: "from-amber-500/20 to-yellow-500/20",
    iconColor: "text-amber-400",
    bgClass: "bg-amber-500/10"
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-transparent relative overflow-hidden z-20">
      {/* Decorative background elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 tracking-wider uppercase mb-6">
              Features
            </span>
            <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Everything a solo creator needs
            </h3>
            <p className="text-lg text-white/60">
              No video editor. No social media manager. No scheduling app. CreatorOS replaces all three.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05]"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10 shadow-lg ${feature.bgClass} ${feature.iconColor}`}>
                  {feature.icon}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h4>
                
                <p className="text-sm text-white/60 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
