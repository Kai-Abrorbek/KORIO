import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S5_U1 } from './section5-unit1';
import { ENGLISH_GRAMMAR_S5_U2 } from './section5-unit2';
import { ENGLISH_GRAMMAR_S5_U3 } from './section5-unit3';

export const ENGLISH_GRAMMAR_S5_UNITS = [
  ENGLISH_GRAMMAR_S5_U1,
  ENGLISH_GRAMMAR_S5_U2,
  ENGLISH_GRAMMAR_S5_U3,
] as const;

const section5 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S5_UNITS);

export const ENGLISH_GRAMMAR_SEED_S5 = section5.grammar;
export const ENGLISH_GT_S5_NODES = section5.nodes;
export const ENGLISH_GT_S5_QUESTIONS = section5.questions;
