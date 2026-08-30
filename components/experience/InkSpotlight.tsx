'use client'

import { useEffect, useRef } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { prefersReduced } from '@/lib/motion'

/**
 * 잉크 스포트라이트.
 * 대상 섹션에 들어오면 화면이 옅은 세피아로 빠지고 커서 반경 220px만 원색으로 복원된다.
 * 모바일(포인터 없음)에서는 스크롤 위치를 따라 스포트라이트가 자동으로 움직인다.
 */
export function InkSpotlight({ targetId }: { targetId: string }) {
  const veil = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = veil.current
    const target = document.getElementById(targetId)
    if (!el || !target || prefersReduced()) return

    const fine = window.matchMedia('(pointer: fine)').matches
    const setPos = (x: number, y: number) => {
      el.style.setProperty('--sb-ink-x', `${x}px`)
      el.style.setProperty('--sb-ink-y', `${y}px`)
    }
    setPos(window.innerWidth / 2, window.innerHeight / 2)

    const onMove = (e: PointerEvent) => setPos(e.clientX, e.clientY)
    if (fine) window.addEventListener('pointermove', onMove)

    const st = ScrollTrigger.create({
      trigger: target,
      start: 'top 60%',
      end: 'bottom 40%',
      onToggle: (self) => {
        el.dataset.on = String(self.isActive)
      },
      onUpdate: (self) => {
        if (fine) return
        setPos(window.innerWidth * 0.5, window.innerHeight * (0.2 + self.progress * 0.6))
      },
    })

    return () => {
      if (fine) window.removeEventListener('pointermove', onMove)
      st.kill()
    }
  }, [targetId])

  return <div ref={veil} aria-hidden className="sb-ink-dim" data-on="false" />
}
