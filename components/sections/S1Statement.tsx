import { MILESTONES } from '@/lib/brand'
import { HandUnderline, PaperTexture } from '@/components/graphics/textures'
import { StatementMotion } from '@/components/anim/StatementMotion'

export function S1Statement() {
  return (
    <StatementMotion>
      <section
        id="statement"
        data-bg="paper"
        className="relative flex min-h-[100svh] items-center overflow-hidden px-6 md:px-12"
      >
        <PaperTexture opacity={0.35} />
        <p className="sb-label absolute left-6 top-16 md:left-12">Since 2014</p>

        <div className="relative mx-auto grid w-full max-w-[1440px] place-items-start">
          {MILESTONES.map((m, i) => (
            <p
              key={i}
              data-statement={i}
              className="col-start-1 row-start-1 max-w-[20ch] text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
            >
              <span data-words className="block">
                {m.year ? (
                  <span className="sb-serif mb-4 block text-[0.28em] tracking-[0.25em] text-fog">
                    {m.year}.{m.month} {m.place}
                  </span>
                ) : (
                  <span className="sb-serif mb-4 block text-[0.28em] tracking-[0.25em] text-fog">
                    {m.place}
                  </span>
                )}
                {m.figure ? (
                  <span className="relative mr-3 inline-block">
                    <span data-countup={m.figure}>{m.figure}</span>
                    <HandUnderline
                      className="absolute -bottom-1 left-0 h-3 w-full text-terracotta"
                      color="currentColor"
                    />
                  </span>
                ) : null}
                {m.line}
              </span>
            </p>
          ))}
        </div>
      </section>
    </StatementMotion>
  )
}
