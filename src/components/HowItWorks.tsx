
const steps = [
  {
    num: "1",
    title: "Drop your content",
    desc: "Paste a YouTube URL, upload an MP4, or connect your podcast RSS feed. CreatorOS handles every format without transcription tools or manual prep.",
    footer: "YouTube · MP4 · MP3 · Loom",
    color: "from-indigo-500/10 to-blue-500/10",
    border: "group-hover:border-indigo-500/50"
  },
  {
    num: "2",
    title: "Train your brand voice once",
    desc: "Paste 3 of your best posts. The AI learns your tone, sentence rhythm, humor style, and CTA patterns — every output sounds like you wrote it yourself.",
    footer: "One-time setup · updates as you rate outputs",
    color: "from-blue-500/10 to-purple-500/10",
    border: "group-hover:border-blue-500/50"
  },
  {
    num: "3",
    title: "Get 30 platform-ready outputs",
    desc: "Reels scripts, tweet threads, LinkedIn essays, newsletters, Pinterest captions, and YouTube community posts — all generated in parallel, all in your voice.",
    footer: "Generated in under 4 minutes",
    color: "from-purple-500/10 to-pink-500/10",
    border: "group-hover:border-purple-500/50"
  },
  {
    num: "4",
    title: "Autopilot publishes everything",
    desc: "UiPath robots post to each platform at the AI-predicted best time. Engagement data feeds back in — your schedule gets smarter every week.",
    footer: "Powered by UiPath automation",
    color: "from-pink-500/10 to-rose-500/10",
    border: "group-hover:border-pink-500/50"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-transparent relative overflow-hidden z-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-indigo-400 tracking-wider uppercase mb-6">
            How it works
          </span>
          <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            From raw content to 30 posts in 4 steps
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`group relative p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:-translate-y-2 ${step.border}`}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="text-6xl font-black text-white/5 mb-8 group-hover:text-white/10 transition-colors duration-500">
                  {step.num}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h4>
                
                <p className="text-sm text-white/60 leading-relaxed mb-8 flex-grow">
                  {step.desc}
                </p>
                
                <div className="pt-4 border-t border-white/10 mt-auto">
                  <span className="text-[11px] font-bold text-indigo-300/70 tracking-wider uppercase group-hover:text-indigo-400 transition-colors duration-300">
                    {step.footer}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
