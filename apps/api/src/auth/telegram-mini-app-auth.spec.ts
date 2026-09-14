import { createHmac } from 'crypto';
import { validateTelegramMiniAppInitData } from './telegram-mini-app-auth';

const BOT_TOKEN = '123456:test-token';
const NOW_SECONDS = 1_800_000_000;

function signedInitData(values: Record<string, string>): string {
  const params = new URLSearchParams(values);
  const dataCheckString = [...params.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  const secretKey = createHmac('sha256', 'WebAppData')
    .update(BOT_TOKEN)
    .digest();
  const hash = createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');
  params.set('hash', hash);
  return params.toString();
}

function validInitData() {
  return signedInitData({
    auth_date: String(NOW_SECONDS),
    query_id: 'query-1',
    start_param: 'lesson-42',
    user: JSON.stringify({
      id: 987654321,
      first_name: 'Abror',
      last_name: 'Bek',
      username: 'abror',
      language_code: 'uz',
    }),
  });
}

describe('validateTelegramMiniAppInitData', () => {
  it('accepts signed, fresh Mini App data and normalizes the user', () => {
    const result = validateTelegramMiniAppInitData(validInitData(), BOT_TOKEN, {
      nowMs: NOW_SECONDS * 1000,
    });

    expect(result).toEqual({
      authDate: NOW_SECONDS,
      queryId: 'query-1',
      startParam: 'lesson-42',
      user: {
        id: '987654321',
        firstName: 'Abror',
        lastName: 'Bek',
        username: 'abror',
        languageCode: 'uz',
      },
    });
  });

  it('rejects data changed after Telegram signed it', () => {
    const params = new URLSearchParams(validInitData());
    params.set('user', JSON.stringify({ id: 1, first_name: 'Attacker' }));

    expect(() =>
      validateTelegramMiniAppInitData(params.toString(), BOT_TOKEN, {
        nowMs: NOW_SECONDS * 1000,
      }),
    ).toThrow('TELEGRAM_MINI_APP_INIT_DATA_INVALID');
  });

  it('rejects validly signed but expired data', () => {
    expect(() =>
      validateTelegramMiniAppInitData(validInitData(), BOT_TOKEN, {
        nowMs: (NOW_SECONDS + 3601) * 1000,
        maxAgeSeconds: 3600,
      }),
    ).toThrow('TELEGRAM_MINI_APP_INIT_DATA_INVALID');
  });

  it('rejects signed data without a Telegram user', () => {
    const initData = signedInitData({ auth_date: String(NOW_SECONDS) });

    expect(() =>
      validateTelegramMiniAppInitData(initData, BOT_TOKEN, {
        nowMs: NOW_SECONDS * 1000,
      }),
    ).toThrow('TELEGRAM_MINI_APP_INIT_DATA_INVALID');
  });
});
