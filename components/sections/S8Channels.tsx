import { Section } from './Section'
import { ChannelMarquee } from '@/components/modules/ChannelMarquee'

export function S8Channels() {
  return (
    <Section id="channels" label="Channels" title="어디서 살 수 있나" bg="cream">
      <ChannelMarquee />
      <p className="mt-10 text-[13px] text-fog">
        {/* TODO: 실제 입점 채널·링크를 확인해 lib/channels.ts 갱신 */}
        입점 채널과 링크는 확인 후 반영됩니다.
      </p>
    </Section>
  )
}
