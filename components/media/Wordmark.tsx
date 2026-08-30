import { BRAND } from '@/lib/brand'

/** 로고 SVG가 없을 때 사용하는 워드마크 벡터 폴백 */
export function Wordmark({ className, color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 520 96" className={className} role="img" aria-label={BRAND.nameEn}>
      <text
        x="0"
        y="72"
        fill={color}
        style={{
          fontFamily: 'var(--font-serif), Georgia, serif',
          fontSize: '78px',
          letterSpacing: '-0.03em',
        }}
      >
        Sweet Balance
      </text>
    </svg>
  )
}
