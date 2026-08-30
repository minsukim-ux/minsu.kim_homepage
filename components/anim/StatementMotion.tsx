'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, SplitText, EASE } from '@/lib/gsap'
import { prefersReduced } from '@/lib/motion'

/**
 * S1 STATEMENT.
 * 핀 고정 후 문장이 순차 등장 — 단어가 사방에서 날아와 안착하고,
 * 다음 문장이 들어올 때 흩어진다. 마지막 문장은 흩어지지 않고
 * 축소되어 다음 섹션 라벨 자리로 이동한다. (스크롤 탈취 없음)
 */
export function StatementMotion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope) return
      const items = gsap.utils.toArray<HTMLElement>('[data-statement]', scope)
      if (!items.length) return

      if (prefersReduced()) {
        gsap.set(items, { autoAlpha: 1, position: 'relative', y: 0 })
        scope.querySelectorAll<HTMLElement>('[data-countup]').forEach((el) => {
          el.textContent = el.dataset.countup ?? el.textContent
        })
        return
      }

      const splits = items.map((el) => new SplitText(el.querySelector('[data-words]') as HTMLElement, { type: 'words' }))
      gsap.set(items, { autoAlpha: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope,
          start: 'top top',
          end: `+=${items.length * 90}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      items.forEach((el, i) => {
        const words = splits[i].words
        const last = i === items.length - 1
        tl.set(el, { autoAlpha: 1 })
        tl.from(
          words,
          {
            x: () => gsap.utils.random(-320, 320),
            y: () => gsap.utils.random(-240, 240),
            rotate: () => gsap.utils.random(-30, 30),
            autoAlpha: 0,
            duration: 0.9,
            ease: EASE,
            stagger: { each: 0.05, from: 'random' },
          },
          '<',
        )

        const num = el.querySelector<HTMLElement>('[data-countup]')
        if (num) {
          const target = Number((num.dataset.countup ?? '0').replace(/[^\d]/g, ''))
          const obj = { v: 0 }
          tl.to(
            obj,
            {
              v: target,
              duration: 0.9,
              ease: EASE,
              onUpdate: () => {
                num.textContent = Math.round(obj.v).toLocaleString('ko-KR')
              },
            },
            '<',
          )
        }

        tl.to(el, { autoAlpha: 1, duration: 0.5 })

        if (last) {
          // 흩어지지 않고 축소되어 다음 섹션 라벨이 된다
          tl.to(el, {
            scale: 0.18,
            y: () => -window.innerHeight * 0.34,
            x: () => -window.innerWidth * 0.16,
            transformOrigin: 'left center',
            duration: 1.1,
            ease: EASE,
          })
        } else {
          tl.to(words, {
            x: () => gsap.utils.random(-420, 420),
            y: () => gsap.utils.random(-320, 320),
            rotate: () => gsap.utils.random(-40, 40),
            autoAlpha: 0,
            duration: 0.8,
            ease: EASE,
            stagger: { each: 0.03, from: 'random' },
          })
          tl.set(el, { autoAlpha: 0 })
        }
      })
    },
    { scope: root },
  )

  return <div ref={root}>{children}</div>
}
