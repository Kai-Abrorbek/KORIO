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

/**
 * 본문 단어 하나의 뜻.
 *
 * 핵심 어휘(ReadingVocabularyItem)와 다르다. 저쪽은 색이 있고 예문·노트가
 * 붙는 교육 콘텐츠, 이쪽은 색 없이 눌러서 뜻만 보는 읽기 보조 도구다.
 *
 * word 는 본문에 나온 그대로의 형태(갔습니다)다. 한국어는 활용이 있어서
 * 사전형만으로는 유저가 누른 단어를 못 찾는다.
 */
export interface ReadingWordGloss {
  word: string;
  lemma: string;
  /** 품사 코드. posLabel() 로 화면 언어로 옮긴다 */
  pos: string;
  meaning: LocalizedReadingText;
  /** 문법 태그. grammarLabel() 로 옮긴다 */
  grammar: string[];
  note?: LocalizedReadingText;
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

/** 이 레슨에 대한 내 진도. 서버가 계산해서 내려준다 */
export interface ReadingLessonProgressSummary {
  completed: boolean;
  completions: number;
  bestQuizCorrect: number;
  quizTotal: number;
  /** 본문 낭독을 끝까지 했는지. 서버가 발음 평가로 직접 확인한 값 */
  pronunciationCompleted: boolean;
  bestReadWords: number;
  totalWords: number;
  writingSubmitted: boolean;
  totalXpEarned: number;
}

export interface CompleteReadingLessonResult {
  success: boolean;
  xpEarned: number;
  totalXP: number | null;
  quizCorrect: number;
  quizTotal: number;
  /** 두 번째 이후 도전이면 true. XP 가 깎여서 내려온다 */
  repeat: boolean;
  progress: ReadingLessonProgressSummary;
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
  progress?: ReadingLessonProgressSummary;
}

export interface ReadingListeningLesson
  extends Omit<ReadingLessonSummary, "order"> {
  order?: number;
  passage: ReadingPassageParagraph[];
  vocabulary: ReadingVocabularyItem[];
  questions: ReadingCheckQuestion[];
  /** 본문 단어별 뜻. 레슨을 받을 때 통째로 온다 — 탭은 네트워크 없이 즉시 */
  glossary?: ReadingWordGloss[];
  writing: ReadingWritingActivity;
  source?: {
    bookCode: string;
    bookTitle: string;
    pageStart: number;
    pageEnd: number;
  };
  progress?: ReadingLessonProgressSummary;
}

export interface ReadingLessonListResponse {
  level: number;
  total: number;
  items: ReadingLessonSummary[];
}

export interface ReadingLessonLevelSummary {
  level: number;
  total: number;
}

export interface ReadingLessonLevelsResponse {
  levels: ReadingLessonLevelSummary[];
}

