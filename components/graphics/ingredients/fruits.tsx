import { Ing, shadeOpacity, type IngredientProps } from './base'
import { INGREDIENT_BY_ID as M } from '@/lib/ingredients'

export function CherryTomato(p: IngredientProps) {
  const c = M['cherry-tomato']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <circle cx="50" cy="56" r="36" fill={c.color} />
      <path d="M50 20a36 36 0 0 1 0 72c16-14 18-58 0-72z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M50 22 34 12M50 22l16-10M50 22V8" stroke="#6E9450" strokeWidth="5" strokeLinecap="round" />
    </Ing>
  )
}

export function Avocado(p: IngredientProps) {
  const c = M['avocado']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M50 96c-20 0-32-16-32-34 0-16 8-24 12-36C34 14 40 6 50 6s16 8 20 20c4 12 12 20 12 36 0 18-12 34-32 34z" fill={c.color} />
      <path d="M50 6c10 0 16 8 20 20 4 12 12 20 12 36 0 18-12 34-32 34z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <circle cx="50" cy="62" r="15" fill="#B98A4B" />
    </Ing>
  )
}

export function Cucumber(p: IngredientProps) {
  const c = M['cucumber']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <rect x="16" y="36" width="68" height="28" rx="14" fill={c.color} />
      <path d="M70 36h-6a14 14 0 0 1 0 28h6a14 14 0 0 0 0-28z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <circle cx="34" cy="50" r="3" fill="#EDF2DF" />
      <circle cx="50" cy="45" r="3" fill="#EDF2DF" />
      <circle cx="62" cy="55" r="3" fill="#EDF2DF" />
    </Ing>
  )
}

function Paprika({ id, p }: { id: string; p: IngredientProps }) {
  const c = M[id]
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M26 40c0-14 10-22 24-22s24 8 24 22c0 26-8 50-24 50S26 66 26 40z" fill={c.color} />
      <path d="M50 18c14 0 24 8 24 22 0 26-8 50-24 50z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M50 20V8" stroke="#5C7F41" strokeWidth="6" strokeLinecap="round" />
    </Ing>
  )
}
export const PaprikaRed = (p: IngredientProps) => <Paprika id="paprika-red" p={p} />
export const PaprikaYellow = (p: IngredientProps) => <Paprika id="paprika-yellow" p={p} />
export const PaprikaGreen = (p: IngredientProps) => <Paprika id="paprika-green" p={p} />

export function Kabocha(p: IngredientProps) {
  const c = M['kabocha']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <ellipse cx="50" cy="58" rx="42" ry="32" fill={c.color} />
      <path d="M50 26c23 0 42 14 42 32S73 90 50 90c10-18 10-46 0-64z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M34 32c-6 16-6 36 0 52M66 32c6 16 6 36 0 52" stroke="#F3D9A6" strokeWidth="3" fill="none" opacity="0.75" />
      <rect x="46" y="14" width="8" height="14" rx="4" fill="#7C8B4E" />
    </Ing>
  )
}

export function Cranberry(p: IngredientProps) {
  const c = M['cranberry']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <circle cx="38" cy="60" r="24" fill={c.color} />
      <circle cx="66" cy="44" r="18" fill={c.shade} opacity={shadeOpacity(p.tone) ? 1 : 0.001} />
      <circle cx="30" cy="52" r="5" fill="#E9A6B4" opacity="0.6" />
    </Ing>
  )
}

export function Olive(p: IngredientProps) {
  const c = M['olive']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <ellipse cx="50" cy="52" rx="26" ry="34" fill={c.color} />
      <path d="M50 18c14 0 26 15 26 34S64 86 50 86z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <ellipse cx="50" cy="52" rx="8" ry="12" fill="#E0523A" />
    </Ing>
  )
}
