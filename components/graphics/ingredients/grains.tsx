import { Ing, shadeOpacity, type IngredientProps } from './base'
import { INGREDIENT_BY_ID as M, seeded } from '@/lib/ingredients'

export function Corn(p: IngredientProps) {
  const c = M['corn']
  const rows = [0, 1, 2, 3, 4, 5]
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M32 30c0-14 8-22 18-22s18 8 18 22v34c0 16-8 26-18 26s-18-10-18-26z" fill={c.color} />
      <path d="M50 8c10 0 18 8 18 22v34c0 16-8 26-18 26z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      {rows.map((r) => (
        <g key={r}>
          <circle cx="41" cy={24 + r * 11} r="3.2" fill="#F7E2A8" />
          <circle cx="52" cy={29 + r * 11} r="3.2" fill="#F7E2A8" />
          <circle cx="62" cy={24 + r * 11} r="3.2" fill="#F7E2A8" opacity="0.7" />
        </g>
      ))}
    </Ing>
  )
}

function Beans({ id, p, count }: { id: string; p: IngredientProps; count: number }) {
  const c = M[id]
  const s = p.seed ?? 0
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      {Array.from({ length: count }).map((_, i) => {
        const x = 24 + seeded(s + i, 1) * 52
        const y = 30 + seeded(s + i, 2) * 44
        const r = 8 + seeded(s + i, 3) * 5
        return (
          <g key={i}>
            <ellipse cx={x} cy={y} rx={r} ry={r * 0.78} fill={c.color} />
            <path
              d={`M${x} ${y - r * 0.78}a${r} ${r * 0.78} 0 0 1 0 ${r * 1.56}z`}
              fill={c.shade}
              opacity={shadeOpacity(p.tone)}
            />
          </g>
        )
      })}
    </Ing>
  )
}

export const Chickpea = (p: IngredientProps) => <Beans id="chickpea" p={p} count={5} />
export const BlackBean = (p: IngredientProps) => <Beans id="black-bean" p={p} count={6} />
export const Lentil = (p: IngredientProps) => <Beans id="lentil" p={p} count={8} />
export const Quinoa = (p: IngredientProps) => <Beans id="quinoa" p={p} count={11} />

export function Almond(p: IngredientProps) {
  const c = M['almond']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <path d="M50 10c16 8 24 26 24 44s-10 32-24 36c-14-4-24-18-24-36s8-36 24-44z" fill={c.color} />
      <path d="M50 10c16 8 24 26 24 44s-10 32-24 36z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
    </Ing>
  )
}

export function Walnut(p: IngredientProps) {
  const c = M['walnut']
  return (
    <Ing {...p} title={p.title ?? c.nameKo}>
      <circle cx="50" cy="52" r="36" fill={c.color} />
      <path d="M50 16a36 36 0 0 1 0 72z" fill={c.shade} opacity={shadeOpacity(p.tone)} />
      <path d="M50 18v68M34 26c8 12 8 40 0 52M66 26c-8 12-8 40 0 52" stroke="#E8CDAE" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </Ing>
  )
}
