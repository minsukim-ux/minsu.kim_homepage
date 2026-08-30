import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/productData'
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
      lead="제품명·코드·라인은 사내 제품 마스터 기준입니다. 영양성분·가격·판매 채널은 확인 후 연결됩니다."
    >
      <ul className="grid grid-cols-2 gap-8 md:grid-cols-3">
        {PRODUCTS.map((product, i) => (
          <li key={`${product.code ?? 'shot'}-${i}`}>
            <ImageAsset
              src={product.image}
              alt={product.name}
              sizes="(min-width: 768px) 30vw, 50vw"
              className="aspect-4/5"
              imageClassName="object-contain"
              showSpec={false}
            />
            <p className="sb-eyebrow mt-3 flex flex-wrap items-baseline gap-x-2 text-page-fg-sub">
              {product.code ? <span className="sb-num">{product.code}</span> : null}
              <span className="font-kr text-sm tracking-normal text-page-fg">
                {product.name}
              </span>
            </p>
            <p className="sb-eyebrow text-page-fg-sub/80">
              {product.line}
              {product.weight ? ` · ${product.weight}` : ''}
            </p>
          </li>
        ))}
      </ul>
    </SubPageShell>
  )
}
