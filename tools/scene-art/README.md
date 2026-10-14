# scene-art — 캐릭터 배경 장면 (서울 여행)

아바타 꾸미기 상점의 `scene` 아이템 그림 6장. 코드로 그린 SVG를 WebP로 구워서 두 앱에 넣는다.

| id | 그림 |
|---|---|
| scene_gyeongbokgung | 경복궁 야경 (전설) |
| scene_namsan | 남산타워 노을 |
| scene_hangang | 한강 라면 |
| scene_cvs | 편의점의 밤 |
| scene_jeju | 제주 유채꽃 (에픽) |
| scene_snow | 눈 내리는 서울 (에픽) |

- 캔버스 1200×1000. 캐릭터는 가운데에 서고 발은 y≈900 — 랜드마크는 양옆·머리 위에.
- 움직이지 않는다 (반짝임·흔들림 금지).
- `glyphs.json`: 간판 글자(편의점24+1라면, 펫 책의 한글)의 Jua 윤곽 — `python apps/api/scripts/sticker-glyphs.py Jua-Regular.ttf '편의점24+1라면한글'` 로 뽑음.
- 굽기: 루트에서 `npx tsx tools/scene-art/render.ts`
- 아이템 목록·가격: `apps/api/src/cosmetics/cosmetics.const.ts` (가격은 어드민 설정 `COSMETICS.<index>.price`)
