import { buildSection5GrammarSeed } from './section5.helpers';
import { SECTION5_UNITS_1_3 } from './section5.units1-3';
import { SECTION5_UNITS_4_6 } from './section5.units4-6';
import { SECTION5_UNITS_7_9 } from './section5.units7-9';

export const SECTION5_UNITS = [
  ...SECTION5_UNITS_1_3,
  ...SECTION5_UNITS_4_6,
  ...SECTION5_UNITS_7_9,
];

export const GRAMMAR_SEED_S5 = buildSection5GrammarSeed(SECTION5_UNITS);
