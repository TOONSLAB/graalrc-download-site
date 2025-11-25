/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        graal: {
          dark: '#030712',     // Ultra dark blue/black
          darker: '#111827',   // Dark gray for cards
          primary: '#6366f1',  // Indigo 500
          secondary: '#a855f7', // Purple 500
          accent: '#ec4899',   // Pink 500
          green: '#10b981',
          red: '#ef4444',
          blue: '#3b82f6',
          text: {
            main: '#f9fafb',    // Gray 50
            muted: '#9ca3af',   // Gray 400
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern sans-serif everywhere
        display: ['Outfit', 'sans-serif'], // For headings if needed
      },
      backgroundImage: {
        'graal-gradient': 'radial-gradient(circle at top center, #1e1b4b 0%, #0f172a 50%, #020617 100%)',
        'primary-gradient': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(17, 24, 39, 0.8) 0%, rgba(17, 24, 39, 0.4) 100%)',
      },
      boxShadow: {
        'graal': '0 0 20px rgba(99, 102, 241, 0.2)',
        'graal-lg': '0 0 40px rgba(99, 102, 241, 0.3)',
        'glow': '0 0 15px rgba(168, 85, 247, 0.5)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
