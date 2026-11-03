import { buildSection5GrammarTrack } from './section5.helpers';
import { SECTION5_TRACK_UNITS_1_3 } from './section5.units1-3';
import { SECTION5_TRACK_UNITS_4_6 } from './section5.units4-6';
import { SECTION5_TRACK_UNITS_7_9 } from './section5.units7-9';

export const SECTION5_TRACK_DEFINITIONS = [
  ...SECTION5_TRACK_UNITS_1_3,
  ...SECTION5_TRACK_UNITS_4_6,
  ...SECTION5_TRACK_UNITS_7_9,
];

const section5Track = buildSection5GrammarTrack(SECTION5_TRACK_DEFINITIONS);

export const GT_S5_NODES = section5Track.nodes;
export const GT_S5_QUESTIONS = section5Track.questions;
