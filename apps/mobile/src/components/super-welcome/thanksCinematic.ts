/**
 * 구독 결제 감사 연출 — "한글 열쇠".
 *
 * ⚠️ 이 파일은 두 앱에 **똑같이** 있다 — 고치면 같이 고친다.
 *   텔레그램 shared/model/thanks-cinematic.ts · 모바일 components/super-welcome/thanksCinematic.ts
 * 그림(도형 목록)과 시간표(키프레임)만 여기 있고, 각 앱이 자기 방식으로 그리고 돌린다
 * (레벨업 로켓과 같은 방식 — 텔레그램 requestAnimationFrame, 모바일 reanimated).
 *
 * 장면 (ms):
 *   0     밤, 단청 궁궐 대문. 문엔 금 자물쇠(ㅁ 몸통 · ㅇ 열쇠 구멍), 양옆 청사초롱은 꺼져 있다
 *   450   결제가 열쇠가 되어 날아온다 — 한글로 만든 금 열쇠 (ㅇ 고리 · ㅡ 몸통 · ㅌ 이빨)
 *   1450  열쇠가 구멍으로 쏙 · 1700 "딸깍" 돌린다 · 1950 자물쇠가 자모 조각으로 흩어진다
 *   2150  대문이 활짝 열리고 금빛이 쏟아진다, 초롱에 불이 들어온다
 *   2700  카메라가 빛 속으로 뚫고 들어간다 → 3420 번쩍
 *   3420  새벽빛 궁궐 — 자모 불꽃놀이, 내 아바타, "감사합니다!" (영어 코스는 "Thank you!")
 *   4450~ 열린 혜택이 청사초롱처럼 하나씩 켜진다 → 5300 시작 버튼
 *
 * 좌표: 그림은 각자 캔버스 단위, 화면 자리는 앱이 대문 캔버스(GATE_BOX)를 화면 너비에 맞춰 놓고 계산한다.
 * 열쇠 궤적은 열쇠 구멍 기준, 화면 너비(W) 단위다.
 */
import { cinemaAt, seeded, type CinemaCue, type CinemaKey, type CinemaShape } from "@/components/cinema/cinema";

/* ───────── 시간표 ───────── */

export const THANKS = {
  /** 여기서부터 결과 화면 (건너뛰기·동작 줄이기도 여기로) */
  reveal: 3420,
  /** 결과가 다 떠오른 시각 — 시계는 여기서 멈춘다 */
  end: 5600,
  /** 혜택 초롱이 켜지는 시각 (넷) */
  perks: [4450, 4650, 4850, 5050] as const,
  cta: 5300,
} as const;

export type ThanksSound = "keyFly" | "unlock" | "gate" | "light" | "fireworks" | "voThanks" | "lantern";

/** 소리 큐 — 각 앱이 이 시각에 튼다 (파일은 tools/cinema-audio --set=thanks, 불꽃은 streak/fireworks) */
export const THANKS_SOUND_CUES: readonly CinemaCue<ThanksSound>[] = [
  { t: 450, sound: "keyFly" },
  { t: 1700, sound: "unlock" },
  { t: 2100, sound: "gate" },
  { t: 2700, sound: "light" },
  { t: 3480, sound: "fireworks" },
  { t: 3560, sound: "voThanks" },
  ...THANKS.perks.map((t) => ({ t, sound: "lantern" as const })),
  { t: 4380, sound: "fireworks" },
];

/** 소리마다 크기 — 목소리가 효과음에 묻히지 않게 */
export const THANKS_GAINS: Record<ThanksSound, number> = {
  keyFly: 0.7,
  unlock: 0.9,
  gate: 0.85,
  light: 0.7,
  fireworks: 0.55,
  voThanks: 1,
  lantern: 0.45,
};

/** 진동 — 각 앱이 이 시각에 */
export const THANKS_HAPTICS = [
  { t: 1700, kind: "medium" },
  { t: 2150, kind: "light" },
  { t: THANKS.reveal, kind: "success" },
  ...THANKS.perks.map((t) => ({ t, kind: "light" as const })),
] as const;

/** 크게 외치는 인사 — 배우는 말로 (CinemaLanguage) */
export const THANKS_WORD: Record<"ko" | "en", string> = {
  ko: "감사합니다",
  en: "Thank you!",
};

