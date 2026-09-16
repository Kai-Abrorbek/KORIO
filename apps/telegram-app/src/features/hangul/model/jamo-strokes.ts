import type { StrokePoint } from "./hangul";

export type JamoStrokes = StrokePoint[][];

const point = (x: number, y: number): StrokePoint => ({ x, y });

function ring(
  centerX: number,
  centerY: number,
  radiusX: number,
  radiusY: number,
): StrokePoint[] {
  const count = 16;
  const points: StrokePoint[] = [];
  for (let index = 0; index <= count; index += 1) {
    const angle = -Math.PI / 2 - (index / count) * Math.PI * 2;
    points.push(
      point(
        centerX + radiusX * Math.cos(angle),
        centerY + radiusY * Math.sin(angle),
      ),
    );
  }
  return points;
}

const CONSONANT: Record<string, JamoStrokes> = {
  ㄱ: [[point(10, 18), point(88, 18), point(80, 92)]],
  ㄴ: [[point(20, 10), point(20, 86), point(90, 86)]],
  ㄷ: [
    [point(12, 16), point(88, 16)],
    [point(12, 16), point(12, 88), point(88, 88)],
  ],
  ㄹ: [
    [point(12, 12), point(84, 12), point(84, 44)],
    [point(12, 44), point(84, 44)],
    [point(12, 44), point(12, 88), point(86, 88)],
  ],
  ㅁ: [
    [point(14, 12), point(14, 90)],
    [point(14, 12), point(86, 12), point(86, 90)],
    [point(14, 90), point(86, 90)],
  ],
  ㅂ: [
    [point(14, 10), point(14, 90)],
    [point(86, 10), point(86, 90)],
    [point(14, 52), point(86, 52)],
    [point(14, 90), point(86, 90)],
  ],
  ㅅ: [
    [point(52, 12), point(10, 92)],
    [point(52, 40), point(90, 92)],
  ],
  ㅇ: [ring(50, 51, 39, 40)],
  ㅈ: [
    [point(10, 18), point(90, 18)],
    [point(50, 18), point(10, 92)],
    [point(50, 44), point(90, 92)],
  ],
  ㅊ: [
    [point(50, 4), point(50, 18)],
    [point(10, 32), point(90, 32)],
    [point(50, 32), point(10, 94)],
    [point(50, 56), point(90, 94)],
  ],
  ㅋ: [
    [point(10, 16), point(88, 16), point(80, 92)],
    [point(28, 52), point(84, 52)],
  ],
  ㅌ: [
    [point(12, 14), point(88, 14)],
    [point(12, 51), point(88, 51)],
    [point(12, 14), point(12, 88), point(88, 88)],
  ],
  ㅍ: [
    [point(8, 20), point(92, 20)],
    [point(28, 20), point(28, 80)],
    [point(72, 20), point(72, 80)],
    [point(8, 80), point(92, 80)],
  ],
  ㅎ: [
    [point(50, 2), point(50, 16)],
    [point(10, 30), point(90, 30)],
    ring(50, 68, 31, 28),
  ],
};

const VOWEL: Record<string, JamoStrokes> = {
  ㅏ: [[point(40, 4), point(40, 96)], [point(40, 50), point(88, 50)]],
  ㅑ: [[point(40, 4), point(40, 96)], [point(40, 33), point(88, 33)], [point(40, 66), point(88, 66)]],
  ㅓ: [[point(12, 50), point(60, 50)], [point(60, 4), point(60, 96)]],
  ㅕ: [[point(12, 33), point(60, 33)], [point(12, 66), point(60, 66)], [point(60, 4), point(60, 96)]],
  ㅗ: [[point(50, 8), point(50, 62)], [point(6, 62), point(94, 62)]],
  ㅛ: [[point(31, 8), point(31, 62)], [point(69, 8), point(69, 62)], [point(6, 62), point(94, 62)]],
  ㅜ: [[point(6, 38), point(94, 38)], [point(50, 38), point(50, 92)]],
  ㅠ: [[point(6, 38), point(94, 38)], [point(31, 38), point(31, 92)], [point(69, 38), point(69, 92)]],
  ㅡ: [[point(6, 50), point(94, 50)]],
  ㅣ: [[point(50, 4), point(50, 96)]],
};

interface Box {
  h: number;
  w: number;
  x: number;
  y: number;
}

export function placeStrokes(strokes: JamoStrokes, box: Box): JamoStrokes {
  return strokes.map((points) =>
    points.map((item) =>
      point(
        box.x + (item.x / 100) * box.w,
        box.y + (item.y / 100) * box.h,
      ),
    ),
  );
}

