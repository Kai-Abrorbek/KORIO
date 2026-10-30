# 카페에 가요 / 카페에서 공부해요

우즈베크어권 학습자에게 장소 조사 `에`와 `에서`를 설명하는 9:16 릴스. 영상은 문법 소개 → 핵심 규칙 → `에` 설명과 예문 → 질문 → `에서` 설명과 예문 → 질문 → 비교 → 구체적 공유 CTA의 8단계로 구성한다.

```powershell
cd tools/promo-video
node src/grammar/generate-audio.mjs
pnpm exec remotion render src/grammar/index.ts CafeEvsEse out/grammar-e-vs-eseo.mp4
pnpm exec remotion still src/grammar/index.ts CafeEvsEse out/grammar-e-vs-eseo-cover.png --frame=105
ffmpeg -i out/grammar-e-vs-eseo.mp4 -c:v copy -af loudnorm=I=-16:TP=-1.5:LRA=11 -c:a aac -b:a 192k out/grammar-e-vs-eseo-normalized.mp4
```

대본과 ElevenLabs 음성 설정은 `voice-lines.json`, 렌더용 길이는 `voice-timing.json`에 있다. 우즈베크어 설명은 우즈베크어 원어민 남성 음성 `Sarhad Siz - Narrator`, 한국어 예문은 한국인 남성 음성 `Yong Gyu`를 사용한다. 내레이션과 배경음, 효과음은 `public/grammar/`에 있고 렌더 결과는 `out/`에 둔다. 게시용 캡션은 `social/captions/grammar-e-eseo-uz.txt`에 있다. 게시 여부와 시각은 별도로 결정한다.
