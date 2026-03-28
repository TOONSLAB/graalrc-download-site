'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { name: 'Hub', path: '/' },
    { name: 'Client', path: '/client' },
    { name: 'Remote Control', path: '/rc' },
    { name: 'AI Tools', path: '/ai' },
    { name: 'VS Code', path: '/vscode' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-graal-darker/90 backdrop-blur-lg border-b border-graal-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gold-gradient rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform border border-graal-gold/30">
              <span className="text-lg font-display font-bold text-graal-darker">G</span>
            </div>
            <span className="text-lg font-display font-bold text-white tracking-widest uppercase group-hover:text-graal-gold transition-colors">
              Graal<span className="text-graal-gold">Dev</span>
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link 
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 
                  ${isActive(item.path) 
                    ? 'bg-graal-gold/10 text-graal-gold border border-graal-gold/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
}
