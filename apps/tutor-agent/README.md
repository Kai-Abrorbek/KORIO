# KORIO Voice Tutor Agent

AI 음성 튜터의 음성 구간을 담당하는 long-running LiveKit worker (`src/voice-tutor-agent.ts`).
(옛 Gemini Live 튜터 worker `src/agent.ts` 는 2026-09-30 에 뺐다 — 앱·텔레그램 미니앱 모두 이 튜터를 쓴다.)

관리자 촬영용 `src/grok-promo-agent.ts` 는 별도 worker 다. 일반 수업의 STT·GPT·TTS
설정을 바꾸지 않고, Grok native speech-to-speech 한 연결로 듣기·대화·목소리를 처리한다.
고정 대본이나 미리 만든 음성은 없다. API 가 보내는 성격 지침에 따라 첫 질문부터 생성한다.
운영 설정·기동은 [배포 가이드](../../deploy/README.md#관리자-촬영용-grok-튜터)를 참고한다.

```
KORIO 앱 / 텔레그램 미니앱
      │  WebRTC (마이크 ↑ / 선생님 목소리 ↓)
      ▼
   LiveKit
      │  realtime media
      ▼
 Voice Tutor Agent  ← 이 앱
      │  STT (OpenAI) → API /voice-tutor/agent/sessions/:id/turns/stream (GPT) → TTS (ElevenLabs)
      ▼
   선생님 목소리
```

## 일반 Voice Tutor worker 가 하지 않는 일

- **DB 를 안 본다.** 수업 판단·기억·저장은 전부 API(`/voice-tutor/agent/...`)가 한다.
- **프롬프트를 안 만든다.** 턴마다 API 에 받아쓴 말을 보내고, API 가 스트리밍으로 돌려준 말을 읽는다.

개인화 로직이 API 와 Agent 두 군데로 갈라지면, 튜터가 이상하게 굴 때 어느 쪽
때문인지 알 수가 없다. 그래서 전부 `apps/api` 한 곳에 둔다.

## 실행

### 로컬 개발

이 앱에는 NestJS 의 `ConfigModule` 같은 게 없어서 환경변수를 자동으로 주워오지 않는다.
`apps/tutor-agent/.env` 를 만들고:

```bash
pnpm --filter tutor-agent dev
```

`dev` 스크립트가 `--env-file-if-exists=.env` 로 읽는다. 셸에 `export` 해둔 값으로 돌려도 된다.

### 배포

서버에서는 `.env` 가 필요 없다. `deploy/agent.env` 를 compose 의 `env_file` 이
컨테이너에 직접 주입한다 (`voice_tutor_agent` 서비스). `./deploy.sh` 가 알아서 한다.

```bash
pnpm --filter tutor-agent build
pnpm --filter tutor-agent start   # Docker 가 이걸 돌린다
pnpm --filter tutor-agent test    # 메타데이터·말소리 단위 테스트
```

촬영용 worker 만 개발하려면 같은 LiveKit 프로젝트와 `XAI_API_KEY` 를 `.env` 에 설정한 뒤
`pnpm --filter tutor-agent grok-promo:dev` 를 실행한다. 빌드 후 실행은
`pnpm --filter tutor-agent grok-promo:start`, 전용 검증은 `pnpm --filter tutor-agent grok-promo:test`.
같은 `GROK_PROMO_LIVEKIT_AGENT_NAME` 으로 로컬과 서버 worker 를 동시에 띄우지 않는다.

촬영용 dispatch 는 `grok-promo-metadata.ts` 에서 HMAC·만료 시간·전용 방/참가자를
검증한다. 개인 정보가 들어 있는 전체 metadata 는 로그로 출력하지 않는다.
한 세션은 서버·worker 모두 최대 10분이며, 소유자가 나가거나 공급자 연결이 실패하면
Grok 연결과 방을 닫는다. 대화와 음성은 일반 튜터의 학습 기록·설정에 저장하지 않는다.
끼어들기는 xAI VAD 취소와 RTC 출력 큐 비우기를 함께 하고, 듣지 못한 음성은 서버
대화 기록에서도 truncate/delete 한다. 자막은 실제 화자 identity 로 `lk.transcription` 에 전달한다.

프로토콜 근거: [xAI Speech to Speech](https://docs.x.ai/developers/model-capabilities/audio/speech-to-speech),
[xAI Ephemeral Tokens](https://docs.x.ai/developers/model-capabilities/audio/ephemeral-tokens).
Node 22의 기본 WebSocket 과 짧은 수명의 토큰을 사용하므로 새 운영 의존성은 없다.

`dev` / `start` 는 LiveKit Agents CLI 의 서브커맨드다. worker 가 LiveKit 에 붙어서
대기하다가, API 가 `createDispatch(room, 'korio-voice-tutor')` 를 부르면 그 방으로 들어간다.

## 환경변수

`deploy/agent.env.example` 참고. 기억할 것:

1. `VOICE_TUTOR_LIVEKIT_AGENT_NAME` 은 API 의 같은 이름과 **글자 하나까지** 같아야
   한다. 다르면 dispatch 는 성공하는데 아무도 방에 안 들어온다.
2. `LIVEKIT_URL` 은 API 와 같은 프로젝트를 가리켜야 한다.
3. `OPENAI_API_KEY`(STT), `ELEVENLABS_API_KEY`(TTS), `VOICE_TUTOR_API_URL`(https) 은
   API 의 env 에서 자동으로 오지 않는다. 여기 따로 넣는다.

## API 와의 계약

`src/voice-tutor-metadata.ts` 가 dispatch metadata 계약이다. 원본은
`apps/api/src/voice-tutor/livekit` 쪽이고 여기는 사본이다 (두 앱이 서로를 import 할 수 없다).
**한쪽을 고치면 반드시 다른 쪽도 고칠 것.** 짧은 수명의 agent 토큰이 metadata 로 오므로
metadata 전체를 로그에 찍지 않는다.

## 돈이 나가는 자리

- 학습자가 30초 안에 안 들어오면 접는다.
- `metadata.maxDurationSec`(= 서버 쿼터의 allowedSec)에 도달하면 접는다. 앱에도 같은 타이머가
  있지만 그건 앱을 고치면 우회된다.
- 한도 자체는 API `voice-tutor-quota.service.ts` 가 세션을 발급할 때 정한다.

## 바깥 계정이 막혔을 때 (크레딧 소진 · 키 무효)

2026-10-28 OpenAI 크레딧이 떨어지자 튜터가 인사만 하고 "듣고 있어요" 에 멈췄다 — LiveKit 의 구간
받아쓰기는 실패를 로그로만 남기고 삼킨다. 이제는:

- 받아쓰기(`GuardedOpenAiSTT`)·실시간 오류에서 막힘을 알아채면 워커가 안내 한 마디
  (`voice-tutor-provider` `UNAVAILABLE_SPEECH`)를 하고, 에이전트 attribute `korio.end_reason=unavailable`
  을 남긴 뒤 방을 지운다 → 앱·텔레그램은 "지금은 AI 튜터를 쓸 수 없어요" 를 보인다.
- 대답(API 의 OpenAI)이 막히면 API 가 그 턴에 같은 안내를 말하고 `done.warning=VOICE_TUTOR_PROVIDER_BLOCKED`
  를 보낸다 → 워커가 그 말이 끝난 뒤 같은 방법으로 끝낸다.
- 워커 로그에 `🚫 … 계정이 막혔다` 가 찍히면 OpenAI(또는 ElevenLabs) 결제·키부터 본다.
  잠깐의 429(속도 제한)·5xx 는 막힘이 아니라 원래대로 다시 시도한다.

## 정리 대기

`package.json` 의 `@google/genai`, `@livekit/agents-plugin-google` 은 옛 Gemini worker 용이라
이제 안 쓴다. 지우려면 루트에서 `pnpm remove --filter tutor-agent @google/genai @livekit/agents-plugin-google`
로 락파일까지 같이 갱신할 것 (package.json 만 고치면 Docker 의 `--frozen-lockfile` 이 깨진다).
