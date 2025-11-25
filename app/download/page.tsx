'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const DOWNLOAD_VERSION = '1.0.2'
const RELEASE_TAG = 'v1.0.2'
const GITHUB_RELEASE_URL = `https://github.com/TOONSLAB/graal-rc-releases/releases/download/${RELEASE_TAG}`
const GITHUB_RELEASE_PAGE = `https://github.com/TOONSLAB/graal-rc-releases/releases/tag/${RELEASE_TAG}`

const downloads = {
  windows: {
    name: 'Windows',
    icon: '🪟',
    file: 'RC-GTK3-Windows-20251120.zip',
    url: `${GITHUB_RELEASE_URL}/RC-GTK3-Windows-20251120.zip`,
    size: '~25 MB',
    requirements: 'Windows 10 ou supérieur',
    description: 'Archive ZIP avec toutes les bibliothèques GTK3 incluses - Prête à l\'emploi',
  },
  macos: {
    name: 'macOS',
    icon: '🍎',
    file: 'GraalRC-1.0.2.dmg',
    url: `${GITHUB_RELEASE_URL}/GraalRC-1.0.2.dmg`,
    size: '~15 MB',
    requirements: 'macOS 10.15 ou supérieur (Intel & Apple Silicon)',
    description: 'Bundle .app signé avec icônes, ressources et coloration syntaxique - Nécessite GTK3 & GtkSourceView3',
  },
  linux: {
    name: 'Linux',
    icon: '🐧',
    files: [
      { 
        type: 'Archive tar.gz', 
        file: `RC-GTK3-Linux-${DOWNLOAD_VERSION}.tar.gz`,
        url: `${GITHUB_RELEASE_URL}/RC-GTK3-Linux-${DOWNLOAD_VERSION}.tar.gz`,
        size: '~15 MB',
        description: 'Archive portable avec binaire statique'
      }
    ],
    requirements: 'Ubuntu 20.04+, Debian 11+, Fedora 35+, Arch Linux',
  },
}

