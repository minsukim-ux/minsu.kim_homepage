'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { INGREDIENTS } from '@/lib/ingredients'
import { IngredientIcon } from '@/components/graphics/ingredients'

type Props = { count: number; textures: THREE.Texture[] }

function Cloud({ count, textures }: Props) {
  const group = useRef<THREE.Group>(null)
  const { viewport } = useThree()

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        t: textures[i % Math.max(1, textures.length)],
        p: new THREE.Vector3(
          (Math.random() - 0.5) * 13,
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 17,
        ),
        s: 0.45 + Math.random() * 0.6,
        r: Math.random() * Math.PI,
      })),
    [count, textures],
  )

  useFrame((state, dt) => {
    const g = group.current
    if (!g) return
    const mx = state.pointer.x * viewport.width * 0.5
    const my = state.pointer.y * viewport.height * 0.5
    g.rotation.y += dt * 0.03
    g.children.forEach((child, i) => {
      const base = seeds[i]
      // 커서 근처 재료는 밀려난다
      const dx = child.position.x - mx
      const dy = child.position.y - my
      const d = Math.hypot(dx, dy)
      const push = Math.max(0, 1 - d / 3)
      child.position.x += (base.p.x + (dx / (d || 1)) * push * 2.2 - child.position.x) * 0.06
      child.position.y += (base.p.y + (dy / (d || 1)) * push * 2.2 - child.position.y) * 0.06
      child.rotation.z = base.r + state.clock.elapsedTime * 0.12
    })
  })

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <sprite key={i} position={s.p} scale={[s.s, s.s, s.s]}>
          <spriteMaterial map={s.t} transparent depthWrite={false} />
        </sprite>
      ))}
    </group>
  )
}

function Rig() {
  const { camera } = useThree()
  useFrame(() => {
    const y = window.scrollY
    const el = document.getElementById('field')
    if (!el) return
    const r = el.getBoundingClientRect()
    const p = Math.max(0, Math.min(1, 1 - (r.top + r.height / 2) / window.innerHeight))
    // 스크롤하면 카메라가 필드를 관통한다
    camera.position.z = 9.5 - p * 11
    camera.updateProjectionMatrix()
    void y
  })
  return null
}

/** SVG 재료를 텍스처로 구워 3D 공간에 부유시킨다. 사진 미사용 → 해상도 무관. */
export function IngredientField({ lite = false }: { lite?: boolean }) {
  const pool = useRef<HTMLDivElement>(null)
  const [textures, setTextures] = useState<THREE.Texture[]>([])

  useEffect(() => {
    const src = pool.current
    if (!src) return
    let alive = true
    const nodes = Array.from(src.querySelectorAll('svg'))
    const loaded: THREE.Texture[] = []
    nodes.forEach((node) => {
      const clone = node.cloneNode(true) as SVGElement
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
      clone.setAttribute('width', '128')
      clone.setAttribute('height', '128')
      const url = `data:image/svg+xml;utf8,${encodeURIComponent(new XMLSerializer().serializeToString(clone))}`
      const img = new Image()
      img.onload = () => {
        if (!alive) return
        const t = new THREE.Texture(img)
        t.needsUpdate = true
        loaded.push(t)
        if (loaded.length === nodes.length) setTextures([...loaded])
      }
      img.src = url
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <>
      <div ref={pool} aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden">
        {INGREDIENTS.map((i, idx) => (
          <IngredientIcon key={i.id} id={i.id} size={128} seed={idx} />
        ))}
      </div>
      {textures.length ? (
        <Canvas dpr={[1, lite ? 1 : 1.5]} camera={{ position: [0, 0, 9.5], fov: 58 }} gl={{ antialias: !lite }}>
          <Cloud count={lite ? 90 : 420} textures={textures} />
          <Rig />
        </Canvas>
      ) : null}
    </>
  )
}
