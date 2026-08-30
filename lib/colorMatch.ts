import { INGREDIENTS, type IngredientMeta } from './ingredients'
import { PRODUCTS, type Product } from './products'

export type Hsl = { h: number; s: number; l: number }

export function rgbToHsl(r: number, g: number, b: number): Hsl {
  const R = r / 255
  const G = g / 255
  const B = b / 255
  const max = Math.max(R, G, B)
  const min = Math.min(R, G, B)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) return { h: 0, s: 0, l }
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h: number
  if (max === R) h = ((G - B) / d + (G < B ? 6 : 0)) / 6
  else if (max === G) h = ((B - R) / d + 2) / 6
  else h = ((R - G) / d + 4) / 6
  return { h, s, l }
}

export function hexToHsl(hex: string): Hsl {
  const s = hex.replace('#', '')
  return rgbToHsl(parseInt(s.slice(0, 2), 16), parseInt(s.slice(2, 4), 16), parseInt(s.slice(4, 6), 16))
}

/** 단순 HSL 근접도 — 색상환 거리를 가장 무겁게 본다 */
export function hslDistance(a: Hsl, b: Hsl): number {
  const dh = Math.min(Math.abs(a.h - b.h), 1 - Math.abs(a.h - b.h))
  return dh * 2 + Math.abs(a.s - b.s) * 0.6 + Math.abs(a.l - b.l) * 0.6
}

export function nearestIngredients(target: Hsl, n = 3): IngredientMeta[] {
  return [...INGREDIENTS]
    .sort((a, b) => hslDistance(hexToHsl(a.color), target) - hslDistance(hexToHsl(b.color), target))
    .slice(0, n)
}

export function nearestProducts(target: Hsl, n = 3): Product[] {
  return [...PRODUCTS]
    .sort(
      (a, b) =>
        hslDistance(hexToHsl(a.dominantColor), target) - hslDistance(hexToHsl(b.dominantColor), target),
    )
    .slice(0, n)
}

/** Q. 시리즈 포맷의 한 줄. 색 톤에 따른 인사말이며 효능 표현이 아니다. */
export function moodLine(target: Hsl): string {
  if (target.l > 0.78) return '오늘은 가볍게, 밝은 쪽으로.'
  if (target.h < 0.06 || target.h > 0.92) return '오늘은 선명하게, 붉은 쪽으로.'
  if (target.h < 0.13) return '오늘은 따뜻하게, 볕이 드는 쪽으로.'
  if (target.h < 0.25) return '오늘은 느긋하게, 노란 쪽으로.'
  if (target.h < 0.45) return '오늘은 단정하게, 초록 쪽으로.'
  return '오늘은 조용하게, 깊은 쪽으로.'
}
