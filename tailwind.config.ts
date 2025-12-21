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
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui'],
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
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212,175,55,0.1)',
        'elegant': '0 20px 60px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
export default config
