/**
 * 리그 탭 연출 — 들어올 때 한 번, 그리고 순위가 올랐을 때.
 *
 * 들어올 때 (ms):
 *   0     티어 크리스털이 쿵 내려앉고 빛 고리가 퍼진다
 *   300   시상대가 솟는다 — 2위 · 3위 · 1위 순서, 솟을 때마다 쿵 (소리가 한 단계씩 높다)
 *   980   1위 머리 위로 반짝
 *   700~  4위부터의 줄들이 오른쪽에서 차르륵 흘러 들어온다
 *   1250  내 줄에 빛이 한 번 지나가고 "나" 칩이 튀어나온다
 *
 * 순위가 올랐을 때 (들어오는 연출 뒤에 이어서, LeagueRankRow):
 *   내 줄이 옛 자리에서 잠깐 멈췄다가(어디였는지 보이게) 보라빛으로 빛나며 치고 올라가고,
 *   추월당한 줄들은 움찔하며 한 칸씩 밀려 내려간다. 도착하면 "+N 계단" 칩 · 딩.
 *
 * 같은 주(weekKey)에 두 번째로 들어오면 들어오는 연출은 건너뛴다 — 탭을 오갈 때마다
 * 시상대가 다시 솟으면 금방 질린다.
 * 이 파일은 react-native 를 쓰지 않는다 — 텔레그램으로 그대로 옮길 수 있다.
 */
import type { CinemaKey } from "@/components/cinema/cinema";

export type LeagueSound = "pop" | "sparkle" | "whoosh" | "ding";

/** 시상대 칸이 솟기 시작하는 때 — 2위 · 3위 · 1위 */
export const PODIUM_START: Record<1 | 2 | 3, number> = { 2: 300, 3: 430, 1: 580 };

export const LEAGUE_INTRO = {
  /** 줄들이 흘러 들어오기 시작 · 간격 · 최대 지연 */
  rowsStart: 700,
  rowGap: 35,
  rowMaxIndex: 10,
  sweep: 1250,
  /** 순위 상승 연출은 여기서부터 (들어오는 연출이 끝난 뒤) */
  rankUpAt: 1350,
  end: 1800,
} as const;

/** 소리 큐 — 높이(rate)는 화면이 직접 준다 */
export const LEAGUE_INTRO_CUES: { t: number; sound: LeagueSound; rate?: number }[] = [
  { t: PODIUM_START[2] + 280, sound: "pop", rate: 1 },
  { t: PODIUM_START[3] + 280, sound: "pop", rate: 1.12 },
  { t: PODIUM_START[1] + 300, sound: "pop", rate: 1.3 },
  { t: PODIUM_START[1] + 400, sound: "sparkle" },
];

export const LEAGUE_TRACK = {
  /** 티어 크리스털 */
  crystalScale: [
    { t: 0, v: 0.55 },
    { t: 380, v: 1.08, e: "out" },
    { t: 560, v: 1, e: "inOut" },
  ],
  crystalOpacity: [
    { t: 0, v: 0 },
    { t: 160, v: 1, e: "out" },
  ],
  /** 크리스털이 앉을 때 퍼지는 빛 고리 */
  ring: [
    { t: 0, v: 0 },
    { t: 300, v: 0 },
    { t: 820, v: 1, e: "out" },
  ],
  /** 1위 반짝 */
  crown: [
    { t: 0, v: 0 },
    { t: PODIUM_START[1] + 380, v: 0 },
    { t: PODIUM_START[1] + 640, v: 1, e: "back" },
  ],
  /** 내 줄 빛 지나가기 0 → 1 */
  sweep: [
    { t: 0, v: 0 },
    { t: 1250, v: 0 },
    { t: 1750, v: 1, e: "inOut" },
  ],
  meChip: [
    { t: 0, v: 0 },
    { t: 1300, v: 0 },
    { t: 1520, v: 1, e: "back" },
  ],
} as const satisfies Record<string, readonly CinemaKey[]>;

/** 시상대 칸 하나 — 블록이 솟고(0→1), 그 위 아바타가 튀어나온다 */
export function podiumTracks(place: 1 | 2 | 3) {
  const s = PODIUM_START[place];
  return {
    block: [
      { t: 0, v: 0 },
      { t: s, v: 0 },
      { t: s + 380, v: 1, e: "back" },
    ] as CinemaKey[],
    avatar: [
      { t: 0, v: 0 },
      { t: s + 240, v: 0 },
      { t: s + 520, v: 1, e: "back" },
    ] as CinemaKey[],
  };
}

/** 목록 줄 i 번째(화면 순서)가 흘러 들어오는 정도 0 → 1 */
export function rowEnter(index: number, t: number) {
  "worklet";
  const start = LEAGUE_INTRO.rowsStart + Math.min(index, LEAGUE_INTRO.rowMaxIndex) * LEAGUE_INTRO.rowGap;
  const p = Math.min(1, Math.max(0, (t - start) / 320));
  return 1 - (1 - p) * (1 - p) * (1 - p);
}

/* ───────── 순위 상승 (LeagueRankRow) ───────── */

/** 옛 자리에 멈춰 보여주는 시간 — 유저가 "어디였는지" 를 인식할 틈 */
export const RANK_HOLD_MS = 450;
/** 옛 자리 → 새 자리 이동 */
export const RANK_MOVE_MS = 820;
/** 도착 뒤 칩·흔들림이 가라앉을 때까지 */
export const RANK_SETTLE_MS = 520;
export const RANK_ANIM_TOTAL_MS = RANK_HOLD_MS + RANK_MOVE_MS + RANK_SETTLE_MS;