export const TRACK = {
  /** 위쪽 안내 칩 ("To‘lov qabul qilindi") */
  chip: [
    { t: 0, v: 0 },
    { t: 200, v: 0 },
    { t: 520, v: 1, e: "out" },
    { t: 2050, v: 1 },
    { t: 2350, v: 0 },
  ],
  /** 열쇠 — 열쇠 구멍 기준 자리 (화면 너비 단위). 아래에서 휘어 올라와 구멍 위에 선다 */
  keyX: [
    { t: 0, v: -0.22 },
    { t: 450, v: -0.22 },
    { t: 1100, v: 0.06, e: "out" },
    { t: 1450, v: 0, e: "inOut" },
  ],
  keyY: [
    { t: 0, v: 1.35 },
    { t: 450, v: 1.35 },
    { t: 1100, v: -0.3, e: "out" },
    { t: 1450, v: -0.16, e: "inOut" },
    // 구멍으로 쏙
    { t: 1640, v: 0, e: "in" },
    // 자물쇠와 같이 떨어진다
    { t: 2000, v: 0 },
    { t: 2500, v: 0.9, e: "in" },
  ],
  /** 열쇠 회전 (도) — 90 = 고리가 위, 이빨이 아래. 두 바퀴 돌며 날아와 서고, 1700 에 딸깍 돌린다 */
  keyRot: [
    { t: 0, v: 90 - 720 },
    { t: 450, v: 90 - 720 },
    { t: 1450, v: 90, e: "out" },
    { t: 1700, v: 90 },
    { t: 1880, v: 180, e: "back" },
    { t: 2000, v: 180 },
    { t: 2500, v: 240, e: "in" },
  ],
  keyScale: [
    { t: 0, v: 1.9 },
    { t: 450, v: 1.9 },
    { t: 1300, v: 1, e: "out" },
  ],
  /** 열쇠 둘레 빛 */
  keyGlow: [
    { t: 0, v: 0 },
    { t: 450, v: 0.9 },
    { t: 1450, v: 0.6 },
    { t: 1700, v: 1 },
    { t: 1950, v: 0, e: "out" },
  ],
  /** 열쇠·자물쇠 투명도 — 떨어지며 사라진다 */
  lockAlpha: [
    { t: 0, v: 1 },
    { t: 2050, v: 1 },
    { t: 2450, v: 0, e: "in" },
  ],
  /** 고리(shackle) 위로 튐 (대문 캔버스 단위) */
  shackle: [
    { t: 0, v: 0 },
    { t: 1900, v: 0 },
    { t: 2000, v: -16, e: "back" },
  ],
  /** 자물쇠 몸통 떨어짐 (대문 캔버스 단위) · 기울기 */
  lockFall: [
    { t: 0, v: 0 },
    { t: 2000, v: 0 },
    { t: 2500, v: 260, e: "in" },
  ],
  lockTilt: [
    { t: 0, v: 0 },
    { t: 1720, v: 0 },
    { t: 1780, v: -6, e: "out" },
    { t: 1860, v: 4 },
    { t: 1940, v: 0 },
    { t: 2000, v: 0 },
    { t: 2500, v: 28, e: "in" },
  ],
  /** 대문 열림 (도) — 왼쪽 문은 음수, 오른쪽 문은 양수로 */
  door: [
    { t: 0, v: 0 },
    { t: 2150, v: 0 },
    // 무거운 문이라 처음엔 천천히, 그다음 활짝
    { t: 2350, v: 9, e: "in" },
    { t: 3050, v: 104, e: "out" },
  ],
  /** 문 너머 빛 0~1 */
  light: [
    { t: 0, v: 0 },
    { t: 2150, v: 0 },
    { t: 2650, v: 1, e: "out" },
  ],
  /** 밤 초롱에 불 */
  nightLanterns: [
    { t: 0, v: 0 },
    { t: 2300, v: 0 },
    { t: 2650, v: 1, e: "out" },
  ],
  /** 카메라 — 문 가운데로 밀고 들어간다 (배율) */
  dive: [
    { t: 0, v: 1 },
    { t: 300, v: 1 },
    // 처음엔 아주 천천히 다가간다
    { t: 2650, v: 1.08, e: "inOut" },
    { t: 3420, v: 5.2, e: "in" },
  ],
  /** 번쩍 */
  flash: [
    { t: 0, v: 0 },
    { t: 3150, v: 0 },
    { t: 3420, v: 0.96, e: "in" },
    { t: 3950, v: 0, e: "out" },
  ],
  /** 새벽 장면 (결과 바탕) */
  dawn: [
    { t: 0, v: 0 },
    { t: 3400, v: 0 },
    { t: 3430, v: 1 },
  ],
  /** 결과 화면 카메라 — 살짝 크게 시작해 자리 잡는다 */
  settle: [
    { t: 0, v: 1.12 },
    { t: 3420, v: 1.12 },
    { t: 4300, v: 1, e: "out" },
  ],
  /** 아바타 등장 */
  hero: [
    { t: 0, v: 0 },
    { t: 3420, v: 0 },
    { t: 3900, v: 1, e: "back" },
  ],
  /** 큰 인사 · 손편지 · 등급 제목 */
  words: [
    { t: 0, v: 0 },
    { t: 3560, v: 0 },
    { t: 3900, v: 1, e: "back" },
  ],
  letter: [
    { t: 0, v: 0 },
    { t: 3850, v: 0 },
    { t: 4250, v: 1, e: "out" },
  ],
  title: [
    { t: 0, v: 0 },
    { t: 4100, v: 0 },
    { t: 4450, v: 1, e: "out" },
  ],
  cta: [
    { t: 0, v: 0 },
    { t: THANKS.cta, v: 0 },
    { t: THANKS.cta + 300, v: 1, e: "out" },
  ],
  /** 빛줄기 회전 (도) — 계속 천천히 */
  rays: [
    { t: 0, v: 0 },
    { t: THANKS.end, v: 34 },
  ],
} as const satisfies Record<string, readonly CinemaKey[]>;

