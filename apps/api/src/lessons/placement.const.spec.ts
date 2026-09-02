import { SelfReportedLevel } from '../common/enums/self-level.enum';
import {
  recommendedSectionForLevel,
  scoreToPlacementLevel,
  sectionRangeForLevel,
} from './placement.const';

describe('placement helpers', () => {
  it.each([
    [SelfReportedLevel.BASIC_GREETINGS, 0, 1, 1],
    [SelfReportedLevel.BASIC_GREETINGS, 100, 2, 3],
    [SelfReportedLevel.BASIC_CONVERSATION, 0, 2, 3],
    [SelfReportedLevel.BASIC_CONVERSATION, 50, 3, 5],
    [SelfReportedLevel.BASIC_CONVERSATION, 100, 4, 7],
    [SelfReportedLevel.ABOVE, 0, 4, 7],
    [SelfReportedLevel.ABOVE, 50, 5, 9],
    [SelfReportedLevel.ABOVE, 100, 6, 11],
  ])(
    '%s at %i%% maps to placement %i and section %i',
    (selfReportedLevel, score, expectedLevel, expectedSection) => {
      const placementLevel = scoreToPlacementLevel(selfReportedLevel, score);

      expect(placementLevel).toBe(expectedLevel);
      expect(recommendedSectionForLevel(placementLevel)).toBe(expectedSection);
    },
  );

  it('clamps out-of-range placement levels before choosing a section', () => {
    expect(sectionRangeForLevel(0)).toEqual([1, 2]);
    expect(sectionRangeForLevel(99)).toEqual([11, 12]);
  });
});
