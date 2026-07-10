import {
  LayoutDashboard,
  FolderOpen,
  BarChart2,
  Zap,
  Settings,
  Archive,
  ChevronDown,
  Sparkles,
  Activity,
  Cpu,
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import sidebarBg from '../../assets/SIDEBAR.svg';
import creatorOSLogo from '../../assets/CREATOROS.svg';
import creatorOSTextLogo from '../../assets/CREATOROSTEXTLOGO.svg';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderOpen, label: 'Projects', path: '/dashboard/projects' },
    { icon: BarChart2, label: 'Analytics', path: '/dashboard/analytics' },
  ];

  const automationItems: NavItem[] = [
    { icon: Zap, label: 'Automation', path: '/dashboard/automation' },
    { icon: Cpu, label: 'AI Engine', path: '/dashboard/ai-engine' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="dashboard-sidebar relative w-72.5 shrink-0 h-screen overflow-hidden">
      {/* ====================================================== */}
      {/* PREMIUM BACKGROUND */}
      {/* ====================================================== */}

      <div className="absolute inset-0">
        <img
          src={sidebarBg}
          alt=""
          aria-hidden="true"
          className="sidebar-bg-img absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Border */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/10 to-transparent" />
      </div>

      {/* ====================================================== */}
      {/* CONTENT */}
      {/* ====================================================== */}

      <div className="relative z-10 flex h-full flex-col">

        {/* ====================================================== */}
        {/* LOGO — pinned top */}
        {/* ====================================================== */}

        <div className="shrink-0 px-6 pt-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
              <img
                src={creatorOSLogo}
                alt="CreatorOS"
                className="h-6 w-6"
              />
            </div>

            <div className="flex flex-col gap-1">
              <img
                src={creatorOSTextLogo}
                alt="CreatorOS"
                className="h-4"
              />

              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                AI Operating System
              </p>
            </div>
          </div>
        </div>

        <div className="shrink-0 px-4">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* ====================================================== */}
        {/* SCROLLABLE MIDDLE */}
        {/* ====================================================== */}

        <div className="relative min-h-0 flex-1">
          {/* Top fade mask */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-6 bg-linear-to-b from-black/30 to-transparent" />

          {/* Bottom fade mask */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-10 bg-linear-to-t from-black/40 to-transparent" />

          <div className="sidebar-scroll h-full overflow-y-auto overflow-x-hidden py-2">

            {/* NAVIGATION */}
            <div className="px-4 mt-4">
              <p className="px-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white/25 mb-3">
                Workspace
              </p>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      className={`group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
                        active
                          ? 'border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(255,255,255,0.08)]'
                          : 'hover:bg-white/4 border border-transparent hover:border-white/6'
                      }`}
                    >
                      {active && (
                        <>
                          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.12),transparent_70%)]" />
                          <div className="active-bar absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-white" />
                        </>
                      )}

                      <div
                        className={`relative flex h-9 w-9 items-center justify-center rounded-xl ${
                          active
                            ? 'bg-white/15 text-white'
                            : 'bg-white/3 text-white/55 group-hover:text-white'
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <span
                        className={`relative text-[13.5px] font-medium ${
                          active
                            ? 'text-white'
                            : 'text-white/55 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AUTOMATION */}
            <div className="px-4 mt-8">
              <p className="px-3 text-[10px] font-medium uppercase tracking-[0.25em] text-white/25 mb-3">
                Automation
              </p>

              <div className="space-y-2">
                {automationItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);

                  return (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      className={`group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 ${
                        active
                          ? 'border border-white/10 bg-white/5 shadow-[0_0_60px_rgba(255,255,255,0.08)]'
                          : 'hover:bg-white/4 border border-transparent hover:border-white/6'
                      }`}
                    >
                      {active && (
                        <>
                          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.12),transparent_70%)]" />
                          <div className="active-bar absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-white" />
                        </>
                      )}

                      <div
                        className={`relative flex h-9 w-9 items-center justify-center rounded-xl ${
                          active
                            ? 'bg-white/15 text-white'
                            : 'bg-white/3 text-white/55 group-hover:text-white'
                        }`}
                      >
                        <Icon size={17} />
                      </div>

                      <span
                        className={`relative text-[13.5px] font-medium ${
                          active
                            ? 'text-white'
                            : 'text-white/55 group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CREATOR INTELLIGENCE CARD */}
            <div className="px-4 mt-8">
              <div className="relative overflow-hidden rounded-3xl border border-white/8 bg-white/3 p-4 backdrop-blur-xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_70%)]" />

                <div className="relative">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-white/80" />
                    <span className="text-[12px] font-medium text-white">
                      Creator Intelligence
                    </span>
                  </div>

                  <p className="mt-2 text-[11px] leading-relaxed text-white/45">
                    AI insights and performance analytics across your content ecosystem.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-white text-sm font-semibold">847</p>
                      <p className="text-[10px] text-white/35">Outputs</p>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">98%</p>
                      <p className="text-[10px] text-white/35">Fidelity</p>
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">+24%</p>
                      <p className="text-[10px] text-white/35">Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PLAN CARD */}
            <div className="px-4 mt-4 pb-4">
              <div className="rounded-3xl border border-white/8 bg-white/2.5 p-4">
                <div className="flex items-center">
                  <Archive size={14} className="text-white/80" />
                  <span className="ml-2 text-[12px] font-medium text-white">
                    Pro Plan
                  </span>
                  <span className="ml-auto rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold text-emerald-300">
                    Active
                  </span>
                </div>

                <p className="mt-3 text-[11px] text-white/40">
                  5 of ∞ runs used
                </p>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[8%] rounded-full bg-linear-to-r from-white/70 to-white" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ====================================================== */}
        {/* USER PROFILE — pinned bottom */}
        {/* ====================================================== */}

        <div className="shrink-0 px-4">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="shrink-0 px-4 py-4">
          <button className="group flex w-full items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-3 py-3 transition-all duration-300 hover:bg-white/5 hover:border-white/12">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-white/40 to-white/10 shadow-[0_0_20px_rgba(255,255,255,0.18)]">
              <span className="text-[11px] font-semibold text-white">
                JR
              </span>
            </div>

            <div className="flex flex-col items-start">
              <span className="text-[13px] font-medium text-white">
                Jake Reyes
              </span>
              <span className="text-[11px] text-white/35">
                jake@creatoros.app
              </span>
            </div>

            <Activity size={14} className="ml-auto text-emerald-300 opacity-80" />
            <ChevronDown size={14} className="text-white/25 transition-transform group-hover:rotate-180" />
          </button>
        </div>

      </div>
    </aside>
  );
}