/** 혜택 초롱 i 가 켜지는 정도 0~1 (켜질 때 살짝 넘친다) */
export function perkAt(i: number, t: number): number {
  "worklet";
  const at = THANKS.perks[i] ?? THANKS.perks[0];
  if (t <= at) return 0;
  const p = Math.min(1, (t - at) / 420);
  const c = 1.70158;
  return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2);
}

/* ───────── 색 ───────── */

const GOLD = "#FFD45C";
const GOLD_EDGE = "#E2A83A";
const GOLD_DEEP = "#B97F1C";
const CRIMSON = "#8E2C2C";
const CRIMSON_DARK = "#6E1F22";
const PILLAR = "#A7362F";
const SLATE = "#2E2A52";
const SLATE_LIGHT = "#3E3870";
const JADE = "#1F7A6A";

/* ───────── 대문 — 캔버스 400×420 ─────────
 * 화면 너비에 맞춰 놓고, 아래 끝이 화면 높이 GATE_BOTTOM 에 온다.
 * 문 두 짝·자물쇠·초롱은 따로 그려서 움직인다 (자리는 아래 상수).
 */
export const GATE_BOX = { width: 400, height: 420 } as const;
export const GATE_BOTTOM = 0.8;
/** 문이 열리는 구멍 (대문 캔버스) — 앱이 빛을 이 안에 그린다 */
export const DOORWAY = { x: 78, y: 148, width: 244, height: 232 } as const;
/** 열쇠 구멍 (대문 캔버스) — 카메라도 여기로 밀고 들어간다 */
export const KEYHOLE = { x: 200, y: 268 } as const;

const DANCHEONG_DOTS: CinemaShape[] = Array.from({ length: 13 }, (_, i): CinemaShape => ({
  k: "circle",
  cx: 56 + i * 24,
  cy: 127,
  r: 4.5,
  f: i % 3 === 0 ? "#E2534A" : i % 3 === 1 ? GOLD : "#FFFFFF",
  o: 0.95,
}));

const ROOF_LINES = Array.from({ length: 15 }, (_, i) => {
  const x = 78 + i * 17.4;
  return `M${x} ${92 - Math.max(0, 40 - Math.abs(x - 200) * 0.32)} L${x} 108`;
}).join(" ");

