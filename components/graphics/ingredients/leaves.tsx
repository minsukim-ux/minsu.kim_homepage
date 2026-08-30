import { Ing, shadeOpacity, type IngredientProps } from './base'
import { INGREDIENT_BY_ID as M } from '@/lib/ingredients'

export function Arugula(p: IngredientProps) {
  const c = M['arugula']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M50 92C50 70 44 40 22 18c-2 30 8 56 28 74z" fill={c.color} />
      <path d="M50 92C50 70 56 40 78 18c2 30-8 56-28 74z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <rect x="47.5" y="60" width="5" height="32" rx="2.5" fill={c.shade} />
    </Ing>
  )
}

export function Romaine(p: IngredientProps) {
  const c = M['romaine']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M50 94c-16-8-24-30-22-56 2-22 12-32 22-32s20 10 22 32c2 26-6 48-22 56z" fill={c.color} />
      <path d="M50 94V6c10 0 20 10 22 32 2 26-6 48-22 56z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M50 90V14" stroke="#F0F2E2" strokeWidth="4" strokeLinecap="round" />
    </Ing>
  )
}

export function Kale(p: IngredientProps) {
  const c = M['kale']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M50 96c-30-6-44-26-40-48 2-12 12-14 16-6 2-14 14-18 20-8 6-10 18-6 20 8 4-8 14-6 16 6 4 22-10 42-32 48z" fill={c.color} />
      <path d="M50 96c22-6 36-26 32-48-2-12-12-14-16-6-2-14-14-18-20-8z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
    </Ing>
  )
}

export function Spinach(p: IngredientProps) {
  const c = M['spinach']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M14 62C22 26 48 10 84 12c6 34-14 62-48 68-12 2-20-6-22-18z" fill={c.color} />
      <path d="M84 12c6 34-14 62-48 68 14-24 30-46 48-68z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
    </Ing>
  )
}

export function RedCabbage(p: IngredientProps) {
  const c = M['red-cabbage']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <circle cx="50" cy="52" r="40" fill={c.color} />
      <path d="M50 12a40 40 0 0 1 0 80c14-16 16-58 0-80z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M50 14c-12 16-16 44-4 74M50 14c12 16 16 44 4 74" stroke="#F0E4EF" strokeWidth="3" fill="none" opacity="0.7" />
    </Ing>
  )
}

export function Radicchio(p: IngredientProps) {
  const c = M['radicchio']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <ellipse cx="50" cy="54" rx="36" ry="40" fill={c.color} />
      <path d="M50 14c20 0 36 18 36 40s-16 40-36 40c12-22 14-58 0-80z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M34 26c-6 22-4 44 6 62M64 24c8 22 6 44-4 64" stroke="#F6EEE6" strokeWidth="4" fill="none" strokeLinecap="round" />
    </Ing>
  )
}
