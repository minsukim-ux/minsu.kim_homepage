'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  bodyPath,
  bowlCaption,
  composeBowl,
  GOAL_LABEL,
  suggestProducts,
  type BowlState,
  type Goal,
} from '@/lib/bowlLogic'
import { INGREDIENTS } from '@/lib/ingredients'
import { IngredientIcon } from '@/components/graphics/ingredients'
import { useBowlPhysics } from './useBowlPhysics'
import { drawShareCard, shareCard } from './bowlShare'
import { tick } from '@/lib/sound'

const GOALS: Goal[] = ['light', 'keep', 'hearty']

export function BowlBuilder() {
  const [state, setState] = useState<BowlState>({ body: 0.35, activity: 0.5, goal: 'keep' })
  const [msg, setMsg] = useState('')
  const host = useRef<HTMLDivElement>(null)
  const pool = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLCanvasElement>(null)
  const { drop, clear } = useBowlPhysics(host, pool)

  const items = useMemo(() => composeBowl(state), [state])
  const products = useMemo(() => suggestProducts(state), [state])
  const path = bodyPath(state.body)

  useEffect(() => {
    clear()
    let i = 0
    const id = window.setInterval(() => {
      if (i >= items.length) {
        window.clearInterval(id)
        return
      }
      drop(items[i], i)
      i += 1
    }, 110)
    return () => window.clearInterval(id)
  }, [items, drop, clear])

  const onShare = async () => {
    if (!card.current) return
    drawShareCard(card.current, state, items)
    const r = await shareCard(card.current, bowlCaption(state))
    setMsg(r === 'shared' ? '공유했습니다.' : '카드를 저장했습니다.')
  }

  return (
    <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
      <div className="grid grid-cols-[auto_1fr] items-center gap-8">
        {/* 실루엣 — 단계 전환이 아니라 path 수치 보간으로 연속 변형된다 */}
        <svg viewBox="0 0 100 100" className="h-[320px] w-[220px]" role="img" aria-label="체형 실루엣">
          <path d={path} fill="var(--sb-primary)" opacity="0.9" />
        </svg>

        {/* 빈 볼에 재료가 쌓인다 */}
        {/* 볼 외곽선은 물리 벽(바닥 y=98%, 좌우 20%/80%)과 같은 좌표로 그린다 */}
        <div className="relative h-[360px] overflow-hidden" ref={host} aria-hidden>
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <path
              d="M18 40 Q18 98 50 98 Q82 98 82 40"
              fill="none"
              stroke="rgba(42,36,30,0.35)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Slider
          label="체형"
          value={state.body}
          marks={['일반형', '탄탄형', '근육형']}
          onChange={(body) => {
            tick()
            setState((s) => ({ ...s, body }))
          }}
        />
        <Slider
          label="활동량"
          value={state.activity}
          marks={['적게', '보통', '많이']}
          onChange={(activity) => {
            tick()
            setState((s) => ({ ...s, activity }))
          }}
        />

        <fieldset>
          <legend className="sb-label mb-3">목표</legend>
          <div className="flex gap-3">
            {GOALS.map((g) => (
              <button
                key={g}
                type="button"
                aria-pressed={state.goal === g}
                onClick={() => {
                  tick()
                  setState((s) => ({ ...s, goal: g }))
                }}
                className={`border px-4 py-2 text-[15px] transition-colors ${
                  state.goal === g ? 'border-primary bg-primary text-paper' : 'border-line text-ink'
                }`}
              >
                {GOAL_LABEL[g]}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <p className="sb-label mb-3">담긴 재료</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[15px] text-fog">
            {items.map((m, i) => (
              <li key={`${m.id}-${i}`}>{m.nameKo}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="sb-label mb-3">이런 제품과 가깝습니다</p>
          <ul className="flex flex-wrap gap-4">
            {products.map((p) => (
              <li key={p.sku} className="border border-line px-4 py-2 text-[15px]">
                {p.nameKo}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[13px] text-fog">취향 조합 제안입니다. 건강 효과를 약속하지 않습니다.</p>
        </div>

        <div className="flex items-center gap-4">
          <button type="button" onClick={onShare} className="border border-primary px-5 py-3 text-primary">
            공유 카드 만들기
          </button>
          <span aria-live="polite" className="text-[13px] text-fog">
            {msg}
          </span>
        </div>
      </div>

      <canvas ref={card} className="sr-only" aria-hidden />
      <div ref={pool} aria-hidden className="pointer-events-none fixed left-0 top-0 h-0 w-0 overflow-hidden">
        {INGREDIENTS.map((i, idx) => (
          <span key={i.id} data-pool={i.id}>
            <IngredientIcon id={i.id} size={38} seed={idx * 5} />
          </span>
        ))}
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  marks,
  onChange,
}: {
  label: string
  value: number
  marks: string[]
  onChange: (v: number) => void
}) {
  return (
    <div>
      <label className="sb-label mb-3 block">
        {label}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="mt-3 block w-full accent-[color:var(--sb-terracotta)]"
        />
      </label>
      <div className="flex justify-between text-[13px] text-fog">
        {marks.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>
    </div>
  )
}
