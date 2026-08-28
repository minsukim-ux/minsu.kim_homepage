import { existsSync, statSync } from 'node:fs'
import path from 'node:path'
import {
  ASSET_MANIFEST,
  listCheckablePaths,
  type AssetAvailability,
} from './assets'

/**
 * 서버 전용: /public 아래 실제 파일 존재 여부를 계산한다.
 *
 * 이 결과를 AssetProvider 로 내려보내면 클라이언트가 "실물 렌더 vs 플레이스홀더"를
 * SSR 결과와 동일하게 판단한다 → 하이드레이션 불일치·깜빡임 없음.
 *
 * dev 에서는 매 요청 재계산하므로 파일을 넣고 새로고침하면 즉시 반영된다.
 * production 은 빌드 시점 1회 캐시되므로 에셋 추가 후 재빌드가 필요하다.
 */

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const IS_DEV = process.env.NODE_ENV !== 'production'

let cached: AssetAvailability | null = null

/** publicPath 예: "/assets/video/hero_16x9.mp4" */
export function isAssetAvailable(publicPath: string): boolean {
  // 경로 이탈 방어. 매니페스트 외 값이 흘러들어와도 /public 밖을 보지 않는다.
  const normalized = path.normalize(publicPath).replace(/^(\.\.[/\\])+/, '')
  const absolute = path.join(PUBLIC_DIR, normalized)
  if (!absolute.startsWith(PUBLIC_DIR)) return false

  try {
    if (!existsSync(absolute)) return false
    // 0바이트 플레이스홀더 파일(.gitkeep 대용)은 "없음"으로 본다.
    return statSync(absolute).size > 0
  } catch {
    return false
  }
}

export function buildAssetAvailability(): AssetAvailability {
  if (cached && !IS_DEV) return cached

  const map: Record<string, boolean> = {}
  for (const assetPath of listCheckablePaths()) {
    map[assetPath] = isAssetAvailable(assetPath)
  }

  cached = map
  return map
}

/** 발주 현황 요약. 콘솔/문서용. */
export function summarizeAssetAvailability(): {
  total: number
  present: number
  missing: string[]
  /** replaceable: false — 오픈 전 반드시 채워야 하는 것 */
  missingRequired: string[]
} {
  const availability = buildAssetAvailability()
  const entries = Object.entries(availability)
  const missing = entries.filter(([, ok]) => !ok).map(([key]) => key)
  const requiredPaths = new Set(
    ASSET_MANIFEST.filter((spec) => !spec.replaceable).map(
      (spec) => spec.path,
    ),
  )

  return {
    total: entries.length,
    present: entries.length - missing.length,
    missing,
    missingRequired: missing.filter((item) => requiredPaths.has(item)),
  }
}
