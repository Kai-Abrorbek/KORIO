export type HangulCategory = "consonant" | "vowel";

export interface HangulExample {
  word: string;
  romanization: string;
}

export interface HangulCharacter {
  id: string;
  char: string;
  category: HangulCategory;
  name: string; // 기역, 니은 등
  romanization: string; // g, n, a 등
  examples: HangulExample[];
}

export interface HangulProgress {
  characterId: string;
  mastery: 0 | 1 | 2 | 3;
}

export interface MemoryCard {
  id: string;
  characterId: string;
  type: "hangul" | "roman";
  display: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// ── 한글 그리기 게임용 ──
export interface StrokePoint {
  x: number;
  y: number;
}

export interface StrokeDef {
  points: StrokePoint[]; // 획의 polyline 포인트
}

export interface HangulStrokeChar {
  id: string;
  char: string;
  name: string;
  romanization: string;
  strokes: StrokeDef[];
}