export default function DownloadPage() {
  const [os, setOs] = useState<'windows' | 'macos' | 'linux' | null>(null)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.includes('win')) setOs('windows')
    else if (userAgent.includes('mac')) setOs('macos')
    else if (userAgent.includes('linux')) setOs('linux')
  }, [])

  const handleDownload = (url: string) => {
    window.open(url, '_blank')
  }

  const getRecommendedDownload = () => {
    if (!os) return null
    return downloads[os]
  }

  const recommended = getRecommendedDownload()

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] opacity-5 pointer-events-none"></div>
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-graal-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-block mb-6 hover:scale-105 transition-transform duration-300">
            <div className="w-24 h-24 bg-gold-gradient rounded-2xl flex items-center justify-center shadow-graal-lg mx-auto border-2 border-graal-accent/30">
              <span className="text-6xl font-medieval font-bold text-graal-darker drop-shadow-sm">G</span>
            </div>
          </Link>
          <h1 className="text-6xl font-medieval text-transparent bg-clip-text bg-gradient-to-b from-graal-primary to-graal-accent mb-4 drop-shadow-md">
            Télécharger Graal RC
          </h1>
          <div className="inline-flex items-center space-x-2 bg-graal-darker/80 px-4 py-2 rounded-full border border-graal-primary/30 shadow-inner mb-4">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            <p className="text-gray-300 font-medium">
              Version {DOWNLOAD_VERSION} - Édition Professionnelle
            </p>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Installeurs professionnels avec toutes les dépendances incluses pour Windows, macOS et Linux.
            Open Source et sécurisé.
          </p>
        </div>

        {/* Recommended Download */}
        {recommended && (
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <div className="bg-gradient-to-br from-graal-darker to-black border border-graal-primary/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(234,179,8,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-graal-primary text-graal-darker text-xs font-bold px-4 py-1 rounded-bl-xl font-medieval shadow-lg">
                RECOMMANDÉ POUR VOUS
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="text-7xl mb-4 md:mb-0 animate-bounce-slow inline-block">
                    {recommended.icon}
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-medieval text-white mb-2">
                    Télécharger pour {recommended.name}
                  </h2>
                  <p className="text-gray-400 mb-2">
                    Compatible avec {recommended.requirements}
                  </p>
                  {'files' in recommended ? (
                    <p className="text-sm text-graal-primary">
                      Plusieurs options disponibles ci-dessous
                    </p>
                  ) : (
                    <p className="text-sm text-graal-primary flex items-center justify-center md:justify-start gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {recommended.description}
                    </p>
                  )}
                </div>

                <div>
                  {'files' in recommended ? (
                    <a href="#all-downloads" className="btn-primary px-8 py-4 text-lg shadow-lg shadow-graal-primary/20 flex items-center gap-2">
                      <span>Voir les options</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </a>
                  ) : (
                    <button
                      onClick={() => handleDownload(recommended.url)}
                      className="btn-primary px-8 py-4 text-lg shadow-lg shadow-graal-primary/20 flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      <span>Télécharger</span>
                    </button>
                  )}
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    {'size' in recommended && `Taille: ${recommended.size}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Downloads Grid */}
        <h3 id="all-downloads" className="text-2xl font-medieval text-center text-graal-primary mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-graal-primary/30"></span>
          Tous les téléchargements
          <span className="h-px w-12 bg-graal-primary/30"></span>
        </h3>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Windows */}
          <div className={`card-graal shadow-graal-lg transition-all duration-300 ${os === 'windows' ? 'ring-2 ring-graal-primary scale-105' : 'hover:bg-graal-darker/80'}`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 drop-shadow-lg">{downloads.windows.icon}</div>
              <h2 className="text-3xl font-medieval text-graal-primary mb-2">
                {downloads.windows.name}
              </h2>
              <p className="text-sm text-gray-400">{downloads.windows.requirements}</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-graal-darker/50 rounded-lg p-4 border border-graal-primary/20 hover:border-graal-primary/50 transition-colors group">
                <p className="text-gray-300 mb-2 flex items-center justify-between">
                  <span className="font-semibold text-graal-primary">Archive Portable</span>
                  <span className="text-xs bg-graal-primary/10 text-graal-primary px-2 py-1 rounded">.zip</span>
                </p>
                <p className="text-xs text-gray-500 mb-2">{downloads.windows.description}</p>
                <p className="text-sm text-gray-400 mb-4">
                  Taille: {downloads.windows.size}
                </p>
                <button
                  onClick={() => handleDownload(downloads.windows.url)}
                  className="btn-primary w-full group-hover:shadow-graal-primary/20"
                >
                  Télécharger
                </button>
              </div>
            </div>
          </div>

          {/* macOS */}
          <div className={`card-graal shadow-graal-lg transition-all duration-300 ${os === 'macos' ? 'ring-2 ring-graal-primary scale-105' : 'hover:bg-graal-darker/80'}`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 drop-shadow-lg">{downloads.macos.icon}</div>
              <h2 className="text-3xl font-medieval text-graal-primary mb-2">
                {downloads.macos.name}
              </h2>
              <p className="text-sm text-gray-400">{downloads.macos.requirements}</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-graal-darker/50 rounded-lg p-4 border border-graal-primary/20 hover:border-graal-primary/50 transition-colors group">
                <p className="text-gray-300 mb-1 flex items-center justify-between">
                  <span className="font-semibold text-graal-primary">Image Disque</span>
                  <span className="text-xs bg-graal-primary/10 text-graal-primary px-2 py-1 rounded">.dmg</span>
                </p>
                <p className="text-xs text-gray-500 mb-2">{downloads.macos.description}</p>
                <p className="text-sm text-gray-400 mb-4">
                  Taille: {downloads.macos.size}
                </p>
                <button
                  onClick={() => handleDownload(downloads.macos.url)}
                  className="btn-primary w-full group-hover:shadow-graal-primary/20"
                >
                  Télécharger
                </button>
              </div>
            </div>
          </div>

          {/* Linux */}
          <div className={`card-graal shadow-graal-lg transition-all duration-300 ${os === 'linux' ? 'ring-2 ring-graal-primary scale-105' : 'hover:bg-graal-darker/80'}`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 drop-shadow-lg">{downloads.linux.icon}</div>
              <h2 className="text-3xl font-medieval text-graal-primary mb-2">
                {downloads.linux.name}
              </h2>
              <p className="text-sm text-gray-400">{downloads.linux.requirements}</p>
            </div>
            
            <div className="space-y-4">
              {downloads.linux.files.map((fileInfo) => (
                <div key={fileInfo.type} className="bg-graal-darker/50 rounded-lg p-4 border border-graal-primary/20 hover:border-graal-primary/50 transition-colors group">
                  <p className="text-gray-300 mb-1 flex items-center justify-between">
                    <span className="font-semibold text-graal-primary">{fileInfo.type}</span>
                  </p>
                  <p className="text-xs text-gray-500 mb-2">{fileInfo.description}</p>
                  <p className="text-sm text-gray-400 mb-4">
                    Taille: {fileInfo.size}
                  </p>
                  <button
                    onClick={() => handleDownload(fileInfo.url)}
                    className="btn-primary w-full group-hover:shadow-graal-primary/20"
                  >
                    Télécharger
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Installation Instructions */}
        <div className="card-graal shadow-graal-lg mb-8">
          <h2 className="text-3xl font-medieval text-graal-primary mb-6 text-center">
            Instructions d'installation
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-medieval text-graal-primary mb-3">Windows</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                <li>Téléchargez l'archive .zip</li>
                <li>Extrayez le contenu dans un dossier</li>
                <li>Exécutez RC-GTK3.exe</li>
                <li>Toutes les dépendances sont incluses</li>
                <li>Aucune installation requise</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-medieval text-graal-primary mb-3">macOS</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                <li>Téléchargez le fichier .dmg</li>
                <li>Ouvrez l'image disque</li>
                <li>Acceptez l'accord de licence</li>
                <li>Glissez dans Applications</li>
                <li>Lancez depuis le Launchpad</li>
              </ol>
            </div>

            <div>
              <h3 className="text-xl font-medieval text-graal-primary mb-3">Linux</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
                <li><strong>DEB:</strong> sudo dpkg -i *.deb</li>
                <li><strong>AppImage:</strong> chmod +x *.AppImage</li>
                <li>Lancez l'application</li>
                <li>Profitez de Graal RC!</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="card-graal shadow-graal-lg mb-8">
          <h2 className="text-3xl font-medieval text-graal-primary mb-6 text-center">
            ✨ Fonctionnalités
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-400">
            <div>
              <h3 className="text-lg font-semibold text-graal-primary mb-2">Interface Professionnelle</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Interface GTK3 moderne et responsive</li>
                <li>Coloration syntaxique avancée</li>
                <li>Éditeur de code intégré</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-graal-primary mb-2">Builds Statiques</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Toutes les dépendances incluses</li>
                <li>Aucune installation supplémentaire</li>
                <li>Fonctionne immédiatement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support Notice */}
        <div className="card-graal shadow-graal-lg bg-blue-500/10 border-blue-500/30 text-center p-8">
          <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            <div className="text-left max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-medieval text-blue-400">Intégrité & Sécurité</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Chaque version est signée et accompagnée de sommes de contrôle SHA256 pour garantir son intégrité.
              </p>
              <a 
                href={GITHUB_RELEASE_PAGE}
                target="_blank"
                rel="noopener noreferrer" 
                className="text-graal-primary hover:text-graal-accent underline flex items-center gap-2 group"
              >
                <span>Voir les notes de version et checksums</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
            
            <div className="h-px w-full md:w-px md:h-32 bg-blue-500/20"></div>
            
            <div className="text-left max-w-md">
              <div className="flex items-center space-x-3 mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h3 className="text-2xl font-medieval text-purple-400">Open Source</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Le code source complet est disponible sur GitHub. Contribuez à l'amélioration de GraalRC !
              </p>
              <a 
                href="https://github.com/TOONSLAB/rc"
                target="_blank"
                rel="noopener noreferrer" 
                className="text-purple-400 hover:text-purple-300 underline flex items-center gap-2 group"
              >
                <span>Voir le code source</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
