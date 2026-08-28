'use client'

import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { createSmoothScroll, trackScrollVelocity } from '@/lib/lenis'

/**
 * Lenis 를 마운트하고 GSAP ticker 와 동기화한다.
 * 페이지 어디에도 이 컴포넌트 밖에서 Lenis 를 만들지 않는다.
 */
export function SmoothScrollProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  useEffect(() => {
    const handle = createSmoothScroll()
    const stopVelocity = trackScrollVelocity(handle.lenis)

    // 폰트·에셋 로드로 레이아웃이 바뀌면 트리거 위치를 다시 계산한다.
    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh).catch(() => {})
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      stopVelocity()
      handle.destroy()
    }
  }, [])

  return <>{children}</>
}
