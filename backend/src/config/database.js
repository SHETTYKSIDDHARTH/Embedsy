import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials in .env file');
}

// Public client — anon key, used for auth verification
export const supabase = createClient(supabaseUrl, supabaseKey, {
  db: { schema: 'public' },
  auth: { persistSession: false },
});

// Admin client — service role key, bypasses RLS for all DB operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseKey, {
  db: { schema: 'public' },
  auth: { persistSession: false },
});