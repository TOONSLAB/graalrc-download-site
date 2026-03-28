'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function HubPage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tools = [
    {
      title: "Remote Control",
      desc: "The next generation Remote Control for GraalOnline. Native performance, enhanced security.",
      icon: "🎮",
      link: "/rc",
      active: true,
      color: "bg-gold-gradient"
    },
    {
      title: "Official Client",
      desc: "Experience GraalOnline worlds with the official player client.",
      icon: "🌍",
      link: "/client", // Page à créer, ou lien externe vers graalonline.com/player ? Je vais créer une page locale.
      active: true,
      color: "bg-blue-gradient"
    },
    {
      title: "VS Code Extensions",
      desc: "Boost your productivity with official GraalScript extensions for Visual Studio Code.",
      icon: "💻",
      link: "/vscode",
      active: false,
      badge: "Coming Soon"
    },
    {
      title: "AI Toolkit",
      desc: "Next-gen tools for world building and script generation powered by AI.",
      icon: "🤖",
      link: "/ai",
      active: false,
      badge: "Coming Soon"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-graal-dark selection:bg-graal-gold selection:text-graal-darker">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-glow -top-20 -left-20 opacity-20 bg-graal-gold"></div>
        <div className="bg-glow top-40 right-0 opacity-10 bg-graal-blue"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            className="float-animation inline-block relative"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          >
            <div className="absolute inset-0 bg-graal-gold blur-[80px] opacity-10"></div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight relative z-10">
              <span className="block text-2xl md:text-3xl text-graal-gold mb-4 font-medium tracking-widest uppercase">The Toolkit for Builders</span>
              GraalOnline <span className="text-transparent bg-clip-text bg-gold-gradient">Developer Suite</span>
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-graal-text-muted mb-16 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, manage and improve your GraalOnline worlds.
            From administration to development.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {tools.map((tool) => (
              <Link 
                href={tool.active ? tool.link : '#'} 
                key={tool.title}
                className={`group relative card-graal p-8 transition-all duration-300 ${tool.active ? 'hover:-translate-y-2 hover:shadow-glow hover:border-graal-gold/50 cursor-pointer' : 'opacity-75 cursor-default'}`}
              >
                {!tool.active && (
                  <div className="absolute top-4 right-4 bg-white/10 border border-white/10 text-graal-text-muted text-xs font-bold px-2 py-1 rounded-full">
                    {tool.badge}
                  </div>
                )}
                <div className={`w-14 h-14 mb-6 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${tool.active ? tool.color : 'bg-gray-800'} text-white`}>
                  {tool.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-graal-gold transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-graal-text-muted leading-relaxed">
                  {tool.desc}
                </p>
                {tool.active && (
                  <div className="mt-6 flex items-center text-graal-gold text-sm font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                    Access Tool <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
