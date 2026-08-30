import { Section } from './Section'

/** Q. 시리즈의 웹 버전. Phase 4에서 WebGL 유체 색 필드로 구현 */
export function S7MonthlyMood() {
  return (
    <Section id="mood" label="Q." title="오늘의 색을 고른다" bg="var(--sb-paper)">
      <p className="max-w-[46ch] text-fog">고른 색과 가까운 재료가 떠오르고, 그 톤의 제품을 제안한다.</p>
      <div data-module="monthly-mood" className="mt-10 h-[520px] border border-line" />
    </Section>
  )
}
