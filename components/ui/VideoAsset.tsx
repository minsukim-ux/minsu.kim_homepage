'use client'

import { useEffect, useRef, useState } from 'react'
import { useAssetAvailable } from '@/components/core/AssetProvider'
import { prefersReducedMotion } from '@/lib/gsap'
import { AssetPlaceholder } from './AssetPlaceholder'

/**
 * 영상 슬롯.
 *
 * - 파일이 없으면 그라디언트 플레이스홀더. 같은 경로에 파일을 넣으면 그대로 교체.
 * - preload="none" + poster 우선 → LCP 보호.
 * - priority=false 면 IntersectionObserver 로 뷰포트 진입 시에만 로드.
 * - reduced-motion 이면 자동재생하지 않고 첫 프레임(또는 poster)에서 정지.
 * - 재생이 실제로 시작된 뒤에만 페이드인 → 검은 프레임 노출 방지.
 */
export function VideoAsset({
  src,
  poster,
  priority = false,
  className = '',
  objectPosition,
  placeholderAlign = 'bottom-left',
  children,
}: {
  src: string
  poster?: string
  /** 히어로처럼 처음부터 화면에 있는 영상만 true */
  priority?: boolean
  className?: string
  objectPosition?: string
  /** 풀블리드 슬롯에서 플레이스홀더 라벨이 카피와 겹치지 않게 옮긴다. */
  placeholderAlign?: 'bottom-left' | 'top-right'
  /** 영상 위에 겹칠 그라디언트·카피 등 */
  children?: React.ReactNode
}) {
  const videoAvailable = useAssetAvailable(src)
  const posterAvailable = useAssetAvailable(poster)

  const hostRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(priority)
  const [isPlaying, setIsPlaying] = useState(false)

  // 뷰포트 진입 시 지연 로드
  useEffect(() => {
    if (shouldLoad || !videoAvailable) return
    const host = hostRef.current
    if (!host) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '25% 0px' },
    )
    observer.observe(host)
    return () => observer.disconnect()
  }, [shouldLoad, videoAvailable])

  // 로드 트리거 후 재생 시도. reduced-motion 이면 정지 상태 유지.
  useEffect(() => {
    const video = videoRef.current
    if (!shouldLoad || !video) return

    if (prefersReducedMotion()) {
      video.pause()
      return
    }

    video.play().catch(() => {
      // 자동재생 차단(저전력 모드 등) — poster/플레이스홀더가 그대로 남는다.
    })
  }, [shouldLoad])

  return (
    <div
      ref={hostRef}
      className={`relative overflow-hidden bg-sb-void ${className}`}
    >
      {!videoAvailable ? (
        <AssetPlaceholder path={src} variant="video" align={placeholderAlign} />
      ) : (
        <>
          {poster && !posterAvailable ? (
            <AssetPlaceholder
              path={poster}
              variant="image"
              showSpec={false}
              align={placeholderAlign}
            />
          ) : null}

          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
            style={{
              objectPosition,
              opacity: isPlaying ? 1 : 0,
            }}
            poster={posterAvailable ? poster : undefined}
            src={shouldLoad ? src : undefined}
            preload="none"
            muted
            loop
            playsInline
            // 장식용 영상. 정보는 항상 HTML 텍스트로 따로 존재한다.
            aria-hidden="true"
            tabIndex={-1}
            onPlaying={() => setIsPlaying(true)}
            onError={() => setIsPlaying(false)}
          />
        </>
      )}

      {children}
    </div>
  )
}
