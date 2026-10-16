# levelup-audio

레벨업 연출(한글 로켓)의 목소리·효과음을 ElevenLabs 로 만든다. 두 앱에 같은 파일이 들어간다.

| 파일 | 내용 | 언제 (연출 ms) |
| --- | --- | --- |
| vo-3 / vo-2 / vo-1 | "셋!" "둘!" "하나!" | 600 / 1200 / 1800 |
| vo-go | "출발!" | 2400 |
| vo-arrive | "도착! 축하해요!" | 5450 |
| rumble | 엔진 굉음 (모이다가 출발에 커짐) | 1500 |
| launch | 발사 휙 | 2400 |
| (level-up.wav) | 착륙 — 원래 있던 레벨업 효과음 | 5150 |

시간표는 `level-up-cinematic` 의 `CINEMA_SOUND_CUES` 다 (텔레그램 shared/model · 모바일 components/level-up).

처음 커밋된 파일은 임시다 — 목소리는 무음, 효과음은 합성음. 진짜 소리로 바꾸려면 레포 루트에서:

```bash
node tools/levelup-audio/generate.mjs            # 목소리 + 효과음
node tools/levelup-audio/generate.mjs --voice-only
```

`ELEVENLABS_API_KEY` 와 목소리 ID(`LEVELUP_VOICE_ID`, 없으면 `ELEVENLABS_DEFAULT_VOICE_ID`)를
환경 변수나 `apps/api/.env` 에서 읽는다. 모델은 기본 `eleven_v3` (`LEVELUP_TTS_MODEL` 로 바꾼다).
