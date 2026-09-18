# KORIO Tutor Agent

AI 회화 튜터의 음성 구간을 담당하는 long-running LiveKit worker.

```
KORIO Mobile (Expo)
      │  WebRTC (마이크 ↑ / 선생님 목소리 ↓)
      ▼
   LiveKit
      │  realtime media
      ▼
 Tutor Agent  ← 이 앱
      │  Gemini Live API
      ▼
 gemini-3.8-live   (native audio-to-audio)
```

## 이 앱이 하지 않는 일

- **DB 를 안 본다.** 학습자 프로필도 오답 장부도 지난 세션도 안 읽는다.
- **프롬프트를 안 만든다.** 완성된 master prompt 를 dispatch metadata 로 받는다.
- **STT/TTS 를 안 붙인다.** Gemini 가 소리를 직접 듣고 직접 낸다.
- **끼어들기를 직접 구현하지 않는다.** `AgentSession` + realtime 모델이 한다.

개인화 로직이 API 와 Agent 두 군데로 갈라지면, 튜터가 이상하게 굴 때 어느 쪽
프롬프트 때문인지 알 수가 없다. 그래서 전부 `apps/api` 한 곳에 둔다.

## 실행

### 로컬 개발

**`.env` 를 먼저 만들어라.** 이 앱에는 NestJS 의 `ConfigModule` 같은 게 없어서
환경변수를 자동으로 어디선가 주워오지 않는다.

```bash
cd apps/tutor-agent
cp .env.example .env        # LIVEKIT_* + GOOGLE_API_KEY 채운다
pnpm --filter tutor-agent dev
```

없이 돌리면 이렇게 죽는다 — 설정 문제지 코드 문제가 아니다:

```
MissingCredentialsError: API Key is required: Set LIVEKIT_API_KEY, ...
```

`dev` 스크립트가 `--env-file-if-exists=.env` 로 읽는다. 파일이 없어도
죽지는 않고 경고만 남기니, 셸에 `export` 해둔 값으로 돌려도 된다.

### 배포

서버에서는 `.env` 가 필요 없다. `deploy/agent.env` 를 compose 의 `env_file`
이 컨테이너에 직접 주입한다. `./deploy.sh` 가 알아서 하고, 이미지 안에는
`.env` 가 없다 (그래서 `start` 에는 `--env-file` 을 안 붙였다 — 매 부팅마다
"not found" 가 로그에 찍히면 에러처럼 보인다).

```bash
pnpm --filter tutor-agent build
pnpm --filter tutor-agent start   # Docker 가 이걸 돌린다
```

`dev` / `start` 는 LiveKit Agents CLI 의 서브커맨드다. worker 가 LiveKit 에
붙어서 대기하다가, API 가 `createDispatch(room, 'korio-tutor')` 를 부르면
그 방으로 들어간다 (explicit dispatch — 방이 생긴다고 자동으로 들어가지 않는다).

## 환경변수

`.env.example` 참고. 세 가지만 기억하면 된다:

1. `GOOGLE_API_KEY` 는 **이 프로세스에만** 있다. 앱에도 NestJS 에도 없다.
2. `LIVEKIT_TUTOR_AGENT_NAME` 은 API 의 같은 이름과 **글자 하나까지** 같아야
   한다. 다르면 dispatch 는 성공하는데 아무도 방에 안 들어온다.
3. `LIVEKIT_URL` 은 API 와 같은 프로젝트를 가리켜야 한다.

## API 와의 계약

`src/metadata.ts` 가 계약이다. **원본은
`apps/api/src/tutor/livekit/dispatch-metadata.ts`** 이고 여기는 사본이다
(두 앱이 서로를 import 할 수 없어서 어쩔 수 없이 두 벌).

한쪽만 고치고 배포하면 `decodeDispatchMetadata` 가 시끄럽게 죽는다 —
조용히 `undefined` 가 프롬프트 자리에 들어가서 튜터가 아무 지시 없이
말하기 시작하는 것보다 낫다. **한쪽을 고치면 반드시 다른 쪽도 고칠 것.**

## 돈이 나가는 자리

Gemini 세션은 이 프로세스가 붙들고 있다. 그래서 끊는 책임도 여기 있다:

- `WAIT_FOR_LEARNER_SEC` (30초) 안에 아무도 안 들어오면 접는다.
- `metadata.maxDurationSec` 에 도달하면 접는다. 앱에도 같은 타이머가 있지만
  그건 앱을 고치면 우회된다.
- 학습자가 나가면 `closeOnDisconnect` 로 세션이 닫힌다.

⚠️ **분당 원가는 아직 실측 전이다.** 쿼터(`apps/api/src/tutor/tutor.const.ts`)의
숫자는 OpenAI Realtime 기준이라 이 구조에는 맞지 않는다. 실세션 30~50개를
재고 나서 다시 잡아야 한다.
