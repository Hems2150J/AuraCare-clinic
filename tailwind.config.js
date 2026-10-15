/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0284C7', // Primary Trust Cyan
          600: '#0369A1',
          700: '#075985',
          800: '#0C4A6E',
          900: '#0A3650',
        },
        teal: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          500: '#0F766E', // Luxury Medical Teal
          600: '#0D9488',
          700: '#0F766E',
          900: '#134E4A',
        },
        ivory: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
        },
        emerald: {
          500: '#10B981', // Accent CTA / Verification
          600: '#059669',
        },
        emergency: {
          500: '#E11D48', // Red alert accent
          600: '#BE123C',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        heading: ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft-glow': '0 10px 30px -10px rgba(2, 132, 199, 0.15)',
        'card-hover': '0 20px 40px -15px rgba(15, 118, 110, 0.12)',
        'luxury': '0 25px 50px -12px rgba(10, 54, 80, 0.08)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'heartbeat': 'heartbeat 2s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'ken-burns': 'kenBurns 20s ease-out infinite alternate',
      },
      keyframes: {
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.15)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.12)' },
          '70%': { transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(1.02)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        }
      }
    },
  },
  plugins: [],
}
