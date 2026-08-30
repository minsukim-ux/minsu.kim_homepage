import dynamic from 'next/dynamic'
import { Section } from './Section'

const MonthlyMood = dynamic(() => import('@/components/modules/MonthlyMood').then((m) => m.MonthlyMood))

export function S7MonthlyMood() {
  return (
    <Section id="mood" label="Q." title="오늘의 색을 고른다" bg="paper">
      <p className="mb-10 max-w-[46ch] text-fog">
        고른 색과 가까운 재료가 떠오르고, 그 톤의 제품을 제안합니다.
      </p>
      <MonthlyMood />
    </Section>
  )
}
