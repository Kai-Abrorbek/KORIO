export type QuestionType =
  | "sentence_builder"
  | "translate_builder"
  | "word_arrange"
  | "fill_in_blank"
  | "word_matching"
  | "speaking"
  | "image_choice"
  | "dialog_complete"
  | "type_answer"
  | "listening";

export interface MatchingPair {
  korean: string;
  native: string; // 우즈벡어/영어/러시아어 (유저 언어)
}

export interface DialogLine {
  speaker: "npc" | "user";
  text: string;
}

export interface LessonQuestion {
  id: string;
  type: QuestionType;
  level: string;
  question: string; // 지시문 (유저 언어)
  npcText?: string; // NPC 말풍선 텍스트
  options?: string[]; // 보기
  answer: string; // 정답
  hint?: string;
  explanation?: string; // 유저 언어로 된 설명
  audioUrl?: string;
  imageUrl?: string;
  xpReward: number;
  pairs?: MatchingPair[];
  dialogLines?: DialogLine[];
  sentencePrefix?: string;
  sentenceSuffix?: string;
}

export interface LessonSession {
  lessonId: string;
  lessonTitle: string;
  category: string;
  questions: LessonQuestion[];
  totalXp: number;
}

export type AnswerState = "idle" | "correct" | "wrong";
