import { SlidersHorizontal, Calendar, ArrowUpRight } from 'lucide-react';

const rows = [
  {
    dot: 'bg-amber-400 animate-pulse',
    title: 'Podcast Ep. 47 — Build in Public',
    sub: 'YouTube · 24:38',
    platforms: [
      { label: 'IG', color: '#E1306C' },
      { label: 'LI', color: '#0077B5' },
    ],
    status: { label: 'Generating', cls: 'bg-amber-500/10 text-amber-300 border-amber-500/20', dot: 'bg-amber-400 animate-pulse' },
    progress: { count: '28 / 30', pct: 93, bar: 'bg-amber-400/60' },
    updated: '2m ago',
  },
  {
    dot: 'bg-emerald-400',
    title: 'YouTube Deep Dive — AI Tools 2025',
    sub: 'YouTube · 18:22',
    platforms: [
      { label: 'YT', color: '#FF5555' },
      { label: 'TW', color: null },
      { label: 'NL', color: null },
    ],
    status: { label: 'Ready', cls: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', dot: 'bg-emerald-400' },
    progress: { count: '30 / 30', pct: 100, bar: 'bg-emerald-400/60' },
    updated: '1h ago',
  },
  {
    dot: 'bg-purple-400',
    title: 'Solo Creator Masterclass — Week 12',
    sub: 'Loom · 31:05',
    platforms: [
      { label: 'IG', color: '#E1306C' },
      { label: 'PI', color: '#E60023' },
    ],
    status: { label: 'Scheduled', cls: 'bg-purple-500/10 text-purple-300 border-purple-500/20', dot: 'bg-purple-400' },
    progress: { count: '30 / 30', pct: 100, bar: 'bg-white/25' },
    updated: '3h ago',
  },
  {
    dot: 'bg-blue-400 animate-pulse',
    title: 'Q2 Content Strategy — Agency Brief',
    sub: 'MP4 Upload · 45:17',
    platforms: [
      { label: 'LI', color: '#0077B5' },
      { label: 'TW', color: null },
      { label: 'NL', color: null },
    ],
    status: { label: 'Processing', cls: 'bg-blue-500/10 text-blue-300 border-blue-500/20', dot: 'bg-blue-400 animate-pulse' },
    progress: { count: '0 / 30', pct: 0, bar: 'bg-white/20' },
    updated: '12m ago',
  },
  {
    dot: 'bg-white/22',
    title: 'Newsletter Series — Founder Stories',
    sub: 'Podcast RSS · 52:40',
    platforms: [
      { label: 'NL', color: null },
      { label: 'LI', color: '#0077B5' },
      { label: '+2', color: null },
    ],
    status: { label: 'Published', cls: 'bg-white/5 text-white/38 border-white/10', dot: 'bg-white/28' },
    progress: { count: '30 / 30', pct: 100, bar: 'bg-white/20' },
    updated: 'Yesterday',
  },
];

export default function PipelineTable() {
  return (
    <div className="card-noise w-full rounded-3xl border border-white/8 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)' }}>

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.05),transparent_55%)]" />
      </div>

      {/* Header */}
      <div className="relative z-10 px-7 py-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/25 mb-1">Pipeline</p>
          <h2 className="font-semibold text-[16px] text-white tracking-[-0.03em] leading-tight">Recent Projects</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3.5 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/14 flex items-center gap-1.5 transition-all duration-200">
            <SlidersHorizontal size={12} className="text-white/40" />
            <span className="text-[11px] text-white/45">Filter</span>
          </button>
          <button className="h-8 px-3.5 rounded-xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/14 flex items-center gap-1.5 transition-all duration-200">
            <Calendar size={12} className="text-white/35" />
            <span className="text-[11px] text-white/45">May 2025</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="relative z-10">
        {/* Column headers */}
        <div className="grid grid-cols-[2fr_140px_130px_160px_90px] px-7 py-2.5 border-b border-white/[0.04]">
          {['Project Name', 'Platforms', 'Status', 'Outputs', 'Updated'].map((h) => (
            <div key={h} className="text-[9px] font-medium uppercase tracking-[0.22em] text-white/20">{h}</div>
          ))}
        </div>

        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`group relative grid grid-cols-[2fr_140px_130px_160px_90px] px-7 py-4 transition-all duration-200
              hover:bg-white/[0.025] ${i < rows.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
          >
            {/* Left accent on hover */}
            <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-white/0 group-hover:bg-white/20 transition-all duration-300" />

            {/* Project name */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${row.dot}`} />
              <div className="min-w-0">
                <div className="text-[13px] font-medium text-white/82 leading-tight truncate">{row.title}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{row.sub}</div>
              </div>
            </div>

            {/* Platforms */}
            <div className="flex items-center gap-1 flex-wrap">
              {row.platforms.map((p, j) => (
                <span
                  key={j}
                  className="px-1.5 py-0.5 rounded text-[9px] font-semibold"
                  style={p.color
                    ? { backgroundColor: `${p.color}1A`, color: p.color, border: `1px solid ${p.color}30` }
                    : { backgroundColor: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.38)', border: '1px solid rgba(255,255,255,0.08)' }
                  }
                >
                  {p.label}
                </span>
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center">
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${row.status.cls}`}>
                <div className={`w-1 h-1 rounded-full ${row.status.dot}`} />
                {row.status.label}
              </div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col justify-center">
              <div className="text-[12px] font-medium text-white/60 leading-none mb-1.5">{row.progress.count}</div>
              <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700 ${row.progress.bar}`} style={{ width: `${row.progress.pct}%` }} />
              </div>
              <div className="text-[10px] text-white/25 mt-1">{row.progress.pct}%</div>
            </div>

            {/* Updated */}
            <div className="flex items-center text-[11px] text-white/28">{row.updated}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="relative z-10 px-7 py-3.5 border-t border-white/[0.05] flex items-center justify-between">
        <span className="text-[10px] text-white/22 uppercase tracking-[0.18em]">Showing 5 of 12 projects</span>
        <button className="flex items-center gap-1 text-[11px] text-white/38 hover:text-white/70 transition-colors duration-200">
          View all projects
          <ArrowUpRight size={12} />
        </button>
      </div>
    </div>
  );
}
