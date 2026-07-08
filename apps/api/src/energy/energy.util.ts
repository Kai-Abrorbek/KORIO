import { ENERGY_CONFIG } from './energy.constants';

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
