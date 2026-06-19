import { useState } from 'react';
import { Mic, Calendar, Sparkles, Link2 } from 'lucide-react';

export default function QuickSpin() {
  const [brandVoice, setBrandVoice] = useState(true);
  const [autoSchedule, setAutoSchedule] = useState(false);

  return (
    <div className="card-noise relative rounded-3xl border border-white/8 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d0d0d 0%, #090909 100%)' }}>

      {/* Ambient atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute top-[-40%] right-[-20%] w-[280px] h-[280px] rounded-full bg-white/[0.03] blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
      </div>

      <div className="relative z-10 p-6 flex flex-col h-full">

        {/* Header */}
        <div className="mb-5">
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/25 mb-1">Workflow</p>
          <h3 className="font-semibold text-[16px] text-white tracking-[-0.03em] leading-tight">Quick Spin</h3>
          <p className="text-[12px] text-white/32 mt-1 leading-relaxed">
            Paste a URL to generate 30 platform outputs
          </p>
        </div>

        {/* URL Input */}
        <div className="mb-5">
          <label className="block text-[9px] font-medium text-white/25 uppercase tracking-[0.26em] mb-2.5">
            Content source
          </label>
          <div className="flex items-center rounded-2xl border border-white/8 bg-white/[0.03] overflow-hidden focus-within:border-white/20 focus-within:bg-white/[0.05] transition-all duration-300 group">
            <div className="pl-3.5 shrink-0">
              <Link2 size={13} className="text-white/25 group-focus-within:text-white/50 transition-colors duration-200" />
            </div>
            <input
              type="text"
              className="flex-1 px-3 py-3 text-[12.5px] outline-none bg-transparent text-white placeholder:text-white/18 w-full"
              placeholder="https://youtube.com/watch?v=..."
            />
            <button className="px-4 py-3 border-l border-white/6 text-[11px] font-medium text-white/32 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-150 shrink-0">
              Paste
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent mb-1" />

        {/* Toggles */}
        <div className="space-y-0 mb-5">
          {[
            {
              icon: Mic,
              label: 'Apply brand voice',
              sub: 'Voice profile · score 0.84',
              val: brandVoice,
              set: setBrandVoice,
            },
            {
              icon: Calendar,
              label: 'Auto-schedule',
              sub: 'AI-optimized timing',
              val: autoSchedule,
              set: setAutoSchedule,
            },
          ].map(({ icon: Icon, label, sub, val, set }) => (
            <div key={label} className="flex items-center justify-between py-3.5 border-b border-white/[0.05] last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center border transition-all duration-300 ${val ? 'bg-white/10 border-white/15' : 'bg-white/[0.04] border-white/8'}`}>
                  <Icon size={13} className={val ? 'text-white/80' : 'text-white/35'} />
                </div>
                <div>
                  <div className="text-[12.5px] font-medium text-white/75 leading-tight">{label}</div>
                  <div className="text-[10px] text-white/28 mt-0.5">{sub}</div>
                </div>
              </div>
              <button
                onClick={() => set(!val)}
                className={`relative w-9 h-5 rounded-full transition-all duration-250 border shrink-0 ${
                  val ? 'bg-white border-white/50 shadow-[0_0_12px_rgba(255,255,255,0.15)]' : 'bg-white/6 border-white/10'
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all duration-250 shadow-sm ${
                  val ? 'translate-x-4 bg-black' : 'bg-white/50'
                }`} />
              </button>
            </div>
          ))}
        </div>

        {/* Generate Button */}
        <button className="relative w-full h-12 rounded-2xl bg-white hover:bg-white/92 active:scale-[0.99] flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_0_50px_rgba(255,255,255,0.12)] group overflow-hidden">
          {/* Inner shimmer */}
          <div className="absolute inset-0 bg-linear-to-b from-white to-white/90 opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.6),transparent_70%)] opacity-60" />
          <Sparkles size={14} className="relative z-10 text-black/70" />
          <span className="relative z-10 text-black font-semibold text-[13.5px] tracking-[-0.01em]">
            Generate 30 Outputs
          </span>
        </button>
      </div>
    </div>
  );
}
