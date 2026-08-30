import { Section } from './Section'
import { MILESTONES } from '@/lib/brand'
import { HandUnderline } from '@/components/graphics/textures'

export function S1Statement() {
  return (
    <Section id="statement" label="Since 2014" bg="var(--sb-paper)">
      <div className="flex flex-col gap-16 md:gap-24">
        {MILESTONES.map((m, i) => (
          <p
            key={i}
            data-statement={i}
            className="max-w-[20ch] text-[clamp(2rem,6vw,5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
          >
            {m.year ? (
              <span className="sb-serif mr-4 block text-[0.32em] tracking-[0.25em] text-fog">
                {m.year}.{m.month}
              </span>
            ) : null}
            {m.figure ? (
              <span className="relative inline-block">
                <span data-countup={m.figure}>{m.figure}</span>
                <HandUnderline className="absolute -bottom-2 left-0 h-3 w-full text-terracotta" />
              </span>
            ) : null}{' '}
            <span className="text-fog">{m.place}</span>
            <br />
            {m.line}
          </p>
        ))}
      </div>
    </Section>
  )
}
