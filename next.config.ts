import type { NextConfig } from 'next'

/**
 * GitHub Pages 정적 배포용 설정.
 * BASE_PATH는 워크플로에서 주입한다(로컬 개발에서는 빈 값).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // 정적 배포에서는 이미지 최적화 서버가 없다. 원본이 1080px이므로 업스케일만 막으면 된다.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
