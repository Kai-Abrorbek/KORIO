import {
  TopikAudio,
  TopikChoice,
  TopikI18nText,
  TopikPresentation,
  TopikQuestionType,
  TopikSolution,
  TopikStimulus,
  TopikTextBlock,
} from '../../../topik/schemas/topik-content.schema';

export interface TopikSeedExam {
  code: string;
  title: TopikI18nText;
  description: TopikI18nText;
  examType: string;
  section: string;
  year: number;
  round: number;
  durationMinutes: number;
  totalQuestions: number;
  totalPoints: number;
  version: number;
  status: string;
  source: {
    title: string;
    edition: string;
    publisher: string;
    reference: string;
  };
  publishedAt: Date;
  isActive: boolean;
}

export interface TopikSeedGroup {
  code: string;
  order: number;
  startNumber: number;
  endNumber: number;
  instruction: TopikTextBlock[];
  sharedStimulus?: TopikStimulus;
  sharedAudio?: TopikAudio;
  pointsPerQuestion: number;
  presentation: TopikPresentation;
  version: number;
  isActive: boolean;
}

export interface TopikSeedQuestion {
  code: string;
  groupCode: string;
  number: number;
  order: number;
  type: TopikQuestionType;
  points: number;
  prompt: TopikTextBlock[];
  stimulus?: TopikStimulus;
  audio?: TopikAudio;
  choices: TopikChoice[];
  correctChoiceKey: string;
  solution: TopikSolution;
  presentation: TopikPresentation;
  tags: string[];
  difficulty: number;
  source: {
    pdfPage: number;
    bookPage: number;
    reference: string;
  };
  version: number;
  isActive: boolean;
}

export interface TopikExamSeed {
  exam: TopikSeedExam;
  groups: TopikSeedGroup[];
  questions: TopikSeedQuestion[];
}

export type TopikReadingSeed = TopikExamSeed;
