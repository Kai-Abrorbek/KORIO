/**
 * 레슨 결과 연출 — "참 잘했어요 도장".
 *
 * 한국 초등학교 선생님 도장처럼, 끝낸 레슨 공책 위에 하늘몬 보라 잉크 도장이 쾅 찍힌다.
 * 도장 글씨는 정답률로 정해진다 (한국어 그대로 — 뜻은 아래에 학습자 언어로).
 *   100%      참 잘했어요  + 금빛 반짝 · 별 · 꽃가루
 *   80% 이상  잘했어요     + 꽃가루
 *   그 아래   수고했어요
 *
 * 장면 (ms):
 *   0     "레슨 완료!" 가 튀어나오고, 원고지 공책이 놓여 있다
 *   250   도장이 위에서 휙 내려온다 (whoosh)
 *   620   한 번 들어 올려 숨을 고르고 (기대)
 *   950   쾅! — 화면이 흔들리고 잉크 방울이 튀며 도장 자국이 남는다
 *   1150  도장이 들려 화면 밖으로 날아간다. 하늘몬이 옆에서 튀어나온다
 *   1450  목소리가 도장 글씨를 읽어 준다. 아래에 뜻
 *   1700  기록 카드(XP · 정확도 · 스피드)가 하나씩 찍힌다 (화면이 이어서 한다)
 *
 * 좌표: 무대(정사각형) 한 변 = 1. 도장 자국 캔버스 200×200, 도장 캔버스 160×220.
 * 이 파일은 react-native 를 쓰지 않는다 — 텔레그램으로 그대로 옮길 수 있다.
 */
import {
  scallopPath,
  seeded,
  starPath,
  type CinemaCue,
  type CinemaKey,
  type CinemaShape,
  type CinemaLanguage,
} from "@/components/cinema/cinema";

export type StampTier = "perfect" | "great" | "good";

export function stampTier(accuracy: number): StampTier {
  if (accuracy >= 100) return "perfect";
  if (accuracy >= 80) return "great";
  return "good";
}

/** 도장 글씨 — 배우는 말 그대로 (한국어 코스는 선생님 도장, 영어 코스는 영어 선생님 도장) */
export const STAMP_WORDS: Record<CinemaLanguage, Record<StampTier, string>> = {
  ko: {
    perfect: "참 잘했어요",
    great: "잘했어요",
    good: "수고했어요",
  },
  en: {
    perfect: "Excellent!",
    great: "Well done!",
    good: "Good job!",
  },
};

/**
 * 도장 글씨 크기 (자국 지름 대비). 자국 안 가로 0.68 에 한 줄로 들어가게 —
 * 한글·공백은 한 칸 1em, 라틴 글자·숫자·문장부호는 0.6em 쯤이다.
 */
