'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { mixColor, prefersReduced, resolveColor } from '@/lib/motion'

/**
 * S2 ABOUT — 핀 + 가로 스크롤 아카이브.
 * 세로 스크롤이 가로 이동을 구동하고, 중앙 카드만 선명해진다(피사계 심도).
 * 섹션의 data-bg 를 현재 카드 색으로 갱신하면 BgFlow가 배경을 연속 보간한다.
 * 모바일에서는 세로 스택 + 스냅으로 두고 가로 핀을 걸지 않는다.
 */
export function AboutScroller({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      const section = scope.closest<HTMLElement>('[data-bg]')
      const track = scope.querySelector<HTMLElement>('[data-about-track]')
      const cards = gsap.utils.toArray<HTMLElement>('[data-about-card]', scope)
      if (!track || !cards.length) return

      const mm = gsap.matchMedia()

      const paint = (i: number) => {
        const color = cards[i]?.dataset.color
        // 원물 색을 그대로 깔면 화면이 무거워진다 — 종이색과 섞어 톤을 유지한다
        if (color && section) section.dataset.bg = mixColor(resolveColor('paper'), color, 0.42)
        const season = cards[i]?.dataset.season
        scope.querySelectorAll<HTMLElement>('[data-season]').forEach((el) => {
          el.dataset.active = String(el.dataset.season === season)
        })
      }

      mm.add('(min-width: 769px)', () => {
        if (prefersReduced()) {
          paint(0)
          return
        }
        const distance = () => track.scrollWidth - window.innerWidth + 96

        // 카드 중심을 rect로 매 프레임 읽으면 트랙 이동과 한 프레임 어긋나
        // 심도 계산이 튄다. x=0 기준 중심을 캐시해두고 이동량만 더한다.
        let base: number[] = []
        const measure = () => {
          const prev = Number(gsap.getProperty(track, 'x')) || 0
          gsap.set(track, { x: 0 })
          base = cards.map((c) => {
            const r = c.getBoundingClientRect()
            return r.left + r.width / 2
          })
          gsap.set(track, { x: prev })
        }
        measure()

        const tl = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: scope,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: measure,
            onUpdate: (self) => {
              const i = Math.round(self.progress * (cards.length - 1))
              paint(i)
              const mid = window.innerWidth / 2
              const x = -distance() * self.progress
              cards.forEach((c, ci) => {
                const d = Math.abs(base[ci] + x - mid) / mid
                // 중앙 데드존 안에서는 완전히 선명하게 둔다
                const k = Math.min(1, Math.max(0, (d - 0.22) / 0.78))
                gsap.set(c, {
                  filter: k > 0.02 ? `blur(${(k * 3).toFixed(2)}px)` : 'none',
                  opacity: 1 - k * 0.4,
                })
              })
            },
          },
        })
        paint(0)
        return () => {
          tl.scrollTrigger?.kill()
          tl.kill()
          gsap.set(track, { x: 0 })
          gsap.set(cards, { filter: 'none', opacity: 1 })
        }
      })

      mm.add('(max-width: 768px)', () => {
        // 모바일: 세로 스택. 뷰포트 중앙에 든 카드로 배경색만 갱신한다.
        const triggers = cards.map((c, i) =>
          ScrollTrigger.create({
            trigger: c,
            start: 'top 65%',
            end: 'bottom 35%',
            onToggle: (self) => self.isActive && paint(i),
          }),
        )
        paint(0)
        return () => triggers.forEach((t) => t.kill())
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return <div ref={root}>{children}</div>
}
