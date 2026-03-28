'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n-context'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function FeaturesPage() {
  const [scrollY, setScrollY] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden bg-graal-dark selection:bg-graal-primary selection:text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow -top-20 -left-20 opacity-20 bg-graal-primary"></div>
        <div className="bg-glow top-40 right-0 opacity-10 bg-graal-secondary"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-graal-dark/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-primary-gradient rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-xl font-display font-bold text-white">G</span>
              </div>
              <span className="text-xl font-display font-bold text-white tracking-tight">Graal RC</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link href="/download" className="btn-primary py-2 px-4 text-sm">
                Download
              </Link>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            {t('features_page.title')}
          </h1>
          <p className="text-xl text-graal-text-muted max-w-3xl mx-auto">
            {t('features_page.subtitle')}
          </p>
        </div>

        {/* Feature 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 bg-graal-primary/20 rounded-2xl flex items-center justify-center text-4xl mb-4">
              ✨
            </div>
            <h2 className="text-3xl font-display font-bold text-white">{t('features_page.f1_title')}</h2>
            <p className="text-graal-text-muted text-lg leading-relaxed">
              {t('features_page.f1_desc')}
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-graal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('features_page.f1_li1')}
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-graal-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('features_page.f1_li2')}
              </li>
            </ul>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-graal-primary to-graal-accent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-graal-darker border border-white/10 rounded-xl p-4 h-[400px] flex items-center justify-center">
              <p className="text-graal-text-muted italic">Screenshot Interface (Placeholder)</p>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-24">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-4xl mb-4">
              📝
            </div>
            <h2 className="text-3xl font-display font-bold text-white">{t('features_page.f2_title')}</h2>
            <p className="text-graal-text-muted text-lg leading-relaxed">
              {t('features_page.f2_desc')}
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('features_page.f2_li1')}
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('features_page.f2_li2')}
              </li>
            </ul>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-graal-darker border border-white/10 rounded-xl p-4 h-[400px] flex items-center justify-center">
              <p className="text-graal-text-muted italic">Screenshot Éditeur (Placeholder)</p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center text-4xl mb-4">
              🛡️
            </div>
            <h2 className="text-3xl font-display font-bold text-white">{t('features_page.f3_title')}</h2>
            <p className="text-graal-text-muted text-lg leading-relaxed">
              {t('features_page.f3_desc')}
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('features_page.f3_li1')}
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                {t('features_page.f3_li2')}
              </li>
            </ul>
          </div>
          <div className="flex-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-graal-darker border border-white/10 rounded-xl p-4 h-[400px] flex items-center justify-center">
              <p className="text-graal-text-muted italic">Screenshot Performance (Placeholder)</p>
            </div>
          </div>
        </div>

      </div>

      <footer className="border-t border-white/5 py-12 px-4 bg-black/30 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-graal-text-muted">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="w-6 h-6 bg-primary-gradient rounded-md flex items-center justify-center text-xs font-bold text-white">G</div>
              <p className="font-display font-bold text-white">Graal RC</p>
            </div>
            <p className="text-xs text-gray-500">© 2025 Linux Cyberjoueurs SARL. {t('footer.rights')}</p>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-medium">
            <Link href="/changelog" className="hover:text-graal-primary transition-colors">{t('footer.history')}</Link>
            <a href="https://graalonline.net" target="_blank" rel="noopener noreferrer" className="hover:text-graal-primary transition-colors">{t('footer.docs')}</a>
            <a href="https://github.com/TOONSLAB/graal-rc-releases" target="_blank" rel="noopener noreferrer" className="hover:text-graal-primary transition-colors">GitHub Releases</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
