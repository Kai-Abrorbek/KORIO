import { AdminStarsSalesService } from './admin-stars-sales.service';

describe('AdminStarsSalesService', () => {
  it('reports confirmed Stars invoice gross and refunds separately from fiat', async () => {
    const aggregate = jest.fn().mockResolvedValue([
      {
        _id: null,
        grossMicros: 50_000_000,
        refundedMicros: 10_000_000,
        count: 3,
        refundedCount: 1,
      },
    ]);
    const service = new AdminStarsSalesService({ aggregate } as never);
    await expect(
      service.summary('2026-10-01', '2026-10-31'),
    ).resolves.toMatchObject({
      currency: 'XTR',
      grossStars: 50,
      refundedStars: 10,
      netStars: 40,
      count: 3,
      refundedCount: 1,
      source: 'telegram_stars_subscriptions',
    });
    const pipeline = (aggregate.mock.calls as unknown[][])[0]?.[0] as unknown[];
    expect(pipeline[0]).toEqual({
      $match: {
        provider: 'telegram_stars',
        currency: 'XTR',
        priceMicros: { $type: 'number', $gte: 0 },
        createdAt: {
          $gte: new Date('2026-10-01T00:00:00+05:00'),
          $lt: new Date('2026-11-01T00:00:00+05:00'),
        },
      },
    });
  });
});
