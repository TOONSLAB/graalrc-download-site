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
    <div className="min-h-screen relative overflow-hidden bg-graal-dark selection:bg-graal-primary selection:text-white">
      {/* Modern Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow -top-20 -left-20 opacity-20 bg-graal-primary"></div>
        <div className="bg-glow top-40 right-0 opacity-10 bg-graal-secondary"></div>
        <div className="bg-glow bottom-0 left-1/3 opacity-10 bg-graal-accent"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-graal-dark/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl font-display font-bold text-white">G</span>
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">Graal RC</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/changelog" className="text-graal-text-muted hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Changelog
              </Link>
              <Link href="/login" className="text-graal-text-muted hover:text-white transition-colors text-sm font-medium">
                Connexion
              </Link>
              <Link href="/signup" className="btn-primary py-2 px-4 text-sm">
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
            className="float-animation inline-block relative"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <div className="absolute inset-0 bg-graal-primary blur-[60px] opacity-20"></div>
            <div className="w-32 h-32 mx-auto mb-8 bg-card-gradient border border-white/10 rounded-3xl shadow-2xl flex items-center justify-center relative z-10 backdrop-blur-sm">
              <span className="text-5xl font-display font-bold bg-clip-text text-transparent bg-primary-gradient">RC</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            Le Futur de <span className="text-transparent bg-clip-text bg-primary-gradient">Graal Online</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-graal-text-muted mb-12 max-w-3xl mx-auto leading-relaxed">
            Le client officiel nouvelle génération. Performance native, sécurité renforcée et expérience développeur moderne.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-4 shadow-graal-lg">
              Accéder au Béta
            </Link>
            <Link href="#features" className="btn-secondary text-lg px-8 py-4">
              Découvrir
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-16">
            Une expérience <span className="text-graal-primary">réinventée</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-graal group hover:-translate-y-1">
              <div className="w-14 h-14 mx-auto mb-6 bg-primary-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-graal-primary/20 group-hover:shadow-graal-primary/40 transition-all">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3 text-center">Performance Native</h3>
              <p className="text-graal-text-muted text-center leading-relaxed">
                Conçu en C++ avec GTK3 pour une réactivité instantanée et une empreinte mémoire minimale sur tous les systèmes.
              </p>
            </div>

            <div className="card-graal group hover:-translate-y-1">
              <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3 text-center">Sécurité Avancée</h3>
              <p className="text-graal-text-muted text-center leading-relaxed">
                Signature numérique des binaires, checksums SHA256 et communications chiffrées de bout en bout.
              </p>
            </div>

            <div className="card-graal group hover:-translate-y-1">
              <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3 text-center">Developer Friendly</h3>
              <p className="text-graal-text-muted text-center leading-relaxed">
                Éditeur intégré avec coloration syntaxique pour GraalScript, console de débogage et outils d'inspection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-4 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-16">
            Multiplateforme par nature
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-graal text-center hover:bg-white/5 transition-colors">
              <div className="text-6xl mb-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">🪟</div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Windows</h3>
              <p className="text-graal-text-muted text-sm">Setup NSIS professionnel<br/>Compatible Win 10/11</p>
            </div>

            <div className="card-graal text-center hover:bg-white/5 transition-colors">
              <div className="text-6xl mb-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">🍎</div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">macOS</h3>
              <p className="text-graal-text-muted text-sm">Bundle App signé & Notarié<br/>Apple Silicon & Intel</p>
            </div>

            <div className="card-graal text-center hover:bg-white/5 transition-colors">
              <div className="text-6xl mb-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">🐧</div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Linux</h3>
              <p className="text-graal-text-muted text-sm">AppImage & DEB<br/>Toutes distributions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Access CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-graal-primary blur-[100px] opacity-10"></div>
          <div className="card-graal shadow-2xl relative z-10 bg-card-gradient/90 border-graal-primary/30 p-12">
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Rejoignez l'aventure
            </h2>
            <p className="text-xl text-graal-text-muted mb-10 max-w-2xl mx-auto">
              Soyez parmi les premiers à tester la nouvelle génération d'outils pour Graal Online.
            </p>
            <Link href="/signup" className="btn-primary text-lg px-12 py-4 inline-block shadow-glow hover:scale-105 transition-transform">
              Créer un compte Béta
            </Link>
            <p className="text-sm text-graal-text-muted/60 mt-6">
              * Inscription gratuite et sécurisée
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-4 bg-black/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-graal-text-muted">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-6 h-6 bg-primary-gradient rounded-md flex items-center justify-center text-xs font-bold text-white">G</div>
              <p className="font-display font-bold text-white">Graal RC</p>
            </div>
            <p className="text-xs text-gray-500">© 2025 Linux Cyberjoueurs SARL. Tous droits réservés.</p>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link href="/changelog" className="hover:text-graal-primary transition-colors">Historique</Link>
            <a href="https://github.com/TOONSLAB/rc" target="_blank" rel="noopener noreferrer" className="hover:text-graal-primary transition-colors">GitHub</a>
            <a href="https://github.com/TOONSLAB/graal-rc-releases/releases" target="_blank" rel="noopener noreferrer" className="hover:text-graal-primary transition-colors">Releases</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
