import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || 'https://zoeoibhmnejofegxytlc.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZW9pYmhtbmVqb2ZlZ3h5dGxjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNjI3MTcsImV4cCI6MjEwNzYzODcxN30.jhUGqhL29GX_LCRZVx-ViirwC3zuqRv8wvj7uy6Ofho';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(
  supabaseUrl || 'https://missing-supabase-configuration.invalid',
  supabaseAnonKey || 'missing-supabase-anon-key',
);
