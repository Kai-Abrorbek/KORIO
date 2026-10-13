import { gemPassDayPrice } from '../payments/gems/gem-pass.const';
import { isSuperActive } from '../users/super.util';

export interface CheckinReward {
  gems: number;
  superDays: number;
  /** SUPER 일수 대신 보석으로 바꿔 줬다 (이미 프리미엄이라서) */
  swapped: boolean;
}

/**
 * 출석 보상을 이 유저에게 맞춘다 — 7일째 "SUPER 하루" 는 이미 프리미엄(30일
 * 체험 포함)인 사람에게 **그 하루를 살 수 있는 만큼의 보석**으로 바꿔 준다.
 *
 * 왜: 30일 체험은 구독 행 없이 user 에만 붙어 있다. 체험 중에 SUPER 하루를
 * 구독 행으로 붙이면 syncUser 가 그 하루로 user 를 덮어써서, 하루가 끝날 때
 * 남은 체험까지 같이 끝나 버렸다. 그리고 이미 SUPER 인 사람에게 하루는 체감이
 * 0 이다 — 보석이 낫다.
 */
export function checkinRewardFor(
  user: { isSuper?: boolean; superExpiresAt?: Date | null },
  base: { gems?: number; superDays?: number },
  dayPrice = gemPassDayPrice(),
): CheckinReward {
  const gems = Math.max(0, base.gems ?? 0);
  const superDays = Math.max(0, Math.floor(base.superDays ?? 0));
  if (superDays > 0 && isSuperActive(user)) {
    return { gems: gems + superDays * dayPrice, superDays: 0, swapped: true };
  }
  return { gems, superDays, swapped: false };
}
