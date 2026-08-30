import { S0Hero } from '@/components/sections/S0Hero'
import { S1Statement } from '@/components/sections/S1Statement'
import { S2Process } from '@/components/sections/S2Process'
import { S3IngredientField } from '@/components/sections/S3IngredientField'
import { S4Products } from '@/components/sections/S4Products'
import { S5BowlBuilder } from '@/components/sections/S5BowlBuilder'
import { S6QCGame } from '@/components/sections/S6QCGame'
import { S7Freshness } from '@/components/sections/S7Freshness'
import { S8Trust } from '@/components/sections/S8Trust'
import { S9Footer } from '@/components/sections/S9Footer'
import { BackgroundFlow } from '@/components/core/BackgroundFlow'

/**
 * 원페이지 스크롤. S0 → S9.
 *
 * 섹션 리듬(다크 → 라이트 → 다크)은 각 섹션의 data-surface 가 선언하고,
 * BackgroundFlow 가 스크롤에 따라 body 배경을 연속 보간한다(스텝 전환 없음).
 */
export default function HomePage() {
  return (
    <>
      <BackgroundFlow />
      <S0Hero />
      <S1Statement />
      <S2Process />
      <S3IngredientField />
      <S4Products />
      <S5BowlBuilder />
      <S6QCGame />
      <S7Freshness />
      <S8Trust />
      <S9Footer />
    </>
  )
}
