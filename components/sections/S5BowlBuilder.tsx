import { Section } from './Section'

/** Phase 4에서 구현. 효능·기능성 표현 금지 — 취향 조합 제안까지만. */
export function S5BowlBuilder() {
  return (
    <Section id="bowl" label="Bowl Builder" title="오늘의 볼을 직접 짜본다" bg="paper">
      <p className="max-w-[46ch] text-fog">
        체형·활동량·목표를 움직이면 볼에 재료가 쌓인다. 조합 제안이며, 건강 효과를 약속하지 않는다.
      </p>
      <div data-module="bowl-builder" className="mt-10 h-[420px] border border-line" />
    </Section>
  )
}
