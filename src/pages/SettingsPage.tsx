import { useState } from 'react';
import {
  User,
  Settings,
  Link,
  CreditCard,
  Bell,
  Code,
  AlertTriangle,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  FileText,
  Trash2,
  Download,
  ChevronDown,
  ChevronRight,
  Shield,
  CheckCircle2,
  XCircle,
  Plus,
  ExternalLink,
} from 'lucide-react';
import Sidebar from '../components/UserDashboard/Sidebar';
import TopBar from '../components/UserDashboard/TopBar';
import {
  YouTubeIcon,
  TwitterXIcon,
  LinkedInIcon,
  FacebookIcon,
  PinterestIcon,
  InstagramIcon,
} from '../assets/SocialLogos';

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

type SettingsTab =
  | 'profile'
  | 'account'
  | 'platforms'
  | 'billing'
  | 'notifications'
  | 'api'
  | 'danger';

interface MockUser {
  id: string;
  fullName: string;
  displayName: string;
  email: string;
  bio: string;
  youtubeChannelUrl: string;
  website: string;
  timezone: string;
  language: string;
  plan: 'free' | 'pro' | 'agency';
  planPrice: string;
  renewalDate: string;
  runsUsed: number;
  runsTotal: string;
  twoFaEnabled: boolean;
  emailVerified: boolean;
}

interface PlatformConnection {
  id: string;
  name: string;
  username: string | null;
  connected: boolean;
  lastSynced: string | null;
  permissions: string;
  color: string;
  bgColor: string;
  icon: React.ElementType;
}

interface BillingInvoice {
  id: string;
  date: string;
  description: string;
  amount: string;
  status: 'paid' | 'pending' | 'failed';
}

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string;
  status: 'active' | 'inactive';
  lastTriggered: string;
}

interface NotificationSettings {
  emailProjectComplete: boolean;
  emailWeeklyDigest: boolean;
  emailVoiceDrift: boolean;
  emailRobotError: boolean;
  emailBillingReceipts: boolean;
  emailProductUpdates: boolean;
  inAppPipelineStatus: boolean;
  inAppEngagementSpikes: boolean;
  inAppScheduledPosts: boolean;
  inAppCoachReport: boolean;
}

interface ProfileFormState {
  fullName: string;
  displayName: string;
  email: string;
  bio: string;
  youtubeChannelUrl: string;
  website: string;
}

