import { BarChart2, TrendingUp, ArrowUpRight, Lock } from 'lucide-react';
import Sidebar from '../components/UserDashboard/Sidebar';
import TopBar from '../components/UserDashboard/TopBar';

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060606]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-none">

            {/* Page header */}
            <div className="relative overflow-hidden rounded-3xl border border-white/8 mb-6"
              style={{ background: 'linear-gradient(160deg, #0d0d0d 0%, #080808 100%)' }}>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(52,211,153,0.06),transparent_65%)]" />
              </div>
              <div className="relative z-10 px-8 py-7 flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
                  <BarChart2 size={20} className="text-white/70" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-white/28 mb-1">Workspace · Analytics</p>
                  <h1 className="text-[26px] font-semibold tracking-[-0.04em] text-white">Analytics</h1>
                  <p className="text-[13px] text-white/38 mt-0.5">Engagement metrics, reach, and growth insights</p>
                </div>
              </div>
            </div>

            {/* Coming soon */}
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02]">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(52,211,153,0.04),transparent_65%)]" />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center py-28 text-center px-8">
                <div className="w-16 h-16 rounded-3xl border border-white/8 bg-white/3 flex items-center justify-center mb-6">
                  <TrendingUp size={24} className="text-emerald-400/60" />
                </div>
                <h2 className="text-[18px] font-semibold text-white/70 tracking-[-0.03em] mb-3">
                  Analytics Dashboard
                </h2>
                <p className="text-[13px] text-white/35 leading-relaxed max-w-sm mb-8">
                  Deep-dive engagement metrics, platform breakdowns, and AI-powered weekly performance reports — coming in Phase 3.
                </p>
                <div className="flex items-center gap-3 flex-wrap justify-center">
                  <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/3 px-4 py-2.5">
                    <Lock size={12} className="text-white/30" />
                    <span className="text-[12px] text-white/40">Engagement charts</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/3 px-4 py-2.5">
                    <Lock size={12} className="text-white/30" />
                    <span className="text-[12px] text-white/40">Platform breakdown</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/3 px-4 py-2.5">
                    <Lock size={12} className="text-white/30" />
                    <span className="text-[12px] text-white/40">AI coach reports</span>
                  </div>
                </div>
                <button className="mt-8 flex items-center gap-2 text-[12px] text-white/35 hover:text-white/60 transition-colors duration-200">
                  <span>Learn about the roadmap</span>
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
