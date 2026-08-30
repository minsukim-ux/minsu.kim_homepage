'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, SplitText, EASE } from '@/lib/gsap'
import { prefersReduced } from '@/lib/motion'
import { whoosh } from '@/lib/sound'

/**
 * 페이지 전환 — 하단에서 크림 종이가 올라와 화면을 덮고,
 * 다음 페이지에서 위로 빠진다. 종이 위에 목적지 라벨이 타이핑된다.
 */
export function PageVeil() {
  const veil = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const el = veil.current
    if (!el || prefersReduced()) return

    const name = pathname === '/' ? 'Sweet Balance' : pathname.replace('/', '').toUpperCase()
    if (label.current) label.current.textContent = name

    // 종이가 화면을 덮은 상태에서 시작해 위로 빠진다
    gsap.set(el, { yPercent: 0 })
    const tl = gsap.timeline({ onComplete: () => gsap.set(el, { yPercent: 100 }) })
    if (label.current) {
      const split = new SplitText(label.current, { type: 'chars' })
      tl.from(split.chars, { autoAlpha: 0, duration: 0.25, stagger: 0.03, ease: 'none' }, 0)
    }
    tl.to(el, { yPercent: -100, duration: 0.9, ease: EASE }, 0.35)
    whoosh()
    return () => {
      tl.kill()
      gsap.set(el, { yPercent: 100 })
    }
  }, [pathname])

  return (
    <div ref={veil} aria-hidden className="sb-page-veil">
      <span ref={label} className="sb-serif text-[clamp(1.6rem,5vw,3rem)] tracking-[0.08em]" />
    </div>
  )
}
