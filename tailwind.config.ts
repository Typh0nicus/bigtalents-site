import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        technopath: ['Technopath', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', '"Apple Color Emoji"', '"Segoe UI Emoji"', 'sans-serif'],
      },
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
        neon: {
          gold: '#FFBB00',
          blue: '#00D9FF',
          purple: '#B026FF',
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212,175,55,0.1)',
        'glow-gold-sm': '0 0 10px rgba(255,187,0,0.15)',
        'glow-gold-md': '0 0 20px rgba(255,187,0,0.25)',
        'glow-gold-lg': '0 0 40px rgba(255,187,0,0.35)',
        'glow-vibrant': '0 0 30px rgba(255,187,0,0.2), 0 20px 60px rgba(0,0,0,0.4)',
        'elegant': '0 20px 60px rgba(0,0,0,0.5)',
        'dramatic': '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,187,0,0.1)',
        'neon-blue': '0 0 20px rgba(0,217,255,0.4), 0 4px 16px rgba(0,0,0,0.3)',
        'neon-purple': '0 0 20px rgba(176,38,255,0.4), 0 4px 16px rgba(0,0,0,0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #FFBB00, #D4AF37)',
        'gradient-gold-vibrant': 'linear-gradient(135deg, #FFBB00, #E0B84F, #D4AF37)',
      },
    },
  },
  plugins: [],
}
export default config
