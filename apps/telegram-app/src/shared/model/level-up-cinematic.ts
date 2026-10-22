/**
 * 레벨업 연출 — "한글 로켓".
 *
 * ⚠️ 이 파일은 두 앱에 **똑같이** 있다 — 고치면 같이 고친다.
 *   텔레그램 shared/model/level-up-cinematic.ts · 모바일 components/level-up/levelUpCinematic.ts
 * 그림(도형 목록)과 시간표(키프레임)만 여기 있고, 각 앱이 자기 방식으로 그리고 돌린다
 * (텔레그램 requestAnimationFrame, 모바일 reanimated). 그래서 두 앱이 같은 장면이다.
 * 함수에 "worklet" 이 붙어 있는 건 모바일이 UI 스레드에서 부르기 때문이다 (웹에선 그냥 문자열).
 *
 * 장면 (ms):
 *   0     밤하늘, 발사대 위 로켓. 로켓은 한글로 만들었다 — 코 ㅅ, 몸통 ㅁ, 창 ㅇ(안에 내 얼굴), 다리 ㅠ
 *   600   셋 · 1200 둘 · 1800 하나 (한국어 카운트다운 — 목소리와 같이)
 *   2400  출발! — 불꽃, 연기, 땅이 아래로 빠지고 구름을 뚫는다. 배기가스는 자모(ㄱ ㄴ ㄷ …)
 *   4300  로켓이 위로 사라지고, 새 섹션 행성이 내려온다
 *   5150  번쩍 — 행성 위에 내 아바타가 깃발을 꽂고 손을 흔든다. 새 섹션 제목·설명
 *
 * 좌표: x 는 화면 너비 비율(0~1), y 는 화면 높이 비율(0~1). 크기는 너비 비율.
 */

export type CinemaEase = "in" | "out" | "inOut" | "linear";

export interface CinemaKey {
  t: number;
  v: number;
  /** 앞 키에서 이 키로 가는 곡선 */
  e?: CinemaEase;
}

/** 키프레임 → t 시점 값 (마지막 키 뒤로는 마지막 값) */
export function cinemaAt(keys: readonly CinemaKey[], t: number): number {
  "worklet";
  const n = keys.length;
  if (n === 0) return 0;
  const first = keys[0] as CinemaKey;
  if (t <= first.t) return first.v;
  for (let i = 1; i < n; i++) {
    const a = keys[i - 1] as CinemaKey;
    const b = keys[i] as CinemaKey;
    if (t <= b.t) {
      const span = b.t - a.t;
      const p = span <= 0 ? 1 : (t - a.t) / span;
      let k = p;
      if (b.e === "out") k = 1 - (1 - p) * (1 - p) * (1 - p);
      else if (b.e === "in") k = p * p * p;
      else if (b.e === "inOut") k = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      return a.v + (b.v - a.v) * k;
    }
  }
  return (keys[n - 1] as CinemaKey).v;
}

/* ───────── 시간표 ───────── */

export const CINEMA = {
  /** 여기서부터 결과 화면 (건너뛰기도 여기로) */
  reveal: 5150,
  /** 결과가 다 떠오른 시각 — 시계는 여기서 멈춘다 */
  end: 5750,
  count: [600, 1200, 1800] as const,
  go: 2400,
} as const;

/** 소리 큐 — 각 앱이 이 시각에 튼다 (목소리 파일은 tools/levelup-audio 가 ElevenLabs 로 만든다) */
export const CINEMA_SOUND_CUES = [
  { t: 600, sound: "vo3" },
  { t: 1200, sound: "vo2" },
  { t: 1500, sound: "rumble" },
  { t: 1800, sound: "vo1" },
  { t: 2400, sound: "voGo" },
  { t: 2400, sound: "launch" },
  { t: 5150, sound: "arrive" },
  { t: 5450, sound: "voArrive" },
] as const;

export type CinemaSound = (typeof CINEMA_SOUND_CUES)[number]["sound"];

