import { BadRequestException } from '@nestjs/common';
import { AdminCardTransfersService } from './admin-card-transfers.service';

describe('AdminCardTransfersService', () => {
  it('counts only approved order amount on Tashkent approval dates', async () => {
    const aggregate = jest
      .fn()
      .mockResolvedValue([{ _id: null, amountMinor: 149_000, count: 2 }]);
    const service = new AdminCardTransfersService({ aggregate } as never);

    await expect(service.summary('2026-10-01', '2026-10-31')).resolves.toEqual({
      currency: 'UZS',
      amountMinor: 149_000,
      count: 2,
      source: 'approved_card_payment_orders',
    });
    expect(aggregate).toHaveBeenCalledWith([
      {
        $match: {
          status: 'approved',
          decidedAt: {
            $gte: new Date('2026-10-01T00:00:00+05:00'),
            $lt: new Date('2026-11-01T00:00:00+05:00'),
          },
        },
      },
      {
        $group: {
          _id: null,
          amountMinor: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);
  });

  it('does not pretend there are sales for an empty month', async () => {
    const service = new AdminCardTransfersService({
      aggregate: jest.fn().mockResolvedValue([]),
    } as never);
    await expect(
      service.summary('2026-10-01', '2026-10-31'),
    ).resolves.toMatchObject({
      amountMinor: 0,
      count: 0,
    });
  });

  it('rejects an invalid date range', async () => {
    const service = new AdminCardTransfersService({} as never);
    await expect(
      service.summary('2026-10-31', '2026-10-01'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
