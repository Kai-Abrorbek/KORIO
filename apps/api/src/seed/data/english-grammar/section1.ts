import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S1_U1 } from './section1-unit1';
import { ENGLISH_GRAMMAR_S1_U2 } from './section1-unit2';
import { ENGLISH_GRAMMAR_S1_U3 } from './section1-unit3';

export const ENGLISH_GRAMMAR_S1_UNITS = [
  ENGLISH_GRAMMAR_S1_U1,
  ENGLISH_GRAMMAR_S1_U2,
  ENGLISH_GRAMMAR_S1_U3,
] as const;

const section1 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S1_UNITS);

export const ENGLISH_GRAMMAR_SEED_S1 = section1.grammar;
export const ENGLISH_GT_S1_NODES = section1.nodes;
export const ENGLISH_GT_S1_QUESTIONS = section1.questions;
