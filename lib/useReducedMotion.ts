'use client'

import { useEffect, useState } from 'react'

/**
 * SSR과 클라이언트의 첫 렌더를 일치시키기 위해 항상 false로 시작한다.
 * 렌더 중에 matchMedia를 읽으면 하이드레이션 불일치가 생긴다.
 */
export function useReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduce(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduce
}
