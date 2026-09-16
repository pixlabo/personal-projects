/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#040711',
          surface: '#080d1a',
          elevated: '#0f172a',
          card: 'rgba(15, 23, 42, 0.65)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        brand: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          purple: '#7928ca',
          pink: '#ff0080',
          neon: '#10b981',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'Anton', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'aurora': 'aurora 15s ease infinite alternate',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        'aurora-mesh': 'linear-gradient(135deg, #7928ca 0%, #ff0080 30%, #4facfe 70%, #00f2fe 100%)',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(0, 242, 254, 0.45)',
        'glow-purple': '0 0 50px -12px rgba(121, 40, 202, 0.5)',
        'glow-pink': '0 0 45px -10px rgba(255, 0, 128, 0.45)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
