import { Types } from 'mongoose';
jest.mock('../admin/rewards/admin-reward-grant.schema', () => ({
  AdminRewardGrant: class AdminRewardGrant {},
}));
import type { Model } from 'mongoose';
import type { AdminRewardGrantDocument } from '../admin/rewards/admin-reward-grant.schema';
import { RewardInboxService } from './reward-inbox.service';

describe('RewardInboxService', () => {
  const userId = new Types.ObjectId().toString();
  const grantId = new Types.ObjectId().toString();
  const find = jest.fn();
  const updateOne = jest.fn();
  const exists = jest.fn();
  const service = new RewardInboxService({
    find,
    updateOne,
    exists,
  } as unknown as Model<AdminRewardGrantDocument>);

  beforeEach(() => jest.clearAllMocks());

  it('returns only applied, unacknowledged grants without private admin details', async () => {
    find.mockReturnValue({
      sort: () => ({
        limit: () => ({
          select: () => ({
            lean: jest.fn().mockResolvedValue([
              {
                _id: grantId,
                kind: 'gems',
                amount: 50,
                appliedAt: new Date('2026-10-08T00:00:00Z'),
                reason: 'internal',
                adminEmail: 'private@example.test',
              },
            ]),
          }),
        }),
      }),
    });
    const result = await service.pending(userId);
    expect(find).toHaveBeenCalledWith({
      userId: new Types.ObjectId(userId),
      status: 'applied',
      acknowledgedAt: null,
    });
    expect(result.items).toEqual([
      {
        id: grantId,
        kind: 'gems',
        amount: 50,
        appliedAt: new Date('2026-10-08T00:00:00Z'),
      },
    ]);
  });

  it('acknowledges only the signed-in user’s applied grant', async () => {
    updateOne.mockResolvedValue({ modifiedCount: 1 });
    expect(await service.acknowledge(userId, grantId)).toEqual({
      acknowledged: true,
    });
    const [filter, update] = updateOne.mock.calls[0] as [
      Record<string, unknown>,
      { $set: { acknowledgedAt: Date } },
    ];
    expect(filter).toEqual({
      _id: new Types.ObjectId(grantId),
      userId: new Types.ObjectId(userId),
      status: 'applied',
      acknowledgedAt: null,
    });
    expect(update.$set.acknowledgedAt).toBeInstanceOf(Date);
  });

  it('rejects malformed reward ids', async () => {
    await expect(service.acknowledge(userId, 'wrong')).rejects.toThrow(
      'INVALID_REWARD_ID',
    );
    expect(updateOne).not.toHaveBeenCalled();
  });

  it('treats the current user’s previously confirmed reward as acknowledged', async () => {
    updateOne.mockResolvedValue({ modifiedCount: 0 });
    exists.mockResolvedValue({ _id: grantId });
    expect(await service.acknowledge(userId, grantId)).toEqual({
      acknowledged: true,
    });
    expect(exists).toHaveBeenCalledWith({
      _id: new Types.ObjectId(grantId),
      userId: new Types.ObjectId(userId),
      status: 'applied',
      acknowledgedAt: { $ne: null },
    });
  });
});
