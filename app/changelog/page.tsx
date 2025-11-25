'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Release {
  tag_name: string
  name: string
  published_at: string
  body: string
  html_url: string
}

export default function ChangelogPage() {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchReleases() {
      try {
        const response = await fetch('https://api.github.com/repos/TOONSLAB/graal-rc-releases/releases')
        if (!response.ok) throw new Error('Failed to fetch releases')
        const data = await response.json()
        setReleases(data)
      } catch (error) {
        console.error('Error fetching releases:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReleases()
  }, [])

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
            <div className="w-16 h-16 bg-gold-gradient rounded-xl flex items-center justify-center shadow-graal-lg mx-auto border border-graal-accent/30">
              <span className="text-4xl font-medieval font-bold text-graal-darker">G</span>
            </div>
          </Link>
          <h1 className="text-5xl font-medieval text-transparent bg-clip-text bg-gradient-to-b from-graal-primary to-graal-accent mb-4">
            Historique des Versions
          </h1>
          <Link href="/download" className="text-graal-primary hover:text-graal-accent underline flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Retour aux téléchargements
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-graal-primary"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {releases.map((release) => (
              <div key={release.tag_name} className="card-graal shadow-graal-lg p-8 transition-all hover:border-graal-primary/40">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-6 border-b border-graal-primary/20 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-medieval text-graal-primary">
                        {release.name || release.tag_name}
                      </h2>
                      {release.tag_name === releases[0].tag_name && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded border border-green-500/30">
                          Dernière version
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      Publié le {formatDate(release.published_at)}
                    </p>
                  </div>
                  
                  <a 
                    href={release.html_url}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="btn-secondary px-4 py-2 text-sm flex items-center justify-center gap-2"
                  >
                    <span>Voir sur GitHub</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>

                <div className="prose prose-invert max-w-none prose-graal">
                  <div className="whitespace-pre-wrap font-sans text-gray-300">
                    {release.body}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
