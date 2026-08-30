/**
 * 재료 사전.
 *
 * - LOADER_INGREDIENT_NAMES: 로더 화면에 흩뿌려지는 한글 텍스트(4-1).
 * - CUTOUT_INGREDIENTS: 누끼 PNG 가 필요한 재료. 커서 트레일(4-2), S3 재료 필드,
 *   BowlBuilder 낙하 물리(6-1)에서 공용으로 쓴다.
 *
 * ⚠️ 여기 있는 재료명은 "시각 연출용 어휘"다. 특정 제품의 실제 구성이 아니다.
 *    제품별 실제 재료·영양 정보는 확정 후 /lib/productData.ts 로 분리한다.
 */

/** 로더에 부유하는 재료 텍스트 (40+) */
export const LOADER_INGREDIENT_NAMES = [
  '루꼴라',
  '아보카도',
  '병아리콩',
  '방울토마토',
  '리코타',
  '케일',
  '퀴노아',
  '훈제연어',
  '닭가슴살',
  '로메인',
  '시금치',
  '적양배추',
  '파프리카',
  '오이',
  '당근',
  '비트',
  '옥수수',
  '블랙올리브',
  '아몬드',
  '호두',
  '크랜베리',
  '블루베리',
  '사과',
  '그릭요거트',
  '페타치즈',
  '모짜렐라',
  '삶은달걀',
  '두부',
  '새우',
  '렌틸콩',
  '귀리',
  '현미',
  '단호박',
  '고구마',
  '브로콜리',
  '아스파라거스',
  '알배추',
  '치커리',
  '라디치오',
  '바질',
  '딜',
  '적양파',
  '방울무',
] as const

export interface CutoutIngredient {
  /** 파일명·물리 바디 식별자 */
  readonly slug: string
  /** 화면 표기용 한글명 */
  readonly label: string
  /**
   * 물리 바디 형태. 낙하·충돌 모양을 결정한다(Matter.js).
   * round: 원형, flake: 얇은 잎, chunk: 각진 덩어리
   */
  readonly body: 'round' | 'flake' | 'chunk'
  /** 기본 렌더 크기(px). 실제 스폰 시 ±25% 랜덤 스케일. */
  readonly size: number
}

/** 누끼 에셋이 필요한 재료 (24종) */
export const CUTOUT_INGREDIENTS: readonly CutoutIngredient[] = [
  { slug: 'arugula', label: '루꼴라', body: 'flake', size: 78 },
  { slug: 'romaine', label: '로메인', body: 'flake', size: 96 },
  { slug: 'kale', label: '케일', body: 'flake', size: 88 },
  { slug: 'spinach', label: '시금치', body: 'flake', size: 72 },
  { slug: 'radicchio', label: '라디치오', body: 'flake', size: 84 },
  { slug: 'basil', label: '바질', body: 'flake', size: 56 },
  { slug: 'tomato-cherry', label: '방울토마토', body: 'round', size: 62 },
  { slug: 'olive-black', label: '블랙올리브', body: 'round', size: 44 },
  { slug: 'blueberry', label: '블루베리', body: 'round', size: 36 },
  { slug: 'cranberry', label: '크랜베리', body: 'round', size: 32 },
  { slug: 'chickpea', label: '병아리콩', body: 'round', size: 34 },
  { slug: 'corn', label: '옥수수', body: 'round', size: 30 },
  { slug: 'lentil', label: '렌틸콩', body: 'round', size: 26 },
  { slug: 'almond', label: '아몬드', body: 'chunk', size: 40 },
  { slug: 'walnut', label: '호두', body: 'chunk', size: 52 },
  { slug: 'avocado', label: '아보카도', body: 'chunk', size: 82 },
  { slug: 'paprika', label: '파프리카', body: 'chunk', size: 74 },
  { slug: 'cucumber', label: '오이', body: 'round', size: 58 },
  { slug: 'carrot', label: '당근', body: 'chunk', size: 66 },
  { slug: 'beet', label: '비트', body: 'chunk', size: 60 },
  { slug: 'pumpkin', label: '단호박', body: 'chunk', size: 70 },
  { slug: 'egg-boiled', label: '삶은달걀', body: 'round', size: 68 },
  { slug: 'feta', label: '페타치즈', body: 'chunk', size: 54 },
  { slug: 'chicken-breast', label: '닭가슴살', body: 'chunk', size: 92 },
] as const

/** slug → 재료 조회 */
export function getCutout(slug: string): CutoutIngredient | undefined {
  return CUTOUT_INGREDIENTS.find((item) => item.slug === slug)
}

/** 단백질 축(BowlBuilder)에서 우선 낙하시킬 재료 */
export const PROTEIN_SLUGS = [
  'chicken-breast',
  'egg-boiled',
  'chickpea',
  'lentil',
  'feta',
] as const
