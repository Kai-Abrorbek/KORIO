import type { StrokePoint } from "./hangul";
import {
  JAMO_STROKES,
  MIXED_VOWELS,
  placeStrokes,
  SQUARE_JAMO,
  WIDE_VOWELS,
} from "./jamo-strokes";

const LEADS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split("");
const VOWELS = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ".split("");
const TAILS = [
  "",
  ..."ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ".split(""),
];
const BASE = 0xac00;
const LAST = 0xd7a3;

export type JamoSlot = "lead" | "vowel" | "tail";

export interface PlacedStroke {
  jamoScale: number;
  points: StrokePoint[];
  slot: JamoSlot;
}

export interface SyllablePlan {
  jamo: string[];
  lead: string;
  strokes: PlacedStroke[];
  syllable: string;
  tail: string;
  vowel: string;
}

interface Box {
  h: number;
  w: number;
  x: number;
  y: number;
}

export const SYLLABLE_VIEWBOX = 300;

const LAYOUT: Record<string, { lead: Box; tail?: Box; vowel: Box }> = {
  tall: {
    lead: { x: 26, y: 52, w: 124, h: 196 },
    vowel: { x: 164, y: 24, w: 112, h: 252 },
  },
  tallTail: {
    lead: { x: 26, y: 30, w: 118, h: 146 },
    vowel: { x: 158, y: 20, w: 104, h: 160 },
    tail: { x: 58, y: 192, w: 184, h: 88 },
  },
  wide: {
    lead: { x: 88, y: 30, w: 124, h: 116 },
    vowel: { x: 24, y: 152, w: 252, h: 112 },
  },
  wideTail: {
    lead: { x: 92, y: 22, w: 116, h: 92 },
    vowel: { x: 24, y: 120, w: 252, h: 72 },
    tail: { x: 92, y: 198, w: 116, h: 86 },
  },
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
  return LAYOUT[hasTail ? kind + "Tail" : kind]!;
}

export function decomposeSyllable(
  syllable: string,
): { lead: string; tail: string; vowel: string } | null {
  const code = syllable.codePointAt(0);
  if (code === undefined || code < BASE || code > LAST) return null;
  const offset = code - BASE;
  return {
    lead: LEADS[Math.floor(offset / 588)]!,
    vowel: VOWELS[Math.floor((offset % 588) / 28)]!,
    tail: TAILS[offset % 28]!,
  };
}

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
  output: PlacedStroke[],
  jamo: string,
  slot: Box,
  where: JamoSlot,
): boolean {
  const base = JAMO_STROKES[jamo];
  if (!base) return false;
  const box = fitBox(jamo, slot);
  const scale = Math.max(box.w, box.h);
  for (const points of placeStrokes(base, box)) {
    output.push({ jamoScale: scale, points, slot: where });
  }
  return true;
}

export function buildSyllable(syllable: string): SyllablePlan | null {
  const parts = decomposeSyllable(syllable);
  if (!parts) return null;

  const { lead, vowel, tail } = parts;
  const box = layoutFor(vowel, Boolean(tail));
  const strokes: PlacedStroke[] = [];
  if (!pushJamo(strokes, lead, box.lead, "lead")) return null;
  if (!pushJamo(strokes, vowel, box.vowel, "vowel")) return null;
  if (tail && box.tail && !pushJamo(strokes, tail, box.tail, "tail")) {
    return null;
  }

  return {
    jamo: tail ? [lead, vowel, tail] : [lead, vowel],
    lead,
    strokes,
    syllable,
    tail,
    vowel,
  };
}
