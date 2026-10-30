# 카페에 가요 / 카페에서 공부해요

장소 조사 `에`와 `에서`를 설명하는 9:16 릴스. 영상은 훅 → 리드 → 예문 1 → 질문 → 예문 2 → 질문 → 비교 → 공유 CTA의 8단계로 구성한다.

```powershell
cd tools/promo-video
pnpm exec remotion render src/grammar/index.ts CafeEvsEse out/grammar-e-vs-eseo.mp4
pnpm exec remotion still src/grammar/index.ts CafeEvsEse out/grammar-e-vs-eseo-cover.png --frame=53
```

내레이션과 배경음, 효과음은 `public/grammar/`에 있다. 원본 한국어 내레이션은 기존 `ai/voice.mjs`의 Azure 음성 `ko-KR-SunHiNeural`로 만들었다. 렌더 결과는 `out/`에 두며, 게시용 캡션은 `social/captions/grammar-e-eseo-ko.txt`에 있다. 게시 여부와 시각은 별도로 결정한다.
