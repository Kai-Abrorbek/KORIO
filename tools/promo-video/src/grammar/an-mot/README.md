# 안 vs 못

우즈베크어권 학습자용 9:16 릴스. `안 = 하지 않음`, `못 = 할 수 없음`을 명확하게 구분한다. 8블록 구성은 Hook → Lead → Body 1 → Open loop 1 → Body 2 → Open loop 2 → Body 3 → CTA다. 예문은 한국어 남성, 설명은 ElevenLabs 우즈베크어 남성 음성으로 읽는다.

```powershell
cd tools/promo-video
node src/grammar/an-mot/generate-audio.mjs
pnpm exec remotion render src/grammar/an-mot/index.ts AnMotReel out/grammar-an-vs-mot.mp4
pnpm exec remotion still src/grammar/an-mot/index.ts AnMotCover social/covers/grammar-an-mot.png
pnpm exec remotion still src/grammar/an-mot/index.ts AnMotCover out/grammar-an-mot-guides.png --props='{"guides":true}'
```

대본과 음성 설정은 `lines.json`, 실제 음성 길이는 `timing.json`, 렌더된 음성은 `public/grammar-an-mot`에 있다. 표지는 피드와 프로필 크롭을 고려해 핵심 글자를 화면 중앙에 배치했다. 결과 영상은 `out/`, 게시 캡션은 `social/captions/grammar-an-mot-uz.txt`에 둔다. 업로드는 별도 요청을 받았을 때만 진행한다.
