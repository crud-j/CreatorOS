import { RefreshCw, ShieldCheck, Bot, Send } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const logItems = [
  {
    icon: RefreshCw,
    iconCls: 'text-white/55',
    bgCls: 'bg-white/[0.05] border-white/10',
    spin: true,
    title: 'Engine processing Ep. 47',
    meta: 'Just now',
    live: true,
  },
  {
    icon: ShieldCheck,
    iconCls: 'text-emerald-400',
    bgCls: 'bg-emerald-500/8 border-emerald-500/16',
    spin: false,
    title: 'Voice Guard verification passed',
    meta: '5m ago · Score: 0.92',
    live: false,
  },
  {
    icon: Bot,
    iconCls: 'text-purple-400',
    bgCls: 'bg-purple-500/8 border-purple-500/16',
    spin: false,
    title: "Agent 'Writer' queued",
    meta: '12m ago · Deep Dive Project',
    live: false,
  },
  {
    icon: Send,
    iconCls: 'text-blue-400',
    bgCls: 'bg-blue-500/8 border-blue-500/16',
    spin: false,
    title: 'UiPath published 6 posts',
    meta: '1h ago · Masterclass Week 12',
    live: false,
  },
];

export default function SystemLog() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="dash-card card-noise relative rounded-3xl border border-white/8 overflow-hidden"
      style={{ background: isDark ? 'linear-gradient(200deg, #0c0c0c 0%, #080808 100%)' : 'var(--dash-card-bg)' }}
    >

      {/* Ambient atmosphere — dark mode only */}
      <div className="dash-ambient absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        <div className="absolute bottom-[-30%] left-[-20%] w-[240px] h-[240px] rounded-full bg-white/[0.025] blur-[90px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_100%,rgba(255,255,255,0.04),transparent_60%)]" />
      </div>

      <div className="relative z-10 p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[9px] uppercase tracking-[0.28em] text-white/25 mb-1">Activity</p>
            <h3 className="font-semibold text-[16px] text-white tracking-[-0.03em] leading-tight">System Log</h3>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="relative w-1.5 h-1.5">
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
              <div className="relative rounded-full bg-emerald-400 w-full h-full" />
            </div>
            <span className="text-[10px] font-medium text-emerald-400 tracking-[0.05em]">Live</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div
            className="absolute left-[13px] top-4 bottom-4 w-px"
            style={{
              background: isDark
                ? 'linear-gradient(to bottom, rgba(255,255,255,0.14), rgba(255,255,255,0.06), transparent)'
                : 'linear-gradient(to bottom, rgba(0,0,0,0.12), rgba(0,0,0,0.05), transparent)',
            }}
          />

          <div className="space-y-0">
            {logItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`relative flex items-start gap-4 py-3.5 ${i < logItems.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                  {/* Icon with timeline dot */}
                  <div className={`relative shrink-0 w-7 h-7 rounded-xl border flex items-center justify-center ${item.bgCls}`}>
                    {/* Timeline connector dot */}
                    <div
                      className="absolute -right-[18px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full"
                      style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.18)' }}
                    />
                    <Icon
                      size={13}
                      className={item.iconCls}
                      style={item.spin ? { animationDuration: '2.5s' } : undefined}
                      {...(item.spin ? { className: `${item.iconCls} animate-spin` } : {})}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pl-2">
                    <div className="text-[12.5px] font-medium text-white/75 leading-tight">{item.title}</div>
                    <div className="text-[10px] text-white/28 mt-1">{item.meta}</div>
                  </div>

                  {/* Live pulse for first item */}
                  {item.live && (
                    <div className="shrink-0 flex items-center gap-1 mt-0.5">
                      <div className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[9px] text-amber-400/80 uppercase tracking-[0.15em]">active</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">4 events · last 2h</span>
          <button className="text-[10px] text-white/30 hover:text-white/60 transition-colors duration-200">
            View all →
          </button>
        </div>
      </div>
    </div>
  );
}
