import type { PaymentProviderId } from '../../payments/subscriptions/subscription.types';
import { ENTITLED_STATUSES } from '../../payments/subscriptions/subscription.types';

// An in-app gem pass (including quest, streak and admin rewards) grants access,
// but is not evidence of a payment. Unknown providers must not count as paid.
export const PAID_SUBSCRIPTION_PROVIDERS = [
  'google_play',
  'toss',
  'uzum',
  'click',
  'payme',
  'telegram_stars',
  'card_transfer',
] as const satisfies readonly PaymentProviderId[];

export function paidEntitlementMatch(now: Date) {
  return {
    provider: { $in: [...PAID_SUBSCRIPTION_PROVIDERS] },
    status: { $in: [...ENTITLED_STATUSES] },
    expiresAt: { $gt: now },
    revokedAt: null,
  };
}

export function paidEventMatch(from: Date, to: Date) {
  return {
    at: { $gte: from, $lte: to },
    provider: { $in: [...PAID_SUBSCRIPTION_PROVIDERS] },
  };
}
