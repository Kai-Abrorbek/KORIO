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
  | "listening"
  | "translate_type"
  | "listen_type"
  | "audio_match"
  | "listening"
  | "listen_fill";

export interface MatchingPair {
  korean: string;
  native: string;
}

export interface DialogLine {
  speaker: "npc" | "user";
  text: string;
}

// image_choice 옵션 (이모지 or 이미지 URL)
export interface ImageChoiceOption {
  text: string; // 단어 (한국어)
  label: string; // 라벨 (유저 언어)
  emoji?: string; // 이모지 (임시)
  imageUrl?: string; // 나중에 실제 이미지로 교체
}

export interface LessonQuestion {
  id: string;
  type: QuestionType;
  level: string;
  question: string;
  npcText?: string;
  options?: string[];
  choices?: ImageChoiceOption[]; // image_choice 전용
  answer: string;
  hint?: string;
  explanation?: string;
  /** 정답의 뜻 (유저 언어) */
  answerTranslation?: string;
  /** 정답으로 인정할 추가 표기 */
  acceptedAnswers?: string[];
  /** 세분화된 난이도 1~5 */
  difficulty?: number;
  /** 문법 포인트 · 어휘 주제 */
  tags?: string[];
  /** TTS 로 읽어줄 원문 (듣기 계열) */
  audioText?: string;
  audioUrl?: string;
  imageUrl?: string;
  xpReward: number;
  pairs?: MatchingPair[];
  dialogLines?: DialogLine[];
  sentencePrefix?: string;
  sentenceSuffix?: string;
  hard?: boolean;
}

export interface LessonSession {
  lessonId: string;
  lessonTitle: string;
  category: string;
  questions: LessonQuestion[];
  totalXp: number;
}

export type AnswerState = "idle" | "correct" | "wrong";
