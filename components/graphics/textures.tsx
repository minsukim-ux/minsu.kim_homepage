/**
 * 코드로 생성하는 질감/장식 자산.
 * 외부 이미지 없이 SVG·CSS만 사용한다.
 */

/** 필름 그레인 오버레이 — 저해상도 압축 블록을 덮는다 (2-1 규칙) */
export function FilmGrain({ opacity = 0.14 }: { opacity?: number }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 sb-grain"
      style={{ opacity }}
    />
  )
}

/** 종이 질감 배경 — 섹션 배경에 깔린다 */
export function PaperTexture({ opacity = 0.5 }: { opacity?: number }) {
  return <span aria-hidden className="pointer-events-none absolute inset-0 sb-paper-tex" style={{ opacity }} />
}

/** 잉크 번짐 마스크 — 종이가 찢긴 듯한 가장자리 */
export function TornPaperMask({ id, className }: { id: string; className?: string }) {
  return (
    <svg aria-hidden className={className} width="0" height="0">
      <defs>
        <filter id={`${id}-torn`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.06" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="26" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  )
}

/** 손그림 밑줄 — 피드의 손글씨 요소 계승 */
export function HandUnderline({ className, color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 220 16" className={className} fill="none" preserveAspectRatio="none">
      <path
        d="M3 11c34-6 74-8 112-6 32 2 62 6 102 2"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** 손그림 화살표 */
export function HandArrow({ className, color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 80 40" className={className} fill="none">
      <path d="M4 12c18 16 40 20 66 14" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M56 18l14 8-12 8" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
