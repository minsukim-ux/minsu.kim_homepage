import type { Metadata, Viewport } from 'next'
import './globals.css'
import { buildAssetAvailability } from '@/lib/assets.server'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  buildOrganizationJsonLd,
} from '@/lib/siteMeta'
import { AssetProvider } from '@/components/core/AssetProvider'
import { SmoothScrollProvider } from '@/components/core/SmoothScrollProvider'
import { ScrollProgress } from '@/components/core/ScrollProgress'
import { SiteHeader } from '@/components/core/SiteHeader'

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: {
    default: `${SITE_NAME} — 신선을 설계한다`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — 신선을 설계한다`,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#060b09',
  colorScheme: 'dark light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 서버에서 /public 을 훑어 "실물 에셋 vs 플레이스홀더"를 확정한다.
  const availability = buildAssetAvailability()

  return (
    <html lang="ko">
      <body>
        <a href="#main" className="sb-skip-link">
          본문으로 건너뛰기
        </a>

        <AssetProvider availability={availability}>
          <SmoothScrollProvider>
            <ScrollProgress />
            <SiteHeader />
            <main id="main">{children}</main>
          </SmoothScrollProvider>
        </AssetProvider>

        <script
          type="application/ld+json"
          // 확인된 값만 담긴 정적 객체. 사용자 입력이 섞이지 않는다.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationJsonLd()),
          }}
        />
      </body>
    </html>
  )
}
