/**
 * 리그 주간 결과 연출 — 리그 탭과 같은 밤하늘 무대 위에서, 결과마다 다른 장면.
 *
 * 승급 (ms):
 *   150   "N위로 마감" 칩
 *   300   옛 크리스털에 힘이 모인다 — 빛이 차오르고 점점 세게 떨린다 (charge)
 *   1300  빛과 함께 터진다 — 화면 번쩍, 조각이 위로 흩어진다 (burst)
 *   1450  새 티어 크리스털이 아래에서 솟아 쿵 앉는다 (land) — 고리 · 광선 · 꽃가루 (fireworks)
 *   2000  "승급!" · 목소리 "승급! 축하해요!"
 *   2300  사다리에서 "나" 가 옛 칸 → 새 칸으로 미끄러진다
 *   2600  젬이 하나씩 딩 · 2900 계속 버튼
 *
 * 강등 — 나쁜 소식이라 요란하지 않게:
 *   300   옛 크리스털이 조금씩 떨린다
 *   700   금이 간다 (crack)
 *   1300  조용히 깨지고 조각이 아래로 떨어진다, 조명이 어두워진다 (shatter)
 *   1900  한 단계 아래 크리스털이 위에서 살며시 내려앉는다
 *   2450  "강등" · XP 미달이면 얼마나 모자랐는지 게이지가 찬다 · 목소리 "괜찮아요, 다음 주에 다시 올라가요!"
 *   2500  사다리에서 "나" 가 한 칸 내려간다 · 3200 계속 버튼
 *
 * 유지: 크리스털이 한 번 반짝 · 빛이 훑고 지나간다 · "리그를 지켰어요!"
 *
 * 화면을 누르면 끝 장면으로, 동작 줄이기면 끝 장면부터.
 * 이 파일은 react-native 를 쓰지 않는다 — 텔레그램으로 그대로 옮길 수 있다.
 */
import type { CinemaCue, CinemaKey } from "@/components/cinema/cinema";

export type ResultChange = "promote" | "demote" | "stay";

export type ResultSound =
  | "charge"
  | "burst"
  | "land"
  | "sparkle"
  | "fireworks"
  | "crack"
  | "shatter"
  | "ding"
  | "voPromote"
  | "voStay"
  | "voDemote";

type Track = CinemaKey[];

export interface ResultTimeline {
  change: ResultChange;
  end: number;
  /** 건너뛰기 · 동작 줄이기가 가는 끝 장면 */
  reveal: number;
  /** 젬 딩 소리 시작 · 간격 */
  gemsAt: number;
  /** 꽃가루 (승급만, -1 = 없음) */
  confettiAt: number;
  cues: CinemaCue<ResultSound>[];
  tracks: {
    rank: Track;
    /** 옛 크리스털 */
    oldOpacity: Track;
    oldScale: Track;
    /** 떨림 크기 (px) */
    shake: Track;
    /** 힘이 모이는 빛 (승급) */
    charge: Track;
    /** 금 (강등) 0~1 */
    crack: Track;
    /** 조각 진행 0~1 */
    shards: Track;
    flash: Track;
    /** 무대 조명 세기 */
    spot: Track;
    /** 새 크리스털 — y 는 크리스털 크기 비율 */
    newY: Track;
    newOpacity: Track;
    newScale: Track;
    ring: Track;
    rays: Track;
    /** 유지 — 훑고 지나가는 빛 0~1 */
    sweep: Track;
    title: Track;
    sub: Track;
    xpBar: Track;
    /** XP 게이지가 차는 정도 0~1 (모은 XP / 필요한 XP 까지) */
    xpFill: Track;
    ladder: Track;
    /** "나" 표시가 옛 칸 → 새 칸 (0~1) */
    marker: Track;
    gems: Track;
    button: Track;
  };
}

const appear = (start: number, dur = 300, ease: CinemaKey["e"] = "out"): Track => [
  { t: 0, v: 0 },
  { t: start, v: 0 },
  { t: start + dur, v: 1, e: ease },
];
const always = (v: number): Track => [{ t: 0, v }];

