import { buildKoreanGrammarSeed } from './section5.helpers';
import { SECTION7_UNITS_1_3 } from './section7.units1-3';
import { SECTION7_UNITS_4_6 } from './section7.units4-6';
import { SECTION7_UNITS_7_9 } from './section7.units7-9';

export const SECTION7_UNITS = [
  ...SECTION7_UNITS_1_3,
  ...SECTION7_UNITS_4_6,
  ...SECTION7_UNITS_7_9,
];

export const GRAMMAR_SEED_S7 = buildKoreanGrammarSeed(7, SECTION7_UNITS);
