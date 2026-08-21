import { QuestionLevel, QuestionType } from '../lessons/schemas/question.schema';
import {
  ExpressionSpeechLevel,
  type ExpressionPlacement,
} from '../expressions/schemas/expression.schema';
import type { ExpressionLanguage } from '../expressions/schemas/expression-pack.schema';

export type LocalizedExpressionSeedText = Record<ExpressionLanguage, string>;

interface ExpressionPracticeQuestionBase {
  code: string;
  type: QuestionType.FILL_IN_BLANK | QuestionType.TRANSLATE_TYPE;
  level: QuestionLevel;
  instruction: LocalizedExpressionSeedText;
  answer: string;
  acceptedAnswers?: string[];
  answerTranslation: LocalizedExpressionSeedText;
  hint: LocalizedExpressionSeedText;
  explanation?: LocalizedExpressionSeedText;
  audioText?: string;
  difficulty?: number;
  tags?: string[];
  xpReward?: number;
  isActive?: boolean;
}

export interface ExpressionFillBlankSeed
  extends ExpressionPracticeQuestionBase {
  type: QuestionType.FILL_IN_BLANK;
  sentenceTemplate: string;
  blankAnswers: string[];
  options: string[];
}

export interface ExpressionTranslateTypeSeed
  extends ExpressionPracticeQuestionBase {
  type: QuestionType.TRANSLATE_TYPE;
  grading: {
    mode: 'semantic' | 'targetExpression';
    expectedMeaning: string;
    targetExpressions?: string[];
    requiredRegister?: string;
    acceptedAnswers?: string[];
    notes?: string[];
    tolerance: {
      punctuation: boolean;
      spacing: boolean;
      minorTypos: boolean;
    };
  };
}

export type ExpressionPracticeQuestionSeed =
  | ExpressionFillBlankSeed
  | ExpressionTranslateTypeSeed;

export interface ExpressionPackSeed {
  code: string;
  title: LocalizedExpressionSeedText;
  description: LocalizedExpressionSeedText;
  media?: {
    emoji?: string;
    imageUrl?: string;
    imageAlt: LocalizedExpressionSeedText;
  };
  order: number;
  isActive?: boolean;
}

export interface ExpressionNodeSeed {
  code: string;
  packCode: string;
  title: LocalizedExpressionSeedText;
  description: LocalizedExpressionSeedText;
  icon: string;
  order: number;
  requiredExposures?: number;
  isActive?: boolean;
}

export interface ExpressionSeedEntry {
  code: string;
  packCode: string;
  nodeCode: string;
  korean: string;
  meaning: LocalizedExpressionSeedText;
  context: LocalizedExpressionSeedText;
  speaker: LocalizedExpressionSeedText;
  usageNote: LocalizedExpressionSeedText;
  speechLevel: ExpressionSpeechLevel;
  pronunciation: {
    romanization?: string;
    ttsText: string;
    audioUrl?: string;
  };
  media?: {
    emoji?: string;
    imageUrl?: string;
    imageAlt: LocalizedExpressionSeedText;
  };
  order: number;
  placements: ExpressionPlacement[];
  tags?: string[];
  difficulty?: number;
  isActive?: boolean;
  practiceQuestions?: ExpressionPracticeQuestionSeed[];
}
