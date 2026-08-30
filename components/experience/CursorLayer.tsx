'use client'

import { useEffect, useRef } from 'react'
import { INGREDIENTS } from '@/lib/ingredients'
import { IngredientIcon } from '@/components/graphics/ingredients'
import { prefersReduced } from '@/lib/motion'
import { useIngredientTrail } from './useIngredientTrail'

/**
 * 커스텀 커서 + 재료 물리 트레일.
 * - 링 + 중앙 점, 링크 위에서 확장 + magnetic 흡착(최대 12px)
 * - 커서 궤적에서 재료가 확률적으로 스폰되어 낙하·적재 (동시 최대 40)
 * - 영상 위에서는 WATCH 원형 텍스트 커서
 * 모바일(포인터 없음)에서는 커서를 만들지 않고 탭 지점에서 재료가 터진다.
 */
export function CursorLayer() {
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const watch = useRef<HTMLDivElement>(null)
  const pool = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)

  const trail = useIngredientTrail(stage, pool)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = prefersReduced()

    if (!fine) {
      // 모바일: 탭 지점에서 재료가 터져 나오며 낙하
      const onTap = (e: TouchEvent) => {
        const t = e.changedTouches[0]
        if (!t || reduce) return
        for (let i = 0; i < 5; i++) trail.spawn(t.clientX, t.clientY, true)
      }
      window.addEventListener('touchstart', onTap, { passive: true })
      return () => window.removeEventListener('touchstart', onTap)
    }

    document.documentElement.classList.add('sb-has-cursor')
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf = 0
    let magnet: HTMLElement | null = null

    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const el = document.elementFromPoint(x, y) as HTMLElement | null
      const link = el?.closest<HTMLElement>('a, button, [data-magnetic]') ?? null
      magnet = link
      const isWatch = !!el?.closest('[data-cursor="watch"]')
      if (watch.current) watch.current.dataset.on = String(isWatch)
      if (ring.current) ring.current.dataset.hover = String(!!link)
      if (!reduce && Math.random() < 0.12) trail.spawn(x, y)
    }

    const loop = () => {
      let tx = x
      let ty = y
      if (magnet) {
        const r = magnet.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        // 최대 12px 흡착
        tx += Math.max(-12, Math.min(12, cx - x))
        ty += Math.max(-12, Math.min(12, cy - y))
      }
      rx += (tx - rx) * 0.18
      ry += (ty - ry) * 0.18
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`
      if (dot.current) dot.current.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`
      if (watch.current) watch.current.style.transform = `translate3d(${rx - 44}px, ${ry - 44}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      document.documentElement.classList.remove('sb-has-cursor')
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [trail])

  return (
    <>
      {/* 물리 트레일이 그려지는 레이어 */}
      <div ref={stage} aria-hidden className="pointer-events-none fixed inset-0 z-[45] overflow-hidden" />

      <div ref={ring} aria-hidden className="sb-cursor-ring" />
      <div ref={dot} aria-hidden className="sb-cursor-dot" />
      <div ref={watch} aria-hidden className="sb-cursor-watch" data-on="false">
        <svg viewBox="0 0 88 88">
          <defs>
            <path id="sb-watch-path" d="M44 8a36 36 0 1 1 0 72 36 36 0 1 1 0-72" fill="none" />
          </defs>
          <text className="sb-serif" fontSize="11" letterSpacing="4" fill="currentColor">
            <textPath href="#sb-watch-path">WATCH · WATCH · WATCH · </textPath>
          </text>
        </svg>
      </div>

      {/* 복제용 SVG 풀 — 스폰 시 cloneNode 로 꺼내 쓴다 */}
      <div ref={pool} aria-hidden className="pointer-events-none fixed left-0 top-0 h-0 w-0 overflow-hidden">
        {INGREDIENTS.map((i, idx) => (
          <span key={i.id} data-pool={i.id}>
            <IngredientIcon id={i.id} size={34} seed={idx * 13} />
          </span>
        ))}
      </div>
    </>
  )
}
