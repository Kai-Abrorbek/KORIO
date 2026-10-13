/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
jest.mock('@nestjs/mongoose', () => ({
  InjectModel: () => () => undefined,
  Prop: () => () => undefined,
  Schema: () => () => undefined,
  SchemaFactory: { createForClass: () => ({ index: () => undefined }) },
}));
jest.mock('../users/schemas/user.schema', () => ({ User: { name: 'User' } }));

import { Types } from 'mongoose';
import { GemLedgerService } from './gem-ledger.service';

type Row = Record<string, any>;

/** 장부 모델 흉내 — userId · amount($gt/$lt) · _id($lt) 필터, _id 정렬, limit */
function fakeLedger(rows: Row[]) {
  const pass = (row: Row, q: Row) =>
    String(row.userId) === String(q.userId) &&
    (!q.amount ||
      (q.amount.$gt !== undefined
        ? row.amount > q.amount.$gt
        : row.amount < q.amount.$lt)) &&
    (!q._id || String(row._id) < String(q._id.$lt));
  return {
    rows,
    create: jest.fn((doc: Row) => {
      rows.push({ _id: new Types.ObjectId(), createdAt: new Date(), ...doc });
      return Promise.resolve(doc);
    }),
    find: (q: Row) => {
      let list = rows.filter((r) => pass(r, q));
      const chain: any = {
        sort: (s: Row) => {
          const dir = s._id ?? -1;
          list = [...list].sort((a, b) =>
            String(a._id) < String(b._id) ? -dir : dir,
          );
          return chain;
        },
        limit: (n: number) => {
          list = list.slice(0, n);
          return chain;
        },
        lean: () => Promise.resolve(list),
      };
      return chain;
    },
    findOne: (q: Row) => {
      const chain: any = {
        sort: () => chain,
        select: () => chain,
        lean: () =>
          Promise.resolve(
            [...rows]
              .filter((r) => String(r.userId) === String(q.userId))
              .sort((a, b) => (String(a._id) < String(b._id) ? -1 : 1))[0] ??
              null,
          ),
      };
      return chain;
    },
    aggregate: jest.fn((pipeline: Row[]) => {
      const match = pipeline[0].$match;
      const mine = rows.filter(
        (r) =>
          String(r.userId) === String(match.userId) &&
          r.createdAt >= match.createdAt.$gte,
      );
      if (!mine.length) return Promise.resolve([]);
      return Promise.resolve([
        {
          in: mine
            .filter((r) => r.amount > 0)
            .reduce((s, r) => s + r.amount, 0),
          out: mine
            .filter((r) => r.amount < 0)
            .reduce((s, r) => s + r.amount, 0),
        },
      ]);
    }),
  };
}

function setup() {
  const uid = new Types.ObjectId();
  const other = new Types.ObjectId();
  const ledger = fakeLedger([]);
  const users = {
    findById: () => ({
      select: () => ({
        lean: () => Promise.resolve({ gems: 1240, timezone: 'Asia/Tashkent' }),
      }),
    }),
  };
  const service = new GemLedgerService(ledger as never, users as never);
  return { service, ledger, uid: uid.toString(), other: other.toString() };
}

describe('GemLedgerService', () => {
  it('0 이나 숫자가 아닌 값은 안 남기고, 쓰기 실패는 던지지 않는다', async () => {
    const t = setup();
    await t.service.record(t.uid, 0, 'quest');
    await t.service.record(t.uid, Number.NaN, 'quest');
    expect(t.ledger.create).not.toHaveBeenCalled();

    t.ledger.create.mockImplementationOnce(() =>
      Promise.reject(new Error('db down')),
    );
    await expect(t.service.record(t.uid, 35, 'quest')).resolves.toBeUndefined();
  });

  it('최근 것부터, 받은/쓴 것만, 커서로 다음 페이지', async () => {
    const t = setup();
    // 순서대로 쌓인다 (ObjectId 는 시간순)
    await t.service.record(t.uid, 35, 'quest');
    await t.service.record(t.uid, -350, 'energy_refill');
    await t.service.record(t.other, 999, 'admin');
    await t.service.record(t.uid, 120, 'league', { tier: 'gold', rank: 2 });
    await t.service.record(t.uid, -700, 'gem_pass', { days: 7 });

    const all = await t.service.history(t.uid, {});
    expect(all.items.map((i) => i.amount)).toEqual([-700, 120, -350, 35]);
    expect(all.items[1]).toMatchObject({
      source: 'league',
      params: { tier: 'gold', rank: 2 },
    });
    expect(all.nextCursor).toBeNull();

    const inOnly = await t.service.history(t.uid, { type: 'in' });
    expect(inOnly.items.map((i) => i.amount)).toEqual([120, 35]);
    const outOnly = await t.service.history(t.uid, { type: 'out' });
    expect(outOnly.items.map((i) => i.amount)).toEqual([-700, -350]);

    const page1 = await t.service.history(t.uid, { limit: 3 });
    expect(page1.items).toHaveLength(3);
    expect(page1.nextCursor).toBe(page1.items[2].id);
    const page2 = await t.service.history(t.uid, {
      limit: 3,
      before: page1.nextCursor!,
    });
    expect(page2.items.map((i) => i.amount)).toEqual([35]);
    expect(page2.nextCursor).toBeNull();
  });

  it('요약 — 잔액 + 이번 달 들어온·나간 보석(양수) + 기록 시작일', async () => {
    const t = setup();
    expect(await t.service.summary(t.uid)).toEqual({
      balance: 1240,
      monthIn: 0,
      monthOut: 0,
      since: null,
    });
    await t.service.record(t.uid, 500, 'subscription_bonus');
    await t.service.record(t.uid, -350, 'energy_refill');
    const s = await t.service.summary(t.uid);
    expect(s).toMatchObject({ balance: 1240, monthIn: 500, monthOut: 350 });
    expect(s.since).toBeInstanceOf(Date);
  });
});
