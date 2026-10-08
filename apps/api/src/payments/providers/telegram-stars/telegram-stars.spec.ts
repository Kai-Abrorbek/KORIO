// 무거운 의존성은 가짜로 — 여기서 보는 건 결제 흐름의 판단뿐이다
jest.mock('@nestjs/mongoose', () => ({ InjectModel: () => () => undefined }));
jest.mock('../../../users/schemas/user.schema', () => ({
  User: { name: 'User' },
}));
jest.mock('../../subscriptions/subscription.service', () => ({
  SubscriptionService: class {},
}));
jest.mock('../../../common/enums/provider.enum', () => ({
  AuthProvider: { TELEGRAM: 'telegram' },
}));
jest.mock('../../../auth/jwt-auth.guard', () => ({ JwtAuthGuard: class {} }));
jest.mock('../../../common/rate-limit', () => ({
  RateLimit: () => () => undefined,
  RateLimitGuard: class {},
}));
jest.mock('../../card/card-payment.service', () => ({
  CardPaymentService: class {},
}));
jest.mock('../../dto/create-stars-invoice.dto', () => ({
  CreateStarsInvoiceDto: class {},
}));

import { Logger } from '@nestjs/common';
import { webhookSecretMatches } from './telegram-stars.controller';
import {
  STARS_PRODUCTS,
  starsCatalog,
  starsProductById,
  starsSavingPercent,
} from './telegram-stars.const';
import {
  decodeStarsPayload,
  encodeStarsPayload,
} from './telegram-stars.payload';
import { TelegramApiError } from './telegram-bot.api';
import { TelegramStarsService } from './telegram-stars.service';
import {
  BOT_LANGS,
  botDate,
  botLang,
  invoiceDescription,
  invoiceTitle,
} from './telegram-stars.texts';

const USER_ID = '64b7f0c2a1b2c3d4e5f60718';

beforeAll(() => {
  jest.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
  jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
  jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
});

describe('Stars 상품표', () => {
  it('할인율이 앱 요금제와 같다', () => {
    const save = (id: string) => starsSavingPercent(starsProductById(id)!);
    expect([save('super_3m'), save('super_6m'), save('super_12m')]).toEqual([
      10, 18, 35,
    ]);
    expect([save('max_3m'), save('max_6m'), save('max_12m')]).toEqual([
      12, 17, 25,
    ]);
  });

  it('등급마다 1년권만 best', () => {
    const best = starsCatalog()
      .filter((p) => p.best)
      .map((p) => p.id);
    expect(best).toEqual(['super_12m', 'max_12m']);
  });

  it('id 에 payload 구분자(.)가 없다', () => {
    for (const p of STARS_PRODUCTS) expect(p.id).not.toContain('.');
  });
});

describe('인보이스 payload', () => {
  it('왕복', () => {
    const product = starsProductById('max_6m')!;
    const raw = encodeStarsPayload(USER_ID, product);
    expect(Buffer.byteLength(raw)).toBeLessThanOrEqual(128);
    expect(decodeStarsPayload(raw)).toEqual({
      userId: USER_ID,
      product,
      stars: 2750,
    });
  });

  it('남이 만든 값·모르는 상품은 버린다', () => {
    const good = encodeStarsPayload(USER_ID, starsProductById('super_1m')!);
    const parts = good.split('.');
    expect(decodeStarsPayload(['k2', ...parts.slice(1)].join('.'))).toBeNull();
    expect(
      decodeStarsPayload([parts[0], 'nope', ...parts.slice(2)].join('.')),
    ).toBeNull();
    expect(
      decodeStarsPayload(
        [parts[0], parts[1], 'gold_1m', ...parts.slice(3)].join('.'),
      ),
    ).toBeNull();
    expect(
      decodeStarsPayload([...parts.slice(0, 3), '-5', parts[4]].join('.')),
    ).toBeNull();
    expect(decodeStarsPayload(good + '.x')).toBeNull();
    expect(decodeStarsPayload(123)).toBeNull();
    expect(decodeStarsPayload('x'.repeat(200))).toBeNull();
  });
});

describe('봇 글', () => {
  it('인보이스 제목 32자·설명 255자 제한 안', () => {
    for (const lang of BOT_LANGS) {
      for (const p of STARS_PRODUCTS) {
        const title = invoiceTitle(lang, p.tier, p.months);
        expect(title.length).toBeLessThanOrEqual(32);
        expect(title).not.toMatch(/undefined/);
        expect(invoiceDescription(lang, p.tier).length).toBeLessThanOrEqual(
          255,
        );
      }
    }
  });

  it('언어: 앱 언어 → 텔레그램 언어 → 우즈벡어', () => {
    expect(botLang(undefined, 'ru-RU')).toBe('ru');
    expect(botLang('ko', 'ru')).toBe('ko');
    expect(botLang('', 'de')).toBe('uz');
  });

  it('날짜는 유저 시간대로', () => {
    const d = new Date('2026-10-31T20:30:00Z'); // 타슈켄트 11-01 01:30, 서울 11-01 05:30
    expect(botDate('uz', d, 'Asia/Tashkent')).toBe('01.11.2026');
    expect(botDate('ko', d, 'Asia/Seoul')).toBe('2026.11.01');
    expect(botDate('en', d, 'Not/AZone')).toBe('01.11.2026');
  });
});

