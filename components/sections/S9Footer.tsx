import Link from 'next/link'
import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S9 FOOTER
 *
 * Phase 1: 워드마크 + 서브페이지 링크 배치.
 * Phase 5: 스크롤에 따라 워드마크가 아래에서 솟아오르고, 계속 스크롤하면
 *          흩어지며 무한 채소밭 이스터에그로 진입.
 */
const SUB_PAGES = [
  { href: '/brand', label: '브랜드 스토리', labelEn: 'BRAND' },
  { href: '/process', label: '제조 공정', labelEn: 'PROCESS' },
  { href: '/products', label: '제품 아카이브', labelEn: 'PRODUCTS' },
] as const

export function S9Footer() {
  return (
    <SectionShell
      id="footer"
      index="S9"
      label="푸터"
      surface="void"
      contentClassName="flex min-h-[100svh] flex-col justify-between gap-16 px-5 py-24 sm:px-8"
    >
      <div className="flex flex-col gap-10">
        <SectionMarker index="S9" label="푸터" labelEn="FOOTER" />

        <nav aria-label="하위 페이지">
          <ul className="flex flex-col gap-2">
            {SUB_PAGES.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  data-magnetic
                  className="group flex items-baseline gap-4 py-1"
                >
                  {/* 고정 폭으로 한글 라벨의 좌측 정렬을 맞춘다. */}
                  <span className="sb-eyebrow w-24 shrink-0 text-page-fg-sub">
                    {page.labelEn}
                  </span>
                  <span className="font-kr text-3xl font-bold tracking-tight text-page-fg sm:text-4xl">
                    {page.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-6">
        {/* Phase 5: 이 워드마크가 스크롤에 따라 솟아오르고 흩어진다. */}
        <p
          data-footer-wordmark
          className="sb-display font-en leading-none text-page-fg/90"
        >
          SWEET BALANCE
        </p>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-sb-fog/15 pt-6">
          <p className="sb-body text-sm text-page-fg-sub">
            ㈜스윗밸런스 · 샐러드 및 즉석섭취식품 제조
          </p>
          {/* TODO(담당자 확인): 사업자등록번호·주소·대표자·연락처는 확인 후 표기. */}
          <p className="sb-eyebrow text-page-fg-sub/70">
            사업자 정보 확인 후 표기
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
