import { SECTION7_UNITS } from '../grammar/section7';
import { buildKoreanGrammarTrack } from './section5.helpers';
import { SECTION7_TRACK_UNITS_1_3 } from './section7.units1-3';
import { SECTION7_TRACK_UNITS_4_6 } from './section7.units4-6';
import { SECTION7_TRACK_UNITS_7_9 } from './section7.units7-9';

export const SECTION7_TRACK_DEFINITIONS = [
  ...SECTION7_TRACK_UNITS_1_3,
  ...SECTION7_TRACK_UNITS_4_6,
  ...SECTION7_TRACK_UNITS_7_9,
];

const section7Track = buildKoreanGrammarTrack({
  section: 7,
  level: '4',
  units: SECTION7_UNITS,
  definitions: SECTION7_TRACK_DEFINITIONS,
});

export const GT_S7_NODES = section7Track.nodes;
export const GT_S7_QUESTIONS = section7Track.questions;