describe('웹훅 비밀 헤더', () => {
  const original = process.env.TELEGRAM_WEBHOOK_SECRET;
  afterEach(() => {
    process.env.TELEGRAM_WEBHOOK_SECRET = original;
  });

  it('설정이 없으면 전부 거절', () => {
    delete process.env.TELEGRAM_WEBHOOK_SECRET;
    expect(webhookSecretMatches('anything')).toBe(false);
  });

  it('같을 때만 통과', () => {
    process.env.TELEGRAM_WEBHOOK_SECRET = 's3cret_value';
    expect(webhookSecretMatches(undefined)).toBe(false);
    expect(webhookSecretMatches('s3cret_valu')).toBe(false);
    expect(webhookSecretMatches('s3cret_value')).toBe(true);
  });
});

/** 봇 API 호출 인자 중 테스트가 보는 것만 */
interface BotParams {
  chat_id?: number;
  text?: string;
  ok?: boolean;
  error_message?: string;
  reply_markup?: { inline_keyboard: { web_app: { url: string } }[][] };
}
const lastCall = (fn: jest.Mock) =>
  fn.mock.calls[fn.mock.calls.length - 1] as [string, BotParams];

/** mongoose 쿼리 흉내: .select().lean() 과 await 둘 다 */
const chain = (value: unknown) => {
  const q = {
    select: () => q,
    lean: () => Promise.resolve(value),
    then: (ok: (v: unknown) => unknown, bad?: (e: unknown) => unknown) =>
      Promise.resolve(value).then(ok, bad),
  };
  return q;
};

function setup() {
  const users = {
    exists: jest.fn().mockResolvedValue({ _id: USER_ID }),
    findById: jest.fn(() =>
      chain({ appLanguage: 'ko', timezone: 'Asia/Seoul' }),
    ),
    findOne: jest.fn(() => chain({ appLanguage: 'ru' })),
  };
  const subs = {
    applyOneTimePass: jest.fn().mockResolvedValue({
      applied: true,
      tier: 'super',
      startedAt: new Date('2026-10-07T00:00:00Z'),
      expiresAt: new Date('2027-01-05T00:00:00Z'),
    }),
    findByTransaction: jest.fn().mockResolvedValue(null),
    revokeRefunded: jest.fn().mockResolvedValue(1),
  };
  const bot = { enabled: true, call: jest.fn().mockResolvedValue(true) };
  const cards = {
    handleCallback: jest.fn().mockResolvedValue(true),
    describe: jest.fn().mockResolvedValue('💳 카드 입금: 켜짐'),
  };
  const service = new TelegramStarsService(
    users as never,
    subs as never,
    bot as never,
    cards as never,
  );
  return { service, users, subs, bot, cards };
}

const paidUpdate = (productId: string, charge = 'ch_1', amount?: number) => {
  const product = starsProductById(productId)!;
  return {
    update_id: 1,
    message: {
      message_id: 9,
      from: { id: 777, language_code: 'uz' },
      chat: { id: 777, type: 'private' },
      successful_payment: {
        currency: 'XTR',
        total_amount: amount ?? product.stars,
        invoice_payload: encodeStarsPayload(USER_ID, product),
        telegram_payment_charge_id: charge,
      },
    },
  };
};

