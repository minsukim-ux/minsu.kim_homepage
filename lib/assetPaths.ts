/**
 * 에셋 경로 상수 + 타입.
 *
 * 컴포넌트는 이 파일을 직접 import 하지 않고 `@/lib/assets` 를 쓴다
 * (assets.ts 가 전부 re-export 한다). 파일 분리는 300줄 제한 때문이다.
 */

export type AssetKind =
  | 'video'
  | 'image'
  | 'cutout'
  | 'product'
  | 'texture'
  | 'sequence'
  | 'vector'
  | 'audio'
  | 'font'

export interface AssetSpec {
  /** /public 기준 절대 경로. 이 값이 곧 요청 URL. */
  readonly path: string
  readonly kind: AssetKind
  /** 해상도 · 길이 요구 사항 */
  readonly dimensions: string
  /** 파일 하나당 용량 상한 */
  readonly maxSize: string
  /** 사용 섹션/모듈 */
  readonly usedIn: readonly string[]
  /**
   * 대체 가능 여부.
   * true  = 없어도 플레이스홀더로 끝까지 동작. 발주 우선순위 낮음.
   * false = 최종 오픈 전 반드시 필요.
   */
  readonly replaceable: boolean
  readonly note?: string
}

/**
 * 경로 → 파일 존재 여부.
 * 서버에서 fs 로 계산해 클라이언트로 내려보낸다. 키가 없으면 "없음"으로 취급.
 */
export type AssetAvailability = Readonly<Record<string, boolean>>

export const pad2 = (n: number) => String(n).padStart(2, '0')
export const pad4 = (n: number) => String(n).padStart(4, '0')

export const ASSETS = {
  font: {
    pretendard: '/assets/font/PretendardVariable.woff2',
    inter: '/assets/font/InterVariable.woff2',
  },
  logo: {
    /** path 병합된 단일 벡터. 로더가 좌표를 샘플링한다. */
    wordmark: '/assets/logo/logo.svg',
    mark: '/assets/logo/logo-mark.svg',
  },
  video: {
    hero16x9: '/assets/video/hero_16x9.mp4',
    hero9x16: '/assets/video/hero_9x16.mp4',
    heroPoster: '/assets/video/hero_poster.jpg',
    /** S2 스테이션 B-roll. n = 1..12 */
    station: (n: number) => `/assets/video/process/station_${pad2(n)}.mp4`,
    stationPoster: (n: number) =>
      `/assets/video/process/station_${pad2(n)}.jpg`,
    /** S4 제품 카드 호버 루프. n = 1..6 */
    productLoop: (n: number) => `/assets/video/product/loop_${pad2(n)}.mp4`,
  },
  product: {
    /** S4 카드 정지 이미지. n = 1..6 */
    still: (n: number) => `/assets/product/product_${pad2(n)}.jpg`,
  },
  cutout: {
    /** 재료 누끼. slug 는 CUTOUT_INGREDIENTS 참조. */
    bySlug: (slug: string) => `/assets/cutout/${slug}.png`,
  },
  texture: {
    grain: '/assets/texture/grain.png',
    bowlNormal: '/assets/texture/bowl_normal.jpg',
    bowlRoughness: '/assets/texture/bowl_roughness.jpg',
  },
  sequence: {
    /** S9 이스터에그용 패키징 시퀀스. frame = 1..60 */
    pack: (frame: number) => `/assets/sequence/pack/pack_${pad4(frame)}.webp`,
  },
  audio: {
    vegCrunchLoop: '/assets/audio/veg_crunch_loop.mp3',
    uiTick: '/assets/audio/ui_tick.mp3',
    uiClick: '/assets/audio/ui_click.mp3',
    whoosh: '/assets/audio/whoosh.mp3',
    gameSuccess: '/assets/audio/game_success.mp3',
    gameFail: '/assets/audio/game_fail.mp3',
  },
} as const

/** S2 스테이션 수. processData 와 반드시 일치. */
export const PROCESS_STATION_COUNT = 12
/** S4 제품 카드 수. 실제 라인업 확정 시 조정. */
export const PRODUCT_SLOT_COUNT = 6
/** S9 시퀀스 프레임 수. */
export const PACK_SEQUENCE_FRAMES = 60
