/**
 * 에너지 기본값 — **폴백 전용**.
 *
 * 진짜 값은 서버(apps/api/src/energy/energy.constants.ts ENERGY_CONFIG)가 정하고
 * GET /energy 응답(maxEnergy, freeAmount)으로 내려준다. 응답이 오기 전이나
 * 응답을 못 받는 화면(에너지 부족 모달 등)에서만 이 값을 쓴다.
 * 서버 값을 바꾸면 여기도 같이 바꾼다.
 */
export const ENERGY_MAX = 50;
/** 하루 3회 무료 충전 한 번에 받는 양 */
export const ENERGY_FREE_AMOUNT = 10;
