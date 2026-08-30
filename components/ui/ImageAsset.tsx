'use client'

import Image from 'next/image'
import { useAssetAvailable } from '@/components/core/AssetProvider'
import { AssetPlaceholder } from './AssetPlaceholder'

/**
 * 이미지 슬롯. 파일이 없으면 도형 + 파일명·스펙 플레이스홀더.
 * 있으면 next/image 가 AVIF/WebP 로 변환해 서빙한다.
 *
 * 부모가 크기를 정하고(aspect-ratio 등) 여기서는 fill 로 채운다 → CLS 0.
 */
export function ImageAsset({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className = '',
  imageClassName = '',
  showSpec = true,
}: {
  src: string
  /** 장식용이면 빈 문자열. 정보를 담은 이미지면 반드시 서술. */
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  imageClassName?: string
  showSpec?: boolean
}) {
  const available = useAssetAvailable(src)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {available ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imageClassName}`}
        />
      ) : (
        <AssetPlaceholder path={src} variant="image" showSpec={showSpec} />
      )}
    </div>
  )
}
