'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/** Lenis ↔ GSAP ticker 동기화. reduced-motion에서는 스무딩을 끈다. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // 저사양에서는 스무딩을 완화한다
    const weak = (navigator.hardwareConcurrency ?? 8) <= 4
    const lenis = new Lenis({
      lerp: reduce ? 1 : weak ? 0.24 : 0.11,
      smoothWheel: !reduce,
      syncTouch: false,
    })

    const onScroll = () => ScrollTrigger.update()
    lenis.on('scroll', onScroll)

    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
