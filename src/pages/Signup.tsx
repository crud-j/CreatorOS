
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import AuthLayout from '../components/auth/AuthLayout';
import AuthInput from '../components/auth/AuthInput';
import SocialButton from '../components/auth/SocialButton';

export default function Signup() {
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join thousands of creators building the future."
    >
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
        
        <AuthInput
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={<FiUser />}
          required
        />

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          icon={<FiMail />}
          required
        />

        <AuthInput
          label="Password"
          type="password"
          placeholder="Create a strong password"
          icon={<FiLock />}
          required
        />

        <button
          type="submit"
          className="mt-2 w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-pink-500/25 transition-all duration-300 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50"
        >
          Create Account
        </button>

        <div className="relative flex items-center py-2">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink-0 mx-4 text-white/40 text-xs font-medium uppercase tracking-wider">
            Or sign up with
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SocialButton icon={<FaGoogle />} label="Google" />
          <SocialButton icon={<FaGithub />} label="GitHub" />
        </div>

        <p className="text-center text-sm text-white/60 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-500 hover:text-pink-400 font-medium transition-colors">
            Log in
          </Link>
        </p>

      </form>
    </AuthLayout>
  );
}
