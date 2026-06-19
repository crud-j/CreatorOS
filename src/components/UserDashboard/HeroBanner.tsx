import { FolderOpen, FileText, Mic, TrendingUp, ArrowUp } from 'lucide-react';
import {
  BarChart, Bar, XAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer
} from 'recharts';

const chartData = [
  { day: 'Mon', outputs: 18, drafts: 8 },
  { day: 'Tue', outputs: 34, drafts: 14 },
  { day: 'Wed', outputs: 52, drafts: 20 },
  { day: 'Thu', outputs: 28, drafts: 12 },
  { day: 'Fri', outputs: 19, drafts: 9 },
  { day: 'Sat', outputs: 41, drafts: 16 },
  { day: 'Sun', outputs: 31, drafts: 11 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: { color: string; name: string; value: number }[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl">
        <p className="text-[9px] uppercase tracking-[0.28em] text-white/35 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2.5 mt-1">
            <div className="w-1 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[11px] text-white/45">{entry.name}</span>
            <span className="text-[13px] font-semibold text-white ml-auto pl-4">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

const stats = [
  { icon: FolderOpen, value: '12', label: 'Active Projects', trend: '+3 this week', TrendIcon: TrendingUp },
  { icon: FileText,  value: '847', label: 'Outputs Generated', trend: '+124 today', TrendIcon: TrendingUp },
  { icon: Mic,       value: '0.84', label: 'Voice Fidelity', trend: 'Top 5% fidelity', TrendIcon: ArrowUp },
];

export default function HeroBanner() {
  return (
    <div className="card-noise w-full rounded-3xl border border-white/8 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d0d0d 0%, #080808 100%)' }}>

      {/* Ambient atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute top-[-60%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/[0.025] blur-[140px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(255,255,255,0.07),transparent_60%)]" />
      </div>

      <div className="relative z-10 grid grid-cols-[1fr_400px]">

        {/* ─── LEFT: Greeting + Stats ─── */}
        <div className="p-8 flex flex-col justify-between min-h-[260px]">

          {/* Greeting */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.32em] text-white/28 mb-3">
              Dashboard · Overview
            </p>
            <h1 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.05em] text-white/30">
              Good morning,
              <span className="block text-white">Jake.</span>
            </h1>
            <p className="mt-2 text-[13px] text-white/36 leading-relaxed">
              Your content engine processed 847 outputs this week.
            </p>
          </div>

          {/* Stats row — editorial large numbers */}
          <div>
            <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent mb-6" />
            <div className="grid grid-cols-3">
              {stats.map((s, i) => {
                const Icon = s.icon;
                const Trend = s.TrendIcon;
                return (
                  <div key={i} className={`pr-6 ${i > 0 ? 'pl-6 border-l border-white/8' : ''}`}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Icon size={11} className="text-white/30" />
                      <span className="text-[9px] uppercase tracking-[0.26em] text-white/28">
                        {s.label}
                      </span>
                    </div>
                    <div className="text-[42px] font-semibold tracking-[-0.06em] leading-none text-white">
                      {s.value}
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                      <Trend size={10} className="text-emerald-400" />
                      <span className="text-[11px] text-emerald-400">{s.trend}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Chart ─── */}
        <div className="relative border-l border-white/6 p-6 flex flex-col overflow-hidden">

          {/* Dot grid in chart area */}
          <div
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
              maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
            }}
          />

          {/* Chart header */}
          <div className="relative flex items-center mb-1">
            <div>
              <span className="text-[9px] uppercase tracking-[0.28em] text-white/28">
                Output Trend
              </span>
            </div>
            <div className="ml-auto flex bg-white/[0.04] p-0.5 rounded-lg border border-white/8">
              <button className="bg-white text-black rounded-md px-2.5 py-1 text-[10px] font-semibold">7D</button>
              <button className="text-white/30 hover:text-white/60 rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors">30D</button>
              <button className="text-white/30 hover:text-white/60 rounded-md px-2.5 py-1 text-[10px] font-medium transition-colors">90D</button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded-full bg-white/70" />
              <span className="text-[10px] text-white/28">Outputs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 rounded-full bg-white/18" />
              <span className="text-[10px] text-white/28">Drafts</span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative flex-1 min-h-[140px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={2} barCategoryGap="32%">
                <CartesianGrid strokeDasharray="2 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.25)' }}
                  axisLine={false}
                  tickLine={false}
                  dy={8}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.025)', radius: 4 }} />
                <ReferenceLine
                  y={31}
                  stroke="rgba(255,255,255,0.10)"
                  strokeDasharray="3 5"
                  label={{ value: 'Avg', position: 'right', fontSize: 9, fill: 'rgba(255,255,255,0.25)', dx: 6 }}
                />
                <Bar dataKey="outputs" name="Outputs" fill="rgba(255,255,255,0.82)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="drafts"  name="Drafts"  fill="rgba(255,255,255,0.11)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
