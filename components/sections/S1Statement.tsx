import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S1 STATEMENT
 *
 * Phase 1: 3개 문장을 SSR 텍스트로 배치.
 * Phase 2: 단어들이 화면 밖 사방에서 날아와 안착 → 다음 문장에서 산산이 흩어짐.
 *          마지막 문장은 흩어지지 않고 축소되어 S2 의 라벨이 된다.
 */

/** data-statement 인덱스로 Phase 2 타임라인이 문장을 집는다. */
export const STATEMENTS = [
  '샐러드는 조리하지 않는 음식이다.',
  '그래서 공정이 곧 맛이고, 공정이 곧 안전이다.',
  '이 샐러드가 거쳐온 12단계.',
] as const

export function S1Statement() {
  return (
    <SectionShell
      id="statement"
      index="S1"
      label="선언"
      surface="void"
      contentClassName="flex min-h-[100svh] flex-col justify-center gap-16 px-5 py-32 sm:px-8"
    >
      <SectionMarker index="S1" label="선언" labelEn="STATEMENT" />

      <div className="space-y-10 md:space-y-14">
        {STATEMENTS.map((sentence, index) => (
          <p
            key={sentence}
            data-statement={index}
            className="sb-headline max-w-[24ch] font-kr text-page-fg"
          >
            {sentence}
          </p>
        ))}
      </div>
    </SectionShell>
  )
}
