'use client'

import { useTranslation } from '@/lib/i18n-context'
import { Language } from '@/lib/translations'

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 text-graal-text-muted hover:text-white transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-white/5">
        <span>{languages.find(l => l.code === language)?.flag}</span>
        <span className="uppercase">{language}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-graal-darker border border-white/10 rounded-lg shadow-xl overflow-hidden hidden group-hover:block z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-white/5 transition-colors ${
              language === lang.code ? 'text-graal-primary bg-white/5' : 'text-gray-300'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
