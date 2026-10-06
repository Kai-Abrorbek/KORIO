import { AdminRevenueService } from './admin-revenue.service';

describe('AdminRevenueService', () => {
  it('does not turn an unverified bucket into confirmed zero revenue', async () => {
    const state = {
      findOne: jest.fn(() => ({ lean: jest.fn(() => Promise.resolve(null)) })),
    };
    const service = new AdminRevenueService(
      {} as never,
      {} as never,
      state as never,
      { configured: true } as never,
    );
    await expect(
      service.summary({ from: '2026-10-01', to: '2026-10-07' }),
    ).rejects.toThrow('PLAY_REPORT_NOT_SYNCED');
  });

  it('marks a verified empty listing as no_reports with unavailable source flags', async () => {
    const files = {
      find: jest.fn(() => ({
        select: jest.fn(() => ({ lean: jest.fn(() => Promise.resolve([])) })),
      })),
    };
    const state = {
      findOne: jest.fn(() => ({
        lean: jest.fn(() =>
          Promise.resolve({
            lastSuccessfulCheckAt: new Date(),
            lastFailureAt: null,
          }),
        ),
      })),
    };
    const service = new AdminRevenueService(
      files as never,
      {} as never,
      state as never,
      { configured: true } as never,
    );
    const result = await service.summary({
      from: '2026-10-01',
      to: '2026-10-07',
    });
    expect(result.status).toBe('no_reports');
    expect(result.hasEstimatedData).toBe(false);
    expect(result.hasEarningsData).toBe(false);
    expect(result.selectedCurrency).toBeNull();
  });

  it('aggregates only active file versions in the selected currency and marks missing days', async () => {
    const files = {
      find: jest.fn(() => ({
        select: jest.fn(() => ({
          lean: jest.fn(() =>
            Promise.resolve([
              {
                path: 'sales/salesreport_202610.zip',
                sha256: 'active-sales',
                kind: 'estimated_sales',
                rowCount: 2,
                importedAt: new Date('2026-10-08'),
              },
              {
                path: 'earnings/earnings_202610.zip',
                sha256: 'active-earnings',
                kind: 'earnings',
                rowCount: 2,
                importedAt: new Date('2026-10-08'),
              },
            ]),
          ),
        })),
      })),
    };
    const state = {
      findOne: jest.fn(() => ({
        lean: jest.fn(() =>
          Promise.resolve({
            lastSuccessfulCheckAt: new Date(),
            lastFailureAt: null,
          }),
        ),
      })),
    };
    let aggregateCall = 0;
    const rows = {
      distinct: jest.fn(() => Promise.resolve(['USD', 'KRW'])),
      aggregate: jest.fn((pipeline: unknown) => {
        void pipeline;
        aggregateCall++;
        return Promise.resolve(
          aggregateCall === 1
            ? [
                { _id: 'estimated_sales', through: '2026-10-01' },
                { _id: 'earnings', through: '2026-10-01' },
              ]
            : [
                {
                  _id: {
                    date: '2026-10-01',
                    kind: 'estimated_sales',
                    category: 'charge',
                  },
                  amount: 1000,
                  count: 1,
                },
                {
                  _id: {
                    date: '2026-10-01',
                    kind: 'earnings',
                    category: 'charge',
                  },
                  amount: 1000,
                  count: 1,
                },
                {
                  _id: {
                    date: '2026-10-01',
                    kind: 'earnings',
                    category: 'fee',
                  },
                  amount: -150,
                  count: 1,
                },
              ],
        );
      }),
    };
    const service = new AdminRevenueService(
      files as never,
      rows as never,
      state as never,
      { configured: true } as never,
    );
    const result = await service.summary({
      from: '2026-10-01',
      to: '2026-10-02',
      currency: 'KRW',
    });
    const match = (
      rows.aggregate.mock.calls[1][0] as Array<{
        $match: {
          $or: Array<{ path: string; sha256: string }>;
          currency: string;
          date: { $gte: string; $lte: string };
        };
      }>
    )[0].$match;
    expect(match).toEqual({
      $or: [
        { path: 'sales/salesreport_202610.zip', sha256: 'active-sales' },
        { path: 'earnings/earnings_202610.zip', sha256: 'active-earnings' },
      ],
      currency: 'KRW',
      date: { $gte: '2026-10-01', $lte: '2026-10-02' },
    });
    expect(result.totals.grossMinor).toBe(1000);
    expect(result.totals.googleFeesMinor).toBe(150);
    expect(result.totals.netMinor).toBe(850);
    expect(result.hasEstimatedData).toBe(true);
    expect(result.hasEarningsData).toBe(true);
    expect(result.series[1].hasEstimatedData).toBe(false);
    expect(result.series[1].hasEarningsData).toBe(false);
  });
});
