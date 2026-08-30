import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--sb-primary)',
        'primary-dark': 'var(--sb-primary-dark)',
        'primary-light': 'var(--sb-primary-light)',
        accent: 'var(--sb-accent)',
        paper: 'var(--sb-paper)',
        cream: 'var(--sb-cream)',
        terracotta: 'var(--sb-terracotta)',
        tomato: 'var(--sb-tomato)',
        amber: 'var(--sb-amber)',
        olive: 'var(--sb-olive)',
        ink: 'var(--sb-ink)',
        fog: 'var(--sb-fog)',
        line: 'var(--sb-line)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
      },
    },
  },
  plugins: [],
}
export default config
