import { createClient } from '@supabase/supabase-js'

// These values should be stored in environment variables in a production environment
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Log the values to help with debugging (remove in production)
console.log('Supabase URL:', supabaseUrl ? 'Set correctly' : 'Missing')
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Set correctly' : 'Missing')

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials are missing. Check your .env file.')
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
