# 민수의 홈페이지

민수(minsukim-ux)의 개인 홈페이지 리포지토리입니다.

홈페이지 접속 링크: https://minsukim-ux.github.io/minsu.kim_homepage/

---

## Sweet Balance 브랜드 사이트 (개발 중)

Next.js 15 (App Router) + TypeScript + Tailwind + GSAP/Lenis 기반.

```bash
npm install
npm run dev
```

### 구조

- `app/` — App Router. `api/og`는 공유 카드용 동적 OG.
- `components/graphics/ingredients/` — 재료 SVG 30종(+ 레지스트리). 사진 없이도 화면을 채우는 자산.
- `components/media/Framed.tsx` — 모든 사진이 통과하는 액자 컴포넌트(720px 상한·그레인·듀오톤·폴백).
- `components/anim/` — 스크롤 서사(BgFlow, HeroMotion, StatementMotion, AboutScroller).
- `components/experience/` — 로더·커서·잉크 스포트라이트·사운드·페이지 전환.
- `components/modules/` — BowlBuilder, BalanceGame, MonthlyMood, IngredientField, 제품 갤러리.
- `lib/` — 브랜드/재료/제품/채널 데이터와 순수 로직(bowlLogic, colorMatch, physicsShapes).

접근성: axe-core 위반 0(주요 스크롤 지점 7곳 검사), 키보드 탐색·포커스 링 유지,
`prefers-reduced-motion`에서 핀·비행·물리·자동재생 해제.

에셋 준비는 [ASSETS.md](./ASSETS.md) 참고.
브랜드 상수는 `lib/brand.ts`, 제품/채널 플레이스홀더는 `lib/products.ts`·`lib/channels.ts`에 있으며
확인되지 않은 값은 전부 `null` + TODO 상태입니다.
