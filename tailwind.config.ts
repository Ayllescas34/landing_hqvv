import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'verde-bosque': '#0F4D3A',
        'verde-jardin': '#5C8C5A',
        'lavanda': '#B7A5D8',
        'crema': '#F7F2E8',
        'beige': '#E8DFC9',
        'madera': '#5B3A29',
        'piedra': '#6E6E6E',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'garden-gradient': 'linear-gradient(135deg, #0F4D3A 0%, #1a6b52 40%, #0F4D3A 100%)',
        'cream-gradient': 'linear-gradient(180deg, #F7F2E8 0%, #E8DFC9 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
