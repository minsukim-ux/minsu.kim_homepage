# 에셋 발주서

> 이 문서는 `/lib/assets.ts` 매니페스트에서 자동 생성됩니다.
> 직접 수정하지 말고 `npm run assets:doc` 을 실행하세요.

## 원칙

1. 아래 경로에 파일을 넣으면 **코드 수정 없이** 교체됩니다.
   경로·파일명·확장자를 정확히 지켜 주세요.
2. 파일이 없는 슬롯은 자동으로 플레이스홀더가 렌더링됩니다.
   에셋이 0개여도 사이트는 끝까지 동작합니다.
3. 외부 이미지·영상 URL 은 사용하지 않습니다. 전부 이 경로의 로컬 파일입니다.
4. 개발 서버는 새로고침하면 즉시 반영됩니다.
   프로덕션은 파일을 추가한 뒤 다시 빌드해야 합니다.

## 현황

- 전체 슬롯: **77개**
- 채워진 슬롯: **0개**
- 오픈 전 필수(대체 불가): **9개**

## 공통 요구 사항

- 영상: H.264(mp4), 무음 트랙 포함, 첫/끝 프레임을 맞춘 심리스 루프.
  자동재생 정책상 오디오 트랙이 있으면 재생이 차단될 수 있습니다.
- 이미지: 원본은 JPG/PNG 로 주세요. AVIF/WebP 변환은 빌드가 처리합니다.
- 누끼: PNG 알파 투명, 그림자 없이, 여백 8% 이내.
- 오디오: MP3. 루프 소재는 앞뒤 무음 구간을 잘라 주세요.
- 색: 브랜드 그린(#00614E) 계열 기준으로 보정해 주세요.

## 벡터 (2)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/logo/logo.svg` | 벡터 | SVG, viewBox 고정, 모든 path 를 하나로 병합(union) | ≤ 60 KB | Loader(로고 모핑), 헤더, S9 FOOTER | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 로더가 path 를 좌표 샘플링한다. stroke·text 요소 없이 fill path 만. 없으면 "SWEET BALANCE" 워드마크를 벡터화해 동일 연출. |
| `/assets/logo/logo-mark.svg` | 벡터 | SVG, 1:1 정사각 viewBox | ≤ 20 KB | 헤더 축소 상태, favicon, OG 이미지 | 가능 (플레이스홀더로 동작) | ⬜ 없음 |  |

## 영상 (20)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/video/hero_16x9.mp4` | 영상 | 1920×1080, 12–20s 무한 루프, H.264 + (선택)VP9, 무음 트랙 | ≤ 6 MB | S0 HERO (데스크톱) | **불가 (필수)** | ⬜ 없음 | 루프 이음선이 보이지 않게 첫/끝 프레임 일치. 색보정은 브랜드 그린 쪽으로. |
| `/assets/video/hero_9x16.mp4` | 영상 | 1080×1920, 12–20s 무한 루프, H.264, 무음 트랙 | ≤ 4 MB | S0 HERO (모바일) | **불가 (필수)** | ⬜ 없음 | 모바일은 반드시 세로 영상. 가로 영상 크롭 금지. |
| `/assets/video/process/station_01.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 01 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_02.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 02 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_03.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 03 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_04.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 04 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_05.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 05 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_06.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 06 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_07.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 07 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_08.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 08 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_09.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 09 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_10.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 10 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_11.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 11 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/process/station_12.mp4` | 영상 | 1280×720, 4–6s 루프, H.264, 무음 | ≤ 1.5 MB | S2 PROCESS 스테이션 12 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 해당 공정 B-roll. 없으면 그라디언트 플레이스홀더로 동작. |
| `/assets/video/product/loop_01.mp4` | 영상 | 1080×1350 (4:5), 2–4s 루프, H.264, 무음 | ≤ 1.2 MB | S4 카드 01 호버/뷰포트 진입 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 정지 이미지가 그대로 유지된다. |
| `/assets/video/product/loop_02.mp4` | 영상 | 1080×1350 (4:5), 2–4s 루프, H.264, 무음 | ≤ 1.2 MB | S4 카드 02 호버/뷰포트 진입 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 정지 이미지가 그대로 유지된다. |
| `/assets/video/product/loop_03.mp4` | 영상 | 1080×1350 (4:5), 2–4s 루프, H.264, 무음 | ≤ 1.2 MB | S4 카드 03 호버/뷰포트 진입 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 정지 이미지가 그대로 유지된다. |
| `/assets/video/product/loop_04.mp4` | 영상 | 1080×1350 (4:5), 2–4s 루프, H.264, 무음 | ≤ 1.2 MB | S4 카드 04 호버/뷰포트 진입 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 정지 이미지가 그대로 유지된다. |
| `/assets/video/product/loop_05.mp4` | 영상 | 1080×1350 (4:5), 2–4s 루프, H.264, 무음 | ≤ 1.2 MB | S4 카드 05 호버/뷰포트 진입 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 정지 이미지가 그대로 유지된다. |
| `/assets/video/product/loop_06.mp4` | 영상 | 1080×1350 (4:5), 2–4s 루프, H.264, 무음 | ≤ 1.2 MB | S4 카드 06 호버/뷰포트 진입 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 정지 이미지가 그대로 유지된다. |

## 이미지 (13)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/video/hero_poster.jpg` | 이미지 | 1920×1080 (모바일 겸용), JPG/AVIF | ≤ 200 KB | S0 HERO | **불가 (필수)** | ⬜ 없음 | LCP 대상. 영상 로드 후 크로스페이드되므로 첫 프레임과 동일 구도. |
| `/assets/video/process/station_01.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 01 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_02.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 02 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_03.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 03 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_04.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 04 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_05.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 05 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_06.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 06 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_07.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 07 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_08.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 08 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_09.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 09 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_10.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 10 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_11.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 11 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |
| `/assets/video/process/station_12.jpg` | 이미지 | 1280×720, JPG | ≤ 80 KB | S2 PROCESS 스테이션 12 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 지연 로드 전 표시용 포스터. |

## 제품 사진 (6)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/product/product_01.jpg` | 제품 사진 | 1600×2000 (4:5), JPG 원본 → AVIF/WebP 자동 변환 | ≤ 400 KB (원본) | S4 PRODUCTS 카드 01, /products | **불가 (필수)** | ⬜ 없음 | 동일 조명·동일 앵글로 촬영해 카드 간 톤이 튀지 않게. |
| `/assets/product/product_02.jpg` | 제품 사진 | 1600×2000 (4:5), JPG 원본 → AVIF/WebP 자동 변환 | ≤ 400 KB (원본) | S4 PRODUCTS 카드 02, /products | **불가 (필수)** | ⬜ 없음 | 동일 조명·동일 앵글로 촬영해 카드 간 톤이 튀지 않게. |
| `/assets/product/product_03.jpg` | 제품 사진 | 1600×2000 (4:5), JPG 원본 → AVIF/WebP 자동 변환 | ≤ 400 KB (원본) | S4 PRODUCTS 카드 03, /products | **불가 (필수)** | ⬜ 없음 | 동일 조명·동일 앵글로 촬영해 카드 간 톤이 튀지 않게. |
| `/assets/product/product_04.jpg` | 제품 사진 | 1600×2000 (4:5), JPG 원본 → AVIF/WebP 자동 변환 | ≤ 400 KB (원본) | S4 PRODUCTS 카드 04, /products | **불가 (필수)** | ⬜ 없음 | 동일 조명·동일 앵글로 촬영해 카드 간 톤이 튀지 않게. |
| `/assets/product/product_05.jpg` | 제품 사진 | 1600×2000 (4:5), JPG 원본 → AVIF/WebP 자동 변환 | ≤ 400 KB (원본) | S4 PRODUCTS 카드 05, /products | **불가 (필수)** | ⬜ 없음 | 동일 조명·동일 앵글로 촬영해 카드 간 톤이 튀지 않게. |
| `/assets/product/product_06.jpg` | 제품 사진 | 1600×2000 (4:5), JPG 원본 → AVIF/WebP 자동 변환 | ≤ 400 KB (원본) | S4 PRODUCTS 카드 06, /products | **불가 (필수)** | ⬜ 없음 | 동일 조명·동일 앵글로 촬영해 카드 간 톤이 튀지 않게. |

## 누끼 PNG (24)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/cutout/arugula.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 루꼴라 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/romaine.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 로메인 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/kale.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 케일 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/spinach.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 시금치 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/radicchio.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 라디치오 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/basil.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 바질 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/tomato-cherry.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 방울토마토 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/olive-black.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 블랙올리브 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/blueberry.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 블루베리 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/cranberry.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 크랜베리 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/chickpea.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 병아리콩 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/corn.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 옥수수 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/lentil.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 렌틸콩 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/almond.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 아몬드 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/walnut.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 호두 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/avocado.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 아보카도 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/paprika.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 파프리카 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/cucumber.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 오이 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/carrot.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 당근 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/beet.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 비트 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/pumpkin.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 단호박 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/egg-boiled.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 삶은달걀 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/feta.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 페타치즈 누끼. 그림자 없이, 정면 약간 위 앵글. |
| `/assets/cutout/chicken-breast.png` | 누끼 PNG | 512×512, PNG 알파 투명, 여백 8% 이내 | ≤ 120 KB | 커서 트레일, S3 재료 필드, S5 BOWL BUILDER, S6 QC GAME | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 닭가슴살 누끼. 그림자 없이, 정면 약간 위 앵글. |

## 텍스처 (3)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/texture/grain.png` | 텍스처 | 512×512, PNG, 타일링 가능한 모노 노이즈 | ≤ 60 KB | 전역 오버레이, S1, S8 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 CSS 그라디언트만으로 동작. |
| `/assets/texture/bowl_normal.jpg` | 텍스처 | 1024×1024, JPG, 노멀맵 | ≤ 250 KB | S5 BOWL BUILDER (3D 볼) | 가능 (플레이스홀더로 동작) | ⬜ 없음 |  |
| `/assets/texture/bowl_roughness.jpg` | 텍스처 | 1024×1024, JPG, 러프니스맵 | ≤ 250 KB | S5 BOWL BUILDER (3D 볼) | 가능 (플레이스홀더로 동작) | ⬜ 없음 |  |

## 이미지 시퀀스 (1)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/sequence/pack/pack_0001.webp … pack_0060.webp` | 이미지 시퀀스 | 1280×720 × 60프레임 (24fps 기준 2.5s), WebP | ≤ 40 KB / 프레임 (합계 2.4 MB) | S9 이스터에그 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 전량 선택 에셋. 없으면 이스터에그는 파티클만으로 동작. |

## 오디오 (6)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/audio/veg_crunch_loop.mp3` | 오디오 | 스테레오 MP3 128kbps, 4–8s 심리스 루프 | ≤ 150 KB | 전역 (스크롤 속도 연동) | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 채소 사각거림. playbackRate 0.85–1.25 범위에서 자연스러워야 함. |
| `/assets/audio/ui_tick.mp3` | 오디오 | 모노 MP3, 60–120ms | ≤ 15 KB | 전역 호버 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 Web Audio 오실레이터로 합성 대체. |
| `/assets/audio/ui_click.mp3` | 오디오 | 모노 MP3, 80–150ms | ≤ 15 KB | 전역 클릭 | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 오실레이터 합성 대체. |
| `/assets/audio/whoosh.mp3` | 오디오 | 스테레오 MP3, 400–800ms | ≤ 40 KB | 섹션 전환, 페이지 전환 커튼 | 가능 (플레이스홀더로 동작) | ⬜ 없음 |  |
| `/assets/audio/game_success.mp3` | 오디오 | 스테레오 MP3, 600ms–1.2s | ≤ 50 KB | S6 QC GAME 성공 | 가능 (플레이스홀더로 동작) | ⬜ 없음 |  |
| `/assets/audio/game_fail.mp3` | 오디오 | 모노 MP3, 200–400ms | ≤ 25 KB | S6 QC GAME 과검출 페널티 | 가능 (플레이스홀더로 동작) | ⬜ 없음 |  |

## 폰트 (2)

| 파일경로 | 유형 | 해상도·길이 | 용량상한 | 쓰이는 섹션 | 대체 가능 | 현재 | 비고 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/assets/font/PretendardVariable.woff2` | 폰트 | Variable woff2, weight 45–920, 한글 서브셋 | ≤ 1.2 MB | 전역 (한글) | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 Apple SD Gothic Neo / Malgun Gothic 으로 폴백. 라이선스 OFL. |
| `/assets/font/InterVariable.woff2` | 폰트 | Variable woff2, weight 100–900, latin + latin-ext | ≤ 400 KB | 전역 (영문·숫자) | 가능 (플레이스홀더로 동작) | ⬜ 없음 | 없으면 시스템 산세리프로 폴백. |

## 별도 확인이 필요한 데이터 (에셋 아님)

에셋과 별개로, 아래 값은 담당자 확인 전까지 화면에 표시되지 않습니다.

| 항목 | 파일 | 상태 |
| --- | --- | --- |
| 공정 관리 지표 24개 | `lib/processData.ts` | 전부 미확정 (`—` 표시) |
| 보유 인증 | `lib/trustData.ts` | 전부 미확정 (미표시) |
| 거래처명·로고 | `lib/trustData.ts` | 전부 미확정 (미표시) |
| 마퀴 문구(인증·연혁·생산주기) | `lib/trustData.ts` | 미확정 (미표시) |
| 외부 판매 채널 URL | `lib/trustData.ts` | 미확정 |
| 생산·소비기한 기준 시각 | `lib/freshness.ts` | Phase 4 에서 추가 |
| 사업자 정보 | `lib/siteMeta.ts` | 미확정 (미표시) |
