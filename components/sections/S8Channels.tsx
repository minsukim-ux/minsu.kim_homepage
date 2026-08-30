import { Section } from './Section'
import { CHANNELS } from '@/lib/channels'
import { Marquee } from '@/components/ui/Marquee'

export function S8Channels() {
  return (
    <Section id="channels" label="Channels" title="어디서 살 수 있나" bg="var(--sb-cream)">
      <Marquee items={CHANNELS.map((c) => c.nameKo)} />
      <Marquee items={CHANNELS.map((c) => c.nameKo)} reverse className="mt-4" />
      <p className="mt-8 text-[13px] text-fog">
        {/* TODO: 실제 입점 채널·링크 확인 후 lib/channels.ts 갱신 */}
        입점 채널 정보는 확인 후 반영 예정입니다.
      </p>
    </Section>
  )
}
