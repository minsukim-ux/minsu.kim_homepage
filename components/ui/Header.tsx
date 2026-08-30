'use client'

import { useCallback, useState } from 'react'
import { LOGO_SVG, withBase } from '@/lib/assets'
import { Wordmark } from '@/components/media/Wordmark'
import { BRAND } from '@/lib/brand'

/** 로고 파일이 들어오면 자동으로 사용하고, 없으면 워드마크 벡터로 대체한다. */
export function Header() {
  const [failed, setFailed] = useState(false)
  // 하이드레이션 이전에 이미 실패한 이미지는 onError가 오지 않으므로 직접 확인한다
  const check = useCallback((el: HTMLImageElement | null) => {
    if (el?.complete && el.naturalWidth === 0) setFailed(true)
  }, [])
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-12">
      <a href="#main" data-logo-target className="pointer-events-auto block h-8">
        <span className="sr-only">{BRAND.nameKo} 홈</span>
        {failed ? (
          <Wordmark className="h-8 w-auto text-primary" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={check}
            src={withBase(LOGO_SVG)}
            alt=""
            className="h-8 w-auto"
            onError={() => setFailed(true)}
          />
        )}
      </a>
      <p className="sb-label hidden md:block">{BRAND.message}</p>
    </header>
  )
}
