jest.mock('@nestjs/mongoose', () => ({ InjectModel: () => () => undefined }));
jest.mock('@nestjs/schedule', () => ({ Cron: () => () => undefined }));
jest.mock('../../analytics/subscription-events.service', () => ({
  SubscriptionEventsService: class {},
}));
jest.mock('../../users/schemas/user.schema', () => ({
  User: { name: 'User' },
}));
jest.mock('./subscription.schema', () => ({
  Subscription: { name: 'Subscription' },
}));

import { Types } from 'mongoose';
import {
  SubscriptionService,
  type OneTimePassInput,
} from './subscription.service';

const DAY = 86_400_000;
const USER = new Types.ObjectId().toString();

type Row = Record<string, unknown>;

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

const same = (a: unknown, b: unknown) => String(a) === String(b);

function matches(row: Row, q: Row): boolean {
  return Object.entries(q).every(([k, cond]) => {
    const v = row[k];
    if (cond && typeof cond === 'object' && !(cond instanceof Types.ObjectId)) {
      const op = cond as { $in?: unknown[]; $gt?: Date };
      if (op.$in) return op.$in.includes(v);
      if (op.$gt) return (v as Date) > op.$gt;
    }
    return same(v, cond);
  });
}

function setup(existing: Row[] = []) {
  const rows: Row[] = existing.map((r) => ({
    userId: new Types.ObjectId(USER),
    status: 'active',
    ...r,
  }));
  const subModel = {
    findOne: jest.fn((q: Row) =>
      chain(rows.find((r) => matches(r, q)) ?? null),
    ),
    find: jest.fn((q: Row) => chain(rows.filter((r) => matches(r, q)))),
    exists: jest.fn((q: Row) =>
      Promise.resolve(rows.some((r) => matches(r, q)) ? { _id: 1 } : null),
    ),
    create: jest.fn((doc: Row) => {
      if (
        rows.some(
          (r) =>
            r.provider === doc.provider &&
            r.externalTransactionId === doc.externalTransactionId,
        )
      ) {
        return Promise.reject(Object.assign(new Error('dup'), { code: 11000 }));
      }
      const row = { _id: new Types.ObjectId(), ...doc };
      rows.push(row);
      return Promise.resolve(row);
    }),
  };
  const userUpdates: Row[] = [];
  const userModel = {
    findById: jest.fn(() => chain({ isSuper: false })),
    updateOne: jest.fn((_q: Row, u: Row) => {
      userUpdates.push(u);
      return Promise.resolve();
    }),
  };
  const events = { record: jest.fn(() => Promise.resolve()) };
  /** 마지막으로 user 에 $set 한 값 (isSuper 투영) */
  const lastSet = () =>
    userUpdates
      .map((u) => u.$set as Row | undefined)
      .filter(Boolean)
      .pop();
  const service = new SubscriptionService(
    subModel as never,
    userModel as never,
    events as never,
  );
  return { service, rows, userUpdates, events, lastSet };
}

const pass = (over: Partial<OneTimePassInput> = {}): OneTimePassInput => ({
  userId: USER,
  provider: 'telegram_stars',
  platform: 'telegram',
  tier: 'super',
  plan: 'monthly',
  productId: 'stars_super_1m',
  days: 30,
  externalTransactionId: 'ch_1',
  payerId: '777',
  priceMicros: 250_000_000,
  currency: 'XTR',
  ...over,
});

const near = (a: Date, b: number) => Math.abs(a.getTime() - b) < 5_000;

