import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';

import {
  FaGithub,
  FaGoogle,
} from 'react-icons/fa';

import CardNav from '../components/CardNav';
import {
  signIn,
  signInWithGoogle,
  signInWithGitHub,
  sendPasswordResetEmail,
} from '@backend/AuthFunctionality/auth';

const navItems = [
  {
    label: 'Product',
    bgColor: 'var(--color-nav-card-product)',
    textColor: 'var(--color-nav-card-product-text)',
    links: [
      { label: 'How it works', href: '/#how-it-works', ariaLabel: 'How it works' },
      { label: 'Features', href: '/#features', ariaLabel: 'Features' },
      { label: 'Examples', href: '/#examples', ariaLabel: 'Examples' },
    ],
  },
  {
    label: 'Resources',
    bgColor: 'var(--color-nav-card-resources)',
    textColor: 'var(--color-nav-card-resources-text)',
    links: [
      { label: 'Wall of Love', href: '/#testimonials', ariaLabel: 'Testimonials' },
      { label: 'Pricing', href: '/#pricing', ariaLabel: 'Pricing' },
      { label: 'FAQ', href: '/#faq', ariaLabel: 'FAQ' },
    ],
  },
  {
    label: 'Company',
    bgColor: 'var(--color-nav-card-company)',
    textColor: 'var(--color-nav-card-company-text)',
    links: [
      { label: 'Log In', href: '/login', ariaLabel: 'Log in' },
      { label: 'Sign Up', href: '/signup', ariaLabel: 'Sign up' },
      { label: 'Contact', href: '/#contact', ariaLabel: 'Contact us' },
    ],
  },
];

const features = [
  {
    title: '30+ outputs per upload',
    description: 'Scripts, captions, threads, and briefs tailored for each platform.',
  },
  {
    title: 'Voice-locked AI',
    description: 'Tone checks and embeddings keep every draft on-brand.',
  },
  {
    title: 'Autopublish robots',
    description: 'Schedule once and let UiPath handle posting windows.',
  },
];

