import { Section } from './Section'
import { Framed } from '@/components/media/Framed'
import { productPhoto } from '@/lib/assets'
import { CATEGORY_LABEL, PRODUCTS, type ProductCategory } from '@/lib/products'

const ORDER: ProductCategory[] = ['salad', 'wrap', 'noodle', 'side']

export function S4Products() {
  return (
    <Section id="products" label="Products" title="샐러드만 만들지 않는다" bg="var(--sb-cream)">
      {ORDER.map((cat) => (
        <div key={cat} data-product-category={cat} className="mb-20">
          <h3 className="sb-label mb-6">{CATEGORY_LABEL[cat]}</h3>
          <div className="flex flex-wrap gap-10">
            {PRODUCTS.filter((p) => p.category === cat).map((p, i) => (
              <article key={p.sku} data-product={p.sku} style={{ marginTop: i % 2 ? 36 : 0 }}>
                <Framed
                  src={productPhoto(p.sku)}
                  alt={`${p.nameKo} 제품 컷`}
                  fallbackIngredient={p.ingredients[0]}
                  caption={p.nameKo}
                  width={360}
                  ratio={1}
                />
                <p className="mt-2 text-[13px] text-fog">
                  {/* 가격·중량·영양성분 미확정 */}
                  가격 정보 준비 중
                </p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </Section>
  )
}
