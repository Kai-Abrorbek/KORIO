export const ENERGY_CONFIG = {
  // 최대 에너지. 출시 초기 이탈을 줄이려고 25 → 50 (2026-10-06).
  // 앱의 폴백 값(apps/mobile/src/constants/energy.ts)도 같이 바꾼다
  MAX: 50,
  REGEN_MINUTES: 60, // 1개 회복에 걸리는 시간(분)
  REFILL_GEM_COST: 350, // 충전하기 비용
  FREE_DAILY_LIMIT: 3, // 무료 +5 하루 횟수
  FREE_AMOUNT: 10, // 무료로 받는 양 (5 → 10, 2026-10-06)
} as const;

export const COMBO_BONUS_STREAK = 4; // 4연속 정답 (앱이 판단한다)
// 에너지가 이 값 이하일 때만 준다. MAX 25 시절 15(60%) 였던 비율을 그대로
// MAX 50 에 맞췄다 — 15 로 두면 50 중 15 까지 내려가야 받아서 거의 안 나온다
export const COMBO_BONUS_THRESHOLD = 30;
export const COMBO_BONUS_MAX = 8; // 최대 8까지

/**
 * 콤보 보너스를 서버가 막는 두 가지.
 *
 * 채점이 앱에 있어서 "정말 4연속 맞혔는지" 는 서버가 확인할 방법이 없다.
 * 그래서 대신 **얼마나 자주·몇 번** 받을 수 있는지를 서버가 정한다.
 * 이게 없으면 엔드포인트를 반복 호출하는 것만으로 에너지가 계속 차서
 * 에너지 시스템(=구독 압력)이 통째로 무력해진다.
 *
 * 쿨다운 40초: 4문제를 실제로 풀면 최소 그 정도는 걸린다. 정상 플레이는
 * 거의 안 걸리고, 자동 호출은 크게 느려진다.
 * 하루 12회: 레슨 12개분. 실제로 하루에 그만큼 하는 유저는 드물다.
 */
export const COMBO_BONUS_COOLDOWN_SEC = 40;
export const COMBO_BONUS_DAILY_LIMIT = 12;
