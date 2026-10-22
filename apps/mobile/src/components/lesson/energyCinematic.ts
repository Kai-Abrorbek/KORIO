/**
 * 콤보 에너지 보상 연출 — 셋 중 하나가 랜덤으로 나온다.
 *
 *   번개   (LightningStrike + EnergyBonusPopup) — 하늘에서 번개가 배터리에 꽂혀 칸칸이 충전
 *   코어   (EnergySurge)                         — 불꽃이 빨려 들어 빛나는 코어가 터진다
 *   잭팟   (EnergyJackpot)                       — 슬롯 세 칸이 ⚡⚡⚡ 로 멈추고 에너지 동전이 쏟아진다
 *
 * 셋 다 마지막에 헤더의 에너지 배지 쪽으로 빨려 들어간다 (collect).
 * 시계(ms)와 키프레임은 components/cinema/cinema. 이 파일은 react-native 를 쓰지 않는다.
 */
import {
  fountainItems,
  seeded,
  type CinemaCue,
  type CinemaKey,
  type FountainItem,
  type CinemaLanguage,
} from "@/components/cinema/cinema";

export type EnergySound =
  | "thunder"
  | "charge"
  | "collect"
  | "gather"
  | "corePop"
  | "slotLever"
  | "slotSpin"
  | "slotStop"
  | "jackpot"
  | "voJackpot";

/* ───────── 번개 ───────── */

export const LIGHTNING = {
  strike: 90,
  battery: 170,
  fill: 320,
  /** 칸 하나가 차는 간격 */
  cellGap: 210,
  cells: 5,
  collect: 2750,
  collectDur: 420,
  end: 3250,
} as const;

export type LightningSound = "thunder" | "charge" | "collect";

export const LIGHTNING_CUES: CinemaCue<LightningSound>[] = [
  { t: 50, sound: "thunder" },
  { t: LIGHTNING.fill, sound: "charge" },
  { t: LIGHTNING.collect + LIGHTNING.collectDur - 160, sound: "collect" },
];

export const LIGHTNING_TRACK = {
  /** 화면 번쩍 (두 번 깜빡) */
  flash: [
    { t: 0, v: 0 },
    { t: 60, v: 0.25 },
    { t: 90, v: 0.05 },
    { t: 120, v: 0.9, e: "out" },
    { t: 170, v: 0.2 },
    { t: 210, v: 0.75 },
    { t: 520, v: 0, e: "out" },
  ],
  /** 번개 줄기 — 꽂히고 깜빡이다 은은히 남았다가 사라진다 */
  bolt: [
    { t: 0, v: 0 },
    { t: 89, v: 0 },
    { t: 100, v: 1 },
    { t: 150, v: 0.35 },
    { t: 190, v: 1 },
    { t: 250, v: 0.6 },
    { t: 300, v: 1 },
    { t: 700, v: 0.45, e: "out" },
    { t: 2600, v: 0.45 },
    { t: 3000, v: 0, e: "inOut" },
  ],
  /** 위에서 아래로 그어지는 정도 (0~1) */
  boltDraw: [
    { t: 0, v: 0 },
    { t: 90, v: 0 },
    { t: 150, v: 1, e: "out" },
  ],
  /** 배터리 등장 */
  battery: [
    { t: 0, v: 0 },
    { t: 170, v: 0 },
    { t: 430, v: 1, e: "back" },
  ],
  /** 배터리 둘레 전기 */
  arcs: [
    { t: 0, v: 0 },
    { t: 170, v: 0 },
    { t: 260, v: 1 },
    { t: 1500, v: 1 },
    { t: 2000, v: 0.35, e: "inOut" },
    { t: 2750, v: 0 },
  ],
  /** 다 찼을 때 번쩍 테 */
  full: [
    { t: 0, v: 0 },
    { t: 1340, v: 0 },
    { t: 1420, v: 1, e: "out" },
    { t: 1900, v: 0, e: "out" },
  ],
  /** 헤더로 빨려 들기 */
  collect: [
    { t: 0, v: 0 },
    { t: 2750, v: 0 },
    { t: 3170, v: 1, e: "in" },
  ],
  /** 어둡게 */
  dim: [
    { t: 0, v: 0 },
    { t: 120, v: 0.45, e: "out" },
    { t: 2750, v: 0.45 },
    { t: 3200, v: 0 },
  ],
} as const satisfies Record<string, readonly CinemaKey[]>;

