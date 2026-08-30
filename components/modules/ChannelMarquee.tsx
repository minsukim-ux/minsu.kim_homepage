'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { CHANNELS } from '@/lib/channels'
import { prefersReduced } from '@/lib/motion'

/**
 * 채널 마퀴 — 이 브랜드는 채널 커머스 중심이므로 감추지 않고 전면에 둔다.
 * 호버한 채널만 컬러로 살아나고 나머지는 옅어진다.
 * ⚠️ 실제 입점 여부가 확인되지 않은 채널은 링크를 걸지 않는다.
 */
export function ChannelMarquee() {
  const root = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState<string | null>(null)

  useGSAP(
    () => {
      if (prefersReduced()) return
      gsap.utils.toArray<HTMLElement>('.sb-marquee', root.current!).forEach((el, i) => {
        const reverse = el.parentElement?.dataset.marquee === 'reverse'
        gsap.set(el, { xPercent: reverse ? -50 : 0 })
        gsap.to(el, {
          xPercent: reverse ? 0 : -50,
          duration: 34 + i * 8,
          ease: 'none',
          repeat: -1,
        })
      })
    },
    { scope: root },
  )

  const row = [...CHANNELS, ...CHANNELS]

  return (
    <div ref={root} onPointerLeave={() => setHover(null)}>
      {[false, true].map((reverse) => (
        <div
          key={String(reverse)}
          data-marquee={reverse ? 'reverse' : 'forward'}
          className="overflow-hidden py-3"
        >
          <div className="sb-marquee gap-12 whitespace-nowrap">
            {row.map((c, i) => {
              const dim = hover !== null && hover !== c.id
              const content = (
                <span
                  className="text-[clamp(1.4rem,3vw,2.6rem)] font-bold tracking-[-0.02em] transition-[color,opacity] duration-300"
                  style={{ color: hover === c.id ? c.color : 'var(--sb-ink)', opacity: dim ? 0.22 : 1 }}
                >
                  {c.nameKo}
                </span>
              )
              return (
                <span key={`${c.id}-${i}`} onPointerEnter={() => setHover(c.id)}>
                  {c.url ? (
                    <a href={c.url} target="_blank" rel="noopener">
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </span>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
