'use client'

import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { mixColor, resolveColor } from '@/lib/motion'

/**
 * 섹션 배경 연속 보간.
 * [data-bg] 를 가진 섹션들을 읽어 뷰포트 중앙 기준으로 색을 섞는다.
 * 스텝 전환 없음 — 항상 이웃 섹션 색으로 흘러간다.
 * ABOUT 섹션처럼 data-bg 를 실시간으로 바꾸는 섹션도 그대로 따라간다.
 */
export function BgFlow() {
  useEffect(() => {
    const root = document.documentElement
    const setBg = (v: string) => root.style.setProperty('--sb-bg', v)

    const tick = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-bg]'))
      if (!nodes.length) return
      const mid = window.innerHeight / 2

      let idx = 0
      for (let i = 0; i < nodes.length; i++) {
        const r = nodes[i].getBoundingClientRect()
        if (r.top <= mid) idx = i
      }
      const cur = nodes[idx]
      const next = nodes[idx + 1]
      const r = cur.getBoundingClientRect()
      const from = resolveColor(cur.dataset.bg ?? 'paper')
      const to = next ? resolveColor(next.dataset.bg ?? 'paper') : from

      // 섹션 후반 35% 구간에서 다음 색으로 넘어간다
      const p = (mid - r.top) / Math.max(1, r.height)
      const t = (p - 0.65) / 0.35
      setBg(mixColor(from, to, t))
    }

    tick()
    const st = ScrollTrigger.create({ trigger: document.body, start: 0, end: 'max', onUpdate: tick })
    window.addEventListener('resize', tick)
    return () => {
      st.kill()
      window.removeEventListener('resize', tick)
    }
  }, [])

  return null
}
