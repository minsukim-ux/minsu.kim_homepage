import type { Metadata } from 'next'
import { PROCESS_STATIONS, formatMetric } from '@/lib/processData'
import { SubPageShell } from '@/components/core/SubPageShell'

export const metadata: Metadata = {
  title: '제조 공정',
  description:
    '원물입고부터 냉장출고까지 12단계 공정을 단계별로 정리했습니다.',
}

export default function ProcessPage() {
  return (
    <SubPageShell
      index="P2"
      labelEn="PROCESS"
      label="제조 공정"
      heading="12단계를 전부 적는다"
      lead="관리 지표 숫자는 실제 관리기준서 확인 후 채워집니다. 확인 전에는 —로 표시합니다."
    >
      <ol className="flex flex-col divide-y divide-sb-border border-y border-sb-border">
        {PROCESS_STATIONS.map((station) => (
          <li
            key={station.index}
            className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-5"
          >
            <span className="sb-num w-10 text-sm text-page-fg-sub">
              {String(station.index).padStart(2, '0')}
            </span>
            <span className="font-kr text-xl font-bold text-page-fg">
              {station.name}
            </span>
            <span className="sb-body flex-1 basis-full text-page-fg-sub sm:basis-auto">
              {station.description}
            </span>
            <span className="sb-num flex gap-4 text-sm text-page-fg-sub">
              {station.metrics.map((metric) => (
                <span key={metric.label}>
                  {metric.label} {formatMetric(metric)}
                </span>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </SubPageShell>
  )
}
