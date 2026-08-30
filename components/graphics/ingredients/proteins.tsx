import { Ing, shadeOpacity, type IngredientProps } from './base'
import { INGREDIENT_BY_ID as M } from '@/lib/ingredients'

export function Feta(p: IngredientProps) {
  const c = M['feta']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M20 38 50 22l30 16v28L50 82 20 66z" fill={c.color} />
      <path d="M50 46 80 38v28L50 82z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M20 38 50 46l30-8" fill="none" stroke={c.shade} strokeWidth="2" />
    </Ing>
  )
}

export function Ricotta(p: IngredientProps) {
  const c = M['ricotta']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M22 74c0-18 10-28 16-38 4-8 8-14 12-14s8 6 12 14c6 10 16 20 16 38 0 8-24 12-28 12s-28-4-28-12z" fill={c.color} />
      <path d="M50 22c4 0 8 6 12 14 6 10 16 20 16 38 0 8-24 12-28 12z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
    </Ing>
  )
}

export function ChickenBreast(p: IngredientProps) {
  const c = M['chicken-breast']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M18 56c0-20 18-34 38-34 18 0 26 12 26 26 0 20-16 32-34 32C26 80 18 70 18 56z" fill={c.color} />
      <path d="M56 22c18 0 26 12 26 26 0 20-16 32-34 32z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M32 46c10-6 22-8 32-4M30 60c10-4 22-6 32-2" stroke="#C9A98C" strokeWidth="3" fill="none" strokeLinecap="round" />
    </Ing>
  )
}

export function Shrimp(p: IngredientProps) {
  const c = M['shrimp']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M70 24c-26 0-46 16-46 36 0 14 12 24 26 24 20 0 32-16 30-30-2-10-12-14-20-10" fill="none" stroke={c.color} strokeWidth="18" strokeLinecap="round" />
      <path d="M50 84c20 0 32-16 30-30" fill="none" stroke={c.shade} strokeWidth="18" strokeLinecap="round" opacity={shadeOpacity(p.tone)} />
      <circle cx="70" cy="26" r="3.5" fill="#7A3A28" />
    </Ing>
  )
}

export function BoiledEgg(p: IngredientProps) {
  const c = M['boiled-egg']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <ellipse cx="50" cy="54" rx="32" ry="38" fill={c.color} />
      <path d="M50 16c17.7 0 32 17 32 38S67.7 92 50 92z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <circle cx="50" cy="56" r="16" fill="#E9A33B" />
      <path d="M50 40a16 16 0 0 1 0 32z" fill="#CE8926" opacity={shadeOpacity(p.tone)} />
    </Ing>
  )
}
