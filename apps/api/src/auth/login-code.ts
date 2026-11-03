import * as crypto from 'crypto';
import { jwtSecret } from '../config/secrets';
import { redis } from '../common/redis';

/**
 * 소셜 로그인(카카오·네이버·텔레그램)이 앱으로 돌아갈 때 주는 일회용 코드 (PKCE).
 *
 * 🔴 예전엔 `mobile://social-auth?token=<7일짜리 JWT>` 로 돌려보냈다.
 *    `mobile://` 같은 커스텀 스킴은 **아무 앱이나 같은 이름으로 등록할 수 있어서**,
 *    폰에 깔린 악성 앱이 이 주소를 가로채면 로그인한 사람의 계정을 그대로 가져간다.
 *
 * 지금은:
 *   1) 앱이 로그인을 시작할 때 비밀 값(verifier)을 만들고, 그 해시(challenge)만 보낸다
 *   2) 서버는 로그인이 끝나면 challenge 에 묶인 2분짜리 코드를 돌려보낸다
 *   3) 앱이 코드 + verifier 를 POST 해서 토큰으로 바꾼다
 * 코드를 가로챈 앱은 verifier 를 모르니 아무것도 못 한다 (RFC 7636 과 같은 방식).
 *
 * 코드 자체는 서명된 값이라 서버 어디서든 검증된다 (blue/green 이 겹쳐도 된다).
 * 한 번 쓰면 Redis 에 표시해서 두 번 못 쓴다.
 */
const CODE_TTL_MS = 2 * 60_000;

/** 앱이 보내는 challenge — base64url(SHA-256(verifier)) 43자 */
const CHALLENGE_PATTERN = /^[A-Za-z0-9_-]{43}$/;
/** RFC 7636 이 허용하는 verifier 글자와 길이 */
const VERIFIER_PATTERN = /^[A-Za-z0-9._~-]{43,128}$/;

interface LoginCodePayload {
  sub: string;
  cc: string;
  exp: number;
  jti: string;
}

// OAuth state 와 같은 비밀을 쓰되 용도를 섞어 키를 따로 만든다 —
// state 서명을 코드로, 코드를 state 로 돌려 쓰는 일이 생기지 않게
const key = () =>
  crypto
    .createHash('sha256')
    .update(`korio:oauth-login-code:${jwtSecret()}`)
    .digest();

const sign = (payload: string) =>
  crypto.createHmac('sha256', key()).update(payload).digest('base64url');

export function isCodeChallenge(value: unknown): value is string {
  return typeof value === 'string' && CHALLENGE_PATTERN.test(value);
}

export function issueLoginCode(userId: string, challenge: string): string {
  const payload: LoginCodePayload = {
    sub: userId,
    cc: challenge,
    exp: Date.now() + CODE_TTL_MS,
    jti: crypto.randomBytes(16).toString('base64url'),
  };
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${body}.${sign(body)}`;
}

/**
 * 코드와 verifier 가 맞으면 유저 id 를 돌려준다. 하나라도 틀리면 null.
 * 성공한 코드는 그 자리에서 태워서 두 번 못 쓴다.
 */
export async function redeemLoginCode(
  code: unknown,
  verifier: unknown,
): Promise<string | null> {
  if (typeof code !== 'string' || code.length > 1024) return null;
  if (typeof verifier !== 'string' || !VERIFIER_PATTERN.test(verifier))
    return null;

  const [body, mac] = code.split('.');
  if (!body || !mac) return null;
  const expected = sign(body);
  if (
    mac.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(expected))
  )
    return null;

  let payload: LoginCodePayload;
  try {
    payload = JSON.parse(
      Buffer.from(body, 'base64url').toString(),
    ) as LoginCodePayload;
  } catch {
    return null;
  }
  if (!payload.sub || !payload.jti || !(payload.exp > Date.now())) return null;

  const challenge = crypto
    .createHash('sha256')
    .update(verifier)
    .digest('base64url');
  if (
    !isCodeChallenge(payload.cc) ||
    !crypto.timingSafeEqual(Buffer.from(challenge), Buffer.from(payload.cc))
  )
    return null;

  if (!(await burn(payload.jti, payload.exp))) return null;
  return payload.sub;
}

/** 처음 쓰는 코드면 true. 이미 쓴 코드면 false */
const usedInMemory = new Map<string, number>();

async function burn(jti: string, exp: number): Promise<boolean> {
  const client = redis();
  if (client?.status === 'ready') {
    try {
      const ttl = Math.max(1_000, exp - Date.now() + 60_000);
      const set = await client.set(`oauth-code:${jti}`, '1', 'PX', ttl, 'NX');
      return set === 'OK';
    } catch {
      // Redis 가 잠깐 죽었으면 이 서버 메모리로라도 막는다
    }
  }
  const now = Date.now();
  for (const [id, until] of usedInMemory)
    if (until < now) usedInMemory.delete(id);
  if (usedInMemory.has(jti)) return false;
  usedInMemory.set(jti, exp + 60_000);
  return true;
}

/**
 * 옛 앱(코드 교환을 모르는 버전)에게 토큰을 주소에 실어 보낼지.
 *
 * 지금은 기본 허용 — 끄면 옛 앱은 카카오·네이버·텔레그램 로그인이 안 된다.
 * 새 앱이 충분히 퍼지면(OTA 적용 후) OAUTH_LEGACY_TOKEN_REDIRECT=false 로 막는다.
 * 그 전까지는 남이 만든 로그인 링크를 눌러 로그인하는 경우에 한해 옛 구멍이 남는다.
 */
export function legacyTokenRedirectAllowed(): boolean {
  return process.env.OAUTH_LEGACY_TOKEN_REDIRECT?.trim() !== 'false';
}
