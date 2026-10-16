/**
 * 섹션이 바뀌는 순간 — 앱이 레벨업 연출(로켓)을 띄운다.
 *
 *   레슨 완료: 이 완료로 그 섹션(같은 트랙)의 레슨을 처음으로 전부 끝냈다
 *   점프 테스트: 합격으로 앞 섹션을 건너뛰어 목표 섹션에 들어섰다
 *
 * 트랙은 로드맵과 같다 — 어휘(카테고리 없는 옛 노드 포함)와 문법 문제 풀이는 따로 센다.
 * to 가 null 이면 그 트랙의 마지막 섹션까지 다 끝낸 것이다.
 */
export type SectionTrack = 'vocabulary' | 'grammar';

export interface SectionUp {
  track: SectionTrack;
  /** 끝낸(떠난) 섹션 */
  from: number;
  /** 새로 들어선 섹션. 마지막 섹션을 끝냈으면 null */
  to: number | null;
  /** 새 섹션의 제목·설명 (네 언어 — 앱이 고른다). to 가 null 이면 null */
  meta: {
    title: Record<string, string>;
    description: Record<string, string>;
  } | null;
}

// LessonCategory 값과 같다. 스키마를 불러오지 않으려고 글자로 둔다 (테스트에서 스키마 순환 import)
const VOCABULARY = 'vocabulary';
const GRAMMAR = 'grammar';

export function trackOfNode(category?: string | null): SectionTrack | null {
  if (!category || category === VOCABULARY) return 'vocabulary';
  if (category === GRAMMAR) return 'grammar';
  return null;
}

/** 로드맵과 같은 트랙 필터 (어휘 = category 없음/null/vocabulary) */
export function trackNodeFilter(track: SectionTrack): Record<string, unknown> {
  if (track === 'grammar') return { category: GRAMMAR };
  return {
    $or: [
      { category: { $exists: false } },
      { category: null },
      { category: VOCABULARY },
    ],
  };
}

/**
 * 점프 테스트 합격 직전 — 목표 섹션 앞에서 아직 안 끝낸 첫 섹션.
 * 그게 목표보다 앞이면 합격으로 섹션을 넘은 것이다 (같은 섹션 안 유닛 점프는 아님).
 * 배치 시험으로 건너뛴 섹션(startSection 앞)은 로드맵처럼 끝낸 걸로 친다.
 */
export function jumpCrossesSection(
  nodes: ReadonlyArray<{ section: number; lessonIds: ReadonlyArray<string> }>,
  done: ReadonlySet<string>,
  targetSection: number,
  startSection: number,
): number | null {
  const open = nodes
    .filter(
      (node) => node.section >= startSection && node.section < targetSection,
    )
    .filter((node) => node.lessonIds.some((id) => !done.has(id)))
    .map((node) => node.section);
  if (!open.length) return null;
  const from = Math.min(...open);
  return from < targetSection ? from : null;
}
