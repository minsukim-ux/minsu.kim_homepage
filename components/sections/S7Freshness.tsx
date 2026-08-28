import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S7 FRESHNESS (스켈레톤)
 *
 * Phase 4 에서 /components/modules/FreshnessCounter 로 교체한다.
 *
 * ⚠️ 기준 시각은 /lib/freshness.ts 설정값에서만 온다.
 *    임의의 생산 시각을 사실처럼 박아넣지 않는다. 확정 전까지는 카운터 대신
 *    "기준 시각 확정 전" 상태를 표시한다.
 */
export function S7Freshness() {
  return (
    <SectionShell
      id="freshness"
      index="S7"
      label="신선도"
      surface="light"
      contentClassName="flex min-h-[80svh] flex-col justify-center gap-8 px-5 py-28 sm:px-8"
    >
      <SectionMarker index="S7" label="신선도" labelEn="FRESHNESS" />
      <p className="sb-headline max-w-[20ch] font-kr text-page-fg">
        지금 이 순간의 신선도
      </p>
      <p className="sb-body max-w-[44ch] text-page-fg-sub">
        세척 시각부터 소비기한까지를 초 단위로 셉니다. 기준 시각은 실제 생산
        스케줄이 확정된 뒤 연결됩니다. (Phase 4 구현)
      </p>
    </SectionShell>
  )
}
