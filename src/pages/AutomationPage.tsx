import { Zap, Bot, Clock, Lock, ArrowUpRight } from 'lucide-react';
import Sidebar from '../components/UserDashboard/Sidebar';
import TopBar from '../components/UserDashboard/TopBar';

const automationFeatures = [
  { icon: Bot,   label: 'UiPath Robots',       desc: 'Unattended publish bots for every platform' },
  { icon: Clock, label: 'Scheduled Publishing', desc: 'Queue, reschedule and auto-publish content' },
  { icon: Zap,   label: 'Trigger Pipelines',    desc: 'Auto-run pipelines on new YouTube uploads' },
];

export default function AutomationPage() {
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(251,146,60,0.05),transparent_65%)]" />
              </div>
              <div className="relative z-10 px-8 py-7 flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
                  <Zap size={20} className="text-white/70" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-white/28 mb-1">Automation · Pipeline</p>
                  <h1 className="text-[26px] font-semibold tracking-[-0.04em] text-white">Automation</h1>
                  <p className="text-[13px] text-white/38 mt-0.5">UiPath robots, scheduling, and publish triggers</p>
                </div>
              </div>
            </div>

            {/* Coming soon */}
            <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02]">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(251,146,60,0.04),transparent_65%)]" />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center py-20 text-center px-8">
                <div className="w-16 h-16 rounded-3xl border border-white/8 bg-white/3 flex items-center justify-center mb-6">
                  <Zap size={24} className="text-amber-400/60" />
                </div>
                <h2 className="text-[18px] font-semibold text-white/70 tracking-[-0.03em] mb-3">
                  Automation Hub
                </h2>
                <p className="text-[13px] text-white/35 leading-relaxed max-w-sm mb-10">
                  Configure UiPath robots, set up auto-publish schedules, and wire triggers that run your entire content pipeline hands-free.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mb-8">
                  {automationFeatures.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.label} className="rounded-2xl border border-white/8 bg-white/2 p-4 text-left">
                        <div className="flex items-center gap-2 mb-2">
                          <Lock size={10} className="text-white/20" />
                          <Icon size={13} className="text-white/35" />
                        </div>
                        <p className="text-[12px] font-medium text-white/45 mb-1">{f.label}</p>
                        <p className="text-[11px] text-white/25 leading-snug">{f.desc}</p>
                      </div>
                    );
                  })}
                </div>

                <button className="flex items-center gap-2 text-[12px] text-white/35 hover:text-white/60 transition-colors duration-200">
                  <span>View automation roadmap</span>
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
