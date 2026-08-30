/**
 * 브랜드 상수.
 * 아래 값은 전부 외부 공개자료 기반이며, 확정 전 사내 확인이 필요하다.
 * 여기에 없는 연혁/수치/수상이력은 절대 추가하지 말 것.
 */

export const BRAND = {
  nameKo: '스윗밸런스', // 확인필요
  nameEn: 'Sweet Balance', // 확인필요
  legalKo: '주식회사 스윗밸런스', // 확인필요
  message: '건강해지는 즐거움', // 확인필요
  category: '채소 기반 간편식', // 확인필요 — '샐러드 전문'이 아님에 유의
} as const

export type Milestone = {
  year: string
  month: string
  /** 서사에 쓰이는 숫자. 없으면 null */
  figure: string | null
  place: string
  line: string
}

/** S1 STATEMENT 서사 뼈대. 형용사 없이 숫자와 장소만. */
export const MILESTONES: Milestone[] = [
  {
    year: '2014',
    month: '10',
    figure: '100,000',
    place: '서울대학교 연못 앞',
    line: '10만원으로 시작했다.', // 확인필요 — 창업동아리 "10만원 프로젝트"
  },
  {
    year: '2015',
    month: '10',
    figure: null,
    place: '샤로수길',
    line: '세탁소 자리에 첫 매장을 열었다.', // 확인필요
  },
  {
    year: '2017',
    month: '07',
    figure: null,
    place: '서울',
    line: '법인을 세웠다.', // 확인필요
  },
  {
    year: '',
    month: '',
    figure: '20',
    place: '전국',
    line: '지금 매장은 20여 개.', // 확인필요 — 정확한 매장 수 갱신 필요
  },
]

/** 브랜드가 이미 운용 중인 에디토리얼 포맷 3종 */
export const EDITORIAL_SERIES = [
  { id: 'about', label: 'ABOUT', desc: '원물 매크로 + 대문자 타이포' }, // 확인필요
  { id: 'recipe', label: 'Recipe', desc: '세리프 타원 프레임 + 요리 컷' }, // 확인필요
  { id: 'monthly', label: 'Q.', desc: '월간 인물 + 미니멀 타이포' }, // 확인필요
] as const

/** 외부 링크. 실제 URL 확인 전까지 null 유지. */
export const LINKS = {
  instagram: null as string | null, // TODO: 공식 계정 URL 확인 후 입력
  shop: null as string | null, // TODO
} as const
