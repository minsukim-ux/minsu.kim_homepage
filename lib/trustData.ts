/**
 * 인증 · 거래처 · 대외 문구 데이터.
 *
 * ⚠️ 절대 규칙
 * 이 파일에 "확인되지 않은" 인증명·거래처명·연도·수치를 넣지 마라.
 * 식품 표시·광고 규제 대상이며, 사실과 다르면 회사가 책임진다.
 *
 * verified: false 인 항목은 화면에 렌더링되지 않는다.
 * 담당자가 실제 보유 내역을 확인해 값을 채우고 verified: true 로 바꾸면
 * 코드 수정 없이 화면에 나타난다.
 */

export interface TrustClaim {
  /** 내부 식별자 */
  readonly id: string
  /** 화면 표기 문구. 미확정이면 null. */
  readonly text: string | null
  /** 담당자 확인 완료 여부 */
  readonly verified: boolean
  /** 근거 문서·인증서 번호 등 확인 경로 메모 */
  readonly source?: string
}

export interface Certification {
  readonly id: string
  /** 인증 정식 명칭. 미확정이면 null. */
  readonly name: string | null
  /** 인증 기관 */
  readonly authority: string | null
  /** 인증 번호 */
  readonly number: string | null
  /** 유효기간 만료일 (ISO) */
  readonly validUntil: string | null
  readonly verified: boolean
  /** 인증 마크 이미지 경로. 로고 사용 허가 확인 필요. */
  readonly markPath: string | null
}

/**
 * S0 하단 무한 마퀴 문구.
 *
 * 브랜드명·제품 카테고리처럼 사실 확인이 필요 없는 문구만 verified: true.
 * 인증·연혁·빈도 주장은 전부 verified: false 로 두었다.
 */
export const MARQUEE_CLAIMS: readonly TrustClaim[] = [
  { id: 'brand-en', text: 'SWEET BALANCE', verified: true },
  { id: 'brand-kr', text: '㈜스윗밸런스', verified: true },
  { id: 'category-en', text: 'SALAD & READY TO EAT', verified: true },
  { id: 'category-kr', text: '샐러드 · 즉석섭취식품', verified: true },

  // TODO(담당자 확인): 아래는 확인 전까지 화면에 나오지 않는다.
  // 실제 생산 주기를 확인한 뒤 문구를 확정할 것. (예: 매일 생산 여부)
  { id: 'cadence', text: null, verified: false, source: '생산팀 생산계획' },
  // 보유 인증의 정식 명칭만 사용. 임의 축약·유사 표기 금지.
  { id: 'certification', text: null, verified: false, source: '인증서 원본' },
  // 법인 설립연도 또는 브랜드 런칭연도 중 무엇을 쓸지 확정 필요.
  { id: 'since', text: null, verified: false, source: '법인등기부등본' },
] as const

/**
 * S8 TRUST 섹션 인증 목록.
 * ⚠️ 실제 보유 인증만 표기한다. 심사 중·만료 인증은 표기 불가.
 */
export const CERTIFICATIONS: readonly Certification[] = [
  {
    id: 'cert-slot-1',
    name: null,
    authority: null,
    number: null,
    validUntil: null,
    verified: false,
    markPath: null,
  },
  {
    id: 'cert-slot-2',
    name: null,
    authority: null,
    number: null,
    validUntil: null,
    verified: false,
    markPath: null,
  },
  {
    id: 'cert-slot-3',
    name: null,
    authority: null,
    number: null,
    validUntil: null,
    verified: false,
    markPath: null,
  },
] as const

/**
 * S8 거래처 로고 마퀴.
 * ⚠️ 거래처명·로고는 해당 업체의 서면 사용 동의가 있어야 표기할 수 있다.
 */
export const PARTNERS: readonly TrustClaim[] = [
  { id: 'partner-slot-1', text: null, verified: false, source: '로고 사용 동의서' },
  { id: 'partner-slot-2', text: null, verified: false, source: '로고 사용 동의서' },
  { id: 'partner-slot-3', text: null, verified: false, source: '로고 사용 동의서' },
  { id: 'partner-slot-4', text: null, verified: false, source: '로고 사용 동의서' },
] as const

/** 확인 완료된 문구만 통과시킨다. */
export function verifiedText(claims: readonly TrustClaim[]): string[] {
  return claims
    .filter((claim): claim is TrustClaim & { text: string } =>
      Boolean(claim.verified && claim.text),
    )
    .map((claim) => claim.text)
}

/** 미확정 항목 수 — 개발 중 확인용. */
export function countPending(): number {
  return (
    MARQUEE_CLAIMS.filter((c) => !c.verified).length +
    CERTIFICATIONS.filter((c) => !c.verified).length +
    PARTNERS.filter((c) => !c.verified).length
  )
}

/** 외부몰 링크. TODO(담당자 확인): 실제 판매 채널 URL 로 교체. */
export const EXTERNAL_SHOP_URL: string | null = null