export const GATE_SHAPES: CinemaShape[] = [
  // 바닥 돌계단
  { k: "rect", x: 24, y: 376, width: 352, height: 18, rx: 4, f: "#4B4580" },
  { k: "rect", x: 0, y: 392, width: 400, height: 28, f: "#2F2A5C" },
  { k: "path", d: "M24 386 L376 386", s: "#5F58A0", w: 2, o: 0.7 },
  // 문 구멍 안쪽 (닫혔을 때 보이는 어둠 — 빛은 앱이 위에 그린다)
  { k: "rect", x: 78, y: 148, width: 244, height: 232, f: "#120E2A" },
  // 기둥 (붉은 칠 + 그늘)
  { k: "rect", x: 50, y: 146, width: 30, height: 236, f: PILLAR },
  { k: "rect", x: 70, y: 146, width: 10, height: 236, f: "#86261F", o: 0.8 },
  { k: "rect", x: 320, y: 146, width: 30, height: 236, f: PILLAR },
  { k: "rect", x: 340, y: 146, width: 10, height: 236, f: "#86261F", o: 0.8 },
  { k: "rect", x: 44, y: 370, width: 42, height: 12, rx: 3, f: "#5A5296" },
  { k: "rect", x: 314, y: 370, width: 42, height: 12, rx: 3, f: "#5A5296" },
  // 문틀 위 보
  { k: "rect", x: 44, y: 138, width: 312, height: 12, f: "#B8433C" },
  // 단청 띠 (옥색 + 점무늬)
  { k: "rect", x: 44, y: 116, width: 312, height: 22, f: JADE },
  { k: "rect", x: 44, y: 116, width: 312, height: 4, f: "#2EA58C", o: 0.8 },
  ...DANCHEONG_DOTS,
  // 처마 (끝이 들린 기와지붕)
  { k: "path", d: "M60 94 Q120 48 200 44 Q280 48 340 94 Z", f: SLATE_LIGHT },
  { k: "path", d: ROOF_LINES, s: "#4F4890", w: 3, o: 0.55 },
  { k: "path", d: "M4 118 Q30 100 64 94 L336 94 Q370 100 396 118 Q376 120 352 118 L48 118 Q24 120 4 118 Z", f: SLATE },
  { k: "path", d: "M48 112 L352 112", s: "#4A4486", w: 2, o: 0.8 },
  // 용마루 + 양 끝 치미
  { k: "rect", x: 118, y: 36, width: 164, height: 12, rx: 6, f: "#221E40" },
  { k: "path", d: "M118 42 Q104 40 100 26 Q112 30 122 36 Z", f: "#221E40" },
  { k: "path", d: "M282 42 Q296 40 300 26 Q288 30 278 36 Z", f: "#221E40" },
  // 현판 (금 테두리)
  { k: "rect", x: 166, y: 62, width: 68, height: 26, rx: 4, f: "#1E1A3A", s: GOLD_EDGE, w: 2 },
  { k: "path", d: "M178 75 L222 75", s: GOLD, w: 3, o: 0.85, round: true },
];

/** 문 한 짝 — 캔버스 122×232. 왼쪽 문은 경첩이 왼쪽, 오른쪽 문은 그대로 좌우를 뒤집어 쓴다 */
export const DOOR_BOX = { width: 122, height: 232 } as const;

const STUDS: CinemaShape[] = [34, 58, 104, 128, 180, 204].flatMap((y) =>
  [26, 48, 70, 92].map((x): CinemaShape => ({ k: "circle", cx: x, cy: y, r: 3.4, f: "#E9B84A" })),
);

export const DOOR_SHAPES: CinemaShape[] = [
  { k: "rect", x: 0, y: 0, width: 122, height: 232, f: CRIMSON },
  { k: "rect", x: 10, y: 12, width: 102, height: 208, rx: 4, f: "none", s: CRIMSON_DARK, w: 4 },
  { k: "rect", x: 10, y: 78, width: 102, height: 8, f: CRIMSON_DARK, o: 0.8 },
  { k: "rect", x: 10, y: 154, width: 102, height: 8, f: CRIMSON_DARK, o: 0.8 },
  ...STUDS,
  // 문고리 (가운데 쪽 — 오른쪽 끝)
  { k: "circle", cx: 106, cy: 128, r: 5, f: GOLD_EDGE },
  { k: "circle", cx: 106, cy: 140, r: 9, f: "none", s: GOLD, w: 3 },
  // 경첩 쪽 그늘
  { k: "rect", x: 0, y: 0, width: 14, height: 232, f: "#000000", o: 0.18 },
];

