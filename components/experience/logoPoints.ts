import { LOGO_SVG, withBase } from '@/lib/assets'

export type Pt = { x: number; y: number }

/**
 * 로고 형태를 파티클 좌표로 샘플링한다.
 * public/assets/logo/logo.svg 가 있으면 그 벡터를, 없으면 워드마크 텍스트를 쓴다.
 * 로고 파일을 넣으면 코드 수정 없이 자동으로 진짜 로고 형태로 바뀐다.
 */
export async function sampleLogoPoints(w: number, h: number): Promise<Pt[]> {
  const cv = document.createElement('canvas')
  cv.width = w
  cv.height = h
  const ctx = cv.getContext('2d', { willReadFrequently: true })
  if (!ctx) return []

  const drawn = await drawLogo(ctx, w, h).catch(() => false)
  if (!drawn) drawWordmark(ctx, w, h)

  const { data } = ctx.getImageData(0, 0, w, h)
  const pts: Pt[] = []
  const stride = Math.max(3, Math.round(w / 220))
  for (let y = 0; y < h; y += stride) {
    for (let x = 0; x < w; x += stride) {
      if (data[(y * w + x) * 4 + 3] > 128) pts.push({ x, y })
    }
  }
  return pts
}

function drawLogo(ctx: CanvasRenderingContext2D, w: number, h: number): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const r = Math.min(w / img.width, h / img.height)
      const dw = img.width * r
      const dh = img.height * r
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh)
      resolve(true)
    }
    img.onerror = () => resolve(false)
    img.src = withBase(LOGO_SVG)
  })
}

function drawWordmark(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = '#000'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  // canvas 는 CSS 변수를 해석하지 못하므로 실제 폰트명을 지정한다
  const size = Math.floor(w * 0.135)
  ctx.font = `${size}px "Instrument Serif", Georgia, serif`
  ctx.fillText('Sweet Balance', w / 2, h / 2)
}
