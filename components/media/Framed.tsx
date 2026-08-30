import Image from 'next/image'
import { hasAsset } from '@/lib/assetsServer'
import { MAX_PHOTO_WIDTH } from '@/lib/assets'
import { FilmGrain } from '@/components/graphics/textures'
import { IngredientIcon } from '@/components/graphics/ingredients'
import { INGREDIENT_BY_ID } from '@/lib/ingredients'
import { luminance } from '@/lib/motion'

type Props = {
  /** public 기준 경로. 파일이 없으면 SVG 일러스트 폴백 */
  src: string
  alt: string
  /** 폴백에 사용할 재료 id */
  fallbackIngredient?: string
  /** 액자 좌상단 라벨 (ABOUT 시리즈) */
  label?: string
  /** 액자 하단 캡션 (재료명 한글) */
  caption?: string
  width?: number
  ratio?: number
  className?: string
  priority?: boolean
}

/**
 * 사진은 반드시 이 컴포넌트를 통해서만 표시한다.
 * - 최대 폭 720px (풀블리드 금지)
 * - 넉넉한 여백의 종이 액자
 * - 필름 그레인 + 웜 듀오톤
 */
export function Framed({
  src,
  alt,
  fallbackIngredient,
  label,
  caption,
  width = MAX_PHOTO_WIDTH,
  ratio = 4 / 5,
  className,
  priority = false,
}: Props) {
  const w = Math.min(width, MAX_PHOTO_WIDTH)
  const h = Math.round(w / ratio)
  const present = hasAsset(src)
  const meta = fallbackIngredient ? INGREDIENT_BY_ID[fallbackIngredient] : undefined
  // 밝은 원물은 크림 바탕에서 사라지므로 앰버 톤 바탕을 깔아 대비를 만든다
  const fallbackGround = meta
    ? luminance(meta.color) > 0.82
      ? `radial-gradient(120% 90% at 50% 38%, var(--sb-amber), #E5C88F)`
      : `radial-gradient(120% 90% at 50% 38%, ${meta.color}55, ${meta.shade}2E)`
    : 'var(--sb-cream)'

  return (
    <figure
      className={`sb-frame relative ${className ?? ''}`}
      style={{ width: `min(${w}px, ${88}vw)` }}
    >
      <div className="relative overflow-hidden bg-cream" style={{ aspectRatio: `${w} / ${h}` }}>
        {present ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={`(max-width: 768px) 88vw, ${w}px`}
            className="sb-duotone object-cover"
            priority={priority}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: fallbackGround }}
            role="img"
            aria-label={alt}
          >
            {fallbackIngredient ? (
              <IngredientIcon id={fallbackIngredient} size={Math.round(w * 0.66)} seed={w} />
            ) : null}
          </div>
        )}
        {present ? <FilmGrain /> : null}
        {label ? (
          <span className={present ? 'sb-frame-label' : 'sb-frame-label sb-frame-label--dark'}>
            {label}
          </span>
        ) : null}
      </div>
      {caption ? <figcaption className="sb-frame-caption">{caption}</figcaption> : null}
    </figure>
  )
}
