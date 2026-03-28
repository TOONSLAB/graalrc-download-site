'use client'

import Link from 'next/link'
import { useTranslation } from '@/lib/i18n-context'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-white/5 py-12 px-4 bg-black/40 backdrop-blur-md mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-graal-text-muted">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <div className="w-6 h-6 bg-gold-gradient rounded-md flex items-center justify-center text-xs font-bold text-graal-darker">G</div>
            <p className="font-display font-bold text-white tracking-widest uppercase text-sm">GraalOnline Dev</p>
          </div>
          <p className="text-xs text-gray-500">© 2025 GraalOnline. {t('footer.rights')}</p>
        </div>
        
        <div className="flex items-center gap-8 text-sm font-medium">
          <Link href="/changelog" className="hover:text-graal-gold transition-colors">{t('footer.history')}</Link>
          <a href="https://graalonline.net" target="_blank" rel="noopener noreferrer" className="hover:text-graal-gold transition-colors">{t('footer.docs')}</a>
        </div>
      </div>
    </footer>
  )
}
