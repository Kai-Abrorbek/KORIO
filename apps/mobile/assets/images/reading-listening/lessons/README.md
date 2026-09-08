# 읽기 레슨 사진

**파일 하나 넣고 명령 한 번.** 그게 전부다.

```
1. 이 폴더에  <레슨 code>.webp  를 넣는다
2. pnpm --filter mobile gen:reading-images
3. 끝
```

시드도 서버 배포도 다시 할 필요 없다. 사진이 없는 레슨은 화면이 주제별
플레이스홀더(레슨마다 다른 배색 + 주제 아이콘)를 그리므로, 한 번에 다
채우지 않아도 된다.

## 파일 이름

이름은 **레슨 code 와 정확히 같아야 한다.** 서버 시드가 정하는 값이고,
`media.imageKey` 로 앱에 내려온다.

| 급 | 편수 | 이름 |
|---|---|---|
| 1급 | 40편 | `culture-reading-1-01.webp` … `culture-reading-1-40.webp` |
| 2급 | 28편 | `culture-reading-2-01.webp` … `culture-reading-2-28.webp` |
| 3급 | 20편 | `culture-reading-3-01.webp` … `culture-reading-3-20.webp` |

번호는 **두 자리**다 (`-1-07`, `-1-7` 아니다). 이름이 이 모양이 아니면
생성 스크립트가 건너뛰고 무엇을 건너뛰었는지 알려 준다.

어느 code 가 어느 글인지는 `apps/api/src/seed/data/reading/reading-level*-*.ts`
에서 `level1Lesson(7, '제목', '주제', …)` 의 첫 인자가 단원 번호다.

## 규격

측정해서 나온 값이다. 히어로는 **카드 폭 전체 × 188pt** 에 `cover` 로 그려진다.

| | 값 | 왜 |
|---|---|---|
| 형식 | **webp** | png 로 넣으면 용량이 10배다 (실측: 540KB → 55KB) |
| 가로 | **1200px** | 3x 밀도 폰이 가로 ~1000px 를 요구한다. 그보다 작으면 확대돼서 흐려진다 |
| 세로 | 가로의 60~75% | 어차피 위아래가 잘린다. 3:2 근처면 낭비가 적다 |
| 용량 | 장당 **150KB 이하** | 88장이 전부 설치 파일에 들어간다 |

- **아래 1/3 에 중요한 것을 두지 마라.** 어두운 그라데이션이 깔리고 그 위에
  제목이 앉는다. 왼쪽 위에도 단원 배지와 소요시간 칩이 얹힌다
- 글자가 박힌 이미지는 피한다 (4개 언어 사용자가 본다)
- 모서리를 둥글게 깎아 둘 필요 없다. 카드가 `borderRadius: 28` 로 잘라 준다

### png 로 이미 넣어 버렸다면

```bash
# lessons/ 에서
python3 -c "
from PIL import Image; import glob, os, shutil
os.makedirs('_png-원본', exist_ok=True)
for f in sorted(glob.glob('*.png')):
    Image.open(f).convert('RGB').save(f[:-4]+'.webp','WEBP',quality=85,method=6)
    shutil.move(f, '_png-원본/'+f)
"
pnpm --filter mobile gen:reading-images
```

`_png-원본/` 은 gitignore 돼 있다. 확인하고 지우면 된다.
