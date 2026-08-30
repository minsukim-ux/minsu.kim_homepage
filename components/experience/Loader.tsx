'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, EASE } from '@/lib/gsap'
import { INGREDIENTS, seeded } from '@/lib/ingredients'
import { prefersReduced } from '@/lib/motion'
import { sampleLogoPoints } from './logoPoints'

const KEY = 'sb-visited'

/**
 * 로더 → 로고 모핑.
 * 크림 배경에 재료 이름이 부유 → 로딩률에 따라 스크램블되며 중앙 수렴 →
 * 90%에서 파티클로 붕괴 → 100%에서 로고 위에 재배열 → 헤더 좌측으로 축소 이동.
 * 최대 2.5초, 재방문 시 0.8초.
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const el = root.current
    const cv = canvas.current
    if (!el || !cv) return

    const revisit = sessionStorage.getItem(KEY) === '1'
    sessionStorage.setItem(KEY, '1')
    const reduce = prefersReduced()
    const total = reduce ? 0.2 : revisit ? 0.8 : 2.5

    if (reduce) {
      gsap.set(el, { autoAlpha: 0, display: 'none' })
      setDone(true)
      return
    }

    const words = gsap.utils.toArray<HTMLElement>('[data-word]', el)
    const tl = gsap.timeline({ onComplete: () => setDone(true) })

    // 이름들이 미세하게 부유하다 중앙으로 수렴한다
    tl.to(words, {
      x: 0,
      y: 0,
      autoAlpha: 0,
      scale: 0.6,
      duration: total * 0.36,
      ease: EASE,
      stagger: { each: total * 0.008, from: 'random' },
    })

    // 파티클이 로고 형태 위에 재배열된다
    const ctx = cv.getContext('2d')
    let raf = 0
    const run = async () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.min(window.innerWidth * 0.6, 620)
      const h = w * 0.42
      cv.width = w * dpr
      cv.height = h * dpr
      cv.style.width = `${w}px`
      cv.style.height = `${h}px`
      const targets = await sampleLogoPoints(w * dpr, h * dpr)
      if (!ctx || !targets.length) return

      const parts = targets.map((t, i) => ({
        x: (seeded(i, 1) - 0.5) * cv.width * 2.2 + cv.width / 2,
        y: (seeded(i, 2) - 0.5) * cv.height * 3 + cv.height / 2,
        tx: t.x,
        ty: t.y,
      }))

      const state = { p: 0 }
      gsap.to(state, { p: 1, duration: total * 0.42, ease: EASE, delay: total * 0.3 })

      const draw = () => {
        ctx.clearRect(0, 0, cv.width, cv.height)
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--sb-primary') || '#00614E'
        for (const p of parts) {
          const x = p.x + (p.tx - p.x) * state.p
          const y = p.y + (p.ty - p.y) * state.p
          ctx.fillRect(x, y, 2 * dpr, 2 * dpr)
        }
        raf = requestAnimationFrame(draw)
      }
      draw()
    }
    void run()

    // 헤더 좌측으로 FLIP 축소 이동 + 히어로 페이드인
    tl.add(() => {
      const target = document.querySelector<HTMLElement>('[data-logo-target]')
      const from = cv.getBoundingClientRect()
      if (target) {
        const to = target.getBoundingClientRect()
        gsap.to(cv, {
          x: to.left + to.width / 2 - (from.left + from.width / 2),
          y: to.top + to.height / 2 - (from.top + from.height / 2),
          scale: to.height / from.height,
          duration: 0.8,
          ease: EASE,
        })
      }
      gsap.to(el, { autoAlpha: 0, duration: 0.7, delay: 0.25 })
    }, total * 0.82)

    return () => {
      cancelAnimationFrame(raf)
      tl.kill()
    }
  }, [])

  return (
    <div
      ref={root}
      aria-hidden={done}
      className="fixed inset-0 z-[80] grid place-items-center bg-paper"
      style={{ pointerEvents: done ? 'none' : 'auto', display: done ? 'none' : 'grid' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {INGREDIENTS.map((ing, i) => (
          <span
            key={ing.id}
            data-word
            className="sb-label absolute text-ink/70"
            style={{
              left: `${8 + seeded(i, 3) * 84}%`,
              top: `${10 + seeded(i, 4) * 78}%`,
              transform: `translate(${(seeded(i, 5) - 0.5) * 60}px, ${(seeded(i, 6) - 0.5) * 60}px)`,
            }}
          >
            {ing.nameKo}
          </span>
        ))}
      </div>
      <canvas ref={canvas} className="relative" />
      <span className="sr-only">로딩 중</span>
    </div>
  )
}
