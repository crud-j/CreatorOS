import React from 'react';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

export default function SocialButton({ icon, label, className = '', ...props }: SocialButtonProps) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-3 w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl py-3 px-4 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 ${className}`}
      {...props}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}