export const TRACK = {
  /** 우주 하늘이 저녁 하늘을 덮는 정도 */
  space: [
    { t: 0, v: 0 },
    { t: 2500, v: 0 },
    { t: 4200, v: 1, e: "inOut" },
  ],
  /** 땅(발사대·언덕) — 화면 높이 비율만큼 아래로 */
  ground: [
    { t: 0, v: 0 },
    { t: 2400, v: 0 },
    { t: 3300, v: 1.15, e: "in" },
  ],
  /** 로켓 중심 y (높이 비율) */
  rocketY: [
    { t: 0, v: 0.66 },
    { t: 2400, v: 0.66 },
    { t: 3150, v: 0.47, e: "inOut" },
    { t: 4300, v: 0.45 },
    { t: 4800, v: -0.3, e: "in" },
  ],
  /** 불꽃 크기 0~1 */
  flame: [
    { t: 0, v: 0 },
    { t: 700, v: 0.18, e: "out" },
    { t: 1800, v: 0.42, e: "inOut" },
    { t: 2400, v: 1, e: "out" },
    { t: 4800, v: 1 },
    { t: 5000, v: 0 },
  ],
  /** 발사대 연기 진행 0~1 */
  smoke: [
    { t: 0, v: 0 },
    { t: 1500, v: 0.15 },
    { t: 2400, v: 0.55, e: "out" },
    { t: 3300, v: 1, e: "out" },
  ],
  /** 속도선 */
  warp: [
    { t: 0, v: 0 },
    { t: 2700, v: 0 },
    { t: 3100, v: 1, e: "out" },
    { t: 4400, v: 1 },
    { t: 4900, v: 0 },
  ],
  /** 비행 중 노즐 아래 빛 꼬리 0~1 */
  trail: [
    { t: 0, v: 0 },
    { t: 2400, v: 0 },
    { t: 2900, v: 1, e: "out" },
    { t: 4700, v: 1 },
    { t: 4950, v: 0 },
  ],
  /** 별 내려가는 양 (높이 비율, 반복) */
  stars: [
    { t: 0, v: 0 },
    { t: 2500, v: 0 },
    { t: 4900, v: 2.4, e: "inOut" },
    { t: 5750, v: 2.55, e: "out" },
  ],
  /** 위쪽 안내 칩 ("1-bo'lim tugadi!") */
  chip: [
    { t: 0, v: 0 },
    { t: 350, v: 1, e: "out" },
    { t: 2150, v: 1 },
    { t: 2450, v: 0 },
  ],
  /** 행성 중심 y (높이 비율) · 크기 */
  planetY: [
    { t: 0, v: -0.6 },
    { t: 4350, v: -0.6 },
    { t: 5250, v: 0.37, e: "out" },
  ],
  planetScale: [
    { t: 0, v: 0.72 },
    { t: 4350, v: 0.72 },
    { t: 5250, v: 1, e: "out" },
  ],
  /** 번쩍 */
  flash: [
    { t: 0, v: 0 },
    { t: 4980, v: 0 },
    { t: 5130, v: 0.85, e: "out" },
    { t: 5520, v: 0, e: "inOut" },
  ],
  /** 결과(아바타·깃발·글·버튼) 0~1 */
  reveal: [
    { t: 0, v: 0 },
    { t: 5150, v: 0 },
    { t: 5750, v: 1, e: "out" },
  ],
} as const satisfies Record<string, readonly CinemaKey[]>;

/** 카운트다운 낱말 하나 (셋·둘·하나·출발) 의 투명도·크기 */
export function countWord(start: number, hold = 470, scaleFrom = 1.35): { opacity: CinemaKey[]; scale: CinemaKey[] } {
  return {
    opacity: [
      { t: 0, v: 0 },
      { t: start, v: 0 },
      { t: start + 110, v: 1, e: "out" },
      { t: start + hold, v: 1 },
      { t: start + hold + 130, v: 0 },
    ],
    scale: [
      { t: 0, v: scaleFrom },
      { t: start, v: scaleFrom },
      { t: start + 200, v: 1, e: "out" },
      { t: start + hold + 130, v: 0.92 },
    ],
  };
}

export const COUNT_WORDS = [
  { ko: "셋", en: "Three", sub: "3", ...countWord(600) },
  { ko: "둘", en: "Two", sub: "2", ...countWord(1200) },
  { ko: "하나", en: "One", sub: "1", ...countWord(1800) },
] as const;

