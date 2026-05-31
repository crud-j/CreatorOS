import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import {
  FiLogOut,
  FiFolder,
  FiActivity,
  FiSettings,
  FiVideo,
  FiBarChart2,
  FiCalendar,
} from 'react-icons/fi';

import { getSession, signOut } from '@backend/AuthFunctionality/auth';
import WelcomeModal from '@/components/modals/WelcomeModal';

// ─── Stat card data ────────────────────────────────────────────────────────────

const statCards = [
  {
    label: 'Projects',
    value: '0',
    description: 'Videos processed so far',
    icon: FiFolder,
  },
  {
    label: 'Activity',
    value: '0',
    description: 'Content pieces generated',
    icon: FiActivity,
  },
  {
    label: 'Settings',
    value: '—',
    description: 'Configure your workspace',
    icon: FiSettings,
  },
];

const quickActions = [
  {
    label: 'Upload video',
    description: 'Paste a URL or upload an MP4',
    icon: FiVideo,
    href: '#upload',
  },
  {
    label: 'Analytics',
    description: 'View engagement metrics',
    icon: FiBarChart2,
    href: '#analytics',
  },
  {
    label: 'Schedule',
    description: 'Manage your content calendar',
    icon: FiCalendar,
    href: '#schedule',
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();

  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  // ─── Auth gate on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const s = await getSession();
      if (cancelled) return;

      if (!s) {
        navigate('/login', { replace: true });
        return;
      }

      setSession(s);
      setIsCheckingAuth(false);

      // Show welcome modal on first visit
      const welcomed = localStorage.getItem('dashboard_welcomed');
      if (!welcomed) {
        setShowWelcome(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleDismissWelcome = () => {
    localStorage.setItem('dashboard_welcomed', '1');
    setShowWelcome(false);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut();
    navigate('/login', { replace: true });
  };

  // ─── Auth loading state ──────────────────────────────────────────────────────
  if (isCheckingAuth) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#030303]">
        <Spinner />
      </div>
    );
  }

  // ─── Derive display values from session ─────────────────────────────────────
  const userMeta = session?.user?.user_metadata ?? {};
  const displayName: string =
    (userMeta.full_name as string | undefined) ||
    (userMeta.name as string | undefined) ||
    session?.user?.email?.split('@')[0] ||
    'Creator';

  const email = session?.user?.email ?? '';

  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#030303] text-white">

      {/* ── Top Nav ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-white/[0.06] bg-[#030303]/80 px-6 backdrop-blur-md">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
            <span className="text-[10px] font-semibold tracking-tight text-white">C</span>
          </div>
          <span className="text-[13px] font-medium tracking-[-0.03em] text-white">CreatorOS</span>
        </div>

        {/* User + sign-out */}
        <div className="flex items-center gap-4">
          <span className="hidden text-[12px] text-white/40 sm:block">{email}</span>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="flex h-8 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 text-[12px] font-medium text-white/60 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Sign out"
          >
            {isSigningOut ? <Spinner /> : <FiLogOut className="text-[14px]" />}
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-[1100px] px-6 py-10">

        {/* User overview */}
        <section className="flex items-center gap-5">
          {/* Avatar */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-[18px] font-semibold tracking-tight text-white">
            {initials}
          </div>
          <div>
            <h1 className="text-[22px] font-semibold tracking-[-0.05em] text-white">
              {displayName}
            </h1>
            <p className="mt-0.5 text-[12px] text-white/36">{email}</p>
          </div>
        </section>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/[0.06]" />

        {/* Stat cards */}
        <section>
          <h2 className="mb-4 text-[10px] uppercase tracking-[0.18em] text-white/28">
            Account overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-white/50">{card.label}</span>
                  <card.icon className="text-[15px] text-white/20" />
                </div>
                <div className="text-[28px] font-semibold tracking-[-0.06em] text-white">
                  {card.value}
                </div>
                <p className="text-[11px] text-white/28">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/[0.06]" />

        {/* Quick actions */}
        <section>
          <h2 className="mb-4 text-[10px] uppercase tracking-[0.18em] text-white/28">
            Quick actions
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.05]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                  <action.icon className="text-[15px] text-white/50" />
                </div>
                <div>
                  <div className="text-[13px] font-medium text-white/80">{action.label}</div>
                  <div className="mt-0.5 text-[11px] text-white/30">{action.description}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Placeholder: recent projects */}
        <section className="mt-10">
          <h2 className="mb-4 text-[10px] uppercase tracking-[0.18em] text-white/28">
            Recent projects
          </h2>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01] py-16 text-center">
            <FiVideo className="mb-3 text-[24px] text-white/16" />
            <p className="text-[13px] text-white/28">No projects yet</p>
            <p className="mt-1 text-[11px] text-white/18">
              Upload a video or paste a YouTube URL to get started.
            </p>
          </div>
        </section>
      </main>

      {/* ── Welcome modal ────────────────────────────────────────────────────── */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={handleDismissWelcome}
        userName={displayName}
      />
    </div>
  );
}

// ─── Inline spinner ────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin text-white/60"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