describe('결제 직전 검사 (pre_checkout_query)', () => {
  const query = (over: Record<string, unknown> = {}) => ({
    id: 'q1',
    from: { id: 777, language_code: 'ru' },
    currency: 'XTR',
    total_amount: 675,
    invoice_payload: encodeStarsPayload(USER_ID, starsProductById('super_3m')!),
    ...over,
  });

  it('정상 → null, 이상한 건 이유', async () => {
    const { service, users } = setup();
    expect(await service.checkPreCheckout(query())).toBeNull();
    expect(await service.checkPreCheckout(query({ currency: 'USD' }))).toBe(
      'CURRENCY',
    );
    expect(
      await service.checkPreCheckout(query({ invoice_payload: 'zzz' })),
    ).toBe('PAYLOAD');
    expect(await service.checkPreCheckout(query({ total_amount: 1 }))).toBe(
      'AMOUNT',
    );
    users.exists.mockResolvedValueOnce(null);
    expect(await service.checkPreCheckout(query())).toBe('USER');
  });

  it('통과하면 ok:true, 아니면 그 사람 언어로 거절', async () => {
    const { service, bot } = setup();
    await service.handleUpdate({ pre_checkout_query: query() });
    expect(bot.call).toHaveBeenLastCalledWith(
      'answerPreCheckoutQuery',
      { pre_checkout_query_id: 'q1', ok: true },
      expect.any(Number),
    );

    await service.handleUpdate({
      pre_checkout_query: query({ total_amount: 5 }),
    });
    const [, params] = lastCall(bot.call);
    expect(params).toMatchObject({ ok: false });
    expect(params.error_message).toMatch(/платёж/);
  });

  it('답장이 실패해도 던지지 않는다 (재전송 안 되는 업데이트)', async () => {
    const { service, bot } = setup();
    bot.call.mockRejectedValueOnce(new Error('down'));
    await expect(
      service.handleUpdate({ pre_checkout_query: query() }),
    ).resolves.toBeUndefined();
  });
});

describe('결제 완료 (successful_payment)', () => {
  it('기간권으로 반영하고 앱 언어로 알린다', async () => {
    const { service, subs, bot } = setup();
    await service.handleUpdate(paidUpdate('super_3m', 'ch_abc'));
    expect(subs.applyOneTimePass).toHaveBeenCalledWith({
      userId: USER_ID,
      provider: 'telegram_stars',
      platform: 'telegram',
      tier: 'super',
      plan: 'three_months',
      productId: 'stars_super_3m',
      days: 90,
      externalTransactionId: 'ch_abc',
      payerId: '777',
      priceMicros: 675_000_000,
      currency: 'XTR',
    });
    const [method, params] = lastCall(bot.call);
    expect(method).toBe('sendMessage');
    expect(params.chat_id).toBe(777);
    expect(params.text).toContain('KORIO SUPER');
    expect(params.text).toContain('2027.01.05');
  });

  it('재전송(이미 반영)이면 다시 알리지 않는다', async () => {
    const { service, subs, bot } = setup();
    subs.applyOneTimePass.mockResolvedValueOnce({
      applied: false,
      tier: 'super',
      startedAt: new Date(),
      expiresAt: new Date(),
    });
    await service.handleUpdate(paidUpdate('super_1m'));
    expect(bot.call).not.toHaveBeenCalled();
  });

  it('반영이 실패하면 던진다 → 웹훅 500 → 텔레그램이 다시 보낸다', async () => {
    const { service, subs } = setup();
    subs.applyOneTimePass.mockRejectedValueOnce(new Error('mongo down'));
    await expect(service.handleUpdate(paidUpdate('max_1m'))).rejects.toThrow(
      'mongo down',
    );
  });

  it('우리 인보이스가 아니면 반영하지 않고 넘긴다', async () => {
    const { service, subs } = setup();
    const update = paidUpdate('super_1m');
    update.message.successful_payment.invoice_payload = 'someone-else';
    await expect(service.handleUpdate(update)).resolves.toBeUndefined();
    expect(subs.applyOneTimePass).not.toHaveBeenCalled();
  });

  it('알림 전송이 실패해도 결제는 반영된 것으로 끝난다', async () => {
    const { service, bot } = setup();
    bot.call.mockRejectedValueOnce(new Error('blocked by user'));
    await expect(
      service.handleUpdate(paidUpdate('super_1m')),
    ).resolves.toBeUndefined();
  });

  it('같은 유저의 결제 두 건은 하나씩 처리한다', async () => {
    const { service, subs } = setup();
    let running = 0;
    let overlapped = false;
    subs.applyOneTimePass.mockImplementation(async () => {
      running++;
      if (running > 1) overlapped = true;
      await new Promise((r) => setTimeout(r, 20));
      running--;
      return {
        applied: true,
        tier: 'super',
        startedAt: new Date(),
        expiresAt: new Date(),
      };
    });
    await Promise.all([
      service.handleUpdate(paidUpdate('super_1m', 'a')),
      service.handleUpdate(paidUpdate('super_3m', 'b')),
    ]);
    expect(subs.applyOneTimePass).toHaveBeenCalledTimes(2);
    expect(overlapped).toBe(false);
  });
});

