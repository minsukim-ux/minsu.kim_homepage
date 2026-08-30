'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { INGREDIENTS } from '@/lib/ingredients'
import { IngredientIcon } from '@/components/graphics/ingredients'
import { approxFor } from '@/lib/physicsShapes'
import { mockIssuer, type Coupon } from '@/lib/coupon'
import { click, whoosh } from '@/lib/sound'

const SIZE = 34
const LIMIT = 0.42 // rad — 이 각도를 넘으면 쏟아진다

type Phase = 'ready' | 'playing' | 'over'

/**
 * BALANCE GAME — 브랜드명이 곧 규칙.
 * 좁은 받침 위 판에 재료를 쌓되 기울기를 무너뜨리지 않아야 한다.
 * 재료마다 mass가 다르므로 "무거운 건 가운데"를 플레이어가 스스로 발견한다.
 */
export function BalanceGame() {
  const host = useRef<HTMLDivElement>(null)
  const pool = useRef<HTMLDivElement>(null)
  const world = useRef<{ eng: Matter.Engine; plank: Matter.Body } | null>(null)
  const items = useRef<{ body: Matter.Body; el: HTMLElement }[]>([])
  const dropX = useRef(0.5)

  const [phase, setPhase] = useState<Phase>('ready')
  const [score, setScore] = useState(0)
  const [tilt, setTilt] = useState(0)
  const [next, setNext] = useState(INGREDIENTS[0])
  const [coupon, setCoupon] = useState<Coupon | null>(null)
  const [couponNote, setCouponNote] = useState('')

  const spawn = useCallback(() => {
    const w = world.current
    const el = host.current
    const src = pool.current
    if (!w || !el || !src) return
    const meta = next
    const node = src.querySelector(`[data-pool="${meta.id}"] svg`)
    if (!node) return

    const dom = document.createElement('div')
    dom.style.cssText = `position:absolute;left:0;top:0;width:${SIZE}px;height:${SIZE}px;will-change:transform`
    dom.appendChild(node.cloneNode(true))
    el.appendChild(dom)

    const approx = approxFor(meta.id)
    const s = SIZE / 100
    const x = dropX.current * el.clientWidth
    const body =
      approx.kind === 'rect'
        ? Matter.Bodies.rectangle(x, 20, approx.w * s, approx.h * s, { friction: 0.9 })
        : approx.kind === 'poly'
          ? Matter.Bodies.fromVertices(
              x,
              20,
              [approx.points.map(([px, py]) => ({ x: px * s, y: py * s }))],
              { friction: 0.9, restitution: 0.02 },
            )
          : Matter.Bodies.circle(x, 20, approx.r * s, { friction: 0.9 })
    Matter.Body.setMass(body, meta.mass * 2)
    Matter.Composite.add(w.eng.world, body)
    items.current.push({ body, el: dom })
    setScore((n) => n + 1)
    setNext(INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)])
    click()
  }, [next])

  const reset = useCallback(() => {
    const w = world.current
    if (!w) return
    items.current.forEach((i) => {
      i.el.remove()
      Matter.Composite.remove(w.eng.world, i.body)
    })
    items.current = []
    Matter.Body.setAngle(w.plank, 0)
    Matter.Body.setAngularVelocity(w.plank, 0)
    Matter.Body.setPosition(w.plank, { x: (host.current?.clientWidth ?? 600) / 2, y: 300 })
    setScore(0)
    setTilt(0)
    setCoupon(null)
    setCouponNote('')
    setPhase('playing')
  }, [])

  useEffect(() => {
    const el = host.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    const eng = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0013 } })

    // 좁은 받침 + 그 위에서 회전하는 판
    const pivot = { x: w / 2, y: h - 90 }
    const plank = Matter.Bodies.rectangle(pivot.x, pivot.y, w * 0.42, 14, { friction: 1, density: 0.004 })
    Matter.Composite.add(eng.world, [
      plank,
      Matter.Constraint.create({
        pointA: pivot,
        bodyB: plank,
        pointB: { x: 0, y: 0 },
        stiffness: 1,
        length: 0,
      }),
      Matter.Bodies.rectangle(w / 2, h + 40, w * 3, 80, { isStatic: true }),
    ])
    world.current = { eng, plank }

    let raf = 0
    let prev = performance.now()
    const step = (now: number) => {
      Matter.Engine.update(eng, Math.min(now - prev, 16.666))
      prev = now
      for (const it of items.current) {
        it.el.style.transform = `translate3d(${it.body.position.x - SIZE / 2}px, ${
          it.body.position.y - SIZE / 2
        }px, 0) rotate(${it.body.angle}rad)`
      }
      const plankEl = el.querySelector<HTMLElement>('[data-plank]')
      if (plankEl) {
        plankEl.style.transform = `translate3d(${plank.position.x - w * 0.21}px, ${
          plank.position.y - 7
        }px, 0) rotate(${plank.angle}rad)`
      }
      setTilt(plank.angle)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      items.current.forEach((i) => i.el.remove())
      items.current = []
      Matter.Engine.clear(eng)
      world.current = null
    }
  }, [])

  // 기울기가 임계치를 넘으면 게임 오버
  useEffect(() => {
    if (phase !== 'playing') return
    if (Math.abs(tilt) > LIMIT) {
      setPhase('over')
      whoosh()
      if (score >= 8) {
        void mockIssuer.issue(score).then((c) => {
          setCoupon(c)
          // 발급은 아직 mock — 실제 연동 전까지 코드를 만들어내지 않는다
          if (!c) setCouponNote('쿠폰 발급은 준비 중입니다.')
        })
      }
    }
  }, [tilt, phase, score])

  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    dropX.current = Math.min(0.9, Math.max(0.1, (e.clientX - r.left) / r.width))
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') dropX.current = Math.max(0.1, dropX.current - 0.06)
    if (e.key === 'ArrowRight') dropX.current = Math.min(0.9, dropX.current + 0.06)
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (phase === 'playing') spawn()
      else reset()
    }
  }

  const gauge = Math.min(1, Math.abs(tilt) / LIMIT)

  return (
    <div>
      <div
        ref={host}
        role="application"
        tabIndex={0}
        aria-label="밸런스 게임. 좌우 화살표로 위치를 옮기고 엔터로 재료를 놓습니다."
        onPointerMove={onPointer}
        onKeyDown={onKey}
        onClick={() => (phase === 'playing' ? spawn() : reset())}
        className="relative h-[520px] w-full overflow-hidden border border-line bg-paper/60"
      >
        <div data-plank className="absolute left-0 top-0 h-[14px] w-[42%] bg-ink/85" style={{ willChange: 'transform' }} />
        <div className="absolute bottom-0 left-1/2 h-[90px] w-[10px] -translate-x-1/2 bg-ink/30" />
        {phase !== 'playing' ? (
          <div className="absolute inset-0 grid place-items-center bg-paper/80 text-center">
            <div>
              <p className="sb-serif mb-3 text-[clamp(1.4rem,4vw,2.4rem)]">
                {phase === 'ready' ? 'Balance Game' : `${score}개에서 무너졌습니다`}
              </p>
              <p className="mb-6 text-fog">무거운 재료와 가벼운 재료가 있습니다. 어디에 둘지는 직접 찾습니다.</p>
              {coupon ? (
                <p className="sb-serif text-primary">{coupon.label}</p>
              ) : couponNote ? (
                <p className="text-[13px] text-fog">{couponNote}</p>
              ) : null}
              <span className="mt-4 inline-block border border-primary px-5 py-3 text-primary">
                {phase === 'ready' ? '시작하기' : '다시 하기'}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-5 flex items-center gap-5">
        <p className="sb-label">기울기</p>
        <div className="h-[6px] flex-1 bg-line">
          <div
            className="h-full transition-[width,background-color] duration-150"
            style={{ width: `${gauge * 100}%`, background: gauge > 0.7 ? 'var(--sb-tomato)' : 'var(--sb-olive)' }}
          />
        </div>
        <p className="sb-label">쌓은 개수 {score}</p>
        <p className="sb-label">다음 {next.nameKo}</p>
      </div>

      <div ref={pool} aria-hidden className="pointer-events-none fixed left-0 top-0 h-0 w-0 overflow-hidden">
        {INGREDIENTS.map((i, idx) => (
          <span key={i.id} data-pool={i.id}>
            <IngredientIcon id={i.id} size={SIZE} seed={idx * 11} />
          </span>
        ))}
      </div>
    </div>
  )
}