export function resultTimeline(change: ResultChange): ResultTimeline {
  if (change === "promote") {
    return {
      change,
      end: 3300,
      reveal: 3300,
      gemsAt: 2700,
      confettiAt: 1900,
      cues: [
        { t: 300, sound: "charge" },
        { t: 1270, sound: "burst" },
        { t: 1880, sound: "land" },
        { t: 1950, sound: "fireworks" },
        { t: 2050, sound: "voPromote" },
      ],
      tracks: {
        rank: appear(150),
        oldOpacity: [{ t: 0, v: 1 }, { t: 1290, v: 1 }, { t: 1340, v: 0 }],
        oldScale: [{ t: 0, v: 1 }, { t: 300, v: 1 }, { t: 1250, v: 1.12, e: "in" }, { t: 1320, v: 1.3, e: "out" }],
        shake: [{ t: 0, v: 0 }, { t: 300, v: 0 }, { t: 1280, v: 6, e: "in" }, { t: 1300, v: 0 }],
        charge: [{ t: 0, v: 0 }, { t: 300, v: 0 }, { t: 1280, v: 1, e: "in" }, { t: 1500, v: 0, e: "out" }],
        crack: always(0),
        shards: [{ t: 0, v: 0 }, { t: 1300, v: 0 }, { t: 2150, v: 1, e: "linear" }],
        flash: [{ t: 0, v: 0 }, { t: 1280, v: 0 }, { t: 1340, v: 0.9, e: "out" }, { t: 1750, v: 0, e: "out" }],
        spot: [{ t: 0, v: 0.7 }, { t: 1250, v: 1, e: "in" }, { t: 1900, v: 1 }],
        newY: [{ t: 0, v: 0.9 }, { t: 1450, v: 0.9 }, { t: 1900, v: 0, e: "back" }],
        newOpacity: [{ t: 0, v: 0 }, { t: 1450, v: 0 }, { t: 1560, v: 1 }],
        newScale: [{ t: 0, v: 0.6 }, { t: 1450, v: 0.6 }, { t: 1900, v: 1, e: "back" }],
        ring: [{ t: 0, v: 0 }, { t: 1880, v: 0 }, { t: 2420, v: 1, e: "out" }],
        rays: appear(1850, 350),
        sweep: always(0),
        title: appear(2000),
        sub: appear(2100),
        xpBar: always(0),
        xpFill: always(0),
        ladder: appear(1950),
        marker: [{ t: 0, v: 0 }, { t: 2300, v: 0 }, { t: 2900, v: 1, e: "inOut" }],
        gems: appear(2600, 300, "back"),
        button: appear(2900),
      },
    };
  }
  if (change === "demote") {
    return {
      change,
      end: 3500,
      reveal: 3500,
      gemsAt: 3000,
      confettiAt: -1,
      cues: [
        { t: 700, sound: "crack" },
        { t: 1280, sound: "shatter" },
        { t: 2380, sound: "land" },
        { t: 2700, sound: "voDemote" },
      ],
      tracks: {
        rank: appear(150),
        oldOpacity: [{ t: 0, v: 1 }, { t: 1300, v: 1 }, { t: 1360, v: 0 }],
        oldScale: always(1),
        shake: [{ t: 0, v: 0 }, { t: 300, v: 0 }, { t: 1150, v: 4, e: "in" }, { t: 1300, v: 0 }],
        charge: always(0),
        crack: [{ t: 0, v: 0 }, { t: 700, v: 0 }, { t: 1150, v: 1, e: "out" }, { t: 1300, v: 1 }, { t: 1340, v: 0 }],
        shards: [{ t: 0, v: 0 }, { t: 1300, v: 0 }, { t: 2300, v: 1, e: "linear" }],
        flash: always(0),
        spot: [{ t: 0, v: 0.7 }, { t: 1250, v: 0.7 }, { t: 1600, v: 0.3, e: "out" }, { t: 2000, v: 0.3 }, { t: 2450, v: 0.65, e: "inOut" }],
        newY: [{ t: 0, v: -1 }, { t: 1900, v: -1 }, { t: 2400, v: 0, e: "out" }],
        newOpacity: [{ t: 0, v: 0 }, { t: 1900, v: 0 }, { t: 2050, v: 1 }],
        newScale: always(1),
        ring: [{ t: 0, v: 0 }, { t: 2380, v: 0 }, { t: 2850, v: 1, e: "out" }],
        rays: always(0),
        sweep: always(0),
        title: appear(2450),
        sub: appear(2550),
        xpBar: appear(2650),
        xpFill: [{ t: 0, v: 0 }, { t: 2800, v: 0 }, { t: 3400, v: 1, e: "out" }],
        ladder: appear(2200),
        marker: [{ t: 0, v: 0 }, { t: 2500, v: 0 }, { t: 3000, v: 1, e: "inOut" }],
        gems: appear(2900, 300, "back"),
        button: appear(3200),
      },
    };
  }
  return {
    change,
    end: 1900,
    reveal: 1900,
    gemsAt: 1300,
    confettiAt: -1,
    cues: [
      { t: 380, sound: "sparkle" },
      { t: 900, sound: "voStay" },
    ],
    tracks: {
      rank: appear(150),
      oldOpacity: always(0),
      oldScale: always(1),
      shake: always(0),
      charge: always(0),
      crack: always(0),
      shards: always(0),
      flash: always(0),
      spot: [{ t: 0, v: 0.7 }, { t: 400, v: 1, e: "out" }, { t: 1100, v: 0.8, e: "inOut" }],
      newY: always(0),
      newOpacity: always(1),
      newScale: [{ t: 0, v: 1 }, { t: 300, v: 1 }, { t: 480, v: 1.12, e: "out" }, { t: 800, v: 1, e: "back" }],
      ring: [{ t: 0, v: 0 }, { t: 350, v: 0 }, { t: 900, v: 1, e: "out" }],
      rays: appear(300, 400),
      sweep: [{ t: 0, v: 0 }, { t: 400, v: 0 }, { t: 1100, v: 1, e: "inOut" }],
      title: appear(700),
      sub: appear(800),
      xpBar: always(0),
      xpFill: always(0),
      ladder: appear(900),
      marker: always(0),
      gems: appear(1200, 300, "back"),
      button: appear(1500),
    },
  };
}

