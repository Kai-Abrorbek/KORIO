import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S6_U1 } from './section6-unit1';
import { ENGLISH_GRAMMAR_S6_U2 } from './section6-unit2';
import { ENGLISH_GRAMMAR_S6_U3 } from './section6-unit3';

export const ENGLISH_GRAMMAR_S6_UNITS = [
  ENGLISH_GRAMMAR_S6_U1,
  ENGLISH_GRAMMAR_S6_U2,
  ENGLISH_GRAMMAR_S6_U3,
] as const;

const section6 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S6_UNITS);

export const ENGLISH_GRAMMAR_SEED_S6 = section6.grammar;
export const ENGLISH_GT_S6_NODES = section6.nodes;
export const ENGLISH_GT_S6_QUESTIONS = section6.questions;
