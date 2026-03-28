import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'GraalOnline Developer Tools',
  description: 'La suite complète d\'outils pour les développeurs GraalOnline : Remote Control, Client, VS Code Extensions, AI Tools.',
  keywords: ['graal', 'graal online', 'graal rc', 'client', 'developer tools', 'graal dev'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${outfit.variable}`}>
      <body className="min-h-screen bg-graal-dark flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
