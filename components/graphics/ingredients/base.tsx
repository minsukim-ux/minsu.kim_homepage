import type { ReactNode } from 'react'
import { seeded } from '@/lib/ingredients'

export type IngredientProps = {
  /** px */
  size?: number
  /** 'base' | 'shade' 톤 강제. 기본은 2톤 셰이딩 */
  tone?: 'duo' | 'flat'
  /** 회전·비율 미세 랜덤화 */
  seed?: number
  className?: string
  title?: string
}

/**
 * 재료 SVG 공통 래퍼.
 * 아웃라인 없음 / 2톤 셰이딩 / 100x100 viewBox 고정.
 */
export function Ing({
  size = 96,
  seed = 0,
  className,
  title,
  children,
}: IngredientProps & { children: ReactNode }) {
  const rot = (seeded(seed + 1) - 0.5) * 16
  const scale = 0.94 + seeded(seed + 2) * 0.12
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ overflow: 'visible' }}
    >
      <g transform={`rotate(${rot.toFixed(2)} 50 50) translate(50 50) scale(${scale.toFixed(3)}) translate(-50 -50)`}>
        {children}
      </g>
    </svg>
  )
}

/** tone='flat'이면 그림자 path를 숨긴다 */
export function shadeOpacity(tone: IngredientProps['tone']) {
  return tone === 'flat' ? 0 : 1
}