/** 청사초롱 — 캔버스 56×100, 매다는 끈 위 끝 (28, 0). 불은 앱이 뒤에 빛으로 깐다 */
export const LANTERN_BOX = { width: 56, height: 100, glowX: 28, glowY: 58 } as const;
export const LANTERN_SHAPES: CinemaShape[] = [
  { k: "path", d: "M28 0 L28 16", s: "#C9A04A", w: 2 },
  { k: "rect", x: 16, y: 14, width: 24, height: 8, rx: 2, f: "#3A2E1E" },
  // 위 파랑 · 아래 빨강 (청사초롱)
  { k: "path", d: "M8 30 Q8 22 28 22 Q48 22 48 30 L48 58 L8 58 Z", f: "#2F5AAE" },
  { k: "path", d: "M8 58 L48 58 L48 84 Q48 92 28 92 Q8 92 8 84 Z", f: "#C8423C" },
  { k: "path", d: "M28 22 L28 92", s: "#FFFFFF", w: 1.5, o: 0.25 },
  { k: "rect", x: 16, y: 90, width: 24, height: 6, rx: 2, f: "#3A2E1E" },
  { k: "path", d: "M24 96 L24 100 M28 96 L28 100 M32 96 L32 100", s: "#E2534A", w: 2 },
];
/** 초롱 자리 (대문 캔버스) — 처마 끝에 매단다 */
export const NIGHT_LANTERNS = [
  { x: 22, y: 120 },
  { x: 378, y: 120 },
] as const;

/** 자물쇠 — 캔버스 70×96, 열쇠 구멍 (35, 60). 고리는 따로 (위로 튄다) */
export const LOCK_BOX = { width: 70, height: 96, holeX: 35, holeY: 60 } as const;
export const LOCK_SHACKLE: CinemaShape[] = [
  { k: "path", d: "M19 46 L19 26 Q19 6 35 6 Q51 6 51 26 L51 46", f: "none", s: GOLD_DEEP, w: 10, round: true },
  { k: "path", d: "M19 46 L19 26 Q19 6 35 6 Q51 6 51 26 L51 46", f: "none", s: GOLD_EDGE, w: 6, round: true },
];
export const LOCK_BODY: CinemaShape[] = [
  // ㅁ — 몸통
  { k: "rect", x: 5, y: 38, width: 60, height: 52, rx: 12, f: GOLD, s: GOLD_EDGE, w: 3 },
  { k: "rect", x: 13, y: 46, width: 44, height: 36, rx: 7, f: "none", s: GOLD_EDGE, w: 2, o: 0.7 },
  // ㅇ — 열쇠 구멍
  { k: "circle", cx: 35, cy: 60, r: 7.5, f: "#3B2A0E" },
  { k: "rect", x: 32, y: 62, width: 6, height: 14, rx: 3, f: "#3B2A0E" },
  { k: "path", d: "M14 50 Q16 44 24 42", s: "#FFFFFF", w: 3, o: 0.6, round: true },
];

/**
 * 한글 열쇠 — 캔버스 180×70. 축은 가로 (고리 왼쪽, 이빨 오른쪽).
 *   ㅇ 고리 · ㅡ 몸통 · ㅌ 이빨 (몸통이 ㅌ 의 윗획, 아래로 두 획 + 세로획)
 * 회전 중심 = 이빨이 시작하는 곳 (KEY_BOX.pivotX) — 앱이 여기를 열쇠 구멍에 맞춘다.
 */
