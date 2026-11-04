import { SECTION6_UNITS } from '../grammar/section6';
import { buildKoreanGrammarTrack } from './section5.helpers';
import { SECTION6_TRACK_UNITS_1_3 } from './section6.units1-3';
import { SECTION6_TRACK_UNITS_4_6 } from './section6.units4-6';
import { SECTION6_TRACK_UNITS_7_9 } from './section6.units7-9';

export const SECTION6_TRACK_DEFINITIONS = [
  ...SECTION6_TRACK_UNITS_1_3,
  ...SECTION6_TRACK_UNITS_4_6,
  ...SECTION6_TRACK_UNITS_7_9,
];

const section6Track = buildKoreanGrammarTrack({
  section: 6,
  level: '6',
  units: SECTION6_UNITS,
  definitions: SECTION6_TRACK_DEFINITIONS,
});

export const GT_S6_NODES = section6Track.nodes;
export const GT_S6_QUESTIONS = section6Track.questions;
