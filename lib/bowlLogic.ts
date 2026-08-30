import { INGREDIENTS, type IngredientMeta } from './ingredients'
import { PRODUCTS, type Product } from './products'

/**
 * BOWL BUILDER 로직 — 순수 함수만.
 * ⚠️ 효능·기능성 표현 금지. 취향 조합 제안까지만 한다.
 */

export type Goal = 'light' | 'keep' | 'hearty'

export type BowlState = {
  /** 0 = 일반형, 0.5 = 탄탄형, 1 = 근육형 (연속값) */
  body: number
  /** 0 = 적게 움직임, 1 = 많이 움직임 */
  activity: number
  goal: Goal
}

export const GOAL_LABEL: Record<Goal, string> = {
  light: '가볍게',
  keep: '유지하기',
  hearty: '든든하게',
}

/** 실루엣 path — 명령 구조가 동일해야 수치 보간이 성립한다 */
export const BODY_PATHS = [
  'M50 8c9 0 14 6 14 13 0 6-4 9-4 12 0 4 8 6 10 14 3 10 3 22 2 30-1 6-7 6-8 1-1-6-2-12-3-12s-1 8-1 14c0 8 1 18 0 24-1 5-8 5-9 0-1-7-1-17-1-22 0-2-2-2-2 0 0 5 0 15-1 22-1 5-8 5-9 0-1-6 0-16 0-24 0-6 0-14-1-14s-2 6-3 12c-1 5-7 5-8-1-1-8-1-20 2-30 2-8 10-10 10-14 0-3-4-6-4-12 0-7 5-13 14-13z',
  'M50 8c10 0 16 6 16 13 0 6-5 9-5 12 0 4 10 6 13 14 4 10 4 22 3 30-1 6-8 6-9 1-1-6-3-12-4-12s-1 8-1 14c0 8 1 18 0 24-1 5-9 5-10 0-1-7-1-17-1-22 0-2-2-2-2 0 0 5 0 15-1 22-1 5-9 5-10 0-1-6 0-16 0-24 0-6 0-14-1-14s-3 6-4 12c-1 5-8 5-9-1-1-8-1-20 3-30 3-8 13-10 13-14 0-3-5-6-5-12 0-7 6-13 16-13z',
  'M50 8c12 0 19 6 19 13 0 6-6 9-6 12 0 4 13 6 17 14 5 10 5 22 4 30-1 6-10 6-11 1-2-6-4-12-5-12s-1 8-1 14c0 8 1 18 0 24-1 5-11 5-12 0-1-7-1-17-1-22 0-2-3-2-3 0 0 5 0 15-1 22-1 5-11 5-12 0-1-6 0-16 0-24 0-6 0-14-1-14s-3 6-5 12c-1 5-10 5-11-1-1-8-1-20 4-30 4-8 17-10 17-14 0-3-6-6-6-12 0-7 7-13 19-13z',
] as const

/** 같은 구조의 path 두 개를 수치 단위로 보간한다 (단계 전환이 아니라 연속 변형) */
export function lerpPath(a: string, b: string, t: number): string {
  const na = a.match(/-?\d+(\.\d+)?/g)
  const nb = b.match(/-?\d+(\.\d+)?/g)
  if (!na || !nb || na.length !== nb.length) return a
  let i = 0
  return a.replace(/-?\d+(\.\d+)?/g, () => {
    const v = Number(na[i]) + (Number(nb[i]) - Number(na[i])) * t
    i += 1
    return String(Math.round(v * 100) / 100)
  })
}

export function bodyPath(body: number): string {
  const t = Math.max(0, Math.min(1, body)) * 2
  return t <= 1 ? lerpPath(BODY_PATHS[0], BODY_PATHS[1], t) : lerpPath(BODY_PATHS[1], BODY_PATHS[2], t - 1)
}

const byId = (id: string) => INGREDIENTS.find((i) => i.id === id)!

const BASE_LEAVES = ['romaine', 'arugula', 'kale', 'spinach', 'radicchio', 'red-cabbage']
const COLOR_VEG = ['cherry-tomato', 'paprika-red', 'paprika-yellow', 'cucumber', 'carrot', 'radish']
const HEARTY = ['sweet-potato', 'kabocha', 'quinoa', 'corn', 'chickpea', 'lentil']
const PROTEIN = ['chicken-breast', 'boiled-egg', 'shrimp', 'feta', 'ricotta', 'black-bean']
const TOPPING = ['almond', 'walnut', 'cranberry', 'olive', 'avocado']

/** 상태 → 볼에 담기는 재료 목록. 결정적(같은 입력 = 같은 출력). */
export function composeBowl(state: BowlState): IngredientMeta[] {
  const { body, activity, goal } = state
  const pick = (pool: string[], n: number, offset: number) =>
    Array.from({ length: Math.max(0, n) }, (_, k) => pool[(offset + k) % pool.length])

  const seed = Math.round(body * 5) + Math.round(activity * 3)
  const proteinCount = 1 + Math.round(body * 2) + (goal === 'hearty' ? 1 : 0)
  const heartyCount = goal === 'light' ? 0 : goal === 'keep' ? 1 : 2
  const leafCount = goal === 'light' ? 4 : 3
  const vegCount = 2 + Math.round(activity * 2)
  const topCount = goal === 'light' ? 1 : 2

  return [
    ...pick(BASE_LEAVES, leafCount, seed),
    ...pick(COLOR_VEG, vegCount, seed + 1),
    ...pick(HEARTY, heartyCount, seed + 2),
    ...pick(PROTEIN, proteinCount, seed + 3),
    ...pick(TOPPING, topCount, seed + 4),
  ].map(byId)
}

/** 조합과 톤이 가까운 제품 제안. 효능이 아니라 취향 근접도다. */
export function suggestProducts(state: BowlState, limit = 2): Product[] {
  const wanted: Record<Goal, string[]> = {
    light: ['salad', 'noodle'],
    keep: ['salad', 'side'],
    hearty: ['wrap', 'salad'],
  }
  const order = wanted[state.goal]
  return [...PRODUCTS]
    .sort((a, b) => order.indexOf(a.category) - order.indexOf(b.category))
    .slice(0, limit)
}

/** 공유 카드에 쓰는 한 줄 — 취향 서술만 한다 */
export function bowlCaption(state: BowlState): string {
  const bodyWord = state.body < 0.34 ? '가볍게 시작하는' : state.body < 0.67 ? '단단하게 채우는' : '묵직하게 담는'
  return `${bodyWord} ${GOAL_LABEL[state.goal]} 볼`
}
