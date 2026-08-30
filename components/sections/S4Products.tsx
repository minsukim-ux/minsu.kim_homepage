import { PRODUCTS, PRODUCT_LINES } from '@/lib/productData'
import { ImageAsset } from '@/components/ui/ImageAsset'
import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S4 PRODUCTS
 *
 * 제품명·코드·라인은 사내 제품 마스터 기준(lib/productData.ts).
 * 제품컷은 사내 원본 누끼를 웹용으로 최적화해 /public/assets/product 에 둔다.
 *
 * Phase 5: 3단 패럴랙스, 자동 틸트, FLIP 전체화면 확장.
 */
const LAYOUT = [
  'md:col-span-4',
  'md:col-span-4 md:col-start-9 md:mt-24',
  'md:col-span-4 md:col-start-3 md:mt-16',
  'md:col-span-4 md:col-start-8',
  'md:col-span-3 md:col-start-1 md:mt-20',
  'md:col-span-4 md:col-start-6 md:mt-8',
  'md:col-span-4 md:col-start-2 md:mt-10',
  'md:col-span-4 md:col-start-9 md:mt-20',
  'md:col-span-5 md:col-start-5 md:mt-12',
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
        className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-12 md:gap-y-20"
      >
        {PRODUCTS.map((product, i) => (
          <li
            key={`${product.code ?? 'shot'}-${i}`}
            data-product-slot={i + 1}
            data-parallax-layer={(i % 3) + 1}
            className={LAYOUT[i] ?? ''}
          >
            <article className="flex flex-col gap-3">
              <ImageAsset
                src={product.image}
                alt={product.name}
                sizes="(min-width: 768px) 34vw, 100vw"
                className="aspect-4/5 max-h-[52vh]"
                imageClassName="object-contain drop-shadow-[0_22px_30px_rgba(0,0,0,0.28)]"
                showSpec={false}
              />
              <p className="sb-eyebrow flex flex-wrap items-baseline gap-x-3 text-page-fg-sub">
                {product.code ? <span className="sb-num">{product.code}</span> : null}
                <span className="font-kr text-sm tracking-normal text-page-fg">
                  {product.name}
                </span>
                <span className="opacity-70">
                  {product.line}
                  {product.weight ? ` · ${product.weight}` : ''}
                </span>
              </p>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-24 flex flex-col gap-4">
        <p className="sb-eyebrow text-page-fg-sub">PRODUCT LINES · 브랜드 라인</p>
        <p className="sb-headline max-w-[20ch] font-kr text-page-fg">
          밸런스를 라인으로 나눈다
        </p>
        <ul className="mt-6 flex flex-col">
          {PRODUCT_LINES.map((line) => (
            <li
              key={line.en}
              className="flex items-baseline gap-4 border-b border-sb-border py-3"
            >
              <span className="font-kr text-lg font-bold text-page-fg sm:text-2xl">
                {line.name}
              </span>
              <span className="sb-eyebrow text-page-fg-sub">{line.en}</span>
              <span className="sb-num ml-auto text-sm text-page-fg-sub">
                {line.count}
              </span>
            </li>
          ))}
        </ul>
        <p className="sb-body mt-6 max-w-[46ch] text-page-fg-sub">
          운영중 품목 수 기준입니다. 구매는 외부 판매 채널에서 진행되며, 채널
          링크는 확정 후 연결됩니다.
        </p>
      </div>
    </SectionShell>
  )
}
