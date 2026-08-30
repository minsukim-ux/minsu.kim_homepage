import { BgFlow } from '@/components/anim/BgFlow'
import { S0Hero } from '@/components/sections/S0Hero'
import { S1Statement } from '@/components/sections/S1Statement'
import { S2About } from '@/components/sections/S2About'
import { S3Field } from '@/components/sections/S3Field'
import { S4Products } from '@/components/sections/S4Products'
import { S5BowlBuilder } from '@/components/sections/S5BowlBuilder'
import { S6BalanceGame } from '@/components/sections/S6BalanceGame'
import { S7MonthlyMood } from '@/components/sections/S7MonthlyMood'
import { S8Channels } from '@/components/sections/S8Channels'
import { S9Footer } from '@/components/sections/S9Footer'

export default function Page() {
  return (
    <main id="main">
      <BgFlow />
      <S0Hero />
      <S1Statement />
      <S2About />
      <S3Field />
      <S4Products />
      <S5BowlBuilder />
      <S6BalanceGame />
      <S7MonthlyMood />
      <S8Channels />
      <S9Footer />
    </main>
  )
}
