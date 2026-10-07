/**
 * 연속 정답 에너지 보너스 — **언제** 줄지 (얼마나 줄지·막을지는 서버 energy.util).
 *
 * 한 레슨(본풀이 ~17문제)에 2~3번, 기계적이지 않게.
 *  - "직전 보너스 뒤로 이어진 연속 정답"(run)이 문턱(need)에 닿으면 준다. 틀리면 run 0
 *  - 문턱은 매번 랜덤 — 첫 번째 3~4, 그다음 4~5. 언제 터질지 몰라야 기대가 생긴다
 *  - 직전 보너스 뒤로 최소 MIN_GAP 문제 — 연달아 터지면 싸구려처럼 보인다
 *  - 레슨당 최대 MAX_PER_LESSON 번
 *  - 끝이 가까운데(남은 문제 ≤ CATCH_UP_LEFT) 아직 1번 이하면 문턱을 3 으로 —
 *    잘 풀고 있는 사람이 운 나빠서 1번만 받는 일이 없게
 *
 * 시뮬레이션 (17문제, 2만 판):
 *   정답률 100% → 3번 / 90% → 2번 30%·3번 69% / 80% → 2번 57%·3번 31%
 *   70% → 2번 56% / 60% → 1~2번 / 50% → 0~1번
 *   → 잘 풀수록 많이 받는다. 보너스가 "실력 보상" 으로 느껴지게.
 *
 * 순수 함수 — 앱·텔레그램이 같은 규칙 (앱 apps/mobile/src/utils/combo-bonus.ts 와 같은 파일).
 */
export const COMBO_BONUS = {
  MAX_PER_LESSON: 3,
  FIRST_NEED: [3, 4] as const,
  NEXT_NEED: [4, 5] as const,
  MIN_GAP: 3,
  CATCH_UP_LEFT: 4,
  CATCH_UP_NEED: 3,
};

export interface ComboTracker {
  /** 이번 레슨에 준 횟수 */
  given: number;
  /** 직전 보너스 뒤로 이어진 연속 정답 */
  run: number;
  /** 직전 보너스 뒤로 푼 문제 수 */
  sinceLast: number;
  /** 다음 보너스 문턱 */
  need: number;
}

function pickNeed(given: number, rand: () => number): number {
  const [lo, hi] = given === 0 ? COMBO_BONUS.FIRST_NEED : COMBO_BONUS.NEXT_NEED;
  return lo + Math.floor(rand() * (hi - lo + 1));
}

export function newComboTracker(
  rand: () => number = Math.random,
): ComboTracker {
  return { given: 0, run: 0, sinceLast: 0, need: pickNeed(0, rand) };
}

/**
 * 본풀이 문제 하나에 답할 때마다 부른다.
 * remaining = 이 문제 뒤로 남은 본풀이 문제 수. fire 면 지금 보너스를 요청한다.
 */
export function stepComboTracker(
  t: ComboTracker,
  correct: boolean,
  remaining: number,
  rand: () => number = Math.random,
): { tracker: ComboTracker; fire: boolean } {
  const run = correct ? t.run + 1 : 0;
  const sinceLast = t.sinceLast + 1;
  if (t.given >= COMBO_BONUS.MAX_PER_LESSON) {
    return { tracker: { ...t, run, sinceLast }, fire: false };
  }
  const need =
    t.given < 2 && remaining <= COMBO_BONUS.CATCH_UP_LEFT
      ? Math.min(t.need, COMBO_BONUS.CATCH_UP_NEED)
      : t.need;
  if (correct && run >= need && sinceLast >= COMBO_BONUS.MIN_GAP) {
    return {
      tracker: {
        given: t.given + 1,
        run: 0,
        sinceLast: 0,
        need: pickNeed(t.given + 1, rand),
      },
      fire: true,
    };
  }
  return { tracker: { ...t, run, sinceLast }, fire: false };
}

/** 서버가 안 줬으면(간격·하루 한도) 이번 회차는 없던 걸로 — 다음 기회를 남긴다 */
export function refundComboTracker(t: ComboTracker): ComboTracker {
  return { ...t, given: Math.max(0, t.given - 1) };
}
