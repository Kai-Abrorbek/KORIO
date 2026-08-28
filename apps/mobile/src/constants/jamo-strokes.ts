import { StrokePoint } from "@/types/hangul";

/**
 * 자모 획 데이터.
 *
 * 좌표계는 0~100 정사각 "자모 상자"다. 화면 좌표가 아니라 비율만 의미가 있다.
 * 음절을 만들 때 이 상자를 초성/중성/종성 자리 크기에 맞춰 늘리고 옮긴다.
 * (`utils/syllable-strokes.ts`)
 *
 * 점은 꼭짓점만 적는다. 채점기의 resample 이 선분을 따라 보간하므로
 * 촘촘한 점을 박아둘 이유가 없다 — 곡선(ㅇ, ㅎ)만 예외로 점을 깐다.
 *
 * 획 순서는 한글 표준 필순을 따른다. 위→아래, 왼쪽→오른쪽.
 * 그래서 ㅏ 는 세로가 먼저, ㅓ 는 짧은 가로가 먼저다.
 */
export type JamoStrokes = StrokePoint[][];

const p = (x: number, y: number): StrokePoint => ({ x, y });

/** 타원 한 바퀴. 시계 반대 방향(한글 ㅇ 의 필순)으로 위에서 출발한다. */
function ring(cx: number, cy: number, rx: number, ry: number): StrokePoint[] {
  const N = 16;
  const out: StrokePoint[] = [];
  for (let i = 0; i <= N; i++) {
    const a = -Math.PI / 2 - (i / N) * Math.PI * 2;
    out.push(p(cx + rx * Math.cos(a), cy + ry * Math.sin(a)));
  }
  return out;
}

/* ────────────────── 기본 자음 14 ────────────────── */

const CONSONANT: Record<string, JamoStrokes> = {
  ㄱ: [[p(10, 18), p(88, 18), p(80, 92)]],
  ㄴ: [[p(20, 10), p(20, 86), p(90, 86)]],
  ㄷ: [
    [p(12, 16), p(88, 16)],
    [p(12, 16), p(12, 88), p(88, 88)],
  ],
  ㄹ: [
    [p(12, 12), p(84, 12), p(84, 44)],
    [p(12, 44), p(84, 44)],
    [p(12, 44), p(12, 88), p(86, 88)],
  ],
  ㅁ: [
    [p(14, 12), p(14, 90)],
    [p(14, 12), p(86, 12), p(86, 90)],
    [p(14, 90), p(86, 90)],
  ],
  ㅂ: [
    [p(14, 10), p(14, 90)],
    [p(86, 10), p(86, 90)],
    [p(14, 52), p(86, 52)],
    [p(14, 90), p(86, 90)],
  ],
  ㅅ: [
    [p(52, 12), p(10, 92)],
    [p(52, 40), p(90, 92)],
  ],
  ㅇ: [ring(50, 51, 39, 40)],
  ㅈ: [
    [p(10, 18), p(90, 18)],
    [p(50, 18), p(10, 92)],
    [p(50, 44), p(90, 92)],
  ],
  ㅊ: [
    [p(50, 4), p(50, 18)],
    [p(10, 32), p(90, 32)],
    [p(50, 32), p(10, 94)],
    [p(50, 56), p(90, 94)],
  ],
  ㅋ: [
    [p(10, 16), p(88, 16), p(80, 92)],
    [p(28, 52), p(84, 52)],
  ],
  ㅌ: [
    [p(12, 14), p(88, 14)],
    [p(12, 51), p(88, 51)],
    [p(12, 14), p(12, 88), p(88, 88)],
  ],
  ㅍ: [
    [p(8, 20), p(92, 20)],
    [p(28, 20), p(28, 80)],
    [p(72, 20), p(72, 80)],
    [p(8, 80), p(92, 80)],
  ],
  ㅎ: [
    [p(50, 2), p(50, 16)],
    [p(10, 30), p(90, 30)],
    ring(50, 68, 31, 28),
  ],
};

