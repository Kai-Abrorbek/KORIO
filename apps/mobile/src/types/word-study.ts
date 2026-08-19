export type WordLanguage = "ko" | "uz" | "en" | "ru";

export type WordPartOfSpeech =
  | "noun"
  | "verb"
  | "adjective"
  | "adverb"
  | "pronoun"
  | "particle"
  | "determiner"
  | "numeral"
  | "interjection"
  | "phrase"
  | "other";

export type WordProgressState = "new" | "learning" | "review" | "mastered";

export interface WordPlacement {
  section: number;
  unit: number;
  order: number;
  isCore: boolean;
}

export interface WordProgress {
  state: WordProgressState;
  correctCount: number;
  incorrectCount: number;
  consecutiveCorrect: number;
  easeFactor: number;
  intervalDays: number;
  nextReviewAt: string | null;
  lastReviewedAt: string | null;
  masteredAt: string | null;
  isDue: boolean;
}

export interface StudyWord {
  id: string;
  code: string;
  headword: string;
  senseKey: string;
  partOfSpeech: WordPartOfSpeech;
  meaning: string;
  examples: Array<{
    korean: string;
    translation: string;
  }>;
  pronunciation: {
    hangul: string;
    romanization: string;
    ttsText: string;
  };
  media: {
    emoji: string;
    imageUrl: string;
    imageAlt: string;
  };
  placement: WordPlacement | null;
  placements: WordPlacement[];
  tags: string[];
  difficulty: number;
  usageNote: string;
  progress: WordProgress;
}

export interface WordListResponse {
  items: StudyWord[];
  total: number;
  nextCursor: string | null;
}

export interface WordUnitSummary {
  unit: number;
  words: number;
  new: number;
  learning: number;
  review: number;
  mastered: number;
  due: number;
}

export interface WordSectionSummary {
  section: number;
  unitCount: number;
  words: number;
  new: number;
  learning: number;
  review: number;
  mastered: number;
  due: number;
  units: WordUnitSummary[];
}

export type WordReviewResult = "again" | "hard" | "good" | "easy";
