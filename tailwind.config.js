/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#12241a',
          soft: 'rgba(18,36,26,0.62)',
        },
        pine: {
          DEFAULT: '#1f3b2c',
          2: '#274732',
        },
        ivory: {
          DEFAULT: '#f8f3e6',
          2: '#f0e9d6',
        },
        paper: '#fffdf8',
        gold: {
          DEFAULT: '#c6a15b',
          soft: '#e3cd97',
        },
        rust: {
          DEFAULT: '#a6541e',
          2: '#8c4419',
        },
        sage: '#7e8f60',
        // Product palette colours
        almond: {
          DEFAULT: '#c99a63',
          light: '#e6c896',
        },
        cashew: {
          DEFAULT: '#e9dfc2',
          light: '#f5efdd',
        },
        walnut: {
          DEFAULT: '#6e4a2e',
          light: '#96684a',
        },
        date: {
          DEFAULT: '#4a2e1c',
          light: '#6e4530',
        },
        fig: {
          DEFAULT: '#8b4a49',
          light: '#b06e6c',
        },
        raisin: {
          DEFAULT: '#3c2a1e',
          light: '#5c4232',
        },
        seed: {
          DEFAULT: '#8a7a4d',
          light: '#b6a76e',
        },
        ladoo: {
          DEFAULT: '#7a4a24',
          light: '#a6541e',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        soulnuts: '0 24px 60px -30px rgba(18,36,26,0.45)',
        card: '0 14px 30px -12px rgba(166,84,30,0.6)',
      },
      transitionTimingFunction: {
        soulnuts: 'cubic-bezier(.22,.9,.28,1)',
      },
      animation: {
        'spin-slow': 'spin 46s linear infinite',
        'counter-spin': 'counterspin 46s linear infinite',
        'marquee': 'marquee 28s linear infinite',
      },
      keyframes: {
        counterspin: {
          to: { transform: 'rotate(-360deg)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
