import { BRAND } from '@/lib/brand'
import { FooterMark, VegetablePatch } from '@/components/modules/FooterMark'
import { Marquee } from '@/components/ui/Marquee'

export function S9Footer() {
  return (
    <FooterMark>
      <footer id="footer" data-bg="paper" className="relative overflow-hidden px-6 pb-10 pt-40 md:px-12">
        <div className="mx-auto max-w-[1440px]">
          <p className="sb-label mb-10">{BRAND.message}</p>

          <p
            data-footer-mark
            className="sb-serif text-[clamp(3rem,15vw,13rem)] leading-[0.9] tracking-[-0.04em] text-primary"
          >
            Sweet Balance
          </p>

          {/* 인증·수상 마크 자리 — 확인된 항목만 넣는다 */}
          <Marquee
            items={['㈜스윗밸런스', BRAND.category, '2014 — ']}
            className="mt-14 border-y border-line py-3"
          />

          <p className="mt-8 text-[13px] text-fog">
            {BRAND.legalKo} · 표기된 제품 정보와 판매 채널은 확인 후 갱신됩니다.
          </p>
        </div>

        <VegetablePatch />
      </footer>
    </FooterMark>
  )
}
