/**
 * BALANCE GAME 성공 보상 쿠폰.
 * ⚠️ 실제 발급 로직 하드코딩 금지. 인터페이스만 정의하고 mock으로 둔다.
 */
export type Coupon = {
  code: string
  label: string
  /** 사용처 외부몰 링크. 확인 전까지 null */
  url: string | null
  expiresAt: string | null
}

export interface CouponIssuer {
  issue(score: number): Promise<Coupon | null>
}

export const mockIssuer: CouponIssuer = {
  // TODO: 실제 쿠폰 발급 API 연동. 지금은 항상 null을 반환한다.
  async issue() {
    return null
  },
}
