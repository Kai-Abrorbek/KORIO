/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return */
jest.mock('@nestjs/mongoose', () => ({
  InjectModel: () => () => undefined,
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));
jest.mock('../admin/admin-audit.service', () => ({
  AdminAuditService: class {},
}));
jest.mock('../notifications/notifications.service', () => ({
  NotificationsService: class {},
}));
jest.mock('../push/push.service', () => ({ PushService: class {} }));
jest.mock('../users/schemas/user.schema', () => ({ User: { name: 'User' } }));
jest.mock('../payments/providers/telegram-stars/telegram-bot.api', () => ({
  TelegramBotApi: class {},
}));

import { Types } from 'mongoose';
import { GemPayoutService } from './gem-payout.service';
import { normalizeCardHolder, payoutCardProblem } from './payout-card';

type Row = Record<string, any>;

/** 테스트용 Luhn 맞는 번호 만들기 (앞 15자리 + 체크 숫자) */
function luhn(prefix15: string) {
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    let d = Number(prefix15[14 - i]);
    if (i % 2 === 0) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
  }
  return prefix15 + String((10 - (sum % 10)) % 10);
}
const HUMO = luhn('986012345678901');
const VISA = luhn('411111111111111');
const MC2 = luhn('222100000000000');

const eq = (a: unknown, b: unknown) => String(a) === String(b);
function matches(row: Row, q: Row): boolean {
  return Object.entries(q).every(([k, cond]) => {
    const v = row[k];
    if (cond && typeof cond === 'object' && !(cond instanceof Types.ObjectId)) {
      if ('$gte' in cond) return v >= cond.$gte;
      if ('$in' in cond) return cond.$in.some((x: unknown) => eq(x, v));
      if ('$ne' in cond) return !eq(v, cond.$ne);
    }
    return eq(v, cond);
  });
}
const chain = (value: unknown) => {
  const q: any = {
    sort: () => q,
    limit: () => q,
    skip: () => q,
    select: () => q,
    lean: () => Promise.resolve(value),
    catch: () => q,
    then: (ok: any, bad: any) => Promise.resolve(value).then(ok, bad),
  };
  return q;
};
function apply(row: Row, update: Row) {
  for (const [k, v] of Object.entries(update.$set ?? {})) row[k] = v;
  for (const [k, v] of Object.entries(update.$inc ?? {}))
    row[k] = (row[k] ?? 0) + (v as number);
}
function fakeModel(rows: Row[], unique?: (row: Row) => boolean) {
  return {
    rows,
    exists: (q: Row) =>
      Promise.resolve(rows.some((r) => matches(r, q)) ? { _id: 1 } : null),
    find: (q: Row) => chain(rows.filter((r) => matches(r, q))),
    findById: (id: unknown) => chain(rows.find((r) => eq(r._id, id)) ?? null),
    countDocuments: (q: Row) =>
      Promise.resolve(rows.filter((r) => matches(r, q)).length),
    aggregate: () => Promise.resolve([]),
    create: (doc: Row) => {
      const row = { _id: new Types.ObjectId(), createdAt: new Date(), ...doc };
      if (unique && unique(row))
        return Promise.reject(Object.assign(new Error('dup'), { code: 11000 }));
      rows.push(row);
      return Promise.resolve({ ...row, toObject: () => ({ ...row }) });
    },
    findOneAndUpdate: (q: Row, update: Row) => {
      const row = rows.find((r) => matches(r, q));
      if (row) apply(row, update);
      return chain(row ? { ...row } : null);
    },
    updateOne: (q: Row, update: Row) => {
      const row = rows.find((r) => matches(r, q));
      if (row) apply(row, update);
      return Promise.resolve({ modifiedCount: row ? 1 : 0 });
    },
  };
}

function setup(gems = 1000, provider = 'telegram') {
  const uid = new Types.ObjectId();
  const users = fakeModel([
    {
      _id: uid,
      gems,
      provider,
      providerId: '777',
      appLanguage: 'ko',
      nickname: 'Kai',
    },
  ]);
  const requests = fakeModel(
    [],
    (row) =>
      row.open && requests.rows.some((r) => r.open && eq(r.userId, row.userId)),
  );
  const notifications = { create: jest.fn(() => Promise.resolve()) };
  const push = { send: jest.fn(() => Promise.resolve(true)) };
  const bot = { enabled: true, call: jest.fn(() => Promise.resolve()) };
  const audit = { record: jest.fn(() => Promise.resolve()) };
  const ledger = { record: jest.fn(() => Promise.resolve()) };
  const service = new GemPayoutService(
    requests as never,
    users as never,
    notifications as never,
    push as never,
    bot as never,
    audit as never,
    ledger as never,
  );
  const admin = {
    userId: new Types.ObjectId().toString(),
    email: 'a@k.uz',
    role: 'super_admin' as const,
  };
  const userGems = () => users.rows[0].gems as number;
  return {
    service,
    users,
    requests,
    notifications,
    push,
    bot,
    audit,
    ledger,
    admin,
    uid: uid.toString(),
    userGems,
  };
}

