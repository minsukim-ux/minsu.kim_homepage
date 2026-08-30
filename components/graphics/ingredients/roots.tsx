import { Ing, shadeOpacity, type IngredientProps } from './base'
import { INGREDIENT_BY_ID as M } from '@/lib/ingredients'

export function Radish(p: IngredientProps) {
  const c = M['radish']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M38 24h24l-6 62c-1 8-11 8-12 0z" fill={c.color} />
      <path d="M50 24h12l-6 62c-.5 5-4.5 7-8 6z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M40 24c-8-10-18-14-26-14 4 12 14 18 26 18zM60 24c8-10 18-14 26-14-4 12-14 18-26 18z" fill="#84A85B" />
      <path d="M50 24V6" stroke="#84A85B" strokeWidth="5" strokeLinecap="round" />
    </Ing>
  )
}

export function Carrot(p: IngredientProps) {
  const c = M['carrot']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M34 30h32L54 92c-2 6-8 6-10 0z" fill={c.color} />
      <path d="M50 30h16L54 92c-1.5 4.5-5 5.5-8 3z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M40 44l16 4M44 60l14 4" stroke="#F2CFA6" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 30V10M50 22 34 12M50 22l16-10" stroke="#6E9450" strokeWidth="6" strokeLinecap="round" />
    </Ing>
  )
}

export function SweetPotato(p: IngredientProps) {
  const c = M['sweet-potato']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M14 62c0-20 20-34 40-34s32 10 32 24-14 24-34 26S14 78 14 62z" fill={c.color} />
      <path d="M54 28c18 0 32 10 32 24S72 76 52 78z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M26 58c8-6 18-8 26-6" stroke="#E5A186" strokeWidth="3" fill="none" strokeLinecap="round" />
    </Ing>
  )
}
