import { StrokePoint } from "@/types/hangul";
import {
  JAMO_STROKES,
  MIXED_VOWELS,
  SQUARE_JAMO,
  WIDE_VOWELS,
  placeStrokes,
} from "@/constants/jamo-strokes";

/**
 * 음절 하나를 획 목록으로 편다.
 *
 * 음절마다 획 데이터를 손으로 만들면 1만 자가 넘는다. 대신 자모 획
 * (`constants/jamo-strokes.ts`) 을 초성·중성·종성 자리에 맞춰 늘려 붙인다.
 * 자리는 중성의 생김새(세로/가로/복합)와 받침 유무로 6가지가 나온다.
 */

const LEADS = [
  "ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ",
  "ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ",
];

const VOWELS = [
  "ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ",
  "ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ",
];

const TAILS = [
  "","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ",
  "ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ",
];

const BASE = 0xac00;
const LAST = 0xd7a3;

export type JamoSlot = "lead" | "vowel" | "tail";

export interface PlacedStroke {
  points: StrokePoint[];
  slot: JamoSlot;
  /** 이 획이 속한 자모 상자의 긴 변. 채점 허용 오차를 자모 크기에 비례시키는 데 쓴다. */
  jamoScale: number;
}

export interface SyllablePlan {
  syllable: string;
  lead: string;
  vowel: string;
  /** 받침. 없으면 빈 문자열 */
  tail: string;
  /** 화면에 칩으로 보여줄 자모들 — 받침이 없으면 2개 */
  jamo: string[];
  strokes: PlacedStroke[];
}

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** 음절 획은 이 정사각 안에서 만든다. StrokeCanvas 의 viewBox 와 같은 값. */
export const SYLLABLE_VIEWBOX = 300;

/* 자리표. 좌표는 300 정사각 기준이고 바깥 여백은 22 정도 남긴다.
   받침이 붙으면 위쪽을 눌러서 아래 자리를 만든다. */
const LAYOUT: Record<string, { lead: Box; vowel: Box; tail?: Box }> = {
  // 세로모음 — 초성 왼쪽, 중성 오른쪽 (가, 나, 애, 의)
  tall: {
    lead: { x: 26, y: 52, w: 124, h: 196 },
    vowel: { x: 164, y: 24, w: 112, h: 252 },
  },
  tallTail: {
    lead: { x: 26, y: 30, w: 118, h: 146 },
    vowel: { x: 158, y: 20, w: 104, h: 160 },
    tail: { x: 58, y: 192, w: 184, h: 88 },
  },

  // 가로모음 — 초성 위, 중성 아래 (고, 누, 므)
  wide: {
    lead: { x: 88, y: 30, w: 124, h: 116 },
    vowel: { x: 24, y: 152, w: 252, h: 112 },
  },
  wideTail: {
    lead: { x: 92, y: 22, w: 116, h: 92 },
    vowel: { x: 24, y: 120, w: 252, h: 72 },
    tail: { x: 92, y: 198, w: 116, h: 86 },
  },

  // 복합모음 — 중성이 상자를 다 쓰고 초성은 비어 있는 왼쪽 위에 앉는다 (과, 워)
  mixed: {
    lead: { x: 26, y: 28, w: 112, h: 104 },
    vowel: { x: 24, y: 24, w: 252, h: 252 },
  },
  mixedTail: {
    lead: { x: 26, y: 22, w: 104, h: 92 },
    vowel: { x: 24, y: 18, w: 252, h: 182 },
    tail: { x: 92, y: 204, w: 116, h: 78 },
  },
};

function layoutFor(vowel: string, hasTail: boolean) {
  const kind = MIXED_VOWELS.has(vowel)
    ? "mixed"
    : WIDE_VOWELS.has(vowel)
      ? "wide"
      : "tall";
  return LAYOUT[hasTail ? `${kind}Tail` : kind];
}

/** 음절 → 초성/중성/종성. 한글 음절이 아니면 null. */
export function decomposeSyllable(
  syllable: string,
): { lead: string; vowel: string; tail: string } | null {
  const code = syllable.codePointAt(0);
  if (code === undefined || code < BASE || code > LAST) return null;
  const offset = code - BASE;
  return {
    lead: LEADS[Math.floor(offset / 588)],
    vowel: VOWELS[Math.floor((offset % 588) / 28)],
    tail: TAILS[offset % 28],
  };
}

/** 초성/중성/종성 → 음절. 조합 문제를 만들 때 쓴다. */
export function composeSyllable(
  lead: string,
  vowel: string,
  tail = "",
): string | null {
  const l = LEADS.indexOf(lead);
  const v = VOWELS.indexOf(vowel);
  const t = TAILS.indexOf(tail);
  if (l < 0 || v < 0 || t < 0) return null;
  return String.fromCodePoint(BASE + l * 588 + v * 28 + t);
}

/** ㅇ 처럼 늘리면 안 되는 자모는 슬롯 가운데의 정사각으로 줄인다. */
function fitBox(jamo: string, box: Box): Box {
  if (!SQUARE_JAMO.has(jamo)) return box;
  const side = Math.min(box.w, box.h);
  return {
    x: box.x + (box.w - side) / 2,
    y: box.y + (box.h - side) / 2,
    w: side,
    h: side,
  };
}

function pushJamo(
  out: PlacedStroke[],
  jamo: string,
  slot: Box,
  where: JamoSlot,
): boolean {
  const base = JAMO_STROKES[jamo];
  if (!base) return false;
  const box = fitBox(jamo, slot);
  const scale = Math.max(box.w, box.h);
  for (const points of placeStrokes(base, box)) {
    out.push({ points, slot: where, jamoScale: scale });
  }
  return true;
}

/**
 * 음절 하나의 획 계획. 획 순서는 초성 → 중성 → 종성이다.
 * 자모 획 데이터가 없으면 null 을 돌려준다 — 조용히 빈 획을 주면
 * 문제는 나오는데 그릴 게 없는 화면이 된다.
 */
export function buildSyllable(syllable: string): SyllablePlan | null {
  const parts = decomposeSyllable(syllable);
  if (!parts) return null;

  const { lead, vowel, tail } = parts;
  const box = layoutFor(vowel, !!tail);
  const strokes: PlacedStroke[] = [];

  if (!pushJamo(strokes, lead, box.lead, "lead")) return null;
  if (!pushJamo(strokes, vowel, box.vowel, "vowel")) return null;
  if (tail && box.tail && !pushJamo(strokes, tail, box.tail, "tail"))
    return null;

  return {
    syllable,
    lead,
    vowel,
    tail,
    jamo: tail ? [lead, vowel, tail] : [lead, vowel],
    strokes,
  };
}