describe('봇 명령', () => {
  const command = (text: string, fromId = 777) => ({
    message: {
      message_id: 1,
      from: { id: fromId, language_code: 'en' },
      chat: { id: fromId, type: 'private' },
      text,
    },
  });
  const env = { ...process.env };
  afterEach(() => {
    process.env = { ...env };
  });

  it('/paysupport 는 연락처를 앱 언어로 답한다', async () => {
    const { service, bot } = setup();
    process.env.TELEGRAM_SUPPORT_CONTACT = '@korio_help';
    await service.handleUpdate(command('/paysupport'));
    const [, params] = lastCall(bot.call);
    expect(params.text).toContain('@korio_help');
    expect(params.text).toMatch(/Помощь/); // findOne → appLanguage ru
  });

  it('/start 는 미니앱 버튼, 주소를 비우면 조용히', async () => {
    const { service, bot } = setup();
    await service.handleUpdate(command('/start ref_abc'));
    const [, params] = lastCall(bot.call);
    expect(params.reply_markup?.inline_keyboard[0][0].web_app.url).toBe(
      'https://telegram.korio.online',
    );
    bot.call.mockClear();
    process.env.TELEGRAM_MINI_APP_URL = '';
    await service.handleUpdate(command('/start'));
    expect(bot.call).not.toHaveBeenCalled();
  });

  it('/refund 는 운영자만 — 남에게는 명령이 있는지도 안 알린다', async () => {
    const { service, bot, subs } = setup();
    process.env.TELEGRAM_ADMIN_IDS = '1, 2';
    await service.handleUpdate(command('/refund ch_1', 777));
    expect(bot.call).not.toHaveBeenCalled();
    expect(subs.revokeRefunded).not.toHaveBeenCalled();
  });

  it('운영자 /refund → Stars 환불 + 기간 회수', async () => {
    const { service, bot, subs } = setup();
    process.env.TELEGRAM_ADMIN_IDS = '1,2';
    subs.findByTransaction.mockResolvedValue({
      payerId: '777',
      userId: USER_ID,
      productId: 'stars_super_1m',
    });
    await service.handleUpdate(command('/refund ch_9', 2));
    expect(bot.call).toHaveBeenCalledWith('refundStarPayment', {
      user_id: 777,
      telegram_payment_charge_id: 'ch_9',
    });
    expect(subs.revokeRefunded).toHaveBeenCalledWith('telegram_stars', 'ch_9');
    expect(lastCall(bot.call)[1].text).toMatch(/환불 완료/);
  });

  it('이미 환불된 결제면 회수만 한다', async () => {
    const { service, bot, subs } = setup();
    subs.findByTransaction.mockResolvedValue({
      payerId: '777',
      userId: USER_ID,
    });
    bot.call.mockRejectedValueOnce(
      new TelegramApiError(
        'refundStarPayment',
        400,
        'Bad Request: CHARGE_ALREADY_REFUNDED',
      ),
    );
    expect(await service.refund('ch_9')).toMatch(/환불 완료/);
    expect(subs.revokeRefunded).toHaveBeenCalled();
  });

  it('텔레그램이 알려준 환불은 한 번만 회수', async () => {
    const { service, subs } = setup();
    const refundMsg = {
      message: {
        message_id: 3,
        from: { id: 777 },
        chat: { id: 777, type: 'private' },
        refunded_payment: {
          currency: 'XTR',
          total_amount: 250,
          invoice_payload: 'x',
          telegram_payment_charge_id: 'ch_r',
        },
      },
    };
    subs.findByTransaction.mockResolvedValueOnce({ tier: 'max' });
    await service.handleUpdate(refundMsg);
    expect(subs.revokeRefunded).toHaveBeenCalledTimes(1);
    subs.findByTransaction.mockResolvedValueOnce({
      tier: 'max',
      revokedAt: new Date(),
    });
    await service.handleUpdate(refundMsg);
    expect(subs.revokeRefunded).toHaveBeenCalledTimes(1);
  });
});

describe('카드 입금으로 넘기는 것', () => {
  it('인라인 버튼(callback_query)은 카드 결제 서비스로', async () => {
    const { service, cards } = setup();
    const q = { id: 'cb', from: { id: 1 }, data: 'cp:a:abc' };
    await service.handleUpdate({ callback_query: q });
    expect(cards.handleCallback).toHaveBeenCalledWith(q);
  });

  it('/cardcheck 는 운영자만', async () => {
    const { service, cards, bot } = setup();
    const env = process.env.TELEGRAM_ADMIN_IDS;
    process.env.TELEGRAM_ADMIN_IDS = '7';
    const msg = (from: number) => ({
      message: {
        message_id: 1,
        from: { id: from },
        chat: { id: from, type: 'private' },
        text: '/cardcheck',
      },
    });
    await service.handleUpdate(msg(8));
    expect(cards.describe).not.toHaveBeenCalled();
    await service.handleUpdate(msg(7));
    expect(lastCall(bot.call)[1].text).toContain('카드 입금');
    process.env.TELEGRAM_ADMIN_IDS = env;
  });
});