interface PasswordFormState {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// ─────────────────────────────────────────────────────────────
// MOCK DATA
// ─────────────────────────────────────────────────────────────

// TODO: GET /api/users/me
const MOCK_USER: MockUser = {
  id: 'usr_jakereyes_001',
  fullName: 'Jake Reyes',
  displayName: 'jakereyes',
  email: 'jake@creatoros.app',
  bio: 'Content creator & AI enthusiast. Building in public. Helping creators scale smarter with AI-powered workflows.',
  youtubeChannelUrl: 'https://youtube.com/@JakeReyes',
  website: 'https://jakereyes.co',
  timezone: 'Asia/Manila',
  language: 'English (US)',
  plan: 'pro',
  planPrice: '$29/month',
  renewalDate: 'July 19, 2026',
  runsUsed: 5,
  runsTotal: '∞',
  twoFaEnabled: false,
  emailVerified: true,
};

// TODO: GET /api/platforms/connections
const PLATFORM_CONNECTIONS: PlatformConnection[] = [
  {
    id: 'youtube',
    name: 'YouTube',
    username: '@JakeReyes',
    connected: true,
    lastSynced: '2 min ago',
    permissions: 'Post, Read metrics',
    color: '#FF0000',
    bgColor: 'rgba(255,0,0,0.08)',
    icon: YouTubeIcon,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    username: '@jakereyes.creates',
    connected: true,
    lastSynced: '5 min ago',
    permissions: 'Post, Read metrics, Stories',
    color: '#E1306C',
    bgColor: 'rgba(225,48,108,0.08)',
    icon: InstagramIcon,
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    username: '@jakecreates',
    connected: true,
    lastSynced: '10 min ago',
    permissions: 'Post, Read timeline',
    color: '#ffffff',
    bgColor: 'rgba(255,255,255,0.06)',
    icon: TwitterXIcon,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    username: 'Jake Reyes',
    connected: true,
    lastSynced: '1h ago',
    permissions: 'Post, Read metrics',
    color: '#0077B5',
    bgColor: 'rgba(0,119,181,0.08)',
    icon: LinkedInIcon,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    username: null,
    connected: false,
    lastSynced: null,
    permissions: '',
    color: '#1877F2',
    bgColor: 'rgba(24,119,242,0.08)',
    icon: FacebookIcon,
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    username: null,
    connected: false,
    lastSynced: null,
    permissions: '',
    color: '#E60023',
    bgColor: 'rgba(230,0,35,0.08)',
    icon: PinterestIcon,
  },
];

// TODO: GET /api/billing/invoices
const BILLING_INVOICES: BillingInvoice[] = [
  { id: 'inv_001', date: 'Jun 19, 2026', description: 'CreatorOS Pro — Monthly', amount: '$29.00', status: 'paid' },
  { id: 'inv_002', date: 'May 19, 2026', description: 'CreatorOS Pro — Monthly', amount: '$29.00', status: 'paid' },
  { id: 'inv_003', date: 'Apr 19, 2026', description: 'CreatorOS Pro — Monthly', amount: '$29.00', status: 'paid' },
  { id: 'inv_004', date: 'Mar 19, 2026', description: 'CreatorOS Pro — Monthly', amount: '$29.00', status: 'paid' },
  { id: 'inv_005', date: 'Feb 19, 2026', description: 'CreatorOS Pro — Monthly', amount: '$29.00', status: 'paid' },
];

// TODO: GET /api/webhooks
const WEBHOOK_ENDPOINTS: WebhookEndpoint[] = [
  {
    id: 'wh_001',
    url: 'https://cloud.uipath.com/creatoros/webhooks/publish',
    events: 'output.approved, output.scheduled',
    status: 'active',
    lastTriggered: '12 min ago',
  },
  {
    id: 'wh_002',
    url: 'https://api.creatoros.app/webhooks/stripe',
    events: 'checkout.completed, subscription.updated',
    status: 'active',
    lastTriggered: '19 Jun 2026',
  },
];

const MOCK_API_KEY_MASKED = 'sk-cos-••••••••••••••••4f2a';
const MOCK_API_KEY_FULL   = 'sk-cos-a9f2k1m8p3q7r0t4u6v5w2x8y1z3b4f2a';

// ─────────────────────────────────────────────────────────────
// REUSABLE: TOGGLE
// ─────────────────────────────────────────────────────────────

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center w-10 h-5 rounded-full transition-colors duration-200 shrink-0 focus:outline-none ${
        checked ? 'bg-emerald-500' : 'bg-white/15'
      }`}
      aria-checked={checked}
      role="switch"
    >
      <span
        className={`inline-block w-3.5 h-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// REUSABLE: LAYOUT PRIMITIVES
// ─────────────────────────────────────────────────────────────

function SectionCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({
  title,
  subtitle,
  rightSlot,
}: {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <div className="px-6 py-5 border-b border-white/[0.05] flex items-center justify-between gap-4">
      <div>
        <h3 className="text-[14px] font-semibold text-white/90 tracking-[-0.02em]">{title}</h3>
        {subtitle && <p className="text-[12px] text-white/35 mt-0.5">{subtitle}</p>}
      </div>
      {rightSlot}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  readOnly = false,
  prefix,
  rightElement,
}: {
  label: string;
  value: string;
  onChange?: (val: string) => void;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  prefix?: string;
  rightElement?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] uppercase tracking-[0.18em] text-white/30">{label}</label>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-[13px] text-white/30 select-none pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          onChange={(e) => onChange?.(e.target.value)}
          className={`rounded-xl border border-white/8 bg-white/[0.04] text-white/80 text-[13px] py-2.5 placeholder:text-white/20 focus:outline-none focus:border-white/18 focus:bg-white/[0.06] transition-all w-full ${
            prefix ? 'pl-7 pr-3.5' : rightElement ? 'pl-3.5 pr-28' : 'px-3.5'
          } ${readOnly ? 'opacity-60 cursor-default' : ''}`}
        />
        {rightElement && (
          <div className="absolute right-3">{rightElement}</div>
        )}
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  className = '',
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-xl border border-white/12 bg-white/10 hover:bg-white/15 text-white/90 text-[13px] font-medium px-4 py-2.5 transition-all ${className}`}
    >
      {children}
    </button>
  );
}

function DangerButton({
  children,
  onClick,
  solid = false,
  disabled = false,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  solid?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl border text-[13px] font-medium px-4 py-2.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
        solid
          ? 'border-red-500/40 bg-red-500/20 hover:bg-red-500/30 text-red-300'
          : 'border-red-500/20 bg-red-500/10 hover:bg-red-500/18 text-red-400'
      } ${className}`}
    >
      {children}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION: PROFILE
// ─────────────────────────────────────────────────────────────

function ProfileSection() {
  const [form, setForm] = useState<ProfileFormState>({
    fullName: MOCK_USER.fullName,
    displayName: MOCK_USER.displayName,
    email: MOCK_USER.email,
    bio: MOCK_USER.bio,
    youtubeChannelUrl: MOCK_USER.youtubeChannelUrl,
    website: MOCK_USER.website,
  });

  const bioMax = 160;
  const bioLeft = bioMax - form.bio.length;

  const handleSave = () => {
    // TODO: PATCH /api/users/me with form data
  };

  return (
    <div className="space-y-4">
      <SectionCard>
        <CardHeader title="Profile" subtitle="Manage your public profile and creator identity." />
        <div className="p-6 space-y-6">

          {/* Avatar row */}
          <div className="flex items-center gap-5">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-white/40 to-white/10 shadow-[0_0_28px_rgba(255,255,255,0.18)] shrink-0">
              <span className="text-[18px] font-semibold text-white">JR</span>
            </div>
            <div>
              <p className="text-[14px] font-medium text-white/85">{form.fullName}</p>
              <p className="text-[12px] text-white/35 mb-3">@{form.displayName}</p>
              <div className="flex items-center gap-3">
                <PrimaryButton>
                  {/* TODO: POST /api/users/me/avatar with multipart/form-data */}
                  Change Photo
                </PrimaryButton>
                <button
                  type="button"
                  className="text-[12px] text-white/35 hover:text-white/60 transition-colors"
                >
                  {/* TODO: DELETE /api/users/me/avatar */}
                  Remove
                </button>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* Name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              value={form.fullName}
              onChange={(v) => setForm((f) => ({ ...f, fullName: v }))}
              placeholder="Jake Reyes"
            />
            <InputField
              label="Display Name / Handle"
              value={form.displayName}
              onChange={(v) => setForm((f) => ({ ...f, displayName: v }))}
              prefix="@"
              placeholder="jakereyes"
            />
          </div>

          {/* Email */}
          <InputField
            label="Email"
            value={form.email}
            readOnly
            rightElement={
              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5 whitespace-nowrap">
                <CheckCircle2 size={9} />
                Verified
              </span>
            }
          />

          {/* Bio */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-[0.18em] text-white/30">Bio</label>
              <span className={`text-[10px] ${bioLeft < 20 ? 'text-red-400' : 'text-white/30'}`}>
                {bioLeft} left
              </span>
            </div>
            <textarea
              value={form.bio}
              maxLength={bioMax}
              onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
              rows={3}
              placeholder="Tell your audience about yourself..."
              className="rounded-xl border border-white/8 bg-white/[0.04] text-white/80 text-[13px] px-3.5 py-2.5 placeholder:text-white/20 focus:outline-none focus:border-white/18 focus:bg-white/[0.06] transition-all w-full resize-none"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="YouTube Channel URL"
              value={form.youtubeChannelUrl}
              onChange={(v) => setForm((f) => ({ ...f, youtubeChannelUrl: v }))}
              placeholder="https://youtube.com/@handle"
            />
            <InputField
              label="Website"
              value={form.website}
              onChange={(v) => setForm((f) => ({ ...f, website: v }))}
              placeholder="https://yoursite.com"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-white/[0.05] flex justify-end">
          <PrimaryButton onClick={handleSave}>Save Changes</PrimaryButton>
        </div>
      </SectionCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION: ACCOUNT
// ─────────────────────────────────────────────────────────────

function AccountSection() {
  const [passwordForm, setPasswordForm] = useState<PasswordFormState>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [timezone, setTimezone] = useState(MOCK_USER.timezone);
  const [language, setLanguage] = useState(MOCK_USER.language);
  const [twoFaEnabled, setTwoFaEnabled] = useState(MOCK_USER.twoFaEnabled);
  const [showRecoveryCodes, setShowRecoveryCodes] = useState(false);

  const handlePasswordUpdate = () => {
    // TODO: PATCH /api/users/me/password with passwordForm
  };

  const handlePreferencesSave = () => {
    // TODO: PATCH /api/users/me with { timezone, language }
  };

  const handleToggle2fa = () => {
    // TODO: POST /api/users/me/2fa/enable or DELETE /api/users/me/2fa
    setTwoFaEnabled((v) => !v);
  };

  const TIMEZONES = [
    'Pacific/Honolulu', 'America/Los_Angeles', 'America/Denver',
    'America/Chicago', 'America/New_York', 'America/Sao_Paulo',
    'Europe/London', 'Europe/Berlin', 'Europe/Moscow',
    'Asia/Dubai', 'Asia/Kolkata', 'Asia/Bangkok', 'Asia/Manila',
    'Asia/Tokyo', 'Australia/Sydney',
  ];

  const LANGUAGES = [
    'English (US)', 'English (UK)', 'Spanish', 'French', 'German', 'Japanese',
  ];

  const MOCK_RECOVERY_CODES = [
    'RCX9-K2MN', 'QRTZ-7PLB', 'WNCA-3FTY', 'JMPZ-9DKR',
    'VXBS-5HTQ', 'LNKW-2GFC', 'YBDP-6SCM', 'TRXA-8ZVE',
  ];

  const selectCls =
    'rounded-xl border border-white/8 bg-white/[0.04] text-white/80 text-[13px] px-3.5 py-2.5 focus:outline-none focus:border-white/18 focus:bg-white/[0.06] transition-all w-full appearance-none';

  return (
    <div className="space-y-4">

      {/* Password */}
      <SectionCard>
        <CardHeader title="Change Password" subtitle="Update your password to keep your account secure." />
        <div className="p-6 space-y-4">
          <InputField
            label="Current Password"
            type="password"
            value={passwordForm.currentPassword}
            onChange={(v) => setPasswordForm((f) => ({ ...f, currentPassword: v }))}
            placeholder="••••••••"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(v) => setPasswordForm((f) => ({ ...f, newPassword: v }))}
              placeholder="••••••••"
            />
            <InputField
              label="Confirm New Password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(v) => setPasswordForm((f) => ({ ...f, confirmPassword: v }))}
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-1">
            {['8 or more characters', '1 uppercase letter', '1 number'].map((req) => (
              <p key={req} className="text-[11px] text-white/30 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                {req}
              </p>
            ))}
          </div>
        </div>
        <div className="px-6 py-4 border-t border-white/[0.05] flex justify-end">
          <PrimaryButton onClick={handlePasswordUpdate}>Update Password</PrimaryButton>
        </div>
      </SectionCard>

      {/* Timezone & Language */}
      <SectionCard>
        <CardHeader title="Timezone & Language" subtitle="Control how dates and content are localised." />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.18em] text-white/30">Timezone</label>
            <div className="relative">
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className={selectCls}
              >
                {TIMEZONES.map((tz) => (
                  <option key={tz} value={tz} className="bg-[#0a0a0a]">{tz}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.18em] text-white/30">Language</label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={selectCls}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang} className="bg-[#0a0a0a]">{lang}</option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-white/[0.05] flex justify-end">
          <PrimaryButton onClick={handlePreferencesSave}>Save Preferences</PrimaryButton>
        </div>
      </SectionCard>

      {/* 2FA */}
      <SectionCard>
        <CardHeader title="Two-Factor Authentication" subtitle="Add an extra layer of security to your account." />
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[13px] text-white/75 font-medium">2FA Status</p>
              <p className="text-[11px] text-white/35 mt-0.5">
                {twoFaEnabled
                  ? 'Your account is protected with two-factor authentication.'
                  : 'Enable 2FA to protect your account with an authenticator app.'}
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium shrink-0 ${
                twoFaEnabled
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : 'text-red-400 bg-red-500/10 border-red-500/20'
              }`}
            >
              {twoFaEnabled ? <><CheckCircle2 size={11} /> Enabled</> : <><XCircle size={11} /> Disabled</>}
            </span>
          </div>

          <PrimaryButton onClick={handleToggle2fa} className="w-fit">
            {twoFaEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </PrimaryButton>

          {twoFaEnabled && (
            <>
              <div className="h-px bg-white/5" />
              <button
                type="button"
                onClick={() => setShowRecoveryCodes((v) => !v)}
                className="flex items-center gap-2 text-[12px] text-white/45 hover:text-white/70 transition-colors"
              >
                {showRecoveryCodes ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                Recovery Codes
              </button>
              {showRecoveryCodes && (
                <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 space-y-3">
                  <p className="text-[11px] text-white/35 leading-relaxed">
                    Store these codes securely. Each code can be used once to access your account if you lose your authenticator device.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {MOCK_RECOVERY_CODES.map((code) => (
                      <span
                        key={code}
                        className="rounded-lg bg-white/[0.04] border border-white/8 px-3 py-1.5 text-[11px] font-mono text-white/60 text-center"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </SectionCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION: CONNECTED PLATFORMS
// ─────────────────────────────────────────────────────────────

function PlatformsSection() {
  const [connections, setConnections] = useState<PlatformConnection[]>(PLATFORM_CONNECTIONS);

  const handleConnect = (id: string) => {
    // TODO: GET /api/platforms/:id/oauth-url → redirect to OAuth flow
    console.log('Connect platform:', id);
  };

  const handleDisconnect = (id: string) => {
    // TODO: DELETE /api/platforms/:id/connection
    setConnections((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, connected: false, username: null, lastSynced: null } : p
      )
    );
  };

  const handleReconnect = (id: string) => {
    // TODO: GET /api/platforms/:id/oauth-url → redirect to OAuth re-auth flow
    console.log('Reconnect platform:', id);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {connections.map((platform) => {
          const Icon = platform.icon;
          return (
            <SectionCard key={platform.id}>
              <div className="p-5">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-xl border shrink-0"
                      style={{
                        backgroundColor: platform.bgColor,
                        borderColor: `${platform.color}25`,
                      }}
                    >
                      <Icon size={15} style={{ color: platform.color }} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-white/85 tracking-[-0.01em]">
                        {platform.name}
                      </p>
                      {platform.connected && platform.username && (
                        <p className="text-[11px] text-white/35 truncate">{platform.username}</p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-medium shrink-0 ${
                      platform.connected
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : 'text-white/30 bg-white/[0.04] border-white/8'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                        platform.connected ? 'bg-emerald-400' : 'bg-white/20'
                      }`}
                    />
                    {platform.connected ? 'Connected' : 'Not Connected'}
                  </span>
                </div>

                {/* Meta */}
                {platform.connected && (
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">Last synced</span>
                      <span className="text-[11px] text-white/40">{platform.lastSynced}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">Permissions</span>
                      <span className="text-[11px] text-white/40">{platform.permissions}</span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2.5">
                  {platform.connected ? (
                    <>
                      <PrimaryButton
                        onClick={() => handleReconnect(platform.id)}
                        className="text-[12px] px-3 py-2"
                      >
                        Reconnect
                      </PrimaryButton>
                      <button
                        type="button"
                        onClick={() => handleDisconnect(platform.id)}
                        className="text-[12px] text-white/30 hover:text-red-400 transition-colors"
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <PrimaryButton
                      onClick={() => handleConnect(platform.id)}
                      className="text-[12px] px-3 py-2"
                    >
                      Connect
                    </PrimaryButton>
                  )}
                </div>
              </div>
            </SectionCard>
          );
        })}
      </div>

      {/* Security note */}
      <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-5 py-4 flex items-start gap-3">
        <Shield size={14} className="text-white/30 mt-0.5 shrink-0" />
        <p className="text-[12px] text-white/35 leading-relaxed">
          Your platform tokens are encrypted at rest using AES-256. CreatorOS never stores your
          platform password — only OAuth access tokens with the minimum permissions required to
          publish content and read metrics.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION: BILLING
// ─────────────────────────────────────────────────────────────

function BillingSection() {
  const agencyFeatures = [
    '10 creator workspaces',
    'White-label PDF reports',
    'Priority AI queue',
    'Agency analytics dashboard',
    'Dedicated account manager',
  ];

  const handleUpgradeToAgency = () => {
    // TODO: POST /api/billing/upgrade { plan: 'agency' }
  };

  const handleUpdateCard = () => {
    // TODO: GET /api/billing/portal-session → redirect to Stripe portal
  };

  const handleDownloadInvoice = (_invoiceId: string) => {
    // TODO: GET /api/billing/invoices/:invoiceId/download → returns PDF blob
  };

  return (
    <div className="space-y-4">

      {/* Current Plan */}
      <div
        className="relative rounded-3xl border backdrop-blur-xl overflow-hidden"
        style={{ borderColor: 'rgba(147,51,234,0.25)', backgroundColor: 'rgba(147,51,234,0.04)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(147,51,234,0.08),transparent_60%)] pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent pointer-events-none" />

        <div className="relative p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
            <div>
              <span className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/15 px-3 py-1 text-[11px] font-semibold text-purple-300">
                Pro Plan
              </span>
              <p className="text-[26px] font-bold tracking-[-0.03em] text-white/90 mt-2">
                {MOCK_USER.planPrice}
              </p>
              <p className="text-[12px] text-white/35 mt-0.5">Renews {MOCK_USER.renewalDate}</p>
            </div>
            <button
              type="button"
              onClick={handleUpgradeToAgency}
              className="rounded-xl border border-purple-500/35 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-500/55 text-purple-300 text-[13px] font-medium px-4 py-2.5 transition-all"
            >
              Upgrade to Agency
            </button>
          </div>

          {/* Usage */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">AI Runs This Month</span>
              <span className="text-[11px] text-white/40">{MOCK_USER.runsUsed} of {MOCK_USER.runsTotal}</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div className="h-full w-[8%] rounded-full bg-gradient-to-r from-purple-500/70 to-purple-400" />
            </div>
          </div>

          {/* Agency feature list */}
          <div className="rounded-xl border border-purple-500/15 bg-purple-500/5 p-4">
            <p className="text-[11px] text-purple-400/70 font-medium mb-2">Unlock with Agency Plan:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {agencyFeatures.map((f) => (
                <p key={f} className="text-[11px] text-white/40 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-purple-500/50 shrink-0" />
                  {f}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <SectionCard>
        <CardHeader title="Payment Method" subtitle="Your current payment method on file." />
        <div className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-14 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04]">
              <CreditCard size={16} className="text-white/45" />
            </div>
            <div>
              <p className="text-[13px] text-white/80 font-medium">•••• •••• •••• 4242</p>
              <p className="text-[11px] text-white/35">Expires 08/27</p>
            </div>
          </div>
          <PrimaryButton onClick={handleUpdateCard}>Update Card</PrimaryButton>
        </div>
      </SectionCard>

      {/* Billing History */}
      <SectionCard>
        <CardHeader title="Billing History" subtitle="Your recent invoices and payment records." />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-white/[0.05]">
                {['Date', 'Description', 'Amount', 'Status', 'Invoice'].map((h) => (
                  <th key={h} className="py-3 px-5 text-left">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-medium">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BILLING_INVOICES.map((inv) => (
                <tr key={inv.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5">
                    <span className="text-[12px] text-white/50">{inv.date}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-[12px] text-white/70">{inv.description}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-[13px] font-semibold text-white/85">{inv.amount}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      <span className="w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                      Paid
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <button
                      type="button"
                      onClick={() => handleDownloadInvoice(inv.id)}
                      className="inline-flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/65 transition-colors"
                    >
                      <FileText size={11} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION: NOTIFICATIONS
// ─────────────────────────────────────────────────────────────

function NotificationsSection() {
  const [notifs, setNotifs] = useState<NotificationSettings>({
    emailProjectComplete: true,
    emailWeeklyDigest: true,
    emailVoiceDrift: true,
    emailRobotError: true,
    emailBillingReceipts: true,
    emailProductUpdates: false,
    inAppPipelineStatus: true,
    inAppEngagementSpikes: true,
    inAppScheduledPosts: true,
    inAppCoachReport: true,
  });

  const handleToggle = (key: keyof NotificationSettings) => {
    // TODO: PATCH /api/users/me/notifications with updated key-value pair
    setNotifs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const emailRows: { key: keyof NotificationSettings; label: string; desc: string }[] = [
    { key: 'emailProjectComplete', label: 'New project complete', desc: 'Get notified when your video finishes processing.' },
    { key: 'emailWeeklyDigest', label: 'Weekly performance digest', desc: 'Summary of your top posts and engagement every Sunday.' },
    { key: 'emailVoiceDrift', label: 'Voice drift alert', desc: 'When an output scores below your voice fidelity threshold.' },
    { key: 'emailRobotError', label: 'UiPath robot error', desc: 'When an automation robot encounters a publishing error.' },
    { key: 'emailBillingReceipts', label: 'Billing receipts', desc: 'Monthly invoice and payment confirmation emails.' },
    { key: 'emailProductUpdates', label: 'Product updates', desc: 'New features, changelogs, and announcements from CreatorOS.' },
  ];

  const inAppRows: { key: keyof NotificationSettings; label: string; desc: string }[] = [
    { key: 'inAppPipelineStatus', label: 'Pipeline status updates', desc: 'Live updates as your video moves through processing stages.' },
    { key: 'inAppEngagementSpikes', label: 'Engagement spikes', desc: 'Alerts when a post performs 3x above your rolling average.' },
    { key: 'inAppScheduledPosts', label: 'Scheduled posts published', desc: 'Confirmation when UiPath successfully publishes a post.' },
    { key: 'inAppCoachReport', label: 'AI Coach new report', desc: 'When your weekly AI coaching report is ready to view.' },
  ];

  return (
    <div className="space-y-4">
      <SectionCard>
        <CardHeader title="Email Notifications" subtitle="Control which emails CreatorOS sends you." />
        <div className="divide-y divide-white/[0.04]">
          {emailRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between px-6 py-4 gap-6">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white/80">{row.label}</p>
                <p className="text-[11px] text-white/35 mt-0.5">{row.desc}</p>
              </div>
              <Toggle checked={notifs[row.key]} onChange={() => handleToggle(row.key)} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard>
        <CardHeader title="In-App Notifications" subtitle="Control which notifications appear inside CreatorOS." />
        <div className="divide-y divide-white/[0.04]">
          {inAppRows.map((row) => (
            <div key={row.key} className="flex items-center justify-between px-6 py-4 gap-6">
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-white/80">{row.label}</p>
                <p className="text-[11px] text-white/35 mt-0.5">{row.desc}</p>
              </div>
              <Toggle checked={notifs[row.key]} onChange={() => handleToggle(row.key)} />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION: API & INTEGRATIONS
// ─────────────────────────────────────────────────────────────

function ApiSection() {
  const [apiKeyRevealed, setApiKeyRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const displayedKey = apiKeyRevealed ? MOCK_API_KEY_FULL : MOCK_API_KEY_MASKED;

  const handleCopy = () => {
    // TODO: copy MOCK_API_KEY_FULL to clipboard; in production use the actual key from API response
    navigator.clipboard.writeText(MOCK_API_KEY_FULL).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    // TODO: POST /api/keys/regenerate — invalidates old key, returns new one
  };

  const handleAddWebhook = () => {
    // TODO: open webhook creation modal → POST /api/webhooks
  };

  return (
    <div className="space-y-4">

      {/* API Key */}
      <SectionCard>
        <CardHeader title="API Key" subtitle="Use this key to authenticate requests to the CreatorOS API." />
        <div className="p-6 space-y-4">
          <div className="rounded-xl border border-white/8 bg-white/[0.03] p-4 flex items-center gap-3">
            <code className="text-[13px] font-mono text-white/60 flex-1 truncate select-all">
              {displayedKey}
            </code>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setApiKeyRevealed((v) => !v)}
                className="p-1.5 rounded-lg hover:bg-white/8 text-white/35 hover:text-white/65 transition-all"
                aria-label={apiKeyRevealed ? 'Hide API key' : 'Reveal API key'}
              >
                {apiKeyRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 rounded-lg hover:bg-white/8 text-white/35 hover:text-white/65 transition-all"
                aria-label="Copy API key"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>

          {copied && (
            <p className="text-[11px] text-emerald-400">Copied to clipboard.</p>
          )}

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="text-[11px] text-white/30">
              Last used: <span className="text-white/50">2 hours ago</span>
            </p>
            <button
              type="button"
              onClick={handleRegenerate}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/25 bg-amber-500/8 hover:bg-amber-500/15 text-amber-400 text-[12px] font-medium px-3.5 py-2 transition-all"
            >
              <RefreshCw size={12} />
              Regenerate Key
            </button>
          </div>

          <div className="rounded-xl border border-white/6 bg-white/[0.02] px-4 py-3">
            <p className="text-[11px] text-white/30 leading-relaxed">
              Keep your API key secret. If compromised, regenerate it immediately.
              Regenerating invalidates the current key and all active integrations that use it.
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Webhooks */}
      <SectionCard>
        <CardHeader
          title="Webhook Endpoints"
          subtitle="Receive real-time event callbacks from CreatorOS."
          rightSlot={
            <button
              type="button"
              onClick={handleAddWebhook}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/8 hover:bg-white/12 text-white/75 text-[12px] font-medium px-3.5 py-2 transition-all"
            >
              <Plus size={12} />
              Add Webhook
            </button>
          }
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px]">
            <thead>
              <tr className="border-b border-white/[0.04]">
                {['URL', 'Events', 'Status', 'Last Triggered'].map((h) => (
                  <th key={h} className="py-3 px-5 text-left">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-white/25 font-medium">{h}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WEBHOOK_ENDPOINTS.map((wh) => (
                <tr key={wh.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-5">
                    <code className="text-[11px] text-white/50 font-mono block truncate max-w-[200px]">
                      {wh.url}
                    </code>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-[11px] text-white/40">{wh.events}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      Active
                    </span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-[11px] text-white/35">{wh.lastTriggered}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Inngest */}
      <SectionCard>
        <CardHeader title="Inngest Integration" subtitle="Async job queue powering the CreatorOS AI pipeline." />
        <div className="p-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
              <Code size={14} className="text-white/55" />
            </div>
            <div>
              <p className="text-[13px] font-medium text-white/80">Inngest Event Relay</p>
              <p className="text-[11px] text-white/35 font-mono mt-0.5">evt-key: iev_••••••••••••3c9f</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              Connected
            </span>
            <a
              href="https://app.inngest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors"
            >
              Dashboard <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION: DANGER ZONE
// ─────────────────────────────────────────────────────────────

function DangerZoneSection() {
  const [confirming, setConfirming] = useState<string | null>(null);
  const [confirmInput, setConfirmInput] = useState('');

  const handleExportData = () => {
    // TODO: POST /api/users/me/export → triggers async job, sends download link via email
  };

  const handleDeleteAllProjects = () => {
    if (confirmInput !== 'DELETE') return;
    // TODO: DELETE /api/projects?scope=all — permanently removes all projects and outputs
    setConfirming(null);
    setConfirmInput('');
  };

  const handleDeleteAccount = () => {
    if (confirmInput !== 'DELETE') return;
    // TODO: DELETE /api/users/me — revokes tokens, cancels Stripe subscription, schedules data purge
    setConfirming(null);
    setConfirmInput('');
  };

  const openConfirm = (action: string) => {
    setConfirming(action);
    setConfirmInput('');
  };

  const closeConfirm = () => {
    setConfirming(null);
    setConfirmInput('');
  };

  return (
    <div
      className="rounded-3xl border backdrop-blur-xl overflow-hidden"
      style={{ borderColor: 'rgba(239,68,68,0.2)', backgroundColor: 'rgba(239,68,68,0.02)' }}
    >
      <div
        className="px-6 py-5 border-b flex items-center gap-2"
        style={{ borderColor: 'rgba(239,68,68,0.12)' }}
      >
        <AlertTriangle size={14} className="text-red-400" />
        <h3 className="text-[14px] font-semibold text-red-400 tracking-[-0.02em]">Danger Zone</h3>
      </div>

      {/* Export */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(239,68,68,0.08)' }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-3">
            <Download size={14} className="text-white/35 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] font-medium text-white/80">Export All Data</p>
              <p className="text-[12px] text-white/35 mt-0.5">
                Download a complete archive of your projects, outputs, and analytics.
              </p>
            </div>
          </div>
          <DangerButton onClick={handleExportData}>Export Data</DangerButton>
        </div>
      </div>

      {/* Delete All Projects */}
      <div className="p-6 border-b" style={{ borderColor: 'rgba(239,68,68,0.08)' }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-3">
            <Trash2 size={14} className="text-white/35 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] font-medium text-white/80">Delete All Projects</p>
              <p className="text-[12px] text-white/35 mt-0.5">
                Permanently delete all projects and generated outputs. This cannot be undone.
              </p>
            </div>
          </div>
          {confirming !== 'delete-projects' && (
            <DangerButton onClick={() => openConfirm('delete-projects')}>
              Delete All Projects
            </DangerButton>
          )}
        </div>
        {confirming === 'delete-projects' && (
          <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 space-y-3">
            <p className="text-[12px] text-red-400/80 leading-relaxed">
              This will permanently delete all your projects, transcripts, and generated outputs.{' '}
              Type <span className="font-bold text-red-400">DELETE</span> to confirm.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="Type DELETE"
                className="rounded-xl border border-red-500/25 bg-red-500/5 text-red-300 text-[13px] px-3.5 py-2.5 placeholder:text-red-500/30 focus:outline-none focus:border-red-500/40 transition-all w-36"
              />
              <DangerButton
                solid
                disabled={confirmInput !== 'DELETE'}
                onClick={handleDeleteAllProjects}
              >
                Confirm Delete
              </DangerButton>
              <button
                type="button"
                onClick={closeConfirm}
                className="text-[12px] text-white/30 hover:text-white/55 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Account */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-3">
            <XCircle size={14} className="text-red-400/60 mt-0.5 shrink-0" />
            <div>
              <p className="text-[13px] font-medium text-red-400">Delete Account</p>
              <p className="text-[12px] text-white/35 mt-0.5">
                Permanently delete your account and all associated data. This action is irreversible.
              </p>
            </div>
          </div>
          {confirming !== 'delete-account' && (
            <DangerButton solid onClick={() => openConfirm('delete-account')}>
              Delete Account
            </DangerButton>
          )}
        </div>
        {confirming === 'delete-account' && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/8 p-4 space-y-3">
            <p className="text-[12px] text-red-400/90 leading-relaxed">
              This will permanently delete your CreatorOS account, cancel your subscription, and erase
              all associated data. Type <span className="font-bold text-red-300">DELETE</span> to confirm.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder="Type DELETE"
                className="rounded-xl border border-red-500/30 bg-red-500/8 text-red-300 text-[13px] px-3.5 py-2.5 placeholder:text-red-500/30 focus:outline-none focus:border-red-500/50 transition-all w-36"
              />
              <DangerButton
                solid
                disabled={confirmInput !== 'DELETE'}
                onClick={handleDeleteAccount}
              >
                Permanently Delete Account
              </DangerButton>
              <button
                type="button"
                onClick={closeConfirm}
                className="text-[12px] text-white/30 hover:text-white/55 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// LEFT SETTINGS NAV
// ─────────────────────────────────────────────────────────────

interface SettingsNavItem {
  id: SettingsTab;
  label: string;
  icon: React.ElementType;
  danger?: boolean;
}

const SETTINGS_NAV: SettingsNavItem[] = [
  { id: 'profile',       label: 'Profile',              icon: User },
  { id: 'account',       label: 'Account',              icon: Settings },
  { id: 'platforms',     label: 'Connected Platforms',  icon: Link },
  { id: 'billing',       label: 'Billing',              icon: CreditCard },
  { id: 'notifications', label: 'Notifications',        icon: Bell },
  { id: 'api',           label: 'API & Integrations',   icon: Code },
  { id: 'danger',        label: 'Danger Zone',          icon: AlertTriangle, danger: true },
];

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

  const renderSection = (): React.ReactNode => {
    switch (activeTab) {
      case 'profile':       return <ProfileSection />;
      case 'account':       return <AccountSection />;
      case 'platforms':     return <PlatformsSection />;
      case 'billing':       return <BillingSection />;
      case 'notifications': return <NotificationsSection />;
      case 'api':           return <ApiSection />;
      case 'danger':        return <DangerZoneSection />;
    }
  };

  const activeItem = SETTINGS_NAV.find((n) => n.id === activeTab);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#060606]">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-none">

            {/* Page header */}
            <div className="flex items-center gap-2 mb-6">
              <Settings size={18} className="text-white/40" />
              <h1 className="text-[22px] font-bold tracking-[-0.03em] text-white/90">Settings</h1>
            </div>

            {/* Two-column layout */}
            <div className="flex gap-5 items-start">

              {/* ── LEFT NAV (sticky) ── */}
              <div className="w-[220px] shrink-0 sticky top-6">
                <div className="rounded-3xl border border-white/8 bg-white/[0.025] backdrop-blur-xl p-2 space-y-0.5">
                  {SETTINGS_NAV.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveTab(item.id)}
                        className={`group relative flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-all duration-200 text-left ${
                          isActive
                            ? item.danger
                              ? 'bg-red-500/12 border border-red-500/20 text-red-400'
                              : 'bg-white/[0.08] border border-white/10 text-white'
                            : item.danger
                            ? 'border border-transparent text-red-500/60 hover:bg-red-500/6 hover:border-red-500/12 hover:text-red-400'
                            : 'border border-transparent text-white/45 hover:bg-white/[0.04] hover:border-white/6 hover:text-white/75'
                        }`}
                      >
                        {/* Active left bar (non-danger only) */}
                        {isActive && !item.danger && (
                          <div className="absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-full bg-white" />
                        )}

                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-xl shrink-0 transition-colors ${
                            isActive
                              ? item.danger
                                ? 'bg-red-500/15 text-red-400'
                                : 'bg-white/12 text-white'
                              : item.danger
                              ? 'bg-red-500/6 text-red-500/50 group-hover:text-red-400'
                              : 'bg-white/[0.04] text-white/35 group-hover:text-white/65'
                          }`}
                        >
                          <Icon size={13} />
                        </div>

                        <span className="text-[12.5px] font-medium leading-tight">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── RIGHT CONTENT ── */}
              <div className="flex-1 min-w-0">
                {activeItem && (
                  <div className="flex items-center gap-2 mb-5">
                    <activeItem.icon
                      size={15}
                      className={activeItem.danger ? 'text-red-400/60' : 'text-white/30'}
                    />
                    <h2
                      className={`text-[16px] font-semibold tracking-[-0.02em] ${
                        activeItem.danger ? 'text-red-400' : 'text-white/85'
                      }`}
                    >
                      {activeItem.label}
                    </h2>
                  </div>
                )}

                {renderSection()}
              </div>

            </div>

            <div className="h-10" />

          </div>
        </main>
      </div>
    </div>
  );
}
