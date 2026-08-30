'use client'

import { useEffect, useRef } from 'react'

/** 영상 파일이 없을 때의 폴백 — 캔버스로 웜 그라디언트를 천천히 흘린다. */
export function WarmGradient({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    if (!cv) return
    const ctx = cv.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let t = 0

    const resize = () => {
      const r = cv.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.max(1, Math.round(r.width * dpr))
      cv.height = Math.max(1, Math.round(r.height * dpr))
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width: w, height: h } = cv
      const a = Math.sin(t * 0.0004) * 0.5 + 0.5
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, '#FBF8F2')
      g.addColorStop(0.4 + a * 0.15, '#F0DCC0')
      g.addColorStop(1, a > 0.5 ? '#E9A33B' : '#E0523A')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)
      if (!reduce) {
        t += 16
        raf = requestAnimationFrame(draw)
      }
    }
    draw()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={className} />
}
