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

function invalid(): never {
  throw new Error('TELEGRAM_MINI_APP_INIT_DATA_INVALID');
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
  if (!initData || !botToken || Buffer.byteLength(initData, 'utf8') > 16_384) {
    return invalid();
  }

  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash || !/^[0-9a-f]{64}$/i.test(hash)) return invalid();

  params.delete('hash');
  const dataCheckString = [...params.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
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
    return invalid();
  }

  const authDate = Number(params.get('auth_date'));
  const nowSeconds = Math.floor((options.nowMs ?? Date.now()) / 1000);
  const maxAgeSeconds =
    options.maxAgeSeconds ?? TELEGRAM_MINI_APP_AUTH_MAX_AGE_SECONDS;
  const ageSeconds = nowSeconds - authDate;

  if (
    !Number.isSafeInteger(authDate) ||
    ageSeconds < -MAX_FUTURE_SKEW_SECONDS ||
    ageSeconds > maxAgeSeconds
  ) {
    return invalid();
  }

  const rawUser = params.get('user');
  if (!rawUser) return invalid();

  let user: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawUser);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return invalid();
    }
    user = parsed as Record<string, unknown>;
  } catch {
    return invalid();
  }

  if (
    typeof user.id !== 'number' ||
    !Number.isSafeInteger(user.id) ||
    user.id <= 0 ||
    typeof user.first_name !== 'string' ||
    user.first_name.length === 0
  ) {
    return invalid();
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
