'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations, Language, TranslationKeys } from './translations'

type I18nContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr')

  useEffect(() => {
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0] as Language
    if (translations[browserLang]) {
      setLanguage(browserLang)
    }
  }, [])

  const t = (path: string): string => {
    const keys = path.split('.')
    let value: any = translations[language]
    
    for (const key of keys) {
      if (value && value[key]) {
        value = value[key]
      } else {
        // Fallback to French if key missing
        let fallback: any = translations['fr']
        for (const fallbackKey of keys) {
          if (fallback && fallback[fallbackKey]) {
            fallback = fallback[fallbackKey]
          } else {
            return path // Return key if not found anywhere
          }
        }
        return fallback
      }
    }
    return typeof value === 'string' ? value : path
  }

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider')
  }
  return context
}
