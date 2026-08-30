import { Section } from './Section'
import { Framed } from '@/components/media/Framed'
import { aboutPhoto } from '@/lib/assets'
import { INGREDIENTS, SEASON_LABEL, type Season } from '@/lib/ingredients'

const SEASONS: Season[] = ['spring', 'summer', 'autumn', 'winter']

/** ABOUT — 원물 아카이브. Phase 2에서 핀 + 가로 스크롤로 확장한다. */
export function S2About() {
  return (
    <Section id="about" label="About" bg="var(--sb-cream)">
      <div
        data-about-track
        className="flex snap-x snap-mandatory gap-10 overflow-x-auto pb-10 md:overflow-visible"
      >
        {INGREDIENTS.map((ing, i) => (
          <div
            key={ing.id}
            data-about-card={ing.id}
            data-color={ing.color}
            className="shrink-0 snap-center"
          >
            <Framed
              src={aboutPhoto(ing.id)}
              alt={`${ing.nameKo} 원물 컷`}
              fallbackIngredient={ing.id}
              label="About"
              caption={ing.nameKo}
              width={i === 0 ? 560 : 480}
              ratio={4 / 5}
            />
          </div>
        ))}
      </div>

      <ul className="mt-10 flex gap-8" aria-label="계절 진행">
        {SEASONS.map((s) => (
          <li key={s} className="sb-label" data-season={s}>
            {SEASON_LABEL[s]}
          </li>
        ))}
      </ul>
    </Section>
  )
}
