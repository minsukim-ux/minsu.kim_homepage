'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, SplitText, EASE } from '@/lib/gsap'
import { prefersReduced } from '@/lib/motion'

/**
 * S0 히어로 모션.
 * - 카피가 글자 단위로 사방에서 날아와 조립
 * - 마퀴 2줄이 반대 방향으로 흐르고 스크롤 속도에 반응
 * - 스크롤 시작하면 영상이 원형 마스킹으로 축소 (scale 확대 없음)
 */
export function HeroMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduce = prefersReduced()
      const scope = root.current
      if (!scope) return

      const heading = scope.querySelector<HTMLElement>('[data-split="hero"]')
      if (heading && !reduce) {
        const split = new SplitText(heading, { type: 'chars,lines', linesClass: 'overflow-hidden' })
        gsap.set(heading, { autoAlpha: 1 })
        gsap.from(split.chars, {
          // 사방에서 날아와 조립된다
          x: () => gsap.utils.random(-260, 260),
          y: () => gsap.utils.random(-200, 200),
          rotate: () => gsap.utils.random(-45, 45),
          autoAlpha: 0,
          duration: 1.1,
          ease: EASE,
          stagger: { each: 0.014, from: 'random' },
          delay: 0.15,
        })
      } else if (heading) {
        gsap.set(heading, { autoAlpha: 1 })
      }

      // 마퀴 — 반대 방향 2줄
      const marquees = gsap.utils.toArray<HTMLElement>('[data-marquee] .sb-marquee', scope)
      const tweens = marquees.map((el, i) => {
        const dir = el.parentElement?.dataset.marquee === 'reverse' ? 1 : -1
        gsap.set(el, { xPercent: dir === 1 ? -50 : 0 })
        return gsap.to(el, {
          xPercent: dir === 1 ? 0 : -50,
          duration: 26 + i * 6,
          ease: 'none',
          repeat: -1,
          paused: reduce,
        })
      })

      if (!reduce) {
        ScrollTrigger.create({
          trigger: scope,
          start: 'top top',
          end: 'bottom top',
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1200, 3)
            tweens.forEach((t) => gsap.to(t, { timeScale: boost, duration: 0.3, overwrite: true }))
          },
        })

        // 영상이 원형 마스킹으로 축소되며 다음 섹션으로 넘어간다
        const stage = scope.querySelector<HTMLElement>('[data-hero-stage]')
        if (stage) {
          gsap.fromTo(
            stage,
            { clipPath: 'circle(140% at 50% 45%)' },
            {
              clipPath: 'circle(16% at 50% 45%)',
              ease: 'none',
              scrollTrigger: { trigger: scope, start: 'top top', end: 'bottom top', scrub: 1 },
            },
          )
        }
      }
    },
    { scope: root },
  )

  return <div ref={root}>{children}</div>
}
