export type ReadingLanguage = "ko" | "uz" | "en" | "ru";

export type LocalizedReadingText = Record<ReadingLanguage, string>;

export interface ReadingPassageSegment {
  text: string;
  vocabularyId?: string;
}

export interface ReadingPassageParagraph {
  id: string;
  segments: ReadingPassageSegment[];
}

export interface ReadingVocabularyItem {
  id: string;
  word: string;
  pronunciation?: string;
  meaning: LocalizedReadingText;
  sourceGlosses?: {
    en?: string;
    zh?: string;
    ja?: string;
  };
  note: LocalizedReadingText;
  example: string;
}

export interface ReadingCheckQuestion {
  id: string;
  prompt: LocalizedReadingText;
  options: LocalizedReadingText[];
  answerIndex: number;
  explanation: LocalizedReadingText;
}

export interface ReadingWritingActivity {
  prompt: LocalizedReadingText;
  helper: LocalizedReadingText;
  placeholder: LocalizedReadingText;
  keywords: string[];
  exampleAnswer: string;
}

export interface ReadingLessonMedia {
  imageUrl?: string;
  imageAssetKey?: string;
  imageAlt: LocalizedReadingText;
}

export interface ReadingLessonSummary {
  id: string;
  code: string;
  level: number;
  unit: number;
  order: number;
  title: string;
  topic: LocalizedReadingText;
  estimatedMinutes: number;
  media: ReadingLessonMedia;
}

export interface ReadingListeningLesson
  extends Omit<ReadingLessonSummary, "order"> {
  order?: number;
  passage: ReadingPassageParagraph[];
  vocabulary: ReadingVocabularyItem[];
  questions: ReadingCheckQuestion[];
  writing: ReadingWritingActivity;
  source?: {
    bookCode: string;
    bookTitle: string;
    pageStart: number;
    pageEnd: number;
  };
}

export interface ReadingLessonListResponse {
  level: number;
  total: number;
  items: ReadingLessonSummary[];
}