/** 젬 딩 — 몇 번 울릴지 (받은 개수와 상관없이 많아야 8번) */
export function gemDings(gems: number) {
  return gems > 0 ? Math.min(8, Math.max(3, Math.round(gems / 5))) : 0;
}
export const GEM_DING_GAP = 90;

/**
 * 크리스털 조각 — [방향 x, 방향 y, 회전(도), 크기 비율].
 * 승급은 빛과 함께 바깥 위로 날아가 사라지고, 강등은 힘없이 아래로 떨어진다.
 */
export const RESULT_SHARDS = [
  [-1.0, -0.55, -38, 0.22],
  [-0.45, -0.95, -14, 0.18],
  [0.42, -0.9, 16, 0.2],
  [1.05, -0.42, 40, 0.24],
  [-0.95, 0.35, -64, 0.17],
  [-0.35, 0.85, -22, 0.2],
  [0.4, 0.9, 24, 0.18],
  [1.0, 0.45, 58, 0.21],
] as const;

/**
 * 조각 하나의 위치 (크리스털 크기 비율) · 회전 · 투명도. p = shards 트랙 값 0~1.
 * fall = 강등 (중력으로 떨어진다)
 */
export function shardAt(shard: (typeof RESULT_SHARDS)[number], p: number, fall: boolean) {
  "worklet";
  if (p <= 0) return { x: 0, y: 0, rotate: 0, opacity: 0 };
  const [dx, dy, spin] = shard;
  if (fall) {
    // 살짝 벌어진 뒤 아래로 떨어진다
    const spread = Math.min(1, p * 4);
    return {
      x: dx * 0.25 * spread,
      y: dy * 0.1 * spread + 1.6 * p * p,
      rotate: spin * p * 1.5,
      opacity: p < 0.75 ? 1 : (1 - p) / 0.25,
    };
  }
  const e = 1 - (1 - p) * (1 - p);
  return {
    x: dx * 1.4 * e,
    y: dy * 1.4 * e - 0.3 * e,
    rotate: spin * 2 * e,
    opacity: p < 0.6 ? 1 : (1 - p) / 0.4,
  };
}

/** 금 — 크리스털 위에 겹치는 선 (캔버스 100×100) */
export const RESULT_CRACKS = [
  "M50 6 L55 34 L46 40 L52 52",
  "M50 52 L70 44 L78 22",
  "M50 52 L34 70 L22 76",
  "M50 52 L66 72 L72 92",
] as const;
