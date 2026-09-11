/**
 * 무료(비구독) 유저가 어디까지 쓸 수 있는가.
 *
 * 원칙: **에너지를 쓰는 기능은 무료로 연다.** 에너지가 이미 하루치 제한이라
 * 거기에 구독 잠금까지 겹치면 무료 유저는 앱을 아예 못 쓴다.
 * 에너지를 안 쓰는 기능(문법 설명·표현·듣기·토픽·AI 튜터)은 원가가 나가거나
 * 무제한이라 구독으로 막는다.
 *
 * 예외: 단어카드 · 게임 · 한글 · 발음. 에너지를 안 쓰지만 무료로 푼다.
 * 신규 유저가 처음 손대는 곳이고, 여기서 막으면 앱을 켤 이유가 없어진다.
 *
 * ⚠️ 이 파일은 순수 함수만 둔다 (테스트 가능해야 함).
 * 화면에서 쓰는 건 useFeatureAccess.
 */

export type Feature =
  // 에너지 소모 → 무료
  | "lesson"
  // 에너지 없지만 무료로 푸는 것
  | "words"
  | "games"
  | "hangul"
  | "pronunciation"
  // 구독 전용
  | "grammar"
  | "expression"
  | "listening"
  | "topik"
  | "tutor";

/** 구독 없이 쓸 수 있는 기능 */
export const FREE_FEATURES: readonly Feature[] = [
  "lesson",
  "words",
  "games",
  "hangul",
  "pronunciation",
] as const;

/** 구독이 필요한 기능 */
export const PREMIUM_FEATURES: readonly Feature[] = [
  "grammar",
  "expression",
  "listening",
  "topik",
  "tutor",
] as const;

/**
 * 잠긴 기능이라도 "맛보기"가 서버에서 열려 있는 것.
 * 튜터는 무료 등급에도 하루 2분이 열려 있다 (apps/api/.../tutor.const.ts).
 * 아예 못 들어가게 막으면 팔 기회를 스스로 버리는 셈이라, 모달에서
 * 맛보기로 들어갈 길을 남긴다.
 */
export const TASTER_FEATURES: readonly Feature[] = ["tutor"] as const;

export function isFreeFeature(feature: Feature): boolean {
  return FREE_FEATURES.includes(feature);
}

export function hasTaster(feature: Feature): boolean {
  return TASTER_FEATURES.includes(feature);
}

/**
 * 지금 이 계정이 프리미엄인가 — **로컬에서 동기로** 판단한다.
 *
 * 서버(GET /payments/subscriptions/me)가 진실이지만, 게이트는 버튼을 누르는
 * 순간 답이 나와야 해서 네트워크를 기다릴 수 없다. 그래서 store 에 있는
 * isSuper 를 쓰되 **만료일도 같이 본다** — 체험이 앱을 켜둔 채로 끝나거나
 * 오프라인이면 store 의 isSuper 는 true 로 남아 있기 때문이다.
 * (서버는 어차피 별도로 막으므로 여기서 틀려도 결제가 새지는 않는다)
 */
export function isPremiumNow(
  user: { isSuper?: boolean; superExpiresAt?: string | null } | null | undefined,
  now: number = Date.now(),
): boolean {
  if (!user?.isSuper) return false;
  if (!user.superExpiresAt) return true; // 만료일 없으면 무기한
  const at = new Date(user.superExpiresAt).getTime();
  if (Number.isNaN(at)) return true; // 값이 깨졌으면 막지 않는다 (유료 유저를 잠그는 쪽이 더 나쁘다)
  return at > now;
}

/** 이 기능을 지금 쓸 수 있는가 */
export function canUseFeature(
  user: { isSuper?: boolean; superExpiresAt?: string | null } | null | undefined,
  feature: Feature,
  now: number = Date.now(),
): boolean {
  if (isFreeFeature(feature)) return true;
  return isPremiumNow(user, now);
}

/**
 * 학습 모드 → 기능 키.
 *
 * 홈의 "이어서 학습하기" 는 계정에 저장된 learnMode 로 곧장 간다.
 * 체험이 끝난 계정은 그 값이 topik/grammar 로 남아 있을 수 있어서,
 * 버튼 단계에서 같은 게이트를 태우려면 이 변환이 필요하다.
 */
export function featureOfLearnMode(mode: string | undefined): Feature {
  switch (mode) {
    case "grammar":
      return "grammar";
    case "expression":
    case "speaking":
      return "expression";
    case "listening":
      return "listening";
    case "topik":
      return "topik";
    case "conversation":
      return "tutor";
    // vocabulary · grammarPractice 는 레슨(에너지)으로 간다
    default:
      return "lesson";
  }
}
