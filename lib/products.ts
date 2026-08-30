/**
 * 제품 데이터 — 구조만 정의한다.
 * 제품명은 인스타 피드에서 확인된 표기이며 정식 SKU 확인이 필요하다.
 * 가격·중량·영양성분은 전부 빈 값 + TODO. 절대 지어내지 말 것.
 */

export type ProductCategory = 'salad' | 'wrap' | 'noodle' | 'side'

export type Product = {
  sku: string
  nameKo: string // 확인필요
  category: ProductCategory
  /** MONTHLY MOOD 색 매칭용 */
  dominantColor: string
  /** 대표 재료 id (SVG 폴백/볼 구성에 사용) */
  ingredients: string[]
  price: number | null // TODO
  weightG: number | null // TODO
  nutrition: {
    kcal: number | null // TODO
    proteinG: number | null // TODO
    carbG: number | null // TODO
    fatG: number | null // TODO
    sodiumMg: number | null // TODO
  }
  /** 외부몰 링크. 확인 전까지 null */
  buyUrl: string | null // TODO
  recipeSlug: string | null
}

const empty = { kcal: null, proteinG: null, carbG: null, fatG: null, sodiumMg: null }

export const CATEGORY_LABEL: Record<ProductCategory, string> = {
  salad: '샐러드',
  wrap: '랩 · 피자',
  noodle: '면',
  side: '사이드',
}

export const CATEGORY_COLOR: Record<ProductCategory, string> = {
  salad: 'var(--sb-olive)',
  wrap: 'var(--sb-terracotta)',
  noodle: 'var(--sb-cream)',
  side: 'var(--sb-amber)',
}

export const PRODUCTS: Product[] = [
  { sku: 'salad-low-sugar-balance', nameKo: '저당 밸런스', category: 'salad', dominantColor: '#7C8B4E', ingredients: ['romaine', 'cherry-tomato', 'chicken-breast'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'salad-tasty', nameKo: '테이스티', category: 'salad', dominantColor: '#E0523A', ingredients: ['kale', 'paprika-red', 'feta'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'salad-today', nameKo: '오늘의 샐러드', category: 'salad', dominantColor: '#84A85B', ingredients: ['spinach', 'cucumber', 'boiled-egg'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'salad-warm', nameKo: '온샐', category: 'salad', dominantColor: '#E0902F', ingredients: ['kabocha', 'sweet-potato', 'quinoa'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'wrap-topping-pizza', nameKo: '토핑폭탄 피자랩', category: 'wrap', dominantColor: '#C2472F', ingredients: ['paprika-green', 'olive', 'ricotta'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'wrap-protein-balance', nameKo: '프로틴 밸런스 랩', category: 'wrap', dominantColor: '#DE7B32', ingredients: ['chicken-breast', 'red-cabbage', 'romaine'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'wrap-mexican-burrito-bowl', nameKo: '멕시칸 브리또볼', category: 'wrap', dominantColor: '#B32B45', ingredients: ['black-bean', 'corn', 'lentil'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'wrap-taco', nameKo: '타코랩', category: 'wrap', dominantColor: '#E9A33B', ingredients: ['shrimp', 'avocado', 'arugula'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'noodle-low-sugar-buckwheat', nameKo: '저당 메밀면 샐러드', category: 'noodle', dominantColor: '#D9C8A3', ingredients: ['cucumber', 'carrot', 'walnut'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
  { sku: 'side-carrot-rapee', nameKo: '당근라페', category: 'side', dominantColor: '#DE7B32', ingredients: ['carrot'], price: null, weightG: null, nutrition: { ...empty }, buyUrl: null, recipeSlug: null },
]

export const PRODUCTS_BY_CATEGORY = (c: ProductCategory) => PRODUCTS.filter((p) => p.category === c)
