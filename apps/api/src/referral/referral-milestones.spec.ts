import { Types } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('./schemas/referral.schema', () => ({ Referral: class Referral {} }));
jest.mock('../notifications/notifications.service', () => ({
  NotificationsService: class NotificationsService {},
}));
jest.mock('../push/push.service', () => ({
  PushService: class PushService {},
}));
jest.mock('../payments/gems/gem-pass.service', () => ({
  GemPassService: class GemPassService {},
}));

import { REFERRAL_MILESTONES } from './referral.constants';
import { ReferralService } from './referral.service';

/** 초대 누적 단계 — 보석과 함께 SUPER 이용권이 한 번씩 나간다 (10명 7일 · 25명 30일 · 50명 60일) */
describe('ReferralService milestones', () => {
  const inviterId = new Types.ObjectId();

  function build(total: number, alreadyPaid: number[] = []) {
    const paid = new Set(alreadyPaid);
    const refModel = { countDocuments: jest.fn().mockResolvedValue(total) };
    const userModel = {
      findOneAndUpdate: jest.fn(
        (filter: { referralMilestonesPaid: { $ne: number } }) => {
          const count = filter.referralMilestonesPaid.$ne;
          if (paid.has(count)) return Promise.resolve(null);
          paid.add(count);
          return Promise.resolve({ _id: inviterId });
        },
      ),
    };
    const gemLedger = { record: jest.fn().mockResolvedValue(undefined) };
    const gemPass = { grantRewardDays: jest.fn().mockResolvedValue(true) };
    const service = new ReferralService(
      refModel as never,
      userModel as never,
      {} as never,
      {} as never,
      gemLedger as never,
      gemPass as never,
    );
    const internal = service as unknown as {
      payMilestones: (id: Types.ObjectId) => Promise<number>;
    };
    const payMilestones = (id: Types.ObjectId): Promise<number> =>
      internal.payMilestones(id);
    return { payMilestones, gemPass };
  }

  it('ships the agreed passes: 10 → 7 days, 25 → 30 days, 50 → 60 days', () => {
    expect(REFERRAL_MILESTONES.map((m) => [m.count, m.superDays])).toEqual([
      [3, 0],
      [10, 7],
      [25, 30],
      [50, 60],
    ]);
  });

  it('grants the SUPER pass together with the gems when a step is reached', async () => {
    const { payMilestones, gemPass } = build(10);
    await expect(payMilestones(inviterId)).resolves.toBe(1000 + 3000);
    expect(gemPass.grantRewardDays).toHaveBeenCalledTimes(1);
    expect(gemPass.grantRewardDays).toHaveBeenCalledWith(
      inviterId.toString(),
      7,
      'referral10',
    );
  });

  it('does not grant a pass again for a step already paid', async () => {
    const { payMilestones, gemPass } = build(25, [3, 10]);
    await payMilestones(inviterId);
    expect(gemPass.grantRewardDays).toHaveBeenCalledTimes(1);
    expect(gemPass.grantRewardDays).toHaveBeenCalledWith(
      inviterId.toString(),
      30,
      'referral25',
    );
  });

  it('keeps the gems even if the pass grant fails', async () => {
    const { payMilestones, gemPass } = build(50, [3, 10, 25]);
    gemPass.grantRewardDays.mockRejectedValueOnce(new Error('db down'));
    await expect(payMilestones(inviterId)).resolves.toBe(20000);
  });
});
