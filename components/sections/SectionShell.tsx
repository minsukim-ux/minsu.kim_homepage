import type { ReactNode } from 'react'

/**
 * 섹션 공통 껍데기.
 *
 * data-surface 는 스크롤 배경 연속 보간(Phase 2)이 읽는다.
 * 섹션 리듬: void → light → ink → light … 다크/라이트 교차.
 *
 * 모든 섹션의 텍스트는 여기서 실제 HTML 로 렌더된다(SSR).
 * WebGL/Canvas 안에만 정보가 존재하는 구조는 만들지 않는다.
 */
export type Surface = 'void' | 'ink' | 'light'

export function SectionShell({
  id,
  index,
  label,
  surface,
  className = '',
  contentClassName = '',
  children,
}: {
  /** URL 앵커 및 data-section 값 */
  id: string
  /** S0 ~ S9 */
  index: string
  label: string
  surface: Surface
  className?: string
  contentClassName?: string
  children?: ReactNode
}) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      data-section={id}
      data-surface={surface}
      aria-labelledby={headingId}
      className={`relative w-full ${className}`}
    >
      <h2 id={headingId} className="sr-only">
        {`${index} ${label}`}
      </h2>
      <div className={`relative ${contentClassName}`}>{children}</div>
    </section>
  )
}

/** 섹션 좌상단 인덱스 라벨. 스크롤 위치 감각을 주는 고정 요소. */
export function SectionMarker({
  index,
  label,
  labelEn,
  className = '',
}: {
  index: string
  label: string
  labelEn: string
  className?: string
}) {
  return (
    <p
      className={`sb-eyebrow flex items-center gap-3 text-page-fg-sub ${className}`}
    >
      <span className="sb-num opacity-60">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-30" />
      <span>{labelEn}</span>
      <span className="font-kr tracking-normal opacity-70">{label}</span>
    </p>
  )
}
