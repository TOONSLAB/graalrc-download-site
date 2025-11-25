import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BetaUser = {
  id: string
  email: string
  email_verified: boolean
  verification_token: string | null
  verification_expires_at: string | null
  beta_access: boolean
  license_accepted: boolean
  created_at: string
  updated_at: string
}

export type Download = {
  id: string
  user_id: string
  platform: 'windows' | 'macos' | 'linux'
  version: string
  downloaded_at: string
}
