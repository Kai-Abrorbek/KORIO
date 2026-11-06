import { ForbiddenException } from '@nestjs/common';
import {
  ACCOUNT_RECENTLY_DELETED,
  REJOIN_BLOCK_DAYS,
  assertCanRejoin,
  identityKeys,
  recordDeletedIdentity,
} from './schemas/deleted-identity.schema';

/** blockedUntil 조건까지 흉내 내는 메모리 저장소 */
function memoryModel() {
  const rows = new Map<string, Date>();
  return {
    rows,
    bulkWrite: jest.fn(
      (
        ops: {
          updateOne: {
            filter: { key: string };
            update: { $set: { blockedUntil: Date } };
          };
        }[],
      ) => {
        for (const op of ops)
          rows.set(
            op.updateOne.filter.key,
            op.updateOne.update.$set.blockedUntil,
          );
        return Promise.resolve({});
      },
    ),
    exists: jest.fn(
      (q: { key: { $in: string[] }; blockedUntil: { $gt: Date } }) =>
        Promise.resolve(
          q.key.$in.some((k) => {
            const until = rows.get(k);
            return until && until > q.blockedUntil.$gt;
          })
            ? { _id: 'x' }
            : null,
        ),
    ),
  };
}

const DAY = 24 * 60 * 60 * 1000;

describe('deleted identity (90-day rejoin block)', () => {
  it('never stores the raw email or provider id', () => {
    const keys = identityKeys({
      provider: 'google',
      providerId: 'g-123',
      email: 'Kai@Example.com',
    });
    expect(keys).toHaveLength(2);
    for (const k of keys) {
      expect(k).toMatch(/^[a-f0-9]{64}$/);
      expect(k).not.toContain('kai');
    }
  });

  it('matches the email regardless of case and the local provider has no id key', () => {
    expect(
      identityKeys({ provider: 'local', providerId: 'x', email: 'A@b.co' }),
    ).toEqual(identityKeys({ email: ' a@b.co ' }));
  });

  it('blocks the same telegram account within 90 days and lets it back after', async () => {
    const model = memoryModel();
    const deletedAt = new Date('2026-11-06T05:00:00Z');
    await recordDeletedIdentity(
      model as never,
      { provider: 'telegram', providerId: '777' },
      deletedAt,
    );

    const nextDay = new Date(deletedAt.getTime() + DAY);
    await expect(
      assertCanRejoin(
        model as never,
        { provider: 'telegram', providerId: '777' },
        nextDay,
      ),
    ).rejects.toThrow(new ForbiddenException(ACCOUNT_RECENTLY_DELETED));

    const later = new Date(deletedAt.getTime() + (REJOIN_BLOCK_DAYS + 1) * DAY);
    await expect(
      assertCanRejoin(
        model as never,
        { provider: 'telegram', providerId: '777' },
        later,
      ),
    ).resolves.toBeUndefined();
  });

  it('a deleted Google account also blocks an email signup with the same address', async () => {
    const model = memoryModel();
    const now = new Date();
    await recordDeletedIdentity(
      model as never,
      { provider: 'google', providerId: 'g1', email: 'same@x.uz' },
      now,
    );
    await expect(
      assertCanRejoin(model as never, { email: 'SAME@x.uz' }, now),
    ).rejects.toThrow(ACCOUNT_RECENTLY_DELETED);
  });

  it('other identities are not affected', async () => {
    const model = memoryModel();
    await recordDeletedIdentity(model as never, {
      provider: 'telegram',
      providerId: '1',
    });
    await expect(
      assertCanRejoin(model as never, {
        provider: 'telegram',
        providerId: '2',
      }),
    ).resolves.toBeUndefined();
    await expect(
      assertCanRejoin(model as never, { provider: 'google', providerId: '1' }),
    ).resolves.toBeUndefined();
  });
});
