import Link from 'next/link'
import { INGREDIENTS } from '@/lib/ingredients'
import { IngredientIcon } from '@/components/graphics/ingredients'

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <p className="sb-label mb-6">404</p>
        <h1 className="mb-6 text-[clamp(2rem,7vw,5rem)] font-bold tracking-[-0.03em]">
          이 접시는 비어 있습니다
        </h1>
        <ul className="mb-10 flex justify-center gap-4">
          {INGREDIENTS.slice(0, 6).map((i, idx) => (
            <li key={i.id}>
              <IngredientIcon id={i.id} size={56} seed={idx * 17} />
            </li>
          ))}
        </ul>
        <Link href="/" className="border border-primary px-6 py-3 text-primary">
          처음으로 돌아가기
        </Link>
      </div>
    </main>
  )
}
