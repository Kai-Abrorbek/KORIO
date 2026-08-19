import {
  WordPartOfSpeech,
  type WordLanguage,
} from '../words/schemas/word.schema';

export type LocalizedWordSeedText = Partial<Record<WordLanguage, string>>;

export interface WordSeedExample {
  korean: string;
  translations: LocalizedWordSeedText;
}

export interface WordSeedEntry {
  /** Once published, code must never be changed or reused for another meaning. */
  code?: string;
  korean: string;
  senseKey?: string;
  partOfSpeech?: WordPartOfSpeech;
  ko?: string;
  uz?: string;
  en?: string;
  ru?: string;
  meaning?: LocalizedWordSeedText;
  examples?: WordSeedExample[];
  pronunciation?: {
    hangul?: string;
    romanization?: string;
    ttsText?: string;
  };
  emoji?: string;
  media?: {
    emoji?: string;
    imageUrl?: string;
    imageAlt?: LocalizedWordSeedText;
  };
  tags?: string[];
  difficulty?: number;
  usageNote?: LocalizedWordSeedText;
  isCore?: boolean;
  isActive?: boolean;
}

export interface WordSeedSource {
  section: number;
  unit: number;
  words: readonly WordSeedEntry[];
}
