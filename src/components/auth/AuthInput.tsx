import React, { useState } from 'react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
  ({ label, icon, className = '', ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className={`relative flex flex-col gap-1.5 ${className}`}>
        <label className="text-sm font-medium text-white/80 ml-1">
          {label}
        </label>
        <div 
          className={`relative flex items-center bg-white/5 border rounded-xl overflow-hidden transition-all duration-300 ${
            isFocused 
              ? 'border-pink-500/50 shadow-[0_0_15px_rgba(236,72,153,0.15)] bg-white/10' 
              : 'border-white/10 hover:border-white/20'
          }`}
        >
          {icon && (
            <div className={`pl-4 flex items-center justify-center transition-colors duration-300 ${isFocused ? 'text-pink-400' : 'text-white/40'}`}>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className="flex-1 bg-transparent border-none outline-none py-3 px-4 text-white placeholder-white/30 text-[15px]"
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />
        </div>
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