const dto = (over: Row = {}) => ({
  brand: 'humo' as const,
  cardNumber: HUMO.replace(/(\d{4})(?=\d)/g, '$1 '),
  cardHolder: 'abrorbek anvarbekov',
  gems: 500,
  ...over,
});

describe('카드 번호 검사', () => {
  it('종류별 앞자리 + Luhn', () => {
    expect(payoutCardProblem(HUMO, 'humo')).toBeNull();
    expect(payoutCardProblem(VISA, 'visa')).toBeNull();
    expect(payoutCardProblem(MC2, 'mastercard')).toBeNull();
    expect(payoutCardProblem('6262000000000001', 'uzcard')).toBeNull(); // UnionPay 코뱃지는 Luhn 건너뜀
  });

  it('틀린 경우', () => {
    expect(payoutCardProblem('9860 1234', 'humo')).toBe('LENGTH');
    expect(payoutCardProblem(HUMO, 'uzcard')).toBe('BRAND_MISMATCH');
    expect(payoutCardProblem('1234567812345670', 'visa')).toBe('BRAND');
    const typo = HUMO.slice(0, 15) + String((Number(HUMO[15]) + 1) % 10);
    expect(payoutCardProblem(typo, 'humo')).toBe('LUHN');
  });

  it('카드 이름은 라틴 대문자로', () => {
    expect(normalizeCardHolder('  abrorbek   anvarbekov ')).toBe(
      'ABRORBEK ANVARBEKOV',
    );
    expect(normalizeCardHolder('o‘g‘li')).toBe("O'G'LI");
    expect(normalizeCardHolder('Аброр')).toBeNull();
    expect(normalizeCardHolder('A')).toBeNull();
  });
});

describe('보석 출금 신청', () => {
  it('신청하면 보석을 바로 빼고 접수', async () => {
    const t = setup(1000);
    const res = await t.service.create(t.uid, dto());
    expect(res.gems).toBe(500);
    expect(t.userGems()).toBe(500);
    expect(res.request).toMatchObject({
      status: 'pending',
      gems: 500,
      amountUzs: 500,
      cardLast4: HUMO.slice(-4),
      cardHolder: 'ABRORBEK ANVARBEKOV',
    });
    expect(t.requests.rows[0]).toMatchObject({ cardNumber: HUMO, open: true });
  });

  it('최소 수량 미만·보석 부족·잘못된 카드는 보석을 안 뺀다', async () => {
    const t = setup(1000);
    await expect(t.service.create(t.uid, dto({ gems: 99 }))).rejects.toThrow(
      'PAYOUT_BELOW_MIN',
    );
    await expect(t.service.create(t.uid, dto({ gems: 5000 }))).rejects.toThrow(
      'NOT_ENOUGH_GEMS',
    );
    await expect(
      t.service.create(t.uid, dto({ brand: 'visa' })),
    ).rejects.toThrow('PAYOUT_CARD_BRAND_MISMATCH');
    await expect(
      t.service.create(t.uid, dto({ cardHolder: '1' })),
    ).rejects.toThrow('PAYOUT_HOLDER_INVALID');
    expect(t.userGems()).toBe(1000);
    expect(t.requests.rows).toHaveLength(0);
  });

  it('열린 신청이 있으면 또 못 한다', async () => {
    const t = setup(1000);
    await t.service.create(t.uid, dto({ gems: 200 }));
    await expect(t.service.create(t.uid, dto({ gems: 200 }))).rejects.toThrow(
      'PAYOUT_ALREADY_OPEN',
    );
    expect(t.userGems()).toBe(800);
  });

  it('접수 상태면 취소 — 보석 반환, 카드 번호 가림', async () => {
    const t = setup(1000);
    const { request } = await t.service.create(t.uid, dto());
    const res = await t.service.cancel(t.uid, request.id);
    expect(res.request.status).toBe('cancelled');
    expect(res.gems).toBe(1000);
    expect(t.requests.rows[0].cardNumber).toMatch(/^9860 •••• •••• \d{4}$/);
    await expect(t.service.cancel(t.uid, request.id)).rejects.toThrow(
      'PAYOUT_NOT_CANCELLABLE',
    );
    expect(t.userGems()).toBe(1000);
  });
});

