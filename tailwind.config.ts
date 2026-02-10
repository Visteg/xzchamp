import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'neon-pink': '#FF00CC',
        'neon-blue': '#00F0FF',
      },
      fontFamily: {
        'unbounded': ['Unbounded', 'sans-serif'],
        'tektur': ['Tektur', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
