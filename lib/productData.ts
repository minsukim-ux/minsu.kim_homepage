import { ASSETS } from './assets'

/**
 * 제품 데이터.
 *
 * 출처: 사내 제품 마스터 "(주)스윗밸런스 제품소개서 선택용_NB영업팀" 및
 *       제품컷 원본 파일명. 2026-08-28 기준 "운영중" 항목에서 발췌.
 *
 * ⚠️ 영양성분·가격·판매채널은 이 시트에서 확인하지 않았으므로 넣지 않는다.
 *    표시광고 대상이므로 담당자 확인 후 별도 필드로 추가할 것.
 */
export interface Product {
  /** 사내 단품코드. 연출컷 등 코드가 없는 항목은 null. */
  readonly code: string | null
  readonly name: string
  /** 브랜드 라인 (마스터의 "확장" 분류) */
  readonly line: string
  /** 중량. 마스터에서 확인되지 않은 건 null. */
  readonly weight: string | null
  /** 제품컷 경로 */
  readonly image: string
}

export const PRODUCTS: readonly Product[] = [
  { code: 'SVH091', name: '당근 라페 & 올리브', line: '신선편의', weight: null, image: ASSETS.product.still(1) },
  { code: 'SVH092', name: '당근 양배추 라페', line: '신선편의', weight: null, image: ASSETS.product.still(2) },
  { code: 'SFS006', name: '새우듬뿍 샐러드', line: '저당 밸런스', weight: '300g', image: ASSETS.product.still(3) },
  { code: 'OPO046', name: '데일리핏 구운닭가슴살 샐러드', line: '샐러드', weight: null, image: ASSETS.product.still(4) },
  { code: 'OPO047', name: '데일리핏 새우쿠스쿠스 샐러드', line: '샐러드', weight: null, image: ASSETS.product.still(5) },
  { code: 'BWW024', name: '통밀 프로틴랩 닭가슴살&치즈', line: '프로틴랩', weight: '235g', image: ASSETS.product.still(6) },
  { code: 'OEM041', name: '바질페스토 샐러드랩 파티팩', line: '파티팩', weight: null, image: ASSETS.product.still(7) },
  { code: 'SCV0025', name: '채소스틱', line: '건강 스낵', weight: null, image: ASSETS.product.still(8) },
  { code: null, name: '샐러드랩 (연출컷)', line: '샐러드 랩', weight: null, image: ASSETS.product.still(9) },
] as const

/** 브랜드 라인과 운영중 품목 수 (마스터의 "확장" 분류 집계, 2026-08-28 기준) */
export const PRODUCT_LINES: readonly { name: string; en: string; count: number }[] = [
  { name: '테이스티', en: 'Tasty', count: 36 },
  { name: '칼로리 밸런스', en: 'Calorie Balance', count: 25 },
  { name: '프로틴 밸런스', en: 'Protein Balance', count: 20 },
  { name: '저당 밸런스', en: 'Low Sugar Balance', count: 16 },
  { name: '드레싱', en: 'Dressing', count: 15 },
  { name: '타코랩 & 피자랩', en: 'Taco & Pizza Wrap', count: 14 },
  { name: '샐러드 랩 & 웜랩', en: 'Salad & Warm Wrap', count: 13 },
  { name: '믹스샐러드', en: 'Mix Salad', count: 11 },
  { name: '버거 & 샌드위치', en: 'Burger & Sandwich', count: 7 },
  { name: '도시락', en: 'Meal', count: 6 },
  { name: '온샐러드', en: 'Warm Salad', count: 4 },
  { name: '보틀 샐러드', en: 'Bottle Salad', count: 4 },
  { name: '건강 스낵', en: 'Fresh Snack', count: 2 },
] as const
