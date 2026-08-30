import { Section } from './Section'
import { INGREDIENTS } from '@/lib/ingredients'
import { IngredientIcon } from '@/components/graphics/ingredients'
import { InkSpotlight } from '@/components/experience/InkSpotlight'

/** INGREDIENT FIELD — Phase 5에서 Three.js 필드로 교체. 지금은 SSR 정적 그리드. */
export function S3Field() {
  return (
    <Section
      id="field"
      label="Ingredient Field"
      title="재료 하나하나가 이 브랜드의 언어다"
      bg="paper"
    >
      <InkSpotlight targetId="field" />
      <ul className="flex flex-wrap gap-6">
        {INGREDIENTS.map((i, idx) => (
          <li key={i.id} className="flex w-24 flex-col items-center gap-2">
            <IngredientIcon id={i.id} size={72} seed={idx * 7} />
            <span className="text-[13px] text-fog">{i.nameKo}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
