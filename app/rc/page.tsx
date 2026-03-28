'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n-context'

export default function RCPage() {
  const [scrollY, setScrollY] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow -top-20 -left-20 opacity-20 bg-graal-gold"></div>
        <div className="bg-glow top-40 right-0 opacity-10 bg-graal-blue"></div>
        <div className="bg-glow bottom-0 left-1/3 opacity-10 bg-graal-darker"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            className="float-animation inline-block relative"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          >
            <div className="absolute inset-0 bg-graal-gold blur-[80px] opacity-20"></div>
            <div className="w-32 h-32 mx-auto mb-8 bg-card-gradient border border-graal-gold/20 rounded-3xl shadow-2xl flex items-center justify-center relative z-10 backdrop-blur-sm">
              <span className="text-5xl font-display font-bold bg-clip-text text-transparent bg-gold-gradient">RC</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
            {t('hero.title_prefix')} <span className="text-transparent bg-clip-text bg-gold-gradient">{t('hero.title_highlight')}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-graal-text-muted mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/download" className="btn-primary text-lg px-8 py-4 shadow-glow">
              Download
            </Link>
            <Link href="/features" className="btn-secondary text-lg px-8 py-4">
              {t('hero.cta_discover')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-16">
            {t('features.title')} <span className="text-graal-gold">{t('features.title_highlight')}</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-graal group hover:-translate-y-1">
              <div className="w-14 h-14 mx-auto mb-6 bg-gold-gradient rounded-2xl flex items-center justify-center shadow-lg shadow-graal-gold/20 group-hover:shadow-graal-gold/40 transition-all">
                <svg className="w-7 h-7 text-graal-darker" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3 text-center">{t('features.perf_title')}</h3>
              <p className="text-graal-text-muted text-center leading-relaxed">
                {t('features.perf_desc')}
              </p>
            </div>

            <div className="card-graal group hover:-translate-y-1">
              <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-br from-graal-blue to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-graal-blue/20 group-hover:shadow-graal-blue/40 transition-all">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3 text-center">{t('features.sec_title')}</h3>
              <p className="text-graal-text-muted text-center leading-relaxed">
                {t('features.sec_desc')}
              </p>
            </div>

            <div className="card-graal group hover:-translate-y-1">
              <div className="w-14 h-14 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-all">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-display font-semibold text-white mb-3 text-center">{t('features.dev_title')}</h3>
              <p className="text-graal-text-muted text-center leading-relaxed">
                {t('features.dev_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-white mb-16">
            {t('platforms.title')}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-graal text-center hover:bg-white/5 transition-colors">
              <div className="text-6xl mb-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">🪟</div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Windows</h3>
              <p className="text-graal-text-muted text-sm whitespace-pre-line">{t('platforms.win_desc')}</p>
            </div>

            <div className="card-graal text-center hover:bg-white/5 transition-colors">
              <div className="text-6xl mb-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">🍎</div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">macOS</h3>
              <p className="text-graal-text-muted text-sm whitespace-pre-line">{t('platforms.mac_desc')}</p>
            </div>

            <div className="card-graal text-center hover:bg-white/5 transition-colors">
              <div className="text-6xl mb-6 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">🐧</div>
              <h3 className="text-xl font-display font-semibold text-white mb-2">Linux</h3>
              <p className="text-graal-text-muted text-sm whitespace-pre-line">{t('platforms.linux_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-24 px-4 bg-white/2">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-graal-gold blur-[100px] opacity-10"></div>
          <div className="card-graal shadow-2xl relative z-10 bg-card-gradient/90 border-graal-gold/30 p-12">
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready to start?
            </h2>
            <p className="text-xl text-graal-text-muted mb-10 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <Link href="/download" className="btn-primary text-lg px-12 py-4 inline-block shadow-glow hover:scale-105 transition-transform">
              Download Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
