import { createHmac, timingSafeEqual } from 'crypto';

export const TELEGRAM_MINI_APP_AUTH_MAX_AGE_SECONDS = 24 * 60 * 60;
const MAX_FUTURE_SKEW_SECONDS = 60;

export interface TelegramMiniAppUser {
  id: string;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  languageCode?: string;
}

export interface TelegramMiniAppAuthData {
  authDate: number;
  queryId?: string;
  startParam?: string;
  user: TelegramMiniAppUser;
}

export interface TelegramMiniAppValidationOptions {
  maxAgeSeconds?: number;
  nowMs?: number;
}

/**
 * 검증 실패 이유.
 *
 * 예전에는 8곳에서 같은 에러 하나를 던졌다. 그래서 "검증 실패" 라는 것 말고는
 * 아무것도 알 수 없었는데, 이 여덟 가지는 **고치는 방법이 전부 다르다**:
 * 시계가 틀린 것과 봇 토큰이 다른 것과 initData 가 잘린 것은 완전히 다른 일이다.
 *
 * ⚠️ 이 값은 로그에만 쓴다. 앱에 그대로 내려보내면 공격자에게 어느 검사에서
 *    걸렸는지 알려주는 꼴이라, 밖으로는 TELEGRAM_INIT_DATA_INVALID 하나로 나간다.
 */
export type TelegramInitDataFailure =
  | 'EMPTY_INPUT'
  | 'TOO_LARGE'
  | 'NO_HASH'
  /** 서명이 안 맞는다 — 봇 토큰과 Mini App 을 연 봇이 다른 경우가 가장 흔하다 */
  | 'HASH_MISMATCH'
  | 'AUTH_DATE_MALFORMED'
  /** 24시간보다 오래된 initData */
  | 'AUTH_DATE_EXPIRED'
  /** 서버 시계가 텔레그램보다 앞서 있다. VPS 에서 흔하다 */
  | 'AUTH_DATE_FUTURE'
  | 'NO_USER'
  | 'USER_MALFORMED';

export class TelegramInitDataError extends Error {
  constructor(
    readonly failure: TelegramInitDataFailure,
    /** 값이 아니라 **모양**만 담는다. 로그에 유저 정보나 서명이 남으면 안 된다 */
    readonly hint: Record<string, unknown> = {},
  ) {
    super('TELEGRAM_MINI_APP_INIT_DATA_INVALID');
    this.name = 'TelegramInitDataError';
  }
}

function invalid(
  failure: TelegramInitDataFailure,
  hint: Record<string, unknown> = {},
): never {
  throw new TelegramInitDataError(failure, hint);
}

function optionalString(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

/**
 * Telegram.WebApp.initData 를 Bot Token으로 검증한다.
 * Login Widget 서명 방식과 secret key 생성법이 다르므로 별도 함수로 유지한다.
 */
export function validateTelegramMiniAppInitData(
  initData: string,
  botToken: string,
  options: TelegramMiniAppValidationOptions = {},
): TelegramMiniAppAuthData {
  if (!initData || !botToken) {
    return invalid('EMPTY_INPUT', {
      hasInitData: !!initData,
      hasBotToken: !!botToken,
    });
  }
  if (Buffer.byteLength(initData, 'utf8') > 16_384) {
    return invalid('TOO_LARGE', { bytes: Buffer.byteLength(initData, 'utf8') });
  }

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash || !/^[0-9a-f]{64}$/i.test(hash)) {
    return invalid('NO_HASH', { keys: [...params.keys()] });
  }

  params.delete('hash');
  // 단순 문자 순서로 정렬한다. localeCompare 는 서버의 ICU 로케일에 따라
  // 결과가 달라질 수 있어서, 환경이 바뀌면 조용히 틀리는 종류의 코드다.
  // 텔레그램 명세와 레퍼런스 구현은 전부 단순 비교를 쓴다.
  const dataCheckString = [...params.entries()]
    .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const secretKey = createHmac('sha256', 'WebAppData')
    .update(botToken)
    .digest();
  const expectedHash = createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest();
  const receivedHash = Buffer.from(hash, 'hex');

  if (
    receivedHash.length !== expectedHash.length ||
    !timingSafeEqual(receivedHash, expectedHash)
  ) {
    // 여기가 제일 흔하다. 봇 토큰이 Mini App 을 연 봇의 것이 아니거나,
    // 토큰을 BotFather 에서 재발급한 뒤 서버에 안 넣었거나.
    return invalid('HASH_MISMATCH', {
      keys: [...params.keys()],
      // 토큰 자체는 절대 안 남긴다. 어느 봇인지 알아볼 만큼만 (봇 id 는 공개값)
      botId: botToken.split(':')[0] ?? '?',
    });
  }

  const authDate = Number(params.get('auth_date'));
  const nowSeconds = Math.floor((options.nowMs ?? Date.now()) / 1000);
  const maxAgeSeconds =
    options.maxAgeSeconds ?? TELEGRAM_MINI_APP_AUTH_MAX_AGE_SECONDS;
  const ageSeconds = nowSeconds - authDate;

  if (!Number.isSafeInteger(authDate)) {
    return invalid('AUTH_DATE_MALFORMED', { raw: params.get('auth_date') });
  }
  if (ageSeconds < -MAX_FUTURE_SKEW_SECONDS) {
    // 서버 시계가 텔레그램보다 앞서 있다. VPS 에서 흔하고, 토큰이 완벽히
    // 맞아도 로그인이 전부 막힌다 — NTP 를 확인해야 한다
    return invalid('AUTH_DATE_FUTURE', { skewSeconds: -ageSeconds });
  }
  if (ageSeconds > maxAgeSeconds) {
    return invalid('AUTH_DATE_EXPIRED', { ageSeconds, maxAgeSeconds });
  }

  const rawUser = params.get('user');
  if (!rawUser) return invalid('NO_USER', { keys: [...params.keys()] });

  let user: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawUser);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return invalid('USER_MALFORMED', { shape: typeof parsed });
    }
    user = parsed as Record<string, unknown>;
  } catch {
    return invalid('USER_MALFORMED', { shape: 'unparseable' });
  }

  if (
    typeof user.id !== 'number' ||
    !Number.isSafeInteger(user.id) ||
    user.id <= 0 ||
    typeof user.first_name !== 'string' ||
    user.first_name.length === 0
  ) {
    return invalid('USER_MALFORMED', {
      idType: typeof user.id,
      hasFirstName: typeof user.first_name === 'string',
    });
  }

  return {
    authDate,
    queryId: optionalString(params.get('query_id')),
    startParam: optionalString(params.get('start_param')),
    user: {
      id: String(user.id),
      firstName: user.first_name,
      lastName: optionalString(user.last_name),
      username: optionalString(user.username),
      photoUrl: optionalString(user.photo_url),
      languageCode: optionalString(user.language_code),
    },
  };
}
