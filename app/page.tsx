'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particules d'or en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
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

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-graal-darker/80 border-b border-graal-primary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gold-gradient rounded-lg flex items-center justify-center">
                <span className="text-2xl font-medieval font-bold text-graal-darker">G</span>
              </div>
              <span className="text-2xl font-medieval text-graal-primary">Graal RC</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/changelog" className="text-gray-300 hover:text-graal-primary transition-colors flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Changelog
              </Link>
              <Link href="/login" className="text-gray-300 hover:text-graal-primary transition-colors">
                Connexion
              </Link>
              <Link href="/signup" className="btn-primary">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            className="float-animation inline-block"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-gold-gradient rounded-2xl shadow-graal-lg flex items-center justify-center">
              <span className="text-6xl font-medieval font-bold text-graal-darker">RC</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-medieval font-bold text-graal-primary mb-6">
            Bienvenue sur Graal RC
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Le client officiel pour accéder aux serveurs Graal Online. 
            Disponible sur Windows, macOS et Linux.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4">
              Accéder au Béta
            </Link>
            <Link href="#features" className="btn-secondary text-lg px-8 py-4">
              En savoir plus
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medieval text-center text-graal-primary mb-16">
            Fonctionnalités
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-graal text-center transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-gradient rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-graal-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medieval text-graal-primary mb-3">Performance Optimale</h3>
              <p className="text-gray-400">
                Client natif GTK3 pour une performance maximale sur toutes les plateformes
              </p>
            </div>

            <div className="card-graal text-center transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-gradient rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-graal-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medieval text-graal-primary mb-3">Sécurisé</h3>
              <p className="text-gray-400">
                Connexion chiffrée et authentification sécurisée pour protéger vos données
              </p>
            </div>

            <div className="card-graal text-center transform hover:scale-105 transition-transform">
              <div className="w-16 h-16 mx-auto mb-4 bg-gold-gradient rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-graal-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medieval text-graal-primary mb-3">Interface Moderne</h3>
              <p className="text-gray-400">
                Interface utilisateur intuitive et personnalisable pour une expérience optimale
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-4 bg-graal-dark/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medieval text-center text-graal-primary mb-16">
            Disponible sur toutes les plateformes
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-graal text-center">
              <div className="text-6xl mb-4">🪟</div>
              <h3 className="text-2xl font-medieval text-graal-primary mb-2">Windows</h3>
              <p className="text-gray-400">Windows 10 et supérieur</p>
              <p className="text-sm text-gray-500 mt-2">Installeur NSIS professionnel</p>
            </div>

            <div className="card-graal text-center">
              <div className="text-6xl mb-4">🍎</div>
              <h3 className="text-2xl font-medieval text-graal-primary mb-2">macOS</h3>
              <p className="text-gray-400">macOS 10.14 et supérieur</p>
              <p className="text-sm text-gray-500 mt-2">Image disque DMG</p>
            </div>

            <div className="card-graal text-center">
              <div className="text-6xl mb-4">🐧</div>
              <h3 className="text-2xl font-medieval text-graal-primary mb-2">Linux</h3>
              <p className="text-gray-400">Ubuntu, Debian, Fedora, Arch</p>
              <p className="text-sm text-gray-500 mt-2">AppImage & DEB</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Access CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card-graal shadow-graal-lg">
            <h2 className="text-4xl font-medieval text-graal-primary mb-6">
              Accès Béta Exclusif
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Inscrivez-vous maintenant pour obtenir un accès anticipé au client Graal RC. 
              Places limitées disponibles !
            </p>
            <Link href="/signup" className="btn-primary text-lg px-10 py-4 inline-block">
              Demander un accès béta
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              * Validation par email requise
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-graal-primary/20 py-8 px-4 bg-graal-darker/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400">
          <div className="text-center md:text-left">
            <p className="font-medieval text-graal-primary mb-1">Graal RC</p>
            <p className="text-xs">© 2025 Linux Cyberjoueurs SARL. Tous droits réservés.</p>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <Link href="/changelog" className="hover:text-graal-primary transition-colors">Historique</Link>
            <a href="https://github.com/TOONSLAB/rc" target="_blank" rel="noopener noreferrer" className="hover:text-graal-primary transition-colors">GitHub</a>
            <a href="https://github.com/TOONSLAB/graal-rc-releases/releases" target="_blank" rel="noopener noreferrer" className="hover:text-graal-primary transition-colors">Releases</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
