import type { ReactNode } from 'react'

/**
 * 무한 마퀴.
 *
 * - 콘텐츠를 2벌 렌더하고 -50% 이동시켜 이음선 없이 순환한다.
 * - 속도와 기울기는 --sb-scroll-velocity(0~1)를 읽어 실시간 변한다.
 *   스크롤이 빨라지면 마퀴도 빨라지고 살짝 눕는다.
 * - transform 만 애니메이션한다. left/width 는 건드리지 않는다.
 * - reduced-motion 은 globals.css 에서 정지된다.
 */
export function Marquee({
  items,
  reverse = false,
  baseDuration = 34,
  className = '',
  itemClassName = '',
  separator = '—',
}: {
  items: readonly ReactNode[]
  reverse?: boolean
  /** 정지 상태 기준 1회 순환 시간(초) */
  baseDuration?: number
  className?: string
  itemClassName?: string
  separator?: string
}) {
  if (items.length === 0) return null

  const track = (
    <span className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={index} className={`flex items-center ${itemClassName}`}>
          <span>{item}</span>
          <span aria-hidden="true" className="px-4 opacity-40 sm:px-6">
            {separator}
          </span>
        </span>
      ))}
    </span>
  )

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: `skewY(calc(var(--sb-scroll-velocity) * ${
          reverse ? '' : '-'
        }1.2deg))`,
        transition: 'transform 0.4s ease-out',
      }}
    >
      <div
        className="flex w-max will-change-transform"
        style={{
          animationName: 'sb-marquee-x',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection: reverse ? 'reverse' : 'normal',
          animationDuration: `calc(${baseDuration}s - ${
            baseDuration * 0.6
          }s * var(--sb-scroll-velocity))`,
        }}
      >
        {track}
        {/* 두 번째 벌은 시각적 복제. 스크린리더에는 한 번만 읽힌다. */}
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {track}
        </span>
      </div>
    </div>
  )
}
