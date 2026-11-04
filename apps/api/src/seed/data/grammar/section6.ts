import { buildKoreanGrammarSeed } from './section5.helpers';
import { SECTION6_UNITS_1_3 } from './section6.units1-3';
import { SECTION6_UNITS_4_6 } from './section6.units4-6';
import { SECTION6_UNITS_7_9 } from './section6.units7-9';

export const SECTION6_UNITS = [
  ...SECTION6_UNITS_1_3,
  ...SECTION6_UNITS_4_6,
  ...SECTION6_UNITS_7_9,
];

export const GRAMMAR_SEED_S6 = buildKoreanGrammarSeed(6, SECTION6_UNITS);
