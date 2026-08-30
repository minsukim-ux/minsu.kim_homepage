import { PROCESS_STATIONS, formatMetric } from '@/lib/processData'
import { VideoAsset } from '@/components/ui/VideoAsset'
import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S2 PROCESS — 12단계
 *
 * Phase 1: 세로 스택으로 전부 SSR 렌더. 이 상태로도 정보는 100% 접근 가능하다.
 * Phase 2: 데스크톱에서 핀 고정 + 가로 스크롤 타임라인으로 전환.
 *          모바일은 세로 스택 + 스냅을 유지한다(대체안이 아니라 다른 형식).
 *
 * ⚠️ 지표 숫자는 processData.ts 에서만 온다. 미확정이면 "—" 로 나온다.
 */
export function S2Process() {
  return (
    <SectionShell
      id="process"
      index="S2"
      label="제조 공정"
      surface="light"
      contentClassName="px-5 py-28 sm:px-8"
    >
      <div className="flex flex-col gap-4">
        <SectionMarker index="S2" label="제조 공정" labelEn="PROCESS" />
        <p className="sb-headline max-w-[20ch] font-kr text-page-fg">
          이 샐러드가 거쳐온 12단계
        </p>
      </div>

      <ol
        data-process-track
        className="mt-16 flex snap-y snap-mandatory flex-col gap-6 md:snap-none"
      >
        {PROCESS_STATIONS.map((station) => (
          <li
            key={station.index}
            data-station={station.index}
            className="snap-start"
          >
            <article className="grid gap-5 border-t border-sb-border pt-5 md:grid-cols-[minmax(0,3fr)_minmax(0,4fr)] md:gap-10">
              <div className="relative aspect-video overflow-hidden rounded-sm md:aspect-4/3">
                <VideoAsset
                  src={station.videoPath}
                  poster={station.posterPath}
                  className="h-full w-full"
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="sb-eyebrow text-page-fg-sub">
                  <span className="sb-num">
                    {String(station.index).padStart(2, '0')}
                  </span>
                  <span className="px-2 opacity-40">/</span>
                  {station.nameEn}
                </p>
                <h3 className="font-kr text-2xl font-bold tracking-tight text-page-fg sm:text-3xl">
                  {station.name}
                </h3>
                <p className="sb-body max-w-[46ch] text-page-fg-sub">
                  {station.description}
                </p>

                <dl className="mt-2 flex flex-wrap gap-x-8 gap-y-3">
                  {station.metrics.map((metric) => (
                    <div key={metric.label} className="min-w-[9rem]">
                      <dt className="sb-eyebrow text-[10px] text-page-fg-sub">
                        {metric.label}
                      </dt>
                      <dd
                        data-metric={metric.verified ? 'verified' : 'pending'}
                        className="sb-num text-2xl text-page-fg sm:text-3xl"
                      >
                        {formatMetric(metric)}
                        {!metric.verified ? (
                          <span className="sr-only">
                            {' '}
                            (관리기준값 확인 전)
                          </span>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
