import {
  DEFAULT_COURSE_ID,
  type CourseScope,
  resolveCourseScope,
} from '../common/learning-course';
import {
  ENGLISH_GRAMMAR_SEED_S1,
  ENGLISH_GT_S1_NODES,
  ENGLISH_GT_S1_QUESTIONS,
} from './data/english-grammar/section1';
import {
  ENGLISH_GRAMMAR_SEED_S2,
  ENGLISH_GT_S2_NODES,
  ENGLISH_GT_S2_QUESTIONS,
} from './data/english-grammar/section2';
import {
  ENGLISH_GRAMMAR_SEED_S3,
  ENGLISH_GT_S3_NODES,
  ENGLISH_GT_S3_QUESTIONS,
} from './data/english-grammar/section3';
import {
  ENGLISH_GRAMMAR_SEED_S4,
  ENGLISH_GT_S4_NODES,
  ENGLISH_GT_S4_QUESTIONS,
} from './data/english-grammar/section4';
import {
  ENGLISH_GRAMMAR_SEED_S5,
  ENGLISH_GT_S5_NODES,
  ENGLISH_GT_S5_QUESTIONS,
} from './data/english-grammar/section5';
import {
  ENGLISH_GRAMMAR_SEED_S6,
  ENGLISH_GT_S6_NODES,
  ENGLISH_GT_S6_QUESTIONS,
} from './data/english-grammar/section6';
import {
  ENGLISH_GRAMMAR_SEED_S7,
  ENGLISH_GT_S7_NODES,
  ENGLISH_GT_S7_QUESTIONS,
} from './data/english-grammar/section7';
import {
  ENGLISH_GRAMMAR_SEED_S8,
  ENGLISH_GT_S8_NODES,
  ENGLISH_GT_S8_QUESTIONS,
} from './data/english-grammar/section8';
import {
  ENGLISH_GRAMMAR_SEED_S9,
  ENGLISH_GT_S9_NODES,
  ENGLISH_GT_S9_QUESTIONS,
} from './data/english-grammar/section9';
import { GRAMMAR_SEED } from './data/grammar/grammar.data';
import { GT_S1_NODES, GT_S1_QUESTIONS } from './data/grammar-track/section1';
import { GT_S2_NODES, GT_S2_QUESTIONS } from './data/grammar-track/section2';
import { GT_S3_NODES, GT_S3_QUESTIONS } from './data/grammar-track/section3';
import { GT_S4_NODES, GT_S4_QUESTIONS } from './data/grammar-track/section4';
import { GT_S5_NODES, GT_S5_QUESTIONS } from './data/grammar-track/section5';

const KOREAN_TRACK = {
  nodes: [
    ...GT_S1_NODES,
    ...GT_S2_NODES,
    ...GT_S3_NODES,
    ...GT_S4_NODES,
    ...GT_S5_NODES,
  ],
  questions: {
    ...GT_S1_QUESTIONS,
    ...GT_S2_QUESTIONS,
    ...GT_S3_QUESTIONS,
    ...GT_S4_QUESTIONS,
    ...GT_S5_QUESTIONS,
  },
};

const ENGLISH_TRACK = {
  nodes: [
    ...ENGLISH_GT_S1_NODES,
    ...ENGLISH_GT_S2_NODES,
    ...ENGLISH_GT_S3_NODES,
    ...ENGLISH_GT_S4_NODES,
    ...ENGLISH_GT_S5_NODES,
    ...ENGLISH_GT_S6_NODES,
    ...ENGLISH_GT_S7_NODES,
    ...ENGLISH_GT_S8_NODES,
    ...ENGLISH_GT_S9_NODES,
  ],
  questions: {
    ...ENGLISH_GT_S1_QUESTIONS,
    ...ENGLISH_GT_S2_QUESTIONS,
    ...ENGLISH_GT_S3_QUESTIONS,
    ...ENGLISH_GT_S4_QUESTIONS,
    ...ENGLISH_GT_S5_QUESTIONS,
    ...ENGLISH_GT_S6_QUESTIONS,
    ...ENGLISH_GT_S7_QUESTIONS,
    ...ENGLISH_GT_S8_QUESTIONS,
    ...ENGLISH_GT_S9_QUESTIONS,
  },
};

export interface GrammarSeedRecord {
  code: string;
  pattern: string;
  [key: string]: unknown;
}

export function getGrammarSeed(
  input: Partial<CourseScope> = {},
): readonly GrammarSeedRecord[] {
  const scope = resolveCourseScope(input);
  if (scope.courseId === DEFAULT_COURSE_ID) {
    return GRAMMAR_SEED as GrammarSeedRecord[];
  }
  if (scope.courseId === 'en-general') {
    return [
      ...ENGLISH_GRAMMAR_SEED_S1,
      ...ENGLISH_GRAMMAR_SEED_S2,
      ...ENGLISH_GRAMMAR_SEED_S3,
      ...ENGLISH_GRAMMAR_SEED_S4,
      ...ENGLISH_GRAMMAR_SEED_S5,
      ...ENGLISH_GRAMMAR_SEED_S6,
      ...ENGLISH_GRAMMAR_SEED_S7,
      ...ENGLISH_GRAMMAR_SEED_S8,
      ...ENGLISH_GRAMMAR_SEED_S9,
    ] as unknown as GrammarSeedRecord[];
  }
  throw new Error(`No grammar seed registered for ${scope.courseId}`);
}

export function getGrammarTrackSeed(input: Partial<CourseScope> = {}) {
  const scope = resolveCourseScope(input);
  if (scope.courseId === DEFAULT_COURSE_ID) return KOREAN_TRACK;
  if (scope.courseId === 'en-general') return ENGLISH_TRACK;
  throw new Error(`No grammar track seed registered for ${scope.courseId}`);
}
