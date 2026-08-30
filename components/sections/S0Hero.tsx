import { BackdropVideo } from '@/components/media/BackdropVideo'
import { VIDEO } from '@/lib/assets'
import { BRAND } from '@/lib/brand'
import { Marquee } from '@/components/ui/Marquee'
import { INGREDIENTS } from '@/lib/ingredients'
import { HeroMotion } from '@/components/anim/HeroMotion'

export function S0Hero() {
  const names = INGREDIENTS.map((i) => i.nameKo)
  return (
    <HeroMotion>
      <section
        id="hero"
        data-bg="paper"
        className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
      >
        <div data-hero-stage data-cursor="watch" className="absolute inset-0">
          <BackdropVideo
            landscape={VIDEO.hero16x9}
            portrait={VIDEO.hero9x16}
            className="h-full w-full object-cover"
          />
          {/* 크림 종이 마스크 — 가장자리를 종이로 죽인다 (비네팅 아님) */}
          <div className="sb-hero-paper pointer-events-none absolute inset-0" aria-hidden />
        </div>

        <div className="relative z-10 flex flex-1 items-center px-6 md:px-12">
          <div>
            {/* 세리프는 영문·숫자에만 쓴다 */}
            <p className="sb-serif mb-6 text-[13px] uppercase tracking-[0.3em] text-fog">
              {BRAND.nameEn} — Since 2014
            </p>
            <h1 className="sb-hero-type max-w-[16ch]" data-split="hero">
              채소로 차린
              <br />
              한 끼의 균형
            </h1>
          </div>
        </div>

        <div className="relative z-10 pb-8">
          <Marquee
            items={[
              BRAND.category,
              BRAND.message,
              '샐러드',
              '랩',
              '피자랩',
              '브리또볼',
              '타코랩',
              '메밀면',
              '당근라페',
            ]}
          />
          <Marquee items={names} reverse className="mt-2 opacity-70" />
        </div>
      </section>
    </HeroMotion>
  )
}