export const KEY_BOX = { width: 180, height: 70, pivotX: 134, pivotY: 35 } as const;
export const KEY_SHAPES: CinemaShape[] = [
  // ㅇ — 고리
  { k: "circle", cx: 34, cy: 35, r: 24, f: "none", s: GOLD_EDGE, w: 13 },
  { k: "circle", cx: 34, cy: 35, r: 24, f: "none", s: GOLD, w: 8 },
  { k: "path", d: "M20 22 Q26 15 36 14", s: "#FFF6CF", w: 3, o: 0.8, round: true },
  // ㅡ — 몸통
  { k: "rect", x: 56, y: 29, width: 112, height: 12, rx: 6, f: GOLD, s: GOLD_EDGE, w: 2 },
  { k: "path", d: "M62 32 L160 32", s: "#FFF6CF", w: 2.5, o: 0.7, round: true },
  // ㅌ — 이빨 (세로획 + 아래 두 획)
  { k: "rect", x: 134, y: 29, width: 9, height: 34, rx: 3, f: GOLD, s: GOLD_EDGE, w: 2 },
  { k: "rect", x: 134, y: 42, width: 32, height: 8, rx: 3, f: GOLD, s: GOLD_EDGE, w: 2 },
  { k: "rect", x: 134, y: 55, width: 32, height: 8, rx: 3, f: GOLD, s: GOLD_EDGE, w: 2 },
];

/** 빛줄기 — 캔버스 400×400, 가운데 (200,200)에서 사방으로. 앱이 돌린다 */
export const RAYS_BOX = { size: 400 } as const;
export const RAY_SHAPES: CinemaShape[] = Array.from({ length: 14 }, (_, i): CinemaShape => {
  const a = (i / 14) * Math.PI * 2;
  const spread = i % 2 === 0 ? 0.11 : 0.06;
  const r = 210;
  const p = (ang: number) => `${(200 + Math.cos(ang) * r).toFixed(1)} ${(200 + Math.sin(ang) * r).toFixed(1)}`;
  return { k: "path", d: `M200 200 L${p(a - spread)} L${p(a + spread)} Z`, f: "#FFF1C2", o: i % 2 === 0 ? 0.55 : 0.32 };
});

/** 결과 장면의 먼 궁궐 지붕 — 캔버스 400×80 (아바타 발밑 뒤) */
export const FAR_ROOF_BOX = { width: 400, height: 80 } as const;
export const FAR_ROOF_SHAPES: CinemaShape[] = [
  { k: "path", d: "M0 52 Q60 40 110 36 L290 36 Q340 40 400 52 L400 80 L0 80 Z", f: "#3B2A7E", o: 0.55 },
  { k: "path", d: "M120 36 Q160 12 200 10 Q240 12 280 36 Z", f: "#4A3596", o: 0.55 },
  { k: "path", d: "M60 60 L340 60", s: "#FFD45C", w: 2, o: 0.35 },
];

/** 등급 메달 (아바타가 없을 때) — 캔버스 160×200 */
export const MEDAL_BOX = { width: 160, height: 200, textY: 104 } as const;
export const MEDAL_SHAPES: CinemaShape[] = [
  { k: "path", d: "M52 140 L36 196 L60 184 L74 200 L86 146 Z", f: "#C8423C" },
  { k: "path", d: "M108 140 L124 196 L100 184 L86 200 L74 146 Z", f: "#2F5AAE" },
  { k: "circle", cx: 80, cy: 100, r: 66, f: GOLD_EDGE },
  { k: "circle", cx: 80, cy: 100, r: 58, f: GOLD },
  { k: "circle", cx: 80, cy: 100, r: 46, f: "none", s: GOLD_EDGE, w: 3, o: 0.8 },
  { k: "path", d: "M44 74 Q56 50 84 46", s: "#FFF6CF", w: 5, o: 0.7, round: true },
];

/* ───────── 별 ───────── */

export const STARS = (() => {
  const rand = seeded(20261026);
  return Array.from({ length: 56 }, () => ({
    x: rand(),
    y: rand() * 0.55,
    r: 0.8 + rand() * 1.7,
    o: 0.35 + rand() * 0.6,
  }));
})();

/* ───────── 입자 — 자물쇠가 깨질 때 · 불꽃놀이 ───────── */

const JAMO = ["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅏ", "ㅗ", "ㅜ", "ㅣ"];

export interface Spark {
  t0: number;
  life: number;
  /** 터지는 곳 — 화면 비율 (너비·높이) */
  x0: number;
  y0: number;
  /** 초당 속도 (화면 너비 단위) */
  vx: number;
  vy: number;
  /** 아래로 끌리는 힘 (화면 너비/초²) */
  g: number;
  glyph: string;
  /** 크기 (화면 너비 비율) */
  size: number;
  spin: number;
  color: string;
}

