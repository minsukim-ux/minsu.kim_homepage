'use client'

import { useCallback, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { IngredientIcon } from '@/components/graphics/ingredients'
import { moodLine, nearestIngredients, nearestProducts, rgbToHsl } from '@/lib/colorMatch'
import { useReducedMotion } from '@/lib/useReducedMotion'
import { click } from '@/lib/sound'

const MoodField = dynamic(() => import('./MoodField').then((m) => m.MoodField), { ssr: false })

type Picked = {
  css: string
  ingredients: ReturnType<typeof nearestIngredients>
  products: ReturnType<typeof nearestProducts>
  line: string
}

/** Q. 시리즈의 웹 버전 — 색을 고르면 그 톤의 재료와 제품을 제안한다. */
export function MonthlyMood() {
  const pointer = useRef<[number, number]>([0.5, 0.5])
  const readRef = useRef<((x: number, y: number) => [number, number, number]) | null>(null)
  const [picked, setPicked] = useState<Picked | null>(null)
  const reduce = useReducedMotion()

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    pointer.current = [(e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height]
  }

  const confirm = useCallback(() => {
    const read = readRef.current
    const [px, py] = pointer.current
    const rgb = read ? read(px, py) : ([233, 163, 59] as [number, number, number])
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2])
    click()
    setPicked({
      css: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`,
      ingredients: nearestIngredients(hsl, 3),
      products: nearestProducts(hsl, 3),
      line: moodLine(hsl),
    })
  }, [])

  return (
    <div className="relative">
      <div
        onPointerMove={onMove}
        onClick={confirm}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            confirm()
          }
        }}
        aria-label="오늘의 색 고르기"
        className="relative h-[560px] w-full overflow-hidden"
      >
        {reduce ? (
          <div className="h-full w-full" style={{ background: 'linear-gradient(120deg, var(--sb-cream), var(--sb-amber), var(--sb-terracotta))' }} />
        ) : (
          <MoodField pointer={pointer} onReadColor={(fn) => (readRef.current = fn)} />
        )}

        {picked ? (
          <div
            className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center"
            style={{ background: picked.css }}
          >
            <div>
              <p className="sb-serif text-[clamp(1.4rem,4vw,2.6rem)] text-ink">Q. {picked.line}</p>
              <ul className="mt-8 flex items-end justify-center gap-6">
                {picked.ingredients.map((m) => (
                  <li key={m.id} className="flex flex-col items-center gap-2">
                    <IngredientIcon id={m.id} size={64} seed={m.mass * 100} />
                    <span className="text-[13px] text-ink/70">{m.nameKo}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-8 flex flex-wrap justify-center gap-3">
                {picked.products.map((p) => (
                  <li key={p.sku} className="border border-ink/25 px-4 py-2 text-[15px] text-ink">
                    {p.nameKo}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex items-center gap-4">
        <p className="text-[13px] text-fog">
          {picked ? '색을 다시 고를 수 있습니다.' : '화면 위에서 커서를 움직이고 클릭하면 오늘의 무드가 정해집니다.'}
        </p>
        {picked ? (
          <button type="button" onClick={() => setPicked(null)} className="border border-line px-4 py-2 text-[15px]">
            다시 하기
          </button>
        ) : null}
      </div>
    </div>
  )
}
