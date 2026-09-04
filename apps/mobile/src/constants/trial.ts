/**
 * 무료 체험 일수.
 *
 * ⚠️ apps/api/src/users/super.util.ts 의 TRIAL_DAYS 와 반드시 같아야 한다.
 * 실제 만료일은 서버가 정한다 — 여기 값은 화면에 쓰는 문구용이다.
 */
export const TRIAL_DAYS = 30;

/**
 * 체험 종료 며칠 전에 푸시를 보내는지. 큰 것부터.
 *
 * ⚠️ 아직 FCM 이 없어서 실제로 발송되지 않는다 — 요금제 화면 타임라인이
 * 이 값으로 "언제 알려주는지" 를 약속하고 있으므로, 푸시를 붙일 때
 * 서버 스케줄러도 반드시 이 일정과 맞춰야 한다.
 */
export const TRIAL_REMINDER_DAYS = [3, 1] as const;

/** 첫 알림이 가는 시점 (타임라인에서 "N일차" 로 표시) */
export const TRIAL_REMINDER_BEFORE_DAYS = TRIAL_REMINDER_DAYS[0];