/** 발사 외침 — 배우는 말로 (영어 코스는 목소리도 "Liftoff!"). 키는 cinema.ts 의 CinemaLanguage */
export const GO_TEXT: Record<"ko" | "en", string> = {
  ko: "출발!",
  en: "Liftoff!",
};

export const GO_WORD = countWord(2400, 600, 1.6);

/* ───────── 그림 (도형 목록) ─────────
 * 각 앱의 WearShapes 로 그린다 (avatar-wearables WShape 와 같은 모양).
 */
export type CinemaShape =
  | { k: "path"; d: string; f?: string; s?: string; w?: number; o?: number; round?: boolean }
  | { k: "rect"; x: number; y: number; width: number; height: number; rx?: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "circle"; cx: number; cy: number; r: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "ellipse"; cx: number; cy: number; rx: number; ry: number; f?: string; s?: string; w?: number; o?: number }
  | { k: "g"; transform: string; children: CinemaShape[] };

const PURPLE = "#776EE2";
const PURPLE_DARK = "#554CB5";
const LAVENDER = "#F4F2FF";
const LAVENDER_SHADE = "#DCD6FF";
const GOLD = "#FFD45C";
const GOLD_EDGE = "#E2A83A";

/**
 * 한글 로켓 — 캔버스 200×340, 노즐 (100, 300).
 *   ㅅ 코 · ㅁ 몸통 · ㅇ 창(앱이 그 안에 아바타 얼굴을 넣는다) · ㅠ 다리
 */
export const ROCKET_BOX = { width: 200, height: 340, nozzleX: 100, nozzleY: 300 } as const;
/** 창(ㅇ) — 앱이 이 원 안에 아바타 머리를 그린다 */
export const ROCKET_WINDOW = { cx: 100, cy: 172, r: 33 } as const;

export const ROCKET_SHAPES: CinemaShape[] = [
  // ㅠ — 가로 받침 + 두 다리(날개)
  { k: "path", d: "M44 262 Q22 282 26 314 Q40 306 60 298 L64 262 Z", f: PURPLE_DARK },
  { k: "path", d: "M156 262 Q178 282 174 314 Q160 306 140 298 L136 262 Z", f: PURPLE },
  { k: "rect", x: 52, y: 252, width: 96, height: 22, rx: 11, f: PURPLE },
  // 노즐
  { k: "path", d: "M78 270 L122 270 L116 300 L84 300 Z", f: "#3B3486" },
  { k: "rect", x: 80, y: 294, width: 40, height: 9, rx: 4, f: "#2B2560" },
  // ㅁ — 몸통 (네모 + 오른쪽 그늘)
  { k: "rect", x: 54, y: 104, width: 92, height: 160, rx: 22, f: LAVENDER },
  { k: "path", d: "M118 104 L124 104 Q146 104 146 126 L146 242 Q146 264 124 264 L118 264 Z", f: LAVENDER_SHADE },
  { k: "rect", x: 54, y: 222, width: 92, height: 14, f: PURPLE, o: 0.9 },
  { k: "rect", x: 54, y: 240, width: 92, height: 5, f: GOLD },
  // ㅇ — 창 테두리 (안은 앱이 아바타로 채운다)
  { k: "circle", cx: 100, cy: 172, r: 40, f: GOLD, s: GOLD_EDGE, w: 3 },
  { k: "circle", cx: 100, cy: 172, r: 33, f: "#BFE5FF" },
  // ㅅ — 코 (원뿔) + 금색 ㅅ 획
  { k: "path", d: "M54 118 Q58 58 100 18 Q142 58 146 118 Z", f: PURPLE },
  { k: "path", d: "M100 18 Q142 58 146 118 L122 118 Q118 70 100 18 Z", f: PURPLE_DARK, o: 0.55 },
  { k: "path", d: "M100 42 Q92 74 74 98", s: GOLD, w: 7, round: true },
  { k: "path", d: "M98 64 Q110 84 126 98", s: GOLD, w: 7, round: true },
  // 반짝 (정지)
  { k: "path", d: "M66 132 Q68 120 78 114", s: "#FFFFFF", w: 6, round: true, o: 0.85 },
];

