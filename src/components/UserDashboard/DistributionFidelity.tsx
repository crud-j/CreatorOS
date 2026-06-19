const platforms = [
  { name: 'YouTube',    badge: 'YT', color: '#FF4444', pct: 89, posts: 134, rank: 1 },
  { name: 'Instagram',  badge: 'IG', color: '#E1306C', pct: 78, posts: 124, rank: 2 },
  { name: 'LinkedIn',   badge: 'in', color: '#0077B5', pct: 65, posts: 98,  rank: 3 },
  { name: 'X / Twitter',badge: 'X',  color: '#8899AA', pct: 52, posts: 76,  rank: 4 },
  { name: 'Newsletter', badge: '@',  color: '#BBBBBB', pct: 44, posts: 62,  rank: 5 },
  { name: 'Pinterest',  badge: 'P',  color: '#E60023', pct: 31, posts: 44,  rank: 6 },
];

export default function DistributionFidelity() {
  const topPct = Math.max(...platforms.map(p => p.pct));

  return (
    <div className="card-noise w-full rounded-3xl border border-white/8 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0b0b0b 0%, #080808 100%)' }}>

      {/* Ambient atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute top-[-40%] right-[-5%] w-[320px] h-[320px] rounded-full bg-white/[0.025] blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_0%,rgba(255,255,255,0.05),transparent_55%)]" />
      </div>

      <div className="relative z-10 p-7">

        {/* Header */}
        <div className="flex items-start justify-between mb-7">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/25 mb-1">Analytics</p>
            <h3 className="font-semibold text-[16px] text-white tracking-[-0.03em] leading-tight">Distribution Fidelity</h3>
            <p className="text-[11px] text-white/28 mt-1">Platform reach vs. content volume</p>
          </div>
          <div className="flex bg-white/[0.04] p-0.5 rounded-xl border border-white/8">
            <button className="bg-white text-black rounded-lg px-3 py-1.5 text-[10px] font-semibold">7D</button>
            <button className="text-white/30 hover:text-white/60 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors">30D</button>
            <button className="text-white/30 hover:text-white/60 rounded-lg px-3 py-1.5 text-[10px] font-medium transition-colors">90D</button>
          </div>
        </div>

        {/* Platform grid */}
        <div className="grid grid-cols-2 gap-3">
          {platforms.map((p, i) => (
            <div
              key={i}
              className="group relative flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 hover:bg-white/[0.045] hover:border-white/12 transition-all duration-250 overflow-hidden"
            >
              {/* Left accent on hover */}
              <div
                className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                style={{ backgroundColor: p.color }}
              />

              {/* Rank */}
              <span className="text-[10px] font-medium text-white/18 w-3 shrink-0 tabular-nums">{p.rank}</span>

              {/* Badge */}
              <div
                className="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-[9px] font-bold border"
                style={{
                  backgroundColor: `${p.color}18`,
                  borderColor: `${p.color}30`,
                  color: p.color,
                }}
              >
                {p.badge}
              </div>

              {/* Name + bar */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[12px] font-medium text-white/65 truncate">{p.name}</span>
                  <span className="text-[13px] font-semibold text-white/80 ml-2 shrink-0 tabular-nums">{p.pct}%</span>
                </div>
                <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${(p.pct / topPct) * 100}%`,
                      backgroundColor: `${p.color}85`,
                    }}
                  />
                </div>
              </div>

              {/* Posts count */}
              <div className="text-right shrink-0 pl-1">
                <div className="text-[13px] font-semibold text-white/55 tabular-nums">{p.posts}</div>
                <div className="text-[9px] text-white/22 uppercase tracking-[0.15em]">posts</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer summary */}
        <div className="mt-5 pt-5 border-t border-white/[0.05] flex items-center gap-6">
          <div>
            <div className="text-[9px] uppercase tracking-[0.24em] text-white/22 mb-1">Total Posts</div>
            <div className="text-[20px] font-semibold text-white/80 tracking-[-0.04em] leading-none">538</div>
          </div>
          <div className="w-px h-8 bg-white/8" />
          <div>
            <div className="text-[9px] uppercase tracking-[0.24em] text-white/22 mb-1">Avg Fidelity</div>
            <div className="text-[20px] font-semibold text-white/80 tracking-[-0.04em] leading-none">59.8%</div>
          </div>
          <div className="w-px h-8 bg-white/8" />
          <div>
            <div className="text-[9px] uppercase tracking-[0.24em] text-white/22 mb-1">Top Platform</div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-5 h-5 rounded-lg flex items-center justify-center text-[8px] font-bold border"
                style={{ backgroundColor: '#FF444418', borderColor: '#FF444430', color: '#FF4444' }}>
                YT
              </div>
              <span className="text-[13px] font-medium text-white/60">YouTube</span>
            </div>
          </div>
          <div className="ml-auto">
            <button className="text-[10px] text-white/28 hover:text-white/55 transition-colors duration-200 uppercase tracking-[0.18em]">
              Full report →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
