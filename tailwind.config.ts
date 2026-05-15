import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          ink: '#030816',
          navy: '#071438',
          violet: '#7c3cff',
          cyan: '#39e7ff',
          pink: '#ff64d8',
          glass: 'rgba(13, 24, 68, 0.58)'
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 24px rgba(124, 60, 255, .45), 0 0 52px rgba(57, 231, 255, .18)',
        pink: '0 0 28px rgba(255, 100, 216, .36)'
      },
      backgroundImage: {
        'star-field': 'radial-gradient(circle at 20% 20%, rgba(124,60,255,.32), transparent 28%), radial-gradient(circle at 78% 12%, rgba(57,231,255,.28), transparent 24%), radial-gradient(circle at 58% 72%, rgba(255,100,216,.18), transparent 32%)'
      }
    }
  },
  plugins: []
}

export default config