/** 창 유리 반사 (아바타 얼굴 위에 덮는다) */
export const ROCKET_GLASS: CinemaShape[] = [
  { k: "path", d: "M78 156 Q86 142 102 140", s: "#FFFFFF", w: 5, round: true, o: 0.55 },
  { k: "circle", cx: 100, cy: 172, r: 33, f: "none", s: "#8FC9F0", w: 3 },
];

/** 불꽃 — 노즐 아래로 (원점 = 노즐, 앱이 세로로 키운다). 캔버스 80×120, 원점 (40, 0) */
export const FLAME_BOX = { width: 80, height: 120, originX: 40 } as const;
export const FLAME_SHAPES: CinemaShape[] = [
  { k: "path", d: "M8 0 Q2 40 40 118 Q78 40 72 0 Z", f: "#FF7A45", o: 0.92 },
  { k: "path", d: "M18 0 Q14 34 40 92 Q66 34 62 0 Z", f: GOLD },
  { k: "path", d: "M28 0 Q26 22 40 60 Q54 22 52 0 Z", f: "#FFFBEA" },
];

/** 구름 한 덩이 — 캔버스 240×110 */
export const CLOUD_BOX = { width: 240, height: 110 } as const;
export const CLOUD_SHAPES: CinemaShape[] = [
  { k: "ellipse", cx: 120, cy: 78, rx: 112, ry: 30, f: "#FFFFFF", o: 0.92 },
  { k: "circle", cx: 78, cy: 58, r: 36, f: "#FFFFFF", o: 0.95 },
  { k: "circle", cx: 128, cy: 42, r: 42, f: "#FFFFFF" },
  { k: "circle", cx: 176, cy: 60, r: 30, f: "#FFFFFF", o: 0.95 },
  { k: "ellipse", cx: 124, cy: 94, rx: 96, ry: 12, f: "#E7E3FF", o: 0.8 },
];

/** 구름들 — x(너비 비율), 크기(너비 비율), 화면을 지나가는 시간 */
export const CLOUDS = [
  { x: 0.18, size: 0.62, start: 2550, dur: 1100 },
  { x: 0.78, size: 0.5, start: 2750, dur: 1000 },
  { x: 0.42, size: 0.8, start: 3050, dur: 1150 },
  { x: 0.9, size: 0.44, start: 3350, dur: 950 },
  { x: 0.1, size: 0.5, start: 3600, dur: 1000 },
] as const;

/** 구름 i 의 중심 y (높이 비율) — 위에서 내려와 아래로 빠진다 */
export function cloudY(cloud: { start: number; dur: number }, t: number) {
  "worklet";
  const p = (t - cloud.start) / cloud.dur;
  return -0.3 + 1.7 * Math.min(1, Math.max(0, p));
}

/** 발사대 + 언덕 — 캔버스 400×260 (화면 아래에 붙인다) */
export const GROUND_BOX = { width: 400, height: 260 } as const;
export const GROUND_SHAPES: CinemaShape[] = [
  { k: "path", d: "M0 120 Q90 70 200 96 Q300 120 400 78 L400 260 L0 260 Z", f: "#2A2160" },
  { k: "path", d: "M0 160 Q120 120 220 150 Q320 176 400 140 L400 260 L0 260 Z", f: "#1C1648" },
  // 발사대
  { k: "rect", x: 120, y: 120, width: 160, height: 26, rx: 13, f: "#3B3486" },
  { k: "rect", x: 132, y: 112, width: 136, height: 14, rx: 7, f: "#5C53C9" },
  { k: "rect", x: 150, y: 146, width: 14, height: 60, f: "#2B2560" },
  { k: "rect", x: 236, y: 146, width: 14, height: 60, f: "#2B2560" },
  { k: "path", d: "M150 132 L250 132", s: GOLD, w: 3, o: 0.8 },
  // 언덕 위 창문 불빛 (정지)
  ...[34, 62, 300, 340, 368].map((x, i): CinemaShape => ({ k: "rect", x, y: 176 + (i % 2) * 14, width: 8, height: 10, rx: 2, f: GOLD, o: 0.7 })),
];
/** 발사대 윗면 (그라운드 캔버스 기준) — 로켓 다리가 여기 닿는다 */
export const PAD_TOP_Y = 112;

