import { AdminStarsBalanceService } from './admin-stars-balance.service';

describe('AdminStarsBalanceService', () => {
  it('uses the official bot balance method and preserves fractional Stars', async () => {
    const call = jest
      .fn()
      .mockResolvedValue({ amount: 27, nanostar_amount: 4 });
    const service = new AdminStarsBalanceService({
      enabled: true,
      call,
    } as never);
    await expect(service.get()).resolves.toMatchObject({
      status: 'ready',
      amount: 27,
      nanostarAmount: 4,
    });
    expect(call).toHaveBeenCalledWith('getMyStarBalance', {});
  });

  it('does not leak a Telegram failure or mislabel it as zero balance', async () => {
    const service = new AdminStarsBalanceService({
      enabled: true,
      call: jest.fn().mockRejectedValue(new Error('upstream error')),
    } as never);
    await expect(service.get()).resolves.toEqual({
      status: 'unavailable',
      amount: null,
      nanostarAmount: null,
      fetchedAt: null,
    });
  });
});
