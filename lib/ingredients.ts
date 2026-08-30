export type IngredientCategory =
  | 'leaf'
  | 'fruit'
  | 'root'
  | 'legume'
  | 'nut'
  | 'protein'
  | 'dairy'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type IngredientMeta = {
  id: string
  nameKo: string
  /** 대표 색. MONTHLY MOOD 매칭과 ABOUT 배경 보간에 사용 */
  color: string
  /** 그림자 톤 (2톤 셰이딩의 어두운 쪽) */
  shade: string
  /** BALANCE GAME 물리 질량 (상대값) */
  mass: number
  category: IngredientCategory
  season: Season
}

export const INGREDIENTS: IngredientMeta[] = [
  { id: 'cherry-tomato', nameKo: '방울토마토', color: '#E0523A', shade: '#B23726', mass: 1.0, category: 'fruit', season: 'summer' },
  { id: 'avocado', nameKo: '아보카도', color: '#7C8B4E', shade: '#5C6839', mass: 2.4, category: 'fruit', season: 'winter' },
  { id: 'arugula', nameKo: '루꼴라', color: '#6E9450', shade: '#4F6E39', mass: 0.3, category: 'leaf', season: 'spring' },
  { id: 'romaine', nameKo: '로메인', color: '#84A85B', shade: '#5F7E41', mass: 0.5, category: 'leaf', season: 'spring' },
  { id: 'kale', nameKo: '케일', color: '#4E6B44', shade: '#374F31', mass: 0.6, category: 'leaf', season: 'winter' },
  { id: 'spinach', nameKo: '시금치', color: '#5C8248', shade: '#405E33', mass: 0.4, category: 'leaf', season: 'winter' },
  { id: 'red-cabbage', nameKo: '적양배추', color: '#8A4E86', shade: '#653663', mass: 1.6, category: 'leaf', season: 'autumn' },
  { id: 'radicchio', nameKo: '라디치오', color: '#8E2F44', shade: '#6A1F31', mass: 0.9, category: 'leaf', season: 'autumn' },
  { id: 'cucumber', nameKo: '오이', color: '#7FA75C', shade: '#5C7F41', mass: 1.3, category: 'fruit', season: 'summer' },
  { id: 'radish', nameKo: '무', color: '#EFF3E9', shade: '#CBD6C2', mass: 2.0, category: 'root', season: 'winter' },
  { id: 'carrot', nameKo: '당근', color: '#DE7B32', shade: '#B25A1E', mass: 1.5, category: 'root', season: 'autumn' },
  { id: 'paprika-red', nameKo: '빨강 파프리카', color: '#D8402F', shade: '#A82C1F', mass: 1.1, category: 'fruit', season: 'summer' },
  { id: 'paprika-yellow', nameKo: '노랑 파프리카', color: '#E9A33B', shade: '#BC7C22', mass: 1.1, category: 'fruit', season: 'summer' },
  { id: 'paprika-green', nameKo: '초록 파프리카', color: '#6D9440', shade: '#4E6E2C', mass: 1.1, category: 'fruit', season: 'summer' },
  { id: 'kabocha', nameKo: '단호박', color: '#E0902F', shade: '#AF6A1C', mass: 2.6, category: 'fruit', season: 'autumn' },
  { id: 'corn', nameKo: '옥수수', color: '#EFC24C', shade: '#C2952C', mass: 1.2, category: 'legume', season: 'summer' },
  { id: 'chickpea', nameKo: '병아리콩', color: '#DCC08A', shade: '#B39662', mass: 0.5, category: 'legume', season: 'autumn' },
  { id: 'black-bean', nameKo: '검은콩', color: '#3B3038', shade: '#241C22', mass: 0.5, category: 'legume', season: 'autumn' },
  { id: 'lentil', nameKo: '렌틸', color: '#C2734A', shade: '#94512F', mass: 0.4, category: 'legume', season: 'autumn' },
  { id: 'quinoa', nameKo: '퀴노아', color: '#D9C8A3', shade: '#B09C74', mass: 0.3, category: 'legume', season: 'autumn' },
  { id: 'almond', nameKo: '아몬드', color: '#C89A6B', shade: '#9C7148', mass: 0.6, category: 'nut', season: 'autumn' },
  { id: 'walnut', nameKo: '호두', color: '#A87B4F', shade: '#7E5735', mass: 0.7, category: 'nut', season: 'autumn' },
  { id: 'cranberry', nameKo: '크랜베리', color: '#B32B45', shade: '#851C31', mass: 0.3, category: 'fruit', season: 'winter' },
  { id: 'olive', nameKo: '올리브', color: '#6B7340', shade: '#4C532A', mass: 0.4, category: 'fruit', season: 'summer' },
  { id: 'feta', nameKo: '페타치즈', color: '#F4EFE2', shade: '#D5CCB6', mass: 0.9, category: 'dairy', season: 'spring' },
  { id: 'ricotta', nameKo: '리코타', color: '#FAF5EA', shade: '#DED4BE', mass: 1.0, category: 'dairy', season: 'spring' },
  { id: 'chicken-breast', nameKo: '닭가슴살', color: '#E5CBAE', shade: '#BFA184', mass: 2.2, category: 'protein', season: 'spring' },
  { id: 'shrimp', nameKo: '새우', color: '#EE8C6A', shade: '#C2664A', mass: 1.4, category: 'protein', season: 'summer' },
  { id: 'boiled-egg', nameKo: '삶은달걀', color: '#FBF3E2', shade: '#E0D2B4', mass: 1.8, category: 'protein', season: 'spring' },
  { id: 'sweet-potato', nameKo: '고구마', color: '#C2603F', shade: '#96452B', mass: 2.5, category: 'root', season: 'autumn' },
]

export const INGREDIENT_BY_ID = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i]),
) as Record<string, IngredientMeta>

export const SEASON_LABEL: Record<Season, string> = {
  spring: '봄',
  summer: '여름',
  autumn: '가을',
  winter: '겨울',
}

/** 결정적 의사난수 — seed 기반 미세 변형용 */
export function seeded(seed: number, index = 0): number {
  const x = Math.sin(seed * 127.1 + index * 311.7) * 43758.5453
  return x - Math.floor(x)
}
