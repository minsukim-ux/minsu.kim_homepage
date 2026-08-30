'use client'

import { useEffect, useState } from 'react'
import { prefersReduced } from './motion'

/**
 * 저사양 감지 — hardwareConcurrency <= 4 이거나 3초간 저FPS면 Lite 모드.
 * Lite 모드에서는 WebGL을 정적으로 낮추고 물리를 끈다.
 */
export function useLiteMode(): boolean {
  const [lite, setLite] = useState(false)

  useEffect(() => {
    if (prefersReduced()) {
      setLite(true)
      return
    }
    if ((navigator.hardwareConcurrency ?? 8) <= 4) {
      setLite(true)
      return
    }

    let frames = 0
    let raf = 0
    const start = performance.now()
    const loop = () => {
      frames += 1
      const elapsed = performance.now() - start
      if (elapsed >= 3000) {
        if (frames / (elapsed / 1000) < 30) setLite(true)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  return lite
}
