import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { Flip } from 'gsap/Flip'

/**
 * GSAP 단일 등록 지점.
 *
 * - registerPlugin 은 모듈 최상단에서 딱 1회. 컴포넌트 안에서 다시 부르지 않는다.
 * - 컴포넌트의 모든 GSAP 코드는 useGSAP 으로 감싸 cleanup 을 보장한다.
 * - Framer Motion 은 쓰지 않는다. 모션은 전부 GSAP.
 */

export const SB_EASE = 'sb'
export const SB_EASE_IN_OUT = 'sb-inout'

/** 진입 애니메이션 기본 duration */
export const DUR_ENTER = 1.05
/** 마이크로 인터랙션 기본 duration */
export const DUR_MICRO = 0.32
/** scrub 기본값 — true 대신 1초 지연으로 시네마틱하게 */
export const SCRUB = 1

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Flip)

  // expo-out 계열. 전 구간 기본 이징.
  CustomEase.create(SB_EASE, '0.16, 1, 0.3, 1')
  // 물리적으로 되돌아오는 구간(마그네틱, 카드 복귀)용
  CustomEase.create(SB_EASE_IN_OUT, '0.76, 0, 0.24, 1')

  gsap.defaults({ ease: SB_EASE, duration: DUR_ENTER })

  // 핀 고정 구간이 많으므로 리사이즈 재계산을 한 프레임에 모은다.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

/** reduced-motion 여부. SSR 에서는 false. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * scrub 타임라인을 reduced-motion 에 맞게 마감한다.
 *
 * reduced-motion 이면 ScrollTrigger 를 붙이지 않고 타임라인을 최종 상태로
 * 즉시 고정한다 → 스크롤 위치와 무관하게 모든 정보가 화면에 존재한다.
 * 그렇지 않으면 scrub: 1 로 ScrollTrigger 를 붙인다.
 *
 * @returns 부착된 ScrollTrigger (reduced-motion 이면 null)
 */
export function attachScrub(
  timeline: gsap.core.Timeline,
  vars: ScrollTrigger.Vars,
): ScrollTrigger | null {
  if (prefersReducedMotion()) {
    timeline.progress(1).pause()
    return null
  }

  return ScrollTrigger.create({
    scrub: SCRUB,
    ...vars,
    animation: timeline,
  })
}

export { gsap, ScrollTrigger, SplitText, CustomEase, Flip }