/** 행성 — 캔버스 300×300, 중심 (150,150), 반지름 112 */
export const PLANET_BOX = { size: 300, cx: 150, cy: 150, r: 112 } as const;
export const PLANET_BACK: CinemaShape[] = [
  // 고리 뒤쪽 반
  { k: "path", d: "M8 162 Q150 96 292 162", s: "#FFC6E6", w: 14, round: true, o: 0.55 },
];
export const PLANET_SHAPES: CinemaShape[] = [
  { k: "circle", cx: 150, cy: 150, r: 112, f: "#8B7CF0" },
  { k: "path", d: "M150 38 A112 112 0 0 1 150 262 A80 112 0 0 0 150 38 Z", f: PURPLE_DARK, o: 0.45 },
  { k: "ellipse", cx: 112, cy: 104, rx: 26, ry: 16, f: "#FFFFFF", o: 0.12 },
  { k: "circle", cx: 196, cy: 192, r: 16, f: "#5F55C9", o: 0.7 },
  { k: "circle", cx: 92, cy: 196, r: 10, f: "#5F55C9", o: 0.6 },
  { k: "circle", cx: 206, cy: 116, r: 8, f: "#5F55C9", o: 0.55 },
];
export const PLANET_FRONT: CinemaShape[] = [
  // 고리 앞쪽 반
  { k: "path", d: "M8 162 Q150 240 292 162", s: "#FFC6E6", w: 14, round: true },
  { k: "path", d: "M30 170 Q150 222 270 170", s: "#FFFFFF", w: 3, round: true, o: 0.6 },
];

/** 깃발 — 캔버스 80×120, 기둥 아래 (12, 118). 숫자는 앱이 깃발 천 위에 쓴다 */
export const FLAG_BOX = { width: 80, height: 120, textX: 44, textY: 30 } as const;
export const FLAG_SHAPES: CinemaShape[] = [
  { k: "rect", x: 9, y: 6, width: 6, height: 114, rx: 3, f: "#E9E6FF" },
  { k: "path", d: "M15 8 L74 14 Q64 30 74 46 L15 52 Z", f: GOLD, s: GOLD_EDGE, w: 2 },
  { k: "circle", cx: 12, cy: 6, r: 6, f: GOLD },
];

/* ───────── 입자 ───────── */

const JAMO = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅏ", "ㅗ", "ㅜ", "ㅣ"];

/** 정해진 씨앗으로 섞는다 — 매번 같은 연출 */
function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export interface ExhaustParticle {
  /** 나오는 시각 */
  t0: number;
  /** 수명 */
  life: number;
  /** 나올 때 위치 (너비·높이 비율) */
  x0: number;
  y0: number;
  /** 초당 이동 (너비·높이 비율) */
  vx: number;
  vy: number;
  /** 자모 글자, 또는 "" 이면 연기 방울 */
  glyph: string;
  /** 크기 (너비 비율) */
  size: number;
  /** 초당 회전 (도) */
  spin: number;
  color: string;
}

/** 로켓 노즐 위치 (화면 비율) — 로켓 크기(너비 비율) 기준 */
export const ROCKET_WIDTH = 0.34;

export function nozzleAt(t: number, screenAspect: number) {
  // 로켓 캔버스 340 높이 = 너비*ROCKET_WIDTH*(340/200) 화면 너비 → 높이 비율로 바꾼다
  const rocketH = (ROCKET_WIDTH * (ROCKET_BOX.height / ROCKET_BOX.width)) / screenAspect;
  const centerY = cinemaAt(TRACK.rocketY, t);
  return { x: 0.5, y: centerY + rocketH * ((ROCKET_BOX.nozzleY - ROCKET_BOX.height / 2) / ROCKET_BOX.height) };
}

/**
 * 배기 — 출발부터 로켓이 사라질 때까지. 로켓은 화면에 거의 서 있고 세상이 내려가므로
 * 입자는 노즐에서 나와 아래로 빠르게 흘러간다. 자모가 섞인 불꽃 + 연기 방울.
 * screenAspect = 높이/너비
 */
