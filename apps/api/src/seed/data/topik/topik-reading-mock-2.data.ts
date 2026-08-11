import { TopikReadingSeed } from './topik-seed.types';
import {
  TOPIK_READING_MOCK_2_EXAM,
  TOPIK_READING_MOCK_2_GROUPS,
} from './topik-reading-mock-2.groups';
import { TOPIK_READING_MOCK_2_QUESTIONS_01_25 } from './topik-reading-mock-2.questions-01-25';
import { TOPIK_READING_MOCK_2_QUESTIONS_26_50 } from './topik-reading-mock-2.questions-26-50';

export const TOPIK_READING_MOCK_2_SEED: TopikReadingSeed = {
  exam: TOPIK_READING_MOCK_2_EXAM,
  groups: TOPIK_READING_MOCK_2_GROUPS,
  questions: [
    ...TOPIK_READING_MOCK_2_QUESTIONS_01_25,
    ...TOPIK_READING_MOCK_2_QUESTIONS_26_50,
  ],
};
