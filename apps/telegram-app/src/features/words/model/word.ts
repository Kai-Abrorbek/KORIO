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

export interface WordPlacement {
  isCore: boolean;
  order: number;
  section: number;
  unit: number;
}

export interface StudyWord {
  code: string;
  difficulty: number;
  examples: { korean: string; translation: string }[];
  headword: string;
  id: string;
  meaning: string;
  media: { emoji: string; imageAlt: string; imageUrl: string };
  partOfSpeech: WordPartOfSpeech;
  placement: WordPlacement | null;
  pronunciation: { hangul: string; romanization: string; ttsText: string };
  progress: { state: "new" | "learning" | "review" | "mastered" };
  senseKey: string;
  tags: string[];
  usageNote: string;
}

export interface WordUnitSummary {
  due: number;
  learning: number;
  mastered: number;
  new: number;
  review: number;
  unit: number;
  words: number;
}

export interface WordSectionSummary extends Omit<WordUnitSummary, "unit"> {
  section: number;
  unitCount: number;
  units: WordUnitSummary[];
}

export type WordReviewResult = "again" | "hard" | "good" | "easy";

export const PART_OF_SPEECH: Record<WordPartOfSpeech, string> = {
  noun: "Ot",
  verb: "Fe'l",
  adjective: "Sifat",
  adverb: "Ravish",
  pronoun: "Olmosh",
  particle: "Yuklama",
  determiner: "Aniqlovchi",
  numeral: "Son",
  interjection: "Undov",
  phrase: "Ibora",
  other: "Boshqa",
};

export function lessonSlice(total: number, count: number, oneBasedLesson: number) {
  if (count <= 1) return { start: 0, end: total };
  const index = Math.max(0, Math.min(count - 1, oneBasedLesson - 1));
  const base = Math.floor(total / count);
  const extra = total % count;
  const start = base * index + Math.min(index, extra);
  const size = base + (index < extra ? 1 : 0);
  return { start, end: start + size };
}

export function isWordAnswerCorrect(input: string, answer: string): boolean {
  const normalize = (value: string) =>
    value
      .normalize("NFC")
      .toLowerCase()
      .replace(/[.,!?~"'`·…“”‘’]/g, "")
      .replace(/\s+/g, "")
      .trim();
  return Boolean(normalize(input)) && normalize(input) === normalize(answer);
}