/** 배터리 둘레 전기 — 세 벌을 번갈아 보여 지지직 (배터리 가운데 기준, 캔버스 240×160) */
export const ARC_SETS: string[] = (() => {
  const rand = seeded(42);
  const arc = (x0: number, y0: number, x1: number, y1: number) => {
    let d = `M${x0} ${y0}`;
    const steps = 5;
    for (let i = 1; i <= steps; i++) {
      const k = i / steps;
      const x = x0 + (x1 - x0) * k + (i < steps ? (rand() - 0.5) * 22 : 0);
      const y = y0 + (y1 - y0) * k + (i < steps ? (rand() - 0.5) * 22 : 0);
      d += ` L${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d;
  };
  return Array.from({ length: 3 }, () =>
    [
      arc(18, 30 + rand() * 30, 52, 70 + rand() * 30),
      arc(222, 40 + rand() * 30, 188, 80 + rand() * 20),
      arc(90 + rand() * 20, 4, 120, 30),
      arc(130 + rand() * 20, 156, 110, 128),
    ].join(" "),
  );
})();

/** 지금 보일 전기 묶음 (70ms 마다 바뀐다) */
export function arcPhase(t: number) {
  "worklet";
  return Math.floor(t / 70) % 3;
}

/* ───────── 코어 (EnergySurge) ───────── */

/** 코어 시각들은 EnergySurge 의 T_POP 등과 같다 */
export function surgeCues(pop: number, fill: number, collectEnd: number): CinemaCue<EnergySound>[] {
  return [
    { t: 0, sound: "gather" },
    { t: pop - 30, sound: "corePop" },
    { t: fill, sound: "charge" },
    { t: collectEnd - 160, sound: "collect" },
  ];
}

/* ───────── 잭팟 ───────── */

export const JACKPOT = {
  drop: 0,
  lever: 560,
  spin: 720,
  /** 칸마다 멈추는 때 — 마지막은 뜸을 들인다 */
  stops: [1520, 1900, 2480] as readonly number[],
  win: 2520,
  payout: 2620,
  collect: 3500,
  gap: 70,
  fly: 400,
} as const;

export const SLOT_SYMBOLS = ["bolt", "가", "star", "한", "gem"] as const;

/** 릴의 글자 칸 — 영어 코스면 한글 대신 알파벳 (가 → A, 한 → E) */
export const SLOT_LETTERS: Record<CinemaLanguage, Record<"가" | "한", string>> = {
  ko: { 가: "가", 한: "한" },
  en: { 가: "A", 한: "E" },
};

/** 잭팟 간판 글씨 */
export const JACKPOT_WORD: Record<CinemaLanguage, string> = {
  ko: "잭팟",
  en: "JACKPOT",
};
export type SlotSymbol = (typeof SLOT_SYMBOLS)[number];
/** 동전(에너지) 수 — 받은 양과 상관없이 넘치지 않게 */
export function jackpotCoinCount(amount: number) {
  return Math.max(4, Math.min(10, amount));
}
export function jackpotEnd(coins: number) {
  return JACKPOT.collect + (coins - 1) * JACKPOT.gap + JACKPOT.fly + 250;
}

export function jackpotCues(): CinemaCue<EnergySound>[] {
  return [
    { t: JACKPOT.lever - 40, sound: "slotLever" },
    { t: JACKPOT.spin, sound: "slotSpin" },
    ...JACKPOT.stops.map((t) => ({ t: t - 20, sound: "slotStop" as const })),
    { t: JACKPOT.win, sound: "jackpot" },
    { t: JACKPOT.win + 260, sound: "voJackpot" },
  ];
}

/** 동전이 헤더에 닿는 때 (톡톡 소리·진동은 화면이 이때 낸다) */
export function coinArrival(i: number) {
  return JACKPOT.collect + i * JACKPOT.gap + JACKPOT.fly;
}

export function jackpotCoins(count: number, spread: number): FountainItem[] {
  return fountainItems(count, spread, {
    start: JACKPOT.payout,
    collect: JACKPOT.collect,
    gap: JACKPOT.gap,
    seed: 2020,
    minSize: 30,
    sizeRange: 10,
  });
}

/** 한 칸 몇 바퀴(기호 수) 돌고 ⚡ 에 멈출지 — 칸마다 조금씩 다르게 */
const SPEED = 15; // 초당 기호 수 (가장 빠를 때)
const DECEL = 0.4; // 멈추기 전 감속 구간 (전체의 비율)
export function reelDistance(stopAt: number) {
  const T = (stopAt - JACKPOT.spin) / 1000;
  const raw = SPEED * T * (1 - (2 * DECEL) / 3);
  const n = SLOT_SYMBOLS.length;
  // ⚡ (0 번) 에 멈추게 기호 수의 배수로
  return Math.max(n, Math.round(raw / n) * n);
}

/**
 * 릴 i 가 t 시점에 몇 칸(기호 단위) 돌았는지. 일정한 속도로 돌다 부드럽게 서고,
 * 선 순간 살짝 튕긴다.
 */
export function reelAt(t: number, stopAt: number, distance: number) {
  "worklet";
  const start = JACKPOT.spin;
  if (t <= start) return 0;
  const T = stopAt - start;
  if (t >= stopAt) {
    const age = t - stopAt;
    if (age > 200) return distance;
    return distance - 0.14 * Math.sin((Math.PI * age) / 200) * (1 - age / 200);
  }
  const u = (t - start) / T;
  const d = DECEL;
  // 등속 구간 속도 v (전체 거리가 distance 가 되게)
  const v = distance / (1 - (2 * d) / 3);
  if (u < 1 - d) return v * u;
  const w = (u - (1 - d)) / d; // 0~1 감속
  const decel = (d / 3) * (1 - Math.pow(1 - w, 3));
  return v * (1 - d) + v * decel;
}

export const JACKPOT_TRACK = {
  dim: [
    { t: 0, v: 0 },
    { t: 200, v: 0.6, e: "out" },
    { t: 4100, v: 0.6 },
    { t: 4500, v: 0 },
  ],
  /** 기계가 위에서 떨어진다 */
  drop: [
    { t: 0, v: -1 },
    { t: 460, v: 0, e: "back" },
  ],
  /** 손잡이 당김 (0 = 위, 1 = 끝까지 아래) */
  lever: [
    { t: 0, v: 0 },
    { t: 560, v: 0 },
    { t: 680, v: 1, e: "in" },
    { t: 900, v: 0, e: "back" },
  ],
  /** 잭팟 번쩍 */
  win: [
    { t: 0, v: 0 },
    { t: 2500, v: 0 },
    { t: 2580, v: 1, e: "out" },
    { t: 3300, v: 0.25, e: "out" },
  ],
  /** +N 숫자 */
  amount: [
    { t: 0, v: 0 },
    { t: 2600, v: 0 },
    { t: 2900, v: 1, e: "back" },
    { t: 4000, v: 1 },
    { t: 4300, v: 0 },
  ],
  /** 기계가 작아지며 사라진다 */
  leave: [
    { t: 0, v: 0 },
    { t: 4000, v: 0 },
    { t: 4400, v: 1, e: "in" },
  ],
} as const satisfies Record<string, readonly CinemaKey[]>;

/** 테두리 전구 깜빡임 — 돌 땐 번갈아, 잭팟이면 다 같이 빠르게 */
export function bulbOn(i: number, t: number) {
  "worklet";
  if (t >= 2520) return Math.floor(t / 90) % 2 === 0 ? 1 : 0.35;
  return (Math.floor(t / 160) + i) % 2 === 0 ? 1 : 0.3;
}
