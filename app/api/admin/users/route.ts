import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'dev-admin-key'

export async function GET(request: NextRequest) {
  // Vérifier l'API key
  const apiKey = request.headers.get('x-api-key')
  if (apiKey !== ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 403 }
    )
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('beta_users')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ users: data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  // Vérifier l'API key
  const apiKey = request.headers.get('x-api-key')
  if (apiKey !== ADMIN_API_KEY) {
    return NextResponse.json(
      { error: 'Non autorisé' },
      { status: 403 }
    )
  }

  try {
    const { id, beta_access } = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'ID requis' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('beta_users')
      .update({ beta_access })
      .eq('id', id)
      .select()

    if (error) throw error

    return NextResponse.json({ user: data[0] })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}
