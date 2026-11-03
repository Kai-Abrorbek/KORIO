import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S7_U1 } from './section7-unit1';
import { ENGLISH_GRAMMAR_S7_U2 } from './section7-unit2';
import { ENGLISH_GRAMMAR_S7_U3 } from './section7-unit3';

export const ENGLISH_GRAMMAR_S7_UNITS = [
  ENGLISH_GRAMMAR_S7_U1,
  ENGLISH_GRAMMAR_S7_U2,
  ENGLISH_GRAMMAR_S7_U3,
] as const;

const section7 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S7_UNITS);

export const ENGLISH_GRAMMAR_SEED_S7 = section7.grammar;
export const ENGLISH_GT_S7_NODES = section7.nodes;
export const ENGLISH_GT_S7_QUESTIONS = section7.questions;
