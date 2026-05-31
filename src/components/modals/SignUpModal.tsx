import { useState } from 'react';
import {
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import {
  signUp,
  signInWithGoogle,
  signInWithGitHub,
} from '@backend/AuthFunctionality/auth';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SignUpModal({ isOpen, onClose, onSuccess }: SignUpModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'github' | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const isFormDisabled = isLoading || oauthLoading !== null || successMessage !== null;

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setAgreedToTerms(false);
    setError(null);
    setSuccessMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service to continue.');
      return;
    }

    setIsLoading(true);
    const result = await signUp({ fullName: fullName.trim(), email: email.trim(), password });
    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccessMessage('Account created! Check your email for a confirmation link, then log in.');
    setTimeout(() => {
      handleClose();
      onSuccess?.();
    }, 2500);
  };

  const handleGoogleSignup = async () => {
    setError(null);
    setOauthLoading('google');
    const result = await signInWithGoogle();
    setOauthLoading(null);
    if (!result.success) setError(result.error);
  };

  const handleGitHubSignup = async () => {
    setError(null);
    setOauthLoading('github');
    const result = await signInWithGitHub();
    setOauthLoading(null);
    if (!result.success) setError(result.error);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[480px] rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white"
          aria-label="Close modal"
        >
          <FiX className="text-[16px]" />
        </button>

        {/* Heading */}
        <h2
          id="signup-modal-title"
          className="text-[26px] font-semibold tracking-[-0.05em] text-white"
        >
          Create account
        </h2>
        <p className="mt-1.5 text-[12px] leading-[1.6] text-white/38">
          Start your CreatorOS workspace in minutes.
        </p>

        {/* Error / success banners */}
        {error && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
            <FiAlertCircle className="mt-0.5 shrink-0 text-[14px] text-red-400" />
            <p className="text-[12px] leading-[1.6] text-red-300">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
            <FiCheckCircle className="mt-0.5 shrink-0 text-[14px] text-green-400" />
            <p className="text-[12px] leading-[1.6] text-green-300">{successMessage}</p>
          </div>
        )}

        {/* OAuth */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={isFormDisabled}
            className="group flex h-[44px] items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-transparent px-4 text-[12px] font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {oauthLoading === 'google' ? <Spinner /> : <FaGoogle className="text-[14px]" />}
            <span>Google</span>
          </button>
          <button
            type="button"
            onClick={handleGitHubSignup}
            disabled={isFormDisabled}
            className="group flex h-[44px] items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-transparent px-4 text-[12px] font-medium text-white/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {oauthLoading === 'github' ? <Spinner /> : <FaGithub className="text-[14px]" />}
            <span>GitHub</span>
          </button>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/24">Or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          {/* Full name */}
          <div>
            <label htmlFor="signup-modal-name" className="mb-2 block text-[10px] font-medium text-white/80">
              Full name
            </label>
            <div className="group flex items-center gap-2.5 border-b border-white/10 pb-2.5 transition-all duration-300 focus-within:border-white/30">
              <FiUser className="text-[14px] text-white/30 transition-colors duration-300 group-focus-within:text-white/70" />
              <input
                id="signup-modal-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                autoComplete="name"
                disabled={isFormDisabled}
                className="w-full bg-transparent text-[13px] text-white placeholder:text-white/18 focus:outline-none disabled:opacity-50"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="signup-modal-email" className="mb-2 block text-[10px] font-medium text-white/80">
              Email address
            </label>
            <div className="group flex items-center gap-2.5 border-b border-white/10 pb-2.5 transition-all duration-300 focus-within:border-white/30">
              <FiMail className="text-[14px] text-white/30 transition-colors duration-300 group-focus-within:text-white/70" />
              <input
                id="signup-modal-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                autoComplete="email"
                disabled={isFormDisabled}
                className="w-full bg-transparent text-[13px] text-white placeholder:text-white/18 focus:outline-none disabled:opacity-50"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-modal-password" className="mb-2 block text-[10px] font-medium text-white/80">
              Password
            </label>
            <div className="group flex items-center gap-2.5 border-b border-white/10 pb-2.5 transition-all duration-300 focus-within:border-white/30">
              <FiLock className="text-[14px] text-white/30 transition-colors duration-300 group-focus-within:text-white/70" />
              <input
                id="signup-modal-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                autoComplete="new-password"
                disabled={isFormDisabled}
                className="w-full bg-transparent text-[13px] text-white placeholder:text-white/18 focus:outline-none disabled:opacity-50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/30 transition-colors duration-300 hover:text-white"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff className="text-[15px]" /> : <FiEye className="text-[15px]" />}
              </button>
            </div>
            {password.length > 0 && password.length < 6 && (
              <p className="mt-1.5 text-[10px] text-red-400/80">
                Password must be at least 6 characters.
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center justify-between pt-0.5">
            <label className="flex cursor-pointer items-center gap-2.5 text-[11px] text-white/38">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                disabled={isFormDisabled}
                className="h-4 w-4 rounded border-white/20 bg-transparent accent-white"
              />
              Agree to terms
            </label>
            <a
              href="#"
              className="text-[11px] text-white/38 transition-colors duration-300 hover:text-white"
            >
              View terms
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isFormDisabled}
            className="group flex h-[44px] w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Spinner />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Create account</span>
                <FiArrowRight className="text-[14px] transition-transform duration-300 group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

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
