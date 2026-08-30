# ASSETS — 에셋 준비 가이드

모든 에셋은 `lib/assets.ts` 매니페스트를 통해서만 참조된다.
파일이 없으면 코드 생성 폴백(웜 그라디언트 / 재료 SVG 액자 / 워드마크)이 자동으로 대신한다.
**외부 URL 하드코딩 금지** — Unsplash, placeholder 서비스, 이미지 CDN 전부.

---

## 트랙 A — 코드로 생성 (작업 완료, 추가 다운로드 불필요)

- 재료 SVG 30종: `components/graphics/ingredients/`
- 종이 질감 / 필름 그레인 / 잉크 번짐 마스크 / 손그림 밑줄·화살표: `components/graphics/textures.tsx`
- 영상 폴백 웜 그라디언트 캔버스: `components/media/WarmGradient.tsx`

## 트랙 B — 무료 스톡 영상 (직접 다운로드)

출처는 **Pexels / Pixabay / Mixkit / Coverr 만** 사용한다. 모두 상업 이용 가능, 출처 표기 의무 없음.
**밝고 따뜻한 톤만** 고른다. 어둡고 무거운 클립은 브랜드와 맞지 않는다.

| 슬롯 | 파일명 | 검색 키워드 (영문) | 길이 | 조건 |
| --- | --- | --- | --- | --- |
| 히어로 가로 | `hero_16x9.mp4` | person eating salad smiling sunlight, bright kitchen fresh vegetables | 8~12s | 밝은 자연광, 웃는 인물 |
| 히어로 세로 | `hero_9x16.mp4` | 위와 동일 (Vertical 필터) | 8~12s | 모바일 필수 |
| 제품 루프 1 | `loop_1.mp4` | tossing salad bowl | 4~6s | 클로즈업, 무음 |
| 제품 루프 2 | `loop_2.mp4` | wrap sandwich hands | 4~6s | 클로즈업, 무음 |
| 제품 루프 3 | `loop_3.mp4` | noodles chopsticks close up | 4~6s | 클로즈업, 무음 |
| 제품 루프 4 | `loop_4.mp4` | pouring dressing | 4~6s | 클로즈업, 무음 |
| 필름 | `film_main.mp4` | friends eating lunch together bright | 15~30s | S8용, 선택 |

조건: 무음 · 무자막 · 무워터마크.

넣는 위치: `public/assets/video/`

리사이즈·재압축 (720p, CRF 28, 개당 4MB 이하) 및 포스터 추출:

```bash
ffmpeg -i in.mp4 -an -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow \
  -movflags +faststart public/assets/video/hero_16x9.mp4

ffmpeg -i public/assets/video/hero_16x9.mp4 -vframes 1 -q:v 4 \
  public/assets/video/hero_16x9_poster.jpg
```

세로 슬롯은 `scale=720:-2` 로 처리한다. 각 영상의 첫 프레임을 `*_poster.jpg` 로 반드시 저장한다.

## 트랙 C — 자사 보유 자산 (직접 넣기)

| 경로 | 내용 |
| --- | --- |
| `public/assets/about/{ingredient-id}.jpg` | ABOUT 시리즈 원물 컷. id는 `lib/ingredients.ts` 참조 (예: `radish.jpg`, `radicchio.jpg`, `kabocha.jpg`, `cucumber.jpg`) |
| `public/assets/product/{sku}.jpg` | 제품 대표컷. sku는 `lib/products.ts` 참조 |
| `public/assets/recipe/{slug}.jpg` | Recipe 시리즈 컷 |
| `public/assets/logo/logo.svg` | 로고 벡터 — **대체 불가**, 반드시 원본 SVG |

### 저해상도 대응 규칙 (전역 강제)

보유 사진은 인스타 업로드본(1080px 내외, JPEG 재압축)이라는 전제로 처리한다.

1. 사진 최대 표시 폭 **720px**. 풀블리드 배경 사용 금지.
2. 모든 사진은 여백이 넉넉한 종이 액자(`components/media/Framed.tsx`) 안에 넣는다.
3. 필름 그레인 오버레이 자동 적용 (opacity 0.12~0.18, mix-blend-mode: overlay).
4. 웜 듀오톤 자동 적용 (`sepia(0.12) saturate(1.05) contrast(1.03)`).
5. 확대 애니메이션 금지. scale은 1.0 초과 불가, 축소만 허용.
6. 모바일 표시 폭은 화면 폭의 88% 이하.

원본이 1080px이므로 `sizes`를 정확히 지정해 업스케일을 막는다. 이미 `Framed`가 처리한다.
