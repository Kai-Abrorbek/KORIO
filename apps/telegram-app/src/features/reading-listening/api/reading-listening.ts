type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export interface ReadingLessonSummary {
  code: string;
  estimatedMinutes: number;
  id: string;
  level: number;
  media: ReadingLessonMedia;
  progress?: ReadingLessonProgress;
  title: string;
  topic: LocalizedText;
  unit: number;
}

export interface ReadingLessonListResponse {
  items: ReadingLessonSummary[];
  level: number;
  total: number;
}

export type LocalizedText = Record<"en" | "ko" | "ru" | "uz", string>;
export interface ReadingLessonMedia { imageAlt: LocalizedText; imageKey?: string; imageUrl?: string }
export interface ReadingLessonProgress {
  bestQuizCorrect: number; bestReadWords: number; completed: boolean; completions: number;
  pronunciationCompleted: boolean; quizTotal: number; totalWords: number; totalXpEarned: number; writingSubmitted: boolean;
}
export interface ReadingPassageParagraph { id: string; text: string; segments: Array<{ text: string; vocabularyId?: string }> }
export interface ReadingVocabularyItem {
  example: string; id: string; meaning: LocalizedText; note: LocalizedText; pronunciation?: string; word: string;
}
export interface ReadingQuestion {
  answerIndex: number; explanation: LocalizedText; id: string; options: LocalizedText[]; prompt: LocalizedText;
}
export interface ReadingVocabularyExerciseBlank {
  acceptedAnswers: string[]; answer: string; baseWord: string; explanation: LocalizedText; id: string;
}
export interface ReadingVocabularyExercise {
  blanks: ReadingVocabularyExerciseBlank[]; id: string; instruction: LocalizedText; template: string; title: LocalizedText;
  type: "paragraph_conjugation" | "sentence_word_bank"; wordBank: string[];
}
export interface ReadingWordGloss {
  grammar: string[]; lemma: string; meaning: LocalizedText; note?: LocalizedText; pos: string; word: string;
}
export interface ReadingLesson extends ReadingLessonSummary {
  glossary?: ReadingWordGloss[];
  passage: ReadingPassageParagraph[];
  questions: ReadingQuestion[];
  vocabulary: ReadingVocabularyItem[];
  vocabularyExercises?: ReadingVocabularyExercise[];
  writing: { exampleAnswer: string; helper: LocalizedText; keywords: string[]; placeholder: LocalizedText; prompt: LocalizedText };
}
export interface CompleteReadingResult {
  progress: ReadingLessonProgress; quizCorrect: number; quizTotal: number; repeat: boolean; success: boolean; totalXP: number | null; xpEarned: number;
}
export interface ReadingAssessResult {
  complete: boolean; failedWordIndex: number | null; nextWordIndex: number; passedWordCount: number;
  status: "error" | "no_speech" | "success"; totalWords: number;
}

export async function listReadingLevels(request: AuthenticatedRequest) {
  const catalogs = await Promise.all(
    [1, 2, 3, 4, 5, 6].map((level) => request<ReadingLessonListResponse>(`/reading-lessons?level=${level}&lang=uz`)),
  );
  return catalogs.filter((catalog) => catalog.total > 0).map((catalog) => ({ level: catalog.level, total: catalog.total }));
}

export function listReadingLessons(request: AuthenticatedRequest, level: number) {
  return request<ReadingLessonListResponse>(`/reading-lessons?level=${level}&lang=uz`);
}

export function getReadingLesson(request: AuthenticatedRequest, code: string) {
  return request<ReadingLesson>(`/reading-lessons/${encodeURIComponent(code)}?lang=uz`);
}

export function getReadingGloss(request: AuthenticatedRequest, code: string, word: string) {
  return request<{ gloss: ReadingWordGloss | null }>(`/reading-lessons/${encodeURIComponent(code)}/gloss`, {
    body: JSON.stringify({ word }), method: "POST",
  });
}

export function completeReadingLesson(request: AuthenticatedRequest, code: string, body: {
  answers: Array<{ choiceIndex: number; questionId: string }>;
  exerciseAnswers?: Array<{ baseWord: string; blankId: string; exerciseId: string; response: string }>;
  writingText?: string;
}) {
  return request<CompleteReadingResult>(`/reading-lessons/${encodeURIComponent(code)}/complete`, {
    body: JSON.stringify(body), method: "POST",
  });
}

export function assessReading(request: AuthenticatedRequest, code: string, startWordIndex: number, wordCount: number, wav: ArrayBuffer) {
  const query = new URLSearchParams({ lessonCode: code, startWordIndex: String(startWordIndex), wordCount: String(wordCount) });
  return request<ReadingAssessResult>(`/speech/assess-reading?${query.toString()}`, {
    body: wav, headers: { "Content-Type": "audio/wav" }, method: "POST",
  });
}

export function localized(text: LocalizedText | undefined) {
  return text?.uz || text?.en || text?.ko || text?.ru || "";
}
