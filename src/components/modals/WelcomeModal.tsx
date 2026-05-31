import { FiArrowRight, FiX } from 'react-icons/fi';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

export default function WelcomeModal({ isOpen, onClose, userName }: WelcomeModalProps) {
  if (!isOpen) return null;

  const displayName = userName?.trim() || 'Creator';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-[440px] rounded-2xl border border-white/10 bg-[#0d0d0d] p-8 shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white"
          aria-label="Close modal"
        >
          <FiX className="text-[16px]" />
        </button>

        {/* Icon */}
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
          <span className="text-[20px]" role="img" aria-label="wave">👋</span>
        </div>

        {/* Heading */}
        <h2
          id="welcome-modal-title"
          className="text-[26px] font-semibold leading-[1.1] tracking-[-0.05em] text-white"
        >
          Welcome to CreatorOS,
          <span className="block text-white/60">{displayName}!</span>
        </h2>

        <p className="mt-3 text-[13px] leading-[1.7] text-white/40">
          Your workspace is ready. Upload a video, set your brand voice, and watch
          CreatorOS turn it into 30+ platform-native posts — automatically.
        </p>

        {/* Quick steps */}
        <ol className="mt-6 space-y-3">
          {[
            'Set up your brand voice profile',
            'Upload or paste a video URL',
            'Review and approve your 30 outputs',
          ].map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[10px] font-medium text-white/40">
                {i + 1}
              </span>
              <span className="text-[12px] text-white/50">{step}</span>
            </li>
          ))}
        </ol>

        {/* CTA */}
        <button
          type="button"
          onClick={onClose}
          className="group mt-7 flex h-[46px] w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] text-[13px] font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
        >
          <span>Get started</span>
          <FiArrowRight className="text-[14px] transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
