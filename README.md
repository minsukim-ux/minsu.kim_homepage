# ㈜스윗밸런스 브랜드 쇼케이스

샐러드·즉석섭취식품 제조사 ㈜스윗밸런스의 모션 중심 브랜드 사이트입니다.
결제·장바구니는 없고, 구매 CTA는 외부 판매 채널로 링크아웃합니다.

## 기술 스택

| 영역 | 선택 |
| --- | --- |
| 프레임워크 | Next.js 15 (App Router) + TypeScript |
| 스타일 | Tailwind CSS v4 (CSS-first `@theme`) |
| 모션 | GSAP 3 (ScrollTrigger · SplitText · CustomEase · Flip) + `@gsap/react` |
| 스무스 스크롤 | Lenis (GSAP ticker 동기화) |
| WebGL | Three.js + @react-three/fiber + @react-three/drei |
| 2D 물리 | Matter.js |
| 사운드 | Web Audio API (라이브러리 없음) |

Framer Motion은 쓰지 않습니다. 모션은 전부 GSAP으로 통일합니다.

## 실행

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # 프로덕션 빌드
npm run typecheck  # tsc --noEmit
npm run assets:doc # ASSETS.md 재생성
```

## 에셋

실제 영상·사진은 아직 없습니다. 대신:

- `lib/assets.ts` 가 에셋 매니페스트(유일한 진실 공급원)입니다.
- 파일이 없는 슬롯은 자동으로 플레이스홀더가 렌더링됩니다.
  **에셋 0개 상태에서도 사이트는 끝까지 동작합니다.**
- `ASSETS.md` 는 매니페스트에서 자동 생성됩니다. 발주서로 그대로 쓸 수 있습니다.
- 같은 경로에 실제 파일을 넣으면 **코드 수정 없이** 교체됩니다.
  (dev는 새로고침 즉시 반영, 프로덕션은 재빌드 필요)

외부 이미지·영상 URL은 하드코딩하지 않습니다. 전부 `/public/assets` 로컬 파일입니다.

## 확인이 필요한 데이터

지어낸 수치·인증명·거래처명·생산시각을 코드에 넣지 않는다는 원칙을 지킵니다.
아래 값은 담당자가 확인해 `verified: true` 로 바꿀 때까지 화면에 나오지 않습니다.

| 항목 | 파일 |
| --- | --- |
| 공정 관리 지표 24개 | `lib/processData.ts` |
| 보유 인증 · 거래처 · 마퀴 문구 | `lib/trustData.ts` |
| 사업자 정보 · 배포 도메인 | `lib/siteMeta.ts` |

## 구현 진행

- [x] **Phase 1 — 뼈대**: Next.js 세팅, Lenis+GSAP 동기화, 디자인 토큰,
      에셋 매니페스트·플레이스홀더 시스템, ASSETS.md, 섹션 스켈레톤 S0~S9
- [ ] **Phase 2 — 스크롤 서사**: S0/S1/S2, SplitText 텍스트 비행, 가로 스크롤 타임라인
- [ ] **Phase 3 — 감각**: 로더+로고 모핑, 커스텀 커서+물리 트레일, 스포트라이트, 사운드, 페이지 전환
- [ ] **Phase 4 — 모듈**: BowlBuilder, QCGame, FreshnessCounter
- [ ] **Phase 5 — WebGL & 마감**: S3 재료 필드, S4 제품 인터랙션, Lite 모드, 성능·접근성 감사

## 배포

`NEXT_PUBLIC_SITE_URL` 을 배포 도메인으로 주입하면 metadata/OG/JSON-LD의 절대 URL이 채워집니다.

루트의 `index.html` 은 이 Next 앱 이전에 GitHub Pages로 서빙되던 정적 페이지입니다.
새 사이트를 배포하기 전까지 기존 주소가 죽지 않도록 남겨 두었습니다.
