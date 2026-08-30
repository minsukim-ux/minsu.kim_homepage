'use client'

import dynamic from 'next/dynamic'
import { useLiteMode } from '@/lib/useLiteMode'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { INGREDIENTS } from '@/lib/ingredients'
import { IngredientIcon } from '@/components/graphics/ingredients'

const IngredientField = dynamic(
  () => import('@/components/modules/IngredientField').then((m) => m.IngredientField),
  { ssr: false },
)

/** WebGL 필드. reduced-motion이면 정적 재료 그리드로 대체한다. */
export function FieldCanvas() {
  const lite = useLiteMode()
  const still = useReducedMotion()

  if (still) {
    return (
      <ul className="flex flex-wrap gap-6">
        {INGREDIENTS.map((i, idx) => (
          <li key={i.id}>
            <IngredientIcon id={i.id} size={72} seed={idx * 7} />
          </li>
        ))}
      </ul>
    )
  }
  return <IngredientField lite={lite} />
}
