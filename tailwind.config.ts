import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FFFBF1',
          100: '#FEF5E1',
          400: '#F2CC60',
          500: '#D4AF37',
          600: '#B8941F', // Darker than 500
          700: '#8B6914',
          800: '#5C4409',
          900: '#3D2D06',
          vibrant: '#FFBB00',
          light: '#E0B84F', // Separate light variant
        },
        orange: {
          vibrant: '#FFBB00',
        },
        grey: {
          dark: '#A9A9A9',
          light: '#EFEFEF',
        },
      },
      boxShadow: {
        'glow': '0 0 30px rgba(212,175,55,0.2)',
        'glow-vibrant': '0 0 40px rgba(255,187,0,0.3)',
        'dramatic': '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,187,0,0.15)',
      },
      animation: {
        'shimmer': 'shimmer 3s infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,187,0,0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(255,187,0,0.4), 0 0 60px rgba(255,187,0,0.2)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
