// 무료 체험 일수.
// apps/mobile/src/constants/trial.ts 의 TRIAL_DAYS 와 반드시 같아야 한다.
export const TRIAL_DAYS = 30;

// 신규 가입자에게 붙일 체험 필드
export function trialFields() {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + TRIAL_DAYS);
  return {
    isSuper: true,
    superPlan: 'trial',
    superExpiresAt: expiresAt,
    // "이 계정은 체험을 써봤다" 를 영구히 남긴다.
    // 예전엔 superPlan==='trial' 로 그걸 판단했는데, 만료 뒤에도 그 값을
    // 지우지 못해 (지우면 체험을 또 권하게 되므로) 만료된 계정이 계속
    // 체험 중으로 보였다. 판단 근거를 따로 떼어내야 만료 처리가 깨끗해진다.
    trialStartedAt: new Date(),
  };
}

// 지금 실제로 SUPER인지 (만료 포함해서 판단)
// ⚠️ 앞으로 user.isSuper를 직접 읽지 말고 무조건 이 함수를 거칠 것
export function isSuperActive(user: {
  isSuper?: boolean;
  superExpiresAt?: Date | null;
}): boolean {
  if (!user?.isSuper) return false;
  if (!user.superExpiresAt) return true; // 만료일 없으면 무기한
  return new Date(user.superExpiresAt).getTime() > Date.now();
}

// 기간이 지났는데 isSuper 가 아직 true 로 남아있는 상태인지.
// 이 상태면 DB 만 보고는 슈퍼처럼 보여서(수동으로 isSuper 를 켜도 안 먹는 등)
// 헷갈리므로 발견하는 즉시 내려준다.
export function isSuperStale(user: {
  isSuper?: boolean;
  superExpiresAt?: Date | null;
}): boolean {
  return !!user?.isSuper && !isSuperActive(user);
}

// 체험 남은 일수 (체험 아니면 null)
export function trialDaysLeft(user: {
  superPlan?: string | null;
  superExpiresAt?: Date | null;
}): number | null {
  if (user?.superPlan !== 'trial' || !user.superExpiresAt) return null;
  const ms = new Date(user.superExpiresAt).getTime() - Date.now();
  // 끝난 체험은 0 이 아니라 null 이다. 0 을 주면 "오늘 끝나요" 와
  // "이미 끝났어요" 가 같은 값이 되어 화면이 구분을 못 한다.
  return ms <= 0 ? null : Math.ceil(ms / 86400000);
}

/**
 * 기간이 끝난 구독/체험을 내릴 때 쓰는 $set 한 벌.
 *
 * 예전엔 isSuper 만 내리고 superPlan/superExpiresAt 은 그대로 뒀다.
 * 그래서 만료된 계정이 DB 상으로는 계속 'trial' 이었고, 그걸 보고
 * 판단하는 화면들이 만료 뒤에도 체험 중처럼 굴었다.
 * 체험을 써봤다는 사실은 trialStartedAt 이 따로 들고 있으므로
 * 여기서 전부 비워도 정보가 사라지지 않는다.
 */
export function expiredSuperFields() {
  return {
    isSuper: false,
    superTier: 'super',
    superPlan: null,
    superExpiresAt: null,
  };
}
