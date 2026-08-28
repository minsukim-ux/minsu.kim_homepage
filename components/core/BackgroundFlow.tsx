'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/**
 * 스크롤에 따라 body 배경·본문색을 연속 보간한다.
 *
 * 각 섹션은 data-surface="void" | "ink" | "light" 를 선언하고, 여기서는
 * 섹션 중심점을 앵커로 삼아 인접 앵커 사이를 선형 보간한다.
 * → 섹션 경계에서 색이 툭 바뀌는 스텝 전환이 생기지 않는다.
 *
 * 팔레트 값은 CSS 토큰(--sb-*)에서 읽는다. 색을 여기 하드코딩하지 않는다.
 */

type Surface = 'void' | 'ink' | 'light'
type Rgb = [number, number, number]
interface Palette {
  bg: Rgb
  fg: Rgb
  sub: Rgb
}

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

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function mix(a: Rgb, b: Rgb, t: number): string {
  return `rgb(${Math.round(lerp(a[0], b[0], t))} ${Math.round(
    lerp(a[1], b[1], t),
  )} ${Math.round(lerp(a[2], b[2], t))})`
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
      // 경계 위아래로 이만큼 걸쳐 두 색을 섞는다. 경계에서 정확히 50:50.
      const blendZone = window.innerHeight * 0.5

      let index = bands.findIndex((band) => y >= band.top && y < band.bottom)
      if (index === -1) index = y < bands[0]!.top ? 0 : bands.length - 1

      const current = bands[index]!
      const distanceToTop = y - current.top
      const distanceToBottom = current.bottom - y

      let from = current.palette
      let to = current.palette
      let t = 0

      if (distanceToTop < distanceToBottom) {
        const previous = bands[index - 1]
        if (previous && distanceToTop < blendZone) {
          from = current.palette
          to = previous.palette
          t = 0.5 * (1 - distanceToTop / blendZone)
        }
      } else {
        const next = bands[index + 1]
        if (next && distanceToBottom < blendZone) {
          from = current.palette
          to = next.palette
          t = 0.5 * (1 - distanceToBottom / blendZone)
        }
      }

      const eased = gsap.utils.clamp(0, 1, t)
      const bg = mix(from.bg, to.bg, eased)
      const key = `${bg}|${eased.toFixed(3)}`
      if (key === lastKey.current) return
      lastKey.current = key

      root.style.setProperty('--sb-page-bg', bg)
      root.style.setProperty('--sb-page-fg', mix(from.fg, to.fg, eased))
      root.style.setProperty('--sb-page-fg-sub', mix(from.sub, to.sub, eased))
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
