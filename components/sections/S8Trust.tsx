import { CERTIFICATIONS, PARTNERS } from '@/lib/trustData'
import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S8 TRUST
 *
 * Phase 1: 확인된 항목만 렌더. 전부 미확정이면 "확인 중" 상태를 정직하게 표시.
 * Phase 5: 인증 마크 도장 애니메이션, 거래처 로고 무한 마퀴.
 *
 * ⚠️ 실제 보유 인증만 표기한다. 심사 중·만료 인증, 유사 표기 모두 불가.
 *    거래처 로고는 서면 사용 동의가 있어야 표기할 수 있다.
 */
export function S8Trust() {
  const certs = CERTIFICATIONS.filter((cert) => cert.verified && cert.name)
  const partners = PARTNERS.filter((partner) => partner.verified && partner.text)

  return (
    <SectionShell
      id="trust"
      index="S8"
      label="인증"
      surface="ink"
      contentClassName="flex min-h-[80svh] flex-col justify-center gap-10 px-5 py-28 sm:px-8"
    >
      <SectionMarker index="S8" label="인증" labelEn="TRUST" />
      <p className="sb-headline max-w-[20ch] font-kr text-page-fg">
        확인할 수 있는 것만 말한다
      </p>

      {certs.length > 0 ? (
        <ul data-cert-list className="flex flex-wrap gap-8">
          {certs.map((cert) => (
            <li key={cert.id} data-cert={cert.id} className="max-w-[24ch]">
              <p className="font-kr text-xl font-bold text-page-fg">
                {cert.name}
              </p>
              {cert.authority ? (
                <p className="sb-eyebrow mt-1 text-page-fg-sub">
                  {cert.authority}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="sb-body max-w-[44ch] text-page-fg-sub">
          보유 인증 정보는 인증서 원본 확인 후 이곳에 표기됩니다. 확인되지 않은
          인증명은 표시하지 않습니다.
        </p>
      )}

      {partners.length > 0 ? (
        <ul className="flex flex-wrap gap-6 text-page-fg-sub">
          {partners.map((partner) => (
            <li key={partner.id} className="font-kr text-lg">
              {partner.text}
            </li>
          ))}
        </ul>
      ) : null}
    </SectionShell>
  )
}