/* ────────────────── 기본 모음 10 ────────────────── */

const VOWEL: Record<string, JamoStrokes> = {
  ㅏ: [
    [p(40, 4), p(40, 96)],
    [p(40, 50), p(88, 50)],
  ],
  ㅑ: [
    [p(40, 4), p(40, 96)],
    [p(40, 33), p(88, 33)],
    [p(40, 66), p(88, 66)],
  ],
  ㅓ: [
    [p(12, 50), p(60, 50)],
    [p(60, 4), p(60, 96)],
  ],
  ㅕ: [
    [p(12, 33), p(60, 33)],
    [p(12, 66), p(60, 66)],
    [p(60, 4), p(60, 96)],
  ],
  ㅗ: [
    [p(50, 8), p(50, 62)],
    [p(6, 62), p(94, 62)],
  ],
  ㅛ: [
    [p(31, 8), p(31, 62)],
    [p(69, 8), p(69, 62)],
    [p(6, 62), p(94, 62)],
  ],
  ㅜ: [
    [p(6, 38), p(94, 38)],
    [p(50, 38), p(50, 92)],
  ],
  ㅠ: [
    [p(6, 38), p(94, 38)],
    [p(31, 38), p(31, 92)],
    [p(69, 38), p(69, 92)],
  ],
  ㅡ: [[p(6, 50), p(94, 50)]],
  ㅣ: [[p(50, 4), p(50, 96)]],
};

/* ────────────────── 상자 안에 다시 앉히기 ────────────────── */

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** 0~100 상자에 그려진 획들을 target 상자로 옮긴다. */
export function placeStrokes(strokes: JamoStrokes, box: Box): JamoStrokes {
  return strokes.map((pts) =>
    pts.map((pt) =>
      p(box.x + (pt.x / 100) * box.w, box.y + (pt.y / 100) * box.h),
    ),
  );
}

/** 같은 자모를 좌우 반쪽에 두 번 — 쌍자음(ㄲㄸㅃㅆㅉ)을 원본에서 만든다. */
function twin(base: JamoStrokes): JamoStrokes {
  return [
    ...placeStrokes(base, { x: 0, y: 6, w: 47, h: 88 }),
    ...placeStrokes(base, { x: 53, y: 6, w: 47, h: 88 }),
  ];
}

/** 두 모음을 각자 자리에 놓아 복합모음을 만든다. */
function merge(
  a: JamoStrokes,
  aBox: Box,
  b: JamoStrokes,
  bBox: Box,
): JamoStrokes {
  return [...placeStrokes(a, aBox), ...placeStrokes(b, bBox)];
}

/* 복합모음: 가로모음이 왼쪽 아래, 세로모음이 오른쪽에 선다.
   초성이 왼쪽 위 빈자리에 들어가므로 가로모음을 아래로 내려둔다. */
const WIDE_LEFT: Box = { x: 0, y: 42, w: 60, h: 58 };
const TALL_RIGHT: Box = { x: 62, y: 0, w: 38, h: 100 };

/* ㅐㅒㅔㅖ 는 "세로모음 + ㅣ" 다. ㅙ/ㅞ 안에서도 다시 쓰므로 먼저 만들어 둔다. */
const LEFT_OF_I: Box = { x: 0, y: 0, w: 62, h: 100 };
const I_COLUMN: Box = { x: 62, y: 0, w: 38, h: 100 };
const withI = (base: JamoStrokes): JamoStrokes =>
  merge(base, LEFT_OF_I, VOWEL.ㅣ, I_COLUMN);

const AE = withI(VOWEL.ㅏ);
const E = withI(VOWEL.ㅓ);

