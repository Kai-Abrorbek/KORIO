export interface GrammarExample {
  gloss: string;
  highlight?: string;
  ko: string;
}

export interface GrammarDialogueTurn {
  gloss?: string;
  highlight?: string;
  ko: string;
  side: "left" | "right";
  speaker: string;
}

export interface GrammarQuizItem {
  options: { correct: boolean; text: string }[];
  question: string;
}

export interface Grammar {
  cautions: string[];
  conjugationRule?: string;
  conjugations: { base: string; result: string }[];
  dialogue: GrammarDialogueTurn[];
  examples: GrammarExample[];
  explanation: string;
  id: string;
  nextId?: string;
  nextPattern?: string;
  pattern: string;
  quiz: GrammarQuizItem[];
  similar?: { note: string; pattern: string };
  summary: string;
  tags: string[];
}

export interface GrammarListItem {
  completed: boolean;
  id: string;
  pattern: string;
  section: number;
  summary: string;
  tags: string[];
  unit: number;
}

export interface GrammarListResponse {
  freeSections: number;
  grammars: GrammarListItem[];
  isSuper: boolean;
  unlockedThrough: number;
}

export interface GrammarCompleteResult {
  already: boolean;
  gemsEarned: number;
  sectionCompleted: boolean;
  success: boolean;
  totalXP?: number;
  xpEarned: number;
}
