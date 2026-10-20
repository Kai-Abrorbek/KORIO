import {
  WordPartOfSpeech,
  type WordLanguage,
} from '../words/schemas/word.schema';

export type LocalizedWordSeedText = Partial<Record<WordLanguage, string>>;

export interface WordSeedExample {
  korean: string;
  text?: string;
  english?: string;
  translations: LocalizedWordSeedText;
}

export interface WordSeedEntry {
  /** Once published, code must never be changed or reused for another meaning. */
  code?: string;
  korean: string;
  headword?: string;
  english?: string;
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
    ipa?: string;
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

/** New languages use neutral fields; Korean source files remain compatible. */
export interface MultilingualWordSeedEntry extends Omit<
  WordSeedEntry,
  'korean' | 'examples'
> {
  korean?: string;
  examples?: Array<{
    text?: string;
    korean?: string;
    english?: string;
    translations: LocalizedWordSeedText;
  }>;
}

export interface WordSeedSource {
  courseId?: string;
  targetLanguage?: string;
  section: number;
  unit: number;
  /** Node-authored arrays still have one deterministic order within the unit. */
  orderOffset?: number;
  words: readonly (WordSeedEntry | MultilingualWordSeedEntry)[];
}