function twin(base: JamoStrokes): JamoStrokes {
  return [
    ...placeStrokes(base, { x: 0, y: 6, w: 47, h: 88 }),
    ...placeStrokes(base, { x: 53, y: 6, w: 47, h: 88 }),
  ];
}

function merge(
  first: JamoStrokes,
  firstBox: Box,
  second: JamoStrokes,
  secondBox: Box,
): JamoStrokes {
  return [
    ...placeStrokes(first, firstBox),
    ...placeStrokes(second, secondBox),
  ];
}

const WIDE_LEFT: Box = { x: 0, y: 42, w: 60, h: 58 };
const TALL_RIGHT: Box = { x: 62, y: 0, w: 38, h: 100 };
const LEFT_OF_I: Box = { x: 0, y: 0, w: 62, h: 100 };
const I_COLUMN: Box = { x: 62, y: 0, w: 38, h: 100 };
const withI = (base: JamoStrokes): JamoStrokes =>
  merge(base, LEFT_OF_I, VOWEL.ㅣ!, I_COLUMN);
const AE = withI(VOWEL.ㅏ!);
const E = withI(VOWEL.ㅓ!);

const COMPOUND_VOWEL: Record<string, JamoStrokes> = {
  ㅐ: AE,
  ㅒ: withI(VOWEL.ㅑ!),
  ㅔ: E,
  ㅖ: withI(VOWEL.ㅕ!),
  ㅢ: merge(
    VOWEL.ㅡ!,
    { x: 0, y: 36, w: 62, h: 64 },
    VOWEL.ㅣ!,
    I_COLUMN,
  ),
  ㅘ: merge(VOWEL.ㅗ!, WIDE_LEFT, VOWEL.ㅏ!, TALL_RIGHT),
  ㅙ: merge(VOWEL.ㅗ!, WIDE_LEFT, AE, TALL_RIGHT),
  ㅚ: merge(VOWEL.ㅗ!, WIDE_LEFT, VOWEL.ㅣ!, TALL_RIGHT),
  ㅝ: merge(VOWEL.ㅜ!, WIDE_LEFT, VOWEL.ㅓ!, TALL_RIGHT),
  ㅞ: merge(VOWEL.ㅜ!, WIDE_LEFT, E, TALL_RIGHT),
  ㅟ: merge(VOWEL.ㅜ!, WIDE_LEFT, VOWEL.ㅣ!, TALL_RIGHT),
};

function pair(first: JamoStrokes, second: JamoStrokes): JamoStrokes {
  return [
    ...placeStrokes(first, { x: 0, y: 6, w: 47, h: 88 }),
    ...placeStrokes(second, { x: 53, y: 6, w: 47, h: 88 }),
  ];
}

export const JAMO_STROKES: Record<string, JamoStrokes> = {
  ...CONSONANT,
  ...VOWEL,
  ...COMPOUND_VOWEL,
  ㄲ: twin(CONSONANT.ㄱ!),
  ㄸ: twin(CONSONANT.ㄷ!),
  ㅃ: twin(CONSONANT.ㅂ!),
  ㅆ: twin(CONSONANT.ㅅ!),
  ㅉ: twin(CONSONANT.ㅈ!),
  ㄳ: pair(CONSONANT.ㄱ!, CONSONANT.ㅅ!),
  ㄵ: pair(CONSONANT.ㄴ!, CONSONANT.ㅈ!),
  ㄶ: pair(CONSONANT.ㄴ!, CONSONANT.ㅎ!),
  ㄺ: pair(CONSONANT.ㄹ!, CONSONANT.ㄱ!),
  ㄻ: pair(CONSONANT.ㄹ!, CONSONANT.ㅁ!),
  ㄼ: pair(CONSONANT.ㄹ!, CONSONANT.ㅂ!),
  ㄽ: pair(CONSONANT.ㄹ!, CONSONANT.ㅅ!),
  ㄾ: pair(CONSONANT.ㄹ!, CONSONANT.ㅌ!),
  ㄿ: pair(CONSONANT.ㄹ!, CONSONANT.ㅍ!),
  ㅀ: pair(CONSONANT.ㄹ!, CONSONANT.ㅎ!),
  ㅄ: pair(CONSONANT.ㅂ!, CONSONANT.ㅅ!),
};

export const SQUARE_JAMO = new Set(["ㅇ"]);
export const WIDE_VOWELS = new Set(["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"]);
export const MIXED_VOWELS = new Set(["ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ"]);
