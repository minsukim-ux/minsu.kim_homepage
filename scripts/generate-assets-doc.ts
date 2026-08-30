/**
 * ASSETS.md 생성기.
 *
 *   npm run assets:doc     ASSETS.md 를 매니페스트 기준으로 다시 쓴다
 *   npm run assets:check   내용이 어긋나면 실패한다 (CI 용)
 *
 * 문서를 손으로 고치지 마라. /lib/assets.ts 를 고치고 이 스크립트를 돌린다.
 */
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { ASSET_MANIFEST, type AssetKind, type AssetSpec } from '../lib/assets'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'ASSETS.md')
const PUBLIC_DIR = path.join(ROOT, 'public')

const KIND_LABEL: Record<AssetKind, string> = {
  video: '영상',
  image: '이미지',
  cutout: '누끼 PNG',
  product: '제품 사진',
  texture: '텍스처',
  sequence: '이미지 시퀀스',
  vector: '벡터',
  audio: '오디오',
  font: '폰트',
}

const GROUP_ORDER: AssetKind[] = [
  'vector',
  'video',
  'image',
  'product',
  'cutout',
  'texture',
  'sequence',
  'audio',
  'font',
]

function isPresent(assetPath: string): boolean {
  if (assetPath.includes('…')) return false
  const absolute = path.join(PUBLIC_DIR, assetPath)
  try {
    return existsSync(absolute) && statSync(absolute).size > 0
  } catch {
    return false
  }
}

const escapeCell = (value: string) => value.replace(/\|/g, '\\|')

function row(spec: AssetSpec): string {
  const cells = [
    `\`${spec.path}\``,
    KIND_LABEL[spec.kind],
    spec.dimensions,
    `≤ ${spec.maxSize}`,
    spec.usedIn.join(', '),
    spec.replaceable ? '가능 (플레이스홀더로 동작)' : '**불가 (필수)**',
    isPresent(spec.path) ? '✅ 있음' : '⬜ 없음',
    spec.note ?? '',
  ]
  return `| ${cells.map(escapeCell).join(' | ')} |`
}

function buildDoc(): string {
  const required = ASSET_MANIFEST.filter((spec) => !spec.replaceable)
  const present = ASSET_MANIFEST.filter((spec) => isPresent(spec.path))

  const lines: string[] = [
    '# 에셋 발주서',
    '',
    '> 이 문서는 `/lib/assets.ts` 매니페스트에서 자동 생성됩니다.',
    '> 직접 수정하지 말고 `npm run assets:doc` 을 실행하세요.',
    '',
    '## 원칙',
    '',
    '1. 아래 경로에 파일을 넣으면 **코드 수정 없이** 교체됩니다.',
    '   경로·파일명·확장자를 정확히 지켜 주세요.',
    '2. 파일이 없는 슬롯은 자동으로 플레이스홀더가 렌더링됩니다.',
    '   에셋이 0개여도 사이트는 끝까지 동작합니다.',
    '3. 외부 이미지·영상 URL 은 사용하지 않습니다. 전부 이 경로의 로컬 파일입니다.',
    '4. 개발 서버는 새로고침하면 즉시 반영됩니다.',
    '   프로덕션은 파일을 추가한 뒤 다시 빌드해야 합니다.',
    '',
    '## 현황',
    '',
    `- 전체 슬롯: **${ASSET_MANIFEST.length}개**`,
    `- 채워진 슬롯: **${present.length}개**`,
    `- 오픈 전 필수(대체 불가): **${required.length}개**`,
    '',
    '## 공통 요구 사항',
    '',
    '- 영상: H.264(mp4), 무음 트랙 포함, 첫/끝 프레임을 맞춘 심리스 루프.',
    '  자동재생 정책상 오디오 트랙이 있으면 재생이 차단될 수 있습니다.',
    '- 이미지: 원본은 JPG/PNG 로 주세요. AVIF/WebP 변환은 빌드가 처리합니다.',
    '- 누끼: PNG 알파 투명, 그림자 없이, 여백 8% 이내.',
    '- 오디오: MP3. 루프 소재는 앞뒤 무음 구간을 잘라 주세요.',
    '- 색: 브랜드 그린(#00614E) 계열 기준으로 보정해 주세요.',
    '',
  ]

  for (const kind of GROUP_ORDER) {
    const group = ASSET_MANIFEST.filter((spec) => spec.kind === kind)
    if (group.length === 0) continue

    lines.push(
      `## ${KIND_LABEL[kind]} (${group.length})`,
      '',
      '| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |',
      '| --- | --- | --- | --- | --- | --- | --- | --- |',
      ...group.map(row),
      '',
    )
  }

  lines.push(
    '## 별도 확인이 필요한 데이터 (에셋 아님)',
    '',
    '에셋과 별개로, 아래 값은 담당자 확인 전까지 화면에 표시되지 않습니다.',
    '',
    '| 항목 | 파일 | 상태 |',
    '| --- | --- | --- |',
    '| 공정 관리 지표 24개 | `lib/processData.ts` | 전부 미확정 (`—` 표시) |',
    '| 보유 인증 | `lib/trustData.ts` | 전부 미확정 (미표시) |',
    '| 거래처명·로고 | `lib/trustData.ts` | 전부 미확정 (미표시) |',
    '| 마퀴 문구(인증·연혁·생산주기) | `lib/trustData.ts` | 미확정 (미표시) |',
    '| 외부 판매 채널 URL | `lib/trustData.ts` | 미확정 |',
    '| 생산·소비기한 기준 시각 | `lib/freshness.ts` | Phase 4 에서 추가 |',
    '| 사업자 정보 | `lib/siteMeta.ts` | 미확정 (미표시) |',
    '',
  )

  return lines.join('\n')
}

const doc = buildDoc()
const checkOnly = process.argv.includes('--check')

if (checkOnly) {
  const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : ''
  if (current !== doc) {
    console.error('ASSETS.md 가 매니페스트와 다릅니다. npm run assets:doc 실행.')
    process.exit(1)
  }
  console.log('ASSETS.md 최신 상태.')
} else {
  writeFileSync(OUT, doc, 'utf8')
  console.log(`ASSETS.md 생성 완료 — 슬롯 ${ASSET_MANIFEST.length}개.`)
}
