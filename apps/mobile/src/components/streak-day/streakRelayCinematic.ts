/**
 * 연속 학습일 연출 — "불씨 릴레이".
 *
 * 오늘 처음 공부한 순간. 요일 줄에서 공부한 날들이 왼쪽부터 차례로 불이 붙고
 * (붙을 때마다 소리가 한 단계 높아진다), 불이 오늘 칸으로 폴짝 건너가 오늘이 켜진다.
 * 그 불덩이가 위로 솟아 불씨에 닿으면 큰 불꽃이 확 타오르고, 숫자가 어제 → 오늘로 넘어간다.
 * 7 · 30 · 100 · 365일 (그리고 100 일마다) 은 기념일 — 폭죽 · 금빛 배지 · 더 큰 목소리.
 *
 * 장면 (ms, 지난 날이 k 개일 때):
 *   0          불 꺼진 무대, 불꽃 자리에 작은 불씨가 숨 쉰다. 요일 동그라미가 톡톡 나타난다
 *   650        지난 날들이 170ms 마다 하나씩 불 붙는다
 *   +120       마지막 불이 오늘 칸으로 폴짝 (280ms)
 *   today      오늘 칸 점화 — 고리가 퍼진다
 *   +140       불덩이가 위로 솟는다 (520ms)
 *   ignite     큰 불꽃 확! 화면이 따뜻하게 번쩍, 불티가 사방으로, 살짝 쿵
 *   +160~620   숫자: 어제 값이 위로 빠지고 오늘 값이 아래서 튀어 오른다 (딸깍)
 *   +380       제목·설명
 *   +520       목소리 ("오늘도 불태웠어요!" / 기념일 목소리)
 *   +650       기념일이면 폭죽 · 금빛 배지
 *
 * 시계 기준이 장면마다 다르므로(지난 날 수) 트랙은 점화(ignite) 기준 상대 시각이다.
 * 이 파일은 react-native 를 쓰지 않는다 — 텔레그램으로 그대로 옮길 수 있다.
 */
import type { CinemaCue, CinemaKey } from "@/components/cinema/cinema";

export interface RelayDay {
  done: boolean;
  isToday: boolean;
}

export type StreakSound =
  | "catch"
  | "today"
  | "rise"
  | "ignite"
  | "count"
  | "fireworks"
  | "voDay"
  | "vo7"
  | "vo30"
  | "vo100"
  | "vo365"
  | "voRecord";

export const RELAY = {
  /** 요일 동그라미가 나타나는 때 · 간격 */
  dotsIn: 100,
  dotGap: 60,
  relayStart: 650,
  relayGap: 170,
  hop: 280,
  rise: 520,
} as const;

/** 기념일 — 7 · 30 · 100 · 365, 그 뒤로는 100 일마다 */
export function isMilestone(streak: number) {
  return streak === 7 || streak === 30 || streak === 100 || streak === 365 || (streak > 100 && streak % 100 === 0);
}

function voiceFor(streak: number): StreakSound {
  if (streak === 7) return "vo7";
  if (streak === 30) return "vo30";
  if (streak === 100) return "vo100";
  if (streak === 365) return "vo365";
  if (isMilestone(streak)) return "voRecord";
  return "voDay";
}

export interface RelayTimeline {
  /** 요일 칸마다 불 붙는 시각 (-1 = 안 붙는다) */
  litAt: number[];
  todayIndex: number;
  /** 오늘 칸으로 건너오는 불이 출발하는 칸 (-1 = 건너뛰기 없음) */
  hopFrom: number;
  hopStart: number;
  today: number;
  /** 불덩이가 솟기 시작 */
  rise: number;
  ignite: number;
  milestone: boolean;
  /** 이때부터 시계가 멈춘 끝 장면 (건너뛰기도 여기로) */
  end: number;
  /** 지난 날 불 붙는 소리 — 점점 높게 (화면이 rate 를 주며 직접 튼다) */
  catches: { t: number; rate: number }[];
  cues: CinemaCue<StreakSound>[];
}

export function relayTimeline(days: RelayDay[], streak: number): RelayTimeline {
  let todayIndex = days.findIndex((d) => d.isToday);
  if (todayIndex < 0) {
    // 창에 오늘이 없으면 마지막으로 공부한 칸을 오늘로 본다
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i]?.done) {
        todayIndex = i;
        break;
      }
    }
    if (todayIndex < 0) todayIndex = 0;
  }
  const past: number[] = [];
  days.forEach((d, i) => {
    if (d.done && i < todayIndex) past.push(i);
  });

  const litAt = days.map(() => -1);
  past.forEach((i, j) => {
    litAt[i] = RELAY.relayStart + j * RELAY.relayGap;
  });
  const hopFrom = past.length ? (past[past.length - 1] as number) : -1;
  const hopStart = past.length ? RELAY.relayStart + (past.length - 1) * RELAY.relayGap + 120 : -1;
  const today = past.length ? hopStart + RELAY.hop : RELAY.relayStart - 100;
  litAt[todayIndex] = today;
  const rise = today + 140;
  const ignite = rise + RELAY.rise;
  const milestone = isMilestone(streak);
  const end = ignite + (milestone ? 1500 : 1100);

  const catches = past.map((i, j) => ({ t: litAt[i] as number, rate: Math.min(1.7, 1 + j * 0.1) }));
  const cues: CinemaCue<StreakSound>[] = [
    { t: today, sound: "today" },
    { t: rise, sound: "rise" },
    { t: ignite - 40, sound: "ignite" },
    { t: ignite + 400, sound: "count" },
    { t: ignite + 520, sound: voiceFor(streak) },
  ];
  if (milestone) cues.push({ t: ignite + 650, sound: "fireworks" });

  return { litAt, todayIndex, hopFrom, hopStart, today, rise, ignite, milestone, end, catches, cues: cues.sort((a, b) => a.t - b.t) };
}

