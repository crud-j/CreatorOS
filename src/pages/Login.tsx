
import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaGoogle, FaGithub, FaApple } from 'react-icons/fa';
import AuthLayout from '../components/auth/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import SocialButton from '../components/auth/SocialButton';

export default function Login() {
  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Enter your details to access your workspace."
    >
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          icon={<FiMail />}
          required
        />

        <div className="flex flex-col gap-1">
          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={<FiLock />}
            required
          />
          <div className="flex justify-end mt-1">
            <a href="#" className="text-xs text-pink-500 hover:text-pink-400 font-medium transition-colors">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-pink-500/25 transition-all duration-300 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
        >
          Sign In
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-white/40 text-xs font-medium uppercase tracking-wider">
            Or continue with
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <div className="flex flex-col gap-3">
          <SocialButton icon={<FaGoogle />} label="Continue with Google" />
          <div className="grid grid-cols-2 gap-3">
            <SocialButton icon={<FaGithub />} label="GitHub" />
            <SocialButton icon={<FaApple />} label="Apple" />
          </div>
        </div>

        <p className="text-center text-sm text-white/60 mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-pink-500 hover:text-pink-400 font-medium transition-colors">
            Sign up for free
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}
