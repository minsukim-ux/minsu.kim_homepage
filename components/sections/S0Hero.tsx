import { ASSETS } from '@/lib/assets'
import { VideoAsset } from '@/components/ui/VideoAsset'
import { HeroMarquee } from './HeroMarquee'
import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S0 HERO
 *
 * Phase 1: 풀블리드 영상 슬롯 + 카피 + 마퀴 배치.
 * Phase 2: 글자 단위 조립 애니메이션, 원형 마스킹 축소 전환.
 */
export function S0Hero() {
  return (
    <SectionShell
      id="hero"
      index="S0"
      label="히어로"
      surface="void"
      contentClassName="relative h-[100svh] w-full"
    >
      {/* 데스크톱: 가로 영상 / 모바일: 세로 영상. 크롭이 아니라 별도 소스. */}
      <div className="absolute inset-0 hidden md:block">
        <VideoAsset
          src={ASSETS.video.hero16x9}
          poster={ASSETS.video.heroPoster}
          priority
          placeholderAlign="top-right"
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 md:hidden">
        <VideoAsset
          src={ASSETS.video.hero9x16}
          poster={ASSETS.video.heroPoster}
          priority
          placeholderAlign="top-right"
          className="h-full w-full"
        />
      </div>

      {/* 카피 가독성 확보용 그라디언트. 영상 위 텍스트 대비 유지. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-sb-void/70 via-sb-void/25 to-sb-void/85"
      />

      <div className="relative flex h-full flex-col justify-between px-5 pb-6 pt-24 sm:px-8 md:pt-28">
        <SectionMarker index="S0" label="히어로" labelEn="HERO" />

        {/*
          디스플레이 타이포에 ch 기반 max-width 를 걸면 안 된다.
          ch 가 부모(16px)를 기준으로 계산돼 글자마다 줄바꿈된다.
        */}
        <div>
          <p
            data-hero-copy
            className="sb-display font-kr text-sb-bg"
          >
            <span className="block">신선을</span>
            <span className="block text-sb-accent-light">설계한다</span>
          </p>
          <p className="sb-body mt-6 max-w-[38ch] text-sb-fog">
            ㈜스윗밸런스는 샐러드와 즉석섭취식품을 만듭니다. 이 페이지는 그
            과정을 그대로 보여주기 위해 만들었습니다.
          </p>
        </div>

        <div className="space-y-4">
          <HeroMarquee />
          <p className="sb-eyebrow text-sb-fog/70">SCROLL TO ENTER</p>
        </div>
      </div>
    </SectionShell>
  )
}
