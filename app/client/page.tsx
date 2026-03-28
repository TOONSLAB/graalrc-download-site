'use client'

import { useEffect, useState } from 'react'

const CLIENT_DOWNLOADS = {
  ios: {
    name: 'iOS',
    icon: '📱',
    description: 'iPhone & iPad',
    url: 'https://apps.apple.com/app/graalonline-classic/id30996117',
    buttonText: 'App Store',
    size: 'Free',
  },
  android: {
    name: 'Android',
    icon: '🤖',
    description: 'Phones & Tablets',
    url: 'https://play.google.com/store/apps/details?id=com.yourcompany.graalonline',
    buttonText: 'Google Play',
    size: 'Free',
  },
  windows: {
    name: 'Windows',
    icon: '🪟',
    description: 'Windows 10/11',
    url: 'https://graalonline.com/downloads/graalonline_setup.exe',
    buttonText: 'Download .exe',
    size: '~50 MB',
  },
  macos: {
    name: 'macOS',
    icon: '🍎',
    description: 'Intel & Apple Silicon',
    url: 'https://graalonline.com/downloads/GraalOnline.dmg',
    buttonText: 'Download .dmg',
    size: '~60 MB',
  },
}

export default function ClientPage() {
  const [os, setOs] = useState<'windows' | 'macos' | 'ios' | 'android' | null>(null)

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    if (userAgent.includes('iphone') || userAgent.includes('ipad')) setOs('ios')
    else if (userAgent.includes('android')) setOs('android')
    else if (userAgent.includes('win')) setOs('windows')
    else if (userAgent.includes('mac')) setOs('macos')
  }, [])

  const handleDownload = (url: string) => {
    window.open(url, '_blank')
  }

  const recommended = os ? CLIENT_DOWNLOADS[os as keyof typeof CLIENT_DOWNLOADS] : null

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow -top-20 -left-20 opacity-20 bg-graal-blue"></div>
        <div className="bg-glow top-40 right-0 opacity-10 bg-graal-gold"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 drop-shadow-md">
            Official <span className="text-graal-blue">Client</span>
          </h1>
          
          <div className="inline-flex items-center space-x-2 bg-graal-darker/80 px-4 py-2 rounded-full border border-graal-blue/30 shadow-inner mb-4">
            <span className="w-3 h-3 rounded-full bg-graal-blue animate-pulse"></span>
            <span className="text-gray-300 font-medium">GraalOnline Player</span>
          </div>
          
          <p className="text-xl text-graal-text-muted max-w-2xl mx-auto">
            Experience GraalOnline worlds with the official player client.
            Available on all major platforms.
          </p>
        </div>

        {/* Recommended Download */}
        {recommended && (
          <div className="max-w-3xl mx-auto mb-16 animate-fade-in-up">
            <div className="bg-gradient-to-br from-graal-darker to-black border border-graal-blue/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 bg-graal-blue text-white text-xs font-bold px-4 py-1 rounded-bl-xl font-display shadow-lg">
                RECOMMENDED FOR YOU
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <div className="text-7xl mb-4 md:mb-0 animate-bounce-slow inline-block">
                    {recommended.icon}
                  </div>
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-display font-bold text-white mb-2">
                    Download for {recommended.name}
                  </h2>
                  <p className="text-gray-400 mb-2">
                    {recommended.description}
                  </p>
                  <p className="text-sm text-graal-blue flex items-center justify-center md:justify-start gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Official Release • {recommended.size}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => handleDownload(recommended.url)}
                    className="bg-graal-blue hover:bg-graal-blue/80 text-white px-8 py-4 rounded-lg text-lg font-bold shadow-lg shadow-graal-blue/20 flex items-center gap-2 hover:scale-105 transition-transform"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>{recommended.buttonText}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Platforms Grid */}
        <h3 className="text-2xl font-display text-center text-graal-blue mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-12 bg-graal-blue/30"></span>
          All Platforms
          <span className="h-px w-12 bg-graal-blue/30"></span>
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(CLIENT_DOWNLOADS).map(([key, platform]) => (
            <div 
              key={key}
              className={`card-graal shadow-graal-lg transition-all duration-300 text-center ${
                os === key ? 'ring-2 ring-graal-blue scale-105' : 'hover:bg-graal-darker/80'
              }`}
            >
              <div className="text-5xl mb-4">{platform.icon}</div>
              <h2 className="text-2xl font-display text-white mb-2">{platform.name}</h2>
              <p className="text-sm text-gray-400 mb-4">{platform.description}</p>
              <p className="text-xs text-graal-blue mb-4">{platform.size}</p>
              <button
                onClick={() => handleDownload(platform.url)}
                className="w-full bg-graal-blue/20 hover:bg-graal-blue/40 text-graal-blue border border-graal-blue/30 px-4 py-3 rounded-lg font-medium transition-colors"
              >
                {platform.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="card-graal shadow-graal-lg text-center">
          <h2 className="text-2xl font-display text-graal-blue mb-4">
            Need Help?
          </h2>
          <p className="text-gray-400 mb-6">
            Visit the official GraalOnline website for tutorials, support, and community resources.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://graalonline.com"
              target="_blank"
              rel="noreferrer"
              className="bg-graal-darker border border-graal-gold/30 hover:border-graal-gold/50 text-graal-gold px-6 py-3 rounded-lg transition-colors"
            >
              GraalOnline.com
            </a>
            <a
              href="https://graalonline.com/playerworlds"
              target="_blank"
              rel="noreferrer"
              className="bg-graal-darker border border-gray-600 hover:border-gray-500 text-gray-300 px-6 py-3 rounded-lg transition-colors"
            >
              Browse Worlds
            </a>
            <a
              href="https://graalonline.com/forums"
              target="_blank"
              rel="noreferrer"
              className="bg-graal-darker border border-gray-600 hover:border-gray-500 text-gray-300 px-6 py-3 rounded-lg transition-colors"
            >
              Community Forums
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
