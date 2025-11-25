import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
// import crypto from 'crypto'
// import nodemailer from 'nodemailer'

// SMTP désactivé temporairement pour le déploiement initial
// Configuration du transporteur email
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// })

// Vérifier si SMTP est configuré
const isSmtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      )
    }

    // Vérifier si l'email existe déjà
    const { data: existingUser } = await supabase
      .from('beta_users')
      .select('*')
      .eq('email', email)
      .single()

    if (existingUser) {
      if (existingUser.email_verified) {
        return NextResponse.json(
          { error: 'Cet email est déjà inscrit' },
          { status: 400 }
        )
      } else {
        // Si SMTP non configuré, vérifier automatiquement
        if (!isSmtpConfigured) {
          await supabase
            .from('beta_users')
            .update({
              email_verified: true,
              beta_access: true,
            })
            .eq('email', email)

          return NextResponse.json({
            message: 'Inscription activée automatiquement (mode sans email)',
            autoVerified: true,
          })
        }

        // Renvoyer un email de vérification
        // const verificationToken = crypto.randomBytes(32).toString('hex')
        // const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures

        // await supabase
        //   .from('beta_users')
        //   .update({
        //     verification_token: verificationToken,
        //     verification_expires_at: expiresAt.toISOString(),
        //   })
        //   .eq('email', email)

        // await sendVerificationEmail(email, verificationToken)

        return NextResponse.json({
          message: 'Email de vérification renvoyé (désactivé)',
        })
      }
    }

    // Si SMTP non configuré, vérifier automatiquement l'utilisateur
    if (!isSmtpConfigured) {
      const { error: insertError } = await supabase
        .from('beta_users')
        .insert({
          email,
          email_verified: true,
          beta_access: true,
          license_accepted: false,
        })

      if (insertError) {
        console.error('Erreur insertion:', insertError)
        return NextResponse.json(
          { error: 'Erreur lors de l\'inscription' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        message: 'Inscription réussie et activée automatiquement (mode sans email)',
        autoVerified: true,
      })
    }

    // Créer un nouveau token de vérification
    // const verificationToken = crypto.randomBytes(32).toString('hex')
    // const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 heures

    // Insérer le nouvel utilisateur
    const { error: insertError } = await supabase
      .from('beta_users')
      .insert({
        email,
        // verification_token: verificationToken,
        // verification_expires_at: expiresAt.toISOString(),
        email_verified: false,
        beta_access: false,
        license_accepted: false,
      })

    if (insertError) {
      console.error('Erreur insertion:', insertError)
      return NextResponse.json(
        { error: 'Erreur lors de l\'inscription' },
        { status: 500 }
      )
    }

    // Envoyer l'email de vérification
    // await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({
      message: 'Inscription réussie (email désactivé).',
    })
  } catch (error) {
    console.error('Erreur signup:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}

async function sendVerificationEmail(email: string, token: string) {
  // SMTP désactivé - cette fonction ne sera pas appelée si isSmtpConfigured est false
  console.log('SMTP non configuré - email non envoyé')
  return Promise.resolve()
  
  /* Code SMTP commenté pour réactivation future
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify?token=${token}`

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Vérifiez votre email - Graal RC',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #0a0e1a;
              color: #ffffff;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 50%, #0a0e1a 100%);
              border: 2px solid #d4af37;
              border-radius: 12px;
              padding: 40px;
            }
            .logo {
              text-align: center;
              margin-bottom: 30px;
            }
            .logo-box {
              display: inline-block;
              width: 80px;
              height: 80px;
              background: linear-gradient(135deg, #d4af37 0%, #c9a961 50%, #8b7355 100%);
              border-radius: 16px;
              text-align: center;
              line-height: 80px;
              font-size: 48px;
              font-weight: bold;
              color: #0a0e1a;
            }
            h1 {
              color: #d4af37;
              text-align: center;
              margin-bottom: 20px;
            }
            p {
              color: #e5e5e5;
              line-height: 1.6;
              margin-bottom: 20px;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #d4af37 0%, #c9a961 50%, #8b7355 100%);
              color: #0a0e1a;
              text-decoration: none;
              padding: 15px 40px;
              border-radius: 8px;
              font-weight: bold;
              text-align: center;
              margin: 20px 0;
            }
            .button-container {
              text-align: center;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #888;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <div class="logo-box">RC</div>
            </div>
            <h1>Bienvenue sur Graal RC</h1>
            <p>Merci de vous être inscrit pour l'accès béta de Graal RC !</p>
            <p>Pour activer votre compte et obtenir l'accès au téléchargement, veuillez cliquer sur le bouton ci-dessous :</p>
            <div class="button-container">
              <a href="${verificationUrl}" class="button">Vérifier mon email</a>
            </div>
            <p style="font-size: 12px; color: #888;">
              Ou copiez ce lien dans votre navigateur :<br>
              <a href="${verificationUrl}" style="color: #d4af37;">${verificationUrl}</a>
            </p>
            <p style="font-size: 12px; color: #888;">
              Ce lien expirera dans 24 heures.
            </p>
            <div class="footer">
              <p>© 2025 Graal RC. Tous droits réservés.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }

  await transporter.sendMail(mailOptions)
  */
}
