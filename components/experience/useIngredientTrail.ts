'use client'

import { useEffect, useMemo, useRef, type RefObject } from 'react'
import Matter from 'matter-js'
import { INGREDIENTS } from '@/lib/ingredients'
import { approxFor } from '@/lib/physicsShapes'

const MAX = 40
const SIZE = 34

type Item = { body: Matter.Body; el: HTMLElement }

/**
 * 커서 궤적에서 스폰된 재료를 Matter.js로 낙하시키고 하단에 쌓는다.
 * 스크롤하면 아래로 빨려 들어간다.
 */
export function useIngredientTrail(
  stage: RefObject<HTMLDivElement | null>,
  pool: RefObject<HTMLDivElement | null>,
) {
  const items = useRef<Item[]>([])
  const engine = useRef<Matter.Engine | null>(null)

  useEffect(() => {
    const eng = Matter.Engine.create({ gravity: { x: 0, y: 1.1, scale: 0.0011 } })
    engine.current = eng

    const w = () => window.innerWidth
    const h = () => window.innerHeight
    const walls = [
      Matter.Bodies.rectangle(w() / 2, h() + 30, w() * 2, 60, { isStatic: true }),
      Matter.Bodies.rectangle(-30, h() / 2, 60, h() * 2, { isStatic: true }),
      Matter.Bodies.rectangle(w() + 30, h() / 2, 60, h() * 2, { isStatic: true }),
    ]
    Matter.Composite.add(eng.world, walls)

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

    // 스크롤하면 아래로 빨려 들어간다
    const onScroll = () => {
      for (const it of items.current) {
        Matter.Body.setVelocity(it.body, { x: it.body.velocity.x, y: it.body.velocity.y + 3 })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const onResize = () => {
      Matter.Body.setPosition(walls[0], { x: w() / 2, y: h() + 30 })
      Matter.Body.setPosition(walls[2], { x: w() + 30, y: h() / 2 })
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      items.current.forEach((it) => it.el.remove())
      items.current = []
      Matter.Engine.clear(eng)
    }
  }, [])

  return useMemo(
    () => ({
      spawn(x: number, y: number, burst = false) {
        const eng = engine.current
        const host = stage.current
        const src = pool.current
        if (!eng || !host || !src) return

        const meta = INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)]
        const node = src.querySelector(`[data-pool="${meta.id}"] svg`)
        if (!node) return
        const el = document.createElement('div')
        el.style.cssText = `position:absolute;left:0;top:0;width:${SIZE}px;height:${SIZE}px;will-change:transform`
        el.appendChild(node.cloneNode(true))
        host.appendChild(el)

        const approx = approxFor(meta.id)
        const scale = SIZE / 100
        const body =
          approx.kind === 'rect'
            ? Matter.Bodies.rectangle(x, y, approx.w * scale, approx.h * scale)
            : approx.kind === 'poly'
              ? Matter.Bodies.fromVertices(
                  x,
                  y,
                  [approx.points.map(([px, py]) => ({ x: px * scale, y: py * scale }))],
                  { restitution: 0.25, friction: 0.4 },
                )
              : Matter.Bodies.circle(x, y, approx.r * scale)

        Matter.Body.setMass(body, meta.mass)
        Matter.Body.setVelocity(body, {
          x: (Math.random() - 0.5) * (burst ? 9 : 2),
          y: burst ? -6 - Math.random() * 4 : Math.random() * 2,
        })
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.3)
        Matter.Composite.add(engine.current!.world, body)
        items.current.push({ body, el })

        while (items.current.length > MAX) {
          const old = items.current.shift()
          if (!old) break
          old.el.remove()
          Matter.Composite.remove(eng.world, old.body)
        }
      },
    }),
    [stage, pool],
  )
}