/** 불꽃놀이 — 결과 화면 위쪽에서 차례로 터진다 */
export const FIREWORKS = [
  { t: 3480, x: 0.24, y: 0.15, colors: [GOLD, "#FFFFFF", "#FFB3DA"] },
  { t: 3720, x: 0.78, y: 0.11, colors: ["#FFB3DA", GOLD, "#B9B3FF"] },
  { t: 4020, x: 0.52, y: 0.06, colors: [GOLD, "#FFFFFF", "#9EE8FF"] },
  { t: 4380, x: 0.14, y: 0.24, colors: ["#B9B3FF", GOLD, "#FFFFFF"] },
  { t: 4700, x: 0.86, y: 0.23, colors: [GOLD, "#FFB3DA", "#FFFFFF"] },
] as const;

/** 자물쇠가 깨지는 곳 = 열쇠 구멍. 앱이 화면 비율로 넘겨준다 */
export function lockSparks(holeX: number, holeY: number): Spark[] {
  const rand = seeded(1950);
  return Array.from({ length: 16 }, (_, i): Spark => {
    const a = -Math.PI / 2 + (i / 16 - 0.5) * Math.PI * 1.6 + (rand() - 0.5) * 0.3;
    const v = 0.35 + rand() * 0.35;
    return {
      t0: 1960 + rand() * 60,
      life: 750 + rand() * 350,
      x0: holeX,
      y0: holeY,
      vx: Math.cos(a) * v,
      vy: Math.sin(a) * v,
      g: 1.6,
      glyph: rand() < 0.7 ? (JAMO[Math.floor(rand() * JAMO.length)] as string) : "",
      size: 0.045 + rand() * 0.035,
      spin: (rand() - 0.5) * 520,
      color: rand() < 0.75 ? GOLD : "#FFFFFF",
    };
  });
}

export function fireworkSparks(): Spark[] {
  const rand = seeded(4380);
  const out: Spark[] = [];
  for (const burst of FIREWORKS) {
    const n = 18;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + (rand() - 0.5) * 0.25;
      const v = 0.26 + rand() * 0.16;
      const glyph = i % 2 === 0 ? (JAMO[Math.floor(rand() * JAMO.length)] as string) : "";
      out.push({
        t0: burst.t + rand() * 30,
        life: 1100 + rand() * 400,
        x0: burst.x,
        y0: burst.y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v,
        g: 0.22,
        glyph,
        size: glyph ? 0.05 + rand() * 0.025 : 0.02 + rand() * 0.015,
        spin: (rand() - 0.5) * 300,
        color: burst.colors[Math.floor(rand() * burst.colors.length)] as string,
      });
    }
  }
  return out;
}

/** 입자 하나의 t 시점 상태 — x·y 는 화면 비율, aspect = 높이/너비 */
export function sparkAt(p: Spark, t: number, aspect: number) {
  "worklet";
  const age = t - p.t0;
  if (age < 0 || age > p.life) return { x: p.x0, y: p.y0, opacity: 0, scale: 1, rotate: 0 };
  const s = age / 1000;
  const k = age / p.life;
  // 공기 저항 — 처음엔 쭉, 갈수록 느려진다
  const drag = 1 - 0.38 * Math.min(1, s * 1.4);
  return {
    x: p.x0 + p.vx * s * drag,
    y: p.y0 + (p.vy * s * drag + 0.5 * p.g * s * s) / aspect,
    opacity: (k < 0.08 ? k / 0.08 : 1) * (1 - k * k),
    scale: p.glyph ? 1 - 0.35 * k : 1.2 - 0.6 * k,
    rotate: p.spin * s,
  };
}

/** 열쇠 꼬리 빛 — 지금보다 조금 전 자리들 (ms 전) */
export const KEY_TRAIL = [40, 80, 120, 160, 200, 240] as const;

/** 열쇠 자리 (열쇠 구멍 기준, 화면 너비 단위) · 회전 · 크기 */
export function keyAt(t: number) {
  "worklet";
  return {
    dx: cinemaAt(TRACK.keyX, t),
    dy: cinemaAt(TRACK.keyY, t),
    rot: cinemaAt(TRACK.keyRot, t),
    scale: cinemaAt(TRACK.keyScale, t),
  };
}
