import { supabase } from './supabaseClient';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthResult {
  success: boolean;
  error: string | null;
}

export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// ─── Signup ───────────────────────────────────────────────────────────────────

/**
 * Creates a new Supabase auth user with email/password.
 * Passes the user's full name as metadata so the profile can be seeded later.
 */
export async function signUp({
  fullName,
  email,
  password,
}: SignupPayload): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });

  if (error) {
    return { success: false, error: mapAuthError(error.message) };
  }

  return { success: true, error: null };
}

// ─── Login ────────────────────────────────────────────────────────────────────

/**
 * Signs in an existing user with email + password.
 */
export async function signIn({
  email,
  password,
}: LoginPayload): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, error: mapAuthError(error.message) };
  }

  return { success: true, error: null };
}

// ─── OAuth ────────────────────────────────────────────────────────────────────

/**
 * Initiates a Google OAuth sign-in flow (redirects to Google).
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    return { success: false, error: mapAuthError(error.message) };
  }

  return { success: true, error: null };
}

/**
 * Initiates a GitHub OAuth sign-in flow (redirects to GitHub).
 */
export async function signInWithGitHub(): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    return { success: false, error: mapAuthError(error.message) };
  }

  return { success: true, error: null };
}

// ─── Sign out ─────────────────────────────────────────────────────────────────

/**
 * Signs out the currently authenticated user.
 */
export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { success: false, error: mapAuthError(error.message) };
  }

  return { success: true, error: null };
}

// ─── Password reset ───────────────────────────────────────────────────────────

/**
 * Sends a password-reset email to the given address.
 */
export async function sendPasswordResetEmail(
  email: string
): Promise<AuthResult> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    return { success: false, error: mapAuthError(error.message) };
  }

  return { success: true, error: null };
}

// ─── Session ──────────────────────────────────────────────────────────────────

/**
 * Returns the currently active Supabase session, or null if not signed in.
 */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) return null;

  return data.session;
}

// ─── Error mapping ────────────────────────────────────────────────────────────

/**
 * Converts raw Supabase error strings into user-friendly messages.
 */
function mapAuthError(raw: string): string {
  const lower = raw.toLowerCase();

  if (lower.includes('invalid login credentials') || lower.includes('invalid email or password')) {
    return 'Incorrect email or password. Please try again.';
  }
  if (lower.includes('email already registered') || lower.includes('user already registered')) {
    return 'An account with this email already exists. Try logging in instead.';
  }
  if (lower.includes('password should be at least')) {
    return 'Password must be at least 6 characters long.';
  }
  if (lower.includes('invalid email')) {
    return 'Please enter a valid email address.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Please confirm your email address before signing in.';
  }
  if (lower.includes('too many requests') || lower.includes('rate limit')) {
    return 'Too many attempts. Please wait a moment before trying again.';
  }
  if (lower.includes('network') || lower.includes('fetch')) {
    return 'Network error. Please check your connection and try again.';
  }

  return raw;
}
