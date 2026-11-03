import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S9_U1 } from './section9-unit1';
import { ENGLISH_GRAMMAR_S9_U2 } from './section9-unit2';
import { ENGLISH_GRAMMAR_S9_U3 } from './section9-unit3';

export const ENGLISH_GRAMMAR_S9_UNITS = [
  ENGLISH_GRAMMAR_S9_U1,
  ENGLISH_GRAMMAR_S9_U2,
  ENGLISH_GRAMMAR_S9_U3,
] as const;

const section9 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S9_UNITS);

export const ENGLISH_GRAMMAR_SEED_S9 = section9.grammar;
export const ENGLISH_GT_S9_NODES = section9.nodes;
export const ENGLISH_GT_S9_QUESTIONS = section9.questions;
