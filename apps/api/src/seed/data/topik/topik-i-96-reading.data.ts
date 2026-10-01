import { TopikExamSeed } from './topik-seed.types';
import {
  TOPIK_I_96_READING_EXAM,
  TOPIK_I_96_READING_GROUPS,
} from './topik-i-96-reading.groups';
import { TOPIK_I_96_READING_QUESTIONS_31_50 } from './topik-i-96-reading.questions-31-50';
import { TOPIK_I_96_READING_QUESTIONS_51_70 } from './topik-i-96-reading.questions-51-70';

export const TOPIK_I_96_READING_SEED: TopikExamSeed = {
  exam: TOPIK_I_96_READING_EXAM,
  groups: TOPIK_I_96_READING_GROUPS,
  questions: [
    ...TOPIK_I_96_READING_QUESTIONS_31_50,
    ...TOPIK_I_96_READING_QUESTIONS_51_70,
  ],
};
