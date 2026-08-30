import { Section } from './Section'

/** Phase 4에서 Matter.js로 구현 */
export function S6BalanceGame() {
  return (
    <Section id="game" label="Balance Game" title="균형을 무너뜨리지 않고 쌓기" bg="cream">
      <p className="max-w-[46ch] text-fog">무거운 재료와 가벼운 재료가 있다. 어디에 둘지는 직접 찾는다.</p>
      <div data-module="balance-game" className="mt-10 h-[520px] border border-line" />
    </Section>
  )
}
