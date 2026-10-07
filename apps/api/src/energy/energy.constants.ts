/** 0 에서 가득까지 걸리는 시간 — 하루에 한 번 꽉 찬다 (2026-10-06) */
const FULL_REFILL_HOURS = 24;
// 최대 에너지. 출시 초기 이탈을 줄이려고 25 → 50 (2026-10-06).
// 앱의 폴백 값(apps/mobile/src/constants/energy.ts)도 같이 바꾼다
const MAX_ENERGY = 50;

export const ENERGY_CONFIG = {
  MAX: MAX_ENERGY,
  FULL_REFILL_HOURS,
  /**
   * 1개 회복에 걸리는 시간(분). MAX 와 FULL_REFILL_HOURS 에서 뽑는다 —
   * 50개면 28.8분. 소수여도 된다 (회복 계산은 ms 로 한다).
   * MAX 만 바꿔도 "하루에 가득" 은 그대로 유지된다.
   */
  REGEN_MINUTES: (FULL_REFILL_HOURS * 60) / MAX_ENERGY,
  REFILL_GEM_COST: 350, // 충전하기 비용
  FREE_DAILY_LIMIT: 3, // 무료 +5 하루 횟수
  FREE_AMOUNT: 10, // 무료로 받는 양 (5 → 10, 2026-10-06)
} as const;

/**
 * 연속 정답 보너스 (2026-10-07 개편).
 *
 * 예전엔 "에너지 30 이하일 때, 레슨당 1번, 4연속" 이라 넉넉한 유저는 거의 못 봤다.
 * 이제 에너지와 상관없이 연속으로 맞히면 준다 — **언제 줄지는 앱이** 정한다
 * (mobile utils/combo-bonus.ts: 레슨당 2~3번, 문턱 3~5 랜덤).
 *
 * 한 번에 주는 양은 적게: 레슨 하나가 에너지 ~17 을 쓰는데 3번 다 받아도
 * 6~12 라, 보너스만으로 에너지가 늘어나는 일은 없다 (구독 압력 유지).
 * 바닥일수록 조금 더 — 여기서 끊기면 유저가 그냥 앱을 닫는다.
 */
export const COMBO_BONUS_AMOUNT = [
  { maxEnergy: 10, amount: 4 },
  { maxEnergy: 25, amount: 3 },
  { maxEnergy: Infinity, amount: 2 },
] as const;

/**
 * 콤보 보너스를 서버가 막는 두 가지.
 *
 * 채점이 앱에 있어서 "정말 연속으로 맞혔는지" 는 서버가 확인할 방법이 없다.
 * 그래서 대신 **얼마나 자주·몇 번** 받을 수 있는지를 서버가 정한다.
 * 이게 없으면 엔드포인트를 반복 호출하는 것만으로 에너지가 계속 차서
 * 에너지 시스템(=구독 압력)이 통째로 무력해진다.
 *
 * 쿨다운 20초: 앱은 보너스 사이에 최소 3문제를 둔다 — 실제로 풀면 그 정도는 걸린다.
 * 하루 30회: 레슨 10개 × 3번. 자동 호출로 긁어도 하루 최대 30 × 4.
 */
export const COMBO_BONUS_COOLDOWN_SEC = 20;
export const COMBO_BONUS_DAILY_LIMIT = 30;
