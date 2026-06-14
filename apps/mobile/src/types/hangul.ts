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
