import { INGREDIENTS } from '@/lib/ingredients'
import { InkSpotlight } from '@/components/experience/InkSpotlight'
import { FieldCanvas } from '@/components/modules/FieldCanvas'

export function S3Field() {
  return (
    <section
      id="field"
      data-bg="paper"
      className="relative w-full overflow-hidden px-6 py-28 md:px-12 md:py-40"
      style={{ background: 'linear-gradient(180deg, transparent, rgba(233,163,59,0.16))' }}
    >
      <InkSpotlight targetId="field" />
      <div className="relative mx-auto w-full max-w-[1440px]">
        <p className="sb-label mb-6">Ingredient Field</p>
        <h2 className="mb-12 max-w-[18ch] text-[clamp(2rem,5vw,4.2rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          재료 하나하나가 이 브랜드의 언어다
        </h2>

        <div className="relative h-[70vh] w-full">
          <FieldCanvas />
        </div>

        {/* 정보는 항상 HTML에 남는다 — WebGL 안에만 두지 않는다 */}
        <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[15px] text-fog">
          {INGREDIENTS.map((i) => (
            <li key={i.id}>{i.nameKo}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
