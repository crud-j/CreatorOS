import React from 'react';
import { Link } from 'react-router-dom';
import ColorBends from '../ColorBends';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center p-4 overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        <ColorBends
          className="w-full h-full"
          colors={["#0f172a", "#831843", "#312e81"]} // Darker palette: slate, pink, indigo
          speed={0.03}
          scale={1.2}
          frequency={1.5}
          warpStrength={1.2}
          mouseInfluence={0.1}
          noise={0.2}
          parallax={0.3}
          iterations={1}
          intensity={1.2}
          bandWidth={5}
          transparent
          autoRotate={1}
        />
      </div>

      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium">Back to Home</span>
      </Link>

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/25 transition-transform duration-300 group-hover:scale-110">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-white font-black text-2xl tracking-tight">
              Creator<span className="text-white/60 font-medium">OS</span>
            </span>
          </Link>
        </div>

        {/* Card Content */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-2xl backdrop-saturate-150 rounded-4xl p-8 md:p-10 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">{title}</h1>
            <p className="text-white/50 text-sm">{subtitle}</p>
          </div>
          
          {children}
        </div>
        
        {/* Footer Text */}
        <p className="text-center text-white/40 text-xs mt-8">
          By continuing, you agree to CreatorOS's{' '}
          <a href="#" className="text-white/60 hover:text-white underline decoration-white/20 underline-offset-2 transition-colors">Terms of Service</a> and{' '}
          <a href="#" className="text-white/60 hover:text-white underline decoration-white/20 underline-offset-2 transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
