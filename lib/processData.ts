import { ASSETS } from './assets'

/**
 * S2 PROCESS — 12단계 공정 데이터.
 *
 * ⚠️ 관리 지표(metric)의 숫자는 절대 임의 생성하지 않는다.
 *    표시·광고 규제 대상이며, 실제 관리기준값과 다르면 허위표시가 된다.
 *
 * 초기값은 전부 value: null (화면에 "—" 로 표시) + verified: false.
 * 담당자가 실제 관리기준서를 보고 값을 채우고 verified: true 로 바꾸면
 * 코드 수정 없이 카운트업 숫자가 화면에 나타난다.
 *
 * 단계명 자체는 일반적인 신선편의식품 공정 순서이며 사실 주장이 아니다.
 * 다만 실제 공장 공정과 순서가 다르면 담당자가 조정해야 한다.
 */

export interface ProcessMetric {
  /** 지표 이름 (예: 세척수 온도) */
  readonly label: string
  /** 실제 관리기준값 — 실제 관리기준값 입력 필요 (표시광고 대상) */
  readonly value: number | null
  /** 단위 (예: ℃, ppm, 초) */
  readonly unit: string
  /** 담당자가 관리기준서로 확인했는가 */
  readonly verified: boolean
}

export interface ProcessStation {
  /** 1부터 시작하는 스테이션 번호 */
  readonly index: number
  /** 단계명 */
  readonly name: string
  /** 영문 라벨 (타이포 연출용) */
  readonly nameEn: string
  /** 한 줄 설명. 사실 범위 내 서술만. */
  readonly description: string
  readonly metrics: readonly ProcessMetric[]
  /** 배경 B-roll 영상 경로 */
  readonly videoPath: string
  readonly posterPath: string
}

/** 미확정 지표 팩토리 — 값 없이 라벨·단위만 정의한다. */
const pending = (label: string, unit: string): ProcessMetric => ({
  label,
  value: null,
  unit,
  verified: false,
})

export const PROCESS_STATIONS: readonly ProcessStation[] = [
  {
    index: 1,
    name: '원물입고',
    nameEn: 'RECEIVING',
    description: '입고 차량과 원물 상태를 확인하고 규격에 맞는 것만 받는다.',
    metrics: [pending('입고 검품 항목', '항목'), pending('냉장 차량 온도', '℃')],
    videoPath: ASSETS.video.station(1),
    posterPath: ASSETS.video.stationPoster(1),
  },
  {
    index: 2,
    name: '선별',
    nameEn: 'SORTING',
    description: '변색·손상·이물이 있는 원물을 육안으로 골라낸다.',
    metrics: [pending('선별 기준', '항목'), pending('작업 조도', 'lx')],
    videoPath: ASSETS.video.station(2),
    posterPath: ASSETS.video.stationPoster(2),
  },
  {
    index: 3,
    name: '1차세척',
    nameEn: 'FIRST WASH',
    description: '표면 흙과 부착물을 흐르는 물로 씻어낸다.',
    metrics: [pending('세척수 온도', '℃'), pending('세척 시간', '초')],
    videoPath: ASSETS.video.station(3),
    posterPath: ASSETS.video.stationPoster(3),
  },
  {
    index: 4,
    name: '2차세척(살균)',
    nameEn: 'SANITIZING',
    description: '살균 공정을 거친다.',
    metrics: [pending('살균제 농도', 'ppm'), pending('침지 시간', '초')],
    videoPath: ASSETS.video.station(4),
    posterPath: ASSETS.video.stationPoster(4),
  },
  {
    index: 5,
    name: '3차헹굼',
    nameEn: 'FINAL RINSE',
    description: '잔류물이 남지 않도록 헹군다.',
    metrics: [pending('헹굼 횟수', '회'), pending('잔류 염소', 'ppm')],
    videoPath: ASSETS.video.station(5),
    posterPath: ASSETS.video.stationPoster(5),
  },
  {
    index: 6,
    name: '탈수',
    nameEn: 'DEWATERING',
    description: '표면 수분을 제거한다. 수분이 남으면 품질이 떨어진다.',
    metrics: [pending('탈수 시간', '초'), pending('회전 속도', 'rpm')],
    videoPath: ASSETS.video.station(6),
    posterPath: ASSETS.video.stationPoster(6),
  },
  {
    index: 7,
    name: '절단',
    nameEn: 'CUTTING',
    description: '제품 규격에 맞춰 자른다.',
    metrics: [pending('절단 규격', 'mm'), pending('칼날 교체 주기', '시간')],
    videoPath: ASSETS.video.station(7),
    posterPath: ASSETS.video.stationPoster(7),
  },
  {
    index: 8,
    name: '계량',
    nameEn: 'WEIGHING',
    description: '구성별 중량을 맞춘다.',
    metrics: [pending('중량 허용 범위', 'g'), pending('저울 검교정 주기', '개월')],
    videoPath: ASSETS.video.station(8),
    posterPath: ASSETS.video.stationPoster(8),
  },
  {
    index: 9,
    name: '조립',
    nameEn: 'ASSEMBLY',
    description: '구성품을 순서대로 담는다.',
    metrics: [pending('작업장 온도', '℃'), pending('구성 항목', '종')],
    videoPath: ASSETS.video.station(9),
    posterPath: ASSETS.video.stationPoster(9),
  },
  {
    index: 10,
    name: '금속검출',
    nameEn: 'METAL DETECTION',
    description: '전 제품이 금속검출기를 통과한다.',
    metrics: [pending('Fe 검출 감도', 'mm'), pending('감도 점검 주기', '회/일')],
    videoPath: ASSETS.video.station(10),
    posterPath: ASSETS.video.stationPoster(10),
  },
  {
    index: 11,
    name: '포장',
    nameEn: 'PACKAGING',
    description: '밀봉하고 표시사항을 확인한다.',
    metrics: [pending('실링 온도', '℃'), pending('표시사항 검수', '항목')],
    videoPath: ASSETS.video.station(11),
    posterPath: ASSETS.video.stationPoster(11),
  },
  {
    index: 12,
    name: '냉장출고',
    nameEn: 'COLD DISPATCH',
    description: '냉장 상태를 유지한 채 출고한다.',
    metrics: [pending('보관 온도', '℃'), pending('출고 전 검온', '회')],
    videoPath: ASSETS.video.station(12),
    posterPath: ASSETS.video.stationPoster(12),
  },
] as const

/** 화면에 그릴 지표 문자열. 미확정이면 "—". */
export function formatMetric(metric: ProcessMetric): string {
  if (!metric.verified || metric.value === null) return '—'
  return `${metric.value}${metric.unit}`
}

/** 확인이 끝나지 않은 지표 수 — 개발 중 확인용. */
export function countPendingMetrics(): number {
  return PROCESS_STATIONS.reduce(
    (sum, station) =>
      sum + station.metrics.filter((metric) => !metric.verified).length,
    0,
  )
}
