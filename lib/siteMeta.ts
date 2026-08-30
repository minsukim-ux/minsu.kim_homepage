/**
 * 사이트 메타 정보.
 *
 * ⚠️ 주소·전화번호·사업자번호·설립연도처럼 확인이 필요한 정보는 넣지 않는다.
 *    JSON-LD 에 잘못된 정보를 넣으면 검색 결과에 그대로 노출된다.
 */

/** 배포 도메인. 확정 후 NEXT_PUBLIC_SITE_URL 로 주입한다. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? null

export const SITE_NAME = '㈜스윗밸런스'
export const SITE_NAME_EN = 'Sweet Balance'

export const SITE_DESCRIPTION =
  '샐러드와 즉석섭취식품을 만드는 ㈜스윗밸런스의 제조 공정과 제품을 소개합니다.'

/**
 * JSON-LD Organization + FoodEstablishment.
 * 확인된 값만 포함한다. null 필드는 아예 출력하지 않는다.
 */
export function buildOrganizationJsonLd() {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'FoodEstablishment'],
    name: SITE_NAME,
    alternateName: SITE_NAME_EN,
    description: SITE_DESCRIPTION,
    // TODO(담당자 확인): 아래 항목은 확인된 값이 있을 때만 추가한다.
    //   address, telephone, foundingDate, vatID, logo, sameAs(공식 채널)
  }

  if (SITE_URL) base.url = SITE_URL

  return base
}
