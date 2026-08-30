'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, Flip, ScrollTrigger, EASE } from '@/lib/gsap'
import { prefersReduced } from '@/lib/motion'
import { CATEGORY_LABEL, PRODUCTS, type Product } from '@/lib/products'
import { tick } from '@/lib/sound'

/**
 * 제품 갤러리.
 * - 정렬 그리드 대신 불규칙 배치 + 3단 패럴랙스
 * - 호버: 미세 틸트(±3deg) + 인접 카드 밀림. scale 확대는 하지 않는다
 * - 클릭: FLIP 전체화면 확장 → 상세
 */
export function ProductGallery({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Product | null>(null)

  useGSAP(
    () => {
      const scope = root.current
      if (!scope || prefersReduced()) return

      // 3단 패럴랙스
      gsap.utils.toArray<HTMLElement>('[data-depth]', scope).forEach((el) => {
        const depth = Number(el.dataset.depth ?? 1)
        gsap.to(el, {
          y: -60 * depth,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
        })
      })

      const cards = gsap.utils.toArray<HTMLElement>('[data-product]', scope)
      cards.forEach((card, i) => {
        const enter = () => {
          gsap.to(card, { rotate: i % 2 ? 3 : -3, duration: 0.35, ease: EASE })
          const prev = cards[i - 1]
          const next = cards[i + 1]
          if (prev) gsap.to(prev, { x: -18, duration: 0.4, ease: EASE })
          if (next) gsap.to(next, { x: 18, duration: 0.4, ease: EASE })
          const v = card.querySelector('video')
          v?.play().catch(() => {})
          tick()
        }
        const leave = () => {
          gsap.to([card, cards[i - 1], cards[i + 1]].filter(Boolean), {
            rotate: 0,
            x: 0,
            duration: 0.45,
            ease: EASE,
          })
          const v = card.querySelector('video')
          v?.pause()
        }
        card.addEventListener('pointerenter', enter)
        card.addEventListener('pointerleave', leave)
      })

      // 모바일: 뷰포트 중앙 진입 시 루프 자동 재생
      if (!window.matchMedia('(pointer: fine)').matches) {
        cards.forEach((card) => {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 65%',
            end: 'bottom 35%',
            onToggle: (self) => {
              const v = card.querySelector('video')
              if (!v) return
              if (self.isActive) v.play().catch(() => {})
              else v.pause()
            },
          })
        })
      }
    },
    { scope: root },
  )

  const expand = (sku: string) => {
    const p = PRODUCTS.find((x) => x.sku === sku)
    if (!p) return
    const card = root.current?.querySelector<HTMLElement>(`[data-product="${sku}"]`)
    if (card && !prefersReduced()) {
      const state = Flip.getState(card)
      setOpen(p)
      requestAnimationFrame(() => Flip.from(state, { duration: 0.7, ease: EASE, absolute: true }))
    } else {
      setOpen(p)
    }
  }

  return (
    <div
      ref={root}
      onClick={(e) => {
        const card = (e.target as HTMLElement).closest<HTMLElement>('[data-product]')
        if (card?.dataset.product) expand(card.dataset.product)
      }}
    >
      {children}
      {open ? <Detail product={open} onClose={() => setOpen(null)} /> : null}
    </div>
  )
}

function Detail({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${product.nameKo} 상세`}
      className="fixed inset-0 z-[75] overflow-y-auto bg-paper px-6 py-16 md:px-16"
    >
      <button type="button" onClick={onClose} className="sb-label mb-10 border border-line px-4 py-2">
        닫기
      </button>
      <p className="sb-label mb-4">{CATEGORY_LABEL[product.category]}</p>
      <h3 className="mb-8 text-[clamp(2rem,6vw,4.5rem)] font-bold tracking-[-0.03em]">{product.nameKo}</h3>

      <dl className="mb-10 grid max-w-[560px] grid-cols-2 gap-y-3 text-[15px]">
        <dt className="text-fog">가격</dt>
        <dd>{product.price ?? '준비 중'}</dd>
        <dt className="text-fog">중량</dt>
        <dd>{product.weightG ? `${product.weightG}g` : '준비 중'}</dd>
        <dt className="text-fog">영양성분</dt>
        <dd>{product.nutrition.kcal ? `${product.nutrition.kcal}kcal` : '준비 중'}</dd>
      </dl>

      <p className="mb-10 max-w-[46ch] text-fog">
        주요 재료: {product.ingredients.join(' · ')}
      </p>

      {product.recipeSlug ? (
        <section className="mb-10">
          <p className="sb-label mb-3">이렇게 먹어보세요</p>
          <p className="text-fog">Recipe 시리즈 컷이 준비되면 이 자리에 들어갑니다.</p>
        </section>
      ) : null}

      {product.buyUrl ? (
        <a
          href={product.buyUrl}
          target="_blank"
          rel="noopener"
          className="inline-block border border-primary px-6 py-3 text-primary"
        >
          구매하러 가기
        </a>
      ) : (
        <p className="text-[13px] text-fog">{/* TODO: 외부몰 링크 확인 후 연결 */}판매 링크는 확인 후 연결됩니다.</p>
      )}
    </div>
  )
}
