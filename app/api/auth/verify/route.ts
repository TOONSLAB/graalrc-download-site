import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json(
        { error: 'Token manquant' },
        { status: 400 }
      )
    }

    // Trouver l'utilisateur avec ce token
    const { data: user, error: fetchError } = await supabase
      .from('beta_users')
      .select('*')
      .eq('verification_token', token)
      .single()

    if (fetchError || !user) {
      return NextResponse.json(
        { error: 'Token invalide ou expiré' },
        { status: 400 }
      )
    }

    // Vérifier si le token a expiré
    const expiresAt = new Date(user.verification_expires_at)
    if (expiresAt < new Date()) {
      return NextResponse.json(
        { error: 'Le lien de vérification a expiré' },
        { status: 400 }
      )
    }

    // Vérifier si l'email est déjà vérifié
    if (user.email_verified) {
      return NextResponse.json(
        { error: 'Email déjà vérifié' },
        { status: 400 }
      )
    }

    // Mettre à jour l'utilisateur
    const { error: updateError } = await supabase
      .from('beta_users')
      .update({
        email_verified: true,
        verification_token: null,
        verification_expires_at: null,
        beta_access: true, // Accorder l'accès béta automatiquement
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Erreur mise à jour:', updateError)
      return NextResponse.json(
        { error: 'Erreur lors de la vérification' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Email vérifié avec succès ! Vous avez maintenant accès au béta.',
      userId: user.id,
    })
  } catch (error) {
    console.error('Erreur vérification:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