/** 점화(ignite) 기준 상대 시각 트랙 — cinemaAt(track, clock - ignite) */
export const IGNITE_TRACK = {
  /** 불 붙기 전 불씨 */
  ember: [
    { t: -99999, v: 1 },
    { t: -60, v: 1 },
    { t: 80, v: 0 },
  ],
  /** 큰 불꽃 등장 (밑동에서 솟는다) */
  flame: [
    { t: -99999, v: 0 },
    { t: 0, v: 0 },
    { t: 180, v: 1.18, e: "out" },
    { t: 440, v: 1, e: "inOut" },
  ],
  /** 광채가 확 부풀었다 가라앉는다 */
  glowBoost: [
    { t: -99999, v: 0 },
    { t: 0, v: 0 },
    { t: 70, v: 1, e: "out" },
    { t: 800, v: 0, e: "inOut" },
  ],
  /** 화면이 따뜻하게 번쩍 */
  warm: [
    { t: -99999, v: 0 },
    { t: 0, v: 0 },
    { t: 60, v: 0.3, e: "out" },
    { t: 650, v: 0, e: "out" },
  ],
  /** 사방으로 튀는 불티 진행 */
  sparks: [
    { t: -99999, v: 0 },
    { t: 0, v: 0 },
    { t: 750, v: 1, e: "out" },
  ],
  /** 어제 숫자가 위로 빠진다 */
  prevOut: [
    { t: -99999, v: 0 },
    { t: 160, v: 0 },
    { t: 400, v: 1, e: "in" },
  ],
  /** 오늘 숫자가 아래서 튀어 오른다 */
  nextIn: [
    { t: -99999, v: 0 },
    { t: 330, v: 0 },
    { t: 620, v: 1, e: "back" },
  ],
  /** 제목 · 설명 */
  text: [
    { t: -99999, v: 0 },
    { t: 380, v: 0 },
    { t: 700, v: 1, e: "out" },
  ],
  /** 기념일 금빛 배지 */
  badge: [
    { t: -99999, v: 0 },
    { t: 650, v: 0 },
    { t: 950, v: 1, e: "back" },
  ],
  /** 배경 불티 (불이 붙은 뒤부터) */
  embers: [
    { t: -99999, v: 0 },
    { t: 0, v: 0 },
    { t: 500, v: 1 },
  ],
} as const satisfies Record<string, readonly CinemaKey[]>;

/** 점화 순간 불티 — 방향 · 거리(px) · 크기 */
export const IGNITE_SPARKS = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2 - Math.PI / 2 + (i % 2 ? 0.12 : -0.08);
  return { angle, dist: 110 + (i % 4) * 26, size: 6 + (i % 3) * 3, gold: i % 3 === 0 };
});

/** 요일 칸에 불이 붙는 모양 — 0 (꺼짐) → 1 (붙음), 붙는 순간 살짝 커졌다 돌아온다 */
export function dotLit(t: number, litAt: number) {
  "worklet";
  if (litAt < 0 || t < litAt) return { on: 0, scale: 1 };
  const age = t - litAt;
  const on = Math.min(1, age / 90);
  const scale = age < 110 ? 1 + 0.3 * (age / 110) : age < 300 ? 1.3 - 0.3 * ((age - 110) / 190) : 1;
  return { on, scale };
}

/**
 * 오늘 칸으로 건너오는 불 (같은 줄 안에서 포물선). x 는 칸 중심 px.
 * 0 → 1 동안 위로 솟았다 내려앉는다.
 */
export function hopAt(t: number, start: number, dur: number, fromX: number, toX: number) {
  "worklet";
  if (start < 0 || t < start || t > start + dur) return { x: fromX, y: 0, opacity: 0 };
  const p = (t - start) / dur;
  return { x: fromX + (toX - fromX) * p, y: -Math.sin(p * Math.PI) * 46, opacity: 1 };
}

/** 오늘 칸에서 불씨까지 솟는 불덩이 — 살짝 휘며 가속 */
export function riseAt(t: number, start: number, dur: number, fromX: number, fromY: number, toX: number, toY: number) {
  "worklet";
  if (t < start || t > start + dur) return { x: fromX, y: fromY, opacity: 0, scale: 1 };
  const p = (t - start) / dur;
  const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
  return {
    x: fromX + (toX - fromX) * e + Math.sin(p * Math.PI) * 30,
    y: fromY + (toY - fromY) * e,
    opacity: 1,
    scale: 1 + 0.6 * p,
  };
}
