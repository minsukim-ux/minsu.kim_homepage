export function prefersReduced(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** '#hex' 또는 토큰명('paper')을 실제 색으로 해석 */
export function resolveColor(token: string): string {
  if (!token) return ''
  if (token.startsWith('#') || token.startsWith('rgb')) return token
  const v = getComputedStyle(document.documentElement).getPropertyValue(`--sb-${token}`)
  return v.trim() || token
}

function hex(c: string): [number, number, number] {
  if (c.startsWith('#')) {
    const s = c.length === 4 ? c.replace(/#(.)(.)(.)/, '#$1$1$2$2$3$3') : c
    return [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16)) as [number, number, number]
  }
  const m = c.match(/\d+/g)
  return m ? ([+m[0], +m[1], +m[2]] as [number, number, number]) : [255, 255, 255]
}

export function mixColor(a: string, b: string, t: number): string {
  const [r1, g1, b1] = hex(a)
  const [r2, g2, b2] = hex(b)
  const k = Math.max(0, Math.min(1, t))
  const r = Math.round(r1 + (r2 - r1) * k)
  const g = Math.round(g1 + (g2 - g1) * k)
  const bl = Math.round(b1 + (b2 - b1) * k)
  return `rgb(${r}, ${g}, ${bl})`
}

/** 상대 휘도 (0~1) — 밝은 원물(무·페타·리코타)의 액자 바탕 결정에 사용 */
export function luminance(c: string): number {
  const [r, g, b] = c.startsWith('#')
    ? ([1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)) as number[])
    : [255, 255, 255]
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
}
