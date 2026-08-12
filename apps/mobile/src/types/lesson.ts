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
  | "listen_fill"
  // 문법 문제 풀이 전용
  | "grammar_blank"
  | "grammar_build"
  | "reply_builder"
  // ↓ 중급자용 신규 5종
  | "reading_quiz"
  | "error_hunt"
  | "cloze_passage"
  | "dialog_order"
  | "verb_transform";

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
  /**
   * 다중 빈칸용 문장 템플릿. 빈칸 자리를 `___` 로 적는다.
   * 예: `Oh, ___ a ___ .`
   * 있으면 sentencePrefix/Suffix 대신 이걸 쓴다.
   */
  sentenceTemplate?: string;
  /** 빈칸 순서대로의 정답. 빈칸이 2개 이상일 때 필수 */
  blankAnswers?: string[];
  /** grammar_build 전용 — 어절 자리마다 보기 묶음 */
  buildRows?: { options: string[]; correct: string }[];
  hard?: boolean;
  /** 독해/빈칸 지문. cloze_passage 는 빈칸을 ___ 로 표기 */
  passage?: string;
  /** 지문 제목 (reading_quiz) */
  passageTitle?: string;
  /** error_hunt: 문장 내 틀린 단어 (npcText 에 오류 문장) */
  wrongWord?: string;
  /** verb_transform: 기본형 (예: 먹다) */
  baseWord?: string;
  /** verb_transform: 목표 형태 (예: 과거 · 존댓말) */
  targetForm?: string;
}

export interface LessonSession {
  lessonId: string;
  lessonTitle: string;
  category: string;
  questions: LessonQuestion[];
  totalXp: number;
}

export type AnswerState = "idle" | "correct" | "wrong";
