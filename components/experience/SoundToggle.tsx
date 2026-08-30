'use client'

import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { ensureAudio, setMuted, click, scrollRustle } from '@/lib/sound'

/** 우측 하단 사운드 토글. 초기 음소거, 최초 클릭에서만 AudioContext 생성. */
export function SoundToggle() {
  const [on, setOn] = useState(false)
  const last = useRef(0)

  useEffect(() => {
    if (!on) return
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const now = performance.now()
        if (now - last.current < 130) return
        last.current = now
        scrollRustle(self.getVelocity())
      },
    })
    return () => st.kill()
  }, [on])

  const toggle = () => {
    ensureAudio()
    const next = !on
    setMuted(!next)
    if (next) click()
    setOn(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 border border-line bg-paper/80 px-4 py-2 backdrop-blur"
    >
      <span aria-hidden className="flex h-3 items-end gap-[2px]">
        {[0.4, 1, 0.65].map((h, i) => (
          <span
            key={i}
            className="w-[2px] bg-ink transition-all duration-300"
            style={{ height: `${on ? h * 12 : 3}px` }}
          />
        ))}
      </span>
      <span className="sb-label text-ink">{on ? 'Sound On' : 'Sound Off'}</span>
    </button>
  )
}
