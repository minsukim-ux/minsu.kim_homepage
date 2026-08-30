import type { Metadata } from 'next'
import { SubPageShell } from '@/components/core/SubPageShell'

export const metadata: Metadata = {
  title: '브랜드 스토리',
  description:
    '㈜스윗밸런스가 샐러드와 즉석섭취식품을 어떤 기준으로 만드는지 소개합니다.',
}

export default function BrandPage() {
  return (
    <SubPageShell
      index="P1"
      labelEn="BRAND"
      label="브랜드 스토리"
      heading="기준을 먼저 정한다"
      lead="브랜드 서사는 확정된 내용으로 Phase 2 이후 채웁니다. 지어낸 연혁이나 수치는 넣지 않습니다."
    />
  )
}
