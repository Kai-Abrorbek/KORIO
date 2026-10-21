import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S2_U1 } from './section2-unit1';
import { ENGLISH_GRAMMAR_S2_U2 } from './section2-unit2';
import { ENGLISH_GRAMMAR_S2_U3 } from './section2-unit3';

export const ENGLISH_GRAMMAR_S2_UNITS = [
  ENGLISH_GRAMMAR_S2_U1,
  ENGLISH_GRAMMAR_S2_U2,
  ENGLISH_GRAMMAR_S2_U3,
] as const;

const section2 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S2_UNITS);

export const ENGLISH_GRAMMAR_SEED_S2 = section2.grammar;
export const ENGLISH_GT_S2_NODES = section2.nodes;
export const ENGLISH_GT_S2_QUESTIONS = section2.questions;
