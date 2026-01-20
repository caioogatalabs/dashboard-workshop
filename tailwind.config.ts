import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',   // Tablet
        'lg': '1280px',  // Desktop
        'xl': '1920px',  // Wide / 4K
      },
      colors: {
        // Cores primitivas - referenciam tokens CSS
        neutral: {
          0: 'var(--color-neutral-0)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)',
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          1000: 'var(--color-neutral-1000)',
          1100: 'var(--color-neutral-1100)',
        },
        brand: {
          100: 'var(--color-brand-100)',
          200: 'var(--color-brand-200)',
          300: 'var(--color-brand-300)',
          400: 'var(--color-brand-400)',
          500: 'var(--color-brand-500)',
          600: 'var(--color-brand-600)',
          700: 'var(--color-brand-700)',
          800: 'var(--color-brand-800)',
          900: 'var(--color-brand-900)',
          1000: 'var(--color-brand-1000)',
        },
        purple: {
          100: 'var(--color-purple-100)',
          200: 'var(--color-purple-200)',
          300: 'var(--color-purple-300)',
          400: 'var(--color-purple-400)',
          500: 'var(--color-purple-500)',
          600: 'var(--color-purple-600)',
          700: 'var(--color-purple-700)',
          800: 'var(--color-purple-800)',
          900: 'var(--color-purple-900)',
          1000: 'var(--color-purple-1000)',
        },
        green: {
          100: 'var(--color-green-100)',
          200: 'var(--color-green-200)',
          300: 'var(--color-green-300)',
          400: 'var(--color-green-400)',
          500: 'var(--color-green-500)',
          600: 'var(--color-green-600)',
          700: 'var(--color-green-700)',
          800: 'var(--color-green-800)',
          900: 'var(--color-green-900)',
          1000: 'var(--color-green-1000)',
        },
        blue: {
          100: 'var(--color-blue-100)',
          200: 'var(--color-blue-200)',
          300: 'var(--color-blue-300)',
          400: 'var(--color-blue-400)',
          500: 'var(--color-blue-500)',
          600: 'var(--color-blue-600)',
          700: 'var(--color-blue-700)',
          800: 'var(--color-blue-800)',
          900: 'var(--color-blue-900)',
          1000: 'var(--color-blue-1000)',
        },
      },
      spacing: {
        // Espaçamentos primitivos - referenciam tokens CSS
        '0': 'var(--space-0)',
        '2': 'var(--space-2)',
        '4': 'var(--space-4)',
        '6': 'var(--space-6)',
        '8': 'var(--space-8)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
        '32': 'var(--space-32)',
        '40': 'var(--space-40)',
        '48': 'var(--space-48)',
        '64': 'var(--space-64)',
      },
    },
  },
  plugins: [],
} satisfies Config
