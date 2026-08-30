import { Framed } from '@/components/media/Framed'
import { aboutPhoto } from '@/lib/assets'
import { INGREDIENTS, SEASON_LABEL, type Season } from '@/lib/ingredients'
import { AboutScroller } from '@/components/anim/AboutScroller'
import { PaperTexture } from '@/components/graphics/textures'

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter']

/** 계절 순으로 정렬해 아카이브가 한 해를 통과하게 만든다 */
const ORDERED = [...INGREDIENTS].sort(
  (a, b) => SEASONS.indexOf(a.season) - SEASONS.indexOf(b.season),
)

export function S2About() {
  return (
    <section id="about" data-bg="cream" className="relative overflow-hidden">
      <PaperTexture opacity={0.3} />
      <AboutScroller>
        <div className="relative flex min-h-[100svh] flex-col justify-center py-24">
          <p className="sb-label mb-10 px-6 md:px-12">About — 원물 아카이브</p>

          <div
            data-about-track
            className="flex snap-y snap-mandatory flex-col items-center gap-16 px-6 md:snap-none md:flex-row md:items-end md:gap-16 md:px-12"
          >
            {ORDERED.map((ing, i) => (
              <div
                key={ing.id}
                data-about-card={ing.id}
                data-color={ing.color}
                data-season={ing.season}
                className="shrink-0 snap-center"
                style={{ marginBottom: i % 3 === 1 ? 64 : 0 }}
              >
                <Framed
                  src={aboutPhoto(ing.id)}
                  alt={`${ing.nameKo} 원물 컷`}
                  fallbackIngredient={ing.id}
                  label="About"
                  caption={ing.nameKo}
                  width={i % 3 === 0 ? 520 : 420}
                  ratio={4 / 5}
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          <ul className="mt-14 flex gap-8 px-6 md:px-12" aria-label="계절 진행">
            {SEASONS.map((s) => (
              <li key={s} data-season={s} className="sb-label sb-season">
                {SEASON_LABEL[s]}
              </li>
            ))}
          </ul>
        </div>
      </AboutScroller>
    </section>
  )
}
