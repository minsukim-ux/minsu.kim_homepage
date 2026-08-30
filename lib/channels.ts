/**
 * 판매 채널 플레이스홀더.
 * ⚠️ 실제 입점 여부를 확인하기 전에는 링크를 넣지 말 것.
 * 확인되지 않은 채널을 새로 추가하지 말 것.
 */
export type Channel = {
  id: string
  nameKo: string
  /** 마퀴에서 사용할 브랜드 색. 확인 전까지 중립 톤 */
  color: string
  url: string | null // TODO: 실제 입점 페이지 확인 후 입력
  verified: false // TODO: 확인되면 true로
}

export const CHANNELS: Channel[] = [
  { id: 'kurly', nameKo: '컬리', color: '#8A4E86', url: null, verified: false },
  { id: 'coupang', nameKo: '쿠팡', color: '#E0523A', url: null, verified: false },
  { id: 'gs25', nameKo: 'GS25', color: '#00614E', url: null, verified: false },
  { id: 'emart', nameKo: '이마트', color: '#E9A33B', url: null, verified: false },
  { id: 'costco', nameKo: '코스트코', color: '#C2472F', url: null, verified: false },
  { id: 'kakao-makers', nameKo: '카카오메이커스', color: '#7C8B4E', url: null, verified: false },
  { id: 'oliveyoung', nameKo: '올리브영', color: '#4CAF82', url: null, verified: false },
]
