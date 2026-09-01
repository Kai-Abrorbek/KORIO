export interface Milestone {
  score: number; // 그 섹션 끝까지의 누적 유닛 수
  section: number; // 섹션 번호
  units: number; // 그 섹션의 유닛 수
  title?: string; // 섹션 제목 (유저 언어)
  startScore?: number; // 그 섹션 시작 시점의 누적 유닛 수
  /** 그 섹션의 첫 유닛 번호. 잠긴 섹션으로 점프할 때 목표가 된다 */
  firstUnit?: number;
  status?: 'completed' | 'current' | 'locked';
}

// 섹션별 유닛 수 → 누적 마일스톤 생성
// 예: 섹션1=1유닛, 섹션2=9유닛 → [{score:1,...}, {score:10,...}]
export function buildMilestones(
  unitsPerSection: {
    section: number;
    units: number;
    title?: string;
    firstUnit?: number;
  }[],
): Milestone[] {
  let cum = 0;
  return unitsPerSection
    .sort((a, b) => a.section - b.section)
    .map((s) => {
      const startScore = cum;
      cum += s.units;
      return {
        score: cum,
        section: s.section,
        units: s.units,
        title: s.title,
        startScore,
        firstUnit: s.firstUnit ?? 1,
      };
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

  // 각 섹션 상태 — 넘긴 섹션은 completed, 지금 진행 중인 하나만 current, 나머지 locked
  let currentMarked = false;
  const withStatus: Milestone[] = milestones.map((m) => {
    let status: 'completed' | 'current' | 'locked';
    if (completedUnits >= m.score) {
      status = 'completed';
    } else if (!currentMarked) {
      status = 'current';
      currentMarked = true;
    } else {
      status = 'locked';
    }
    return { ...m, status };
  });

  return {
    score,
    completedUnits,
    nextScore: next ? next.score : score,
    progress: Math.max(0, Math.min(1, progress)),
    milestones: withStatus, // 프론트 타임라인용
  };
}
