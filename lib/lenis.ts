import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from './gsap'

/**
 * Lenis ↔ GSAP 동기화.
 *
 * 반드시 이 패턴을 유지한다:
 *   lenis.on('scroll', ScrollTrigger.update)
 *   gsap.ticker.add((time) => lenis.raf(time * 1000))
 *   gsap.ticker.lagSmoothing(0)
 *
 * reduced-motion 에서는 스무딩을 끈다 → 스크롤이 입력에 1:1 로 붙는다.
 */

export interface LenisHandle {
  lenis: Lenis
  destroy: () => void
}

let active: LenisHandle | null = null

export function getLenis(): Lenis | null {
  return active?.lenis ?? null
}

export function createSmoothScroll(): LenisHandle {
  if (active) return active

  const reduced = prefersReducedMotion()

  const lenis = new Lenis({
    // reduced-motion: lerp 1 = 보간 없음. 입력에 즉시 1:1.
    lerp: reduced ? 1 : 0.1,
    smoothWheel: !reduced,
    // 터치는 네이티브 관성이 더 자연스럽다.
    syncTouch: false,
    wheelMultiplier: 1,
    autoRaf: false,
  })

  const onScroll = () => ScrollTrigger.update()
  lenis.on('scroll', onScroll)

  const raf = (time: number) => {
    lenis.raf(time * 1000)
  }
  gsap.ticker.add(raf)
  gsap.ticker.lagSmoothing(0)

  // Lenis 는 window 를 그대로 스크롤한다 → scrollerProxy 는 쓰지 않는다.
  // (커스텀 wrapper 를 쓸 때만 필요하고, 여기서 붙이면 pin 계산이 틀어진다.)

  const handle: LenisHandle = {
    lenis,
    destroy() {
      lenis.off('scroll', onScroll)
      gsap.ticker.remove(raf)
      lenis.destroy()
      active = null
    },
  }

  active = handle
  return handle
}

/**
 * 스크롤 속도를 0~1 로 정규화해 --sb-scroll-velocity 에 쓴다.
 * 마퀴 속도·기울기(S0)와 사운드 변조(4-3)가 이 값을 읽는다.
 */
export function trackScrollVelocity(lenis: Lenis): () => void {
  const root = document.documentElement
  let raf = 0

  const update = () => {
    // Lenis velocity 는 대략 -60 ~ 60. 40 을 상한으로 클램프.
    const normalized = Math.min(Math.abs(lenis.velocity) / 40, 1)
    root.style.setProperty('--sb-scroll-velocity', normalized.toFixed(3))
    root.dataset.scrollDirection = lenis.direction > 0 ? 'down' : 'up'
    raf = 0
  }

  const onScroll = () => {
    if (raf) return
    raf = requestAnimationFrame(update)
  }

  lenis.on('scroll', onScroll)

  return () => {
    lenis.off('scroll', onScroll)
    if (raf) cancelAnimationFrame(raf)
    root.style.setProperty('--sb-scroll-velocity', '0')
  }
}
