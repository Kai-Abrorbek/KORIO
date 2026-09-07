import {
  COMBO_BONUS_COOLDOWN_SEC,
  COMBO_BONUS_DAILY_LIMIT,
  COMBO_BONUS_MAX,
  COMBO_BONUS_THRESHOLD,
  ENERGY_CONFIG,
} from './energy.constants';

export interface EnergyState {
  energy: number;
  energyUpdatedAt: Date;
}

/**
 * 마지막 갱신 이후 흐른 시간만큼 에너지 회복량 계산 (lazy).
 * MAX 도달하면 멈춤. 반환: 갱신된 energy + 새 기준시각 + 다음 1개까지 남은 초.
 */
export function computeEnergy(
  state: EnergyState,
  isSuper: boolean,
  now = new Date(),
) {
  const { MAX, REGEN_MINUTES } = ENERGY_CONFIG;

  // 슈퍼면 항상 MAX (무제한 취급)
  if (isSuper) {
    return {
      energy: MAX,
      energyUpdatedAt: now,
      secondsToNext: 0,
      isFull: true,
    };
  }

  let energy = state.energy;
  const last = new Date(state.energyUpdatedAt).getTime();
  const elapsedMs = now.getTime() - last;
  const regenMs = REGEN_MINUTES * 60 * 1000;

  if (energy >= MAX) {
    // 이미 꽉참 — 기준시각만 now로
    return {
      energy: MAX,
      energyUpdatedAt: now,
      secondsToNext: 0,
      isFull: true,
    };
  }

  const gained = Math.floor(elapsedMs / regenMs);
  let newUpdatedAt: Date;

  if (gained > 0) {
    energy = Math.min(MAX, energy + gained);
    // 회복하고 남은 시간은 다음 주기로 이월 (기준시각 = last + gained*regen)
    newUpdatedAt = new Date(last + gained * regenMs);
  } else {
    newUpdatedAt = new Date(last);
  }

  // 다음 1개까지 남은 초
  let secondsToNext = 0;
  if (energy < MAX) {
    const sinceBase = now.getTime() - newUpdatedAt.getTime();
    secondsToNext = Math.max(0, Math.ceil((regenMs - sinceBase) / 1000));
  }

  return {
    energy,
    energyUpdatedAt: newUpdatedAt,
    secondsToNext,
    isFull: energy >= MAX,
  };
}

/** MAX까지 꽉 차는 데 남은 총 시간(분) — "3시간 13분" 표시용 */
export function minutesToFull(
  energy: number,
  secondsToNext: number,
  isSuper: boolean,
): number {
  const { MAX, REGEN_MINUTES } = ENERGY_CONFIG;
  if (isSuper || energy >= MAX) return 0;
  const remainingUnits = MAX - energy;
  // 다음 1개는 secondsToNext, 나머지는 REGEN_MINUTES씩
  return Math.ceil(secondsToNext / 60) + (remainingUnits - 1) * REGEN_MINUTES;
}

// ─────────────────────────── 콤보 보너스 ───────────────────────────

/** 배열에서 오늘(유저 시간대 기준 자정 이후) 것만 고른다 */
export function claimsSince(dates: (Date | string)[] | undefined, from: Date): Date[] {
  return (dates ?? [])
    .map((d) => new Date(d))
    .filter((d) => d.getTime() >= from.getTime());
}

export type ComboBonusDeny =
  | 'SUPER'
  | 'FULL'
  | 'ENOUGH_ENERGY'
  | 'COOLDOWN'
  | 'DAILY_LIMIT';

export interface ComboBonusDecision {
  granted: number;
  reason?: ComboBonusDeny;
}

/**
 * 콤보 보너스로 몇 개를 줄지 정한다.
 *
 * ⚠️ "정말 4연속 맞혔는지" 는 여기서 확인하지 못한다. 채점이 앱에 있어서
 *    서버는 요청이 왔다는 것밖에 모른다. 그래서 대신 **간격과 횟수**로 막는다.
 *    앱을 믿고 그냥 주면, 이 엔드포인트를 반복 호출하는 것만으로 에너지를
 *    계속 채울 수 있다 (임계값 15 아래로만 내려가면 다시 받을 수 있으므로
 *    사실상 무제한이 된다).
 *
 * 순수 함수다 — DB 없이 규칙만 검사할 수 있게.
 */
export function decideComboBonus(input: {
  energy: number;
  isSuper: boolean;
  /** 오늘 이미 받은 시각들 */
  claimsToday: (Date | string)[];
  now: Date;
}): ComboBonusDecision {
  const { energy, isSuper, now } = input;
  const { MAX } = ENERGY_CONFIG;

  if (isSuper) return { granted: 0, reason: 'SUPER' };
  if (energy >= MAX) return { granted: 0, reason: 'FULL' };
  // 넉넉하면 안 준다. 이 선이 없으면 보너스만으로 계속 꽉 채울 수 있다
  if (energy > COMBO_BONUS_THRESHOLD) {
    return { granted: 0, reason: 'ENOUGH_ENERGY' };
  }

  const claims = input.claimsToday.map((d) => new Date(d).getTime());
  if (claims.length >= COMBO_BONUS_DAILY_LIMIT) {
    return { granted: 0, reason: 'DAILY_LIMIT' };
  }

  const last = claims.length ? Math.max(...claims) : 0;
  if (last && now.getTime() - last < COMBO_BONUS_COOLDOWN_SEC * 1000) {
    return { granted: 0, reason: 'COOLDOWN' };
  }

  // 바닥일수록 많이 준다 — 여기서 끊기면 유저가 그냥 앱을 닫는다
  const base = energy <= 5 ? COMBO_BONUS_MAX : energy <= 10 ? 6 : 4;
  return { granted: Math.min(base, MAX - energy) };
}
