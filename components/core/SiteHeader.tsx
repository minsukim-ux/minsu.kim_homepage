import Link from 'next/link'

/**
 * 고정 헤더.
 * Phase 3 에서 로더의 로고가 FLIP 으로 이 위치(data-logo-target)로 축소 이동한다.
 */
const NAV = [
  { href: '/brand', label: '브랜드' },
  { href: '/process', label: '공정' },
  { href: '/products', label: '제품' },
] as const

export function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[90] px-5 py-5 sm:px-8">
      <div className="pointer-events-auto flex items-center justify-between gap-6">
        <Link
          href="/"
          data-logo-target
          aria-label="㈜스윗밸런스 홈"
          className="font-en text-sm font-bold tracking-[-0.02em] text-page-fg"
        >
          SWEET BALANCE
        </Link>

        <nav aria-label="주요 메뉴">
          <ul className="flex items-center gap-5">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  data-magnetic
                  className="font-kr text-sm text-page-fg-sub transition-colors hover:text-page-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
