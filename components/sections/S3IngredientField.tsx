import { CUTOUT_INGREDIENTS } from '@/lib/ingredients'
import { SectionShell, SectionMarker } from './SectionShell'

/**
 * S3 INGREDIENT FIELD
 *
 * Phase 1: 재료 목록을 SSR 텍스트로 렌더. WebGL 이 없어도 정보는 여기 있다.
 * Phase 5: Three.js 재료 필드로 교체(텍스트는 sr-only 로 유지).
 *          컬러 스포트라이트 모드 적용 구간.
 */
export function S3IngredientField() {
  return (
    <SectionShell
      id="ingredients"
      index="S3"
      label="재료"
      surface="ink"
      /* Phase 3 커서가 이 클래스를 찾아 컬러 스포트라이트를 적용한다. */
      className="sb-spotlight-zone"
      contentClassName="flex min-h-[100svh] flex-col justify-between gap-16 px-5 py-28 sm:px-8"
    >
      <div className="flex flex-col gap-4">
        <SectionMarker index="S3" label="재료" labelEn="INGREDIENTS" />
        <p className="sb-headline max-w-[22ch] font-kr text-page-fg">
          쓰는 재료를 전부 적는다
        </p>
        <p className="sb-body max-w-[44ch] text-page-fg-sub">
          아래는 이 사이트의 연출에 등장하는 재료입니다. 제품별 실제 구성은
          제품 페이지의 표시사항을 확인해 주세요.
        </p>
      </div>

      {/* WebGL 로 대체되더라도 이 목록은 DOM 에 남는다. */}
      <ul
        data-ingredient-list
        className="flex flex-wrap gap-x-5 gap-y-2 text-page-fg-sub"
      >
        {CUTOUT_INGREDIENTS.map((item) => (
          <li
            key={item.slug}
            data-ingredient={item.slug}
            className="font-kr text-base sm:text-lg"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
