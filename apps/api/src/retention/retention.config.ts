/**
 * 리텐션 장치의 숫자 — **여기만 바꾸면 된다.**
 *
 * 앱은 이 값을 하드코딩하지 않고 GET /retention/summary 응답으로 받아 그린다.
 * 서버만 다시 배포하면 앱 업데이트 없이 바뀐다.
 *
 * 보석 기준점 (비교용): 에너지 가득 충전 350, 연속 3일마다 상자 200
 * (STREAK_CHEST_GEMS), 급수 졸업 50.
 */

/** 스트릭 복구펜 — 연속이 끊길 날을 대신 메워준다 */
export const STREAK_FREEZE = {
  /** 상점 가격 (보석) */
  PRICE_GEMS: 200,
  /** 최대 보유 개수. 많이 쌓아두면 연속의 긴장감이 사라진다 */
  MAX_HOLD: 2,
  /** SUPER 는 주 1개씩 자동으로 받는다 (보유 상한까지) */
  SUPER_WEEKLY: 1,
  /** 메운 날 기록은 최근 이만큼만 남긴다 (배열이 끝없이 자라지 않게) */
  KEEP_FROZEN_DAYS: 60,
} as const;

/**
 * 일일 퀘스트 3개. 진행도는 따로 세지 않고 그날의 학습 통계(UserStats)에서
 * 읽는다 — 어떤 모드로 공부하든 자동으로 쌓인다.
 */
export const DAILY_QUESTS = {
  /** 오늘 XP 모으기 */
  XP_TARGET: 50,
  /** 오늘 정답 수 */
  CORRECT_TARGET: 20,
  /** 공부 시간(분) — 온보딩에서 고른 하루 목표(dailyGoalMinutes)를 쓴다 */
  MINUTES_DEFAULT: 10,
  MINUTES_MIN: 5,
  MINUTES_MAX: 30,
  /** 퀘스트 하나 보상 */
  QUEST_GEMS: 15,
  /** 세 개 다 끝내면 여는 상자 */
  CHEST_GEMS: 60,
} as const;

/** 에너지 0 일 때 — 틀린 문제 복습으로 에너지 벌기 */
export const ENERGY_EARN = {
  /** 정답 하나당 */
  PER_CORRECT: 1,
  /** 한 판 최대 */
  SESSION_MAX: 5,
  /** 하루 최대 — 이걸로 SUPER·충전을 대신할 수는 없게 */
  DAILY_MAX: 15,
} as const;

/** 복귀 보상 — 며칠 쉬다 돌아온 사람 */
export const COMEBACK = {
  /** 마지막 학습 후 이만큼 지나야 복귀로 본다 */
  IDLE_DAYS: 3,
  /** 한 번 받으면 이 기간 동안은 다시 안 준다 */
  COOLDOWN_DAYS: 14,
  /** XP 배수 부스트 시간(분) */
  BOOST_MINUTES: 15,
  XP_MULTIPLIER: 2,
} as const;

/**
 * 첫 7일 출석 — 하루 한 번 출석 체크, 7번 받으면 끝.
 * 연속이 아니어도 된다 (빠진 날은 그다음 날 이어서). 7일째는 SUPER 하루.
 */
export const CHECKIN_REWARDS: { gems: number; superDays?: number }[] = [
  { gems: 20 },
  { gems: 30 },
  { gems: 40 },
  { gems: 50 },
  { gems: 70 },
  { gems: 100 },
  { gems: 0, superDays: 1 },
];

/**
 * 연속 학습 목표 — 고르는 즉시 보석을 주고, 연속이 끊기면 그만큼 돌려받는다.
 *
 * ⚠️ 돌려받을 때 잔액이 모자라면 **마이너스가 된다.** 받자마자 다 쓰고 일부러
 *    끊는 식으로 공짜 보석을 캐는 걸 막으려고 그렇다 (화면에 미리 알린다).
 */
export const STREAK_GOALS: { days: number; gems: number }[] = [
  { days: 3, gems: 50 },
  { days: 7, gems: 150 },
  { days: 14, gems: 350 },
  { days: 21, gems: 600 },
  { days: 30, gems: 1000 },
];
