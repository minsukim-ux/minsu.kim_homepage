import Link from 'next/link'
import { SectionMarker } from '@/components/sections/SectionShell'

/**
 * 서브 페이지 공통 껍데기.
 * Phase 3 에서 PageTransition(그린 커튼)이 이 트리 위에 올라간다.
 */
export function SubPageShell({
  index,
  label,
  labelEn,
  heading,
  lead,
  children,
}: {
  index: string
  label: string
  labelEn: string
  heading: string
  lead: string
  children?: React.ReactNode
}) {
  return (
    <div
      data-surface="light"
      className="flex min-h-[100svh] flex-col justify-between gap-16 px-5 pb-16 pt-32 sm:px-8"
    >
      <div className="flex flex-col gap-6">
        <SectionMarker index={index} label={label} labelEn={labelEn} />
        <h1 className="sb-headline max-w-[20ch] font-kr text-page-fg">
          {heading}
        </h1>
        <p className="sb-body max-w-[46ch] text-page-fg-sub">{lead}</p>
      </div>

      {children}

      <Link
        href="/"
        data-magnetic
        className="sb-eyebrow w-fit text-page-fg-sub transition-colors hover:text-page-fg"
      >
        ← 메인으로
      </Link>
    </div>
  )
}