export function stampWordScale(word: string): number {
  let ems = 0;
  for (const ch of word) ems += /[A-Za-z0-9!?.,']/.test(ch) ? 0.6 : 1;
  return Math.min(0.16, 0.68 / ems);
}

export const STAMP_CINEMA = {
  whoosh: 250,
  impact: 950,
  lift: 1150,
  /** 기록 카드가 찍히기 시작하는 때 */
  stats: 1700,
  /** 시계가 멈추는 때 (건너뛰기도 여기로) */
  end: 2600,
} as const;

export type StampSound =
  | "whoosh"
  | "thump"
  | "fanfare"
  | "sparkle"
  | "statPop"
  | "voPerfect"
  | "voGreat"
  | "voGood";

const VOICE: Record<StampTier, StampSound> = {
  perfect: "voPerfect",
  great: "voGreat",
  good: "voGood",
};

/** 소리 큐 — 기록 카드 소리(statPop)는 카드가 찍힐 때 화면이 직접 튼다 */
export function stampSoundCues(tier: StampTier): CinemaCue<StampSound>[] {
  const cues: CinemaCue<StampSound>[] = [
    { t: STAMP_CINEMA.whoosh, sound: "whoosh" },
    { t: STAMP_CINEMA.impact - 20, sound: "thump" },
    { t: STAMP_CINEMA.impact + 120, sound: "fanfare" },
    { t: 1450, sound: VOICE[tier] },
  ];
  if (tier === "perfect") cues.push({ t: 1180, sound: "sparkle" });
  return cues.sort((a, b) => a.t - b.t);
}

export const STAMP_TRACK = {
  /** 제목 "레슨 완료!" */
  titleOpacity: [
    { t: 0, v: 0 },
    { t: 180, v: 1, e: "out" },
  ],
  titleScale: [
    { t: 0, v: 1.35 },
    { t: 320, v: 1, e: "back" },
  ],
  /** 도장 고무 바닥의 y (무대 한 변 비율, 0 = 공책에 닿음) */
  stampY: [
    { t: 0, v: -2.2 },
    { t: 250, v: -2.2 },
    { t: 620, v: -0.34, e: "out" },
    { t: 860, v: -0.56, e: "inOut" },
    { t: 950, v: 0, e: "in" },
    { t: 1150, v: 0 },
    { t: 1560, v: -2.4, e: "in" },
  ],
  stampRotate: [
    { t: 0, v: -16 },
    { t: 250, v: -16 },
    { t: 620, v: -5, e: "out" },
    { t: 860, v: 3, e: "inOut" },
    { t: 950, v: 0, e: "in" },
    { t: 1150, v: 0 },
    { t: 1560, v: 22, e: "in" },
  ],
  /** 찍힐 때 도장이 눌려 납작해진다 */
  stampSquash: [
    { t: 0, v: 1 },
    { t: 940, v: 1.06 },
    { t: 975, v: 0.84, e: "out" },
    { t: 1080, v: 1.03, e: "out" },
    { t: 1150, v: 1, e: "inOut" },
  ],
  /** 도장 자국 — 도장이 들릴 때 드러난다 (찍혀 있는 동안은 도장에 가려 있다) */
  imprint: [
    { t: 0, v: 0 },
    { t: 1150, v: 0 },
    { t: 1200, v: 1, e: "out" },
  ],
  imprintScale: [
    { t: 0, v: 1.06 },
    { t: 1150, v: 1.06 },
    { t: 1300, v: 1, e: "out" },
  ],
  /** 막 찍힌 잉크의 젖은 광택 */
  wet: [
    { t: 0, v: 0 },
    { t: 1150, v: 0 },
    { t: 1250, v: 0.55, e: "out" },
    { t: 2400, v: 0, e: "inOut" },
  ],
  /** 공책이 쾅에 눌린다 */
  paperScale: [
    { t: 0, v: 1 },
    { t: 945, v: 1 },
    { t: 985, v: 0.965, e: "out" },
    { t: 1200, v: 1, e: "back" },
  ],
  /** 충격파 고리 */
  ring: [
    { t: 0, v: 0 },
    { t: 950, v: 0 },
    { t: 1380, v: 1, e: "out" },
  ],
  /** 100% — 자국 뒤 금빛 햇살 */
  rays: [
    { t: 0, v: 0 },
    { t: 1180, v: 0 },
    { t: 1420, v: 1, e: "out" },
    { t: 2600, v: 0.6, e: "inOut" },
  ],
  /** 하늘몬 */
  mascot: [
    { t: 0, v: 0 },
    { t: 1180, v: 0 },
    { t: 1480, v: 1, e: "back" },
  ],
  /** 도장 글씨 뜻 (학습자 언어) */
  caption: [
    { t: 0, v: 0 },
    { t: 1400, v: 0 },
    { t: 1700, v: 1, e: "out" },
  ],
} as const satisfies Record<string, readonly CinemaKey[]>;

/** 충격 흔들림 크기 (px) — 결과가 좋을수록 세게 */
export const STAMP_SHAKE: Record<StampTier, number> = { perfect: 14, great: 11, good: 8 };

/* ───────── 그림 ───────── */

const INK = "#5B4DD4";
const VIOLET = "#776EE2";
const GOLD = "#FFD45C";
const GOLD_EDGE = "#E2A83A";

/** 도장 — 캔버스 160×220, 고무 바닥 (20~140, 216) */
export const STAMP_BOX = { width: 160, height: 220, faceLeft: 20, faceWidth: 120, faceY: 216 } as const;
export const STAMP_SHAPES: CinemaShape[] = [
  // 손잡이 (나무)
  { k: "circle", cx: 80, cy: 34, r: 30, f: "#D99A5B" },
  { k: "path", d: "M80 4 A30 30 0 0 1 80 64 A20 30 0 0 0 80 4 Z", f: "#B87638", o: 0.55 },
  { k: "ellipse", cx: 68, cy: 22, rx: 10, ry: 6, f: "#FFFFFF", o: 0.35 },
  { k: "rect", x: 63, y: 56, width: 34, height: 68, rx: 10, f: "#C9853F" },
  { k: "rect", x: 83, y: 56, width: 14, height: 68, rx: 6, f: "#A86A2E", o: 0.6 },
  // 금 띠
  { k: "rect", x: 42, y: 118, width: 76, height: 18, rx: 8, f: GOLD, s: GOLD_EDGE, w: 2 },
  // 몸통 (하늘몬 보라)
  { k: "rect", x: 16, y: 134, width: 128, height: 64, rx: 16, f: VIOLET },
  { k: "path", d: "M112 134 L128 134 Q144 134 144 150 L144 182 Q144 198 128 198 L112 198 Z", f: INK, o: 0.5 },
  { k: "rect", x: 26, y: 144, width: 30, height: 8, rx: 4, f: "#FFFFFF", o: 0.35 },
  // 고무 바닥 (잉크 묻은)
  { k: "rect", x: 20, y: 194, width: 120, height: 24, rx: 7, f: "#3E3398" },
  { k: "rect", x: 20, y: 210, width: 120, height: 8, rx: 4, f: INK },
];

/** 도장 자국 캔버스 */
export const IMPRINT_BOX = { size: 200, cx: 100, cy: 100 } as const;

/**
 * 도장 자국 — 물결 테두리 두 겹 + 하늘몬 외눈 얼굴. 글씨는 화면이 아래쪽에 쓴다.
 * ink = 잉크 색 (어두운 테마에선 밝은 보라)
 */
export function imprintShapes(ink: string): CinemaShape[] {
  return [
    { k: "path", d: scallopPath(100, 100, 96, 14, 7), f: "none", s: ink, w: 7 },
    { k: "circle", cx: 100, cy: 100, r: 78, f: "none", s: ink, w: 3 },
    // 하늘몬 외눈 얼굴 (위쪽) — 더듬이 둘, 큰 눈, 웃는 입
    { k: "path", d: "M84 34 L78 22", s: ink, w: 4, round: true },
    { k: "circle", cx: 77, cy: 20, r: 4.5, f: ink },
    { k: "path", d: "M116 34 L122 22", s: ink, w: 4, round: true },
    { k: "circle", cx: 123, cy: 20, r: 4.5, f: ink },
    { k: "circle", cx: 100, cy: 60, r: 24, f: "none", s: ink, w: 4.5 },
    { k: "circle", cx: 100, cy: 58, r: 15, f: "none", s: ink, w: 4 },
    { k: "circle", cx: 100, cy: 58, r: 7, f: ink },
    { k: "path", d: "M88 78 Q100 88 112 78", s: ink, w: 4, round: true },
  ];
}

/** 100% 일 때 테두리 밖 작은 별 셋 */
export const IMPRINT_STARS: CinemaShape[] = [
  { k: "path", d: starPath(26, 30, 12, 5), f: GOLD, s: GOLD_EDGE, w: 1.5 },
  { k: "path", d: starPath(176, 36, 9, 4), f: GOLD, s: GOLD_EDGE, w: 1.5 },
  { k: "path", d: starPath(180, 168, 11, 4.5), f: GOLD, s: GOLD_EDGE, w: 1.5 },
];

/** 잉크가 덜 묻은 자리 (종이 색 점) — 진짜 도장 같은 거친 맛. 자국 캔버스 좌표 */
export const INK_GAPS = (() => {
  const rand = seeded(1950);
  return Array.from({ length: 22 }, () => {
    const a = rand() * Math.PI * 2;
    const r = 70 + rand() * 30;
    return { cx: 100 + Math.cos(a) * r, cy: 100 + Math.sin(a) * r, r: 0.8 + rand() * 2.2, o: 0.55 + rand() * 0.4 };
  });
})();

/** 쾅 할 때 튀는 잉크 방울 — 공책에 그대로 남는다. 무대 비율 */
export const INK_DROPS = (() => {
  const rand = seeded(20261020);
  return Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2 + (rand() - 0.5) * 0.4;
    return {
      angle: a,
      dist: 0.4 + rand() * 0.12,
      size: 0.012 + rand() * 0.022,
      delay: rand() * 40,
    };
  });
})();

