'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l\'inscription')
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      {/* Particules d'or en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-graal-primary rounded-full sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-16 h-16 bg-gold-gradient rounded-xl flex items-center justify-center shadow-graal-lg">
              <span className="text-4xl font-medieval font-bold text-graal-darker">G</span>
            </div>
          </Link>
          <h1 className="text-4xl font-medieval text-graal-primary mt-6 mb-2">
            Accès Béta
          </h1>
          <p className="text-gray-400">
            Inscrivez-vous pour obtenir un accès anticipé
          </p>
        </div>

        {!success ? (
          <div className="card-graal shadow-graal-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-graal w-full"
                  placeholder="votre@email.com"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Inscription en cours...' : 'S\'inscrire'}
              </button>

              <p className="text-center text-sm text-gray-400">
                Déjà inscrit ?{' '}
                <Link href="/login" className="text-graal-primary hover:text-graal-accent">
                  Se connecter
                </Link>
              </p>
            </form>
          </div>
        ) : (
          <div className="card-graal shadow-graal-lg text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-medieval text-graal-primary mb-4">
              Vérifiez votre email
            </h2>
            <p className="text-gray-400 mb-6">
              Un email de vérification a été envoyé à <span className="text-graal-primary font-semibold">{email}</span>.
              Cliquez sur le lien dans l'email pour activer votre compte.
            </p>
            <p className="text-sm text-gray-500">
              L'email peut prendre quelques minutes à arriver. Vérifiez également vos spams.
            </p>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-graal-primary text-sm">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
