import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 투명도 수식(bg-ink/85)을 쓰려면 채널 값 + <alpha-value> 형태여야 한다
        primary: 'rgb(var(--sb-primary-rgb) / <alpha-value>)',
        'primary-dark': 'var(--sb-primary-dark)',
        'primary-light': 'var(--sb-primary-light)',
        accent: 'rgb(var(--sb-accent-rgb) / <alpha-value>)',
        paper: 'rgb(var(--sb-paper-rgb) / <alpha-value>)',
        cream: 'rgb(var(--sb-cream-rgb) / <alpha-value>)',
        terracotta: 'rgb(var(--sb-terracotta-rgb) / <alpha-value>)',
        tomato: 'rgb(var(--sb-tomato-rgb) / <alpha-value>)',
        amber: 'rgb(var(--sb-amber-rgb) / <alpha-value>)',
        olive: 'rgb(var(--sb-olive-rgb) / <alpha-value>)',
        ink: 'rgb(var(--sb-ink-rgb) / <alpha-value>)',
        fog: 'rgb(var(--sb-fog-rgb) / <alpha-value>)',
        line: 'rgb(var(--sb-line-rgb) / <alpha-value>)',
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
