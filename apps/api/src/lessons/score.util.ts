export interface Milestone {
  score: number; // 그 섹션 끝까지의 누적 유닛 수
  section: number; // 섹션 번호
  units: number; // 그 섹션의 유닛 수
}

// 섹션별 유닛 수 → 누적 마일스톤 생성
// 예: 섹션1=1유닛, 섹션2=9유닛 → [{score:1,...}, {score:10,...}]
export function buildMilestones(
  unitsPerSection: { section: number; units: number }[],
): Milestone[] {
  let cum = 0;
  return unitsPerSection
    .sort((a, b) => a.section - b.section)
    .map((s) => {
      cum += s.units;
      return { score: cum, section: s.section, units: s.units };
    });
}

export function calcScore(completedUnits: number, milestones: Milestone[]) {
  // 현재 스코어 = 완주한 유닛 수 (그대로)
  const score = completedUnits;

  // 다음 마일스톤 = 아직 안 넘긴 첫 번째
  const next = milestones.find((m) => m.score > completedUnits) ?? null;
  const prev =
    [...milestones].reverse().find((m) => m.score <= completedUnits) ?? null;

  const base = prev?.score ?? 0;
  const target = next?.score ?? milestones[milestones.length - 1]?.score ?? 0;
  const progress =
    target > base ? (completedUnits - base) / (target - base) : 1;

  return {
    score,
    completedUnits,
    nextScore: next ? next.score : score,
    progress: Math.max(0, Math.min(1, progress)),
    milestones, // 프론트 타임라인용
  };
}