describe('운영자 처리', () => {
  it('처리 중 → 송금 완료: 알림·푸시·봇이 가고 카드 번호를 가린다', async () => {
    const t = setup(1000);
    const { request } = await t.service.create(t.uid, dto());
    await t.service.adminSetStatus(
      request.id,
      { status: 'processing' },
      t.admin,
    );
    expect(t.notifications.create).not.toHaveBeenCalled();
    // 처리 중이면 유저가 취소 못 한다
    await expect(t.service.cancel(t.uid, request.id)).rejects.toThrow(
      'PAYOUT_NOT_CANCELLABLE',
    );
    const detail = await t.service.adminSetStatus(
      request.id,
      { status: 'completed' },
      t.admin,
    );
    expect(detail).toMatchObject({ status: 'completed', open: false });
    expect(t.requests.rows[0].cardNumber).toContain('••••');
    expect(t.notifications.create).toHaveBeenCalledWith(
      expect.anything(),
      'gem_payout_done',
      expect.objectContaining({
        params: { amount: '500', last4: HUMO.slice(-4) },
      }),
    );
    expect(t.push.send).toHaveBeenCalledWith(
      expect.anything(),
      'gem_payout_done',
      expect.objectContaining({ dedupKey: `payout:${request.id}:completed` }),
    );
    expect(t.bot.call).toHaveBeenCalledWith(
      'sendMessage',
      expect.objectContaining({ chat_id: '777' }),
    );
    expect(t.userGems()).toBe(500);
    expect(t.audit.record).toHaveBeenCalledTimes(2);
  });

  it('반려하면 보석을 한 번만 돌려준다 (두 번 눌러도)', async () => {
    const t = setup(1000);
    const { request } = await t.service.create(t.uid, dto());
    await t.service.adminSetStatus(
      request.id,
      { status: 'rejected', reason: 'name_mismatch' },
      t.admin,
    );
    await expect(
      t.service.adminSetStatus(
        request.id,
        { status: 'rejected', reason: 'name_mismatch' },
        t.admin,
      ),
    ).rejects.toThrow('PAYOUT_STATE_CHANGED');
    expect(t.userGems()).toBe(1000);
    expect(t.requests.rows[0]).toMatchObject({
      status: 'rejected',
      rejectReason: 'name_mismatch',
      refunded: true,
      open: false,
    });
    expect(t.notifications.create).toHaveBeenCalledWith(
      expect.anything(),
      'gem_payout_rejected',
      expect.objectContaining({
        params: { gems: '500', reason: 'name_mismatch' },
      }),
    );
  });

  it('끝난 건은 다시 못 연다 · 앱 유저에게는 봇 메시지를 안 보낸다', async () => {
    const t = setup(1000, 'google');
    const { request } = await t.service.create(t.uid, dto());
    await t.service.adminSetStatus(
      request.id,
      { status: 'completed' },
      t.admin,
    );
    await expect(
      t.service.adminSetStatus(request.id, { status: 'processing' }, t.admin),
    ).rejects.toThrow('PAYOUT_STATE_CHANGED');
    expect(t.bot.call).not.toHaveBeenCalled();
    expect(t.push.send).toHaveBeenCalled();
  });
});

describe('보석 장부', () => {
  it('신청은 −, 취소 환불은 + 로 남긴다 (끝 4자리·사유)', async () => {
    const t = setup();
    const { request } = await t.service.create(t.uid, dto());
    expect(t.ledger.record).toHaveBeenCalledTimes(1);
    expect(t.ledger.record).toHaveBeenLastCalledWith(
      expect.anything(),
      -500,
      'payout',
      { last4: HUMO.slice(-4) },
    );
    await t.service.cancel(t.uid, request.id);
    expect(t.ledger.record).toHaveBeenCalledTimes(2);
    expect(t.ledger.record).toHaveBeenLastCalledWith(
      expect.anything(),
      500,
      'payout_refund',
      { last4: HUMO.slice(-4), reason: 'cancelled' },
    );
  });

  it('반려 환불은 rejected 로 한 번만 · 막힌 신청은 안 남긴다', async () => {
    const t = setup();
    const { request } = await t.service.create(t.uid, dto());
    await expect(t.service.create(t.uid, dto())).rejects.toThrow(
      'PAYOUT_ALREADY_OPEN',
    );
    await expect(
      t.service.create(t.uid, dto({ gems: 99999 })),
    ).rejects.toThrow();
    expect(t.ledger.record).toHaveBeenCalledTimes(1);

    await t.service.adminSetStatus(
      request.id,
      { status: 'rejected', reason: 'invalid_card' },
      t.admin,
    );
    await expect(
      t.service.adminSetStatus(
        request.id,
        { status: 'rejected', reason: 'invalid_card' },
        t.admin,
      ),
    ).rejects.toThrow('PAYOUT_STATE_CHANGED');
    expect(t.ledger.record).toHaveBeenCalledTimes(2);
    expect(t.ledger.record).toHaveBeenLastCalledWith(
      expect.anything(),
      500,
      'payout_refund',
      { last4: HUMO.slice(-4), reason: 'rejected' },
    );
  });
});
