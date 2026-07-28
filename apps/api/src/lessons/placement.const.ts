import { SelfReportedLevel } from '../common/enums/self-level.enum';

export const SECTIONS_PER_LEVEL = 2;
export const MAX_PLACEMENT_LEVEL = 6; // 12섹션 / 2

export function clampLevel(level: number): number {
  return Math.min(MAX_PLACEMENT_LEVEL, Math.max(1, Math.round(level)));
}

/** placement level(1~6) → [시작섹션, 끝섹션] */
export function sectionRangeForLevel(level: number): [number, number] {
  const l = clampLevel(level);
  return [l * 2 - 1, l * 2];
}

export interface PlacementBand {
  skipTest: boolean; // 완전초보 → 테스트 스킵
  forceHangul: boolean; // 한글부터 강제
  questionLevels: string[]; // 레벨테스트 출제 범위 (정렬로 쉬운→어려운)
  minLevel: number;
  maxLevel: number;
}

export const SELF_LEVEL_BAND: Record<SelfReportedLevel, PlacementBand> = {
  [SelfReportedLevel.COMPLETE_BEGINNER]: {
    skipTest: true,
    forceHangul: true,
    questionLevels: [],
    minLevel: 1,
    maxLevel: 1,
  },
  [SelfReportedLevel.BASIC_GREETINGS]: {
    skipTest: false,
    forceHangul: false,
    questionLevels: ['1', '2'],
    minLevel: 1,
    maxLevel: 2,
  },
  [SelfReportedLevel.BASIC_CONVERSATION]: {
    skipTest: false,
    forceHangul: false,
    questionLevels: ['2', '3', '4'],
    minLevel: 2,
    maxLevel: 4,
  },
  [SelfReportedLevel.ABOVE]: {
    skipTest: false,
    forceHangul: false,
    questionLevels: ['4', '5', '6'],
    minLevel: 4,
    maxLevel: 6,
  },
};

/** 레벨테스트 점수(0~100)를 밴드 안 placement level로 변환 */
export function scoreToPlacementLevel(
  self: SelfReportedLevel,
  score: number,
): number {
  const band = SELF_LEVEL_BAND[self];
  const span = band.maxLevel - band.minLevel;
  return clampLevel(band.minLevel + Math.round((score / 100) * span));
}
