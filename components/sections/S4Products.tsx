import { Framed } from '@/components/media/Framed'
import { productPhoto } from '@/lib/assets'
import { CATEGORY_LABEL, PRODUCTS, type ProductCategory } from '@/lib/products'
import { ProductGallery } from '@/components/modules/ProductGallery'
import { PaperTexture } from '@/components/graphics/textures'

/** 카테고리마다 배경 토큰이 다르다 — BgFlow가 사이를 연속 보간한다 */
const BLOCKS: { cat: ProductCategory; bg: string }[] = [
  { cat: 'salad', bg: 'salad' },
  { cat: 'wrap', bg: 'wrap' },
  { cat: 'noodle', bg: 'noodle' },
  { cat: 'side', bg: 'side' },
]

const OFFSETS = [0, 96, 40, 132, 16]

export function S4Products() {
  return (
    <ProductGallery>
      {BLOCKS.map(({ cat, bg }, bi) => (
        <section
          key={cat}
          id={bi === 0 ? 'products' : undefined}
          data-bg={bg}
          data-product-category={cat}
          className={`relative w-full overflow-hidden px-6 md:px-12 ${bi === 0 ? 'py-24 md:py-32' : 'py-16 md:py-24'}`}
        >
          <PaperTexture opacity={0.25} />
          <div className="relative mx-auto w-full max-w-[1440px]">
            {bi === 0 ? (
              <>
                <p className="sb-label mb-6">Products</p>
                <h2 className="mb-16 max-w-[18ch] text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.03em]">
                  샐러드만 만들지 않는다
                </h2>
              </>
            ) : null}

            <p className="sb-label sticky top-6 z-10 mb-10">{CATEGORY_LABEL[cat]}</p>

            <ul className="flex flex-wrap items-start gap-12 md:gap-16">
              {PRODUCTS.filter((p) => p.category === cat).map((p, i) => (
                <li
                  key={p.sku}
                  data-depth={(i % 3) + 1}
                  style={{ marginTop: OFFSETS[i % OFFSETS.length] }}
                >
                  <button
                    type="button"
                    data-product={p.sku}
                    className="block text-left"
                    aria-label={`${p.nameKo} 상세 보기`}
                  >
                    <Framed
                      src={productPhoto(p.sku)}
                      alt={`${p.nameKo} 제품 컷`}
                      fallbackIngredient={p.ingredients[0]}
                      caption={p.nameKo}
                      width={i % 3 === 0 ? 420 : 340}
                      ratio={i % 2 ? 1 : 4 / 5}
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </ProductGallery>
  )
}
