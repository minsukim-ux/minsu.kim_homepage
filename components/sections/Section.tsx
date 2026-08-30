import type { ReactNode } from 'react'
import { PaperTexture } from '@/components/graphics/textures'

export function Section({
  id,
  label,
  title,
  bg,
  children,
  className,
}: {
  id: string
  label?: string
  title?: string
  /** 섹션 배경색 (연속 보간의 앵커) */
  bg?: string
  children?: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      data-section={id}
      data-bg={bg}
      className={`relative w-full overflow-hidden px-6 py-28 md:px-12 md:py-40 ${className ?? ''}`}
      style={bg ? { backgroundColor: bg } : undefined}
    >
      <PaperTexture opacity={0.35} />
      <div className="relative mx-auto w-full max-w-[1440px]">
        {label ? <p className="sb-label mb-6">{label}</p> : null}
        {title ? (
          <h2 className="mb-12 max-w-[18ch] text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {title}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  )
}
