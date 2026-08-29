import { CUTOUT_INGREDIENTS } from './ingredients'
import {
  ASSETS,
  PACK_SEQUENCE_FRAMES,
  PROCESS_STATION_COUNT,
  PRODUCT_SLOT_COUNT,
  pad2,
  pad4,
  type AssetSpec,
} from './assetPaths'

/**
 * 에셋 매니페스트 — 이 파일이 유일한 진실 공급원(single source of truth)이다.
 *
 * 규칙
 * 1. 컴포넌트는 파일 경로 문자열을 직접 쓰지 않는다. 항상 ASSETS 상수를 참조한다.
 * 2. 외부 URL(Unsplash, placeholder 서비스 등)은 절대 넣지 않는다. 전부 로컬.
 * 3. 파일이 없으면 <VideoAsset> / <ImageAsset> 이 자동으로 플레이스홀더를 그린다.
 *    같은 경로에 실제 파일을 넣으면 코드 수정 없이 교체된다.
 * 4. ASSETS.md 는 이 매니페스트에서 생성된다. `npm run assets:doc`
 */

export * from './assetPaths'

const range = (n: number) => Array.from({ length: n }, (_, i) => i + 1)

export const ASSET_MANIFEST: readonly AssetSpec[] = [
  {
    path: ASSETS.font.pretendard,
    kind: 'font',
    dimensions: 'Variable woff2, weight 45–920, 한글 서브셋',
    maxSize: '1.2 MB',
    usedIn: ['전역 (한글)'],
    replaceable: true,
    note: '없으면 Apple SD Gothic Neo / Malgun Gothic 으로 폴백. 라이선스 OFL.',
  },
  {
    path: ASSETS.font.inter,
    kind: 'font',
    dimensions: 'Variable woff2, weight 100–900, latin + latin-ext',
    maxSize: '400 KB',
    usedIn: ['전역 (영문·숫자)'],
    replaceable: true,
    note: '없으면 시스템 산세리프로 폴백.',
  },
  {
    path: ASSETS.logo.wordmark,
    kind: 'vector',
    dimensions: 'SVG (사내 원본 .ai 에서 추출)',
    maxSize: '60 KB',
    usedIn: ['헤더', 'S9 FOOTER'],
    replaceable: true,
    note: '브랜드 워드마크. 반영 완료.',
  },
  {
    path: ASSETS.logo.wordmarkWhite,
    kind: 'image',
    dimensions: '851×646 WebP, 알파 = 로고 실루엣',
    maxSize: '30 KB',
    usedIn: ['Loader(파티클이 알파를 샘플링해 로고로 재배열)', '헤더·푸터 마스크'],
    replaceable: false,
    note: '로고 실루엣을 마스크로 써서 배경색 보간에 따라 색이 따라오게 한다. 반영 완료.',
  },
  {
    path: ASSETS.logo.mark,
    kind: 'vector',
    dimensions: 'SVG, 1:1 정사각 viewBox',
    maxSize: '20 KB',
    usedIn: ['헤더 축소 상태', 'favicon', 'OG 이미지'],
    replaceable: true,
  },
  {
    path: ASSETS.video.hero16x9,
    kind: 'video',
    dimensions: '1920×1080, 12–20s 무한 루프, H.264 + (선택)VP9, 무음 트랙',
    maxSize: '6 MB',
    usedIn: ['S0 HERO (데스크톱)'],
    replaceable: false,
    note: '루프 이음선이 보이지 않게 첫/끝 프레임 일치. 색보정은 브랜드 그린 쪽으로.',
  },
  {
    path: ASSETS.video.hero9x16,
    kind: 'video',
    dimensions: '1080×1920, 12–20s 무한 루프, H.264, 무음 트랙',
    maxSize: '4 MB',
    usedIn: ['S0 HERO (모바일)'],
    replaceable: false,
    note: '모바일은 반드시 세로 영상. 가로 영상 크롭 금지.',
  },
  {
    path: ASSETS.video.heroPoster,
    kind: 'image',
    dimensions: '1920×1080 (모바일 겸용), JPG/AVIF',
    maxSize: '200 KB',
    usedIn: ['S0 HERO'],
    replaceable: false,
    note: 'LCP 대상. 영상 로드 후 크로스페이드되므로 첫 프레임과 동일 구도.',
  },
  ...range(PROCESS_STATION_COUNT).map<AssetSpec>((n) => ({
    path: ASSETS.video.station(n),
    kind: 'video',
    dimensions: '1280×720, 4–6s 루프, H.264, 무음',
    maxSize: '1.5 MB',
    usedIn: [`S2 PROCESS 스테이션 ${pad2(n)}`],
    replaceable: true,
    note: '해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작.',
  })),
  ...range(PROCESS_STATION_COUNT).map<AssetSpec>((n) => ({
    path: ASSETS.video.stationPoster(n),
    kind: 'image',
    dimensions: '1280×720, JPG',
    maxSize: '80 KB',
    usedIn: [`S2 PROCESS 스테이션 ${pad2(n)}`],
    replaceable: true,
    note: '지연 로드 전 표시용 포스터.',
  })),
  ...range(PRODUCT_SLOT_COUNT).map<AssetSpec>((n) => ({
    path: ASSETS.product.still(n),
    kind: 'product',
    dimensions: '누끼 PNG 원본 → 긴 변 760px WebP(알파 유지)로 최적화',
    maxSize: '90 KB',
    usedIn: [`S4 PRODUCTS 카드 ${pad2(n)}`, '/products'],
    replaceable: false,
    note: '사내 제품컷 원본에서 변환해 반영 완료. 더 높은 해상도가 필요하면 원본 누끼로 교체.',
  })),
  ...range(PRODUCT_SLOT_COUNT).map<AssetSpec>((n) => ({
    path: ASSETS.video.productLoop(n),
    kind: 'video',
    dimensions: '1080×1350 (4:5), 2–4s 루프, H.264, 무음',
    maxSize: '1.2 MB',
    usedIn: [`S4 카드 ${pad2(n)} 호버/뷰포트 진입`],
    replaceable: true,
    note: '없으면 정지 이미지가 그대로 유지된다.',
  })),
  ...CUTOUT_INGREDIENTS.map<AssetSpec>((item) => ({
    path: ASSETS.cutout.bySlug(item.slug),
    kind: 'cutout',
    dimensions: '512×512, PNG 알파 투명, 여백 8% 이내',
    maxSize: '120 KB',
    usedIn: ['커서 트레일', 'S3 재료 필드', 'S5 BOWL BUILDER', 'S6 QC GAME'],
    replaceable: true,
    note: `${item.label} 누끼. 그림자 없이, 정면 약간 위 앵글.`,
  })),
  {
    path: ASSETS.texture.grain,
    kind: 'texture',
    dimensions: '512×512, PNG, 타일링 가능한 모노 노이즈',
    maxSize: '60 KB',
    usedIn: ['전역 오버레이', 'S1', 'S8'],
    replaceable: true,
    note: '없으면 CSS 그라디언트만으로 동작.',
  },
  {
    path: ASSETS.texture.bowlNormal,
    kind: 'texture',
    dimensions: '1024×1024, JPG, 노멀맵',
    maxSize: '250 KB',
    usedIn: ['S5 BOWL BUILDER (3D 볼)'],
    replaceable: true,
  },
  {
    path: ASSETS.texture.bowlRoughness,
    kind: 'texture',
    dimensions: '1024×1024, JPG, 러프니스맵',
    maxSize: '250 KB',
    usedIn: ['S5 BOWL BUILDER (3D 볼)'],
    replaceable: true,
  },
  {
    path: `/assets/sequence/pack/pack_0001.webp … pack_${pad4(PACK_SEQUENCE_FRAMES)}.webp`,
    kind: 'sequence',
    dimensions: `1280×720 × ${PACK_SEQUENCE_FRAMES}프레임 (24fps 기준 2.5s), WebP`,
    maxSize: '40 KB / 프레임 (합계 2.4 MB)',
    usedIn: ['S9 이스터에그'],
    replaceable: true,
    note: '전량 선택 에셋. 없으면 이스터에그는 파티클만으로 동작.',
  },
  {
    path: ASSETS.audio.vegCrunchLoop,
    kind: 'audio',
    dimensions: '스테레오 MP3 128kbps, 4–8s 심리스 루프',
    maxSize: '150 KB',
    usedIn: ['전역 (스크롤 속도 연동)'],
    replaceable: true,
    note: '채소 사각거림. playbackRate 0.85–1.25 범위에서 자연스러워야 함.',
  },
  {
    path: ASSETS.audio.uiTick,
    kind: 'audio',
    dimensions: '모노 MP3, 60–120ms',
    maxSize: '15 KB',
    usedIn: ['전역 호버'],
    replaceable: true,
    note: '없으면 Web Audio 오실레이터로 합성 대체.',
  },
  {
    path: ASSETS.audio.uiClick,
    kind: 'audio',
    dimensions: '모노 MP3, 80–150ms',
    maxSize: '15 KB',
    usedIn: ['전역 클릭'],
    replaceable: true,
    note: '없으면 오실레이터 합성 대체.',
  },
  {
    path: ASSETS.audio.whoosh,
    kind: 'audio',
    dimensions: '스테레오 MP3, 400–800ms',
    maxSize: '40 KB',
    usedIn: ['섹션 전환', '페이지 전환 커튼'],
    replaceable: true,
  },
  {
    path: ASSETS.audio.gameSuccess,
    kind: 'audio',
    dimensions: '스테레오 MP3, 600ms–1.2s',
    maxSize: '50 KB',
    usedIn: ['S6 QC GAME 성공'],
    replaceable: true,
  },
  {
    path: ASSETS.audio.gameFail,
    kind: 'audio',
    dimensions: '모노 MP3, 200–400ms',
    maxSize: '25 KB',
    usedIn: ['S6 QC GAME 과검출 페널티'],
    replaceable: true,
  },
]

/** 경로로 스펙 조회. 플레이스홀더가 "요구 스펙"을 화면에 띄울 때 쓴다. */
export function getAssetSpec(path: string): AssetSpec | undefined {
  return ASSET_MANIFEST.find((spec) => spec.path === path)
}

/** 존재 여부를 확인할 실제 파일 경로 전체 (시퀀스는 대표 프레임만). */
export function listCheckablePaths(): string[] {
  const fromManifest = ASSET_MANIFEST.filter(
    (spec) => spec.kind !== 'sequence',
  ).map((spec) => spec.path)
  return [...fromManifest, ASSETS.sequence.pack(1)]
}
