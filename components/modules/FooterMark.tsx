'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText, EASE } from '@/lib/gsap'
import { prefersReduced } from '@/lib/motion'
import { INGREDIENTS, seeded } from '@/lib/ingredients'
import { IngredientIcon } from '@/components/graphics/ingredients'

/**
 * 하단에서 거대 워드마크가 스크롤에 따라 솟아오르고,
 * 계속 스크롤하면 흩어지며 무한 채소밭이 드러난다.
 */
export function FooterMark({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope || prefersReduced()) return
      const mark = scope.querySelector<HTMLElement>('[data-footer-mark]')
      if (!mark) return

      gsap.fromTo(
        mark,
        { yPercent: 60, autoAlpha: 0.2 },
        {
          yPercent: 0,
          autoAlpha: 1,
          ease: 'none',
          scrollTrigger: { trigger: scope, start: 'top bottom', end: 'top 40%', scrub: 1 },
        },
      )

      // p에는 aria-label이 허용되지 않는다 — 조각은 숨기고 브랜드명은 헤더/저작권 줄에 남긴다
      const split = new SplitText(mark, { type: 'chars', aria: 'none' })
      mark.setAttribute('aria-hidden', 'true')
      gsap.to(split.chars, {
        y: () => gsap.utils.random(-260, 260),
        x: () => gsap.utils.random(-320, 320),
        rotate: () => gsap.utils.random(-60, 60),
        autoAlpha: 0,
        ease: EASE,
        stagger: { each: 0.02, from: 'random' },
        scrollTrigger: { trigger: scope, start: 'bottom bottom', end: 'bottom 20%', scrub: 1 },
      })

      gsap.to('[data-patch]', {
        y: -120,
        ease: 'none',
        scrollTrigger: { trigger: scope, start: 'bottom bottom', end: 'bottom top', scrub: 1 },
      })
    },
    { scope: root },
  )

  return <div ref={root}>{children}</div>
}

/** 이스터에그 — 끝없이 이어지는 채소밭 */
export function VegetablePatch() {
  const rows = 4
  const per = 14
  return (
    <div data-patch aria-hidden className="pointer-events-none relative h-[38vh] overflow-hidden">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-10" style={{ marginTop: r * 8, opacity: 1 - r * 0.18 }}>
          {Array.from({ length: per }).map((_, c) => {
            const meta = INGREDIENTS[(r * per + c) % INGREDIENTS.length]
            return (
              <IngredientIcon
                key={c}
                id={meta.id}
                size={54 - r * 6}
                seed={seeded(r * per + c) * 100}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
