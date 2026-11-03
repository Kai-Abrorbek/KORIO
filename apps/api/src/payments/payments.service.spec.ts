import { ConflictException } from '@nestjs/common';

// The real modules pull in every Mongoose schema; the decision under test only
// needs their shapes.
jest.mock('./providers/google-play/google-play.provider', () => ({
  GooglePlayProvider: class {},
}));
jest.mock('./subscriptions/subscription.service', () => ({
  SubscriptionService: class {},
}));

import { PaymentsService } from './payments.service';

const verified = {
  provider: 'google_play',
  externalTransactionId: 'token-b',
  externalSubscriptionId: 'token-a',
  status: 'active',
};

function setup(owner: string | null) {
  const googlePlay = {
    id: 'google_play',
    verifyPurchase: jest.fn().mockResolvedValue(verified),
  };
  const subscriptions = {
    purchaseOwner: jest.fn().mockResolvedValue(owner),
    supersede: jest.fn().mockResolvedValue(undefined),
    applyVerifiedPurchase: jest.fn().mockResolvedValue({ tier: 'max' }),
    getMySubscription: jest.fn().mockResolvedValue({ tier: 'max' }),
  };
  const service = new PaymentsService(
    googlePlay as never,
    subscriptions as never,
  );
  return { service, subscriptions };
}

describe('PaymentsService purchase ownership', () => {
  it('refuses to move a purchase another account already owns', async () => {
    const { service, subscriptions } = setup('owner-account');
    await expect(
      service.verifyAndApply('google_play', 'someone-else', 'token-b'),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(subscriptions.applyVerifiedPurchase).not.toHaveBeenCalled();
    expect(subscriptions.supersede).not.toHaveBeenCalled();
  });

  it("applies a purchase that is new or already this account's", async () => {
    for (const owner of [null, 'buyer']) {
      const { service, subscriptions } = setup(owner);
      await service.verifyAndApply('google_play', 'buyer', 'token-b');
      expect(subscriptions.applyVerifiedPurchase).toHaveBeenCalledWith(
        'buyer',
        verified,
      );
    }
  });

  it('keeps restoring the rest when one item belongs to someone else', async () => {
    const { service, subscriptions } = setup('owner-account');
    const result = await service.restore('google_play', 'someone-else', [
      { purchaseToken: 'token-b' },
    ]);
    expect(result.restored).toBe(0);
    expect(subscriptions.getMySubscription).toHaveBeenCalledWith(
      'someone-else',
    );
  });
});
