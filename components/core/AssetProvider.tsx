'use client'

import { createContext, useContext } from 'react'
import type { AssetAvailability } from '@/lib/assets'

/**
 * 서버가 fs 로 계산한 "에셋 존재 여부" 맵을 트리 전체에 공급한다.
 * 값이 SSR/CSR 동일하므로 플레이스홀더가 깜빡이지 않는다.
 */
const AssetAvailabilityContext = createContext<AssetAvailability>({})

export function AssetProvider({
  availability,
  children,
}: {
  availability: AssetAvailability
  children: React.ReactNode
}) {
  return (
    <AssetAvailabilityContext.Provider value={availability}>
      {children}
    </AssetAvailabilityContext.Provider>
  )
}

/** 해당 에셋이 실제로 존재하는가. 매니페스트에 없는 경로는 false. */
export function useAssetAvailable(path: string | null | undefined): boolean {
  const availability = useContext(AssetAvailabilityContext)
  if (!path) return false
  return availability[path] === true
}

export function useAssetAvailability(): AssetAvailability {
  return useContext(AssetAvailabilityContext)
}
