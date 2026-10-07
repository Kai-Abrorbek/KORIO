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
 * 일일 퀘스트.
 *
 * 하루에 쉬움·보통·어려움 칸이 하나씩 깔린다. 각 칸은 그 난이도의 **퀘스트 목록에서
 * 랜덤**으로 뽑힌다 (유저·날짜로 정해져서 새로고침해도 안 바뀐다). 목표치는 최근
 * 7일 활동량(가벼움/보통/많음)에 맞춰 targets 에서 고른다.
 *
 * 진행도는 따로 세지 않고 그날의 학습 통계(UserStats)에서 읽는다 — 공유·팔로우 같은
 * 행동은 questCounters 에 쌓인다. 퀘스트를 늘리려면 QUEST_POOL 에 줄만 추가하면 된다
 * (새 kind 면 retention.service 의 progressOf 에 한 줄, 앱 문구 4개 언어).
 */
export type QuestTier = 'easy' | 'normal' | 'hard';
/** bonus = SUPER 전용 4번째 칸 (상자 조건에는 안 들어간다) */
export type QuestSlot = QuestTier | 'bonus';

export type QuestKind =
  | 'xp'
  | 'correct'
  | 'minutes'
  | 'sessions'
  | 'accurate'
  | 'perfect'
  | 'mistakes'
  | 'category'
  // ── 홍보·소셜 ──
  | 'follow'
  | 'shareProgress'
  | 'shareInvite';

export interface QuestDef {
  kind: QuestKind;
  /** [가벼움, 보통, 많음] 활동량별 목표 */
  targets: [number, number, number];
  /** 뽑힐 확률 가중치 (기본 1) */
  weight?: number;
  /** 홍보 퀘스트 — 하루에 MAX_PROMO_PER_DAY 개까지만 */
  promo?: boolean;
}

/*
 * 목표치 기준점 — 레슨 1개 ≈ 17문제 · 정답 15개 안팎 · XP 80 안팎 · 5분.
 *   쉬움 ≈ 레슨 1개, 보통 ≈ 2~3개, 어려움 ≈ 4~5개 (활동량 "보통" 기준)
 * 예전 고정값(정답 20 · XP 50)은 레슨 1~2개면 끝나서 퀘스트 구실을 못 했다.
 */
export const QUEST_POOL: Record<QuestTier, QuestDef[]> = {
  easy: [
    { kind: 'xp', targets: [60, 100, 160] },
    { kind: 'correct', targets: [15, 25, 40] },
    { kind: 'minutes', targets: [5, 10, 15] },
    { kind: 'sessions', targets: [1, 1, 2] },
    { kind: 'mistakes', targets: [3, 5, 8] },
    { kind: 'follow', targets: [1, 1, 1], promo: true, weight: 1.5 },
    { kind: 'shareProgress', targets: [1, 1, 1], promo: true, weight: 1.5 },
  ],
  normal: [
    { kind: 'xp', targets: [150, 250, 400] },
    { kind: 'correct', targets: [35, 50, 80] },
    { kind: 'minutes', targets: [10, 20, 30] },
    { kind: 'sessions', targets: [2, 3, 4] },
    { kind: 'accurate', targets: [1, 2, 2] },
    { kind: 'category', targets: [6, 10, 15] },
    { kind: 'shareInvite', targets: [1, 1, 1], promo: true, weight: 2 },
  ],
  hard: [
    { kind: 'xp', targets: [300, 450, 700] },
    { kind: 'correct', targets: [60, 90, 130] },
    { kind: 'minutes', targets: [20, 30, 45] },
    { kind: 'sessions', targets: [3, 5, 7] },
    { kind: 'perfect', targets: [1, 1, 2] },
    { kind: 'accurate', targets: [2, 3, 4] },
    { kind: 'category', targets: [12, 18, 25] },
  ],
};

export const DAILY_QUESTS = {
  /** 칸별 보상 (보석) */
  REWARD: { easy: 10, normal: 20, hard: 35, bonus: 20 } as Record<
    QuestSlot,
    number
  >,
  /**
   * 활동량 경계 — 최근 7일 중 공부한 날의 하루 평균 XP. [가벼움|보통, 보통|많음]
   * 150 ≈ 레슨 2개, 400 ≈ 레슨 5개
   */
  BAND_XP: [150, 400],
  /** 하루에 퀘스트를 바꿀 수 있는 횟수 */
  REROLLS_FREE: 1,
  REROLLS_SUPER: 3,
  /** 홍보 퀘스트는 하루 최대 이만큼 — "매일 공유만 시키는 앱" 이 되면 안 된다 */
  MAX_PROMO_PER_DAY: 1,
  /** 공유 같은 이벤트형 카운터의 하루 상한 (앱이 마구 보내도 의미 없게) */
  EVENT_DAILY_CAP: 5,
  /** 레슨 "한 판" 으로 치는 최소 문제 수 */
  SESSION_MIN_QUESTIONS: 5,
  /** 정확도 퀘스트 기준 */
  ACCURATE_RATIO: 0.9,
  /** 카테고리 퀘스트를 낼 수 있는 분야 (최근 7일에 이만큼 이상 푼 것만) */
  CATEGORIES: [
    'vocab',
    'grammar',
    'listening',
    'expression',
    'conversation',
    'topik',
  ],
  CATEGORY_MIN_RECENT: 5,
} as const;

/**
 * 세 칸을 다 끝내면 여는 상자 — 뭐가 나올지 모른다.
 * 보석 기대값은 하루 퀘스트 전체(65 + 상자 ≈ 50)로 예전(105)과 비슷하게 맞춘다.
 * freeze 는 보유 상한이면 QUEST_CHEST_FREEZE_FALLBACK_GEMS 로 바뀐다.
 * XP 부스트 배수는 복귀 보상과 같다 (COMEBACK.XP_MULTIPLIER — grantXp 가 이 값만 안다).
 */
export type QuestChestRoll =
  | { type: 'gems'; gems: number }
  | { type: 'xpBoost'; minutes: number }
  | { type: 'freeze' };

export const QUEST_CHEST: { weight: number; pick: QuestChestRoll[] }[] = [
  {
    weight: 60,
    pick: [20, 30, 40, 50].map((gems) => ({ type: 'gems' as const, gems })),
  },
  { weight: 12, pick: [{ type: 'gems', gems: 100 }] },
  { weight: 18, pick: [{ type: 'xpBoost', minutes: 15 }] },
  { weight: 10, pick: [{ type: 'freeze' }] },
];
export const QUEST_CHEST_FREEZE_FALLBACK_GEMS = 50;

/**
 * 월간 챌린지 — 이번 달에 받은 퀘스트 수. 칸마다 보상, 끝 칸은 그 달 한정 배지.
 * 달이 바뀌면 0 부터. 배지는 프로필에 남는다 (questBadges = ['2026-10', ...]).
 */
export const MONTHLY_CHALLENGE = {
  TARGET: 20,
  MILESTONES: [
    { at: 5, gems: 20, badge: false },
    { at: 12, gems: 50, badge: false },
    { at: 20, gems: 100, badge: true },
  ],
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
