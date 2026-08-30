/**
 * 에셋 매니페스트.
 * 모든 이미지/영상 참조는 반드시 이 파일을 통과한다.
 * 외부 URL(Unsplash, placeholder 서비스, 이미지 CDN) 하드코딩 금지.
 */

export const ASSET_ROOT = '/assets'

export type VideoSlot = 'hero16x9' | 'hero9x16' | 'loop1' | 'loop2' | 'loop3' | 'loop4' | 'film'

export const VIDEO: Record<VideoSlot, { src: string; poster: string }> = {
  hero16x9: { src: `${ASSET_ROOT}/video/hero_16x9.mp4`, poster: `${ASSET_ROOT}/video/hero_16x9_poster.jpg` },
  hero9x16: { src: `${ASSET_ROOT}/video/hero_9x16.mp4`, poster: `${ASSET_ROOT}/video/hero_9x16_poster.jpg` },
  loop1: { src: `${ASSET_ROOT}/video/loop_1.mp4`, poster: `${ASSET_ROOT}/video/loop_1_poster.jpg` },
  loop2: { src: `${ASSET_ROOT}/video/loop_2.mp4`, poster: `${ASSET_ROOT}/video/loop_2_poster.jpg` },
  loop3: { src: `${ASSET_ROOT}/video/loop_3.mp4`, poster: `${ASSET_ROOT}/video/loop_3_poster.jpg` },
  loop4: { src: `${ASSET_ROOT}/video/loop_4.mp4`, poster: `${ASSET_ROOT}/video/loop_4_poster.jpg` },
  film: { src: `${ASSET_ROOT}/video/film_main.mp4`, poster: `${ASSET_ROOT}/video/film_main_poster.jpg` },
}

export const aboutPhoto = (slug: string) => `${ASSET_ROOT}/about/${slug}.jpg`
export const productPhoto = (sku: string) => `${ASSET_ROOT}/product/${sku}.jpg`
export const recipePhoto = (slug: string) => `${ASSET_ROOT}/recipe/${slug}.jpg`
export const LOGO_SVG = `${ASSET_ROOT}/logo/logo.svg`

/** 사진 최대 표시 폭 — 원본이 1080px 내외이므로 업스케일 금지 (2-1 규칙) */
export const MAX_PHOTO_WIDTH = 720
/** 모바일에서 액자 여백을 유지하기 위한 상한 */
export const MOBILE_PHOTO_VW = 88
