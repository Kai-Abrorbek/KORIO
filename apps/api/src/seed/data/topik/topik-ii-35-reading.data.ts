import { TopikReadingSeed } from './topik-seed.types';
import {
  TOPIK_II_35_READING_EXAM,
  TOPIK_II_35_READING_GROUPS,
} from './topik-ii-35-reading.groups';
import { TOPIK_II_35_READING_QUESTIONS_01_25 } from './topik-ii-35-reading.questions-01-25';
import { TOPIK_II_35_READING_QUESTIONS_26_50 } from './topik-ii-35-reading.questions-26-50';

export const TOPIK_II_35_READING_SEED: TopikReadingSeed = {
  exam: TOPIK_II_35_READING_EXAM,
  groups: TOPIK_II_35_READING_GROUPS,
  questions: [
    ...TOPIK_II_35_READING_QUESTIONS_01_25,
    ...TOPIK_II_35_READING_QUESTIONS_26_50,
  ],
};
