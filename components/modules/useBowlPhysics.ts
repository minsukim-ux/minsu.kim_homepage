'use client'

import { useCallback, useEffect, useRef, type RefObject } from 'react'
import Matter from 'matter-js'
import { approxFor } from '@/lib/physicsShapes'
import type { IngredientMeta } from '@/lib/ingredients'

const SIZE = 38

/** 빈 볼에 재료가 툭툭 떨어져 쌓이는 물리. 볼 벽은 정적 바디로 만든다. */
export function useBowlPhysics(
  host: RefObject<HTMLDivElement | null>,
  pool: RefObject<HTMLDivElement | null>,
) {
  const engine = useRef<Matter.Engine | null>(null)
  const items = useRef<{ body: Matter.Body; el: HTMLElement }[]>([])

  useEffect(() => {
    const el = host.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    const eng = Matter.Engine.create({ gravity: { x: 0, y: 1, scale: 0.0012 } })
    engine.current = eng

    const opt = { isStatic: true, friction: 0.6 }
    Matter.Composite.add(eng.world, [
      Matter.Bodies.rectangle(w / 2, h - 6, w * 0.62, 12, opt),
      Matter.Bodies.rectangle(w * 0.2, h * 0.72, 14, w * 0.42, { ...opt, angle: -0.5 }),
      Matter.Bodies.rectangle(w * 0.8, h * 0.72, 14, w * 0.42, { ...opt, angle: 0.5 }),
    ])

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
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      items.current.forEach((i) => i.el.remove())
      items.current = []
      Matter.Engine.clear(eng)
    }
  }, [host])

  const clear = useCallback(() => {
    const eng = engine.current
    if (!eng) return
    items.current.forEach((i) => {
      i.el.remove()
      Matter.Composite.remove(eng.world, i.body)
    })
    items.current = []
  }, [])

  const drop = useCallback(
    (meta: IngredientMeta, index: number) => {
      const eng = engine.current
      const el = host.current
      const src = pool.current
      if (!eng || !el || !src) return
      const node = src.querySelector(`[data-pool="${meta.id}"] svg`)
      if (!node) return

      const dom = document.createElement('div')
      dom.style.cssText = `position:absolute;left:0;top:0;width:${SIZE}px;height:${SIZE}px;will-change:transform`
      dom.appendChild(node.cloneNode(true))
      el.appendChild(dom)

      const approx = approxFor(meta.id)
      const s = SIZE / 100
      const x = el.clientWidth / 2 + (index % 5) * 14 - 28
      const body =
        approx.kind === 'rect'
          ? Matter.Bodies.rectangle(x, -40, approx.w * s, approx.h * s)
          : approx.kind === 'poly'
            ? Matter.Bodies.fromVertices(
                x,
                -40,
                [approx.points.map(([px, py]) => ({ x: px * s, y: py * s }))],
                { restitution: 0.15, friction: 0.6 },
              )
            : Matter.Bodies.circle(x, -40, approx.r * s)
      Matter.Body.setMass(body, meta.mass)
      Matter.Composite.add(eng.world, body)
      items.current.push({ body, el: dom })
    },
    [host, pool],
  )

  return { drop, clear }
}