describe('applyOneTimePass — 텔레그램 Stars 기간권', () => {
  it('처음 사면 지금부터 + 첫 구독 보석 500', async () => {
    const { service, rows, userUpdates, lastSet } = setup();
    const r = await service.applyOneTimePass(pass());
    expect(r.applied).toBe(true);
    expect(near(r.startedAt, Date.now())).toBe(true);
    expect(near(r.expiresAt, Date.now() + 30 * DAY)).toBe(true);
    expect(rows[0]).toMatchObject({
      provider: 'telegram_stars',
      platform: 'telegram',
      autoRenew: false,
      payerId: '777',
      priceMicros: 250_000_000,
      currency: 'XTR',
      welcomeGrantGiven: true,
    });
    expect(userUpdates).toContainEqual({ $inc: { gems: 500 } });
    // user.isSuper 로 투영
    expect(lastSet()).toMatchObject({
      isSuper: true,
      superTier: 'super',
      superPlan: 'monthly',
    });
  });

  it('보석은 계정의 첫 유료 구독에만', async () => {
    const { service, userUpdates } = setup([
      {
        provider: 'google_play',
        tier: 'super',
        expiresAt: new Date(Date.now() - DAY),
        status: 'expired',
        welcomeGrantGiven: true,
        externalTransactionId: 'old',
      },
    ]);
    await service.applyOneTimePass(pass());
    expect(userUpdates).not.toContainEqual({ $inc: { gems: 500 } });
  });

  it('같은 등급이 살아 있으면 그 뒤에 이어 붙인다', async () => {
    const until = Date.now() + 10 * DAY;
    const { service } = setup([
      {
        provider: 'google_play',
        tier: 'super',
        expiresAt: new Date(until),
        externalTransactionId: 'g',
      },
    ]);
    const r = await service.applyOneTimePass(pass({ days: 90 }));
    expect(r.startedAt.getTime()).toBe(until);
    expect(r.expiresAt.getTime()).toBe(until + 90 * DAY);
  });

  it('위 등급(MAX)이 살아 있으면 SUPER 는 MAX 가 끝난 뒤부터', async () => {
    const until = Date.now() + 12 * DAY;
    const { service } = setup([
      {
        provider: 'google_play',
        tier: 'max',
        expiresAt: new Date(until),
        externalTransactionId: 'g',
      },
    ]);
    const r = await service.applyOneTimePass(pass());
    expect(r.startedAt.getTime()).toBe(until);
  });

  it('아래 등급만 살아 있으면 MAX 는 지금 시작하고 바로 MAX 로 투영', async () => {
    const { service, lastSet } = setup([
      {
        provider: 'gems',
        tier: 'super',
        expiresAt: new Date(Date.now() + 100 * DAY),
        externalTransactionId: 'gem',
      },
    ]);
    const r = await service.applyOneTimePass(
      pass({ tier: 'max', productId: 'stars_max_1m' }),
    );
    expect(near(r.startedAt, Date.now())).toBe(true);
    expect(lastSet()).toMatchObject({ isSuper: true, superTier: 'max' });
  });

  it('만료·환불 회수된 건 이어 붙일 기준이 아니다', async () => {
    const { service } = setup([
      {
        provider: 'telegram_stars',
        tier: 'super',
        status: 'expired',
        expiresAt: new Date(Date.now() + 20 * DAY),
        externalTransactionId: 'refunded',
      },
    ]);
    const r = await service.applyOneTimePass(pass());
    expect(near(r.startedAt, Date.now())).toBe(true);
  });

  it('같은 결제가 다시 와도 한 건 — 날짜를 다시 계산하지 않는다', async () => {
    const { service, rows, events } = setup();
    const first = await service.applyOneTimePass(pass());
    const again = await service.applyOneTimePass(pass());
    expect(again.applied).toBe(false);
    expect(again.expiresAt).toEqual(first.expiresAt);
    expect(rows).toHaveLength(1);
    expect(events.record).toHaveBeenCalledTimes(1);
  });
});

describe('만료 청소부 — 끝난 구간 뒤에 이어지는 구독', () => {
  it('MAX 가 끝나도 뒤에 산 SUPER 가 있으면 SUPER 로 다시 투영', async () => {
    const { service, lastSet } = setup([
      {
        provider: 'telegram_stars',
        tier: 'super',
        plan: 'three_months',
        expiresAt: new Date(Date.now() + 40 * DAY),
        externalTransactionId: 's',
      },
    ]);
    const kept = await service.syncUser(USER);
    expect(kept).toBe(true);
    expect(lastSet()).toMatchObject({
      isSuper: true,
      superTier: 'super',
      superPlan: 'three_months',
    });
  });

  it('남은 게 없으면 내린다', async () => {
    const { service, lastSet } = setup();
    expect(await service.syncUser(USER)).toBe(false);
    expect(lastSet()).toMatchObject({ isSuper: false });
  });
});
