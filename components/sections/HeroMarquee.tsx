import { Marquee } from '@/components/ui/Marquee'
import { MARQUEE_CLAIMS, verifiedText } from '@/lib/trustData'

/**
 * S0 하단 2줄 마퀴. 위/아래가 서로 반대 방향으로 흐른다.
 *
 * ⚠️ 문구는 /lib/trustData.ts 에서만 온다.
 * 인증명·연혁·생산 주기 같은 사실 주장은 담당자가 확인(verified: true)하기
 * 전까지 렌더링되지 않는다. 여기서 문구를 지어내면 안 된다.
 */
export function HeroMarquee() {
  const claims = verifiedText(MARQUEE_CLAIMS)
  if (claims.length === 0) return null

  // 아래 줄은 순서를 뒤집어 두 줄이 같은 단어로 겹쳐 보이지 않게 한다.
  const reversed = [...claims].reverse()

  return (
    <div className="space-y-1.5 border-y border-sb-fog/15 py-3">
      <Marquee
        items={claims}
        baseDuration={38}
        className="text-sb-bg"
        itemClassName="sb-eyebrow text-xs sm:text-sm"
      />
      <Marquee
        items={reversed}
        reverse
        baseDuration={52}
        className="text-sb-fog"
        itemClassName="sb-eyebrow text-[10px] sm:text-xs"
        separator="·"
      />
    </div>
  )
}