/** 잉크 방울 하나 (t 시점) — 0.12초 만에 튀어 나가 멈춘다 */
export function dropAt(drop: (typeof INK_DROPS)[number], t: number) {
  "worklet";
  const start = STAMP_CINEMA.impact + drop.delay;
  if (t < start) return { r: 0, opacity: 0, scale: 0 };
  const p = Math.min(1, (t - start) / 140);
  const k = 1 - (1 - p) * (1 - p) * (1 - p);
  return { r: drop.dist * (0.55 + 0.45 * k), opacity: 1, scale: 0.4 + 0.6 * k };
}

/** 100% — 금빛 별이 자국 둘레에서 튀어나간다 */
export const BURST_STARS = (() => {
  const rand = seeded(100);
  return Array.from({ length: 8 }, (_, i) => ({
    angle: (i / 8) * Math.PI * 2 + 0.2,
    dist: 0.55 + rand() * 0.2,
    size: 0.05 + rand() * 0.035,
    spin: (rand() - 0.5) * 540,
  }));
})();

export function burstStarAt(star: (typeof BURST_STARS)[number], t: number) {
  "worklet";
  const start = 1160;
  const life = 900;
  const age = t - start;
  if (age < 0 || age > life) return { r: 0, opacity: 0, scale: 0, rotate: 0 };
  const k = age / life;
  const e = 1 - (1 - k) * (1 - k) * (1 - k);
  return {
    r: star.dist * e,
    opacity: k < 0.7 ? 1 : (1 - k) / 0.3,
    scale: k < 0.2 ? k / 0.2 : 1 - 0.4 * (k - 0.2),
    rotate: star.spin * k,
  };
}

/** 금빛 햇살 (100%) — 자국 뒤로 도는 12 갈래. 캔버스 200×200 */
export const RAY_SHAPES: CinemaShape[] = Array.from({ length: 12 }, (_, i): CinemaShape => {
  const a = (i / 12) * Math.PI * 2;
  const w = 0.11;
  const p = (ang: number, r: number) => `${(100 + Math.cos(ang) * r).toFixed(1)} ${(100 + Math.sin(ang) * r).toFixed(1)}`;
  return { k: "path", d: `M${p(a - w, 30)} L${p(a - w * 0.6, 100)} L${p(a + w * 0.6, 100)} L${p(a + w, 30)} Z`, f: GOLD, o: 0.32 };
});
