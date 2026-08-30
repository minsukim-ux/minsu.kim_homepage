import type { ReactNode } from 'react'

export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: ReactNode[]
  reverse?: boolean
  className?: string
}) {
  const row = [...items, ...items]
  return (
    <div className={`overflow-hidden ${className ?? ''}`} data-marquee={reverse ? 'reverse' : 'forward'}>
      <div className="sb-marquee gap-8 whitespace-nowrap">
        {row.map((it, i) => (
          <span key={i} className="sb-label text-ink/70">
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}
