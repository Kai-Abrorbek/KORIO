# KORIO Telegram Mini App

Telegram iOS/Android/Desktop 안에서 실행되는 KORIO 전용 클라이언트다.
`apps/web`과 배포·라우팅·스타일을 공유하지 않는다.

## 책임 경계

- `app/`: URL과 레이아웃만 담당한다.
- `src/features/`: 인증, 온보딩, 학습처럼 사용자 기능 단위로 구성한다.
- `src/shared/telegram/`: Telegram WebApp SDK 접근을 한 곳으로 제한한다.
- `src/shared/api/`: 기존 NestJS API 호출과 오류 처리를 담당한다.
- `src/shared/ui/`: Telegram 화면에서 공통으로 쓰는 UI다.
- `src/widgets/`: 여러 feature를 조합한 화면 단위 컴포넌트다.

## 로컬 실행

1. `.env.example`을 참고해 `API_PROXY_TARGET`과
   `NEXT_PUBLIC_API_URL=/api`를 설정한다.
2. `pnpm --filter telegram-app dev`를 실행한다.
3. HTTPS로 접근 가능한 개발 URL을 BotFather의 Main Mini App URL로 설정한다.

Telegram 밖의 일반 브라우저에는 인증 오류 화면이 보이는 것이 정상이다.
개발용 가짜 Telegram 사용자는 만들지 않는다.

## 배포 전 필수 설정

- 운영 빌드는 `TELEGRAM_STATIC_EXPORT=true`로 정적 export 하며 Nginx 컨테이너가
  8080 포트에서 제공한다.
- Caddy가 `telegram.korio.online/api/*`의 `/api` 접두사를 제거해 기존 NestJS
  API로 전달하므로 브라우저 CORS 설정 없이 같은 origin으로 호출된다.
- API 공개 주소를 직접 호출할 때는 Mini App 도메인을
  API의 `ALLOWED_ORIGINS`에 추가한다.
- API 서버에 기존 `TELEGRAM_BOT_TOKEN`이 설정되어 있어야 한다.
- BotFather에서 기존 봇의 Main Mini App URL을 HTTPS 배포 주소로 설정한다.

## Telegram 프로필과 App 버튼

- 봇 채팅 입력창 왼쪽의 `App` 버튼은 Bot API 메뉴 버튼이다. 스크립트는 현재
  셸의 `TELEGRAM_BOT_TOKEN`을 우선 사용하고, 없으면 `apps/api/.env`를 자동으로
  읽는다. HTTPS 주소를 전달해 한 번 설정한다.

  ```powershell
  pnpm --filter telegram-app bot:configure -- --url https://telegram.korio.online
  ```

- 실제 변경 없이 요청 본문만 확인하려면
  `pnpm --filter telegram-app bot:configure -- --url https://telegram.korio.online --dry-run`
  을 사용한다. 토큰은 브라우저 번들 또는 `NEXT_PUBLIC_*` 환경 변수에 넣지 않는다.
- 검색 및 프로필에 표시되는 `사용자 N명`은 Telegram이 집계한 월간 활성 사용자
  수다. 개발자가 임의 값을 설정할 수 없으며, 소규모 봇에서는 항목 자체가
  표시되지 않을 수 있다. Main Mini App을 활성화한 상태에서 실제 사용자가
  쌓이면 Telegram 클라이언트가 자동으로 표시한다.

운영 배포는 루트의 `deploy/deploy.sh`가 API와 Telegram 앱을 같은 blue/green
색으로 함께 교체한다. Docker Compose를 직접 올리지 않는다.
