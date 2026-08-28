import type { Metadata } from 'next'
import { ASSETS, PRODUCT_SLOT_COUNT } from '@/lib/assets'
import { ImageAsset } from '@/components/ui/ImageAsset'
import { SubPageShell } from '@/components/core/SubPageShell'

export const metadata: Metadata = {
  title: '제품 아카이브',
  description: '㈜스윗밸런스가 만드는 샐러드와 즉석섭취식품 라인업입니다.',
}

export default function ProductsPage() {
  return (
    <SubPageShell
      index="P3"
      labelEn="PRODUCTS"
      label="제품 아카이브"
      heading="제품 아카이브"
      lead="제품명·구성·표시사항은 확정 후 연결됩니다. 현재는 촬영이 필요한 슬롯만 표시합니다."
    >
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {Array.from({ length: PRODUCT_SLOT_COUNT }, (_, i) => i + 1).map(
          (slot) => (
            <li key={slot}>
              <ImageAsset
                src={ASSETS.product.still(slot)}
                alt=""
                sizes="(min-width: 768px) 30vw, 50vw"
                className="aspect-4/5 rounded-sm bg-sb-border/40"
              />
              <p className="sb-eyebrow mt-2 text-page-fg-sub">
                <span className="sb-num">{String(slot).padStart(2, '0')}</span>
                <span className="px-2 opacity-40">/</span>제품명 확정 전
              </p>
            </li>
          ),
        )}
      </ul>
    </SubPageShell>
  )
}
