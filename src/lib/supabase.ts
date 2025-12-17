import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase project settings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL // Like: https://xxxxx.supabase.co
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY // The long eyJ... string

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public',
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
    },
  },
});

// Types for our database
export type User = {
  id: string;
  email: string;
  user_type: 'voter' | 'admin';
  full_name: string;
  member_id: string;
  organization: string;
  department?: string;
  position?: string;
  selfie_url?: string;
  created_at: string;
  updated_at: string;
};

export type Election = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'scheduled' | 'active' | 'completed';
  created_by?: string;
  organization: string;
  created_at: string;
  updated_at: string;
};

export type Position = {
  id: string;
  election_id: string;
  name: string;
  description?: string;
  display_order: number;
  created_at: string;
};

export type Candidate = {
  id: string;
  position_id: string;
  name: string;
  photo_url?: string;
  department?: string;
  level?: string;
  manifesto?: string;
  approved: boolean;
  created_at: string;
};

export type Vote = {
  id: string;
  election_id: string;
  voter_id: string;
  position_id: string;
  candidate_id: string;
  receipt_code: string;
  encrypted: boolean;
  created_at: string;
};