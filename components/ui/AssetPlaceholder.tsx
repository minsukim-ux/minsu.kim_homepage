import { getAssetSpec } from '@/lib/assets'

/**
 * 에셋이 없을 때 그 슬롯을 대신 채우는 플레이스홀더.
 *
 * - 영상 → 브랜드 그린 그라디언트가 천천히 흐르는 CSS 애니메이션
 * - 이미지/누끼 → 슬롯 크기 도형 + 파일명·요구 스펙 텍스트
 *
 * 화면을 비우지 않으므로 에셋 0개 상태에서도 스크롤에 정지 화면이 생기지 않는다.
 * 스펙 문구는 매니페스트에서 읽으므로 발주 사양과 항상 일치한다.
 */
/** 라벨을 슬롯 안 어디에 붙일지. 풀블리드 슬롯에서는 카피와 겹치지 않게 옮긴다. */
const ALIGN_CLASS = {
  'bottom-left': 'items-start justify-end p-3 sm:p-4',
  // 헤더 아래로 내린다. sm: 변형끼리 맞춰야 미디어쿼리에서 밀리지 않는다.
  'top-right': 'items-end justify-start p-3 pt-20 sm:p-4 sm:pt-24',
} as const

export function AssetPlaceholder({
  path,
  variant = 'video',
  showSpec = true,
  align = 'bottom-left',
  className = '',
}: {
  path: string
  variant?: 'video' | 'image'
  /** 좁은 슬롯에서는 파일명만 남기고 스펙 문구를 숨긴다. */
  showSpec?: boolean
  align?: keyof typeof ALIGN_CLASS
  className?: string
}) {
  const spec = getAssetSpec(path)
  const filename = path.split('/').pop() ?? path

  return (
    <div
      aria-hidden="true"
      data-asset-placeholder={variant}
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        variant === 'video' ? 'sb-placeholder-video' : ''
      } ${className}`}
      style={
        variant === 'image'
          ? {
              background:
                'linear-gradient(150deg, color-mix(in oklab, var(--sb-primary) 22%, transparent), color-mix(in oklab, var(--sb-ink) 60%, transparent))',
            }
          : undefined
      }
    >
      {variant === 'image' ? <PlaceholderShape /> : null}

      <div
        className={`absolute inset-0 flex flex-col gap-1 ${ALIGN_CLASS[align]}`}
      >
        <p className="sb-eyebrow text-[10px] text-sb-glow/70">
          asset pending
        </p>
        <p className="font-mono text-[11px] leading-tight text-sb-accent-light/90 sm:text-xs">
          {filename}
        </p>
        {showSpec && spec ? (
          <p className="max-w-[42ch] font-mono text-[10px] leading-snug text-sb-fog/70">
            {spec.dimensions} · ≤{spec.maxSize}
          </p>
        ) : null}
      </div>
    </div>
  )
}

/** 이미지 슬롯용 기하 도형. 스톡 아이콘 대신 브랜드 톤의 추상 형태. */
function PlaceholderShape() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.5]"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <circle
        cx="50"
        cy="44"
        r="26"
        fill="none"
        stroke="var(--sb-accent)"
        strokeWidth="0.4"
      />
      <circle
        cx="50"
        cy="44"
        r="17"
        fill="none"
        stroke="var(--sb-accent-light)"
        strokeWidth="0.3"
        strokeDasharray="1.5 2.5"
      />
      <path
        d="M24 44 H76"
        stroke="var(--sb-accent)"
        strokeWidth="0.3"
        opacity="0.6"
      />
      <path
        d="M50 18 V70"
        stroke="var(--sb-accent)"
        strokeWidth="0.3"
        opacity="0.6"
      />
    </svg>
  )
}
