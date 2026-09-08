/**
 * 온라인 표시 (인스타 스타일).
 *
 * 실시간 소켓을 붙이지 않고 lastActiveAt 하나로 판단한다. 앱이 켜져 있는
 * 동안 주기적으로 찍고, 그 시각이 창(window) 안이면 온라인으로 본다.
 * 소켓을 쓰면 정확하지만 연결 수만큼 서버 비용이 붙고, 학습 앱에서
 * "지금 접속 중" 은 몇 분 오차가 있어도 아무도 손해 보지 않는다.
 *
 * ⚠️ 창(5분)은 앱의 하트비트 주기(3분)보다 넉넉히 커야 한다.
 * 같거나 작으면 핑 사이에 잠깐씩 오프라인으로 깜빡인다.
 * apps/mobile/src/hooks/usePresenceHeartbeat.ts 의 주기와 같이 봐야 한다.
 */
export const ONLINE_WINDOW_MS = 5 * 60 * 1000;

/** 최근 활동 시각이 창 안인가 */
export function isOnlineNow(
  lastActiveAt?: Date | string | null,
  now: number = Date.now(),
): boolean {
  if (!lastActiveAt) return false;
  const at = new Date(lastActiveAt).getTime();
  if (Number.isNaN(at)) return false;
  // 기기 시계가 앞서 있으면 미래 시각이 들어온다. 온라인으로 본다
  // (막을 이유가 없고, 막으면 그 유저만 영영 오프라인으로 보인다)
  return now - at < ONLINE_WINDOW_MS;
}

/**
 * 목록·프로필 응답에 붙일 접속 정보 한 벌.
 *
 * lastActiveAt 을 그대로 내려준다 — 앱이 "3분 전" 같은 상대 시각을
 * 그리려면 필요하고, 이건 이미 서로 팔로우로 보이는 사람들 사이의
 * 정보라 새로 노출되는 게 아니다.
 */
export function presenceOf(
  lastActiveAt?: Date | string | null,
  now: number = Date.now(),
) {
  return {
    isOnline: isOnlineNow(lastActiveAt, now),
    lastActiveAt: lastActiveAt ? new Date(lastActiveAt).toISOString() : null,
  };
}

/**
 * 관계가 있을 때만 접속 정보를 준다.
 *
 * 인스타도 아무한테나 초록 점을 보여주지 않는다. 검색·추천으로 나온
 * 모르는 사람의 "지금 접속 중" 은 알려줄 이유가 없고, 모아 보면 그 사람의
 * 생활 패턴이 된다. 서로 아는 사이(한쪽이라도 팔로우)일 때만 붙인다.
 */
export function presenceFor(
  rel: { isFollowing?: boolean; isFollowedBy?: boolean; isMe?: boolean },
  lastActiveAt?: Date | string | null,
  now: number = Date.now(),
) {
  const related = !!(rel.isFollowing || rel.isFollowedBy || rel.isMe);
  if (!related) return { isOnline: false, lastActiveAt: null };
  return presenceOf(lastActiveAt, now);
}
