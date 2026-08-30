import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S6 QC GAME (스켈레톤)
 *
 * Phase 4 에서 /components/modules/QCGame 으로 교체한다.
 * 컨베이어 Canvas + 이물 클릭 제거 + 과검출 페널티 + 30초 제한.
 */
export function S6QCGame() {
  return (
    <SectionShell
      id="qc-game"
      index="S6"
      label="이물 선별"
      surface="void"
      contentClassName="flex min-h-[100svh] flex-col justify-center gap-8 px-5 py-28 sm:px-8"
    >
      <SectionMarker index="S6" label="이물 선별" labelEn="QC GAME" />
      <p className="sb-headline max-w-[20ch] font-kr text-page-fg">
        이물을 골라낼 수 있습니까
      </p>
      <p className="sb-body max-w-[44ch] text-page-fg-sub">
        컨베이어를 지나가는 채소 사이에서 이물만 골라내세요. 채소를 잘못
        집으면 감점입니다. (Phase 4 구현)
      </p>
      <p className="sb-body max-w-[52ch] text-page-fg-sub">
        실제 공정에서는 금속검출기와 육안 선별로 이 과정을 매일 수행합니다.
      </p>
    </SectionShell>
  )
}
