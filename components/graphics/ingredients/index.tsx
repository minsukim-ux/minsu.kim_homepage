import type { ComponentType } from 'react'
import type { IngredientProps } from './base'
import { INGREDIENTS } from '@/lib/ingredients'
import * as L from './leaves'
import * as F from './fruits'
import * as R from './roots'
import * as G from './grains'
import * as P from './proteins'

export type { IngredientProps }
export { Ing } from './base'

/** id → SVG 컴포넌트 레지스트리 */
export const INGREDIENT_SVG: Record<string, ComponentType<IngredientProps>> = {
  arugula: L.Arugula,
  romaine: L.Romaine,
  kale: L.Kale,
  spinach: L.Spinach,
  'red-cabbage': L.RedCabbage,
  radicchio: L.Radicchio,
  'cherry-tomato': F.CherryTomato,
  avocado: F.Avocado,
  cucumber: F.Cucumber,
  'paprika-red': F.PaprikaRed,
  'paprika-yellow': F.PaprikaYellow,
  'paprika-green': F.PaprikaGreen,
  kabocha: F.Kabocha,
  cranberry: F.Cranberry,
  olive: F.Olive,
  radish: R.Radish,
  carrot: R.Carrot,
  'sweet-potato': R.SweetPotato,
  corn: G.Corn,
  chickpea: G.Chickpea,
  'black-bean': G.BlackBean,
  lentil: G.Lentil,
  quinoa: G.Quinoa,
  almond: G.Almond,
  walnut: G.Walnut,
  feta: P.Feta,
  ricotta: P.Ricotta,
  'chicken-breast': P.ChickenBreast,
  shrimp: P.Shrimp,
  'boiled-egg': P.BoiledEgg,
}

export function IngredientIcon({ id, ...props }: { id: string } & IngredientProps) {
  const C = INGREDIENT_SVG[id]
  if (!C) return null
  return <C {...props} />
}

/** 레지스트리 누락 검증용 (개발 편의) */
export const MISSING_SVG = INGREDIENTS.filter((i) => !INGREDIENT_SVG[i.id]).map((i) => i.id)
