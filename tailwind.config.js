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
          dark: '#0a0e1a',
          darker: '#050810',
          primary: '#d4af37',
          secondary: '#8b7355',
          accent: '#c9a961',
          green: '#4ade80',
          red: '#ef4444',
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        medieval: ['Cinzel', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'graal-gradient': 'linear-gradient(135deg, #0a0e1a 0%, #1a1f3a 50%, #0a0e1a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #c9a961 50%, #8b7355 100%)',
      },
      boxShadow: {
        'graal': '0 0 30px rgba(212, 175, 55, 0.3)',
        'graal-lg': '0 0 50px rgba(212, 175, 55, 0.5)',
      },
    },
  },
  plugins: [],
}
