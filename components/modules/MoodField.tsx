'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position, 1.0); }
`

/** 테라코타~앰버~올리브~크림 범위에서 색이 유체처럼 번지고 섞인다 */
const frag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPixelRatio;

  vec3 TERRACOTTA = vec3(0.760, 0.278, 0.184);
  vec3 AMBER      = vec3(0.914, 0.639, 0.231);
  vec3 OLIVE      = vec3(0.486, 0.545, 0.306);
  vec3 CREAM      = vec3(0.953, 0.929, 0.882);

  vec2 hash(vec2 p){ p = vec2(dot(p, vec2(127.1,311.7)), dot(p, vec2(269.5,183.3))); return -1.0 + 2.0*fract(sin(p)*43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(dot(hash(i+vec2(0,0)), f-vec2(0,0)), dot(hash(i+vec2(1,0)), f-vec2(1,0)), u.x),
               mix(dot(hash(i+vec2(0,1)), f-vec2(0,1)), dot(hash(i+vec2(1,1)), f-vec2(1,1)), u.x), u.y);
  }

  void main(){
    vec2 uv = vUv;
    float d = distance(uv, uPointer);
    // 커서 주변에서 좌표가 밀려 유체처럼 번진다
    vec2 push = normalize(uv - uPointer + 0.0001) * exp(-d * 5.0) * 0.16;
    vec2 p = uv * 3.0 + push;

    float n1 = noise(p + uTime * 0.06);
    float n2 = noise(p * 1.7 - uTime * 0.04);
    float n3 = noise(p * 0.8 + uTime * 0.02);

    vec3 col = mix(CREAM, AMBER, smoothstep(-0.3, 0.5, n1));
    col = mix(col, TERRACOTTA, smoothstep(0.0, 0.7, n2) * 0.75);
    col = mix(col, OLIVE, smoothstep(0.1, 0.8, n3) * 0.5);
    col = mix(col, CREAM, exp(-d * 3.0) * 0.35);
    gl_FragColor = vec4(col, 1.0);
  }
`

function Plane({ pointer }: { pointer: React.MutableRefObject<[number, number]> }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()
  useFrame((_, dt) => {
    const m = mat.current
    if (!m) return
    m.uniforms.uTime.value += dt
    const [x, y] = pointer.current
    m.uniforms.uPointer.value.set(x, y)
    m.uniforms.uPixelRatio.value = size.width / Math.max(1, size.height)
  })
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={{
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0.5, 0.5) },
          uPixelRatio: { value: 1 },
        }}
      />
    </mesh>
  )
}

export function MoodField({
  pointer,
  onReadColor,
}: {
  pointer: React.MutableRefObject<[number, number]>
  onReadColor: (read: (x: number, y: number) => [number, number, number]) => void
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ preserveDrawingBuffer: true, antialias: false }}
      onCreated={({ gl }) => {
        onReadColor((x, y) => {
          const px = new Uint8Array(4)
          const c = gl.domElement
          gl.getContext().readPixels(
            Math.floor(x * c.width),
            Math.floor((1 - y) * c.height),
            1,
            1,
            gl.getContext().RGBA,
            gl.getContext().UNSIGNED_BYTE,
            px,
          )
          return [px[0], px[1], px[2]]
        })
      }}
    >
      <Plane pointer={pointer} />
    </Canvas>
  )
}
