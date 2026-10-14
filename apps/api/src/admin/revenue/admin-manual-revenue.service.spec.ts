import { BadRequestException, ConflictException } from '@nestjs/common';
import { Types } from 'mongoose';
import { AdminManualRevenueService } from './admin-manual-revenue.service';

const admin = {
  userId: new Types.ObjectId().toString(),
  email: 'admin@example.test',
  role: 'super_admin' as const,
};

const input = {
  requestId: 'c919f5ba-7ed5-4816-bf2c-f340da18d56e',
  kind: 'telegram_card_revenue' as const,
  date: '2026-10-08',
  currency: 'UZS',
  amountMinor: 149000,
  category: '예외 카드 입금',
  reference: 'receipt-42',
  note: '',
  reason: '시스템 외 입금 확인',
};

function row() {
  return {
    ...input,
    _id: new Types.ObjectId(),
    referenceKey: input.reference.toLowerCase(),
    createdAt: new Date('2026-10-08T08:00:00Z'),
    createdBy: new Types.ObjectId(admin.userId),
    createdByEmail: admin.email,
    voidedAt: null,
    voidReason: '',
  };
}

describe('AdminManualRevenueService', () => {
  it('records an exception with an audit trail and replays the same request', async () => {
    let stored: ReturnType<typeof row> | null = null;
    const entries = {
      findOne: jest.fn().mockImplementation(() => Promise.resolve(stored)),
      create: jest.fn().mockImplementation(() => {
        stored = row();
        return Promise.resolve(stored);
      }),
    };
    const cardOrders = { exists: jest.fn().mockResolvedValue(null) };
    const audit = { record: jest.fn().mockResolvedValue(undefined) };
    const service = new AdminManualRevenueService(
      entries as never,
      cardOrders as never,
      audit as never,
    );

    await expect(service.create(input, admin)).resolves.toMatchObject({
      duplicate: false,
      amountMinor: 149000,
    });
    await expect(service.create(input, admin)).resolves.toMatchObject({
      duplicate: true,
    });
    expect(entries.create).toHaveBeenCalledTimes(1);
    expect(audit.record).toHaveBeenCalledTimes(1);
  });

  it('rejects manual card entries for a tracked order', async () => {
    const service = new AdminManualRevenueService(
      { findOne: jest.fn().mockResolvedValue(null) } as never,
      { exists: jest.fn().mockResolvedValue({ _id: 'present' }) } as never,
      {} as never,
    );
    await expect(
      service.create(
        { ...input, reference: new Types.ObjectId().toString() },
        admin,
      ),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('requires UZS for card transfer exceptions', async () => {
    const service = new AdminManualRevenueService(
      {} as never,
      {} as never,
      {} as never,
    );
    await expect(
      service.create({ ...input, currency: 'KRW' }, admin),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('excludes voided entries from monthly totals without erasing history', async () => {
    const entries = {
      find: jest.fn(() => ({
        sort: jest.fn(() => ({
          skip: jest.fn(() => ({
            limit: jest.fn(() => ({
              lean: jest.fn().mockResolvedValue([row()]),
            })),
          })),
        })),
      })),
      countDocuments: jest.fn().mockResolvedValue(1),
      aggregate: jest
        .fn()
        .mockResolvedValue([
          { _id: { currency: 'UZS', kind: 'expense' }, amountMinor: 5000 },
        ]),
    };
    const service = new AdminManualRevenueService(
      entries as never,
      {} as never,
      {} as never,
    );
    const result = await service.list({ from: '2026-10-01', to: '2026-10-31' });
    expect(result.total).toBe(1);
    expect(result.totalsByCurrency).toEqual([
      { currency: 'UZS', expenseMinor: 5000, telegramCardRevenueMinor: 0 },
    ]);
    expect(entries.aggregate).toHaveBeenCalledWith([
      {
        $match: {
          date: { $gte: '2026-10-01', $lte: '2026-10-31' },
          voidedAt: null,
        },
      },
      {
        $group: {
          _id: { currency: '$currency', kind: '$kind' },
          amountMinor: { $sum: '$amountMinor' },
        },
      },
    ]);
  });
});