const COMPOUND_VOWEL: Record<string, JamoStrokes> = {
  ㅐ: AE,
  ㅒ: withI(VOWEL.ㅑ),
  ㅔ: E,
  ㅖ: withI(VOWEL.ㅕ),
  // ㅢ 의 ㅡ 는 한가운데가 아니라 아래쪽에 눕는다. 가운데에 두면 ㅓ 로 읽힌다
  ㅢ: merge(VOWEL.ㅡ, { x: 0, y: 36, w: 62, h: 64 }, VOWEL.ㅣ, I_COLUMN),

  ㅘ: merge(VOWEL.ㅗ, WIDE_LEFT, VOWEL.ㅏ, TALL_RIGHT),
  ㅙ: merge(VOWEL.ㅗ, WIDE_LEFT, AE, TALL_RIGHT),
  ㅚ: merge(VOWEL.ㅗ, WIDE_LEFT, VOWEL.ㅣ, TALL_RIGHT),
  ㅝ: merge(VOWEL.ㅜ, WIDE_LEFT, VOWEL.ㅓ, TALL_RIGHT),
  ㅞ: merge(VOWEL.ㅜ, WIDE_LEFT, E, TALL_RIGHT),
  ㅟ: merge(VOWEL.ㅜ, WIDE_LEFT, VOWEL.ㅣ, TALL_RIGHT),
};

/* ────────────────── 겹받침 ────────────────── */

/** ㄳ, ㄼ 같은 겹받침은 두 자음을 좌우로 나눠 앉힌다. */
function pair(a: JamoStrokes, b: JamoStrokes): JamoStrokes {
  return [
    ...placeStrokes(a, { x: 0, y: 6, w: 47, h: 88 }),
    ...placeStrokes(b, { x: 53, y: 6, w: 47, h: 88 }),
  ];
}

/* ────────────────── 최종 표 ────────────────── */

export const JAMO_STROKES: Record<string, JamoStrokes> = {
  ...CONSONANT,
  ...VOWEL,
  ...COMPOUND_VOWEL,

  ㄲ: twin(CONSONANT.ㄱ),
  ㄸ: twin(CONSONANT.ㄷ),
  ㅃ: twin(CONSONANT.ㅂ),
  ㅆ: twin(CONSONANT.ㅅ),
  ㅉ: twin(CONSONANT.ㅈ),

  ㄳ: pair(CONSONANT.ㄱ, CONSONANT.ㅅ),
  ㄵ: pair(CONSONANT.ㄴ, CONSONANT.ㅈ),
  ㄶ: pair(CONSONANT.ㄴ, CONSONANT.ㅎ),
  ㄺ: pair(CONSONANT.ㄹ, CONSONANT.ㄱ),
  ㄻ: pair(CONSONANT.ㄹ, CONSONANT.ㅁ),
  ㄼ: pair(CONSONANT.ㄹ, CONSONANT.ㅂ),
  ㄽ: pair(CONSONANT.ㄹ, CONSONANT.ㅅ),
  ㄾ: pair(CONSONANT.ㄹ, CONSONANT.ㅌ),
  ㄿ: pair(CONSONANT.ㄹ, CONSONANT.ㅍ),
  ㅀ: pair(CONSONANT.ㄹ, CONSONANT.ㅎ),
  ㅄ: pair(CONSONANT.ㅂ, CONSONANT.ㅅ),
};

/**
 * 상자를 늘리면 모양이 무너지는 자모.
 * ㅇ 은 동그라미라 세로로 긴 초성 자리에 그냥 늘리면 달걀이 된다.
 * 슬롯 안에 정사각으로 가운데 맞춰 앉힌다.
 */
export const SQUARE_JAMO = new Set(["ㅇ"]);

/** 가로로 퍼지는 모음(초성이 위에 앉는다) */
export const WIDE_VOWELS = new Set(["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"]);

/**
 * 초성을 왼쪽 위로 밀어넣는 복합모음.
 * ㅢ 는 여기 없다 — 의·희·늬 는 초성이 왼쪽에 서므로 세로모음처럼 앉힌다.
 */
export const MIXED_VOWELS = new Set(["ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ"]);
