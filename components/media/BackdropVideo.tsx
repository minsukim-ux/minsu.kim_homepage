'use client'

import { useEffect, useRef, useState } from 'react'
import { WarmGradient } from './WarmGradient'

type Props = {
  landscape: { src: string; poster: string }
  portrait: { src: string; poster: string }
  className?: string
}

/**
 * 히어로 배경 영상.
 * poster를 먼저 그리고 재생 준비가 되면 크로스페이드 (LCP 보호).
 * 파일이 없거나 reduced-motion이면 웜 그라디언트 폴백.
 */
export function BackdropVideo({ landscape, portrait, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [source, setSource] = useState<{ src: string; poster: string } | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(mqMotion.matches)
    const mqPortrait = window.matchMedia('(max-width: 768px), (orientation: portrait)')
    const pick = () => setSource(mqPortrait.matches ? portrait : landscape)
    pick()
    mqPortrait.addEventListener('change', pick)
    return () => mqPortrait.removeEventListener('change', pick)
  }, [landscape, portrait])

  useEffect(() => {
    const v = videoRef.current
    if (!v || !source || reduce) return
    v.load()
    const play = () => v.play().catch(() => setFailed(true))
    const onCanPlay = () => {
      setReady(true)
      play()
    }
    v.addEventListener('canplay', onCanPlay)
    v.addEventListener('error', () => setFailed(true))
    return () => v.removeEventListener('canplay', onCanPlay)
  }, [source, reduce])

  if (!source || failed || reduce) {
    return <WarmGradient className={className} />
  }

  return (
    <>
      <WarmGradient className={`${className ?? ''} transition-opacity duration-700`} />
      <video
        ref={videoRef}
        className={`${className ?? ''} absolute inset-0 transition-opacity duration-700`}
        style={{ opacity: ready ? 1 : 0 }}
        poster={source.poster}
        src={source.src}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      />
    </>
  )
}