const stats = [
  { value: '30+', label: 'Outputs per project' },
  { value: '6', label: 'Platforms' },
  { value: '0.72+', label: 'Voice score target' },
];

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // ─── Email / password login ────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResetMessage(null);

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setIsLoading(true);

    const result = await signIn({ email: email.trim(), password });

    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    // Successful sign-in — navigate to dashboard (or home as fallback)
    navigate('/dashboard');
  };

  // ─── OAuth ─────────────────────────────────────────────────────────────────
  const handleGoogleLogin = async () => {
    setError(null);
    setOauthLoading('google');
    const result = await signInWithGoogle();
    setOauthLoading(null);
    if (!result.success) setError(result.error);
    // On success the browser redirects automatically
  };

  const handleGitHubLogin = async () => {
    setError(null);
    setOauthLoading('github');
    const result = await signInWithGitHub();
    setOauthLoading(null);
    if (!result.success) setError(result.error);
    // On success the browser redirects automatically
  };

  // ─── Forgot password ───────────────────────────────────────────────────────
  const handleForgotPassword = async () => {
    setError(null);
    setResetMessage(null);

    if (!email.trim()) {
      setError('Enter your email address above, then click "Forgot password?".');
      return;
    }

    setIsLoading(true);
    const result = await sendPasswordResetEmail(email.trim());
    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setResetMessage(`Password reset email sent to ${email.trim()}. Check your inbox.`);
  };

  const isFormDisabled = isLoading || oauthLoading !== null;

  return (
    <div className="relative h-screen overflow-hidden bg-[#030303] text-white">
      <CardNav items={navItems} />

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-18%] left-[5%] h-[720px] w-[720px] rounded-full bg-white/[0.035] blur-[200px]" />
        <div className="absolute bottom-[-22%] right-[10%] h-[680px] w-[680px] rounded-full bg-white/[0.025] blur-[200px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '4px 4px',
            maskImage: 'radial-gradient(circle at center top, black 14%, transparent 84%)',
            WebkitMaskImage: 'radial-gradient(circle at center top, black 14%, transparent 84%)',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 h-screen px-4 pb-5 pt-18 lg:px-10">
        <div className="mx-auto grid h-[calc(100vh-4.5rem)] max-w-[1200px] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">

          {/* LEFT SIDE */}
          <div className="relative flex h-full items-center">
            <div className="max-w-[440px]">
              <div className="inline-flex items-center rounded-full border border-white/10 px-3 py-1">
                <span className="text-[8px] uppercase tracking-[0.22em] text-white/42">CreatorOS</span>
              </div>

              <div className="mt-5">
                <h1 className="text-[40px] font-semibold leading-[1] tracking-[-0.06em] text-white">
                  The operating
                  <span className="block">system for modern</span>
                  <span className="block">creators.</span>
                </h1>
                <p className="mt-4 max-w-[390px] text-[14px] leading-[1.6] text-white/38">
                  Turn one video into a full publishing system with transcripts, viral moments, and platform-native outputs.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                {features.map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="mt-1 h-[8px] w-[8px] rounded-full border border-white/20 bg-white/10" />
                    <div>
                      <h3 className="text-[15px] font-medium tracking-[-0.03em] text-white">{feature.title}</h3>
                      <p className="mt-1 text-[12px] leading-[1.6] text-white/34">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 h-px w-full bg-white/8" />

              <div className="mt-5 grid grid-cols-3 gap-5">
                {stats.map((item) => (
                  <div key={item.label}>
                    <div className="text-[22px] font-semibold tracking-[-0.06em] text-white">{item.value}</div>
                    <div className="mt-1 text-[10px] text-white/30">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE — FORM */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-[520px]">
              <div>
                <h2 className="text-[34px] font-semibold tracking-[-0.06em] text-white">Sign in</h2>
                <p className="mt-2 text-[13px] leading-[1.6] text-white/38">
                  Welcome back. Please sign in to continue.
                </p>
              </div>

              {/* ERROR / SUCCESS BANNERS */}
              {error && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
                  <FiAlertCircle className="mt-0.5 shrink-0 text-[15px] text-red-400" />
                  <p className="text-[12px] leading-[1.6] text-red-300">{error}</p>
                </div>
              )}

              {resetMessage && (
                <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
                  <FiCheckCircle className="mt-0.5 shrink-0 text-[15px] text-green-400" />
                  <p className="text-[12px] leading-[1.6] text-green-300">{resetMessage}</p>
                </div>
              )}

              {/* SOCIAL BUTTONS */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isFormDisabled}
                  className="group flex h-[48px] items-center justify-center gap-3 rounded-2xl border border-white/10 bg-transparent px-4 text-[12px] font-medium text-white/72 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {oauthLoading === 'google' ? (
                    <Spinner />
                  ) : (
                    <FaGoogle className="text-[16px]" />
                  )}
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={handleGitHubLogin}
                  disabled={isFormDisabled}
                  className="group flex h-[48px] items-center justify-center gap-3 rounded-2xl border border-white/10 bg-transparent px-4 text-[12px] font-medium text-white/72 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {oauthLoading === 'github' ? (
                    <Spinner />
                  ) : (
                    <FaGithub className="text-[16px]" />
                  )}
                  <span>Continue with GitHub</span>
                </button>
              </div>

              {/* DIVIDER */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-white/24">Or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* FORM */}
              <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                {/* EMAIL */}
                <div>
                  <label htmlFor="login-email" className="mb-2.5 block text-[10px] font-medium text-white/88">
                    Email address
                  </label>
                  <div className="group flex items-center gap-2.5 border-b border-white/10 pb-3 transition-all duration-300 focus-within:border-white/30">
                    <FiMail className="text-[15px] text-white/30 transition-colors duration-300 group-focus-within:text-white/80" />
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      autoComplete="email"
                      disabled={isFormDisabled}
                      className="w-full bg-transparent text-[14px] text-white placeholder:text-white/18 focus:outline-none disabled:opacity-50"
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div>
                  <label htmlFor="login-password" className="mb-2.5 block text-[10px] font-medium text-white/88">
                    Password
                  </label>
                  <div className="group flex items-center gap-2.5 border-b border-white/10 pb-3 transition-all duration-300 focus-within:border-white/30">
                    <FiLock className="text-[15px] text-white/30 transition-colors duration-300 group-focus-within:text-white/80" />
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      disabled={isFormDisabled}
                      className="w-full bg-transparent text-[14px] text-white placeholder:text-white/18 focus:outline-none disabled:opacity-50"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-white/30 transition-colors duration-300 hover:text-white"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <FiEyeOff className="text-[16px]" />
                      ) : (
                        <FiEye className="text-[16px]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex cursor-pointer items-center gap-2.5 text-[11px] text-white/38">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-white/20 bg-transparent accent-white"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isFormDisabled}
                    className="text-[11px] text-white/38 transition-colors duration-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isFormDisabled}
                  className="group relative mt-1 flex h-[46px] w-full items-center justify-center gap-3.5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      <span className="relative z-10">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">Sign in</span>
                      <FiArrowRight className="relative z-10 text-[15px] transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>

              {/* FOOTER */}
              <p className="mt-6 text-center text-[12px] text-white/34">
                Don&apos;t have an account?{' '}
                <Link
                  to="/signup"
                  className="font-medium text-white underline underline-offset-4 transition-opacity hover:opacity-70"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
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
