import dynamic from 'next/dynamic'
import { Section } from './Section'

const BalanceGame = dynamic(() => import('@/components/modules/BalanceGame').then((m) => m.BalanceGame))

export function S6BalanceGame() {
  return (
    <Section id="game" label="Balance Game" title="균형을 무너뜨리지 않고 쌓기" bg="cream">
      <p className="mb-10 max-w-[46ch] text-fog">
        아보카도와 단호박은 무겁고 루꼴라와 허브는 가볍습니다. 어디에 둘지는 직접 찾습니다.
      </p>
      <BalanceGame />
    </Section>
  )
}
