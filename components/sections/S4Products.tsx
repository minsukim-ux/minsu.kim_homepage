import { PRODUCT_SLOT_COUNT, ASSETS } from '@/lib/assets'
import { ImageAsset } from '@/components/ui/ImageAsset'
import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S4 PRODUCTS
 *
 * Phase 1: 불규칙 배치 그리드 + 이미지 슬롯.
 * Phase 5: 3단 패럴랙스, 호버 루프 영상, FLIP 전체화면 확장.
 *
 * ⚠️ 제품명·가격·영양성분은 확정 전까지 넣지 않는다.
 *    슬롯 번호만으로 레이아웃을 검증한다.
 */

/** 패럴랙스 레이어(1~3). 스크롤 시 서로 다른 속도로 움직인다. */
const SLOT_LAYOUT = [
  { layer: 1, span: 'md:col-span-5 md:mt-0' },
  { layer: 3, span: 'md:col-span-4 md:col-start-8 md:mt-24' },
  { layer: 2, span: 'md:col-span-4 md:col-start-2 md:mt-16' },
  { layer: 1, span: 'md:col-span-5 md:col-start-7 md:mt-0' },
  { layer: 3, span: 'md:col-span-3 md:col-start-1 md:mt-20' },
  { layer: 2, span: 'md:col-span-5 md:col-start-6 md:mt-8' },
] as const

export function S4Products() {
  return (
    <SectionShell
      id="products"
      index="S4"
      label="제품"
      surface="light"
      contentClassName="px-5 py-28 sm:px-8"
    >
      <div className="flex flex-col gap-4">
        <SectionMarker index="S4" label="제품" labelEn="PRODUCTS" />
        <p className="sb-headline max-w-[18ch] font-kr text-page-fg">
          제품 아카이브
        </p>
      </div>

      <ul
        data-product-grid
        className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-12 md:gap-x-6 md:gap-y-20"
      >
        {Array.from({ length: PRODUCT_SLOT_COUNT }, (_, i) => i + 1).map(
          (slot) => {
            const layout = SLOT_LAYOUT[slot - 1]
            return (
              <li
                key={slot}
                data-product-slot={slot}
                data-parallax-layer={layout?.layer ?? 2}
                className={layout?.span ?? ''}
              >
                <article className="group flex flex-col gap-3">
                  <ImageAsset
                    src={ASSETS.product.still(slot)}
                    alt=""
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="aspect-4/5 rounded-sm bg-sb-border/40"
                  />
                  <p className="sb-eyebrow text-page-fg-sub">
                    <span className="sb-num">
                      {String(slot).padStart(2, '0')}
                    </span>
                    <span className="px-2 opacity-40">/</span>
                    제품명 확정 전
                  </p>
                </article>
              </li>
            )
          },
        )}
      </ul>

      <p className="sb-body mt-16 max-w-[46ch] text-page-fg-sub">
        구매는 외부 판매 채널에서 진행됩니다. 판매 채널 링크는 확정 후
        연결됩니다.
      </p>
    </SectionShell>
  )
}
