import { supabase } from '@/lib/supabase'

export async function isAdmin(userId: string): Promise<boolean> {
  
  const { data, error } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', userId)
    .single()
  
  if (error || !data) return false
  return data.is_admin === true
}

export async function requireAdmin(userId: string): Promise<void> {
  const admin = await isAdmin(userId)
  if (!admin) {
    throw new Error('Accès refusé: privilèges administrateur requis')
  }
}
