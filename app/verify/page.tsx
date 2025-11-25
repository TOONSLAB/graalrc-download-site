'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')


  useEffect(() => {
    const token = searchParams.get('token')
    
    if (!token) {
      setStatus('error')
      setMessage('Token de vérification manquant')
      return
    }

    verifyEmail(token)
  }, [searchParams])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur de vérification')
      }

      setStatus('success')
      setMessage(data.message)

      // Redirection vers la page de licence après 3 secondes
      setTimeout(() => {
        router.push('/license')
      }, 3000)
    } catch (err: any) {
      setStatus('error')
      setMessage(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
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
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gold-gradient rounded-xl flex items-center justify-center shadow-graal-lg mx-auto mb-6">
            <span className="text-4xl font-medieval font-bold text-graal-darker">G</span>
          </div>
        </div>

        <div className="card-graal shadow-graal-lg text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 border-4 border-graal-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-2xl font-medieval text-graal-primary mb-4">
                Vérification en cours...
              </h2>
              <p className="text-gray-400">
                Veuillez patienter pendant que nous vérifions votre email
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-medieval text-graal-primary mb-4">
                Email vérifié !
              </h2>
              <p className="text-gray-400 mb-6">
                {message}
              </p>
              <p className="text-sm text-gray-500">
                Redirection vers la page de licence...
              </p>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-medieval text-red-400 mb-4">
                Erreur de vérification
              </h2>
              <p className="text-gray-400 mb-6">
                {message}
              </p>
              <Link href="/signup" className="btn-primary inline-block">
                Réessayer l'inscription
              </Link>
            </>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-graal-primary text-sm">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-16 h-16 border-4 border-graal-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}
