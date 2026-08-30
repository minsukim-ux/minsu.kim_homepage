import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S5 BOWL BUILDER (스켈레톤)
 *
 * Phase 4 에서 /components/modules/BowlBuilder 로 교체한다.
 * 실루엣 SVG path 모핑 + 3축 드래그 + Matter.js 낙하 + R3F 3D 볼.
 *
 * ⚠️ 결과 화면에 건강·다이어트 효과 표현을 넣지 않는다. 조합 제안까지만.
 */
export function S5BowlBuilder() {
  return (
    <SectionShell
      id="builder"
      index="S5"
      label="조합 만들기"
      surface="ink"
      /* Phase 3 컬러 스포트라이트 적용 구간 */
      className="sb-spotlight-zone"
      contentClassName="flex min-h-[100svh] flex-col justify-center gap-8 px-5 py-28 sm:px-8"
    >
      <SectionMarker index="S5" label="조합 만들기" labelEn="BOWL BUILDER" />
      <p className="sb-headline max-w-[20ch] font-kr text-page-fg">
        당신에게 맞는 한 그릇
      </p>
      <p className="sb-body max-w-[44ch] text-page-fg-sub">
        체형과 활동량, 목표를 드래그로 조절하면 재료 조합을 제안합니다.
        (Phase 4 구현)
      </p>
    </SectionShell>
  )
}
