'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { lerpRgb, readableOn, toCss, type Rgb } from '@/lib/contrastColor'

/**
 * 스크롤에 따라 body 배경·본문색을 연속 보간한다.
 *
 * 각 섹션은 data-surface="void" | "ink" | "light" 를 선언하고, 여기서는
 * 섹션 구간(band)을 잡아 경계 부근에서만 인접 색과 섞는다.
 * → 섹션 경계에서 색이 툭 바뀌는 스텝 전환이 생기지 않는다.
 *
 * 팔레트 값은 CSS 토큰(--sb-*)에서 읽는다. 색을 여기 하드코딩하지 않는다.
 *
 * ⚠️ 배경은 보간하지만 **글자색은 보간하지 않는다**. 둘 다 보간하면 전환
 *    한가운데서 같은 중간 회색이 되어 대비가 1:1 로 무너진다(실측된 버그).
 *    글자색은 lib/contrastColor 의 readableOn 으로 "그 배경에서 읽히는 쪽"을
 *    고른다. 자세한 근거는 그 파일 주석 참고.
 */

type Surface = 'void' | 'ink' | 'light'
interface Palette {
  bg: Rgb
  fg: Rgb
  sub: Rgb
}

/** 본문 최소 대비. WCAG 2.1 AA (일반 텍스트). */
const MIN_CONTRAST = 4.5

function readToken(styles: CSSStyleDeclaration, name: string): Rgb {
  const raw = styles.getPropertyValue(name).trim()
  const hex = raw.replace('#', '')
  if (hex.length !== 6) return [0, 0, 0]
  return [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ]
}

function buildPalettes(): Record<Surface, Palette> {
  const styles = getComputedStyle(document.documentElement)
  const bgLight = readToken(styles, '--sb-bg')
  const textDark = readToken(styles, '--sb-text')
  const textSub = readToken(styles, '--sb-text-sub')
  const fog = readToken(styles, '--sb-fog')

  return {
    void: { bg: readToken(styles, '--sb-void'), fg: bgLight, sub: fog },
    ink: { bg: readToken(styles, '--sb-ink'), fg: bgLight, sub: fog },
    light: { bg: bgLight, fg: textDark, sub: textSub },
  }
}

/**
 * 전환 급경사. 클수록 "섞이는 중" 상태에 머무는 스크롤 거리가 짧아진다.
 * 22 는 부드러움과 대비 사이에서 실측으로 고른 값이다.
 */
const K = 22
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x))

/** 0.5 에서 급격히 넘어가는 S 커브. u=0 → 0, u=1 → 1 로 정규화. */
function sCurve(u: number): number {
  const lo = sigmoid(-K / 2)
  const hi = sigmoid(K / 2)
  return (sigmoid(K * (u - 0.5)) - lo) / (hi - lo)
}

export function BackgroundFlow() {
  const lastKey = useRef('')

  useGSAP(() => {
    const palettes = buildPalettes()
    const root = document.documentElement

    /** 섹션 구간. 섹션 높이가 크게 달라도 각자 자기 색을 유지한다. */
    let bands: { top: number; bottom: number; palette: Palette }[] = []

    const measure = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-surface]'),
      )
      bands = sections
        .map((section) => {
          const surface = (section.dataset.surface ?? 'void') as Surface
          const rect = section.getBoundingClientRect()
          const top = rect.top + window.scrollY
          return {
            top,
            bottom: top + rect.height,
            palette: palettes[surface] ?? palettes.void,
          }
        })
        .sort((a, b) => a.top - b.top)
    }

    const apply = () => {
      if (bands.length === 0) return
      const y = window.scrollY + window.innerHeight / 2
      // 경계 위아래로 이만큼 걸쳐 배경을 섞는다. 길수록 전환이 오래 흐려진다.
      const blendZone = window.innerHeight * 0.22

      let index = bands.findIndex((band) => y >= band.top && y < band.bottom)
      if (index === -1) index = y < bands[0]!.top ? 0 : bands.length - 1

      const current = bands[index]!
      const distanceToTop = y - current.top
      const distanceToBottom = current.bottom - y

      // 경계 하나를 기준으로 아래 밴드(from) → 위 밴드(to) 로 방향을 고정한다.
      // u = 0 은 아래 밴드 색, u = 1 은 위 밴드 색, u = 0.5 가 경계선이다.
      let from = current.palette
      let to = current.palette
      let u = 0

      if (distanceToTop < distanceToBottom) {
        const previous = bands[index - 1]
        if (previous && distanceToTop < blendZone) {
          from = previous.palette
          to = current.palette
          u = 0.5 + 0.5 * (distanceToTop / blendZone)
        }
      } else {
        const next = bands[index + 1]
        if (next && distanceToBottom < blendZone) {
          from = current.palette
          to = next.palette
          u = 0.5 - 0.5 * (distanceToBottom / blendZone)
        }
      }

      const t = sCurve(gsap.utils.clamp(0, 1, u))
      const bg = lerpRgb(from.bg, to.bg, t)

      // 가까운 쪽 팔레트의 글자색을 우선 쓰고, 그 배경에서 안 읽히면 반대쪽.
      const near = t < 0.5 ? from : to
      const far = t < 0.5 ? to : from
      const fg = readableOn(bg, near.fg, far.fg, MIN_CONTRAST)
      const sub = readableOn(bg, near.sub, far.sub, MIN_CONTRAST)

      const bgCss = toCss(bg)
      const fgCss = toCss(fg)
      const key = `${bgCss}|${fgCss}`
      if (key === lastKey.current) return
      lastKey.current = key

      root.style.setProperty('--sb-page-bg', bgCss)
      root.style.setProperty('--sb-page-fg', fgCss)
      root.style.setProperty('--sb-page-fg-sub', toCss(sub))
    }

    measure()
    apply()

    gsap.ticker.add(apply)
    const onRefresh = () => {
      measure()
      apply()
    }
    ScrollTrigger.addEventListener('refreshInit', onRefresh)
    window.addEventListener('resize', onRefresh)

    return () => {
      gsap.ticker.remove(apply)
      ScrollTrigger.removeEventListener('refreshInit', onRefresh)
      window.removeEventListener('resize', onRefresh)
    }
  }, [])

  return null
}
