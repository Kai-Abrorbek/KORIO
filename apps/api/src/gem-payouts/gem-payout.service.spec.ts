// Only the charge condition is under test; the collaborators pull in every schema.
jest.mock('../admin/admin-audit.service', () => ({
  AdminAuditService: class {},
}));
jest.mock('../notifications/notifications.service', () => ({
  NotificationsService: class {},
}));
jest.mock('../push/push.service', () => ({ PushService: class {} }));
jest.mock('../gem-ledger/gem-ledger.service', () => ({
  GemLedgerService: class {},
}));
jest.mock('../payments/providers/telegram-stars/telegram-bot.api', () => ({
  TelegramBotApi: class {},
  telegramAdminIds: () => [],
}));
jest.mock('../users/schemas/user.schema', () => ({ User: { name: 'User' } }));
jest.mock('./gem-payout-request.schema', () => ({
  GemPayoutRequest: { name: 'GemPayoutRequest' },
}));

import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';
import { GEM_PAYOUT } from './gem-payout.const';
import { GemPayoutService } from './gem-payout.service';

/**
 * Evaluates the aggregation expression the service sends, against one user
 * document — the operators it uses, nothing more.
 */
function evaluate(expr: unknown, doc: Record<string, unknown>): unknown {
  if (typeof expr === 'string' && expr.startsWith('$'))
    return expr
      .slice(1)
      .split('.')
      .reduce<unknown>(
        (value, key) => (value as Record<string, unknown> | undefined)?.[key],
        doc,
      );
  if (!expr || typeof expr !== 'object' || Array.isArray(expr)) return expr;
  const [[op, raw]] = Object.entries(expr);
  const args = (Array.isArray(raw) ? raw : [raw]).map((arg) =>
    evaluate(arg, doc),
  ) as never[];
  switch (op) {
    case '$gte':
      return args[0] >= args[1];
    case '$add':
      return (args as number[]).reduce((sum, value) => sum + value, 0);
    case '$eq':
      return args[0] === args[1];
    case '$max':
      return Math.max(...(args as number[]));
    case '$ifNull':
      return args[0] ?? args[1];
    case '$cond':
      return args[0] ? args[1] : args[2];
    default:
      throw new Error(`unsupported ${op}`);
  }
}

describe('GemPayoutService.create', () => {
  const card = {
    brand: 'uzcard' as const,
    cardNumber: '8600 1234 5678 9012',
    cardHolder: 'AZIZ KARIMOV',
  };

  function setup() {
    const users = {
      findOneAndUpdate: jest.fn().mockReturnValue({
        select: () => ({ lean: () => Promise.resolve(null) }),
      }),
      updateOne: jest.fn(),
    };
    const requests = { exists: jest.fn().mockResolvedValue(null) };
    const service = new GemPayoutService(
      requests as never,
      users as never,
      {} as never,
      {} as never,
      {} as never,
      {} as never,
    );
    return { service, users };
  }

  it('keeps gems from an unfinished streak goal out of a payout', async () => {
    const { service, users } = setup();
    const gems = GEM_PAYOUT.MIN_GEMS;
    await expect(
      service.create(new Types.ObjectId().toString(), { ...card, gems }),
    ).rejects.toBeInstanceOf(BadRequestException);

    const [filter] = users.findOneAndUpdate.mock.calls[0] as [
      { $expr: unknown },
    ];
    const wouldCharge = (
      _filter: unknown,
      user: { gems: number; streakGoal?: { status?: string; gems?: number } },
    ) => evaluate(filter.$expr, user);
    // Exactly enough gems, but 1,000 of them came from a goal still running.
    expect(
      wouldCharge(filter, {
        gems,
        streakGoal: { status: 'active', gems: 1_000 },
      }),
    ).toBe(false);
    expect(
      wouldCharge(filter, {
        gems: gems + 1_000,
        streakGoal: { status: 'active', gems: 1_000 },
      }),
    ).toBe(true);
    // A finished goal locks nothing.
    expect(
      wouldCharge(filter, {
        gems,
        streakGoal: { status: 'done', gems: 1_000 },
      }),
    ).toBe(true);
  });
});
