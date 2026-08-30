import { ImageResponse } from 'next/og'
import { BRAND } from '@/lib/brand'

export const runtime = 'edge'

/** 공유 카드용 동적 OG. 외부 이미지 없이 텍스트와 색으로만 구성한다. */
export function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const title = (searchParams.get('title') ?? BRAND.message).slice(0, 40)
  const items = (searchParams.get('items') ?? '').slice(0, 80)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FBF8F2',
          color: '#2A241E',
          fontSize: 56,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, color: '#8A8175', marginBottom: 28 }}>
          SWEET BALANCE
        </div>
        <div style={{ fontWeight: 700 }}>{title}</div>
        {items ? (
          <div style={{ fontSize: 26, color: '#8A8175', marginTop: 24 }}>{items}</div>
        ) : null}
        <div style={{ fontSize: 22, color: '#00614E', marginTop: 40 }}>{BRAND.category}</div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
