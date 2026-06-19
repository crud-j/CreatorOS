import { Settings, User, CreditCard, Bell, Shield, Link, ChevronRight } from 'lucide-react';
import Sidebar from '../components/UserDashboard/Sidebar';
import TopBar from '../components/UserDashboard/TopBar';

const settingsSections = [
  {
    label: 'Account',
    icon: User,
    description: 'Manage your profile, email, and password',
  },
  {
    label: 'Billing',
    icon: CreditCard,
    description: 'Subscription plan, usage, and invoices',
    badge: 'Pro',
    badgeCls: 'bg-emerald-500/15 text-emerald-300',
  },
  {
    label: 'Notifications',
    icon: Bell,
    description: 'Email alerts and in-app notification preferences',
  },
  {
    label: 'Security',
    icon: Shield,
    description: 'Password, two-factor authentication, and sessions',
  },
  {
    label: 'Integrations',
    icon: Link,
    description: 'Connect YouTube, Instagram, LinkedIn, and more',
  },
];

export default function SettingsPage() {
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
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(255,255,255,0.04),transparent_65%)]" />
              </div>
              <div className="relative z-10 px-8 py-7 flex items-center gap-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/4">
                  <Settings size={20} className="text-white/70" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.32em] text-white/28 mb-1">Account · Settings</p>
                  <h1 className="text-[26px] font-semibold tracking-[-0.04em] text-white">Settings</h1>
                  <p className="text-[13px] text-white/38 mt-0.5">Account, billing, integrations, and preferences</p>
                </div>
              </div>
            </div>

            {/* Settings sections */}
            <div className="space-y-2.5">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.label}
                    className="group relative w-full overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/14 transition-all duration-300 text-left"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgba(255,255,255,0.03),transparent_55%)] pointer-events-none" />
                    <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-white/0 group-hover:bg-white/12 transition-all duration-300" />

                    <div className="relative z-10 flex items-center gap-5 px-7 py-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/3 group-hover:bg-white/6 transition-colors duration-200">
                        <Icon size={16} className="text-white/55 group-hover:text-white/80 transition-colors" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5">
                          <span className="text-[14px] font-medium text-white/75 group-hover:text-white transition-colors">
                            {section.label}
                          </span>
                          {section.badge && (
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${section.badgeCls}`}>
                              {section.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-white/30 mt-0.5">{section.description}</p>
                      </div>

                      <ChevronRight size={15} className="text-white/18 group-hover:text-white/45 transition-all duration-200 group-hover:translate-x-0.5" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Danger zone */}
            <div className="mt-6 rounded-3xl border border-red-500/10 bg-red-500/[0.02] p-6">
              <p className="text-[10px] uppercase tracking-[0.22em] text-red-400/40 mb-4">Danger Zone</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] font-medium text-white/45">Delete Account</p>
                  <p className="text-[12px] text-white/25 mt-0.5">Permanently delete your account and all associated data</p>
                </div>
                <button className="h-9 px-4 rounded-2xl border border-red-500/20 bg-red-500/8 hover:bg-red-500/15 hover:border-red-500/35 text-[12px] text-red-400/70 hover:text-red-400 transition-all duration-200">
                  Delete Account
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
