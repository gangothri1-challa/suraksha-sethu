/*
# Create Suraksha Sethu private user data

1. New Tables
- `suraksha_profiles` stores a user's display name, selected language, and optional trusted family contact.
- `suraksha_scan_history` stores short-lived text-analysis results owned by the signed-in user.
2. Important Columns
- Every row has a `user_id` that defaults to the authenticated session user.
- History stores the submitted content only as a text field for this first version; image and audio binaries are never stored.
3. Security
- Row level security is enabled on both tables.
- Authenticated users can only read, create, update, and delete their own rows.
4. Notes
- The app uses Supabase email/password authentication and does not create a custom password table.
- Trusted contact details are private and never shared automatically.
*/

CREATE TABLE IF NOT EXISTS public.suraksha_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  language_code text NOT NULL DEFAULT 'en',
  trusted_name text,
  trusted_phone text,
  trusted_relationship text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.suraksha_scan_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type text NOT NULL,
  source_text text NOT NULL,
  risk_score integer NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  risk_label text NOT NULL,
  summary text NOT NULL,
  indicators jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS suraksha_scan_history_user_created_idx
  ON public.suraksha_scan_history (user_id, created_at DESC);

ALTER TABLE public.suraksha_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suraksha_scan_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON public.suraksha_profiles;
CREATE POLICY "profiles_select_own" ON public.suraksha_profiles FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "profiles_insert_own" ON public.suraksha_profiles;
CREATE POLICY "profiles_insert_own" ON public.suraksha_profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "profiles_update_own" ON public.suraksha_profiles;
CREATE POLICY "profiles_update_own" ON public.suraksha_profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "profiles_delete_own" ON public.suraksha_profiles;
CREATE POLICY "profiles_delete_own" ON public.suraksha_profiles FOR DELETE TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "history_select_own" ON public.suraksha_scan_history;
CREATE POLICY "history_select_own" ON public.suraksha_scan_history FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "history_insert_own" ON public.suraksha_scan_history;
CREATE POLICY "history_insert_own" ON public.suraksha_scan_history FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "history_update_own" ON public.suraksha_scan_history;
CREATE POLICY "history_update_own" ON public.suraksha_scan_history FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "history_delete_own" ON public.suraksha_scan_history;
CREATE POLICY "history_delete_own" ON public.suraksha_scan_history FOR DELETE TO authenticated USING (auth.uid() = user_id);
