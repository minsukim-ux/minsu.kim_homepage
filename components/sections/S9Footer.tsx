import { Wordmark } from '@/components/media/Wordmark'
import { BRAND } from '@/lib/brand'

export function S9Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-paper px-6 pb-16 pt-32 md:px-12">
      <div className="mx-auto max-w-[1440px]">
        <p className="sb-label mb-10">{BRAND.message}</p>
        <Wordmark className="w-full text-primary" />
        <p className="mt-10 text-[13px] text-fog">
          {BRAND.legalKo} · {BRAND.category}
        </p>
      </div>
    </footer>
  )
}
