/**
 * 부팅 시점에 필수 시크릿을 검증한다.
 *
 * 예전엔 JWT_SECRET 이 없으면 'fallback_secret' / 'dev-secret' 으로 조용히
 * 넘어갔다. 배포 서버에서 환경변수 하나만 빠져도 레포에 적힌 문자열로
 * 아무나 관리자 토큰을 만들어낼 수 있다는 뜻이다. 그래서 조용히 넘어가지
 * 않고 서버를 아예 못 뜨게 막는다.
 */
export function jwtSecret(): string {
  const secret = process.env.JWT_SECRET?.trim();
  if (!secret) {
    throw new Error(
      '[boot] JWT_SECRET 환경변수가 없다. 서버를 띄우지 않는다.',
    );
  }
  if (secret.length < 32) {
    throw new Error(
      `[boot] JWT_SECRET 이 너무 짧다 (${secret.length}자). 32자 이상으로 바꿔라.`,
    );
  }
  return secret;
}

/**
 * CORS 허용 오리진.
 *
 * 앱(네이티브)은 Origin 헤더 자체를 안 보내서 CORS 대상이 아니다.
 * 즉 여기 목록이 비어 있어도 앱은 정상 동작하고, 브라우저에서 열린
 * 남의 사이트가 우리 API 를 대신 호출하는 것만 막힌다.
 */
export function corsOrigins(): string[] {
  return (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
}

/**
 * 어드민 토큰 전용 시크릿.
 *
 * 앱 토큰(JWT_SECRET)과 **일부러 다른 키를 쓴다.** 같은 키를 쓰면 앱 토큰을
 * 손에 넣은 사람이 payload 만 바꿔 어드민 토큰을 만들 수 있느냐는 질문이
 * 생기는데, 키가 다르면 그 질문 자체가 사라진다 — 서명 검증에서 떨어진다.
 *
 * jwtSecret() 과 달리 **없어도 서버는 뜬다.** 대신 어드민 로그인이 비활성화된다
 * (503 ADMIN_NOT_CONFIGURED). 어드민을 안 쓰는 환경에서 부팅을 막을 이유가 없고,
 * 무엇보다 "설정 안 하면 안 열린다" 가 기본값으로 안전하다.
 */
export function adminJwtSecret(): string | null {
  const secret = process.env.ADMIN_JWT_SECRET?.trim();
  if (!secret) return null;
  if (secret.length < 32) {
    throw new Error(
      `[boot] ADMIN_JWT_SECRET 이 너무 짧다 (${secret.length}자). 32자 이상으로 바꿔라.`,
    );
  }
  if (secret === process.env.JWT_SECRET?.trim()) {
    throw new Error(
      '[boot] ADMIN_JWT_SECRET 이 JWT_SECRET 과 같다. 분리하는 의미가 없으니 다른 값을 써라.',
    );
  }
  return secret;
}

/**
 * 없어도 서버는 뜨지만, 없으면 **그 기능이 통째로 죽는** 환경변수들.
 *
 * 부팅 때 한 번 시끄럽게 알린다. 예전에는 TELEGRAM_BOT_TOKEN 이 없어도 조용히
 * 떴다가, 유저가 Mini App 을 열었을 때만 401 이 났다 — 앱에는 "연결 실패" 만
 * 뜨고 서버 로그에는 아무것도 없어서 원인을 찾는 데 한참 걸렸다.
 *
 * ⚠️ 특히 도커에서 자주 걸린다: `env_file` 은 컨테이너를 **만들 때** 읽힌다.
 *    api.env 에 값을 넣고 restart 만 하면 컨테이너 안에는 여전히 없다
 *    (`docker compose up -d --force-recreate <서비스>` 를 해야 한다).
 *    이 경고가 로그 맨 위에 뜨면 그 상황이라는 뜻이다.
 */
const OPTIONAL_SECRETS: { key: string; breaks: string }[] = [
  { key: 'TELEGRAM_BOT_TOKEN', breaks: 'Telegram Mini App 로그인' },
  { key: 'ADMIN_JWT_SECRET', breaks: '어드민 패널 로그인' },
  { key: 'OPENAI_API_KEY', breaks: 'AI 튜터' },
  { key: 'AZURE_SPEECH_KEY', breaks: '발음 평가 · 튜터 음성' },
];

export function warnMissingOptionalSecrets(
  log: (message: string) => void = console.warn,
): string[] {
  const missing = OPTIONAL_SECRETS.filter(
    (s) => !process.env[s.key]?.trim(),
  );
  for (const s of missing) {
    log(`[boot] ${s.key} 가 없다 → ${s.breaks} 이 동작하지 않는다.`);
  }
  return missing.map((s) => s.key);
}
