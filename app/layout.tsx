import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'
import { SmoothScroll } from '@/components/providers/SmoothScroll'
import { BRAND } from '@/lib/brand'
import { Loader } from '@/components/experience/Loader'
import { CursorLayer } from '@/components/experience/CursorLayer'
import { SoundToggle } from '@/components/experience/SoundToggle'
import { PageVeil } from '@/components/experience/PageVeil'
import { Header } from '@/components/ui/Header'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${BRAND.nameKo} — ${BRAND.message}`,
  description: `${BRAND.nameKo}는 샐러드부터 랩·피자랩·브리또볼·면·사이드까지 아우르는 ${BRAND.category} 브랜드입니다.`,
  openGraph: {
    title: `${BRAND.nameKo} — ${BRAND.message}`,
    description: `${BRAND.category} 브랜드 ${BRAND.nameEn}`,
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.legalKo,
    alternateName: BRAND.nameEn,
    slogan: BRAND.message,
  }

  return (
    <html lang="ko" className={`${inter.variable} ${serif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-4 focus:py-2"
        >
          본문으로 건너뛰기
        </a>
        <Loader />
        <PageVeil />
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
        <CursorLayer />
        <SoundToggle />
      </body>
    </html>
  )
}
