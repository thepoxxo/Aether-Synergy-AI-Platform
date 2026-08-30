/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: '#07090E',
          900: '#0C1017',
          850: '#111622',
          800: '#171E2E',
          700: '#232D42',
          600: '#34425F',
          gold: {
            DEFAULT: '#E5A93C',
            light: '#F8CF74',
            dark: '#B87A1E',
            glow: 'rgba(229, 169, 60, 0.25)'
          },
          cyan: {
            DEFAULT: '#06B6D4',
            glow: 'rgba(6, 182, 212, 0.25)'
          },
          emerald: '#10B981',
          rose: '#F43F5E',
          purple: '#A855F7'
        }
      },
      boxShadow: {
        'gold-glow': '0 0 20px -2px rgba(229, 169, 60, 0.45)',
        'gold-glow-lg': '0 0 35px 2px rgba(229, 169, 60, 0.55)',
        'cyan-glow': '0 0 20px -2px rgba(6, 182, 212, 0.45)',
        'cyber-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
