import { runtimeConfig } from '../app-settings/runtime-values';

/**
 * 보석 출금 숫자. 어드민 "앱 숫자 설정" 에서 바꾼다 (setting-catalog 의 GEM_PAYOUT.*).
 *
 * MIN_GEMS 는 지금 테스트용 100 이다. 실제 운영은 50,000 쯤으로 올려야 한다 —
 * 운영자가 한 건씩 손으로 송금하므로 너무 작은 요청은 수수료·수고가 더 크다.
 */
export const GEM_PAYOUT = runtimeConfig('GEM_PAYOUT', {
  MIN_GEMS: 100,
});

/** 보석 1개 = 1 so'm (상점에 그렇게 적혀 있다) */
export const SOM_PER_GEM = 1;

export const PAYOUT_BRANDS = ['uzcard', 'humo', 'visa', 'mastercard'] as const;
export type PayoutBrand = (typeof PAYOUT_BRANDS)[number];

/**
 * 상태.
 *   pending    — 접수. 유저가 취소할 수 있다 (보석 반환)
 *   processing — 운영자가 송금 중. 유저는 더 못 바꾼다
 *   completed  — 송금 완료 → 유저에게 알림
 *   rejected   — 반려 → 보석 반환 + 알림
 *   cancelled  — 유저가 취소 → 보석 반환
 */
export const PAYOUT_STATUSES = [
  'pending',
  'processing',
  'completed',
  'rejected',
  'cancelled',
] as const;
export type PayoutStatus = (typeof PAYOUT_STATUSES)[number];

/** 운영자가 바꿀 수 있는 길 (끝난 건은 다시 못 연다) */
export const ADMIN_TRANSITIONS: Record<
  'processing' | 'completed' | 'rejected',
  PayoutStatus[]
> = {
  processing: ['pending'],
  completed: ['pending', 'processing'],
  rejected: ['pending', 'processing'],
};

/** 반려 사유 — 앱이 이 코드로 문구를 고른다 */
export const PAYOUT_REJECT_REASONS = [
  'invalid_card',
  'name_mismatch',
  'suspicious',
  'other',
] as const;
export type PayoutRejectReason = (typeof PAYOUT_REJECT_REASONS)[number];
