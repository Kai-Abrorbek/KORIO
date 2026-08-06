export const TRIAL_DAYS = 7;

// 신규 가입자에게 붙일 체험 필드
export function trialFields() {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + TRIAL_DAYS);
  return {
    isSuper: true,
    superPlan: 'trial',
    superExpiresAt: expiresAt,
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
  return ms <= 0 ? 0 : Math.ceil(ms / 86400000);
}
