import type { BowlState } from '@/lib/bowlLogic'
import { bowlCaption, GOAL_LABEL } from '@/lib/bowlLogic'
import type { IngredientMeta } from '@/lib/ingredients'

/**
 * 공유 카드 생성 — Recipe 시리즈의 세리프 타원 프레임을 차용한다.
 * 외부 이미지 없이 캔버스로만 그린다.
 */
export function drawShareCard(
  cv: HTMLCanvasElement,
  state: BowlState,
  items: IngredientMeta[],
): void {
  const W = 1200
  const H = 630
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = '#FBF8F2'
  ctx.fillRect(0, 0, W, H)

  // 재료 색 점을 흩뿌려 톤을 만든다
  items.forEach((m, i) => {
    const a = (i / items.length) * Math.PI * 2
    ctx.globalAlpha = 0.5
    ctx.fillStyle = m.color
    ctx.beginPath()
    ctx.arc(W / 2 + Math.cos(a) * 380, H / 2 + Math.sin(a) * 230, 46, 0, Math.PI * 2)
    ctx.fill()
  })
  ctx.globalAlpha = 1

  // 세리프 타원 프레임
  ctx.strokeStyle = '#C2472F'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.ellipse(W / 2, H / 2, 400, 232, 0, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = 'rgba(251,248,242,0.92)'
  ctx.beginPath()
  ctx.ellipse(W / 2, H / 2, 396, 228, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.textAlign = 'center'
  ctx.fillStyle = '#8A8175'
  ctx.font = '22px Georgia, serif'
  ctx.fillText('S W E E T   B A L A N C E', W / 2, H / 2 - 116)

  ctx.fillStyle = '#2A241E'
  ctx.font = 'bold 58px system-ui, sans-serif'
  ctx.fillText(bowlCaption(state), W / 2, H / 2 - 20)

  ctx.fillStyle = '#8A8175'
  ctx.font = '26px system-ui, sans-serif'
  ctx.fillText(items.slice(0, 6).map((i) => i.nameKo).join(' · '), W / 2, H / 2 + 40)

  ctx.font = '22px Georgia, serif'
  ctx.fillStyle = '#00614E'
  ctx.fillText(`${GOAL_LABEL[state.goal]} · 취향 조합 제안`, W / 2, H / 2 + 118)
}

export async function shareCard(cv: HTMLCanvasElement, caption: string): Promise<'shared' | 'downloaded'> {
  const blob = await new Promise<Blob | null>((r) => cv.toBlob(r, 'image/png'))
  if (!blob) return 'downloaded'
  const file = new File([blob], 'sweet-balance-bowl.png', { type: 'image/png' })
  const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean }
  if (nav.canShare?.({ files: [file] })) {
    await navigator.share({ files: [file], title: caption })
    return 'shared'
  }
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'sweet-balance-bowl.png'
  a.click()
  URL.revokeObjectURL(url)
  return 'downloaded'
}
