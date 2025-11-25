import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const cinzel = Cinzel({ 
  subsets: ['latin'], 
  variable: '--font-cinzel',
  weight: ['400', '600', '700']
})

export const metadata: Metadata = {
  title: 'Graal RC - Client Officiel',
  description: 'Téléchargez le client officiel Graal RC pour Windows, macOS et Linux',
  keywords: ['graal', 'graal online', 'graal rc', 'client', 'download'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="min-h-screen bg-graal-gradient">
        {children}
      </body>
    </html>
  )
}
