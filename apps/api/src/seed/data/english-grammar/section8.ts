import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S8_U1 } from './section8-unit1';
import { ENGLISH_GRAMMAR_S8_U2 } from './section8-unit2';
import { ENGLISH_GRAMMAR_S8_U3 } from './section8-unit3';

export const ENGLISH_GRAMMAR_S8_UNITS = [
  ENGLISH_GRAMMAR_S8_U1,
  ENGLISH_GRAMMAR_S8_U2,
  ENGLISH_GRAMMAR_S8_U3,
] as const;

const section8 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S8_UNITS);

export const ENGLISH_GRAMMAR_SEED_S8 = section8.grammar;
export const ENGLISH_GT_S8_NODES = section8.nodes;
export const ENGLISH_GT_S8_QUESTIONS = section8.questions;