export function exhaustParticles(screenAspect: number, count = 48): ExhaustParticle[] {
  const rand = seeded(20261016);
  const out: ExhaustParticle[] = [];
  const from = 2260;
  const to = 4750;
  for (let i = 0; i < count; i++) {
    // 출발 순간에 조금 더 몰아서 (앞 1/3 이 처음 0.6초에)
    const u = i / count;
    const shaped = u < 0.33 ? (u / 0.33) * 0.25 : 0.25 + ((u - 0.33) / 0.67) * 0.75;
    const t0 = from + (to - from) * shaped + rand() * 50;
    const nozzle = nozzleAt(t0, screenAspect);
    const glyph = rand() < 0.6 ? (JAMO[Math.floor(rand() * JAMO.length)] as string) : "";
    const lifting = t0 < 3150;
    const tint = rand();
    out.push({
      t0,
      life: 700 + rand() * 500,
      x0: nozzle.x + (rand() - 0.5) * 0.05,
      y0: nozzle.y + 0.012,
      vx: (rand() - 0.5) * (glyph ? 0.5 : 0.3),
      vy: lifting ? 0.32 + rand() * 0.28 : 0.7 + rand() * 0.5,
      glyph,
      size: glyph ? 0.075 + rand() * 0.05 : 0.07 + rand() * 0.07,
      spin: (rand() - 0.5) * 260,
      color: glyph ? (tint < 0.45 ? GOLD : tint < 0.75 ? "#FFB3DA" : "#FFFFFF") : "#FFFFFF",
    });
  }
  return out;
}

/** 입자 하나의 t 시점 상태 (보이지 않으면 opacity 0) */
export function particleAt(p: ExhaustParticle, t: number) {
  "worklet";
  const age = t - p.t0;
  if (age < 0 || age > p.life) return { x: p.x0, y: p.y0, opacity: 0, scale: 1, rotate: 0 };
  const s = age / 1000;
  const k = age / p.life;
  return {
    x: p.x0 + p.vx * s,
    y: p.y0 + p.vy * s,
    opacity: (k < 0.12 ? k / 0.12 : 1) * (1 - k * k),
    scale: p.glyph ? 1 - 0.3 * k : 0.6 + 1.4 * k,
    rotate: p.spin * s,
  };
}

/** 발사대 연기 방울 — 좌우로 퍼진다 (그라운드 캔버스 좌표, 너비 400 기준) */
export const PAD_PUFFS = [
  { x: 200, y: 140, dx: -120, r: 34 },
  { x: 200, y: 140, dx: 120, r: 34 },
  { x: 200, y: 150, dx: -70, r: 42 },
  { x: 200, y: 150, dx: 70, r: 42 },
  { x: 200, y: 136, dx: -165, r: 26 },
  { x: 200, y: 136, dx: 165, r: 26 },
  { x: 200, y: 154, dx: 0, r: 48 },
] as const;

export function puffAt(puff: { x: number; y: number; dx: number; r: number }, smoke: number) {
  "worklet";
  return {
    x: puff.x + puff.dx * smoke,
    y: puff.y - 10 * smoke,
    r: puff.r * (0.35 + 0.85 * smoke),
    opacity: Math.min(1, smoke * 2.2) * 0.9,
  };
}

/* ───────── 별 · 속도선 ───────── */

export const STARS = (() => {
  const rand = seeded(7);
  return Array.from({ length: 64 }, () => ({
    x: rand(),
    y: rand(),
    r: 0.8 + rand() * 1.8,
    o: 0.35 + rand() * 0.6,
  }));
})();

export const WARP_LINES = (() => {
  const rand = seeded(11);
  return Array.from({ length: 16 }, () => ({
    x: 0.04 + rand() * 0.92,
    len: 0.08 + rand() * 0.14,
    speed: 1.6 + rand() * 1.4,
    phase: rand(),
    o: 0.25 + rand() * 0.45,
  }));
})();

/** 속도선 i 의 위쪽 끝 y (높이 비율, 반복) */
export function warpY(line: { speed: number; phase: number }, t: number) {
  "worklet";
  const v = (t / 1000) * line.speed + line.phase;
  return (v - Math.floor(v)) * 1.4 - 0.3;
}
