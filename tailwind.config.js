/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0a0a0a',
        card: '#141414',
        primary: '#F5F5F7',
        muted: '#86868B',
        subtle: '#424245',
        indigo: '#4F46E5',
        cyan: '#06B6D4',
        purple: '#7C3AED',
      },
      fontFamily: {
        display: ['"Space Grotesk"', '-apple-system', '"SF Pro Display"', 'sans-serif'],
        body: ['Inter', '-apple-system', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      fontSize: {
        hero: ['clamp(48px, 8vw, 96px)', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        section: ['clamp(36px, 5vw, 64px)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'aurora': 'aurora 15s ease-in-out infinite',
        'marquee': 'marquee 50s linear infinite',
        'marquee-reverse': 'marquee 50s linear infinite reverse',
        'breath': 'breath 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(8%, 8%) scale(1.1)' },
          '66%': { transform: 'translate(-8%, 4%) scale(0.9)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        breath: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
