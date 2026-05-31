-- ─────────────────────────────────────────────────────────────
-- USERS TABLE
-- Extends auth.users with app-specific columns
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.users (
  id                  uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               text,
  full_name           text,
  stripe_customer_id  text        UNIQUE,
  stripe_sub_id       text,
  plan                text        NOT NULL DEFAULT 'free'
                                  CHECK (plan IN ('free', 'pro', 'agency')),
  runs_this_month     int         NOT NULL DEFAULT 0,
  runs_reset_at       timestamptz NOT NULL DEFAULT date_trunc('month', now()) + interval '1 month',
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Index for fast Stripe customer lookup
CREATE INDEX IF NOT EXISTS users_stripe_customer_id_idx
  ON public.users (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;

-- ─────────────────────────────────────────────────────────────
-- AUTO-CREATE USER ROW ON SIGNUP
-- Triggered when a new auth.users row is inserted
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─────────────────────────────────────────────────────────────
-- STRIPE EVENTS LOG (audit trail)
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.stripe_events (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_event_id text        UNIQUE NOT NULL,
  event_type      text        NOT NULL,
  user_id         uuid        REFERENCES public.users(id) ON DELETE SET NULL,
  payload         jsonb       NOT NULL DEFAULT '{}'::jsonb,
  processed_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stripe_events_service_only" ON public.stripe_events
  FOR ALL USING (false);
