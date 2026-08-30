/**
 * 배경색 위에서 "읽히는" 글자색을 보장하는 유틸.
 *
 * BackgroundFlow 는 스크롤에 따라 배경을 어두움 ↔ 밝음으로 연속 보간한다.
 * 이때 글자색도 같이 보간하면 전환 한가운데서 배경과 글자가 같은 중간 회색이
 * 되어 명도 대비가 1:1 까지 무너진다(실측 1.04:1). 커브를 아무리 급하게
 * 잡아도 "밝은 글자 → 어두운 글자" 경로는 반드시 배경 밝기를 가로지르므로
 * 보간만으로는 해결되지 않는다.
 *
 * 그래서 여기서는 색을 섞지 않고 **읽히는 쪽을 고르고, 모자라면 밀어준다**.
 *  1. 후보 글자색의 대비가 기준 이상이면 그대로 쓴다.
 *  2. 모자라면 검정/흰색 중 그 배경에서 대비가 더 나오는 쪽으로 밀어
 *     기준을 만족하는 최소 지점에서 멈춘다. (브랜드 색조를 최대한 남긴다)
 */

export type Rgb = [number, number, number]

const BLACK: Rgb = [0, 0, 0]
const WHITE: Rgb = [255, 255, 255]

/** WCAG 2.x 상대 휘도. */
export function relativeLuminance([r, g, b]: Rgb): number {
  const ch = (v: number) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b)
}

/** WCAG 명도 대비. 1 ~ 21. */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const hi = Math.max(la, lb)
  const lo = Math.min(la, lb)
  return (hi + 0.05) / (lo + 0.05)
}

export function lerpRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ]
}

export function toCss([r, g, b]: Rgb): string {
  return `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)})`
}

/**
 * fg 를 배경 위에서 최소 대비까지 끌어올린다.
 * 이미 만족하면 원본 그대로 돌려준다(브랜드 색 유지).
 */
export function ensureContrast(fg: Rgb, bg: Rgb, min: number): Rgb {
  if (contrastRatio(fg, bg) >= min) return fg

  const target =
    contrastRatio(BLACK, bg) >= contrastRatio(WHITE, bg) ? BLACK : WHITE
  if (contrastRatio(target, bg) < min) return target // 이 배경에선 불가능

  // 기준을 만족하는 최소 이동량. 12회면 1/4096 해상도로 충분하다.
  let lo = 0
  let hi = 1
  for (let i = 0; i < 12; i += 1) {
    const mid = (lo + hi) / 2
    if (contrastRatio(lerpRgb(fg, target, mid), bg) >= min) hi = mid
    else lo = mid
  }
  return lerpRgb(fg, target, hi)
}

/**
 * 두 팔레트 사이를 넘어가는 중에 쓸 글자색.
 *
 * preferred 가 그 배경에서 읽히면 그대로 유지한다(=색이 함부로 안 바뀐다).
 * 안 읽히면 alternate 를 쓰고, 그래도 모자라면 ensureContrast 로 밀어준다.
 * 배경이 중간 밝기인 짧은 구간에서는 두 후보 모두 같은 방향으로 밀려
 * 거의 같은 색으로 수렴하므로 전환이 튀지 않는다.
 */
export function readableOn(
  bg: Rgb,
  preferred: Rgb,
  alternate: Rgb,
  min: number,
): Rgb {
  if (contrastRatio(preferred, bg) >= min) return preferred
  if (contrastRatio(alternate, bg) >= min) return alternate

  const a = ensureContrast(preferred, bg, min)
  const b = ensureContrast(alternate, bg, min)
  return contrastRatio(a, bg) >= contrastRatio(b, bg) ? a : b
}
