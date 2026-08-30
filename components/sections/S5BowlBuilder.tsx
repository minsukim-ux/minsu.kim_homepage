import dynamic from 'next/dynamic'
import { Section } from './Section'

const BowlBuilder = dynamic(() => import('@/components/modules/BowlBuilder').then((m) => m.BowlBuilder))

export function S5BowlBuilder() {
  return (
    <Section id="bowl" label="Bowl Builder" title="오늘의 볼을 직접 짜본다" bg="paper">
      <p className="mb-10 max-w-[46ch] text-fog">
        체형·활동량·목표를 움직이면 볼에 재료가 쌓입니다. 취향 조합 제안이며 건강 효과를 약속하지 않습니다.
      </p>
      <BowlBuilder />
    </Section>
  )
}
