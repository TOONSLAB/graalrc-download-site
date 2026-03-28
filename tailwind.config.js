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
          dark: '#0f172a',     // Slate 900 - Background
          darker: '#020617',   // Slate 950 - Cards/Nav
          gold: '#fbbf24',     // Amber 400 - Primary
          gold_dark: '#d97706', // Amber 600
          blue: '#3b82f6',     // Blue 500 - Secondary
          text: {
            main: '#f1f5f9',    // Slate 100
            muted: '#94a3b8',   // Slate 400
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
        display: ['Outfit', 'sans-serif'],
      },
      backgroundImage: {
        'graal-gradient': 'radial-gradient(circle at top center, #1e293b 0%, #0f172a 50%, #020617 100%)',
        'gold-gradient': 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)',
        'blue-gradient': 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.4) 100%)',
      },
      borderColor: {
        'graal-gold': '#fbbf24',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(251, 191, 36, 0.3)',
        'glow-lg': '0 0 40px rgba(251, 191, 36, 0.4)',
      },
    },
  },
  plugins: [],
}
