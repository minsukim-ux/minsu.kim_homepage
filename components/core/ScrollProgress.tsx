'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

/**
 * 상단 스크롤 진행 바.
 * scaleX 만 애니메이션한다(width 금지). reduced-motion 이면 즉시 반영.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const bar = barRef.current
    if (!bar) return

    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      scrub: prefersReducedMotion() ? false : 0.4,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-px bg-transparent"
    >
      <div ref={barRef} className="h-full w-full bg-sb-glow/70" />
    </div>
  )
}
