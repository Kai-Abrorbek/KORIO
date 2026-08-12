import type { TopikI18nText, TopikTextBlock } from "./topik";

/** 황금 레시피 한 줄 */
export interface TopikRecipeTip {
  order: number;
  text: TopikI18nText;
}

/** Ranking 표의 한 행 */
export interface TopikGrammarEntry {
  rank: number;
  /** '-다가' 같은 문법 표제어 (한국어 원문) */
  form: string;
  /** 의미와 기능. 뜻이 둘이면 여러 개 */
  meanings: TopikI18nText[];
  /** 예문 (한국어 원문). meanings 와 순서를 맞춘다 */
  examples: string[];
  /** 예문에서 문법이 쓰인 부분 (강조 표시용) */
  highlights: string[];
}

/** 문법 묶음 — 연결어미 30, 종결어미 20 */
export interface TopikGrammarSection {
  key: string;
  title: TopikI18nText;
  entries: TopikGrammarEntry[];
  tips: TopikI18nText[];
}

export interface TopikRecipeChoice {
  key: string;
  text: string;
  order: number;
}

export interface TopikRecipeQuestion {
  id: string;
  code: string;
  number: number;
  type: string;
  points: number;
  prompt: TopikTextBlock[];
  choices: TopikRecipeChoice[];
  tags: string[];
  difficulty: number;
  /** 기출에만 내려온다 (예상문제는 채점 후 별도 조회) */
  correctChoiceKey?: string;
  solution?: TopikRecipeSolution | null;
}

export interface TopikRecipeSolutionStep {
  key: string;
  order: number;
  title: TopikI18nText;
  explanation: TopikI18nText;
}

export interface TopikRecipeChoiceNote {
  choiceKey: string;
  note: TopikI18nText;
}

export interface TopikRecipeSolution {
  explanation: TopikI18nText;
  strategy: TopikI18nText;
  steps: TopikRecipeSolutionStep[];
  choiceNotes: TopikRecipeChoiceNote[];
}

/** 목록 카드 */
export interface TopikRecipeSummary {
  groupCode: string;
  section: string;
  label: TopikI18nText;
  title: TopikI18nText;
  /** 문항 번호 범위 (읽기 1~2번) */
  fromNumber: number;
  toNumber: number;
  targetLevel: number;
  order: number;
  /** 학습 콘텐츠가 준비된 유형인지 */
  ready: boolean;
  exampleCount: number;
  practiceCount: number;
  grammarCount: number;
}

/** 학습 페이지 본문 */
export interface TopikRecipeDetail {
  groupCode: string;
  section: string;
  label: TopikI18nText;
  title: TopikI18nText;
  intro: TopikI18nText;
  targetLevel: number;
  goldenRecipe: TopikRecipeTip[];
  grammarSections: TopikGrammarSection[];
  examples: TopikRecipeQuestion[];
  practiceCount: number;
}

/** 예상문제 세트 */
export interface TopikRecipePractice {
  groupCode: string;
  label: TopikI18nText;
  title: TopikI18nText;
  questions: TopikRecipeQuestion[];
}

/** 채점용 정답·해설 */
export interface TopikRecipeSolutionEntry {
  id: string;
  correctChoiceKey: string;
  solution: TopikRecipeSolution | null;
}
