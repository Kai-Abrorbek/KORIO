import {
  PAID_SUBSCRIPTION_PROVIDERS,
  paidEntitlementMatch,
  paidEventMatch,
} from './paid-subscription.filter';

describe('admin paid Premium filters', () => {
  it('only allows payment providers, not gem passes or unknown sources', () => {
    expect(PAID_SUBSCRIPTION_PROVIDERS).toContain('google_play');
    expect(PAID_SUBSCRIPTION_PROVIDERS).toContain('telegram_stars');
    expect(PAID_SUBSCRIPTION_PROVIDERS).toContain('card_transfer');
    expect(PAID_SUBSCRIPTION_PROVIDERS).not.toContain('gems');
    expect(PAID_SUBSCRIPTION_PROVIDERS).not.toContain('unknown');
  });

  it('counts only current, non-revoked paid entitlements', () => {
    const now = new Date('2026-10-13T00:00:00.000Z');
    expect(paidEntitlementMatch(now)).toEqual({
      provider: { $in: [...PAID_SUBSCRIPTION_PROVIDERS] },
      status: { $in: ['active', 'cancelled', 'grace_period'] },
      expiresAt: { $gt: now },
      revokedAt: null,
    });
  });

  it('keeps reward and gem-pass events out of paid acquisition and churn', () => {
    const from = new Date('2026-10-01T00:00:00.000Z');
    const to = new Date('2026-10-13T00:00:00.000Z');
    expect(paidEventMatch(from, to)).toEqual({
      at: { $gte: from, $lte: to },
      provider: { $in: [...PAID_SUBSCRIPTION_PROVIDERS] },
    });
  });
});
