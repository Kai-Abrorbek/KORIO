import { TopikReadingSeed } from './topik-seed.types';
import {
  TOPIK_READING_MOCK_1_EXAM,
  TOPIK_READING_MOCK_1_GROUPS,
} from './topik-reading-mock-1.groups';
import { TOPIK_READING_MOCK_1_QUESTIONS_01_25 } from './topik-reading-mock-1.questions-01-25';
import { TOPIK_READING_MOCK_1_QUESTIONS_26_50 } from './topik-reading-mock-1.questions-26-50';

export const TOPIK_READING_MOCK_1_SEED: TopikReadingSeed = {
  exam: TOPIK_READING_MOCK_1_EXAM,
  groups: TOPIK_READING_MOCK_1_GROUPS,
  questions: [
    ...TOPIK_READING_MOCK_1_QUESTIONS_01_25,
    ...TOPIK_READING_MOCK_1_QUESTIONS_26_50,
  ],
};
