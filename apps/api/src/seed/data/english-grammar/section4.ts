import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S4_U1 } from './section4-unit1';
import { ENGLISH_GRAMMAR_S4_U2 } from './section4-unit2';
import { ENGLISH_GRAMMAR_S4_U3 } from './section4-unit3';

export const ENGLISH_GRAMMAR_S4_UNITS = [
  ENGLISH_GRAMMAR_S4_U1,
  ENGLISH_GRAMMAR_S4_U2,
  ENGLISH_GRAMMAR_S4_U3,
] as const;

const section4 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S4_UNITS);

export const ENGLISH_GRAMMAR_SEED_S4 = section4.grammar;
export const ENGLISH_GT_S4_NODES = section4.nodes;
export const ENGLISH_GT_S4_QUESTIONS = section4.questions;
