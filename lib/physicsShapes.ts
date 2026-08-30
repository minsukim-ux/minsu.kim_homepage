import { INGREDIENTS } from './ingredients'

/**
 * Matter.js 충돌 바디용 외곽 근사.
 * 렌더 SVG를 그대로 쓰면 vertex가 많아 성능이 떨어지므로
 * 재료마다 단순 폴리곤/원으로만 근사한다. 좌표계는 100x100 기준.
 */
export type Approx =
  | { kind: 'circle'; r: number }
  | { kind: 'rect'; w: number; h: number }
  | { kind: 'poly'; points: [number, number][] }

const DEFAULT: Approx = { kind: 'circle', r: 34 }

const SHAPES: Record<string, Approx> = {
  'cherry-tomato': { kind: 'circle', r: 36 },
  avocado: { kind: 'poly', points: [[50, 8], [78, 46], [72, 84], [50, 94], [28, 84], [22, 46]] },
  arugula: { kind: 'poly', points: [[50, 10], [76, 40], [56, 92], [44, 92], [24, 40]] },
  romaine: { kind: 'poly', points: [[50, 6], [74, 34], [66, 88], [34, 88], [26, 34]] },
  kale: { kind: 'circle', r: 38 },
  spinach: { kind: 'poly', points: [[84, 12], [80, 56], [36, 82], [14, 62], [40, 22]] },
  'red-cabbage': { kind: 'circle', r: 40 },
  radicchio: { kind: 'circle', r: 37 },
  cucumber: { kind: 'rect', w: 68, h: 28 },
  radish: { kind: 'poly', points: [[38, 22], [62, 22], [56, 88], [44, 88]] },
  carrot: { kind: 'poly', points: [[34, 30], [66, 30], [52, 92], [48, 92]] },
  'paprika-red': { kind: 'poly', points: [[50, 18], [74, 34], [66, 82], [34, 82], [26, 34]] },
  'paprika-yellow': { kind: 'poly', points: [[50, 18], [74, 34], [66, 82], [34, 82], [26, 34]] },
  'paprika-green': { kind: 'poly', points: [[50, 18], [74, 34], [66, 82], [34, 82], [26, 34]] },
  kabocha: { kind: 'circle', r: 36 },
  corn: { kind: 'rect', w: 36, h: 80 },
  chickpea: { kind: 'circle', r: 24 },
  'black-bean': { kind: 'circle', r: 24 },
  lentil: { kind: 'circle', r: 22 },
  quinoa: { kind: 'circle', r: 20 },
  almond: { kind: 'poly', points: [[50, 10], [74, 54], [50, 90], [26, 54]] },
  walnut: { kind: 'circle', r: 36 },
  cranberry: { kind: 'circle', r: 26 },
  olive: { kind: 'poly', points: [[50, 18], [76, 52], [50, 86], [24, 52]] },
  feta: { kind: 'poly', points: [[20, 38], [50, 22], [80, 38], [80, 66], [50, 82], [20, 66]] },
  ricotta: { kind: 'poly', points: [[50, 22], [78, 74], [50, 86], [22, 74]] },
  'chicken-breast': { kind: 'poly', points: [[56, 22], [82, 48], [66, 78], [30, 78], [18, 56]] },
  shrimp: { kind: 'circle', r: 32 },
  'boiled-egg': { kind: 'poly', points: [[50, 16], [82, 54], [50, 92], [18, 54]] },
  'sweet-potato': { kind: 'poly', points: [[54, 28], [86, 52], [52, 78], [22, 76], [14, 62]] },
}

export function approxFor(id: string): Approx {
  return SHAPES[id] ?? DEFAULT
}

export const MISSING_SHAPES = INGREDIENTS.filter((i) => !SHAPES[i.id]).map((i) => i.id)
