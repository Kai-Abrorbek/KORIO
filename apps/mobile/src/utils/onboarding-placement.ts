import { SelfReportedLevel } from "@/types/enums";

type PlacementBand = {
  minLevel: number;
  maxLevel: number;
};

export interface OnboardingPlacement {
  placementLevel: number;
  recommendedSection: number;
}

const PLACEMENT_BANDS: Record<SelfReportedLevel, PlacementBand> = {
  [SelfReportedLevel.COMPLETE_BEGINNER]: { minLevel: 1, maxLevel: 1 },
  [SelfReportedLevel.BASIC_GREETINGS]: { minLevel: 1, maxLevel: 2 },
  [SelfReportedLevel.BASIC_CONVERSATION]: { minLevel: 2, maxLevel: 4 },
  [SelfReportedLevel.ABOVE]: { minLevel: 4, maxLevel: 6 },
};

/**
 * 네트워크 저장이 실패해도 결과 화면에 정확한 시작점을 보여주기 위한 폴백.
 * 서버의 lessons/placement.const.ts가 최종 권한이며 성공 응답으로 이 값을 덮는다.
 */
export function resolveOnboardingPlacement(
  selfReportedLevel: SelfReportedLevel | "",
  score: number,
): OnboardingPlacement {
  const self = selfReportedLevel || SelfReportedLevel.BASIC_GREETINGS;
  const band = PLACEMENT_BANDS[self];
  const safeScore = Number.isFinite(score) ? score : 0;
  const boundedScore = Math.min(100, Math.max(0, safeScore));
  const span = band.maxLevel - band.minLevel;
  const placementLevel = Math.min(
    6,
    Math.max(1, Math.round(band.minLevel + (boundedScore / 100) * span)),
  );

  return {
    placementLevel,
    recommendedSection: placementLevel * 2 - 1,
  };
}

/**
 * 배포 시점이 다른 API가 새 필드를 아직 보내지 않거나 잘못된 값을 보낼 때
 * store와 React key까지 NaN으로 오염되지 않도록 런타임에서 정규화한다.
 */
export function normalizeOnboardingPlacement(
  value:
    | {
        placementLevel?: unknown;
        recommendedSection?: unknown;
      }
    | null
    | undefined,
  fallback: OnboardingPlacement,
): OnboardingPlacement {
  const fallbackLevel = Number.isFinite(fallback.placementLevel)
    ? Math.min(6, Math.max(1, Math.round(fallback.placementLevel)))
    : 1;
  const fallbackSection = Number.isFinite(fallback.recommendedSection)
    ? Math.min(12, Math.max(1, Math.round(fallback.recommendedSection)))
    : fallbackLevel * 2 - 1;
  const receivedLevel = Number(value?.placementLevel);

  if (!Number.isFinite(receivedLevel)) {
    return {
      placementLevel: fallbackLevel,
      recommendedSection: fallbackSection,
    };
  }

  const placementLevel = Math.min(6, Math.max(1, Math.round(receivedLevel)));
  const receivedSection = Number(value?.recommendedSection);
  const recommendedSection = Number.isFinite(receivedSection)
    ? Math.min(12, Math.max(1, Math.round(receivedSection)))
    : placementLevel * 2 - 1;

  return { placementLevel, recommendedSection };
}
