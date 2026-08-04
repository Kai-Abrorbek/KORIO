export interface GrammarExample {
  ko: string;
  gloss: string;
  highlight?: string; // 문장 중 강조할 문법 부분
}
export interface GrammarDialogueTurn {
  speaker: string;
  side: "left" | "right";
  ko: string;
  gloss?: string;
  highlight?: string;
}
export interface GrammarConjugation {
  base: string; // 먹다
  result: string; // 먹고 있다
}
export interface GrammarSimilar {
  pattern: string;
  note: string;
}
export interface GrammarQuizOption {
  text: string;
  correct: boolean;
}
export interface GrammarQuizItem {
  question: string;
  options: GrammarQuizOption[];
}
export interface Grammar {
  id: string;
  pattern: string;
  summary: string;
  tags: string[];
  explanation: string;
  conjugationRule?: string;
  conjugations: GrammarConjugation[]; // 0..N
  examples: GrammarExample[]; // 0..N
  dialogue: GrammarDialogueTurn[]; // 0..N
  similar?: GrammarSimilar; // optional
  cautions: string[]; // 0..N
  quiz: GrammarQuizItem[]; // 0..N
  nextId?: string;
  nextPattern?: string;
}

export interface GrammarListItem {
  id: string;
  pattern: string;
  summary: string;
  tags: string[];
  section: number;
  completed: boolean;
}

export interface GrammarListResponse {
  grammars: GrammarListItem[];
  unlockedThrough: number; // 열린 최대 섹션 (순차 잠금)
}
