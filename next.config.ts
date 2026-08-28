import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // 외부 도메인은 허용하지 않는다. 모든 이미지는 /public/assets 로컬 에셋.
    remotePatterns: [],
    formats: ['image/avif', 'image/webp'],
  },
  // GSAP 3.13+ 는 모든 플러그인이 무료지만 ESM 번들이 크다. 트리셰이킹 유도.
  experimental: {
    optimizePackageImports: ['gsap', 'three', '@react-three/drei'],
  },
}

export default nextConfig
