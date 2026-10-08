/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument --
   mongoose 모델·봇 호출 인자를 흉내 내는 가짜 객체라 any 를 그대로 다룬다 */
jest.mock('@nestjs/mongoose', () => ({
  InjectModel: () => () => undefined,
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));
jest.mock('@nestjs/schedule', () => ({ Cron: () => () => undefined }));
jest.mock('../../users/schemas/user.schema', () => ({
  User: { name: 'User' },
}));
jest.mock('../subscriptions/subscription.service', () => ({
  SubscriptionService: class {},
}));
jest.mock('../../common/enums/provider.enum', () => ({
  AuthProvider: { TELEGRAM: 'telegram' },
}));

import { Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import { luhnValid } from './card-number';
import { CardPaymentService } from './card-payment.service';
import { compareReceipt } from './card-receipt-ocr.service';

const USER = new Types.ObjectId().toString();
const OTHER_USER = new Types.ObjectId().toString();

function withCheckDigit(first15: string) {
  for (let d = 0; d <= 9; d++) if (luhnValid(first15 + d)) return first15 + d;
  throw new Error('unreachable');
}
const HUMO = withCheckDigit('986012345678901');

type Row = Record<string, any>;

/* ── mongoose 흉내 ── */
const same = (a: unknown, b: unknown) => String(a) === String(b);
function matches(row: Row, q: Row): boolean {
  return Object.entries(q).every(([k, cond]) => {
    const v = row[k];
    if (
      cond &&
      typeof cond === 'object' &&
      !(cond instanceof Types.ObjectId) &&
      !(cond instanceof Date)
    ) {
      const op = cond as Record<string, any>;
      if ('$in' in op) return (op.$in as unknown[]).includes(v);
      if ('$ne' in op) return !same(v, op.$ne);
      if ('$gte' in op) return v >= op.$gte;
      if ('$lt' in op) return v < op.$lt;
    }
    return same(v, cond);
  });
}

function fakeOrders() {
  const rows: Row[] = [];
  const doc = (data: Row) => {
    const d: Row = { ...data };
    d.save = () => Promise.resolve(d);
    return d;
  };
  const plain = (d: Row | null) => (d ? { ...d } : null);
  const query = (get: () => Row | null) => {
    const q: Row = {
      sort: () => q,
      select: () => ({ lean: () => Promise.resolve(plain(get())) }),
      lean: () => Promise.resolve(plain(get())),
      then: (ok: (v: unknown) => unknown, bad?: (e: unknown) => unknown) =>
        Promise.resolve(get()).then(ok, bad),
    };
    return q;
  };
  const apply = (row: Row, update: Row) => {
    Object.assign(row, update.$set ?? {});
    for (const k of Object.keys(update.$unset ?? {})) delete row[k];
  };
  const model = {
    rows,
    create: jest.fn((data: Row) => {
      const d = doc({
        _id: new Types.ObjectId(),
        createdAt: new Date(),
        ...data,
      });
      rows.push(d);
      return Promise.resolve(d);
    }),
    findOne: jest.fn((q: Row) =>
      query(() => [...rows].reverse().find((r) => matches(r, q)) ?? null),
    ),
    findById: jest.fn((id: unknown) =>
      query(() => rows.find((r) => same(r._id, id)) ?? null),
    ),
    distinct: jest.fn((field: string, q: Row) =>
      Promise.resolve([
        ...new Set(rows.filter((r) => matches(r, q)).map((r) => r[field])),
      ]),
    ),
    findOneAndUpdate: jest.fn((q: Row, update: Row) => {
      const row = rows.find((r) => matches(r, q));
      if (!row) return Promise.resolve(null);
      apply(row, update);
      return Promise.resolve(row);
    }),
    updateOne: jest.fn((q: Row, update: Row) => {
      const row = rows.find((r) => matches(r, q));
      if (row) apply(row, update);
      return Promise.resolve({ modifiedCount: row ? 1 : 0 });
    }),
    updateMany: jest.fn((q: Row, update: Row) => {
      const hit = rows.filter((r) => matches(r, q));
      hit.forEach((r) => apply(r, update));
      return Promise.resolve({ modifiedCount: hit.length });
    }),
    countDocuments: jest.fn((q: Row) =>
      Promise.resolve(rows.filter((r) => matches(r, q)).length),
    ),
  };
  return model;
}

const chain = (value: unknown) => ({
  select: () => ({ lean: () => Promise.resolve(value) }),
});

function setup() {
  const orders = fakeOrders();
  const users = {
    findById: jest.fn(() =>
      chain({
        nickname: 'aziza',
        provider: 'telegram',
        providerId: '555',
        appLanguage: 'uz',
        timezone: 'Asia/Tashkent',
      }),
    ),
  };
  const subscriptions = {
    applyOneTimePass: jest.fn().mockResolvedValue({
      applied: true,
      tier: 'super',
      startedAt: new Date(),
      expiresAt: new Date('2027-01-05T00:00:00Z'),
    }),
  };
  let messageId = 100;
  const bot = {
    enabled: true,
    call: jest.fn((method: string, params: Row) =>
      Promise.resolve(
        method === 'sendPhoto'
          ? {
              message_id: ++messageId,
              chat: { id: Number(params.chat_id) },
              photo: [{ file_id: 'small' }, { file_id: 'FILE' }],
            }
          : true,
      ),
    ),
    upload: jest.fn((_m: string, fields: Row) =>
      Promise.resolve({
        message_id: ++messageId,
        chat: { id: Number(fields.chat_id) },
        photo: [{ file_id: 'small' }, { file_id: 'FILE' }],
      }),
    ),
  };
  const ocr = { enabled: false, read: jest.fn() };
  const service = new CardPaymentService(
    orders as never,
    users as never,
    subscriptions as never,
    bot as never,
    ocr as never,
  );
  return { service, orders, users, subscriptions, bot, ocr };
}

const receipt = (over: Row = {}) => ({
  buffer: Buffer.from('fake-png-' + Math.random()),
  mimetype: 'image/png',
  size: 1000,
  ...over,
});

const env = { ...process.env };
beforeAll(() => {
  jest.spyOn(Logger.prototype, 'log').mockImplementation(() => undefined);
  jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
  jest.spyOn(Logger.prototype, 'error').mockImplementation(() => undefined);
});
beforeEach(() => {
  process.env = {
    ...env,
    CARD_PAYMENT_ENABLED: 'true',
    CARD_PAYMENT_CARDS: `${HUMO}:Abrorbek X`,
    TELEGRAM_ADMIN_IDS: '11,22',
  };
});
afterAll(() => {
  process.env = env;
});

describe('설정 (끄기 스위치)', () => {
  it('스위치·카드·운영자가 다 있어야 켜진다', () => {
    const { service } = setup();
    expect(service.settings().enabled).toBe(true);
    process.env.CARD_PAYMENT_ENABLED = 'false';
    expect(service.settings().enabled).toBe(false);
    process.env.CARD_PAYMENT_ENABLED = 'true';
    process.env.CARD_PAYMENT_CARDS = '9860 1234 5678 9012'; // 체크섬 틀림
    expect(service.settings().enabled).toBe(false);
    process.env.CARD_PAYMENT_CARDS = HUMO;
    process.env.TELEGRAM_ADMIN_IDS = '';
    expect(service.settings().enabled).toBe(false);
  });

  it('꺼지면 카드번호를 안 준다 — 진행 중 주문이 있으면 끝까지 보여준다', async () => {
    const { service } = setup();
    const order = await service.createOrder(USER, 'super_1m');
    process.env.CARD_PAYMENT_ENABLED = 'false';
    const withOrder = await service.config(USER);
    expect(withOrder.enabled).toBe(false);
    expect(withOrder.cards).toHaveLength(1);
    expect(withOrder.activeOrder?.id).toBe(order.id);
    const fresh = await service.config(OTHER_USER);
    expect(fresh.cards).toEqual([]);
    await expect(service.createOrder(OTHER_USER, 'super_1m')).rejects.toThrow(
      'CARD_PAYMENT_DISABLED',
    );
  });
});

describe('주문', () => {
  it('정가보다 조금 적은 고유 금액, 30분 타이머', async () => {
    const { service } = setup();
    const o = await service.createOrder(USER, 'super_3m');
    expect(o.baseAmount).toBe(155_000);
    expect(o.amount).toBeLessThan(155_000);
    expect(o.amount).toBeGreaterThanOrEqual(154_001);
    expect(o.status).toBe('awaiting_transfer');
    expect(new Date(o.expiresAt).getTime() - Date.now()).toBeGreaterThan(
      29 * 60_000,
    );
    expect(o.code).toHaveLength(6);
  });

  it('같은 상품을 다시 누르면 같은 주문, 다른 상품이면 옛 주문 취소', async () => {
    const { service, orders } = setup();
    const a = await service.createOrder(USER, 'super_1m');
    const again = await service.createOrder(USER, 'super_1m');
    expect(again.id).toBe(a.id);
    const b = await service.createOrder(USER, 'max_1m');
    expect(b.id).not.toBe(a.id);
    expect(orders.rows.find((r) => same(r._id, a.id))?.status).toBe(
      'cancelled',
    );
  });

  it('다른 사람 주문과 금액이 겹치지 않는다', async () => {
    const { service } = setup();
    const amounts = new Set<number>();
    for (let i = 0; i < 40; i++) {
      const userId = new Types.ObjectId().toString();
      amounts.add((await service.createOrder(userId, 'super_1m')).amount);
    }
    expect(amounts.size).toBe(40);
  });

  it('심사 중이면 새 주문을 못 만든다', async () => {
    const { service } = setup();
    const o = await service.createOrder(USER, 'super_1m');
    await service.submitReceipt(USER, o.id, receipt(), '4321');
    await expect(service.createOrder(USER, 'super_3m')).rejects.toThrow(
      'ORDER_UNDER_REVIEW',
    );
  });

  it('남의 주문은 못 본다', async () => {
    const { service } = setup();
    const o = await service.createOrder(USER, 'super_1m');
    await expect(service.getOrder(OTHER_USER, o.id)).rejects.toThrow(
      'ORDER_NOT_FOUND',
    );
    await expect(service.getOrder(USER, 'nope')).rejects.toThrow(
      'ORDER_NOT_FOUND',
    );
  });
});

describe('영수증 제출', () => {
  it('끝 4자리·사진 형식을 검사한다', async () => {
    const { service } = setup();
    const o = await service.createOrder(USER, 'super_1m');
    await expect(
      service.submitReceipt(USER, o.id, receipt(), '123'),
    ).rejects.toThrow('INVALID_LAST4');
    await expect(
      service.submitReceipt(USER, o.id, receipt(), HUMO),
    ).rejects.toThrow('INVALID_LAST4');
    await expect(
      service.submitReceipt(
        USER,
        o.id,
        receipt({ mimetype: 'application/pdf' }),
        '1234',
      ),
    ).rejects.toThrow('INVALID_RECEIPT');
    await expect(
      service.submitReceipt(USER, o.id, undefined, '1234'),
    ).rejects.toThrow('INVALID_RECEIPT');
  });

  it('운영자 모두에게 사진 + 승인 버튼 (두 번째부터는 file_id 재사용)', async () => {
    const { service, bot, orders } = setup();
    const o = await service.createOrder(USER, 'super_1m');
    const view = await service.submitReceipt(USER, o.id, receipt(), '4321');
    expect(view.status).toBe('submitted');
    expect(bot.upload).toHaveBeenCalledTimes(1);
    const [, fields] = bot.upload.mock.calls[0] as [string, Row];
    expect(fields.chat_id).toBe('11');
    expect(fields.caption).toContain(`#${o.code}`);
    expect(fields.caption).toContain('aziza');
    expect(fields.caption).toContain('보낸 카드 •• 4321');
    expect(fields.reply_markup.inline_keyboard[0][0].callback_data).toBe(
      `cp:a:${o.id}`,
    );
    const second = bot.call.mock.calls.find((c) => c[0] === 'sendPhoto');
    expect(second?.[1]).toMatchObject({ chat_id: '22', photo: 'FILE' });
    const row = orders.rows.find((r) => same(r._id, o.id))!;
    expect(row.adminMessages).toHaveLength(2);
    expect(row.receiverLast4).toBe(HUMO.slice(-4));
    expect(row.receiptFileId).toBe('FILE');
  });

  it('운영자에게 하나도 못 보내면 주문은 그대로 — 다시 올릴 수 있다', async () => {
    const { service, bot, orders } = setup();
    bot.upload.mockRejectedValue(new Error('chat not found'));
    const o = await service.createOrder(USER, 'super_1m');
    await expect(
      service.submitReceipt(USER, o.id, receipt(), '4321'),
    ).rejects.toThrow('CARD_PAYMENT_ADMIN_UNREACHABLE');
    expect(orders.rows.find((r) => same(r._id, o.id))?.status).toBe(
      'awaiting_transfer',
    );
  });

  it('이미 승인된 영수증 사진은 다시 못 쓴다', async () => {
    const { service } = setup();
    const photo = receipt();
    const a = await service.createOrder(USER, 'super_1m');
    await service.submitReceipt(USER, a.id, { ...photo }, '4321');
    await service.approve(a.id, '11');
    const b = await service.createOrder(USER, 'super_1m');
    await expect(
      service.submitReceipt(USER, b.id, { ...photo }, '4321'),
    ).rejects.toThrow('RECEIPT_ALREADY_USED');
  });

  it('승인 안 된 주문의 사진을 또 쓰면 받되 운영자에게 경고', async () => {
    const { service, bot } = setup();
    const photo = receipt();
    const a = await service.createOrder(USER, 'super_1m');
    await service.submitReceipt(USER, a.id, { ...photo }, '4321');
    await service.reject(a.id, 'no_money', '11');
    const b = await service.createOrder(USER, 'super_1m');
    await service.submitReceipt(USER, b.id, { ...photo }, '4321');
    const caption = (bot.upload.mock.calls[1] as [string, Row])[1]
      .caption as string;
    expect(caption).toContain(`#${a.code}`);
    expect(caption).toContain('같은 사진');
  });

  it('유예 시간까지 지나면 닫힌다', async () => {
    const { service, orders } = setup();
    const o = await service.createOrder(USER, 'super_1m');
    orders.rows.find((r) => same(r._id, o.id))!.submitUntil = new Date(
      Date.now() - 1000,
    );
    await expect(
      service.submitReceipt(USER, o.id, receipt(), '4321'),
    ).rejects.toThrow('ORDER_EXPIRED');
  });
});

describe('운영자 버튼', () => {
  async function submitted(s: ReturnType<typeof setup>) {
    const o = await s.service.createOrder(USER, 'super_3m');
    await s.service.submitReceipt(USER, o.id, receipt(), '4321');
    return o;
  }
  const press = (data: string, from = 11) => ({
    id: 'cb1',
    from: { id: from },
    data,
    message: { message_id: 101, chat: { id: 11 } },
  });

  it('운영자가 아니면 아무것도 안 바뀐다', async () => {
    const s = setup();
    const o = await submitted(s);
    expect(await s.service.handleCallback(press(`cp:a:${o.id}`, 999))).toBe(
      true,
    );
    expect(s.bot.call).toHaveBeenCalledWith('answerCallbackQuery', {
      callback_query_id: 'cb1',
      text: '권한 없음',
    });
    expect(s.subscriptions.applyOneTimePass).not.toHaveBeenCalled();
  });

  it('cp: 가 아닌 버튼은 넘긴다', async () => {
    const s = setup();
    expect(
      await s.service.handleCallback({
        id: 'x',
        from: { id: 11 },
        data: 'other',
      }),
    ).toBe(false);
  });

  it('승인 → 기간권 + 캡션 갱신 + 유저 알림, 두 번 눌러도 한 번', async () => {
    const s = setup();
    const o = await submitted(s);
    await s.service.handleCallback(press(`cp:a:${o.id}`));
    expect(s.subscriptions.applyOneTimePass).toHaveBeenCalledWith({
      userId: USER,
      provider: 'card_transfer',
      platform: 'telegram',
      country: 'UZ',
      tier: 'super',
      plan: 'three_months',
      productId: 'card_super_3m',
      days: 90,
      externalTransactionId: `card:${o.id}`,
      priceMicros: o.amount * 1_000_000,
      currency: 'UZS',
    });
    const row = s.orders.rows.find((r) => same(r._id, o.id))!;
    expect(row.status).toBe('approved');
    expect(row.decidedBy).toBe('11');
    const edits = s.bot.call.mock.calls.filter(
      (c) => c[0] === 'editMessageCaption',
    );
    expect(edits).toHaveLength(2); // 운영자 두 명의 메시지
    expect(edits[0][1].caption).toContain('✅ 승인됨');
    expect(edits[0][1].reply_markup).toEqual({ inline_keyboard: [] });
    const notify = s.bot.call.mock.calls.find((c) => c[0] === 'sendMessage');
    expect(notify?.[1]).toMatchObject({ chat_id: '555' });
    expect((notify?.[1] as Row).text).toContain('tasdiqlandi');
    expect((notify?.[1] as Row).text).toContain('05.01.2027');

    await s.service.handleCallback(press(`cp:a:${o.id}`, 22));
    expect(s.subscriptions.applyOneTimePass).toHaveBeenCalledTimes(1);
    expect(s.bot.call).toHaveBeenLastCalledWith('answerCallbackQuery', {
      callback_query_id: 'cb1',
      text: '이미 처리됨 (approved)',
    });
  });

  it('기간 반영이 실패하면 승인도 되돌려 다시 누를 수 있다', async () => {
    const s = setup();
    const o = await submitted(s);
    s.subscriptions.applyOneTimePass.mockRejectedValueOnce(
      new Error('mongo down'),
    );
    expect(await s.service.approve(o.id, '11')).toMatch(/반영 실패/);
    expect(s.orders.rows.find((r) => same(r._id, o.id))?.status).toBe(
      'submitted',
    );
    expect(await s.service.approve(o.id, '11')).toMatch(/승인/);
  });

  it('거절은 사유를 고르는 버튼 → 사유와 함께 유저에게', async () => {
    const s = setup();
    const o = await submitted(s);
    await s.service.handleCallback(press(`cp:x:${o.id}`));
    const markup = s.bot.call.mock.calls.find(
      (c) => c[0] === 'editMessageReplyMarkup',
    )?.[1] as Row;
    expect(
      markup.reply_markup.inline_keyboard
        .flat()
        .map((b: Row) => b.callback_data),
    ).toEqual([
      `cp:r:${o.id}:no_money`,
      `cp:r:${o.id}:wrong_amount`,
      `cp:r:${o.id}:bad_receipt`,
      `cp:b:${o.id}`,
    ]);
    await s.service.handleCallback(press(`cp:r:${o.id}:wrong_amount`));
    const row = s.orders.rows.find((r) => same(r._id, o.id))!;
    expect(row.status).toBe('rejected');
    expect(row.rejectReason).toBe('wrong_amount');
    expect(s.subscriptions.applyOneTimePass).not.toHaveBeenCalled();
    const notify = s.bot.call.mock.calls.find((c) => c[0] === 'sendMessage');
    expect((notify?.[1] as Row).text).toContain('summa');
  });

  it('/cardcheck — 카드는 가려서, 틀린 번호는 이유와 함께', async () => {
    const s = setup();
    process.env.CARD_PAYMENT_CARDS = `${HUMO}:Abrorbek X;9860 1234 5678 9012`;
    const text = await s.service.describe();
    expect(text).toContain('켜짐');
    expect(text).toContain('ABRORBEK X');
    expect(text).not.toContain(HUMO);
    expect(text).toContain('체크섬');
  });
});

describe('OCR 힌트', () => {
  const order = { amount: 58_563, baseAmount: 59_000, payerLast4: '4321' };
  const fields = {
    isReceipt: true,
    success: true,
    amount: 58_563,
    dateTime: '2026-10-07 21:05',
    receiverCardLast4: HUMO.slice(-4),
    senderCardLast4: '4321',
  };

  it('금액·받는 카드·보낸 카드를 주문과 맞춘다', () => {
    expect(compareReceipt(fields, order, [HUMO.slice(-4)]).checks).toEqual({
      amount: 'ok',
      receiver: 'ok',
      sender: 'ok',
    });
    expect(
      compareReceipt({ ...fields, amount: 59_000 }, order, []).checks.amount,
    ).toBe('base');
    expect(
      compareReceipt({ ...fields, amount: 5_000 }, order, []).checks.amount,
    ).toBe('mismatch');
    expect(
      compareReceipt({ ...fields, receiverCardLast4: '0000' }, order, [
        HUMO.slice(-4),
      ]).checks.receiver,
    ).toBe('mismatch');
    expect(
      compareReceipt(
        { ...fields, amount: null, senderCardLast4: null },
        order,
        [],
      ).checks,
    ).toMatchObject({
      amount: 'unknown',
      sender: 'unknown',
    });
  });

  it('읽은 결과를 캡션에 붙인다', async () => {
    const s = setup();
    s.ocr.enabled = true;
    s.ocr.read.mockResolvedValue({ ...fields, amount: 59_000 });
    const o = await s.service.createOrder(USER, 'super_1m');
    await s.service.submitReceipt(USER, o.id, receipt(), '4321');
    const firstCaption = (s.bot.upload.mock.calls[0] as [string, Row])[1]
      .caption as string;
    expect(firstCaption).toContain('OCR 확인 중');
    await s.service.attachOcr(o.id, Buffer.from('x'), 'image/png');
    const edit = s.bot.call.mock.calls
      .filter((c) => c[0] === 'editMessageCaption')
      .pop()?.[1] as Row;
    expect(edit.caption).toContain('금액 🟡');
    expect(edit.caption).toContain('받는카드 ✅');
    expect(edit.reply_markup.inline_keyboard[0]).toHaveLength(2); // 아직 심사 중 — 버튼 유지
  });
});
