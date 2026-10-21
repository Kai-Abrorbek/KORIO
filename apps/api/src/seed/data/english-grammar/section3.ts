import { buildEnglishGrammarSeeds } from './english-grammar.helpers';
import { ENGLISH_GRAMMAR_S3_U1 } from './section3-unit1';
import { ENGLISH_GRAMMAR_S3_U2 } from './section3-unit2';
import { ENGLISH_GRAMMAR_S3_U3 } from './section3-unit3';

export const ENGLISH_GRAMMAR_S3_UNITS = [
  ENGLISH_GRAMMAR_S3_U1,
  ENGLISH_GRAMMAR_S3_U2,
  ENGLISH_GRAMMAR_S3_U3,
] as const;

const section3 = buildEnglishGrammarSeeds(ENGLISH_GRAMMAR_S3_UNITS);

export const ENGLISH_GRAMMAR_SEED_S3 = section3.grammar;
export const ENGLISH_GT_S3_NODES = section3.nodes;
export const ENGLISH_GT_S3_QUESTIONS = section3.questions;
