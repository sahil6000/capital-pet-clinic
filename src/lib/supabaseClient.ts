import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    'Supabase env vars are missing. Copy .env.example to .env and add your project URL + anon key.'
  )
}

console.log('SUPABASE_URL:', supabaseUrl)
console.log('SUPABASE_KEY:', supabaseAnonKey)
export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')
