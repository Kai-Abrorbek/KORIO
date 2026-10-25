const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/**
 * 앱 평가 모달. 앱이 홈에서 "띄울까?" 를 물으면 서버가 정한다 (AppReviewService.promptFor).
 *
 *  - 평가는 7일에 한 번. 하고 나면 7일 동안 안 뜬다 (마지막 평가 시각 기준)
 *  - "하루 동안 보지 않기" → 24시간 동안 안 뜬다
 *  - "닫기" → 다음에 앱을 열면 다시 뜬다 (같은 실행 동안 안 띄우는 건 앱이 한다).
 *    단 하루에 MAX_CLOSES_PER_DAY 번 닫으면 그날은 더 안 띄운다 — 매번 열 때마다 뜨면 괴롭다
 *  - 가입하고 MIN_ACCOUNT_AGE 가 안 지났으면 안 뜬다 — 써 보기도 전에 묻지 않는다
 */
export const APP_REVIEW = {
  REWARD_GEMS: 500,
  COOLDOWN_MS: 7 * DAY_MS,
  SNOOZE_MS: DAY_MS,
  MAX_CLOSES_PER_DAY: 3,
  MIN_ACCOUNT_AGE_MS: 2 * DAY_MS,
  COMMENT_MAX: 1000,
} as const;

export const APP_REVIEW_PLATFORMS = [
  'ios',
  'android',
  'telegram',
  'web',
] as const;
export type AppReviewPlatform = (typeof APP_REVIEW_PLATFORMS)[number];

export const APP_REVIEW_DISMISS_MODES = ['close', 'snooze'] as const;
export type AppReviewDismissMode = (typeof APP_REVIEW_DISMISS_MODES)[number];

/** 안 띄우는 이유 — 앱은 show 만 보지만 로그·테스트에서 읽기 쉽게 */
export type AppReviewSkipReason =
  | 'too_new'
  | 'reviewed'
  | 'snoozed'
  | 'closed_today';
